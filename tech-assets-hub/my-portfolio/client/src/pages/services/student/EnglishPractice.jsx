// client/src/pages/services/student/EnglishPractice.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../../../services-api/apiService.js';
import Payment from '../../../components/Payment.jsx';
import RegistrationForm from './RegistrationForm.jsx';
import './css/EnglishPractice.css';

const EnglishPractice = () => {
  const [instructors, setInstructors] = useState([]);
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [showRegistration, setShowRegistration] = useState(false);
  const [currentRegistrationId, setCurrentRegistrationId] = useState(null);
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

  const handlePaymentSuccess = async () => {
    try {
      await apiService.updateRegistrationPayment(currentRegistrationId, { status: 'Paid' });
      alert('Payment successful! You will receive confirmation emails shortly.');
      navigate('/services/student');
    } catch (error) {
      console.error('Payment confirmation error:', error);
    }
  };

  const handlePaymentFailure = async () => {
    try {
      await apiService.updateRegistrationPayment(currentRegistrationId, { status: 'Failed' });
      alert('Payment failed. Please check your payment details and try again.');
    } catch (error) {
      console.error('Payment update error:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">English Speaking Practice Partners</h1>
      
      <div className="instructor-gallery">
        {instructors.map((instructor) => (
          <div
            key={instructor._id}
            className="hover-container"
            onClick={() => {
              setSelectedInstructor(instructor);
              setShowRegistration(true);
            }}
          >
            <img src={instructor.image} alt={instructor.name} className="hover-image" />
            <div className="default-content">
              <h3 className="instructor-name">{instructor.name}</h3>
              <p className="instructor-tagline">{instructor.tagline}</p>
              <p className="instructor-price">₹{instructor.pricePerHalfAnHour}/30 min</p>
              <p className="instructor-duration">{instructor.callDuration} min sessions</p>
            </div>
            <div className="hover-content">
              <h3 className="instructor-name">{instructor.name}</h3>
              <p className="instructor-bio">{instructor.bio}</p>
              <p className="instructor-email">{instructor.email}</p>
              <div className="mt-4">
                <button className="book-now-button">
                  Book Session
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showRegistration && selectedInstructor && (
        <RegistrationForm
          instructor={selectedInstructor}
          onSuccess={(registrationId) => {
            setShowRegistration(false);
            setCurrentRegistrationId(registrationId);
          }}
          onClose={() => setShowRegistration(false)}
        />
      )}

      {currentRegistrationId && selectedInstructor && (
        <Payment
          course={{
            title: 'English Practice Session',
            description: `With ${selectedInstructor.name}`,
            price: selectedInstructor.pricePerHalfAnHour
          }}
          paymentType="english-practice"
          registrationId={currentRegistrationId}
          onPaymentSuccess={handlePaymentSuccess}
          onPaymentFailure={handlePaymentFailure}
          onClose={() => setCurrentRegistrationId(null)}
        />
      )}
    </div>
  );
};

export default EnglishPractice;

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import apiService from '../../../services-api/apiService.js';
// import Payment from '../../../components/Payment.jsx';
// import RegistrationForm from './RegistrationForm.jsx';
// import './css/EnglishPractice.css';

// const EnglishPractice = () => {
//   const [instructors, setInstructors] = useState([]);
//   const [selectedInstructor, setSelectedInstructor] = useState(null);
//   const [showRegistrationForm, setShowRegistrationForm] = useState(false);
//   const navigate = useNavigate();
//   const [showPayment, setShowPayment] = useState(false);
//   const [currentRegistrationId, setCurrentRegistrationId] = useState(null);

//   // Modify handleInstructorClick and add:
//   const handleRegistrationSuccess = (registrationId) => {
//     setShowPayment(true);
//     setCurrentRegistrationId(registrationId);
//   };

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
//     setShowRegistrationForm(true); // Show the registration form
//   };

//   const handlePaymentSuccess = () => {
//     alert('Payment successful!');
//     navigate('/services/student');
//   };

//   const handlePaymentFailure = () => {
//     alert('Payment failed. Please try again.');
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold text-center mb-8">English Speaking Practice Partners</h1>
//       <div className="instructor-gallery">
//   {instructors.map((instructor) => (
//     <div
//       key={instructor._id}
//       className="hover-container"
//       onClick={() => !showRegistrationForm && handleInstructorClick(instructor)} // Disable click when form is open
//     >
//       {!showRegistrationForm && ( // Hide card content when form is open
//         <>
//           <img src={instructor.image} alt={instructor.name} className="hover-image" />
//           <div className="default-content">
//             <h3 className="instructor-name">{instructor.name}</h3>
//             <p className="instructor-tagline">{instructor.tagline}</p>
//             <p className="instructor-price">₹{instructor.pricePerHalfAnHour} / 30 mins</p>
//             <p className="instructor-duration">{instructor.callDuration} mins per session</p>
//           </div>
//           <div className="hover-content">
//             <h3 className="instructor-name">{instructor.name}</h3>
//             <p className="instructor-bio">{instructor.bio}</p>
//             {/* <p className="instructor-email">{instructor.email}</p> */}
//             <p className="instructor-specialization">Specialization: {instructor.specialization}</p>
//             {/* <p className="instructor-rating">Rating: {instructor.rating} / 5</p> */}
//             <button className="book-now-button">Let's Practice!</button>
//           </div>
//         </>
//       )}
//     </div>
//   ))}
// </div>
//       {showRegistrationForm && selectedInstructor && (
//         <RegistrationForm
//           instructor={selectedInstructor}
//           onSuccess={() => {
//             setShowRegistrationForm(false); // Close the form
//             // Proceed to payment
//             return (
//               <Payment
//                 course={{ title: 'English Practice', description: 'English Practice Session', price: selectedInstructor.pricePerHalfAnHour }}
//                 paymentType="english-practice"
//                 onPaymentSuccess={handlePaymentSuccess}
//                 onPaymentFailure={handlePaymentFailure}
//               />
//             );
//           }}
//           onClose={() => setShowRegistrationForm(false)}
//         />
//       )}
//     </div>
//   );
// };

// export default EnglishPractice;

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
