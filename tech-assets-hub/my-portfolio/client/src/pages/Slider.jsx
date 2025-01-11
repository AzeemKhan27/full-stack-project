

import React, { useState, useEffect } from 'react';

const Slider = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slideText = [
    { 
      title: "Best Service",
      description: "Efficient, reliable, personalized, friendly, professional, accessible, proactive, transparent, empathetic, trustworthy, affordable, and excellent service."
    },
    {
      title: "Quality In Affordable Price",
      description: "Affordable, high-quality products/services through operational efficiency and customer satisfaction focus."
    },
    {
      title: "Best Team",
      description: "A high-performing, collaborative, and diverse team with complementary skills, strong communication, and a shared vision for success."
    },
    {
      title: "Life Time Support",
      description: "Comprehensive, ongoing assistance and maintenance provided to ensure customer satisfaction and product longevity, backed by a commitment to continuous improvement and innovation."
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full h-96 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-black-400 to-purple-900 animate-gradient-x"></div>

      {/* Slider Container */}
      <div className="relative w-full h-full flex items-center justify-center">
        {images.map((image, index) => (
          <div
            key={`${image}-${index}`} // Unique key to force re-render
            className={`absolute w-full h-full transition-all duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
            }`}
          >
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50">
              <div className="text-center text-white px-4">
                {/* Animated Title */}
                <h1
                  className="mb-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold animate-text-slide-in"
                  style={{ animationDelay: '0.5s' }}
                >
                  {slideText[index].title}
                </h1>
                {/* Animated Description */}
                <p
                  className="mb-4 text-sm sm:text-base md:text-lg lg:text-xl opacity-80 animate-text-slide-in"
                  style={{ animationDelay: '1s' }}
                >
                  {slideText[index].description}
                </p>
                {/* Animated Button */}
                {/* <button
                  className="mt-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105 animate-text-slide-in"
                  style={{ animationDelay: '1.5s' }}
                >
                  Learn More
                </button> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;