import { Carousel, Typography, Button } from "@material-tailwind/react";
import React, { useState, useEffect } from 'react';

const Slider = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Define an array of text content corresponding to each image
  const slideText = [
    { 
      title: "Best Service",
      description: "Efficient, reliable, personalized, friendly, professional, accessible, proactive, transparent, empathetic, trustworthy, affordable, and excellent service."
    },
    
    {
        title: "Quality In Affordable price",
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
    }, 2000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <Carousel className="rounded-xl">
      <div className="relative h-full w-full m-14">
        <img
          src={images[currentSlide]}
          alt={`Slide ${currentSlide + 1}`}
          className="bg-amber-500 w-screen h-64 object-cover"
        />
        <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/75">
          <div className="w-3/4 text-center md:w-2/4">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-3xl md:text-4xl lg:text-5xl"
            >
              {slideText[currentSlide].title} {/* Use current slide's title */}
            </Typography>
            <Typography
              variant="lead"
              color="white"
              className="mb-12 opacity-80"
            >
              {slideText[currentSlide].description} {/* Use current slide's description */}
            </Typography>
          </div>
        </div>
      </div>
    </Carousel>
  );
}

export default Slider;
