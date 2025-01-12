import React, { useState } from 'react';
import FormalElegance1 from '../assets/FormalElegance/1.1.jpg';
import FormalElegance2 from '../assets/FormalElegance/2.jpg';
import FormalElegance3 from '../assets/FormalElegance/3.jpg';
import FormalElegance4 from '../assets/FormalElegance/4.jpg';
import FormalElegance5 from '../assets/FormalElegance/5.jpg';
import FormalElegance6 from '../assets/FormalElegance/6.jpg';
import FormalElegance7 from '../assets/FormalElegance/7.jpg';
import FormalElegance8 from '../assets/FormalElegance/8.jpg';
import FormalElegance9 from '../assets/FormalElegance/9.jpg';
import FormalElegance10 from '../assets/FormalElegance/10.jpg';
import FormalElegance11 from '../assets/FormalElegance/11.jpg';
import FormalElegance12 from '../assets/FormalElegance/12.jpg';

const FormalElegance = ({ searchQuery }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
    { src: FormalElegance1, caption: "Formal Elegance 1" },
    { src: FormalElegance2, caption: "Formal Elegance 2" },
    { src: FormalElegance3, caption: "Formal Elegance 3" },
    { src: FormalElegance4, caption: "Formal Elegance 4" },
    { src: FormalElegance5, caption: "Formal Elegance 5" },
    { src: FormalElegance6, caption: "Formal Elegance 6" },
    { src: FormalElegance7, caption: "Formal Elegance 7" },
    { src: FormalElegance8, caption: "Formal Elegance 8" },
    { src: FormalElegance9, caption: "Formal Elegance 9" },
    { src: FormalElegance10, caption: "Formal Elegance 10" },
    { src: FormalElegance11, caption: "Formal Elegance 11" },
    { src: FormalElegance12, caption: "Formal Elegance 12" },
  ];

  // Filter images based on search query
  const filteredImages = images.filter((image) =>
    image.caption.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openImage = (image) => setSelectedImage(image);
  const closeImage = () => setSelectedImage(null);

  return (
    <div className="px-6 py-8">
      <h2 className="text-3xl font-bold text-center mb-8">Formal Elegance</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 justify-center">
        {filteredImages.map((image, index) => (
          <div
            key={index}
            className="h-80 w-full sm:w-60 lg:w-56 bg-gray-200 rounded-lg shadow-lg overflow-hidden"
          >
            <img
              src={image.src}
              alt={image.caption}
              className="h-full w-full object-cover cursor-pointer"
              onClick={() => openImage(image)}
            />
          </div>
        ))}
        {filteredImages.length === 0 && (
          <p className="col-span-full text-center text-gray-500">
            No results found for &quot;{searchQuery}&quot;.
          </p>
        )}
      </div>

      {/* Modal for full-screen image */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
          <div className="relative">
            <button
              className="absolute top-2 right-2 bg-gray-800 text-white rounded-full p-2 z-60"
              onClick={closeImage}
            >
              close
            </button>
            <img
              src={selectedImage.src}
              alt={selectedImage.caption}
              className="max-h-screen max-w-screen-lg object-contain rounded-md"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FormalElegance;
