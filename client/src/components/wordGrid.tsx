import React, { useEffect, useState, useRef } from "react";

const Tile = ({ letter = "", status = "empty" }) => {
  const statusStyles:any= {
    empty: "border-neutral-500 dark:border-neutral-700",
    correct: "bg-green-500 border-green-500 text-white", // coorect
    present: "bg-amber-500 border-amber-500 text-white", // wrong-place
    absent: "bg-neutral-500 border-neutral-500 text-white", // incorrect
  };

  return (
    <div
      className={`
        w-14 h-14 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20
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

export const Wgrid = ({ length }: { length: number }) => {
  const ATTEMPTS = 5;
  const[current,setCurrent] = useState(1)

  // Create a 2D array structure: 6 rows, 'length' columns
  const rows = Array.from({ length: ATTEMPTS });
  const cols = Array.from({ length: length });

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-2xl gap-2 p-4 bg-transparent rounded-xl">
      {rows.map((_, rowIndex) => (
        <div key={`row-${rowIndex}`} id={`${rowIndex+1}`} className="flex gap-4">
          {cols.map((_, colIndex) => (
            <Tile 
              key={`tile-${rowIndex}-${colIndex}`} 
              letter="" // Future: pass letters here from state
              status="empty" // Future: pass 'correct' | 'present' | 'absent'
            />
          ))}
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
  const hasFetched = useRef(false); // Prevent multiple requests

  const url = "http://localhost:8080/api/";

  useEffect(() => {
    // Prevent multiple requests
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchWord = async () => {
      try {
        const res = await fetch(url + "word", {
          method: "GET",
          // no need of headers for now, keeping it unsafe as of yet.
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
  }, []); // Empty dependency array - runs once

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-red-600">
          Failed to load word. Please try again.
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center rounded-lg bg-red-600 justify-center min-h-screen mx-auto w-full max-w-5xl
     border-r-neutral-400 border-l-red-400">
      <Wgrid length={word?.length || 3} />
    </div>
  );
}