import { useState, useEffect } from 'react';

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
                <div className="flex flex-col items-center">
                    <p className="text-2xl text-green-500 font-bold">Correct!</p>
                    <img src="/images/correct.gif" alt="Correct GIF" className="w-24 mt-4" />
                </div>
            );
            setTeamScores(prev => ({ ...prev, [`team${currentTeam}`]: prev[`team${currentTeam}`] + 1 }));
        } else {
            setFeedback(
                <div className="flex flex-col items-center">
                    <p className="text-2xl text-red-500 font-bold">Wrong! The correct answer is {currentQuestion.example}.</p>
                    <img src="/images/wrong.gif" alt="Wrong GIF" className="w-24 mt-4" />
                </div>
            );
        }
        setShowNextButton(true);
    };

    const nextQuestion = () => {
        setCurrentTeam(currentTeam === 1 ? 2 : 1);
        loadQuestion();
    };

    return (
        <div className="bg-white bg-opacity-90 rounded-2xl shadow-lg p-6 w-full max-w-md text-center">
            <div className="text-6xl font-bold text-orange-500 mb-4">{currentQuestion?.letter}</div>
            <div className="text-xl text-blue-500 mb-4">{currentQuestion?.symbol}</div>
            {currentQuestion && (
                <img src={currentQuestion.image} alt={currentQuestion.example} className="w-36 h-auto mx-auto mb-4" />
            )}
            <div className="grid grid-cols-2 gap-4 mb-4">
                {currentQuestion &&
                    getRandomOptions(currentQuestion.example).map((option, index) => (
                        <button
                            key={index}
                            className="bg-yellow-500 text-white text-xl font-bold py-4 px-6 rounded-lg shadow-md hover:bg-yellow-600 transition-transform duration-300 ease-in-out hover:scale-110 disabled:bg-gray-300 disabled:cursor-not-allowed"
                            onClick={() => handleAnswer(option)}
                        >
                            {option}
                        </button>
                    ))}
            </div>
            <div className="mt-4">{feedback}</div>
            {showNextButton && (
                <button
                    id="next-btn"
                    onClick={nextQuestion}
                    className="mt-4 bg-blue-500 text-white text-lg font-bold py-2 px-4 rounded-md shadow-md hover:bg-blue-600 transition-colors duration-300"
                >
                    Next Question
                </button>
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
