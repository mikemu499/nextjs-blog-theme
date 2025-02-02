import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// All 44 phonics sounds
const letters = [
    { letter: "A", symbol: "/æ/", sound: "https://www.soundjay.com/voice/sounds/a-1.mp3", example: "Apple", image: "/images/apple.png" },
    { letter: "B", symbol: "/b/", sound: "https://www.soundjay.com/voice/sounds/b-1.mp3", example: "Ball", image: "/images/ball.png" },
    { letter: "C", symbol: "/k/", sound: "https://www.soundjay.com/voice/sounds/c-1.mp3", example: "Cat", image: "/images/cat.png" },
    { letter: "D", symbol: "/d/", sound: "https://www.soundjay.com/voice/sounds/d-1.mp3", example: "Dog", image: "/images/dog.png" },
    // Add all 44 sounds here...
];

// Team icons (fruits and animals)
const teamIcons = [
    { name: "Apple", image: "/images/apple.png" },
    { name: "Banana", image: "/images/banana.png" },
    { name: "Lion", image: "/images/lion.png" },
    { name: "Elephant", image: "/images/elephant.png" },
    // Add more icons as needed...
];

export default function GameContainer() {
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [teamScores, setTeamScores] = useState({ team1: 0, team2: 0 });
    const [currentTeam, setCurrentTeam] = useState(1);
    const [feedback, setFeedback] = useState('');
    const [showNextButton, setShowNextButton] = useState(false);
    const [selectedIcons, setSelectedIcons] = useState({ team1: null, team2: null });
    const [isGameStarted, setIsGameStarted] = useState(false);

    useEffect(() => {
        if (isGameStarted) loadQuestion();
    }, [isGameStarted]);

    const loadQuestion = () => {
        const question = letters[Math.floor(Math.random() * letters.length)];
        setCurrentQuestion(question);
        setFeedback('');
        setShowNextButton(false);

        if (typeof window !== 'undefined') {
            const audio = new Audio(question.sound);
            audio.play().catch((error) => {
                console.error("Audio playback failed:", error);
            });
        }
    };

    const handleAnswer = (selectedOption) => {
        const buttons = document.querySelectorAll('.option-button');
        buttons.forEach(button => button.disabled = true);

        if (selectedOption === currentQuestion.example) {
            setFeedback(
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center"
                >
                    <p className="text-2xl text-green-500 font-bold">Correct!</p>
                    <img src="/images/correct.gif" alt="Correct GIF" className="w-24 mt-4" />
                </motion.div>
            );
            setTeamScores(prev => ({ ...prev, [`team${currentTeam}`]: prev[`team${currentTeam}`] + 1 }));
        } else {
            setFeedback(
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center"
                >
                    <p className="text-2xl text-red-500 font-bold">Wrong! The correct answer is {currentQuestion.example}.</p>
                    <img src="/images/wrong.gif" alt="Wrong GIF" className="w-24 mt-4" />
                </motion.div>
            );
        }
        setShowNextButton(true);
    };

    const nextQuestion = () => {
        setCurrentTeam(currentTeam === 1 ? 2 : 1);
        loadQuestion();
    };

    const startGame = () => {
        if (selectedIcons.team1 && selectedIcons.team2) {
            setIsGameStarted(true);
        } else {
            alert("Both teams must select an icon before starting the game!");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/images/background.jpg')" }}>
            {!isGameStarted ? (
                <div className="bg-white bg-opacity-90 rounded-3xl shadow-2xl p-8 w-full max-w-md text-center">
                    <h2 className="text-3xl font-bold text-blue-500 mb-6">Choose Your Team Icons</h2>
                    <div className="flex justify-between mb-6">
                        <div>
                            <h3 className="text-xl font-bold text-green-500 mb-2">Team 1</h3>
                            <div className="grid grid-cols-2 gap-4">
                                {teamIcons.map((icon, index) => (
                                    <button
                                        key={index}
                                        className={`w-20 h-20 rounded-full overflow-hidden border-4 ${selectedIcons.team1 === icon.name ? 'border-green-500' : 'border-transparent'}`}
                                        onClick={() => setSelectedIcons(prev => ({ ...prev, team1: icon.name }))}
                                    >
                                        <img src={icon.image} alt={icon.name} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-red-500 mb-2">Team 2</h3>
                            <div className="grid grid-cols-2 gap-4">
                                {teamIcons.map((icon, index) => (
                                    <button
                                        key={index}
                                        className={`w-20 h-20 rounded-full overflow-hidden border-4 ${selectedIcons.team2 === icon.name ? 'border-red-500' : 'border-transparent'}`}
                                        onClick={() => setSelectedIcons(prev => ({ ...prev, team2: icon.name }))}
                                    >
                                        <img src={icon.image} alt={icon.name} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                    <button
                        className="bg-blue-500 text-white text-lg font-bold py-3 px-6 rounded-xl shadow-md hover:bg-blue-600 transition-colors duration-300"
                        onClick={startGame}
                    >
                        Start Game
                    </button>
                </div>
            ) : (
                <div className="relative bg-white bg-opacity-90 rounded-3xl shadow-2xl p-8 w-full max-w-md text-center">
                    {/* Team Icons and Scores */}
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex flex-col items-center">
                            <img src={teamIcons.find(icon => icon.name === selectedIcons.team1)?.image} alt="Team 1 Icon" className="w-16 h-16 rounded-full mb-2" />
                            <p className="text-xl font-bold text-green-500">Team 1</p>
                            <p className="text-2xl font-bold text-orange-500">{teamScores.team1}</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <img src={teamIcons.find(icon => icon.name === selectedIcons.team2)?.image} alt="Team 2 Icon" className="w-16 h-16 rounded-full mb-2" />
                            <p className="text-xl font-bold text-red-500">Team 2</p>
                            <p className="text-2xl font-bold text-orange-500">{teamScores.team2}</p>
                        </div>
                    </div>

                    {/* Game Content */}
                    <motion.div
                        className="text-7xl font-bold text-orange-500 mb-6 drop-shadow-md"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 100 }}
                    >
                        {currentQuestion?.letter}
                    </motion.div>
                    <div className="text-xl text-blue-500 mb-4">{currentQuestion?.symbol}</div>
                    {currentQuestion && (
                        <motion.img
                            src={currentQuestion.image}
                            alt={currentQuestion.example}
                            className="w-40 h-auto mx-auto mb-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        />
                    )}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        {currentQuestion &&
                            getRandomOptions(currentQuestion.example).map((option, index) => (
                                <motion.button
                                    key={index}
                                    className="bg-yellow-500 text-white text-xl font-bold py-4 px-6 rounded-xl shadow-md hover:bg-yellow-600 transition-transform duration-300 ease-in-out hover:scale-105 disabled:bg-gray-300 disabled:cursor-not-allowed"
                                    onClick={() => handleAnswer(option)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {option}
                                </motion.button>
                            ))}
                    </div>
                    <div className="mt-4">{feedback}</div>
                    {showNextButton && (
                        <motion.button
                            id="next-btn"
                            onClick={nextQuestion}
                            className="mt-4 bg-blue-500 text-white text-lg font-bold py-3 px-6 rounded-xl shadow-md hover:bg-blue-600 transition-colors duration-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Next Question
                        </motion.button>
                    )}
                </div>
            )}
        </div>
    );
}

function getRandomOptions(correctAnswer) {
    const options = [correctAnswer];
    while (options.length < 2) {
        const randomOption = letters[Math.floor(Math.random() * letters.length)].example;
        if (!options.includes(randomOption)) {
            options.push(randomOption);
        }
    }
    return options.sort(() => Math.random() - 0.5);
}
