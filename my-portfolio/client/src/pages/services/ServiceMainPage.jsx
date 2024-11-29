import React from 'react';
import DropdownCard from '../../components/services/DropdownCard';
import ServiceCategoryCard from '../../components/services/ServiceCategoryCard';

const ServiceMainPage = () => {
  const studentModules = [
    {
      title: 'Project Help & Guidance',
      description: 'Get expert help with your academic projects.',
    },
    {
      title: 'Career Discussion',
      description: 'Plan your career with our expert counselors.',
    },
    {
      title: 'Project Building',
      description: 'Learn and build projects hands-on.',
    },
    {
      title: 'Online Courses',
      description: 'Explore our curated online courses.',
    },
  ];

  const courseCategories = [
    { title: 'IT/CS', items: ['Web Development', 'DevOps', 'SEO/Digital Marketing', 'DSA', 'System Design'] },
    { title: 'Professional Development', items: ['English Practice', 'BDE Sessions', 'Social Media Handling'] },
    { title: 'Other Skills', items: ['Upcoming'] },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Our Services</h1>

      {/* Service Categories */}
      <div className="grid md:grid-cols-2 gap-4">
        {studentModules.map((module, index) => (
          <ServiceCategoryCard
            key={index}
            title={module.title}
            description={module.description}
            onClick={() => alert(`Clicked on ${module.title}`)}
          />
        ))}
      </div>

      {/* Dropdown Cards */}
      <div className="mt-8">
        {courseCategories.map((category, index) => (
          <DropdownCard key={index} title={category.title} items={category.items} />
        ))}
      </div>
    </div>
  );
};

export default ServiceMainPage;
