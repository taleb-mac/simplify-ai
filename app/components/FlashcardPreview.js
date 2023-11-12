import React from 'react';

const FlashcardPreview = () => {
  // Dummy data for the purpose of this example
  const flashcards = [
    { id: 1, summary: 'Flashcard summary 1' },
    { id: 2, summary: 'Flashcard summary 2' },
    { id: 3, summary: 'Flashcard summary 3' },
  ];

  return (
    <div className="my-6">
      {flashcards.map((card) => (
        <div key={card.id} className="p-4 border rounded shadow-md mb-4">
          <p>{card.summary}</p>
        </div>
      ))}
    </div>
  );
};

export default FlashcardPreview;
