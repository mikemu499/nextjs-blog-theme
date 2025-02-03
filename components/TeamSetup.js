'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

const avatars = ['🐶', '🐱', '🦁', '🐯', '🐻', '🐼', '🐨', '🦄'];

export default function TeamSetup({ onStart }) {
  const [teams, setTeams] = useState({
    A: { name: 'Apples', avatar: '🍎' },
    B: { name: 'Bananas', avatar: '🍌' }
  });

  const handleStart = () => {
    if (teams.A.name && teams.B.name) onStart(teams.A, teams.B);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full"
      >
        <h1 className="text-3xl font-bold text-center mb-8">Create Your Teams!</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          {['A', 'B'].map((team) => (
            <div key={team} className="space-y-4">
              <h2 className="text-xl font-semibold">Team {team}</h2>
              <input
                type="text"
                value={teams[team].name}
                onChange={(e) => setTeams(prev => ({
                  ...prev,
                  [team]: { ...prev[team], name: e.target.value }
                }))}
                className="w-full p-2 border rounded-lg"
                placeholder={`Team ${team} name`}
              />
              
              <div className="grid grid-cols-4 gap-2">
                {avatars.map((avatar) => (
                  <button
                    key={avatar}
                    onClick={() => setTeams(prev => ({
                      ...prev,
                      [team]: { ...prev[team], avatar }
                    }))}
                    className={`text-2xl p-2 rounded-lg transition-all ${
                      teams[team].avatar === avatar 
                        ? 'bg-purple-500 text-white' 
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {avatar}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleStart}
          className="mt-8 w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-all"
        >
          Start Game!
        </button>
      </motion.div>
    </div>
  );
}
