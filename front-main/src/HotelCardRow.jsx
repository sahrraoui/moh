import React from 'react';
import RectangleCard from './RectangleCard';

const HotelCardRow = () => {
  const hotelData = [
    {
      name: "Bayazid Hotel",
      location: "Setif",
      price: "5500dzd/night",
      image: "/bayazid.jpg"
    },
    {
      name: "El Bey Hotel",
      location: "Constantine",
      price: "7500dzd/night",
      image: "/elbey.jpg"
    },
    {
      name: "Hotel Exterior",
      location: "Oran",
      price: "9000dzd/night",
      image: "/exterior.jpg"
    },
    {
      name: "Ibis Hotel",
      location: "Algiers",
      price: "6500dzd/night",
      image: "/ibis.jpg"
    },
    {
      name: "Oran Hotel",
      location: "Oran",
      price: "8500dzd/night",
      image: "/oran.jpg"
    }
  ];
  
  // Create a doubled array for infinite loop effect
  const hotels = [...hotelData, ...hotelData];

  return (
    <div className="min-h-[350px] bg-gray-100 p-8 overflow-hidden">
      <div className="flex w-max animate-hotelScroll gap-5">
        {hotels.map((hotel, index) => (
          <RectangleCard 
            key={index}
            image={hotel.image}
            name={hotel.name}
            location={hotel.location}
            price={hotel.price}
            type="hotel"
          />
        ))}
      </div>

      <style>
        {`
          @keyframes hotelScroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(calc(-250px * 5 - 100px));
            }
          }

          .animate-hotelScroll {
            animation: hotelScroll 30s linear infinite;
          }
        `}
      </style>
    </div>
  );
};

export default HotelCardRow; 