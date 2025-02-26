import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";

const words = ["cozy", "fun", "react", "typing", "game", "challenge", "speed", "bootstrap"];

export default function TypingGame() {
  const [word, setWord] = useState("");
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    setWord(words[Math.floor(Math.random() * words.length)]);
  }, []);

  useEffect(() => {
    if (gameStarted && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setGameOver(true);
    }
  }, [gameStarted, timeLeft]);

  const handleChange = (e) => {
    setInput(e.target.value);
    if (e.target.value === word) {
      setScore((prevScore) => prevScore + 1);
      setWord(words[Math.floor(Math.random() * words.length)]);
      setInput("");
    }
  };

  const restartGame = () => {
    setScore(0);
    setTimeLeft(30);
    setGameOver(false);
    setWord(words[Math.floor(Math.random() * words.length)]);
    setInput("");
    setGameStarted(true);
  };

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100 text-center bg-light">
      <h1 className="display-4 fw-bold mb-4 text-primary">Cozy Typing Game</h1>
      {!gameStarted && (
        <button className="btn btn-success mb-3" onClick={() => setGameStarted(true)}>Start</button>
      )}
      {gameOver ? (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fs-3 fw-semibold text-danger">
            Game Over! Score: {score}
          </motion.div>
          <button className="btn btn-warning mt-3" onClick={restartGame}>Restart</button>
          <div className="position-fixed top-0 start-0 w-100 h-100 overflow-hidden" style={{ pointerEvents: "none", zIndex: 0 }}>
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: "100vh", opacity: [1, 0.8, 0.6, 0] }}
                transition={{ duration: Math.random() * 2 + 1, repeat: Infinity }}
                className="position-absolute fs-1"
                style={{ left: `${Math.random() * 100}%` }}
              >
                🎉
              </motion.div>
            ))}
          </div>
        </>
      ) : gameStarted ? (
        <>
          <motion.h2 initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="fs-2 fw-bold bg-white px-4 py-2 rounded shadow">
            {word}
          </motion.h2>
          <input
            type="text"
            className="form-control mt-3 text-center w-50"
            value={input}
            onChange={handleChange}
            disabled={gameOver}
          />
          <p className="mt-3 text-danger fw-bold">Time Left: {timeLeft}s</p>
          <p className="mt-2 fs-4 text-dark">Score: {score}</p>
          <button className="btn btn-warning mt-3" onClick={restartGame}>Restart</button>
        </>
      ) : null}
    </div>
  );
}
