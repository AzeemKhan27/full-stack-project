import React, { useState } from 'react';

const Slider = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide(currentSlide === images.length - 1 ? 0 : currentSlide + 1);
  };

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? images.length - 1 : currentSlide - 1);
  };

  return (
    <div className="relative">
      <button
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white px-4 py-2 rounded-l-md"
        onClick={prevSlide}
      >
        Previous
      </button>
      <button
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white px-4 py-2 rounded-r-md"
        onClick={nextSlide}
      >
        Next
      </button>
      <div className="overflow-hidden">
        <img
          src={images[currentSlide]}
          alt={`Slide ${currentSlide + 1}`}
          className="w-full h-64 object-contain"
        />
      </div>
    </div>
  );
};

export default Slider;
