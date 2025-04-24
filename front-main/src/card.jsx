import React from 'react';

const PhotoCardGrid = () => {
  // Sample data - replace with your actual content
  const cards = [
    {
      id: 1,
      imageUrl: 'https://via.placeholder.com/300x200?text=Photo+1',
      title: 'Project One',
      description: 'This is a description for the first project card.',
      link: '/project-one'
    },
    {
      id: 2,
      imageUrl: 'https://via.placeholder.com/300x200?text=Photo+2',
      title: 'Project Two',
      description: 'This is a description for the second project card.',
      link: '/project-two'
    },
    {
      id: 3,
      imageUrl: 'https://via.placeholder.com/300x200?text=Photo+3',
      title: 'Project Three',
      description: 'This is a description for the third project card.',
      link: '/project-three'
    },
    {
      id: 4,
      imageUrl: 'https://via.placeholder.com/300x200?text=Photo+4',
      title: 'Project Four',
      description: 'This is a description for the fourth project card.',
      link: '/project-four'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div key={card.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <img 
              src={card.imageUrl} 
              alt={card.title} 
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{card.title}</h3>
              <p className="text-gray-600 mb-4">{card.description}</p>
              <a 
                href={card.link} 
                className="inline-block px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300"
              >
                View More
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoCardGrid;