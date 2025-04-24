import React from 'react';
import RectangleCard from './RectangleCard';

const CarCardRow = () => {
  const carData = [
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
    }
  ];
  
  // Create a doubled array for infinite loop effect
  const cars = [...carData, ...carData];

  return (
    <div className="min-h-[350px] bg-gray-100 p-8 overflow-hidden">
      <div className="flex w-max animate-carScroll gap-5">
        {cars.map((car, index) => (
          <RectangleCard 
            key={index}
            image={car.image}
            name={car.name}
            location={car.location}
            price={car.price}
            type="car"
          />
        ))}
      </div>

      <style>
        {`
          @keyframes carScroll {
            0% {
              transform: translateX(calc(-250px * 5 - 100px));
            }
            100% {
              transform: translateX(0);
            }
          }

          .animate-carScroll {
            animation: carScroll 30s linear infinite;
          }
        `}
      </style>
    </div>
  );
};

export default CarCardRow; 