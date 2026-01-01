import React, { useEffect, useRef, useState } from "react";
import { Wgrid } from "./wordGrid";
import { Navbar } from "./navbar";

export const Wordle = () => {
  const [word, setWord] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const hasFetched = useRef(false)
  const url = "http://localhost:8080/api/";

  useEffect(() => {
    if(hasFetched.current) return;
    hasFetched.current = true
    const fetchWord = async () => {
      try {
        const res = await fetch(url + "word", {
          method: "GET",
          headers: {
            authorization: localStorage.getItem("token") || ""
          }
        });

        const data = await res.json();
        setWord(data.word.word);
      } catch (err) {
        console.log(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchWord();
  }, []);
  return(
      <div className="flex flex-col items-center justify-center rounded-lg bg-transparent  
        min-h-screen mx-auto w-full max-w-7xl bg-linear-to-b from-neutral-100 to-violet-400">
          <Navbar/>
          <Wgrid length={word?.length}/>
      </div>
  )
}