// Home.jsx

import React from 'react';
import Slider from './Slider';

const Home = () => {

  const images = [
    "./image1.jpg",
    "./image2.jpg",
    "./image3.jpg",
    "./image4.png"
  ];

  return (
    <div className="container mx-auto flex flex-col items-center justify-center ">
      <Slider images={images} />
      <h2 className="text-4xl font-bold my-4 animate-bounce">A warm welcome to you here!</h2>
      <p className="text-lg bg-gray-100 rounded p-4">
         We are a team of skilled freelance developers who offer a variety of website and app development services at budget-friendly prices. Our team members are currently working on two CRM-based projects, utilizing the latest technologies and best practices to deliver high-quality solutions. We specialize in helping small and medium-sized startups build a strong online presence and compete in the digital world. Our experienced full-stack developers create customized solutions tailored to your unique needs. We understand the challenges of building a website on a tight budget, so we focus on providing cost-effective services that deliver the best value for your money. Our top priority is customer satisfaction, and we're committed to continuously improving our services. As freelancers, we offer flexibility and personalized attention that larger companies can't match, ensuring that your project gets the care and attention it deserves. Let us help you turn your vision into reality!
      </p>
    </div>
  );
}

export default Home;
