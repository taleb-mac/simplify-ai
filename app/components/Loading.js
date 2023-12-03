import React, { useEffect } from 'react';
import './Loading.css'; // Import the CSS file

const Loading = () => {
  useEffect(() => {
    const letters = document.querySelectorAll('.animate-float span');
    
    letters.forEach((letter, index) => {
      letter.style.animationDelay = `${index * 0.1}s`;
    });
  }, []);

  return (
    <header className="text-white p-4 text-center">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-4 animate-float">
          {Array.from('Loading...').map((char, index) => (
            <span key={index}>{char}</span>
          ))}
        </h1>
      </div>
    </header>
  );
};

export default Loading;
