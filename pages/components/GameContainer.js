import { useState } from 'react';

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

    const loadQuestion = () => {
        const question = letters[Math.floor(Math.random() * letters.length)];
        setCurrentQuestion(question);
        setFeedback('');
        setShowNextButton(false);

        const audio = new Audio(question.sound);
        audio.play();
    };

    const handleAnswer = (selectedOption) => {
        const buttons = document.querySelectorAll('.option-button');
        buttons.forEach(button => button.disabled = true);

        if (selectedOption === currentQuestion.example) {
            setFeedback(
                <div>
                    <p className="correct">Correct!</p>
                    <img src="/images/correct.gif" alt="Correct GIF" />
                </div>
            );
            setTeamScores(prev => ({ ...prev, [`team${currentTeam}`]: prev[`team${currentTeam}`] + 1 }));
        } else {
            setFeedback(
                <div>
                    <p className="wrong">Wrong! The correct answer is {currentQuestion.example}.</p>
                    <img src="/images/wrong.gif" alt="Wrong GIF" />
                </div>
            );
        }
        setShowNextButton(true);
    };

    const nextQuestion = () => {
        setCurrentTeam(currentTeam === 1 ? 2 : 1);
        loadQuestion();
    };

    if (!currentQuestion) {
        loadQuestion();
    }

    return (
        <div className="game-container">
            <div className="letter-box">{currentQuestion?.letter}</div>
            <div className="phonetic-symbol">{currentQuestion?.symbol}</div>
            <div className="options">
                {currentQuestion &&
                    getRandomOptions(currentQuestion.example).map((option, index) => (
                        <button
                            key={index}
                            className="option-button"
                            onClick={() => handleAnswer(option)}
                        >
                            {option}
                        </button>
                    ))}
            </div>
            <div className="feedback">{feedback}</div>
            {showNextButton && (
                <button id="next-btn" onClick={nextQuestion}>
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
