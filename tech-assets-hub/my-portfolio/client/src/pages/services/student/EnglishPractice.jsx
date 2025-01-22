// client/src/pages/services/student/EnglishPractice.jsx
import './css/EnglishPractice.css'; // Import the CSS file for styling
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../../../services-api/apiService.js';
import Payment from '../../../components/Payment.jsx';

const EnglishPractice = () => {
  const [instructors, setInstructors] = useState([]);
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const response = await apiService.getInstructors();
        setInstructors(response.data);
      } catch (error) {
        console.error('Error fetching instructors:', error);
      }
    };

    fetchInstructors();
  }, []);

  const handleInstructorClick = (instructor) => {
    setSelectedInstructor(instructor);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiService.sendEnglishPracticeNotification({
        ...formData,
        instructorEmail: selectedInstructor.email,
      });
      alert('Notification sent successfully!');
      navigate('/services/student');
    } catch (error) {
      console.error('Error sending notification:', error);
      alert('Failed to send notification. Please try again later.');
    }
  };

  const handlePaymentSuccess = () => {
    alert('Payment successful!');
    handleSubmit();
  };

  const handlePaymentFailure = () => {
    alert('Payment failed. Please try again.');
  };

  return (
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-center mb-8">English Practice Instructors</h1>
          <div className="instructor-gallery">
            {instructors.map((instructor) => (
              <div
                key={instructor._id}
                className="hover-container"
                onClick={() => handleInstructorClick(instructor)}
              >
                <img src={instructor.image} alt={instructor.name} className="hover-image" />
                <div className="hover-content">
                  <h3 className="instructor-name">{instructor.name}</h3>
                  <p className="instructor-bio">{instructor.bio}</p>
                  <p className="instructor-email">{instructor.email}</p>
                </div>
              </div>
            ))}
          </div>
          {selectedInstructor && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Contact {selectedInstructor.name}</h2>
              <form onSubmit={handleSubmit}>
                {/* Form fields go here */}
                <Payment
                  course={{ title: 'English Practice', description: 'English Practice Session', price: 500 }}
                  paymentType="english-practice"
                  onPaymentSuccess={handlePaymentSuccess}
                  onPaymentFailure={handlePaymentFailure}
                />
              </form>
            </div>
          )}
        </div>
  );
};

export default EnglishPractice;


// // client/src/pages/services/student/EnglishPractice.jsx
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import apiService from '../../../services-api/apiService.js';
// import Payment from '../../../components/Payment.jsx';

// const EnglishPractice = () => {
//   const [instructors, setInstructors] = useState([]);
//   const [selectedInstructor, setSelectedInstructor] = useState(null);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     message: '',
//   });
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchInstructors = async () => {
//       try {
//         const response = await apiService.getInstructors();
//         setInstructors(response.data);
//       } catch (error) {
//         console.error('Error fetching instructors:', error);
//       }
//     };

//     fetchInstructors();
//   }, []);

//   const handleInstructorClick = (instructor) => {
//     setSelectedInstructor(instructor);
//   };

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await apiService.sendEnglishPracticeNotification({
//         ...formData,
//         instructorEmail: selectedInstructor.email,
//       });
//       alert('Notification sent successfully!');
//       navigate('/services/student');
//     } catch (error) {
//       console.error('Error sending notification:', error);
//       alert('Failed to send notification. Please try again later.');
//     }
//   };

//   const handlePaymentSuccess = () => {
//     alert('Payment successful!');
//     handleSubmit();
//   };

//   const handlePaymentFailure = () => {
//     alert('Payment failed. Please try again.');
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold text-center mb-8">English Practice Instructors</h1>
//       <div className="grid md:grid-cols-2 gap-4">
//         {instructors.map((instructor) => (
//           <div
//             key={instructor._id}
//             className="border rounded-lg shadow-md p-4 bg-gray-100 hover:bg-blue-50 cursor-pointer"
//             onClick={() => handleInstructorClick(instructor)}
//           >
//             <h2 className="text-lg font-semibold">{instructor.name}</h2>
//             <p className="text-sm text-gray-600 mt-1">{instructor.bio}</p>
//           </div>
//         ))}
//       </div>
//       {selectedInstructor && (
//         <div className="mt-8">
//           <h2 className="text-2xl font-bold mb-4">Contact {selectedInstructor.name}</h2>
//           <form onSubmit={handleSubmit}>
//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 required
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 required
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2">Phone</label>
//               <input
//                 type="text"
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 required
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2">Message</label>
//               <textarea
//                 name="message"
//                 value={formData.message}
//                 onChange={handleChange}
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 required
//               />
//             </div>
//             <Payment
//               course={{ title: 'English Practice', description: 'English Practice Session', price: 500 }}
//               paymentType="english-practice"
//               onPaymentSuccess={handlePaymentSuccess}
//               onPaymentFailure={handlePaymentFailure}
//             />
//           </form>
//         </div>
//       )}
//     </div>
//   );
// };

// export default EnglishPractice;
