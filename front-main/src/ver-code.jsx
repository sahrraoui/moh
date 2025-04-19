import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { authAPI } from './services/api';

const VerCode = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  const { state } = useLocation();
  const navigate = useNavigate();
  const { email, userId, purpose } = state || {};

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(prev => prev - 1);
      } else if (minutes > 0) {
        setMinutes(prev => prev - 1);
        setSeconds(59);
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [minutes, seconds]);

  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    if (element.nextSibling && element.value) {
      element.nextSibling.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const otpCode = otp.join('');
    if (otpCode.length !== 6) {
      setError('Please enter a 6-digit code');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        userId,
        otp: otpCode
      };

      let response;
      
      if (purpose === 'account-activation') {
        response = await authAPI.activateAccount(payload);
      } else {
        response = await authAPI.verifyOTP(payload);
      }

      if (purpose === 'account-activation') {
        navigate('/login', {
          state: {
            success: 'Account activated successfully! Please login.'
          }
        });
      } else {
        navigate('/changepass', {
          state: {
            email,
            resetToken: response.data.resetToken
          }
        });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setResendLoading(true);
    setError('');
    try {
      await authAPI.resendOTP({
        email,
        userId
      });
      setMinutes(5);
      setSeconds(0);
      
      setError('');
      
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to resend OTP. Please try again.');
    } finally {
      setResendLoading(false);
    }
  };

  const formatTime = () => {
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-[400px] bg-[#e9dfdf] rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-center">
          {purpose === 'account-activation' ? 'Activate Account' : 'Verify Identity'}
        </h2>
        
        <p className="text-sm text-gray-600 mb-6 text-center">
          We've sent a 6-digit verification code to <span className="font-medium">{state?.email || 'your email'}</span>
        </p>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="flex justify-center space-x-2 mb-6">
            {[...Array(6)].map((_, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={otp[index]}
                onChange={(e) => handleOtpChange(e.target, index)}
                onFocus={(e) => e.target.select()}
                className="w-11 h-12 text-center text-xl font-semibold border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            ))}
          </div>

          <div className="text-center mb-6">
            <p className="text-sm text-gray-600 mb-2">Time remaining: {formatTime()}</p>
            <button
              type="button"
              onClick={handleResendOTP}
              disabled={resendLoading || (minutes > 0 || seconds > 0)}
              className={`text-rose-500 text-sm font-semibold hover:underline ${
                (minutes > 0 || seconds > 0) ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {resendLoading ? 'Sending...' : "Didn't receive a code? Resend"}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-rose-500 text-white py-2 rounded-md font-semibold hover:bg-rose-600 transition ${
              loading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Verifying...' : 'Verify Code'}
          </button>
        </form>

        <div className="text-center text-sm mt-4">
          <button
            onClick={() => navigate('/login')}
            className="text-rose-500 font-semibold hover:underline"
          >
            Back to login
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerCode;