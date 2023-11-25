'use client';
import React from 'react';


const FlashcardPreview = (props) => {
  return (
    <div className="my-6">
      {props.cards && props.cards
        .filter((card) => card.summary.trim() !== '') // Filter out cards with empty summaries
        .map((card) => (
          <div key={card.id} className="p-4 border rounded shadow-md mb-4">
            <p>{card.summary}</p>
          </div>
      ))}
    </div>
  );
};


export default FlashcardPreview;
