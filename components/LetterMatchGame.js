'use client';
import { useState, useEffect } from 'react';

// Phonics data (add more entries as needed)
const phonicsPairs = [
  {
    letter: 'A',
    correctImage: '/images/apple.png',
    wrongOptions: ['/images/ball.png', '/images/cat.png', '/images/dog.png']
  },
  {
    letter: 'B',
    correctImage: '/images/ball.png',
    wrongOptions: ['/images/apple.png', '/images/cat.png', '/images/dog.png']
  },
  // Add more letters...
];

export default function LetterMatchGame({ onAddPoints }) {
  const [currentPair, setCurrentPair] = useState(phonicsPairs[0]);
  const [selectedTeam, setSelectedTeam] = useState(null); // Removed type annotation
  const [feedback, setFeedback] = useState('');
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Shuffle options for display
  const allOptions = [...currentPair.wrongOptions, currentPair.correctImage].sort(() => Math.random() - 0.5);

  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        setCurrentPair(phonicsPairs[Math.floor(Math.random() * phonicsPairs.length)]);
        setFeedback('');
        setIsTransitioning(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  const handleImageClick = (image) => {
    if (!selectedTeam || isTransitioning) return;
    if (image === currentPair.correctImage) {
      onAddPoints(20);
      setFeedback('Correct! 🎉');
      setIsTransitioning(true);
    } else {
      setFeedback('Try again! 💡');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      {/* Team Selection */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setSelectedTeam('A')}
          className={`px-6 py-2 rounded-full ${selectedTeam === 'A' ? 'bg-red-300' : 'bg-gray-200'}`}
        >
          Team A 🍎
        </button>
        <button
          onClick={() => setSelectedTeam('B')}
          className={`px-6 py-2 rounded-full ${selectedTeam === 'B' ? 'bg-yellow-300' : 'bg-gray-200'}`}
        >
          Team B 🍌
        </button>
      </div>
      {/* Game Area */}
      <div className="text-center">
        <div className="text-9xl font-bold text-blue-600 mb-8 animate-bounce">
          {currentPair.letter}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {allOptions.map((image, index) => (
            <button
              key={index}
              onClick={() => handleImageClick(image)}
              disabled={!selectedTeam || isTransitioning}
              className={`p-2 border-4 rounded-xl hover:scale-105 transition-all ${
                image === currentPair.correctImage && isTransitioning 
                ? 'border-green-500' 
                : 'border-gray-200'
              }`}
            >
              <img 
                src={image} 
                alt="Phonics option" 
                className="w-full h-32 object-contain"
              />
            </button>
          ))}
        </div>
        {feedback && (
          <div className={`mt-6 text-xl font-bold ${
            feedback.includes('Correct') ? 'text-green-600' : 'text-red-600'
          }`}>
            {feedback}
          </div>
        )}
      </div>
    </div>
  );
}
