import React from 'react';

const OutfitRecommendations = ({ onExploreClick }) => {
  const outfits = [
    { id: 1, image: '../assets/outfit3.jpg', title: 'Casual Comfort' },
    { id: 2, image: '/images/streetwear-outfit.jpg', title: 'Streetwear Chic' },
    { id: 3, image: '/images/formal-outfit.jpg', title: 'Formal Elegance' },
  ];

  return (
    <div className="py-10 bg-white">
      {/* Bagian "Looking for inspiration?" */}
      <div className="text-red-900 text-center mb-12 px-4">
        <h1 className="text-4xl font-extrabold mb-4 leading-tight">
          Looking for inspiration?
        </h1>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Think of something you love—like <strong>'trendy casual outfits'</strong>—
          and explore endless mix-and-match ideas for your perfect OOTD!
        </p>
        <button
          onClick={onExploreClick} // Fungsi scroll ke OutfitIdeas
          className="bg-red-900 hover:bg-red-800 text-white px-6 py-3 rounded-full shadow-md font-semibold"
        >
          Explore
        </button>
      </div>

      {/* Explore Outfits Section */}
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Explore Popular Outfit Ideas
      </h2>
      <div className="flex justify-center gap-8">
        {outfits.map((outfit) => (
          <div
            key={outfit.id}
            className="rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition duration-300"
          >
            <img
              src={outfit.image}
              alt={outfit.title}
              className="w-64 h-80 object-cover"
            />
            <h3 className="py-3 text-lg text-gray-700 font-medium text-center">
              {outfit.title}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OutfitRecommendations;
