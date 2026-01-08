import { useEffect, useRef, useState } from "react";
import { Wgrid } from "./wordGrid";
import { Navbar } from "./navbar";

export default function Wordle() {
  const [word, setWord] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const hasFetched = useRef(false); // Prevent multiple requests

  const url = "/api/";

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
      <div className="flex flex-col items-center justify-center bg-gradient-to-b
       from-neutral-200 to-blue-200 dark:bg-gradient-to-b w-full min-h-screen 
       dark:from-neutral-950 dark:to-slate-900">
        <Navbar />
        <div className="flex items-center justify-center flex-1">
          <div className="text-xl text-gray-600 dark:text-gray-400">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center bg-gradient-to-b
       from-neutral-200 to-blue-200 dark:bg-gradient-to-b w-full min-h-screen 
       dark:from-neutral-950 dark:to-slate-900">
        <Navbar />
        <div className="flex items-center justify-center flex-1">
          <div className="text-3xl text-red-600 dark:text-red-400">
            Failed to load word. Server's down, try again.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center bg-linear-to-b
     from-neutral-200 to-blue-200 dark:bg-linaer-to-b w-full min-h-screen 
     dark:from-slate-950 dark:to-neutral-900 ">
      <div className="flex items-center rounded-lg bg-transparent justify-center min-h-screen 
        mx-auto w-full max-w-4xl h-full relative">

        <div className=" absolute left-0
        dark:bg-linear-to-b dark:from-transparent dark:via-neutral-200/10 dark:to-transparent 
        bg-linear-to-b from-transparent via-neutral-800/10 to-transparent
        h-full w-px" ></div>
        <Navbar/>
        <Wgrid length={word?.length || 3} word={word ||" "} />

        <div className=" absolute right-0
        dark:bg-linear-to-b dark:from-transparent dark:via-neutral-200/10 dark:to-transparent 
        bg-linear-to-b from-transparent via-neutral-800/10 to-transparent
        h-full w-px" ></div>
      </div>

    </div>
  );
}