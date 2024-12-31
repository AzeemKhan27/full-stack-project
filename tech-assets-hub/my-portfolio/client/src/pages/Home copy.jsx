// Home.jsx

import React, { useState } from 'react';
import Slider from './Slider';

import AboutOurFreelance from "../components/sections/AboutOurFreelance.jsx";

import Testimonials from "../components/sections/Testimonials.jsx";
import Services from '../components/sections/Services.jsx';
import CallToAction from '../components/sections/CallToAction.jsx'

const Home = () => {
  const message = "We are a team of skilled freelance developers who offer a variety of website and app development services at budget-friendly prices. Our team members are currently working on two CRM-based projects, utilizing the latest technologies and best practices to deliver high-quality solutions. We specialize in helping small and medium-sized startups build a strong online presence and compete in the digital world. Our experienced full-stack developers create customized solutions tailored to your unique needs. We understand the challenges of building a website on a tight budget, so we focus on providing cost-effective services that deliver the best value for your money. Our top priority is customer satisfaction, and we're committed to continuously improving our services. As freelancers, we offer flexibility and personalized attention that larger companies can't match, ensuring that your project gets the care and attention it deserves. Let us help you turn your vision into reality.";
  const title = "Our Freelance Team";
  const greet = "A warm welcome to you here";

  const images = [
    "./image1.jpg",
    "./image2.jpg",
    "./image3.jpg",
    "./image4.png"
  ];


  return (
   
    // <div className="container mx-auto flex flex-col items-center justify-center">
    //   <Slider images={images} />
     
    //   <div className="bg-white-100 text-4xl font-bold m-8 
    //                   rounded-[6px] p-8"> 
    //     <h2 className="text-black capitalize text-4.5xl my-4 animate-bounce 
    //                    bg-clip-text text-transparent bg-gradient-to-b from-pink-200 
    //                    to-blue-600">
    //       {greet}
    //     </h2>
    //   </div>

    <div className="container mx-auto flex flex-col items-center justify-center bg-gradient-to-r from-purple-500 to-blue-500 min-h-screen p-8">
  <Slider images={images} />

  <div className="bg-white shadow-lg rounded-lg p-10 mt-8 max-w-md w-full text-center">
    <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-blue-600 mb-4 animate-pulse">
      {greet}
    </h2>
    <p className="text-gray-700 text-lg mb-6">
      Welcome to our amazing platform! Explore and enjoy the best content tailored just for you.
    </p>
    <button className="bg-gradient-to-r from-pink-500 to-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
      Get Started
    </button>
  </div>


      {/* About Our Freelance Section */}

      <AboutOurFreelance title={title} message={message} />

      {/* //Service Section */}

      <Services />

      {/* Testimonials */}

      <Testimonials />

      {/* CallToAction */}

      <CallToAction />
      
</div>


    
    
  );
}

export default Home;
