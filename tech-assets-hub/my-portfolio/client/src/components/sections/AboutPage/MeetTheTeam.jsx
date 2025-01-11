import '../AboutPage/css/MeetTheTeam.css'; // Import the CSS file for animations

import React, { useEffect, useState } from 'react';
import apiService from "../../../services-api/apiService.js";

const MeetTheTeam = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentRow, setCurrentRow] = useState(0);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const data = await apiService.getTeamMembers();
        setTeamMembers(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRow((prevRow) => (prevRow + 1) % Math.ceil(teamMembers.length / 4));
    }, 2000); // Change row every 2 seconds

    return () => clearInterval(interval);
  }, [teamMembers]);

  if (loading) {
    return <div className="text-center py-16">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-16">Error: {error}</div>;
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto text-center">
        {/* <h2 className="text-3xl font-bold mb-6">Meet the Team</h2> */}
        <h2 className="text-4xl font-extrabold text-gray-800 mb-8">Meet the Team</h2>
        <div className="flex flex-wrap justify-center">
          {teamMembers.map((member, index) => {
            const isEvenRow = Math.floor(index / 4) % 4 === 0; // Determine if the row is even or odd
            const shouldAnimate = Math.floor(index / 4) === currentRow; // Check if the current row should animate

            return (
              <div
                key={index}
                className={`team-member w-1/2 md:w-1/4 p-4 ${shouldAnimate ? (isEvenRow ? 'animate-slide-in-right' : 'animate-slide-in-left') : ''}`}
              >
                <img src={member.image} alt={member.name} className="rounded-full mb-4 w-32 h-32 mx-auto" />
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MeetTheTeam;