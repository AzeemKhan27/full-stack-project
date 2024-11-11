import React, { useEffect, useState } from 'react';

const WaveBackground = ({ message }) => {
  const [displayedMessage, setDisplayedMessage] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const type = () => {
      if (isDeleting) {
        // Remove a character
        setDisplayedMessage((prev) => prev.slice(0, -1));
        setCharIndex((prev) => prev - 1);
        
        // If we have deleted all characters, switch to typing mode
        if (charIndex === 0) {
          setIsDeleting(false);
        }
      } else {
        // Add a character
        setDisplayedMessage((prev) => message.slice(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
        
        // If we have typed the entire message, switch to deleting mode
        if (charIndex === message.length - 1) {
          setIsDeleting(true);
        }
      }
    };

    const timer = setTimeout(type, isDeleting ? 1000000 : 20); // Adjust typing and deleting speed
    return () => clearTimeout(timer);
  }, [isDeleting, charIndex, message]); // Removed displayedMessage from dependencies

  return (
    <div className="m-1 relative w-full h-500 rounded bg-blue-600 overflow-hidden">
      <svg
        className="absolute bottom-0 left-0 w-full h-32 wave"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          fill="rgba(255, 255, 255, 0.5)"
          d="M0,128L30,138.7C60,149,120,171,180,186.7C240,203,300,213,360,202.7C420,192,480,160,540,160C600,160,660,192,720,202.7C780,213,840,203,900,186.7C960,171,1020,149,1080,138.7C1140,128,1200,128,1260,138.7C1320,149,1380,171,1410,181.3L1440,192L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"
        ></path>
      </svg>
      <div className="relative z-10 flex items-center justify-center h-full">
        {/* <h1 className="text-white text-2xl m-2">
          <span className="text-8xl font-bold">{displayedMessage.charAt(0)}</span>
          {displayedMessage.slice(1)}
        </h1> */}
        <h1 className="text-white text-2xl p-16 text-center">
          <span className="text-6xl font-bold">{displayedMessage.charAt(0)}</span>
          <span className="text-5xl font-bold">{displayedMessage.charAt(1)}</span>
          <span className="text-2xl p-2">{displayedMessage.slice(2)}</span>
        </h1>

      </div>
      <style jsx>{`
        @keyframes wave {
          0% {
            transform: translateX(10);
          }

          50% {
            transform: translateX(10%);
          }

          100% {
            transform: translateX(-10%);
          }
            
        }
    
        .wave {
          animation: wave 10s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default WaveBackground;