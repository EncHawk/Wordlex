import React, { useEffect, useState, useRef } from "react";

const Tile = ({ letter = "", status = "empty" }) => {
  const statusStyles: any = {
    empty: "border-neutral-500 dark:border-neutral-700",
    correct: "bg-green-500 border-green-500 text-white", // correct
    present: "bg-amber-500 border-amber-500 text-white", // wrong-place
    absent: "bg-neutral-500 border-neutral-500 text-white", // incorrect
  };

  return (
    <div
      className={`
        w-14 h-14 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:w-20
        border-2 flex items-center justify-center
        text-2xl sm:text-3xl md:text-4xl font-bold uppercase rounded-sm
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
  const [currentAttempt, setCurrentAttempt] = useState(0);
  const [guesses, setGuesses] = useState<string[]>(Array(ATTEMPTS).fill(""));
  const [tileStatuses, setTileStatuses] = useState<string[][]>(
    Array(ATTEMPTS).fill(null).map(() => Array(length).fill("empty"))
  );

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      // Only process keys if we haven't exceeded attempts
      if (currentAttempt >= ATTEMPTS) return;

      const currentGuess = guesses[currentAttempt] || "";

      // Handle letter input (a-z, A-Z)
      if (e.key.match(/^[a-zA-Z]$/)) {
        if (currentGuess.length < length) {
          const newGuesses = [...guesses];
          newGuesses[currentAttempt] = currentGuess + e.key.toUpperCase();
          setGuesses(newGuesses);
        }
      }
      // Handle Backspace
      else if (e.key === "Backspace") {
        if (currentGuess.length > 0) {
          const newGuesses = [...guesses];
          newGuesses[currentAttempt] = currentGuess.slice(0, -1);
          setGuesses(newGuesses);
        }
      }
      // Handle Enter - submit guess
      else if (e.key === "Enter") {
        if (currentGuess.length === length && currentAttempt < ATTEMPTS) {
          // Calculate tile statuses for this guess
          const newStatuses = [...tileStatuses];
          const guessArray = currentGuess.split("");
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
              // Find the original index in the guess
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
            // Game over - no more attempts
            setCurrentAttempt(ATTEMPTS);
          }

          // Check if won
          if (currentGuess.toUpperCase() === word.toUpperCase()) {
            // You can add a win state here
            console.log("You won!");
          }
        }
      }
    };

    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("keydown", handleKey);
    };
  }, [currentAttempt, guesses, length, word, tileStatuses]);

  const rows = Array.from({ length: ATTEMPTS });
  const cols = Array.from({ length: length });

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-2xl gap-2 p-4 bg-transparent rounded-xl">
      {rows.map((_, rowIndex) => (
        <div key={`row-${rowIndex}`} className="flex gap-4">
          {cols.map((_, colIndex) => {
            const currentGuess = guesses[rowIndex] || "";
            const letter = currentGuess[colIndex] || "";
            const status = tileStatuses[rowIndex]?.[colIndex] || "empty";
            
            return (
              <Tile
                key={`tile-${rowIndex}-${colIndex}`}
                letter={letter}
                status={status}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

// Wordle Component
export default function Wordle() {
  const [word, setWord] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const hasFetched = useRef(false);

  const url = "/api/";

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchWord = async () => {
      try {
        const res = await fetch(url + "word", {
          method: "GET",
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        setWord(data.word.word);
        setError(false);
      } catch (err) {
        console.error("Failed to fetch word:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchWord();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error || !word) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-red-600">
          Failed to load word. Please try again.
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center rounded-lg bg-transparent justify-center min-h-screen mx-auto w-full max-w-5xl">
      <Wgrid length={word.length} word={word} />
    </div>
  );
}

analyse, what states shd i use. cursor spat this, i wanna learn this stuff tho