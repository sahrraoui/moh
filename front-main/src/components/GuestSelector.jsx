import React, { useState, useEffect } from 'react';

const GuestSelector = ({ isHotel = true, onClose, onChange, initialCount = 1 }) => {
  const [adults, setAdults] = useState(initialCount > 0 ? initialCount : 1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [pets, setPets] = useState(0);

  useEffect(() => {
    updateTotal();
  }, [adults, children, infants, pets]);

  const handleIncrement = (type) => {
    switch(type) {
      case 'adults':
        if (adults < 10) setAdults(prev => prev + 1);
        break;
      case 'children':
        if (children < 10) setChildren(prev => prev + 1);
        break;
      case 'infants':
        if (infants < 5) setInfants(prev => prev + 1);
        break;
      case 'pets':
        if (pets < 3) setPets(prev => prev + 1);
        break;
    }
  };

  const handleDecrement = (type) => {
    switch(type) {
      case 'adults':
        if (adults > 1) setAdults(prev => prev - 1);
        break;
      case 'children':
        if (children > 0) setChildren(prev => prev - 1);
        break;
      case 'infants':
        if (infants > 0) setInfants(prev => prev - 1);
        break;
      case 'pets':
        if (pets > 0) setPets(prev => prev - 1);
        break;
    }
  };

  const updateTotal = () => {
    onChange?.(adults + children + infants + pets);
  };

  return (
    <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl shadow-lg p-4 z-50">
      {/* Adults */}
      <div className="flex items-center justify-between py-3 border-b border-gray-200">
        <div>
          <p className="font-medium text-gray-900">Adults</p>
          <p className="text-sm text-gray-500">Ages 13 or above</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleDecrement('adults')}
            className={`w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center ${
              adults <= 1 ? 'opacity-50 cursor-not-allowed' : 'hover:border-gray-500'
            }`}
            disabled={adults <= 1}
          >
            <span className="text-xl">-</span>
          </button>
          <span className="w-5 text-center">{adults}</span>
          <button
            onClick={() => handleIncrement('adults')}
            className={`w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center ${
              adults >= 10 ? 'opacity-50 cursor-not-allowed' : 'hover:border-gray-500'
            }`}
            disabled={adults >= 10}
          >
            <span className="text-xl">+</span>
          </button>
        </div>
      </div>

      {/* Children */}
      <div className="flex items-center justify-between py-3 border-b border-gray-200">
        <div>
          <p className="font-medium text-gray-900">Children</p>
          <p className="text-sm text-gray-500">Ages 2-12</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleDecrement('children')}
            className={`w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center ${
              children <= 0 ? 'opacity-50 cursor-not-allowed' : 'hover:border-gray-500'
            }`}
            disabled={children <= 0}
          >
            <span className="text-xl">-</span>
          </button>
          <span className="w-5 text-center">{children}</span>
          <button
            onClick={() => handleIncrement('children')}
            className={`w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center ${
              children >= 10 ? 'opacity-50 cursor-not-allowed' : 'hover:border-gray-500'
            }`}
            disabled={children >= 10}
          >
            <span className="text-xl">+</span>
          </button>
        </div>
      </div>

      {/* Infants */}
      <div className="flex items-center justify-between py-3 border-b border-gray-200">
        <div>
          <p className="font-medium text-gray-900">Infants</p>
          <p className="text-sm text-gray-500">Under 2</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleDecrement('infants')}
            className={`w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center ${
              infants <= 0 ? 'opacity-50 cursor-not-allowed' : 'hover:border-gray-500'
            }`}
            disabled={infants <= 0}
          >
            <span className="text-xl">-</span>
          </button>
          <span className="w-5 text-center">{infants}</span>
          <button
            onClick={() => handleIncrement('infants')}
            className={`w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center ${
              infants >= 5 ? 'opacity-50 cursor-not-allowed' : 'hover:border-gray-500'
            }`}
            disabled={infants >= 5}
          >
            <span className="text-xl">+</span>
          </button>
        </div>
      </div>

      {/* Pets */}
      <div className="flex items-center justify-between py-3">
        <div>
          <p className="font-medium text-gray-900">Pets</p>
          <p className="text-sm text-gray-500">Bringing a service animal?</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleDecrement('pets')}
            className={`w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center ${
              pets <= 0 ? 'opacity-50 cursor-not-allowed' : 'hover:border-gray-500'
            }`}
            disabled={pets <= 0}
          >
            <span className="text-xl">-</span>
          </button>
          <span className="w-5 text-center">{pets}</span>
          <button
            onClick={() => handleIncrement('pets')}
            className={`w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center ${
              pets >= 3 ? 'opacity-50 cursor-not-allowed' : 'hover:border-gray-500'
            }`}
            disabled={pets >= 3}
          >
            <span className="text-xl">+</span>
          </button>
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-4 flex justify-end">
        <button
          onClick={onClose}
          className="bg-[#FF385C] text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default GuestSelector; 