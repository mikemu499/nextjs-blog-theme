import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const letters = [
    { letter: "A", symbol: "/æ/", sound: "https://www.soundjay.com/voice/sounds/a-1.mp3", example: "Apple", image: "/images/apple.png" },
    { letter: "B", symbol: "/b/", sound: "https://www.soundjay.com/voice/sounds/b-1.mp3", example: "Ball", image: "/images/ball.png" },
    // Add all 44 sounds here...
];

export default function GameContainer() {
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [teamScores, setTeamScores] = useState({ team1: 0, team2: 0 });
    const [currentTeam, setCurrentTeam] = useState(1);
    const [feedback, setFeedback] = useState('');
    const [showNextButton, setShowNextButton] = useState(false);

    useEffect(() => {
        loadQuestion();
    }, []);

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

    return (
        <motion.div
            className="bg-white bg-opacity-90 rounded-3xl shadow-2xl p-8 w-full max-w-md text-center"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* Letter Box */}
            <motion.div
                className="text-7xl font-bold text-orange-500 mb-6 drop-shadow-md"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 100 }}
            >
                {currentQuestion?.letter}
            </motion.div>

            {/* Phonetic Symbol */}
            <div className="text-xl text-blue-500 mb-4">{currentQuestion?.symbol}</div>

            {/* Image */}
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

            {/* Options */}
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

            {/* Feedback */}
            <div className="mt-4">{feedback}</div>

            {/* Next Button */}
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
        </motion.div>
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
