//client/src/pages/services/student/StudentService.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DropdownCard from '../../../components/services/student/DropdownCard.jsx';
import ServiceCategoryCard from '../../../components/services/student/ServiceCategoryCard.jsx';
import apiService from "../../../services-api/apiService.js"
const StudentService = () => {
  const navigate = useNavigate();

  const studentModules = [
    { title: "Project Help & Guidance", description: "Get guidance on academic projects." },
    { title: "Assignment Assistance", description: "Help with assignments." },
    { title: "Skill Development", description: "Upskill with expert training." },
  ];

  const courseCategories = [
    { title: 'IT/CS', items: ['Web Development', 'DevOps', 'SEO/Digital Marketing', 'DSA', 'System Design'] },
    { title: 'Professional Development', items: ['English Practice', 'BDE Sessions', 'Social Media Handling'] },
    { title: 'Other Skills', items: ['Upcoming'] },
  ];

  const [loading, setLoading] = React.useState(false);

  const handleCourseClick = async (title) => {
    setLoading(true);
    try {
      console.log('Fetching courses for:', title);
      // const response = await axios.get('http://localhost:5000/api/services/students/courses/search', {
      //   params: { title },
      // });

      const response = await apiService.fetchCoursesByTitle(title);
      console.log('Courses fetched:', response.data);
      
      const courses = response.data.data;
      navigate('/services/student/courses', { state: { courses } });
    } catch (error) {
      console.error('Error fetching courses:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error:', error.message);
      }
      alert('Failed to fetch courses. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const onClickHandler = (title) => {
    const formattedTitle = title.replace(/\s+/g, "-").toLowerCase();
    navigate(`/services/student/${formattedTitle}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Our Services for Students</h1>

      {/* Service Categories */}
      <div className="grid md:grid-cols-2 gap-4">
        {studentModules.map((module, index) => (
          <ServiceCategoryCard
            key={index}
            title={module.title}
            description={module.description}
            onClick={() => onClickHandler(module.title)}
          />
        ))}
      </div>

      {/* Dropdown Cards */}
      <div className="mt-8">
        <h1 className="text-3xl m-2 font-bold mb-8">Online Courses & Live Session</h1>
        {courseCategories.map((category, index) => (
          <DropdownCard
            key={index}
            title={category.title}
            items={category.items}
            onItemClick={(item) => handleCourseClick(item)}
          />
        ))}
      </div>
    </div>
  );
};

export default StudentService;

// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// import DropdownCard from '../../../components/services/student/DropdownCard.jsx';
// import ServiceCategoryCard from '../../../components/services/student/ServiceCategoryCard.jsx';

// const StudentService = () => {
//   const navigate = useNavigate();

//   const studentModules = [
//     { title: "Project Help & Guidance", description: "Get guidance on academic projects." },
//     { title: "Assignment Assistance", description: "Help with assignments." },
//     { title: "Skill Development", description: "Upskill with expert training." },
//   ];

//   const courseCategories = [
//     { title: 'IT/CS', items: ['Web Development', 'DevOps', 'SEO/Digital Marketing', 'DSA', 'System Design'] },
//     { title: 'Professional Development', items: ['English Practice', 'BDE Sessions', 'Social Media Handling'] },
//     { title: 'Other Skills', items: ['Upcoming'] },
//   ];

//   const [loading, setLoading] = React.useState(false);

//   const handleCourseClick = async (title) => {
//     setLoading(true);
//     try {
//       const response = await axios.get('http://localhost:5000/api/services/students/courses/search', { params: { title } });
//       const courses = response.data.data;
//       navigate('/services/student/courses', { state: { courses } });
//     } catch (error) {
//       console.error('Error fetching courses:', error);
//       alert('Failed to fetch courses. Please try again later.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const onClickHandler = (title) => {
//     const formattedTitle = title.replace(/\s+/g, "-").toLowerCase();
//     navigate(`/services/student/${formattedTitle}`);
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold text-center mb-8">Our Services for Students</h1>

//       {/* Service Categories */}
//       <div className="grid md:grid-cols-2 gap-4">
//         {studentModules.map((module, index) => (
//           <ServiceCategoryCard
//             key={index}
//             title={module.title}
//             description={module.description}
//             onClick={() => onClickHandler(module.title)}
//           />
//         ))}
//       </div>

       
//       {/* Dropdown Cards */}
//       <div className="mt-8">

//       <h1 className="text-3xl m-2 font-bold mb-8">Online Cources & Live Session</h1>
//       {/* <div className="dropdown-cards"> Add a new class here */}
//         {courseCategories.map((category, index) => (
//           <DropdownCard 
//               key={index} 
//               title={category.title} 
//               items={category.items}
//               onItemClick={(item) => handleCourseClick(item)}
//            />
//         ))}
//         {/* </div>   */}
//       </div>
//     </div>
//   );
// };

// export default StudentService;
