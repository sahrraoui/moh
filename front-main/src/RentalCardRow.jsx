import React from 'react';
import RectangleCard from './RectangleCard';

const RentalCardRow = () => {
  const rentalData = [
    {
      name: "Maison Setif",
      location: "Setif",
      price: "12000dzd/night",
      image: "/maisonsetif.jpg"
    },
    {
      name: "Maison Alger",
      location: "Algiers",
      price: "18000dzd/night",
      image: "/maisonalger.jpg"
    },
    {
      name: "Maison Constantine",
      location: "Constantine",
      price: "15000dzd/night",
      image: "/maisoncon.jpg"
    },
    {
      name: "Maison Oran",
      location: "Oran",
      price: "16000dzd/night",
      image: "/maisonoran.jpg"
    },
    {
      name: "Maison Annaba",
      location: "Annaba",
      price: "14000dzd/night",
      image: "/maisonannaba.avif"
    }
  ];
  
  // Create a doubled array for infinite loop effect
  const rentals = [...rentalData, ...rentalData];

  return (
    <div className="min-h-[350px] bg-gray-100 p-8 overflow-hidden">
      <div className="flex w-max animate-rentalScroll gap-5">
        {rentals.map((rental, index) => (
          <RectangleCard 
            key={index}
            image={rental.image}
            name={rental.name}
            location={rental.location}
            price={rental.price}
            type="rental"
          />
        ))}
      </div>

      <style>
        {`
          @keyframes rentalScroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(calc(-250px * 5 - 100px));
            }
          }

          .animate-rentalScroll {
            animation: rentalScroll 30s linear infinite;
          }
        `}
      </style>
    </div>
  );
};

export default RentalCardRow; 