'use client'; // Enable interactivity
import { useState } from 'react';
import LetterMatchGame from '../components/LetterMatchGame'; // Relative path

export default function Home() {
  const [teamAScore, setTeamAScore] = useState(0);
  const [teamBScore, setTeamBScore] = useState(0);
  const [currentGame, setCurrentGame] = useState(null); // Tracks the active game
  const [selectedTeam, setSelectedTeam] = useState('A'); // Tracks the selected team

  // Function to update scores
  const updateScore = (team, points) => {
    if (team === 'A') setTeamAScore(prev => prev + points);
    else setTeamBScore(prev => prev + points);
  };

  return (
    <div className="min-h-screen bg-blue-50 p-8 font-comic-neue">
      {/* Header */}
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold text-purple-600 mb-4">
          🎮 Phonics Playground
        </h1>
        <p className="text-xl text-gray-700">Learn English with Team Games!</p>
      </header>

      {/* Scoreboard */}
      <div className="flex flex-col md:flex-row justify-center gap-8 mb-16">
        <TeamScore 
          name="Team Apples 🍎" 
          score={teamAScore} 
          onAddPoints={() => updateScore('A', 10)}
          color="bg-red-200"
        />
        <TeamScore 
          name="Team Bananas 🍌" 
          score={teamBScore} 
          onAddPoints={() => updateScore('B', 10)}
          color="bg-yellow-200"
        />
      </div>

      {/* Game Selection or Active Game */}
      {!currentGame ? (
        // Show game selection grid
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <GameCard
            title="Letter Match"
            description="Match letters to sounds!"
            image="/phonics-match.png"
            onPlay={() => setCurrentGame('letter-match')}
          />
          {/* Add more games here */}
        </div>
      ) : (
        // Show selected game
        <div className="max-w-4xl mx-auto">
          <button 
            onClick={() => setCurrentGame(null)}
            className="mb-8 text-blue-600 hover:text-blue-700 font-bold"
          >
            ← Back to Games
          </button>
          {currentGame === 'letter-match' && (
            <LetterMatchGame 
              onAddPoints={(points) => {
                // Update scores based on the selected team
                updateScore(selectedTeam, points);
              }}
            />
          )}
        </div>
      )}

      {/* Footer */}
      <footer className="mt-16 text-center text-gray-600">
        <p>Made with ❤️ by [Your Name]</p>
      </footer>
    </div>
  );
}

// Reusable Team Score Component
const TeamScore = ({ name, score, onAddPoints, color }) => (
  <div className={`${color} p-6 rounded-xl shadow-lg text-center`}>
    <h2 className="text-2xl font-semibold mb-4">{name}</h2>
    <div className="text-5xl font-bold mb-4">{score}</div>
    <button 
      onClick={onAddPoints}
      className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full transition-all"
      aria-label={`Add 10 points to ${name}`}
    >
      +10 Points
    </button>
  </div>
);

// Reusable Game Card Component
const GameCard = ({ title, description, image, onPlay }) => (
  <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
    <img src={image} alt={title} className="w-full h-48 object-cover" />
    <div className="p-6">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <button 
        onClick={onPlay}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
      >
        Play Now →
      </button>
    </div>
  </div>
);
