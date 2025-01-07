// client/src/components/CourseList.js
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Payment from '../../../components/Payment.jsx';

const CourseList = () => {
  const location = useLocation();
  const { courses } = location.state || { courses: [] };
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  if (!courses.length) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col items-center text-gray-700 text-sm mb-4">
          <p className="text-lg font-semibold text-gray-600">Loading...</p>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded mt-4"
            onClick={handleBack}>
            Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Search Results /</h1>
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded"
          onClick={handleBack}>
          Back
        </button>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {courses.map((course, index) => {
          const [showFullSyllabus, setShowFullSyllabus] = useState(false);

          const toggleSyllabus = () => {
            setShowFullSyllabus(!showFullSyllabus);
          };

          return (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden w-full">
              <img
                src={course.course_banner_image}
                alt={course.title}
                className="w-full h-60 object-cover"
              />

              <div className="p-4 flex flex-col h-full">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{course.title}</h2>
                <p className="text-gray-600 text-sm mb-4">
                  {course.description || 'No description available.'}
                </p>

                <div className="flex justify-between items-center text-gray-700 text-sm mb-4">
                  <span>Duration: {course.duration}</span>
                  <span>Price: ₹{course.price}</span>
                </div>

                <div className="bg-gray-100 p-4 flex-grow overflow-y-auto">
                  <h3 className="text-gray-800 font-semibold mb-2">Syllabus:</h3>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600 text-sm">
                    {course.syllabus.slice(0, showFullSyllabus ? course.syllabus.length : 4).map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                  {course.syllabus.length > 4 && (
                    <button onClick={toggleSyllabus} className="text-blue-500 text-sm mt-2">
                      {showFullSyllabus ? 'Show Less' : '...and more'}
                    </button>
                  )}

                  <h3 className="text-gray-800 font-semibold mb-2 mt-4">FAQs:</h3>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600 text-sm">
                    {course.faq.map((faqItem, faqIdx) => (
                      <li key={faqIdx}>
                        <span className="font-bold">{faqItem.question}</span>
                        <p>{faqItem.answer}</p>
                      </li>
                    ))}
                  </ul>

                    {/* instructor 1 */}

                  <div className="flex items-center mt-4">
                    <img
                      src={course.instructor_image}
                      alt={course.instructor}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <p className="font-medium text-gray-800">{course.instructor}</p>
                      {/* <p className="text-gray-500 text-sm"><i><strong>Timing: {course.timing}</strong></i></p> */}
                    </div>
                  </div>

                    {/* instructor_2 */}

                  <div className="flex items-center mt-4">
                    <img
                      src={course.instructor_image_2}
                      alt={course.instructor_2}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <p className="font-medium text-gray-800">{course.instructor_2}</p>
                    
                    </div>
                  </div>

                  <p className="mt-4 text-gray-500 text-sm"><i><strong>Timing: {course.timing}</strong></i></p>


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

