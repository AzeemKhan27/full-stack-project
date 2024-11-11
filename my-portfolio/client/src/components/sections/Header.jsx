// Header.jsx

import React from 'react';

const Header = () => {
  return (
    <header className="bg-cray-500 p-4 text-black">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold">Pick Assets</h1>
        <nav className="mt-2">
          <ul className="flex space-x-4">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/about" className="hover:underline">About</a></li>
            <li><a href="/contact" className="hover:underline">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
