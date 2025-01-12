import React from 'react';
import outfit1 from '../assets_2/Dresses.jpg';
import outfit2 from '../assets_2/Jakets.jpg';
import outfit3 from '../assets_2/Blazer.jpg';
import outfit4 from '../assets_2/Cardigan.jpg';
import outfit5 from '../assets_2/Hoodies & Sweatshirts.jpg';
import outfit6 from '../assets_2/Sweaters.jpg';

// Gunakan nama unik untuk gambar pria jika berbeda
import menOutfit1 from '../assets_2/Jackets & Coats.jpg';
import menOutfit2 from '../assets_2/Sweaters.png';
import menOutfit3 from '../assets_2/Polo.png';
import menOutfit4 from '../assets_2/Hoodies & Sweatshirts.png';
import menOutfit5 from '../assets_2/Shirts.png';
import menOutfit6 from '../assets_2/T-Shirts.png';

const OutfitIdeas = () => {
  const womenTops = [
    { name: 'Dresses', img: outfit1 },
    { name: 'Jackets', img: outfit2 },
    { name: 'Blazers', img: outfit3 },
    { name: 'Cardigans', img: outfit4 },
    { name: 'Hoodies & Sweatshirts', img: outfit5 },
    { name: 'Sweaters', img: outfit6 },
  ];

  const menTops = [
    { name: 'Jackets & Coats', img: menOutfit1 },
    { name: 'Sweaters', img: menOutfit2 },
    { name: 'Polo', img: menOutfit3 },
    { name: 'Hoodies & Sweatshirts', img: menOutfit4 },
    { name: 'Shirts', img: menOutfit5 },
    { name: 'T-Shirts', img: menOutfit6 },
  ];

  return (
    <div className="bg-yellow-200 py-12 px-6">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
        Choose from <span className="font-extrabold text-yellow-600">Dress up</span> outfit ideas
      </h2>
      <div className="flex justify-center space-x-6 mb-4">
        <button className="border px-4 py-2 rounded-md font-semibold bg-white hover:bg-yellow-100 transition">
          Women
        </button>
        <button className="border px-4 py-2 rounded-md font-semibold bg-white hover:bg-yellow-100 transition">
          Men
        </button>
      </div>

      {/* Women Section */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Women</h3>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
          {womenTops.map((item, index) => (
            <div key={index} className="p-2 text-center">
              <img
                src={item.img}
                alt={item.name}
                className="h-16 w-16 rounded mx-auto object-cover"
              />
              <p className="mt-2 text-gray-600">{item.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Men Section */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Men</h3>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
          {menTops.map((item, index) => (
            <div key={index} className="p-2 text-center">
              <img
                src={item.img}
                alt={item.name}
                className="h-16 w-16 rounded mx-auto object-cover"
              />
              <p className="mt-2 text-gray-600">{item.name}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default OutfitIdeas;
