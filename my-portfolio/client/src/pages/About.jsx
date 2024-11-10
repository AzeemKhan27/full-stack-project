// About.jsx

import React, { useEffect, useState } from 'react';
import Typewriter from "../components/Typewriter/TypeWriter";

const freelancers = [
  // {
  //   name: 'Jeeshan Khan',
  //   role: 'Backend Nodejs Developer',
  //   experience: '1+ years',
  //   skills: ['ExpressJS', 'Node.js', 'NestJS', 'JavaScript'],
  //   image: 'https://media.licdn.com/dms/image/v2/D5635AQHQCds-ZCeX7g/profile-framedphoto-shrink_800_800/profile-framedphoto-shrink_800_800/0/1727176833225?e=1728849600&v=beta&t=YPfs6EZQ3TbwsOoBN_GPtYWWCpwuq829Jl-IScg-tLY',
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
    image: 'https://media.licdn.com/dms/image/v2/D5603AQHs_0Nr2iLZhA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1719810106969?e=1733961600&v=beta&t=UOfeeFddAdNc5hLCYrJ7UhoBERSO5816KGkc2jh99Rs',
  },
];




const About = () => {
  const words = ["We Are Here To Appreciate You To Touch More Heights"]
  return (
    <div className="container mx-auto p-4 mt-5">
      <hr />

      {/* //section 1  */}
      <h1 className="text-7xl m-4" >About Us</h1>
      <div className="bg-orange-10 mx-auto m-4">
          
          <h6 >Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam totam porro dolorum amet, quisquam ducimus adipisci. Debitis exercitationem perferendis dicta deserunt consectetur maiores sapiente asperiores, repellendus officiis et velit minus placeat suscipit quia itaque perspiciatis quibusdam dolor quam necessitatibus ullam dolores rerum illo mollitia natus. Quis cupiditate natus dolore repellendus, commodi nemo adipisci, explicabo itaque fugiat accusantium voluptatibus architecto molestiae, ipsa at possimus consequuntur iste tenetur. Eius aliquam, aspernatur temporibus unde repellat nihil porro obcaecati suscipit nesciunt totam dolores mollitia quis ducimus maiores dolorum explicabo tempore et perferendis aperiam reprehenderit est, pariatur dolor blanditiis quod. Alias cupiditate unde odio delectus!</h6>
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
      <h1>hhhhhhhh</h1>
    </div>
  )
 
};
export default About;
