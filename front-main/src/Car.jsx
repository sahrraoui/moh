import React, { useState, useEffect, useRef } from 'react';
import NewCard from './NewCard';
import Navbar from './navbar';

const Car = () => {
  // Using a local image from public folder
  const defaultImage = "/vv.jpg";
  const [favorites, setFavorites] = useState({});
  const [currentPhotoIndices, setCurrentPhotoIndices] = useState({});
  const [visibleCars, setVisibleCars] = useState(8);
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef(null);

  // All cars data
  const allCars = [
    {
      name: "Toyota Camry",
      location: "Constantine",
      price: "7000dzd/day",
      image: "/camry.avif"
    },
    {
      name: "Volkswagen Golf",
      location: "Algiers",
      price: "8000dzd/day",
      image: "/golf.webp"
    },
    {
      name: "Audi A4",
      location: "Oran",
      price: "16000dzd/day",
      image: "/audi-a4.jpg"
    },
    {
      name: "BMW 3 Series",
      location: "Setif",
      price: "18000dzd/day",
      image: "/bmw-3-series.png"
    },
    {
      name: "Mercedes Sedan",
      location: "Algiers",
      price: "15000dzd/day",
      image: "/sedan.webp"
    },
    {
      name: "Honda Civic",
      location: "Constantine",
      price: "6500dzd/day",
      image: "/camry.avif"
    },
    {
      name: "Hyundai Elantra",
      location: "Oran",
      price: "6000dzd/day",
      image: "/golf.webp"
    },
    {
      name: "Kia Cerato",
      location: "Setif",
      price: "5500dzd/day",
      image: "/sedan.webp"
    },
    {
      name: "Renault Megane",
      location: "Algiers",
      price: "6800dzd/day",
      image: "/audi-a4.jpg"
    },
    {
      name: "Ford Focus",
      location: "Constantine",
      price: "7200dzd/day",
      image: "/bmw-3-series.png"
    },
    {
      name: "Peugeot 308",
      location: "Oran",
      price: "6700dzd/day",
      image: "/golf.webp"
    },
    {
      name: "Nissan Altima",
      location: "Setif",
      price: "7500dzd/day",
      image: "/camry.avif"
    },
    {
      name: "Chevrolet Malibu",
      location: "Algiers",
      price: "8100dzd/day",
      image: "/sedan.webp"
    },
    {
      name: "Mazda 6",
      location: "Constantine",
      price: "9000dzd/day",
      image: "/audi-a4.jpg"
    },
    {
      name: "Subaru Legacy",
      location: "Oran",
      price: "9500dzd/day",
      image: "/bmw-3-series.png"
    },
    {
      name: "Lexus ES",
      location: "Algiers",
      price: "12000dzd/day",
      image: "/sedan.webp"
    }
  ];

  // Sample photos array for navigation
  const photoSets = {
    "Constantine": ['/camry.avif', '/golf.webp', '/sedan.webp'],
    "Algiers": ['/audi-a4.jpg', '/bmw-3-series.png', '/camry.avif'],
    "Oran": ['/golf.webp', '/sedan.webp', '/bmw-3-series.png'],
    "Setif": ['/sedan.webp', '/audi-a4.jpg', '/golf.webp']
  };

  // Function to load more cars when scrolling
  const loadMoreCars = () => {
    if (visibleCars >= allCars.length) return;
    
    setLoading(true);
    setTimeout(() => {
      setVisibleCars(prev => Math.min(prev + 4, allCars.length));
      setLoading(false);
    }, 500);
  };

  // Set up intersection observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !loading && visibleCars < allCars.length) {
          loadMoreCars();
        }
      },
      { threshold: 1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [loading, visibleCars]);

  const nextPhoto = (index) => {
    setCurrentPhotoIndices(prev => ({
      ...prev,
      [index]: ((prev[index] || 0) + 1) % 3
    }));
  };

  const prevPhoto = (index) => {
    setCurrentPhotoIndices(prev => ({
      ...prev,
      [index]: ((prev[index] || 0) - 1 + 3) % 3
    }));
  };

  const toggleFavorite = (index) => {
    setFavorites(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#F5F5F5] p-6">
        {/* Search Bar Section */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-white rounded-full p-2 shadow-lg flex items-center justify-between">
            <div className="flex-1 flex items-center space-x-4">
              {/* Location */}
              <div className="flex-1 px-4">
                <label className="block text-xs text-gray-500">Location</label>
                <input 
                  type="text" 
                  placeholder="Where to?" 
                  className="w-full outline-none text-sm"
                />
              </div>
              
              {/* Pick-up */}
              <div className="flex-1 px-4 border-l border-gray-200">
                <label className="block text-xs text-gray-500">Pick-up</label>
                <input 
                  type="date" 
                  className="w-full outline-none text-sm"
                />
              </div>
              
              {/* Drop-off */}
              <div className="flex-1 px-4 border-l border-gray-200">
                <label className="block text-xs text-gray-500">Drop-off</label>
                <input 
                  type="date" 
                  className="w-full outline-none text-sm"
                />
              </div>
            </div>
            
            {/* Search Button */}
            <button className="bg-[#FF385C] text-white p-3 rounded-full hover:bg-opacity-90 transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            </button>
          </div>
        </div>

        {/* Cars Grid */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {allCars.slice(0, visibleCars).map((car, index) => (
              <div key={index} className="flex justify-center">
                <div className="w-[280px] rounded-[20px] bg-white overflow-hidden">
                  {/* Image Container */}
                  <div className="w-full h-[180px] bg-[#2A1717] relative group">
                    <img 
                      src={photoSets[car.location][currentPhotoIndices[index] || 0]}
                      alt={car.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    {/* Navigation Buttons */}
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        prevPhoto(index);
                      }}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2">
                        <path d="M15 18l-6-6 6-6" />
                      </svg>
                    </button>
                    
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        nextPhoto(index);
                      }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2">
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </button>

                    {/* Photo Indicators */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                      {[0, 1, 2].map((photoIndex) => (
                        <div 
                          key={photoIndex}
                          className={`w-1.5 h-1.5 rounded-full ${
                            photoIndex === (currentPhotoIndices[index] || 0) ? 'bg-white' : 'bg-white/50'
                          }`}
                        />
                      ))}
                    </div>

                    {/* Bookmark Icon */}
                    <div className="absolute top-3 right-3">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(index);
                        }}
                        className="p-1 hover:scale-110 transition-transform duration-200"
                      >
                        <svg 
                          width="20" 
                          height="20" 
                          viewBox="0 0 24 24" 
                          fill={favorites[index] ? "#FF385C" : "none"} 
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
                    {/* Car Name and Rating */}
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="text-[15px] font-medium text-black m-0">{car.name}</h3>
                      <div className="flex items-center gap-1">
                        <svg 
                          width="14" 
                          height="14" 
                          viewBox="0 0 24 24" 
                          fill="#FF385C" 
                          stroke="none"
                        >
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                        <span className="text-[13px] text-[#FF385C]">4.8</span>
                      </div>
                    </div>

                    {/* Location & Availability */}
                    <p className="text-[13px] text-gray-500 m-0">{car.location}</p>
                    <p className="text-[13px] text-gray-500 m-0 mb-1">Available now</p>

                    {/* Price */}
                    <p className="text-[15px] font-medium text-black m-0">From {car.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Loading indicator */}
          {visibleCars < allCars.length && (
            <div 
              ref={loaderRef}
              className="flex justify-center items-center my-8"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF385C]"></div>
              ) : (
                <button 
                  onClick={loadMoreCars}
                  className="px-4 py-2 bg-[#FF385C] text-white rounded-lg hover:bg-opacity-90 transition-colors"
                >
                  Load More
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Car; 