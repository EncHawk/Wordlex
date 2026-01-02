import React, { useEffect, useState, useRef } from "react";

// Wgrid Component
export const Wgrid = ({ length }: { length: number }) => {
  function generateGrid() {
    for (let i = 0; i < length; i++) {
      return (
        Array.from({ length: length }).map((_, i) => (
          <div
            
            className="flex flex-col justify-center items-center gap-3 sm:gap-4 md:gap-6"
          >
            <div key={i} className="flex justify-center items-center bg-green-400 shadow-md cursor-text text-5xl text-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 border items-center rounded-lg border-red-500">A</div>
            <div key={i} className="flex justify-center items-center bg-amber-400 shadow-md cursor-text text-5xl text-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 border items-center rounded-lg border-neutral-300">B</div>
            <div key={i} className="flex justify-center items-center bg-neutral-400 shadow-md cursor-text text-5xl text-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 border items-center rounded-lg border-neutral-300">A</div>
            <div key={i} className="flex justify-center items-center bg-neutral-200 shadow-md cursor-text text-5xl text-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 border items-center rounded-lg border-neutral-300">A</div>
            <div key={i} className="flex justify-center items-center bg-neutral-200 shadow-md cursor-text text-5xl text-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 border items-center rounded-lg border-neutral-300">A</div>
            </div>
        ))
      );
    }
  }

  return (
    <div className="flex flex-col h-screen justify-center items-center w-full max-w-5xl px-2 sm:px-4">
      <div
        className="grid gap-4 sm:gap-5 md:gap-6"
        style={{ gridTemplateColumns: `repeat(${length}, minmax(0, 1fr))` }}
      >
        {generateGrid()}
      </div>
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
          headers: {
            // Store token in memory instead of localStorage
            authorization: "" // Add your token here
          }
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
    <div className="flex items-center rounded-lg bg-transparent justify-center min-h-screen mx-auto w-full max-w-5xl">
      <Wgrid length={word?.length || 3} />
    </div>
  );
}