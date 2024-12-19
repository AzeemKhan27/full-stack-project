// About.jsx

import React, { useEffect, useState } from 'react';
import Typewriter from "../components/ui/Typewriter/TypeWriter";
import OurStory from "../components/sections/AboutPage/OurStory.jsx"
import OurValues from "../components/sections/AboutPage/OurValues.jsx"
import CallToAction from "../components/sections/AboutPage/CallToAction.jsx"
import Achievements from "../components/sections/AboutPage/Achievements.jsx"
import MeetTheTeam from "../components/sections/AboutPage/MeetTheTeam.jsx"
import ContactInformation from "../components/sections/AboutPage/ContactInformation.jsx"


const freelancers = [
  // {
  //   name: 'Shreenath',
  //   role: 'Software Engineer',
  //   experience: '2+ years',
  //   skills: ['Python', 'Django', 'Devops', 'Cloud Computing'],
  //   image: '', //D:\Personal-Details\Career-Details\practice\Learning\fullstack\my-portfolio\client\public\profiles
  // },
  {
    name: 'Azeem Khan',
    role: 'Fullstack Developer',
    experience: '3+ years',
    skills: ['Figma', 'NodeJS', 'ExpressJS/NestJS', 'TypeScript', 'ReactJS/AngularJS/NextJS','Problem-Solving Skills'],
    image: '../public/profiles/AzeemKhan.jpg', //D:\Personal-Details\Career-Details\practice\Learning\fullstack\my-portfolio\client\public\profiles
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
  const words = ["We Are Here To Appreciate You To Touch More Heights"]
  return (
    <div className="container mx-auto p-4 mt-5">
      <hr />

      {/* //section 1  */}
      <h1 className="text-7xl m-4" >About Us</h1>
      <div className="bg-orange-10 mx-auto m-4">
          
          <h6> {Introduction} </h6>
      </div>

      <h1 className="text-3xl text-center font-bold m-10">
            {/* {words[0]} */}
        <Typewriter words={words} />
      </h1>

      <div className="flex flex-wrap justify-center">
        {freelancers.map((freelancer, index) => (
          <div key={index} className="w-full md:w-1/3 xl:w-1/4 p-6 text-center bg-white rounded shadow-md">
            <img src={freelancer.image} alt="Freelancer Image" className="w-24 h-24 rounded-full object-cover" />
            <h2 className="text-lg font-bold mb-2">{freelancer.name}</h2>
            <p className="text-gray-600">{freelancer.role}</p>
            <p className="text-gray-600">{freelancer.experience} of experience</p>
            <ul className="list-none mb-4">
              {freelancer.skills.map((skill, index) => (
                <li key={index} className="text-gray-600">{skill}</li>
              ))}
            </ul>
          </div>
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

      <CallToAction />

      {/* ContactInformation   */}

      <ContactInformation />

    </div>
  )
 
};
export default About;
