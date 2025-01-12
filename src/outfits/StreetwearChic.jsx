import React, { useState } from 'react';
import StreetwearChic1 from '../assets/StreetwearChic/1.jpg';
import StreetwearChic2 from '../assets/StreetwearChic/2.jpg';
import StreetwearChic3 from '../assets/StreetwearChic/3.jpg';
import StreetwearChic4 from '../assets/StreetwearChic/4.jpg';
import StreetwearChic5 from '../assets/StreetwearChic/5.jpg';
import StreetwearChic6 from '../assets/StreetwearChic/6.jpg';
import StreetwearChic7 from '../assets/StreetwearChic/7.jpg';
import StreetwearChic8 from '../assets/StreetwearChic/8.jpg';
import StreetwearChic9 from '../assets/StreetwearChic/9.jpg';
import StreetwearChic10 from '../assets/StreetwearChic/10.jpg';
import StreetwearChic11 from '../assets/StreetwearChic/11.jpg';
import StreetwearChic12 from '../assets/StreetwearChic/12.jpg';

const StreetwearChic = ({ searchQuery }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
    { src: StreetwearChic1, caption: "Streetwear Chic 1" },
    { src: StreetwearChic2, caption: "Streetwear Chic 2" },
    { src: StreetwearChic3, caption: "Streetwear Chic 3" },
    { src: StreetwearChic4, caption: "Streetwear Chic 4" },
    { src: StreetwearChic5, caption: "Streetwear Chic 5" },
    { src: StreetwearChic6, caption: "Streetwear Chic 6" },
    { src: StreetwearChic7, caption: "Streetwear Chic 7" },
    { src: StreetwearChic8, caption: "Streetwear Chic 8" },
    { src: StreetwearChic9, caption: "Streetwear Chic 9" },
    { src: StreetwearChic10, caption: "Streetwear Chic 10" },
    { src: StreetwearChic11, caption: "Streetwear Chic 11" },
    { src: StreetwearChic12, caption: "Streetwear Chic 12" },
  ];

  const filteredImages = images.filter((image) =>
    image.caption.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openImage = (image) => setSelectedImage(image);
  const closeImage = () => setSelectedImage(null);

  return (
    <div className="px-6 py-8">
      <h2 className="text-3xl font-bold text-center mb-8">Streetwear Chic</h2>
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

export default StreetwearChic;
