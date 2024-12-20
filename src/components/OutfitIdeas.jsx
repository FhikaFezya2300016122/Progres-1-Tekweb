import React from 'react';

const OutfitIdeas = () => {
  const womenTops = ['Dresses', 'Jackets', 'Blazers', 'Blouses & Shirts', 'Cardigans', 'Hoodies & Sweatshirts', 'Sweaters', 'T-Shirts & Tops'];
  const menTops = ['Jackets & Coats', 'Sweaters', 'Polos', 'Hoodies & Sweatshirts', 'Shirts', 'T-Shirts'];

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
              <div className="h-16 w-16 bg-gray-300 rounded mx-auto"></div>
              <p className="mt-2 text-gray-600">{item}</p>
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
              <div className="h-16 w-16 bg-gray-300 rounded mx-auto"></div>
              <p className="mt-2 text-gray-600">{item}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default OutfitIdeas;
