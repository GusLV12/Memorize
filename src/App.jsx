import React, { useState, useEffect } from 'react';
import { Tablero } from './components/Tablero/Tablero';
import './App.css';

const emojiList = [..."💀👻🧛🌮🎱🍬🍕🦖"];

function App() {
  const [memoBlocks, setMemoBlocks] = useState([]);
  const [animating, setAnimating] = useState(false);
  const [selectedMemoBlock, setSelectedMemoBlock] = useState(null);
  const [resetGame, setResetGame] = useState(false);

  const barajarArray = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  useEffect(() => {
    const initializeGame = () => {
      const shuffledEmojiList = barajarArray([...emojiList, ...emojiList]);
      setMemoBlocks(
        shuffledEmojiList.map((emoji, i) => ({
          index: i,
          emoji,
          flipped: false,
        }))
      );
      setSelectedMemoBlock(null);
      setAnimating(false);
    };

    initializeGame();
  }, [resetGame]);

  const handleMemoClick = (memoBlock) => {
    if (animating) return;

    const flippedMemoBlock = { ...memoBlock, flipped: true };
    let memoBlocksCopy = [...memoBlocks];
    memoBlocksCopy.splice(memoBlock.index, 1, flippedMemoBlock);

    setMemoBlocks(memoBlocksCopy);

    if (selectedMemoBlock === null) {
      setSelectedMemoBlock(memoBlock);
    } else if (selectedMemoBlock.emoji === memoBlock.emoji) {
      setSelectedMemoBlock(null);
    } else {
      setAnimating(true);
      setTimeout(() => {
        memoBlocksCopy.splice(memoBlock.index, 1, memoBlock);
        memoBlocksCopy.splice(selectedMemoBlock.index, 1, selectedMemoBlock);
        setMemoBlocks(memoBlocksCopy);
        setSelectedMemoBlock(null);
        setAnimating(false);
      }, 1000);
    }
  };

  const handleResetGame = () => {
    setResetGame((prev) => !prev);
  };

  return (
    <div className="container">
      <Tablero
        animating={animating}
        handleMemoClick={handleMemoClick}
        memoBlocks={memoBlocks}
      />
      <div className="button-container">
        <button onClick={handleResetGame} className="button">Reiniciar</button>
      </div>
    </div>
  );
}

export default App;
