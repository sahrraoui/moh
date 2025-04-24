import React, { useState, useEffect, useRef } from 'react';
import NewCard from './NewCard';
import Navbar from './navbar';
import GuestSelector from './components/GuestSelector';

const Experience = () => {
  // Using a local image from public folder
  const defaultImage = "/vv.jpg";
  const [favorites, setFavorites] = useState({});
  const [currentPhotoIndices, setCurrentPhotoIndices] = useState({});
  const [showGuestSelector, setShowGuestSelector] = useState(false);
  const [guestCount, setGuestCount] = useState(1);
  const [visibleExperiences, setVisibleExperiences] = useState(8);
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef(null);

  // All experiences data
  const allExperiences = [
    {
      name: "Cooking Class",
      location: "Constantine",
      price: "5000dzd/person"
    },
    {
      name: "City Tour",
      location: "Algiers",
      price: "3000dzd/person"
    },
    {
      name: "Wine Tasting",
      location: "Oran",
      price: "4500dzd/person"
    },
    {
      name: "Hiking Trip",
      location: "Setif",
      price: "2500dzd/person"
    },
    {
      name: "Desert Safari",
      location: "Constantine",
      price: "6000dzd/person"
    },
    {
      name: "Boat Cruise",
      location: "Algiers",
      price: "7000dzd/person"
    },
    {
      name: "Surfing Lesson",
      location: "Oran",
      price: "4000dzd/person"
    },
    {
      name: "Photography Tour",
      location: "Setif",
      price: "3500dzd/person"
    },
    {
      name: "Cultural Workshop",
      location: "Constantine",
      price: "3200dzd/person"
    },
    {
      name: "Food Tour",
      location: "Algiers",
      price: "3800dzd/person"
    },
    {
      name: "Scuba Diving",
      location: "Oran",
      price: "8000dzd/person"
    },
    {
      name: "Mountain Biking",
      location: "Setif",
      price: "4200dzd/person"
    }
  ];

  // Sample photos array for navigation
  const photoSets = {
    "Constantine": ['/exp1.avif', '/exp2.webp', '/exp3.webp'],
    "Algiers": ['/exp4.avif', '/exp5.webp', '/exp6.webp'],
    "Oran": ['/exp7.avif', '/exp8.webp', '/exp9.webp'],
    "Setif": ['/exp10.avif', '/exp11.webp', '/exp12.webp']
  };

  // Function to load more experiences when scrolling
  const loadMoreExperiences = () => {
    if (visibleExperiences >= allExperiences.length) return;
    
    setLoading(true);
    setTimeout(() => {
      setVisibleExperiences(prev => Math.min(prev + 4, allExperiences.length));
      setLoading(false);
    }, 500);
  };

  // Set up intersection observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !loading && visibleExperiences < allExperiences.length) {
          loadMoreExperiences();
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
  }, [loading, visibleExperiences]);

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
              
              {/* Date */}
              <div className="flex-1 px-4 border-l border-gray-200">
                <label className="block text-xs text-gray-500">Date</label>
                <input 
                  type="date" 
                  className="w-full outline-none text-sm"
                />
              </div>
              
              {/* Guests */}
              <div className="flex-1 px-4 border-l border-gray-200 relative">
                <label className="block text-xs text-gray-500">Guests</label>
                <button 
                  onClick={() => setShowGuestSelector(!showGuestSelector)}
                  className="w-full text-left outline-none text-sm py-1"
                >
                  {guestCount > 0 ? `${guestCount} ${guestCount === 1 ? 'guest' : 'guests'}` : 'Add guests'}
                </button>
                {showGuestSelector && (
                  <>
                    <div 
                      className="fixed inset-0 z-40"
                      onClick={() => setShowGuestSelector(false)}
                    ></div>
                    <GuestSelector
                      isHotel={false}
                      initialCount={guestCount}
                      onChange={(count) => {
                        setGuestCount(count);
                      }}
                      onClose={() => setShowGuestSelector(false)}
                    />
                  </>
                )}
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

        {/* Experiences Grid */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {allExperiences.slice(0, visibleExperiences).map((experience, index) => (
              <div key={index} className="flex justify-center">
                <div className="w-[280px] rounded-[20px] bg-white overflow-hidden">
                  {/* Image Container */}
                  <div className="w-full h-[180px] bg-[#2A1717] relative group">
                    <img 
                      src={photoSets[experience.location][currentPhotoIndices[index] || 0]}
                      alt={experience.name}
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
                    {/* Experience Name and Rating */}
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="text-[15px] font-medium text-black m-0">{experience.name}</h3>
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
                        <span className="text-[13px] text-[#FF385C]">4.9</span>
                      </div>
                    </div>

                    {/* Location & Availability */}
                    <p className="text-[13px] text-gray-500 m-0">{experience.location}</p>
                    <p className="text-[13px] text-gray-500 m-0 mb-1">Available now</p>

                    {/* Price */}
                    <p className="text-[15px] font-medium text-black m-0">From {experience.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Loading indicator */}
          {visibleExperiences < allExperiences.length && (
            <div 
              ref={loaderRef}
              className="flex justify-center items-center my-8"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF385C]"></div>
              ) : (
                <button 
                  onClick={loadMoreExperiences}
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

export default Experience; 