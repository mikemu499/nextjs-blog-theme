'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router'; // Import useRouter for navigation

// Define avatars in different categories
const animalAvatars = ['🐶', '🐱', '🦁', '🐯', '🐻', '🐼', '🐨', '🦄'];
const fruitAvatars = ['🍎', '🍌', '🍓', '🍍', '🍊', '🍉', '🍇', '🍒'];
const spaceAvatars = ['🚀', '🪐', '👽', '🌕', '🌌', '🛸', '🌠', '🪐'];
const sportsAvatars = ['⚽', '🏀', '🏈', '🏐', '🎾', '🏓', '🏸', '🥇'];
const foodAvatars = ['🍕', '🍔', '🍟', '🍩', '🌭', '🍣', '🍪', '🥞'];

export default function TeamSetup({ onStart }) {
  const router = useRouter(); // Initialize useRouter hook for navigation
  const [teams, setTeams] = useState({
    A: { name: 'Apples', avatar: '🍎', category: 'fruits' },
    B: { name: 'Bananas', avatar: '🍌', category: 'fruits' }
  });

  const handleStart = () => {
    if (teams.A.name && teams.B.name) onStart(teams.A, teams.B);
  };

  // Handle category change for a team
  const handleCategoryChange = (team, category) => {
    setTeams(prev => ({
      ...prev,
      [team]: { ...prev[team], category, avatar: getAvatars(category)[0] }
    }));
  };

  // Get avatars based on selected category
  const getAvatars = (category) => {
    switch (category) {
      case 'animals':
        return animalAvatars;
      case 'fruits':
        return fruitAvatars;
      case 'space':
        return spaceAvatars;
      case 'sports':
        return sportsAvatars;
      case 'foods':
        return foodAvatars;
      default:
        return fruitAvatars; // Default to fruits
    }
  };

  // Get name for avatar (used for autofill)
  const getNameFromAvatar = (avatar, category) => {
    const nameMap = {
      animals: {
        '🐶': 'Dog',
        '🐱': 'Cat',
        '🦁': 'Lion',
        '🐯': 'Tiger',
        '🐻': 'Bear',
        '🐼': 'Panda',
        '🐨': 'Koala',
        '🦄': 'Unicorn',
      },
      fruits: {
        '🍎': 'Apple',
        '🍌': 'Banana',
        '🍓': 'Strawberry',
        '🍍': 'Pineapple',
        '🍊': 'Orange',
        '🍉': 'Watermelon',
        '🍇': 'Grapes',
        '🍒': 'Cherry',
      },
      space: {
        '🚀': 'Rocket',
        '🪐': 'Planet',
        '👽': 'Alien',
        '🌕': 'Moon',
        '🌌': 'Galaxy',
        '🛸': 'UFO',
        '🌠': 'Shooting Star',
        '🪐': 'Asteroid',
      },
      sports: {
        '⚽': 'Soccer Ball',
        '🏀': 'Basketball',
        '🏈': 'Football',
        '🏐': 'Volleyball',
        '🎾': 'Tennis',
        '🏓': 'Ping Pong',
        '🏸': 'Badminton',
        '🥇': 'Gold Medal',
      },
      foods: {
        '🍕': 'Pizza',
        '🍔': 'Burger',
        '🍟': 'Fries',
        '🍩': 'Donut',
        '🌭': 'Hot Dog',
        '🍣': 'Sushi',
        '🍪': 'Cookie',
        '🥞': 'Pancakes',
      },
    };
    return nameMap[category][avatar] || '';
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full"
      >
        <h1 className="text-3xl font-bold text-center mb-8">Create Your Teams!</h1>
        
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8">
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
              
              {/* Category selection */}
              <div className="mb-4">
                <label htmlFor={`${team}-category`} className="block text-sm font-semibold">Choose Category:</label>
                <select
                  id={`${team}-category`}
                  value={teams[team].category}
                  onChange={(e) => handleCategoryChange(team, e.target.value)}
                  className="w-full p-2 border rounded-lg mt-2"
                >
                  <option value="animals">Animals</option>
                  <option value="fruits">Fruits</option>
                  <option value="space">Space</option>
                  <option value="sports">Sports</option>
                  <option value="foods">Foods</option>
                </select>
              </div>

              {/* Avatar selection */}
              <div className="grid grid-cols-4 gap-2">
                {getAvatars(teams[team].category).map((avatar) => (
                  <button
                    key={avatar}
                    onClick={() => setTeams(prev => ({
                      ...prev,
                      [team]: { ...prev[team], avatar, name: getNameFromAvatar(avatar, teams[team].category) }
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

        <div className="mt-8 flex justify-between">
          {/* Button to return to main page */}
          <button
            onClick={() => router.push('/gameContainer')} // Go to the main game selection page
            className="bg-gray-300 text-black py-2 px-4 rounded-lg hover:bg-gray-400 transition-all"
          >
            Back to Game Selection
          </button>

          {/* Start Game Button */}
          <button
            onClick={handleStart}
            className="bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-600 transition-all"
          >
            Start Game!
          </button>
        </div>
      </motion.div>
    </div>
  );
}