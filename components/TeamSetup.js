// components/TeamSetup.js
'use client';
import { useState } from 'react';

const avatars = ['🐶', '🐱', '🐯', '🦁', '🐮', '🐹'];

export default function TeamSetup({ onComplete }) {
  const [teamA, setTeamA] = useState({ name: 'Apples', avatar: '🍎' });
  const [teamB, setTeamB] = useState({ name: 'Bananas', avatar: '🍌' });

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl">
      <h2 className="text-2xl font-bold mb-6">Set Up Your Teams!</h2>
      
      <div className="grid grid-cols-2 gap-8">
        {/* Team A Customization */}
        <div className="space-y-4">
          <label className="block">
            <span className="text-gray-700">Team A Name:</span>
            <input
              type="text"
              value={teamA.name}
              onChange={(e) => setTeamA({ ...teamA, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </label>
          <div>
            <span className="text-gray-700">Choose Avatar:</span>
            <div className="grid grid-cols-3 gap-2 mt-2">
              {avatars.map((avatar) => (
                <button
                  key={avatar}
                  onClick={() => setTeamA({ ...teamA, avatar })}
                  className={`text-2xl p-2 rounded ${teamA.avatar === avatar ? 'bg-blue-200' : 'hover:bg-gray-100'}`}
                >
                  {avatar}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Team B Customization (similar structure) */}
        {/* ... */}

      </div>

      <button
        onClick={() => onComplete(teamA, teamB)}
        className="mt-6 bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
      >
        Start Game!
      </button>
    </div>
  );
}
