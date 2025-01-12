import React from "react";

// Import images from the 'assets' folder
import outfitImage1 from "../assets/outfit1.jpg"; 
import outfitImage2 from "../assets/outfit2.1.jpg";
import outfitImage3 from "../assets/outfit3.jpg"; 
import outfitImage4 from "../assets/outfit4.jpg"; 

const OutfitImage = () => {
  return (
    <div className="container mx-auto px-6 py-12">
      {/* Section Title */}
      <h2 className="text-4xl font-extrabold text-center mb-12">
        <div>
          <span className="text-red-900 block">Find Your Perfect</span>
          <span className="text-black block">Mix & Match outfit Inspiration</span>
        </div>
      </h2>

      {/* Grid layout for the images */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {/* First Image */}
        <div className="flex justify-center items-center">
          <img
            src={outfitImage1}
            alt="Outfit 1"
            className="w-full h-auto rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Second Image */}
        <div className="flex justify-center items-center">
          <img
            src={outfitImage2}
            alt="Outfit 2"
            className="w-full h-auto rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Third Image */}
        <div className="flex justify-center items-center">
          <img
            src={outfitImage3}
            alt="Outfit 3"
            className="w-full h-auto rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Fourth Image */}
        <div className="flex justify-center items-center">
          <img
            src={outfitImage4}
            alt="Outfit 4"
            className="w-full h-auto rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
    </div>
  );
};

export default OutfitImage;
