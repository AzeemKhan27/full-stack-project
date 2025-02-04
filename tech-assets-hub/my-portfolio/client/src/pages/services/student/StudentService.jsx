// client/src/pages/services/student/StudentService.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import DropdownCard from '../../../components/services/student/DropdownCard.jsx';
import ServiceCategoryCard from '../../../components/services/student/ServiceCategoryCard.jsx';
import apiService from "../../../services-api/apiService.js";

const StudentService = () => {
  const navigate = useNavigate();

  const studentModules = [
    { title: "IT Project Help & Guidance", description: "Get guidance on academic projects." },
    { title: "College Assignment Assistance", description: "Help with assignments." },
    { title: "Book Skill Development Session", description: "Upskill with expert-led training sessions." },
    { title: "Need Best Tutors Online | Offline", description: "Find tutors for personalized learning, online or offline." },
    { title: "Book Slot for Interview Practice", description: "Practice interviews with experienced professionals to ace your job interviews." },
    { title: "English Practice", description: "Improve your English skills with our expert instructors." }, // Add English Practice option
  ];

  const courseCategories = [
    { title: 'IT/CS', items: ['Web Development in MERN', 'Android App Development: Build Native Applications', 'React Native Development: Build Native Cross-Platform Mobile Apps', 'Full-Stack .NET Developer', 'Python Training', 'DevOps', 'SEO/Digital Marketing', 'DSA', 'System Design'] },
    { title: 'Professional Development', items: ['English Practice', 'BDE Sessions', 'Social Media Handling'] },
    { title: 'Other Skills', items: ['Upcoming'] },
  ];

  const [loading, setLoading] = React.useState(false);

  const handleCourseClick = async (title) => {
    setLoading(true);
    try {
      console.log('Fetching courses for:', title);
      const formattedTitle = title.replace(/\s+/g, "-").toLowerCase();
      console.log("formattedTitle = >", formattedTitle);
      if (formattedTitle === "english-practice") {
        navigate('/services/student/professional-development/english-practice'); // Navigate to EnglishPractice component
      } else {
                  // Fetch courses by title
      const response = await apiService.fetchCoursesByTitle(title);
      console.log('Courses fetched:', response);
      // Extract the courses array from the response
      const courses = response.data.data;
      // Navigate to the courses page with the fetched courses
      navigate('/services/student/courses', { state: { courses } });
      }

        
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

  //   const onClickHandler = (title) => {
  //   const formattedTitle = title.replace(/\s+/g, "-").toLowerCase();
  //   console.log("formattedTitle = >", formattedTitle);
  //   navigate(`/services/student/${formattedTitle}`);
  // };

  const onClickHandler = (title) => {
    const formattedTitle = title.replace(/\s+/g, "-").toLowerCase();
    console.log("formattedTitle = >", formattedTitle);
    if (formattedTitle === "english-practice") {
      navigate('/services/student/professional-development/english-practice'); // Navigate to EnglishPractice component
    } else {
      navigate(`/services/student/${formattedTitle}`);
    }
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
        <h1 className="text-3xl m-2 font-bold mb-8">Online Courses & Live Sessions</h1>
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


//client/src/pages/services/student/StudentService.jsx

// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import DropdownCard from '../../../components/services/student/DropdownCard.jsx';
// import ServiceCategoryCard from '../../../components/services/student/ServiceCategoryCard.jsx';
// import apiService from "../../../services-api/apiService.js";

// const StudentService = () => {
//   const navigate = useNavigate();

//   const studentModules = [
//     { title: "IT Project Help & Guidance", description: "Get guidance on academic projects." },
//     { title: "College Assignment Assistance", description: "Help with assignments." },
//     { title: "Book Skill Development Session", description: "Upskill with expert-led training sessions." },
//     { title: "Need Best Tutors Online | Offline", description: "Find tutors for personalized learning, online or offline." },
//     { title: "Book Slot for Interview Practice", description: "Practice interviews with experienced professionals to ace your job interviews." },
//   ];

//   const courseCategories = [
//     { title: 'IT/CS', items: ['Web Development in MERN','Android App Development: Build Native Applications','React Native Development: Build Native Cross-Platform Mobile Apps','Python Training', 'DevOps', 'SEO/Digital Marketing', 'DSA', 'System Design'] },

//     { title: 'Professional Development', items: ['English Practice', 'BDE Sessions', 'Social Media Handling'] },

//     { title: 'Other Skills', items: ['Upcoming'] },
//   ];

//   const [loading, setLoading] = React.useState(false);

//   const handleCourseClick = async (title) => {
//     setLoading(true);
//     try {
//       console.log('Fetching courses for:', title);

//       // Fetch courses by title
//       const response = await apiService.fetchCoursesByTitle(title);
//       console.log('Courses fetched:', response);

//       // Extract the courses array from the response
//       const courses = response.data.data;

//       // Navigate to the courses page with the fetched courses
//       navigate('/services/student/courses', { state: { courses } });
//     } catch (error) {
//       console.error('Error fetching courses:', error);
//       if (error.response) {
//         console.error('Response data:', error.response.data);
//       } else if (error.request) {
//         console.error('No response received:', error.request);
//       } else {
//         console.error('Error:', error.message);
//       }
//       alert('Failed to fetch courses. Please try again later.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const onClickHandler = (title) => {
//     const formattedTitle = title.replace(/\s+/g, "-").toLowerCase();
//     console.log("formattedTitle = >", formattedTitle);
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
//         <h1 className="text-3xl m-2 font-bold mb-8">Online Courses & Live Session</h1>
//         {courseCategories.map((category, index) => (
//           <DropdownCard
//             key={index}
//             title={category.title}
//             items={category.items}
//             onItemClick={(item) => handleCourseClick(item)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default StudentService;
