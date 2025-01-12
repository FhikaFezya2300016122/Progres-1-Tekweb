// src/components/OutfitRecommendations.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import CasualComfort from '../assets/CasualComfort1.jpg';
import StreetwearChic from '../assets/StreetwearChic.jpg';
import FormalElegance from '../assets/FormalElegance.jpg';

const OutfitRecommendations = () => {
  const outfits = [
    { id: 'casual-comfort', title: 'Casual Comfort', image: CasualComfort },
    { id: 'streetwear-chic', title: 'Streetwear Chic', image: StreetwearChic },
    { id: 'formal-elegance', title: 'Formal Elegance', image: FormalElegance },
  ];

  return (
    <div className="py-10 bg-white">
      {/* "Looking for inspiration?" section */}
      <div className="text-red-900 text-center mb-12 px-4">
        <h1 className="text-4xl font-extrabold mb-4 leading-tight">Looking for inspiration?</h1>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Think of something you love—like <strong>'trendy casual outfits'</strong>—and explore endless mix-and-match ideas for your perfect OOTD!
        </p>
      </div>

      {/* Popular outfit ideas section */}
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Explore Popular Outfit Ideas</h2>
      <div className="flex justify-center gap-8 flex-wrap">
        {outfits.map((outfit) => (
          <div key={outfit.id} className="cursor-pointer">
            <Link to={`/outfits/${outfit.id}`}>
              <img
                src={outfit.image}
                alt={outfit.title}
                className="w-64 h-80 object-cover rounded-lg"
              />
              <h3 className="py-3 text-lg text-gray-700 font-medium text-center">{outfit.title}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OutfitRecommendations;
