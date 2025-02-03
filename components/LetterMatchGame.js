// components/LetterMatchGame.js
'use client';
import { useState, useEffect } from 'react';

export default function LetterMatchGame({ teamA, teamB, onAddPoints }) {
  const [currentPair, setCurrentPair] = useState(phonicsPairs[0]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [feedback, setFeedback] = useState('');

  // New game state
  const [gameState, setGameState] = useState({
    attempts: 0,
    correct: 0,
    streak: 0
  });

  // Improved answer handling
  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      onAddPoints(selectedTeam, 10 + gameState.streak * 2);
      setGameState(prev => ({
        ...prev,
        correct: prev.correct + 1,
        streak: prev.streak + 1
      }));
      setFeedback('🎉 Correct!');
    } else {
      setGameState(prev => ({
        ...prev,
        streak: 0
      }));
      setFeedback('💡 Try again!');
    }

    // Auto-advance after 1.5s
    setTimeout(() => {
      setCurrentPair(getRandomPair());
      setFeedback('');
    }, 1500);
  };

  return (
    <div className="text-center">
      {/* Team Indicators */}
      <div className="flex justify-between mb-8">
        <div className="text-2xl">
          {teamB.avatar} {teamB.name}
        </div>
        <div className="text-2xl">
          {teamA.avatar} {teamA.name}
        </div>
      </div>

      {/* Game Content */}
      <div className="text-9xl font-bold my-8">{currentPair.letter}</div>
      
      <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
        {shuffledOptions.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(option === currentPair.correctImage)}
            className={`p-4 rounded-xl transition-all ${
              feedback ? 
                (option === currentPair.correctImage ? 'bg-green-200' : 'bg-red-200') 
                : 'bg-white hover:bg-blue-50'
            }`}
          >
            <img src={option} className="h-32 w-full object-contain" />
          </button>
        ))}
      </div>

      {/* Feedback & Stats */}
      <div className="mt-6 text-xl font-bold text-blue-600">
        {feedback || `Streak: ${gameState.streak} ✨`}
      </div>
    </div>
  );
}
