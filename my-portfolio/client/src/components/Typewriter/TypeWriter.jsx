import React, { useEffect, useState } from 'react';

const Typewriter = ({ words }) => {
//   const words = ["Hello, World!", "Welcome to my website!", "This is a typewriter effect."];
  const [currentWord, setCurrentWord] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const type = () => {
      const current = words[wordIndex];
      if (isDeleting) {
        setCurrentWord(current.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
        if (charIndex === 0) {
          setIsDeleting(false);
          setWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        }
      } else {
        setCurrentWord(current.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
        if (charIndex === current.length) {
          setIsDeleting(true);
        }
      }
    };

    const timer = setTimeout(type, 100);
    return () => clearTimeout(timer);
  }, [currentWord, charIndex, isDeleting, wordIndex, words]);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <h1 id="typewriter" className="text-4xl font-bold">{currentWord}</h1>
    </div>
  );
};

export default Typewriter;