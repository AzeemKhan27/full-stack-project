// client/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Header from './components/sections/Header';
import Footer from './components/sections/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import StudentService from './pages/services/student/StudentService.jsx';
import ClientService from './pages/services/client/ClientService.jsx';
import store from './redux/store';
import Signup from './components/sections/JoinOurTeam.jsx';
import ServiceDetail from './pages/services/student/ServiceDetail.jsx';
import CourseList from './pages/services/student/CourseList.jsx';
import PaymentSuccess from './components/PaymentSuccess.jsx';
import EnglishPractice from './pages/services/student/EnglishPractice.jsx'; 
import PrivacyPolicy from './pages/PrivacyPolicy'; // Import PrivacyPolicy component
import TermsOfService from './pages/TermsOfService'; // Import TermsOfService component
import './index.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* Services parent route */}
          <Route path="/services">
            {/* Nested routes */}
            <Route path="student" element={<StudentService />} />
            <Route path="client" element={<ClientService />} />
          </Route>

          {/* About Page | Join Team */}
          <Route path="/join-our-team" element={<Signup />} />

          <Route path="/services/student" element={<StudentService />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/services/student/:serviceType" element={<ServiceDetail />} />
          <Route path="/services/student/professional-development/english-practice" element={<EnglishPractice />} />
          <Route path="/services/student/courses" element={<CourseList />} />

           {/* Privacy Policy and Terms of Service routes */}
           <Route path="/privacy-policy" element={<PrivacyPolicy />} />
           <Route path="/terms-of-service" element={<TermsOfService />} />
        </Routes>
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;




// //client/src/App.jsx

// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import Header from './components/sections/Header';
// import Footer from './components/sections/Footer';
// import Home from './pages/Home';
// import About from './pages/About';
// import Contact from './pages/Contact';
// import StudentService from './pages/services/student/StudentService.jsx';
// import ClientService from './pages/services/client/ClientService.jsx';
// import store from './redux/store';

// import Signup from './components/sections/JoinOurTeam.jsx';

// import ServiceDetail from './pages/services/student/ServiceDetail.jsx';
// import CourseList from './pages/services/student/CourseList.jsx';

// import PaymentSuccess from './components/PaymentSuccess.jsx';
// import EnglishPractice from './pages/services/student/EnglishPractice.jsx'; // Import EnglishPractice component
// import './index.css';

// function App() {
//   return (
//     <Provider store={store}>
//       <Router>
      
//         <Header />
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/contact" element={<Contact />} />

//           {/* Services parent route */}
//           <Route path="/services">  {/* element={<ServiceMainPage /> */}
//             {/* Nested routes */}
//             <Route path="student" element={<StudentService />} />
//             <Route path="client" element={<ClientService />} />

//           </Route>


//           {/* About Page | Join Team */}
//           <Route path="/">  
          
//             {/* Nested routes */}
//             <Route path="join-our-team" element={<Signup />} />
//           </Route>


//           <Route path="/services/student" element={<StudentService />} />
//           <Route path="/payment-success" element={<PaymentSuccess />} />
//           <Route path="/services/student/:serviceType" element={<ServiceDetail />} />
//           <Route path="/services/student/courses" element={<CourseList />} />

//           <Route path="/services/student/professional-development/english-practice" element={<EnglishPractice />} />
//         </Routes>
//         <Footer />
      
//       </Router>
//     </Provider>
//   );
// }

// export default App;
