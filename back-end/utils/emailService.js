const nodemailer = require('nodemailer');
const Token = require('../models/Token');
const crypto = require('crypto');

// Environment variables
const EMAIL_SERVICE = process.env.EMAIL_SERVICE;
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
const EMAIL_FROM_NAME = process.env.EMAIL_FROM_NAME;
const OAUTH_CLIENT_ID = process.env.OAUTH_CLIENT_ID;
const OAUTH_CLIENT_SECRET = process.env.OAUTH_CLIENT_SECRET;
const OAUTH_REFRESH_TOKEN = process.env.OAUTH_REFRESH_TOKEN;

/**
 * Get email transporter
 * @returns {Object} Nodemailer transporter
 */
async function getTransporter() {
  // Use OAuth2 if refresh token is available, otherwise use password
  if (OAUTH_REFRESH_TOKEN) {
    return nodemailer.createTransport({
      service: EMAIL_SERVICE,
      auth: {
        type: 'OAuth2',
        user: EMAIL_USER,
        clientId: OAUTH_CLIENT_ID,
        clientSecret: OAUTH_CLIENT_SECRET,
        refreshToken: OAUTH_REFRESH_TOKEN
      }
    });
  } else {
    return nodemailer.createTransport({
      service: EMAIL_SERVICE,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASSWORD
      }
    });
  }
}

/**
 * Generate OTP for specified purpose and save to database
 * @param {string} userId - User ID
 * @param {string} purpose - Purpose of OTP (activation, passwordReset, etc.)
 * @returns {string} Generated OTP
 */
exports.generateOTP = async (userId, purpose) => {
  try {
    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Hash the OTP for storage
    const hashedOTP = crypto.createHash('sha256').update(otp).digest('hex');
    
    // Set expiry time (10 minutes)
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 10);
    
    // Delete any existing tokens for this user and purpose
    await Token.deleteMany({ userId, type: purpose });
    
    // Save new token
    await Token.create({
      userId,
      token: hashedOTP,
      type: purpose,
      createdAt: new Date()
    });
    
    return otp;
  } catch (error) {
    console.error('Error generating OTP:', error);
    throw error;
  }
};

/**
 * Verify OTP for specified purpose
 * @param {string} userId - User ID
 * @param {string} otp - OTP to verify
 * @param {string} purpose - Purpose of OTP
 * @returns {boolean} Whether OTP is valid
 */
exports.verifyOTP = async (userId, otp, purpose) => {
  try {
    // Hash the provided OTP
    const hashedOTP = crypto.createHash('sha256').update(otp).digest('hex');
    
    // Find token in database
    const token = await Token.findOne({
      userId,
      token: hashedOTP,
      type: purpose
    });
    
    if (!token) {
      return false;
    }
    
    // Delete token after successful verification (one-time use)
    await Token.deleteOne({ _id: token._id });
    
    return true;
  } catch (error) {
    console.error('Error verifying OTP:', error);
    return false;
  }
};

/**
 * Send OTP email for password reset
 * @param {Object} options - Email options
 * @param {string} options.email - Recipient email
 * @param {string} options.otp - One-time password code
 */
exports.sendOTPEmail = async (options) => {
  try {
    const transporter = await getTransporter();
    
    // Email content
    const mailOptions = {
      from: `"${EMAIL_FROM_NAME}" <${EMAIL_USER}>`,
      to: options.email,
      subject: 'Password Reset Code - Travlease',
      html: generateEmailTemplate('Password Reset Code', options.otp)
    };

    // Send email
    return await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending OTP email:', error);
    throw error;
  }
};

/**
 * Send activation email with OTP
 * @param {Object} options - Email options
 * @param {string} options.email - Recipient email
 * @param {string} options.otp - One-time password code
 */
exports.sendActivationEmail = async (options) => {
  try {
    const transporter = await getTransporter();
    
    // Email content
    const mailOptions = {
      from: `"${EMAIL_FROM_NAME}" <${EMAIL_USER}>`,
      to: options.email,
      subject: 'Activate Your Account - Travlease',
      html: generateEmailTemplate('Account Activation', options.otp)
    };

    // Send email
    return await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending activation email:', error);
    throw error;
  }
};

/**
 * Send email verification code for email change
 * @param {Object} options - Email options
 * @param {string} options.email - Recipient email (new email)
 * @param {string} options.otp - One-time password code
 */
exports.sendEmailChangeVerification = async (options) => {
  try {
    const transporter = await getTransporter();
    
    // Email content
    const mailOptions = {
      from: `"${EMAIL_FROM_NAME}" <${EMAIL_USER}>`,
      to: options.email,
      subject: 'Verify Your New Email Address - Travlease',
      html: generateEmailTemplate('Email Change Verification', options.otp)
    };

    // Send email
    return await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email verification:', error);
    throw error;
  }
};

// Update the existing generateEmailTemplate function to handle email change type
// This would be an extension to the existing generateEmailTemplate function
function generateEmailTemplate(title, otp) {
  let customMessage = '';
  
  if (title === 'Email Change Verification') {
    customMessage = 'You requested to change your email address for your Travlease account. Please use the following one-time password (OTP) to verify your new email:';
  } else if (title === 'Password Reset Code') {
    customMessage = 'You requested a password reset for your Travlease account. Please use the following one-time password (OTP) to verify your identity:';
  } else {
    customMessage = 'Thank you for registering with Travlease! Please use the following one-time password (OTP) to verify your identity:';
  }
  
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your Travlease Verification Code</title>
      <style>
        body {
          margin: 0;
          padding: 0;
          min-width: 100%;
          font-family: Arial, sans-serif;
          line-height: 1.5;
          color: #333333;
          background-color: #f5f5f5;
        }
        
        .wrapper {
          width: 100%;
          background-color: #f5f5f5;
          padding-bottom: 40px;
        }
        
        .main {
          background-color: #ffffff;
          margin: 0 auto;
          width: 100%;
          max-width: 600px;
          border-radius: 12px;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
          overflow: hidden;
        }
        
        .header {
          padding: 25px 0;
          text-align: center;
          background-color: #E61E51;
          border-bottom: 5px solid #EAE2E2;
        }
        
        .header-content {
          color: #ffffff;
          font-size: 28px;
          font-weight: bold;
          letter-spacing: 1px;
        }
        
        .content {
          padding: 35px;
        }
        
        .footer {
          padding: 20px 30px;
          text-align: center;
          font-size: 12px;
          color: #ffffff;
          background-color: #E61E51;
        }
        
        h1 {
          font-size: 26px;
          font-weight: 700;
          margin: 0 0 20px 0;
          color: #E61E51;
        }
        
        p {
          margin: 0 0 20px 0;
          font-size: 16px;
        }
        
        .otp-container {
          margin: 30px 0;
          text-align: center;
        }
        
        .otp-code {
          font-family: 'Courier New', Courier, monospace;
          font-size: 36px;
          font-weight: 700;
          letter-spacing: 8px;
          color: #ffffff;
          padding: 15px 25px;
          background-color: #E61E51;
          border-radius: 10px;
          display: inline-block;
          box-shadow: 0 3px 6px rgba(230, 30, 81, 0.3);
        }
        
        .highlight {
          color: #E61E51;
          font-weight: 600;
        }
        
        .note {
          font-size: 14px;
          color: #666666;
          background-color: #EAE2E2;
          padding: 15px;
          border-left: 4px solid #E61E51;
          border-radius: 4px;
        }
        
        .divider {
          height: 1px;
          background-color: #EAE2E2;
          margin: 25px 0;
        }
        
        @media screen and (max-width: 600px) {
          .main {
            width: 95%;
          }
          
          .content {
            padding: 20px;
          }
          
          .otp-code {
            font-size: 28px;
            letter-spacing: 5px;
            padding: 12px 15px;
          }
          
          .header-content {
            font-size: 24px;
          }
        }
      </style>
    </head>
    <body>
      <div style="display: none; max-height: 0; overflow: hidden;">
        Your Travlease verification code is ready - valid for 10 minutes only
      </div>
      
      <center class="wrapper">
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
          <tr>
            <td align="center" valign="top">
              <table class="main" width="600" cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                  <td class="header">
                    <div class="header-content">TRAVLEASE</div>
                  </td>
                </tr>
                
                <tr>
                  <td class="content">
                    <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                      <tr>
                        <td>
                          <h1>${title}</h1>
                          <p>Hello,</p>
                          <p>${customMessage}</p>
                          
                          <div class="otp-container">
                            <div class="otp-code">${otp}</div>
                          </div>
                          
                          <div class="note">
                            <p style="margin: 0;">This code is valid for <span class="highlight">10 minutes</span> only and can be used just once.</p>
                          </div>
                          
                          <div class="divider"></div>
                          
                          <p>If you didn't request this code, you can safely ignore this email or contact support if you have concerns.</p>
                          
                          <p>Safe travels,<br>The Travlease Team</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                
                <tr>
                  <td class="footer">
                    <p>&copy; ${new Date().getFullYear()} Travlease. All rights reserved.</p>
                    <p>Making travel easier, one journey at a time.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </center>
    </body>
    </html>
  `;
}