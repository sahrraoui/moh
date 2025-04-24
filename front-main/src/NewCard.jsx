import React, { useState } from 'react';

const NewCard = () => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  
  // Sample photos array - replace with your actual photos
  const photos = [
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3',
    'https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3',
    'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3',
  ];

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="w-[280px] rounded-[20px] bg-white overflow-hidden">
      {/* Image Container */}
      <div className="w-full h-[180px] bg-[#2A1717] relative group">
        {/* Main Image */}
        <img 
          src={photos[currentPhotoIndex]} 
          alt="Hotel" 
          className="w-full h-full object-cover"
        />
        
        {/* Navigation Buttons */}
        <button 
          onClick={prevPhoto}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        
        <button 
          onClick={nextPhoto}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>

        {/* Photo Indicators */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
          {photos.map((_, index) => (
            <div 
              key={index}
              className={`w-1.5 h-1.5 rounded-full ${
                index === currentPhotoIndex ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>

        {/* Bookmark Icon */}
        <div className="absolute top-3 right-3">
          <button 
            onClick={toggleFavorite}
            className="p-1 hover:scale-110 transition-transform duration-200"
          >
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill={isFavorite ? "#FF385C" : "none"} 
              stroke="#FF385C" 
              strokeWidth="1.5"
            >
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
          </button>
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