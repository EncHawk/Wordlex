import React, { useEffect, useState, useRef } from "react";
import Keyboard from "./keyboard";

export const Tile = ({ letter = "", status = "empty" }) => {
  const statusStyles:any= {
    empty: "border-neutral-500 dark:border-neutral-700",
    correct: "bg-green-600 border-green-500 text-white", // coorect
    present: "bg-amber-400 border-amber-500 text-white", // wrong-place
    absent: "bg-neutral-500 border-neutral-500 text-white", // incorrect
  };

  return (
    <div
      className={`
        w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20
        border-2 border-neutral-800 dark:border-neutral-300 flex items-center justify-center
        text-2xl sm:text-3xl md:text-4xl font-bold uppercase rounded-sm text-black dark:text-white
        transition-all duration-500
        ${statusStyles[status]}
      `}
    >
      {letter}
    </div>
  );
};

export const Wgrid = ({ length, word }: { length: number; word: string }) => {
    const ATTEMPTS = 6;
    const[tmp, setTmp] = useState<string[]>([])
    const [currentAttempt, setCurrentAttempt] = useState(0);
    const [guesses, setGuesses] = useState<string[]>(Array(ATTEMPTS).fill(""));
    const[display,setDisplay] = useState(false)
    const [tileStatuses, setTileStatuses] = useState<string[][]>(
      Array(ATTEMPTS).fill(null).map(() => Array(length).fill("empty"))
    );
    function handleBack(activeGuess:String){
       if (activeGuess.length > 0) {
        const newGuesses = [...guesses];
        newGuesses[currentAttempt] = activeGuess.slice(0, -1);
        setGuesses(newGuesses);
      }
    }

  useEffect(() => {
  const handleKey = (e: KeyboardEvent) => {
    if (ATTEMPTS === currentAttempt){ setDisplay(true)}
    const activeGuess = guesses[currentAttempt] || "";

    if (e.key.match(/^[a-zA-Z]$/)) {
      if (activeGuess.length < length) {
        const newGuesses = [...guesses];
        newGuesses[currentAttempt] = activeGuess + e.key.toUpperCase();
        console.log(currentAttempt)
        setGuesses(newGuesses);
      }
    } else if (e.key === "Backspace") {
      handleBack(activeGuess)
    } else if (e.key === "Enter") {
      if(currentAttempt+1 === ATTEMPTS) setDisplay(true)
      if (activeGuess.length === length && currentAttempt < ATTEMPTS) {
        // Calculate tile statuses for this guess
        const newStatuses = [...tileStatuses];
        const guessArray = activeGuess.split("");
        const wordArray = word.toUpperCase().split("");
        const statusRow = Array(length).fill("empty");

        // First pass: mark correct positions
        const remainingWordLetters: string[] = [];
        const remainingGuessLetters: string[] = [];

        for (let i = 0; i < length; i++) {
          if (guessArray[i] === wordArray[i]) {
            statusRow[i] = "correct";
          } else {
            remainingWordLetters.push(wordArray[i]);
            remainingGuessLetters.push(guessArray[i]);
          }
        }

        // Second pass: mark present (wrong position) and absent
        for (let i = 0; i < remainingGuessLetters.length; i++) {
          const guessLetter = remainingGuessLetters[i];
          const wordIndex = remainingWordLetters.indexOf(guessLetter);
          if (wordIndex !== -1) {
            const originalIndex = guessArray.findIndex(
              (letter, idx) => letter === guessLetter && statusRow[idx] === "empty"
            );
            if (originalIndex !== -1) {
              statusRow[originalIndex] = "present";
              remainingWordLetters.splice(wordIndex, 1);
            }
          }
        }

        // Mark remaining as absent
        for (let i = 0; i < length; i++) {
          if (statusRow[i] === "empty") {
            statusRow[i] = "absent";
          }
        }

        newStatuses[currentAttempt] = statusRow;
        setTileStatuses(newStatuses);

        // Move to next attempt
        if (currentAttempt < ATTEMPTS - 1) {
          setCurrentAttempt(currentAttempt + 1);
        } else {
          setCurrentAttempt(ATTEMPTS);
        }

        // Check if won
        if (activeGuess.toUpperCase() === word.toUpperCase()) {
          console.log("You won!");
        }
      } else {
        // setDisplay(true);
      }
    }
  };
  
  document.addEventListener("keydown", handleKey);
  return () => {
    document.removeEventListener("keydown", handleKey);
  };
}, [currentAttempt, guesses, tileStatuses, length, word]); 

  // Create a 2D array structure: 6 rows, 'length' columns
  const rows = Array.from({ length: ATTEMPTS });
  const cols = Array.from({ length: length });

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-2xl sm:mt-25 md:mt-30 gap-1 bg-transparent">
      {rows.map((_, rowIndex) => (
        <div key={`row-${rowIndex}`} id={`${rowIndex+1}`} className="flex gap-1 sm:gap-2 md:gap-3">
          {cols.map((_, colIndex) => (
            <Tile 
              key={`tile-${rowIndex+1}-${colIndex}`} 
              letter={guesses[rowIndex]?guesses[rowIndex][colIndex]:""}
              status={'empty'}
            />
          ))}
        </div>
      ))}
      {display && <div className="bg-white/50 dark:bg-white/80 px-2 py-2 my-1 mt-4 rounded-xl shadow-sm text-shadow-sm text-center text-black text-xl">
        <h1 className="text-center font-light text-2xl">
          {word}
        </h1>
      </div> }
      <Keyboard/> {/* need to add callback functions into this to make changes to the tiles.*/}
    </div>
  );
};
