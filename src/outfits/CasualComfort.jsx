import React, { useState } from 'react';
import CasualComfort1 from '../assets/CasualComfort/1.1.jpg';
import CasualComfort2 from '../assets/CasualComfort/2.jpg';
import CasualComfort3 from '../assets/CasualComfort/3.jpg';
import CasualComfort4 from '../assets/CasualComfort/4.jpg';
import CasualComfort5 from '../assets/CasualComfort/5.jpg';
import CasualComfort6 from '../assets/CasualComfort/6.jpg';
import CasualComfort7 from '../assets/CasualComfort/7.jpg';
import CasualComfort8 from '../assets/CasualComfort/8.jpg';
import CasualComfort9 from '../assets/CasualComfort/9.jpg';
import CasualComfort10 from '../assets/CasualComfort/10.jpg';
import CasualComfort11 from '../assets/CasualComfort/11.jpg';
import CasualComfort12 from '../assets/CasualComfort/12.jpg';

const CasualComfort = ({ searchQuery }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
    { src: CasualComfort1, caption: 'Casual Look 1' },
    { src: CasualComfort2, caption: 'Casual Look 2' },
    { src: CasualComfort3, caption: 'Casual Look 3' },
    { src: CasualComfort4, caption: 'Casual Look 4' },
    { src: CasualComfort5, caption: 'Casual Look 5' },
    { src: CasualComfort6, caption: 'Casual Look 6' },
    { src: CasualComfort7, caption: 'Casual Look 7' },
    { src: CasualComfort8, caption: 'Casual Look 8' },
    { src: CasualComfort9, caption: 'Casual Look 9' },
    { src: CasualComfort10, caption: 'Casual Look 10' },
    { src: CasualComfort11, caption: 'Casual Look 11' },
    { src: CasualComfort12, caption: 'Casual Look 12' },
  ];

  const filteredImages = images.filter((image) =>
    image.caption.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openImage = (image) => setSelectedImage(image);
  const closeImage = () => setSelectedImage(null);

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-10">
      <h2 className="text-3xl font-bold text-center mb-8">Casual Comfort</h2>
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

export default CasualComfort;
