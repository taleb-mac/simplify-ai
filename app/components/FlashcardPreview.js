import React, { useState } from 'react';

const FlashcardPreview = (props) => {
  // State to track the currently displayed card index
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const nextCard = () => {
    // Move to the next card, wrapping around to the beginning if at the end
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % props.cards.length);
  };

  const prevCard = () => {
    // Move to the previous card, wrapping around to the end if at the beginning
    setCurrentCardIndex(
      (prevIndex) => (prevIndex - 1 + props.cards.length) % props.cards.length
    );
  };

  const currentCard = props.cards[currentCardIndex];

  return (
    <div className="my-6 flex items-center justify-center">
      {currentCard && (
        <div className="p-8 border rounded shadow-md transition-transform max-w-md w-full">
          <p
            className="text-white text-center transition-opacity"
            style={{ minHeight: '80px' }}
          >
            {currentCard.summary}
          </p>
          <div className="flex justify-between mt-4">
            <button
              onClick={prevCard}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue transition-transform"
            >
              Previous
            </button>
            <button
              onClick={nextCard}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue transition-transform"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlashcardPreview;