'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Full list of 44 phonics sounds with example emojis
const phonicsPairs = [
  { letter: 'A', correctEmoji: '🍎', options: ['🍎', '🍌', '🍒'] },
  { letter: 'B', correctEmoji: '🐝', options: ['🐝', '🐱', '🐦'] },
  { letter: 'C', correctEmoji: '🐱', options: ['🐱', '🐒', '🐧'] },
  { letter: 'D', correctEmoji: '🐶', options: ['🐶', '🐱', '🐯'] },
  { letter: 'E', correctEmoji: '🥚', options: ['🥚', '🍎', '🍇'] },
  { letter: 'F', correctEmoji: '🐟', options: ['🐟', '🐦', '🐒'] },
  { letter: 'G', correctEmoji: '🍇', options: ['🍇', '🍎', '🍒'] },
  { letter: 'H', correctEmoji: '🐹', options: ['🐹', '🐱', '🐶'] },
  { letter: 'I', correctEmoji: '🍦', options: ['🍦', '🍪', '🍉'] },
  { letter: 'J', correctEmoji: '🦒', options: ['🦒', '🐸', '🐱'] },
  { letter: 'K', correctEmoji: '🐢', options: ['🐢', '🐶', '🐱'] },
  { letter: 'L', correctEmoji: '🦁', options: ['🦁', '🐱', '🐵'] },
  { letter: 'M', correctEmoji: '🐒', options: ['🐒', '🐶', '🐦'] },
  { letter: 'N', correctEmoji: '🐍', options: ['🐍', '🐱', '🐶'] },
  { letter: 'O', correctEmoji: '🍊', options: ['🍊', '🍎', '🍓'] },
  { letter: 'P', correctEmoji: '🐼', options: ['🐼', '🐱', '🐦'] },
  { letter: 'Q', correctEmoji: '👸', options: ['👸', '🐱', '🐶'] },
  { letter: 'R', correctEmoji: '🐇', options: ['🐇', '🐱', '🦁'] },
  { letter: 'S', correctEmoji: '🐍', options: ['🐍', '🐱', '🐦'] },
  { letter: 'T', correctEmoji: '🐯', options: ['🐯', '🦁', '🐵'] },
  { letter: 'U', correctEmoji: '🦄', options: ['🦄', '🐴', '🐱'] },
  { letter: 'V', correctEmoji: '🦇', options: ['🦇', '🐦', '🐱'] },
  { letter: 'W', correctEmoji: '🐋', options: ['🐋', '🐘', '🐍'] },
  { letter: 'X', correctEmoji: '❌', options: ['❌', '🔴', '⚫'] },
  { letter: 'Y', correctEmoji: '🍋', options: ['🍋', '🍓', '🍏'] },
  { letter: 'Z', correctEmoji: '🐴', options: ['🐴', '🦒', '🐱'] },
  { letter: 'SH', correctEmoji: '🤫', options: ['🤫', '🐱', '🐶'] },
  { letter: 'CH', correctEmoji: '🐱‍🏍', options: ['🐱‍🏍', '🐶', '🦄'] },
  { letter: 'TH', correctEmoji: '🔨', options: ['🔨', '🍎', '🍋'] },
  { letter: 'NG', correctEmoji: '🦁', options: ['🦁', '🐯', '🦄'] },
  { letter: 'OO', correctEmoji: '🐷', options: ['🐷', '🦄', '🐱'] },
  { letter: 'AR', correctEmoji: '🐶', options: ['🐶', '🐱', '🐒'] },
  { letter: 'OR', correctEmoji: '🍊', options: ['🍊', '🍎', '🍇'] },
  { letter: 'OI', correctEmoji: '🍩', options: ['🍩', '🍎', '🍪'] },
  { letter: 'OW', correctEmoji: '🌈', options: ['🌈', '🦋', '🐵'] },
  { letter: 'AIR', correctEmoji: '🌬️', options: ['🌬️', '🍎', '🍒'] },
  { letter: 'EAR', correctEmoji: '👂', options: ['👂', '🐱', '🐶'] },
  { letter: 'URE', correctEmoji: '🦄', options: ['🦄', '🐱', '🐶'] },
];

export default function LetterMatchGame({ onAnswer, onGameEnd }) {
  const [currentPair, setCurrentPair] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  useEffect(() => {
    newRound();
  }, []);

  const newRound = () => {
    setSelectedOption(null);
    setIsCorrect(null);
    setCurrentPair(phonicsPairs[Math.floor(Math.random() * phonicsPairs.length)]);
  };

  const handleSelect = (option) => {
    if (selectedOption) return; // Prevent further selection after one is made
    
    setSelectedOption(option);
    const correct = option === currentPair.correctEmoji;
    setIsCorrect(correct); // Store if the selected option is correct
    onAnswer(correct);

    setTimeout(() => {
      if (correct) {
        newRound(); // Move to next round if answer is correct
      }
    }, 1500);
  };

  const handleNextQuestion = () => {
    newRound(); // Move to the next round when button is clicked
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
            disabled={!!selectedOption} // Disable the button after selection
            whileHover={{ scale: 1.05 }}
            className={`p-4 rounded-xl border-4 ${
              selectedOption === option 
                ? (isCorrect && option === currentPair.correctEmoji ? 'border-green-500' : 'border-red-500')
                : 'border-gray-200'
            }`}
          >
            <div className="text-6xl">{option}</div> {/* Display emoji here */}
          </motion.button>
        ))}
      </div>

      {/* Add a button for moving to the next question */}
      {selectedOption && !isCorrect && (
        <div className="mt-4 text-center">
          <button
            onClick={handleNextQuestion}
            className="px-6 py-2 bg-blue-500 text-white rounded-xl"
          >
            Next Question
          </button>
        </div>
      )}
    </div>
  );
}