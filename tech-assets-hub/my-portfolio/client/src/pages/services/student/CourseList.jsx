
// client/src/pages/services/student/CourseList.jsx
// ------------------------Code Part 3---------------------------

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Payment from '../../../components/Payment.jsx';
import BackButton from '../../../components/BackButton.jsx';

const CourseList = () => {
  const location = useLocation();
  const { courses } = location.state || { courses: [] };
  

  if (!courses.length) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col items-center text-gray-700 text-sm mb-4">
          <p className="text-lg font-semibold text-gray-600">No courses found.</p>
          <BackButton
            text="Go Back"
            textColor="text-white"
            bgColor="bg-gray-500"
            hoverBgColor="bg-gray-600"
            className="mt-4"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Search Results</h1>
        
        {/* back button */}
        <BackButton
          text="Back"
          textColor="text-white"
          bgColor="bg-gray-500"
          hoverBgColor="bg-gray-600"
        />
        {/* back button */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course, index) => {
          const [showFullSyllabus, setShowFullSyllabus] = useState(false);

          const toggleSyllabus = () => {
            setShowFullSyllabus(!showFullSyllabus);
          };

          return (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              {/* Course Banner Image */}
              <img
                src={course.course_banner_image}
                alt={course.title}
                className="w-full h-48 sm:h-60 object-cover"
              />

              <div className="p-6 flex flex-col h-full">
                {/* Course Title */}
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">{course.title}</h2>

                {/* Course Description */}
                <p className="text-gray-600 text-sm mb-4">
                  {course.description || 'No description available.'}
                </p>

                {/* Duration and Price */}
                <div className="flex justify-between items-center text-gray-700 text-sm mb-4">
                  <span>Duration: {course.duration}</span>
                  <span>Price: ₹{course.price}</span>
                </div>

                {/* Syllabus */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-gray-800 font-semibold mb-2">Syllabus:</h3>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600 text-sm">
                    {course.syllabus.slice(0, showFullSyllabus ? course.syllabus.length : 4).map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                  {course.syllabus.length > 4 && (
                    <button
                      onClick={toggleSyllabus}
                      className="text-blue-500 text-sm mt-2 hover:text-blue-600 transition duration-300"
                    >
                      {showFullSyllabus ? 'Show Less' : '...and more'}
                    </button>
                  )}
                </div>

                {/* FAQs */}
                <div className="mt-4">
                  <h3 className="text-gray-800 font-semibold mb-2">FAQs:</h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600 text-sm">
                    {course.faq.map((faqItem, faqIdx) => (
                      <li key={faqIdx}>
                        <span className="font-bold">{faqItem.question}</span>
                        <p>{faqItem.answer}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Instructors */}
                <div className="mt-4">
                  <h3 className="text-gray-800 font-semibold mb-2">Instructors:</h3>
                  {course.instructors.map((instructor, i) => (
                    <div key={i} className="flex items-center mt-3">
                      {/* Instructor Image */}
                      {instructor.image ? (
                        <img
                          src={instructor.image}
                          alt={instructor.name}
                          className="w-10 h-10 rounded-full object-cover mr-3"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/48'; // Fallback image
                          }}
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                          <span className="text-xs text-gray-600">No Image</span>
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-gray-800">{instructor.name}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Timing */}
                <p className="mt-4 text-gray-500 text-sm">
                  <i><strong>Timing: {course.timing}</strong></i>
                </p>

                {/* Payment Component */}
                <div className="mt-6">
                  <Payment course={course} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CourseList;