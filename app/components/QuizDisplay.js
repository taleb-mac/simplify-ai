import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi'; // Import eye icons from react-icons/fi

const QuizDisplay = ({ quizData }) => {
  const [showAnswers, setShowAnswers] = useState(Array(quizData.length).fill(false));

  const toggleAnswer = (index) => {
    setShowAnswers((prevShowAnswers) => {
      const newShowAnswers = [...prevShowAnswers];
      newShowAnswers[index] = !newShowAnswers[index];
      return newShowAnswers;
    });
  };

  return (
    <div className="container mx-auto p-1">
      {quizData.map((pair, index) => (
        <div key={index} className="mb-4 p-4 border rounded-md flex items-start justify-between">
          <div>
            <p className="text-lg font-semibold mb-2">{pair.question}</p>
            <div className={showAnswers[index] ? 'block' : 'hidden'}>
              <p>{pair.answer}</p>
            </div>
          </div>
          <button
            onClick={() => toggleAnswer(index)}
            className="px-4 py-2 bg-transparent text-blue-500 rounded-md hover:text-blue-700 focus:outline-none focus:shadow-outline-blue transition-transform"
          >
            {showAnswers[index] ? <FiEyeOff size={20} /> : <FiEye size={20} />}
          </button>
        </div>
      ))}
    </div>
  );
};

export default QuizDisplay;
