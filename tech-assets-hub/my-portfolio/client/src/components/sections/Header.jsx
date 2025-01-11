import React, { useState, useEffect } from 'react';

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);
  };

  return (
    <>
      {/* Spacer to prevent content overlap */}
      <div style={{ height: headerHeight }} />

      <header
        id="header"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? 'font-bold bg-gradient-to-r from-blue-900 to-blue-300 text-blue-100 shadow-lg py-2' : 'bg-gray-100 text-black py-4'
        }`}
      >
        <div className="container mx-auto px-5 flex justify-between items-center">
          <h1 className="text-3xl font-extrabold">Tech Assets Hub</h1>

          {/* Hamburger Menu for Mobile */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 focus:outline-none"
            aria-label="Toggle Menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex">
            <ul className="flex space-x-6">
              <li>
                <a href="/" className="hover:underline hover:text-blue-600 transition duration-300">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="hover:underline hover:text-blue-600 transition duration-300">
                  About
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:underline hover:text-blue-600 transition duration-300">
                  Contact
                </a>
              </li>
              <li
                className="relative"
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <span className="hover:underline hover:text-blue-600 cursor-pointer transition duration-300">
                  Services
                </span>
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-blue-700">
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                      <li>
                        <a
                          href="/services/student"
                          className="block px-4 py-2 text-dark hover:bg-gray-100 dark:hover:bg-blue-100 dark:hover:text-black transition duration-300"
                        >
                          Student
                        </a>
                      </li>
                      <li>
                        <a
                          href="/services/client"
                          className="block px-4 py-2 text-dark hover:bg-gray-100 dark:hover:bg-blue-100 dark:hover:text-black transition duration-300"
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

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={closeMobileMenu} />
          )}
          <nav
            className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
              isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
            } md:hidden`}
          >
            <ul className="flex flex-col space-y-4 p-6">
              <li>
                <a href="/" className="hover:underline hover:text-blue-600 transition duration-300" onClick={closeMobileMenu}>
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="hover:underline hover:text-blue-600 transition duration-300" onClick={closeMobileMenu}>
                  About
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:underline hover:text-blue-600 transition duration-300" onClick={closeMobileMenu}>
                  Contact
                </a>
              </li>
              <li>
                <span
                  className="hover:underline hover:text-blue-600 cursor-pointer transition duration-300"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  Services
                </span>
                {isDropdownOpen && (
                  <ul className="pl-4 mt-2 space-y-2">
                    <li>
                      <a
                        href="/services/student"
                        className="block hover:underline hover:text-blue-600 transition duration-300"
                        onClick={closeMobileMenu}
                      >
                        Student
                      </a>
                    </li>
                    <li>
                      <a
                        href="/services/client"
                        className="block hover:underline hover:text-blue-600 transition duration-300"
                        onClick={closeMobileMenu}
                      >
                        Client
                      </a>
                    </li>
                  </ul>
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