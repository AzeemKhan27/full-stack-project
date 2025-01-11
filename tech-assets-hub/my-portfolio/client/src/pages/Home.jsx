// // import React from 'react';
// // import Slider from './Slider';
// // import AboutOurFreelance from "../components/sections/AboutOurFreelance.jsx";
// // import Testimonials from "../components/sections/Testimonials.jsx";
// // import Services from '../components/sections/Services.jsx';
// // import CallToAction from '../components/sections/CallToAction.jsx';

// // const Home = () => {
// //   const message = "We are a team of skilled freelance developers who offer a variety of website and app development services at budget-friendly prices. Our team members are currently working on two CRM-based projects, utilizing the latest technologies and best practices to deliver high-quality solutions. We specialize in helping small and medium-sized startups build a strong online presence and compete in the digital world. Our experienced full-stack developers create customized solutions tailored to your unique needs. We understand the challenges of building a website on a tight budget, so we focus on providing cost-effective services that deliver the best value for your money. Our top priority is customer satisfaction, and we're committed to continuously improving our services. As freelancers, we offer flexibility and personalized attention that larger companies can't match, ensuring that your project gets the care and attention it deserves. Let us help you turn your vision into reality.";
  
// //   const title = "Our Freelance Team";
// //   const greet = "A warm welcome to you here";
// //   const headline = "Join us today and take your project to the next level with our expert team.";

// //   const images = [
// //     "./image1.jpg",
// //     "./image2.jpg",
// //     "./image3.jpg",
// //     "./image4.png"
// //   ];

// //   return (
// //     <div className="bg-gray-100 min-h-screen flex flex-col items-center">
// //       <Slider images={images} />

// //       <div className="container mx-auto flex flex-col items-center justify-center p-8">
// //         <div className="bg-white shadow-lg rounded-lg p-10 mt-8 max-w-md w-full text-center">
// //           <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-blue-800 mb-4 animate-pulse">
// //             {greet}
// //           </h2>
// //           <p className="text-gray-700 text-lg mb-6">
// //             Welcome to our amazing platform! Explore and enjoy the best content tailored just for you.
// //           </p>
// //           <a href="/contact" className="bg-gradient-to-r from-blue-800 to-blue-400 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
// //             Get Started
// //           </a>
// //         </div>

// //         {/* About Our Freelance Section */}
// //         <AboutOurFreelance title={title} message={message} />

// //         {/* Service Section */}
// //         <Services />

// //         {/* Testimonials */}
// //         <Testimonials />

// //         {/* CallToAction */}
// //         <CallToAction headline={headline} />
// //       </div>
// //     </div>
// //   );
// // }

// // export default Home;

// import React from 'react';
// import Slider from './Slider';
// import AboutOurFreelance from "../components/sections/AboutOurFreelance.jsx";
// import Testimonials from "../components/sections/Testimonials.jsx";
// import Services from '../components/sections/Services.jsx';
// import CallToAction from '../components/sections/CallToAction.jsx';

// const Home = () => {
//   const message = "We are a team of skilled freelance developers who offer a variety of website and app development services at budget-friendly prices. Our team members are currently working on two CRM-based projects, utilizing the latest technologies and best practices to deliver high-quality solutions. We specialize in helping small and medium-sized startups build a strong online presence and compete in the digital world. Our experienced full-stack developers create customized solutions tailored to your unique needs. We understand the challenges of building a website on a tight budget, so we focus on providing cost-effective services that deliver the best value for your money. Our top priority is customer satisfaction, and we're committed to continuously improving our services. As freelancers, we offer flexibility and personalized attention that larger companies can't match, ensuring that your project gets the care and attention it deserves. Let us help you turn your vision into reality.";
  
//   const title = "Our Freelance Team";
//   const greet = "A warm welcome to you here";
//   const headline = "Join us today and take your project to the next level with our expert team.";

//   const images = [
//     "/image1.jpg",
//     "/image2.jpg",
//     "/image3.jpg",
//     "/image4.png"
//   ];

//   return (
//     <div className="min-h-screen bg-transparent">
//       <Slider images={images} />

//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg">
//           <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-blue-800 mb-4 animate-pulse">
//             {greet}
//           </h2>
//           <p className="text-gray-700 text-lg mb-6">
//             Welcome to our amazing platform! Explore and enjoy the best content tailored just for you.
//           </p>
//           <a href="/contact" className="bg-gradient-to-r from-blue-800 to-blue-400 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
//             Get Started
//           </a>
//         </div>

//         {/* About Our Freelance Section */}
//         <AboutOurFreelance title={title} message={message} />

//         {/* Service Section */}
//         <Services />

//         {/* Testimonials */}
//         <Testimonials />

//         {/* CallToAction */}
//         <CallToAction headline={headline} />
//       </div>
//     </div>
//   );
// }

// export default Home;

import React from 'react';
import Slider from './Slider';
import AboutOurFreelance from "../components/sections/AboutOurFreelance.jsx";
import Testimonials from "../components/sections/Testimonials.jsx";
import Services from '../components/sections/Services.jsx';
import CallToAction from '../components/sections/CallToAction.jsx';

const Home = () => {
  const message = "We are a team of skilled freelance developers who offer a variety of website and app development services at budget-friendly prices. Our team members are currently working on two CRM-based projects, utilizing the latest technologies and best practices to deliver high-quality solutions. We specialize in helping small and medium-sized startups build a strong online presence and compete in the digital world. Our experienced full-stack developers create customized solutions tailored to your unique needs. We understand the challenges of building a website on a tight budget, so we focus on providing cost-effective services that deliver the best value for your money. Our top priority is customer satisfaction, and we're committed to continuously improving our services. As freelancers, we offer flexibility and personalized attention that larger companies can't match, ensuring that your project gets the care and attention it deserves. Let us help you turn your vision into reality.";
  
  const title = "Our Freelance Team";
  const greet = "A warm welcome to you here";
  const headline = "Join us today and take your project to the next level with our expert team.";

  const images = [
    "/image1.jpg",
    "/image2.jpg",
    "/image3.jpg",
    "/image4.png"
  ];

  return (
    <div className="min-h-screen bg-transparent">
      <Slider images={images} />

      <div className=" container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="m-12 bg-white bg-opacity-90 p-4 sm:p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-blue-800 mb-4 animate-pulse">
            {greet}
          </h2>
          <p className="text-gray-700 text-base sm:text-lg mb-6">
            Welcome to our amazing platform! Explore and enjoy the best content tailored just for you.
          </p>
          <a href="/contact" className="bg-gradient-to-r from-blue-800 to-blue-400 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
            Get Started
          </a>
        </div>

        {/* About Our Freelance Section */}
        <AboutOurFreelance title={title} message={message} />

        {/* Service Section */}
        <Services />

        {/* Testimonials */}
        <Testimonials />

        {/* CallToAction */}
        <CallToAction headline={headline} />
      </div>
    </div>
  );
}

export default Home;