'use client';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useSound } from 'use-sound';
import TeamSetup from '../components/TeamSetup';
import ProgressBar from '../components/ProgressBar';
import Confetti from '../components/Confetti';

// Lazy load game component
const LetterMatchGame = dynamic(() => import('../components/LetterMatchGame'), {
  loading: () => <p>Loading game...</p>,
});

export default function Home() {
  // Audio effects
  const [playCorrect] = useSound('/sounds/correct.mp3');
  const [playWrong] = useSound('/sounds/wrong.mp3');
  const [playVictory] = useSound('/sounds/victory.mp3');

  // Game state
  const [teams, setTeams] = useState({
    A: { name: 'Apples', avatar: '🍎', score: 0 },
    B: { name: 'Bananas', avatar: '🍌', score: 0 }
  });
  const [currentGame, setCurrentGame] = useState(null);
  const [activeTeam, setActiveTeam] = useState('A');
  const [showVictory, setShowVictory] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);

  // Game timer
  useEffect(() => {
    if (currentGame && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      handleGameEnd();
    }
  }, [currentGame, timeLeft]);

  const handleGameStart = (teamA, teamB) => {
    setTeams({
      A: { ...teamA, score: 0 },
      B: { ...teamB, score: 0 }
    });
    setCurrentGame('letter-match');
  };

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      playCorrect();
      setTeams(prev => ({
        ...prev,
        [activeTeam]: {
          ...prev[activeTeam],
          score: prev[activeTeam].score + 10
        }
      }));
      setActiveTeam(prev => prev === 'A' ? 'B' : 'A'); // Switch turns
    } else {
      playWrong();
    }
  };

  const handleGameEnd = () => {
    playVictory();
    setShowVictory(true);
    setTimeout(() => setCurrentGame(null), 5000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-50">
      {!currentGame ? (
        <TeamSetup onStart={handleGameStart} />
      ) : (
        <div className="flex flex-col md:flex-row min-h-screen">
          {/* Left Team */}
          <TeamPanel team={teams.B} isActive={activeTeam === 'B'} />

          {/* Main Game Area */}
          <div className="flex-1 p-8">
            <ProgressBar timeLeft={timeLeft} totalTime={60} />
            
            <LetterMatchGame 
              onAnswer={handleAnswer}
              onGameEnd={handleGameEnd}
            />

            {showVictory && <Confetti winner={teams.A.score > teams.B.score ? 'A' : 'B'} />}
          </div>

          {/* Right Team */}
          <TeamPanel team={teams.A} isActive={activeTeam === 'A'} />
        </div>
      )}
    </div>
  );
}

const TeamPanel = ({ team, isActive }) => (
  <div className={`md:w-64 p-4 transition-all ${isActive ? 'bg-white shadow-xl' : 'bg-gray-50'}`}>
    <div className="text-4xl mb-2">{team.avatar}</div>
    <h2 className="text-2xl font-bold mb-2">{team.name}</h2>
    <div className="text-5xl font-bold text-purple-600">{team.score}</div>
    <div className={`mt-2 h-2 ${isActive ? 'bg-green-500' : 'bg-transparent'}`} />
  </div>
);
