import React from 'react';

const RectangleCard = ({ image, name, location, price, type = 'hotel' }) => {
  return (
    <div className="w-[250px] rounded-lg overflow-hidden bg-white shadow flex-none">
      {/* Photo Box */}
      <div className="w-full h-[180px] bg-gray-200 flex items-center justify-center overflow-hidden">
        {image ? (
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-gray-500">{type.charAt(0).toUpperCase() + type.slice(1)} Image</span>
        )}
      </div>

      {/* Content Area */}
      <div className="p-3 p-4">
        {/* Hotel Name */}
        <h3 className="m-0 mb-1 text-base font-semibold text-gray-900">
          {name || `${type.charAt(0).toUpperCase() + type.slice(1)} name`}
        </h3>

        {/* Location */}
        <p className="m-0 mb-2 text-sm text-gray-500">
          {location || 'Constantine'}
        </p>

        {/* Price Row */}
        <div className="flex items-center justify-between">
          <p className="m-0 text-sm text-gray-900">
            {price || `From ${type === 'hotel' ? '8000dzd/night' : type === 'car' ? '6000dzd/day' : '10000dzd/month'}`}
          </p>
          <span className="text-gray-900 text-lg">
            ›
          </span>
        </div>
      </div>
    </div>
  );
};

export default RectangleCard; 