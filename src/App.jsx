import { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [targetColor, setTargetColor] = useState("");
  const [colorOptions, setColorOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [gameStatus, setGameStatus] = useState("");

  // Generate a random color in hex format
  const generateRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // Generate new set of colors including the target color
  const generateColors = () => {
    const newTargetColor = generateRandomColor();
    const options = [newTargetColor];

    while (options.length < 6) {
      const newColor = generateRandomColor();
      if (!options.includes(newColor)) {
        options.push(newColor);
      }
    }

    // Shuffle the array
    return {
      targetColor: newTargetColor,
      options: options.sort(() => Math.random() - 0.5),
    };
  };

  // Handle color guess
  const handleGuess = (color) => {
    if (color === targetColor) {
      setScore((prevScore) => prevScore + 1);
      setGameStatus("Correct! 🎉");
      setTimeout(() => {
        const { targetColor, options } = generateColors();
        setTargetColor(targetColor);
        setColorOptions(options);
        setGameStatus("");
      }, 1500);
    } else {
      setGameStatus("Wrong guess! Game Over 😢");
      setScore(0);
    }
  };

  // Start new game
  const startNewGame = () => {
    const { targetColor, options } = generateColors();
    setTargetColor(targetColor);
    setColorOptions(options);
    setGameStatus("");
    setScore(0);
  };

  useEffect(() => {
    startNewGame();
  }, []);

  return (
    <div className="app">
      <div className="game-container">
        <h1>Color Guessing Game</h1>

        <p data-testid="gameInstructions">
          Can you guess which color matches the box below? Click on one of the
          options!
        </p>

        <div
          data-testid="colorBox"
          className="color-box"
          style={{ backgroundColor: targetColor }}
        />

        <p data-testid="gameStatus" className="game-status">
          {gameStatus}
        </p>

        <div className="color-options">
          {colorOptions.map((color, index) => (
            <button
              key={index}
              data-testid="colorOption"
              className="color-button"
              style={{ backgroundColor: color }}
              onClick={() => handleGuess(color)}
            />
          ))}
        </div>

        <p data-testid="score" className="score">
          Score: {score}
        </p>

        <button
          data-testid="newGameButton"
          className="new-game-button"
          onClick={startNewGame}
        >
          New Game
        </button>
      </div>
    </div>
  );
}
