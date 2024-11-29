import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Routes
import { Provider } from 'react-redux';
import Header from './components/sections/Header';
import Footer from './components/sections/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import store from './redux/store';
import ServiceMainPage from './pages/services/ServiceMainPage'; // Import ServiceMainPage

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Routes> {/* Replace Router with Routes */}
          <Route path="/" element={<Home />} /> {/* Use element prop instead of component */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<ServiceMainPage />} /> {/* Add Route */}
        </Routes>
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
