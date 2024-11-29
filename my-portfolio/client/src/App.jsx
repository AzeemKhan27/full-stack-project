import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Header from './components/sections/Header';
import Footer from './components/sections/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import ServiceMainPage from './pages/services/student/ServiceMainPage.jsx';
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services/students" element={<ServiceMainPage />} />
          <Route path="/services/clients" element={<ServiceMainPage />} />
        
        </Routes>
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
