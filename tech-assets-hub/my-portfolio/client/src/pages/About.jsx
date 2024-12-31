//About Us
import React, { useEffect, useState } from 'react';
import Typewriter from "../components/ui/Typewriter/TypeWriter";
import OurStory from "../components/sections/AboutPage/OurStory.jsx";
import OurValues from "../components/sections/AboutPage/OurValues.jsx";
// import CallToAction from "../components/sections/AboutPage/CallToAction.jsx";
import Achievements from "../components/sections/AboutPage/Achievements.jsx";
import MeetTheTeam from "../components/sections/AboutPage/MeetTheTeam.jsx";
import ContactInformation from "../components/sections/AboutPage/ContactInformation.jsx";
import { motion } from 'framer-motion';
import '../components/sections/AboutPage/css/About.css'; // Import the CSS file for the gradient animation

const freelancers = [
  {
    name: 'Azeem Khan',
    role: 'Fullstack Developer',
    experience: '3+ years',
    skills: ['Figma', 'NodeJS', 'ExpressJS/NestJS', 'TypeScript', 'ReactJS/AngularJS/NextJS','Problem-Solving Skills'],
    image: '../public/profiles/AzeemKhan.jpg',
  },
  {
    name: 'Devki Nandan Pandey',
    role: 'Mobile App Developer',
    experience: '4+ years',
    skills: ['Kotlin','React Native', 'Swift'],
    image: '../public/profiles/DevkiNandanPandey.jpg',
  },
];

const Introduction = `Welcome to "Tech Assets Hub", your go-to platform for freelance services and training! We are a dedicated team of experienced freelancers passionate about empowering individuals and businesses to achieve their goals through expert guidance and high-quality services.
At "Tech Assets Hub", we understand the dynamic nature of the freelance world and the importance of having the right skills and support. Whether you're looking to hire top-notch freelancers for your projects or seeking to enhance your own skills through our comprehensive training programs, we are here to help you succeed.
Join us on this journey as we connect talent with opportunity and foster a community of growth and collaboration!`;

const About = () => {
  const words = ["We Are Here To Appreciate You To Touch More Heights"];

  return (
    <div className="container mx-auto p-4 mt-5 ">
      <hr className="border-t-2 border-gray-300 mb-8" />

      {/* Section 1 */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-7xl font-extrabold text-center mb-8"
      >
        About Us
      </motion.h1>
      <div className="bg-white p-8 rounded-lg shadow-lg mx-auto mb-8">
        <p className="text-lg text-gray-700">{Introduction}</p>
      </div>

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl text-center font-bold mb-10"
      >
        <Typewriter words={words} />
      </motion.h1>

      <div className="flex flex-wrap justify-center gap-6 ">
        {freelancers.map((freelancer, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="bg-gradient-animated w-full md:w-1/3 xl:w-1/4 p-6 text-center bg-white rounded-lg shadow-md"
          >
            <img src={freelancer.image} alt={`${freelancer.name} Image`} className="w-24 h-24 rounded-full object-cover mx-auto mb-4" />
            <h2 className="text-lg font-bold mb-2">{freelancer.name}</h2>
            <p className="text-gray-600 font-bold">{freelancer.role}</p>
            <p className="text-gray-600 font-bold">{freelancer.experience} of experience</p>
            <ul className="m-4 list-none mb-4 flex flex-wrap  gap-2">
              {freelancer.skills.map((skill, index) => (
                <li key={index} className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded">
                  {skill}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>


        <hr />

      {/* Our Story */}

      <OurStory />

      {/* OurValues */}

      <OurValues />

      {/* MeetTheTeam */}

      <MeetTheTeam />

      {/* Achievements */}

      <Achievements/>

      {/* CallToAction */}

      {/* <CallToAction /> */}

      {/* ContactInformation   */}

      <ContactInformation />

    </div>
  )
 
};
export default About;
