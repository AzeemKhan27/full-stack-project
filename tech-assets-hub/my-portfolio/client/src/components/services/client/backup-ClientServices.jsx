// import React, { useState } from 'react';
// import axios from 'axios';
// import PhoneInput from 'react-phone-input-2';
// import 'react-phone-input-2/lib/style.css';

// // "emailjs-com": "^3.2.0",
// const ClientModule = () => {
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [formData, setFormData] = useState({
//     clientName: '',
//     phoneNumber: '',
//     email: '',
//     message: '',
//   });
//   const [formSubmitted, setFormSubmitted] = useState(false);

//   const options = [
//     {
//       name: 'Project Building',
//       description:
//         'Our expertise in project development ensures your ideas come to life with precision and professionalism.',
//       image: '../../public/ClientServices/project-building-bg.jpg',
//       formImage: '../../public/ClientServices/project-building.jpg',
//     },
//     {
//       name: 'Pick Freelancer',
//       description:
//         'Handpick the best freelancers to meet your unique business needs efficiently.',
//       image: '../../public/ClientServices/pick-freelancer-bg.jpg',
//       formImage: '../../public/ClientServices/pick-freelancer.jpg',
//     },
//     {
//       name: 'Maintenance',
//       description:
//         'We provide reliable and cost-effective maintenance services to keep your operations smooth.',
//       image: '../../public/ClientServices/maintenance-bg.jpg',
//       formImage: '../../public/ClientServices/maintenance.jpg',
//     },
//     {
//       name: 'Collaborate with Us for Futuristic Businesses',
//       description:
//         'Partner with us to build innovative solutions that shape the future.',
//       image: '../../public/ClientServices/collaborate-bg.jpg',
//       formImage: '../../public/ClientServices/collaborate.jpg',
//     },
//   ];

//   const handleOptionClick = (option) => {
//     setSelectedOption(option);
//     setFormSubmitted(false);
//     setFormData({ clientName: '', phoneNumber: '', email: '', message: '' });
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const payload = {
//       ...formData,
//       serviceType: selectedOption.name,
//     };

//     try {
    
//        const response = await axios.post('http://localhost:5000/api/services/notifications/client/notify-client', payload);

//       console.log(response.data);
//       setFormSubmitted(true);
//     } catch (error) {
//       console.error('Error submitting form:', error.response?.data || error.message);
//     }
//   };

//   return (
//     <div className="min-h-screen">
//       {/* Background Section */}
//       {selectedOption && (
//         <div
//           className="relative bg-cover bg-center text-white py-20 px-6 transition-all duration-300"
//           style={{
//             backgroundImage: `url(${selectedOption.image})`,
//           }}
//         >
//           <div className="max-w-3xl mx-auto text-center bg-black bg-opacity-50 p-6 rounded-md">
//             <h2 className="text-4xl font-bold mb-4">{selectedOption.name}</h2>
//             <p className="text-lg">{selectedOption.description}</p>
//           </div>
//         </div>
//       )}

//       {/* Options Section */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6 mt-8">
//         {options.map((option) => (
//           <div
//             key={option.name}
//             className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform"
//             onClick={() => handleOptionClick(option)}
//           >
//             <img
//               src={option.formImage}
//               alt={option.name}
//               className="w-full h-48 object-cover"
//             />
//             <div className="p-4">
//               <h3 className="text-lg font-semibold">{option.name}</h3>
//               <p className="text-sm text-gray-600 truncate">{option.description}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Form Section */}
//       {selectedOption && (
//         <div className="p-6 mt-8 bg-gray-100 shadow-lg rounded-lg max-w-3xl mx-auto">
//           <h3 className="text-2xl font-semibold mb-4 text-center">
//             {selectedOption.name}
//           </h3>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label className="block font-medium mb-1">Client Name</label>
//               <input
//                 type="text"
//                 name="clientName"
//                 value={formData.clientName}
//                 onChange={handleInputChange}
//                 required
//                 className="w-full border rounded-md p-2"
//               />
//             </div>
//             <div>
//               <label className="block font-medium mb-1">Phone Number</label>
//               <input
//                 type="tel"
//                 name="phoneNumber"
//                 value={formData.phoneNumber}
//                 onChange={handleInputChange}
//                 required
//                 className="w-full border rounded-md p-2"
//               />
//             </div>
//             <div>
//               <label className="block font-medium mb-1">Email ID</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 required
//                 className="w-full border rounded-md p-2"
//               />
//             </div>
//             <div>
//               <label className="block font-medium mb-1">Message</label>
//               <textarea
//                 name="message"
//                 value={formData.message}
//                 onChange={handleInputChange}
//                 required
//                 className="w-full border rounded-md p-2"
//               />
//             </div>
//             <button
//               type="submit"
//               className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 w-full"
//             >
//               Submit
//             </button>
//           </form>
//           {formSubmitted && (
//             <p className="text-green-600 mt-4 text-center">
//               Form submitted successfully!
//             </p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ClientModule;
