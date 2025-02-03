'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const phonicsPairs = [
  {
    letter: 'A',
    correctImage: '/images/apple.png',
    options: ['/images/apple.png', '/images/ball.png', '/images/cat.png']
  },
  // Add more pairs...
];

export default function LetterMatchGame({ onAnswer, onGameEnd }) {
  const [currentPair, setCurrentPair] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    newRound();
  }, []);

  const newRound = () => {
    setSelectedOption(null);
    setCurrentPair(phonicsPairs[Math.floor(Math.random() * phonicsPairs.length)]);
  };

  const handleSelect = (option) => {
    if (selectedOption) return;
    
    setSelectedOption(option);
    const isCorrect = option === currentPair.correctImage;
    onAnswer(isCorrect);

    setTimeout(() => {
      if (isCorrect) newRound();
    }, 1500);
  };

  if (!currentPair) return null;

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="text-center mb-8"
      >
        <div className="text-9xl font-bold text-purple-600 mb-8">
          {currentPair.letter}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {currentPair.options.map((option, index) => (
          <motion.button
            key={index}
            onClick={() => handleSelect(option)}
            disabled={!!selectedOption}
            whileHover={{ scale: 1.05 }}
            className={`p-4 rounded-xl border-4 ${
              selectedOption === option 
                ? (option === currentPair.correctImage ? 'border-green-500' : 'border-red-500')
                : 'border-gray-200'
            }`}
          >
            <img 
              src={option} 
              alt="Option" 
              className="w-full h-32 object-contain" 
            />
          </motion.button>
        ))}
      </div>
    </div>
  );
}
