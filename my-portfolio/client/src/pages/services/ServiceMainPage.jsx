import React from 'react';
import { Outlet } from 'react-router-dom';

const ServiceMainPage = () => {
  return (
    <div>
      <h1>Welcome to Services</h1>
      <Outlet /> {/* Renders child routes here */}
    </div>
  );
};

export default ServiceMainPage;
