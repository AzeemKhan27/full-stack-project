// // src/components/Testimonials.js

// import React, { useEffect, useState  } from 'react';
// import './css/Testimonials.css'; // Import the CSS file for styles
// import apiService from "../../services-api/apiService.js";

// const Testimonials = () => {
//   const [testimonials, setTestimonials] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const slidesToShow = 3; // Change this to 2 for two cards

//   //fetch testimonials from an API

//   const fetchTestimonials = async () => {
//     try {
//       const data = await apiService.getTestimonials(); // Use the new method
//       setTestimonials(data);
//     } catch (error) {
//       console.log("Error fetching testimonials : ", error.message);
      
//     }
//   }

//   useEffect(() => {
//     fetchTestimonials(); // Fetch testimonials on component mount
//     const interval = setInterval(() => {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % (testimonials.length - slidesToShow + 1));
//     }, 2000); // Change slide every 2 seconds

//     return () => clearInterval(interval);
//   }, [testimonials.length]);

//   return (
//     <div className="bg-white-100 py-16">
//       <div className="container mx-auto px-4">
//         <h2 className="text-3xl font-bold text-center mb-8">What Our Clients Say</h2>
//         <div className="slider">
//           <div className="slides" style={{ transform: `translateX(${-currentIndex * (100 / slidesToShow)}%)` }}>
//             {testimonials.map((testimonial, index) => (
//               <div className="slide bg-white rounded-lg shadow-lg p-6" key={index}>
//                 <img src={testimonial.avatar} alt={testimonial.name} className="w-24 h-24 rounded-full mb-4" />
//                 <p className="text-gray-600 mb-4">"{testimonial.feedback}"</p>
//                 <h3 className="font-semibold text-lg">{testimonial.name}</h3>
//                 <p className="text-gray-500">{testimonial.designation}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Testimonials;


import React, { useEffect, useState } from 'react';
import './css/Testimonials.css';
import apiService from "../../services-api/apiService.js";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(1); // Default to 1 slide for mobile

  const fetchTestimonials = async () => {
    try {
      const data = await apiService.getTestimonials();
      setTestimonials(data);
    } catch (error) {
      console.log("Error fetching testimonials: ", error.message);
      setTestimonials([]); // Fallback to an empty array
    }
  };

  // Function to update slidesToShow based on screen width
  const updateSlidesToShow = () => {
    if (window.innerWidth >= 1024) {
      setSlidesToShow(3); // Desktop
    } else if (window.innerWidth >= 640) {
      setSlidesToShow(2); // Tablet
    } else {
      setSlidesToShow(1); // Mobile
    }
  };

  useEffect(() => {
    fetchTestimonials();
    updateSlidesToShow(); // Set initial slidesToShow
    window.addEventListener('resize', updateSlidesToShow); // Update on resize

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % (testimonials.length - slidesToShow + 1));
    }, 2000);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', updateSlidesToShow); // Cleanup
    };
  }, [testimonials.length, slidesToShow]);

  return (
    <div className="bg-white-100 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">What Our Clients Say</h2>
        <div className="slider">
          <div className="slides" style={{ transform: `translateX(${-currentIndex * (100 / slidesToShow)}%)` }}>
            {testimonials.map((testimonial, index) => (
              <div className="slide bg-white rounded-lg shadow-lg p-6" key={index}>
                <img src={testimonial.avatar} alt={testimonial.name} className="w-24 h-24 rounded-full mb-4" />
                <p className="text-gray-600 mb-4">"{testimonial.feedback}"</p>
                <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                <p className="text-gray-500">{testimonial.designation}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;