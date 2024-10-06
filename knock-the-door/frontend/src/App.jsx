import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import OtpPage from './pages/OtpPage';
import ScheduleMailPage from './pages/ScheduleMailPage';
import Navbar from './components/Navbar';
import ErrorBoundary from './components/ErrorBoundary';
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <Router>
      <ErrorBoundary>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/verify-otp" element={<OtpPage />} />
          <Route path="/schedule-mail" element={<ScheduleMailPage />} />
        </Routes>
        <ToastContainer />
      </ErrorBoundary>
    </Router>
  );
};

export default App;
