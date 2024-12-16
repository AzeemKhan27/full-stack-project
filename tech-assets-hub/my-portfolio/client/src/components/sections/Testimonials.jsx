// src/components/Testimonials.js

import React, { useEffect } from 'react';

import './css/Testimonials.css'; // Import the CSS file for styles

import Swiper from 'swiper';
import 'swiper/swiper-bundle.css'; // Import Swiper styles
import './css/Testimonials.css'; // Import your custom CSS

const profile = "https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=2048x2048&w=is&k=20&c=8QovDK9XochFpaIC-N3pn5EEaRSVuE1SKpQDVUxLSUk=";

const testimonials = [
  {
    name: 'Ashwini',
    feedback: 'The web development service was outstanding! My website looks amazing and functions perfectly.',
    designation: 'MCA Student, Jain University(Bangaluru)',
    avatar: profile, // You can replace this with an actual image URL
  },
  {
    name: 'Charitha',
    feedback: 'The web development service was outstanding! My website looks amazing and functions perfectly.',
    designation: 'MCA Student, Jain University(Bangaluru)',
    avatar: profile, // You can replace this with an actual image URL
  },
  {
    name: 'Shrinath Mateti',
    feedback: 'It was an amazing experience with your tech Team and they all experience personalities hand holding me to build my final semester project',
    designation: 'B-Tech Student, Amity University',
    avatar: profile, // You can replace this with an actual image URL
  },
  {
    name: 'Manisha Verma',
    feedback: 'You all are very professionals and humble personalities. Thank you for delivering me such helpful guidance and path. Before the session, I was literally very confused about where to go and kick start my career.',
    designation: 'Junior Web Developer at IT startup, Noida',
    avatar: profile, // You can replace this with an actual image URL
  },
  {
    name: 'John Ponnapureddy',
    feedback: 'The digital marketing strategies implemented have significantly increased my traffic.',
    designation: 'Business Owner',
    avatar: profile, // You can replace this with an actual image URL
  },
];

const Testimonials = () => {

    useEffect(() => {

      const swiper = new Swiper('.mySwiper', {
  
        slidesPerView: 1,
  
        spaceBetween: 32,
  
        loop: true,
  
        centeredSlides: true,
  
        pagination: {
  
          el: '.swiper-pagination',
  
          clickable: true,
  
        },
  
        autoplay: {
  
          delay: 2500,
  
          disableOnInteraction: false,
  
        },
  
        breakpoints: {
  
          640: {
  
            slidesPerView: 1,
  
            spaceBetween: 32,
  
          },
  
          768: {
  
            slidesPerView: 2,
  
            spaceBetween: 32,
  
          },
  
          1024: {
  
            slidesPerView: 3,
  
            spaceBetween: 32,
  
          },
  
        },
  
      });
  
    }, []);

    return (

      <section className="py-12">
  
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
  
        <div className="flex flex-col items-center mb-16">
  
          <span className="text-4xl font-bold text-gray-900 mb-4 text-center capitalize">Testimonial</span>
          <h2 className="text-md font-medium text-gray-500 text-center">What our happy clients say!</h2>
        
        </div>

  
          <div className="swiper mySwiper">
  
            <div className="swiper-wrapper">
  
              {testimonials.map((testimonial, index) => (
  
                <div className="swiper-slide" key={index}>
  
                  <div className="group bg-white border border-solid border-gray-300 rounded-xl p-6 transition-all duration-500 w-full mx-auto hover:border-indigo-600 hover:shadow-sm">
  
                    <div className="flex items-center mb-7 gap-2 text-amber-500 transition-all duration-500">
  
                      <span className="text-base font-semibold text-indigo-600">4.9</span>
  
                    </div>
  
                    <p className="text-base text-gray-600 leading-6 transition-all duration-500 pb-8 group-hover:text-gray-800">
  
                      {testimonial.feedback}
  
                    </p>
  
                    <div className="flex items-center gap-5 border-t border-solid border-gray-200 pt-5">
  
                      <img className="rounded-full h-10 w-10 object-cover" src={testimonial.avatar} alt="avatar" />
  
                      <div className="block">
  
                        <h5 className="text-gray-900 font-medium transition-all duration-500 mb-1">{testimonial.name}</h5>
  
                        <span className="text-sm leading-4 text-gray-500">{testimonial.designation}</span>
  
                      </div>
  
                    </div>
  
                  </div>
  
                </div>
  
              ))}
  
            </div>
  
            <div className="swiper-pagination"></div>
  
          </div>
  
        </div>
  
      </section>
  
    );
  
  };

export default Testimonials;