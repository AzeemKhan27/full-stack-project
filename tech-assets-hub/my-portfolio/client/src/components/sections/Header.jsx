// import React, { useState } from 'react';

// const Header = () => {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//   return (
//     <header className="bg-white-500 p-4 text-black">
//       <div className="container mx-auto">
//         <h1 className="text-3xl font-bold">Tech Assets Hub</h1>
//         <nav className="mt-2">
//           <ul className="flex space-x-4">
//             <li><a href="/" className="hover:underline">Home</a></li>
//             <li><a href="/about" className="hover:underline">About</a></li>
//             <li><a href="/contact" className="hover:underline">Contact</a></li>

//             <li
//               className="relative"
//               onMouseEnter={() => setIsDropdownOpen(true)}
//               onMouseLeave={() => setIsDropdownOpen(false)}
//             >
//               {/* Make Services not clickable */}
//               <span
//                 className="hover:underline cursor-pointer"
//               >
//                 Services
//               </span>
//               {isDropdownOpen && (
//                 <div
//                   id="dropdown"
//                   className="absolute top-full left-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
//                 >
//                   <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
//                     <li>
//                       <a
//                         href="/services/students"
//                         className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
//                       >
//                         Student
//                       </a>
//                     </li>
//                     <li>
//                       <a
//                         href="/services/client"
//                         className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
//                       >
//                         Client
//                       </a>
//                     </li>
//                   </ul>
//                 </div>
//               )}
//             </li>
//           </ul>
//         </nav>
//       </div>
//     </header>
//   );
// };

// export default Header;

// import React, { useState, useEffect } from 'react';

// const Header = () => {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 50) {
//         setIsScrolled(true);
//       } else {
//         setIsScrolled(false);
//       }
//     };

//     window.addEventListener('scroll', handleScroll);

//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

//   return (
//     <header
//       className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
//         isScrolled ? 'bg-blue-600 text-white shadow-lg py-2' : 'bg-gray-100 text-black py-4'
//       }`}
//     >
//       <div className="container mx-auto px-5">
//         <h1 className="text-3xl font-bold">Tech Assets Hub</h1>
//         <nav className="mt-2">
//           <ul className="flex space-x-4">
//             <li>
//               <a href="/" className="hover:underline">
//                 Home
//               </a>
//             </li>
//             <li>
//               <a href="/about" className="hover:underline">
//                 About
//               </a>
//             </li>
//             <li>
//               <a href="/contact" className="hover:underline">
//                 Contact
//               </a>
//             </li>
//             <li
//               className="relative"
//               onMouseEnter={() => setIsDropdownOpen(true)}
//               onMouseLeave={() => setIsDropdownOpen(false)}
//             >
//               <span className="hover:underline cursor-pointer">Services</span>
//               {isDropdownOpen && (
//                 <div className="absolute top-full left-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-blue-700">
//                   <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
//                     <li>
//                       <a
//                         href="/services/student"
//                         className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
//                       >
//                         Student
//                       </a>
//                     </li>
//                     <li>
//                       <a
//                         href="/services/client"
//                         className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
//                       >
//                         Client
//                       </a>
//                     </li>
//                   </ul>
//                 </div>
//               )}
//             </li>
//           </ul>
//         </nav>
//       </div>
//     </header>
//   );
// };

// export default Header;


import React, { useState, useEffect } from 'react';

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const headerElement = document.getElementById('header');
    if (headerElement) {
      setHeaderHeight(headerElement.offsetHeight);
    }

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {/* Spacer to prevent content overlap */}
      <div style={{ height: headerHeight }} />

      <header
        id="header"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-blue-600 text-white shadow-lg py-2' : 'bg-gray-100 text-black py-4'
        }`}
      >
        <div className="container mx-auto px-5">
          <h1 className="text-3xl font-bold">Tech Assets Hub</h1>
          <nav className="mt-2">
            <ul className="flex space-x-4">
              <li>
                <a href="/" className="hover:underline">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="hover:underline">
                  About
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:underline">
                  Contact
                </a>
              </li>
              <li
                className="relative"
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <span className="hover:underline cursor-pointer">Services</span>
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-blue-700">
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                      <li>
                        <a
                          href="/services/student"
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Student
                        </a>
                      </li>
                      <li>
                        <a
                          href="/services/client"
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Client
                        </a>
                      </li>
                    </ul>
                  </div>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
