import React from 'react';
import { useLocation } from 'react-router-dom';
import "./css/studentServices.css"

const CourseList = () => {
  const location = useLocation();
  const { courses } = location.state || { courses: [] };

  if (!courses.length) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    // <div className="dropdown-cards"> {/* Add a new class here */}
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Search Results</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={course.course_banner_image}
              alt={course.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold text-gray-800 mb-2">{course.title}</h2>
              <p className="text-gray-600 text-sm mb-4">
                {course.description || 'No description available.'}
              </p>
              <div className="flex justify-between items-center text-gray-700 text-sm">
                <span>Duration: {course.duration}</span>
                <span>Price: ₹{course.price}</span>
              </div>
            </div>
            <div className="bg-gray-100 p-4">
              <h3 className="text-gray-800 font-semibold mb-2">Syllabus:</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-600 text-sm">
                {course.syllabus.slice(0, 4).map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
              {course.syllabus.length > 4 && (
                <p className="text-blue-500 text-sm mt-2">...and more</p>
              )}
            </div>
            <div className="flex items-center p-4">
              <img
                src={course.instructor_image}
                alt={course.instructor}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <p className="font-medium text-gray-800">{course.instructor}</p>
                <p className="text-gray-500 text-sm">{course.timing}</p>
              </div>
            </div>
          </div>
        ))}
        {/* </div> */}
      </div>
    </div>
  );
};

export default CourseList;
