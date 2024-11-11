// Home.jsx

import React, { useState } from 'react';
import Slider from './Slider';

import WaveBackground from "../components/ui/bgGradient/2_WaveBackground.jsx";
import Testimonials from "../components/sections/Testimonials.jsx";
import Services from '../components/sections/Services.jsx';

const Home = () => {
  const [message, setMessage] = useState("We are a team of skilled freelance developers who offer a variety of website and app development services at budget-friendly prices. Our team members are currently working on two CRM-based projects, utilizing the latest technologies and best practices to deliver high-quality solutions. We specialize in helping small and medium-sized startups build a strong online presence and compete in the digital world. Our experienced full-stack developers create customized solutions tailored to your unique needs. We understand the challenges of building a website on a tight budget, so we focus on providing cost-effective services that deliver the best value for your money. Our top priority is customer satisfaction, and we're committed to continuously improving our services. As freelancers, we offer flexibility and personalized attention that larger companies can't match, ensuring that your project gets the care and attention it deserves. Let us help you turn your vision into reality.");
  // You can change the message based on some event or condition

  const images = [
    "./image1.jpg",
    "./image2.jpg",
    "./image3.jpg",
    "./image4.png"
  ];


  return (
   
    <div className="container mx-auto flex flex-col items-center justify-center">
      <Slider images={images} />
     
      <div className="outline outline-offset-4 outline-indigo-500 text-4xl font-bold m-8 
                      rounded-[6px] p-8"> 
 
        <h2 className="pl-96 pr-96 capitalize text-4.5xl my-4 animate-bounce 
                       bg-clip-text text-transparent bg-gradient-to-b from-pink-200 
                       to-green-600">
                    A warm welcome to you here
        </h2> 
      </div>

      <WaveBackground message={message} />

      {/* //Service Section */}

      <Services />

      {/* Testimonials */}

      <Testimonials />
      
</div>


    
    
  );
}

export default Home;
