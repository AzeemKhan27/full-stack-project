//server/models/coursePaymentModel.js

// This is a placeholder for your course model. You can define your schema here if you are using a database.
const courses = [
    {
      id: 1,
      title: 'Course 1',
      description: 'Description for Course 1',
      price: 1000,
      duration: '2 months',
      syllabus: ['Topic 1', 'Topic 2', 'Topic 3', 'Topic 4'],
      faq: [{ question: 'Q1', answer: 'A1' }],
      instructor: 'Instructor 1',
      instructor_image: 'instructor1.jpg',
      timing: '10 AM - 12 PM',
      createdAt: new Date(),
    },
    // Add more courses as needed
  ];
  
  module.exports = courses;
  