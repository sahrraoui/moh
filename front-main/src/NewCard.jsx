import React from 'react';

const NewCard = () => {
  return (
    <div className="w-[280px] rounded-[20px] bg-white overflow-hidden">
      {/* Image Container */}
      <div className="w-full h-[180px] bg-[#2A1717] relative">
        {/* Bookmark Icon */}
        <div className="absolute top-3 right-3">
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="#FF385C" 
            strokeWidth="1.5"
          >
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </svg>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4">
        {/* Hotel Name and Rating */}
        <div className="flex justify-between items-center mb-1">
          <h3 className="text-[15px] font-medium text-black m-0">Hotel name</h3>
          <div className="flex items-center gap-1">
            <svg 
              width="14" 
              height="14" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="#FF385C" 
              strokeWidth="1.5"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            <span className="text-[13px] text-[#FF385C]">nBR</span>
          </div>
        </div>

        {/* Location & Availability */}
        <p className="text-[13px] text-gray-500 m-0">Wilaya</p>
        <p className="text-[13px] text-gray-500 m-0 mb-1">days that is is aviable in</p>

        {/* Price */}
        <p className="text-[15px] font-medium text-black m-0">Price</p>
      </div>
    </div>
  );
};

export default NewCard; 