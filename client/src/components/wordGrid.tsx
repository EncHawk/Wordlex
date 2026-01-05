import { useEffect, useState } from "react";

const rows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
  ];
type keyboardProps={
  handleKey:(e:string)=>void
}

export const Keyboard= ({handleKey}:keyboardProps)=> {
  return (
    <div className=" mt-2 w-full max-w-5xl mx-auto flex items-center justify-center p-4">
      <div className="space-y-2 w-full">
        {rows.map((row, rowIndex) => (
          <div 
            key={rowIndex} 
            className="flex justify-center gap-1 md:gap-2"
            style={{ 
              paddingLeft: rowIndex === 1 ? '5%' : rowIndex === 2 ? '10%' : '0',
              paddingRight: rowIndex === 1 ? '5%' : rowIndex === 2 ? '10%' : '0'
            }}
          >
            {row.map((key) => (
              <button
                key={key}
                onClick={()=>handleKey(key)}
                className="flex-1 min-w-0 aspect-square bg-slate-700 hover:bg-slate-600 active:bg-slate-500
                 text-white font-semibold transition-all duration-150 text-xs sm:text-sm px-1 sm:px-4 py-px rounded-sm cursor-pointer
                 md:text-lg shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
              >
                {key}
              </button>
            ))}
          </div>
        ))}

        {/* Bottom row with Enter and Delete */}
        <div className="flex justify-center gap-1 md:gap-2">
          <button
            onClick={()=>handleKey('Enter')}
            className="flex-[1] sm:flex-[2] md:flex-[2] dark:bg-neutral-400/50 bg-neutral-400/90  text-shadow-md
            text-white font-semibold rounded-lg transition-all duration-150 py-3 sm:py-4 text-xs sm:text-sm md:text-lg 
            shadow-md hover:shadow-xl transform hover:scale-101 cursor-pointer"
          >
            ENTER
          </button>
          <button
            onClick={()=>handleKey('Backspace')}
            className="flex-1 dark:bg-red-600/70 bg-red-600/90
            text-white font-semibold rounded-lg transition-all duration-150 py-3 sm:py-4 text-xs sm:text-sm md:text-lg 
            shadow-md hover:shadow-md transform hover:scale-10 active:scale-95 cursor-pointer"
          >
            ⌫
          </button>
        </div>
      </div>
    </div>
  );
}

export const Tile = ({ letter = "", status = "empty", id=""}) => {
  const statusStyles:any= {
    empty: "border-neutral-500 dark:border-neutral-700",
    correct: "bg-green-600 border-green-500 text-white", // coorect
    present: "bg-amber-400 border-amber-500 text-white", // wrong-place
    absent: "bg-neutral-500 border-neutral-500 text-white", // incorrect
  };

  return (
    <div
    id={id}
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
    const [currentAttempt, setCurrentAttempt] = useState(0);
    const [guesses, setGuesses] = useState<string[]>(Array(ATTEMPTS).fill(""));
    const[display,setDisplay] = useState(false)
    const [tileStatuses, setTileStatuses] = useState<string[][]>(
      Array(ATTEMPTS).fill(null).map(() => Array(length).fill("empty"))
    );
    const handleKey = (e: string) => {
      if(display){
        return
      }
    if (ATTEMPTS === currentAttempt){ setDisplay(true)}
    const activeGuess = guesses[currentAttempt] || "";

    if (e.match(/^[a-zA-Z]$/)) {
      if (activeGuess.length < length) {
        const newGuesses = [...guesses];
        newGuesses[currentAttempt] = activeGuess + e.toUpperCase();
        console.log(currentAttempt)
        setGuesses(newGuesses);
      }
    } else if (e === "Backspace") {
       if (activeGuess.length > 0) {
        const newGuesses = [...guesses];
        newGuesses[currentAttempt] = activeGuess.slice(0, -1);
        setGuesses(newGuesses);
      }
    } 
    
    else if (e === "Enter") {
      // document.getElementById(`#${currentAttempt}`)?.classList.add('animate-flip')
      if(currentAttempt+1 === ATTEMPTS || 
        guesses[currentAttempt]===word.toUpperCase()) setDisplay(true)

      if (activeGuess.length === length && currentAttempt < ATTEMPTS) {
        const newStatuses = [...tileStatuses];
        const guessArray = activeGuess.split("");
        const wordArray = word.toUpperCase().split("");
        const statusRow = Array(length).fill("empty");

        const remainingWordLetters: string[] = []; // tp keep track of whatis missing and what's not
        const remainingGuessLetters: string[] = [];

        for (let i = 0; i < length; i++) { //marking corrects
          if (guessArray[i] === wordArray[i]) {
            statusRow[i] = "correct";
          } else {
            remainingWordLetters.push(wordArray[i]);
            remainingGuessLetters.push(guessArray[i]);
          }
        }

        for (let i = 0; i < remainingGuessLetters.length; i++) { // to check ifthe letter is present in the final guess. 
          const guessLetter = remainingGuessLetters[i];
          const wordIndex = remainingWordLetters.indexOf(guessLetter); // returns an index
          if (wordIndex !== -1) {
            const originalIndex = guessArray.findIndex( // if a letter from the remGuesses exists andits set to empty return its index
              (letter, idx) => letter === guessLetter && statusRow[idx] === "empty"
            );
            if (originalIndex !== -1) {
              statusRow[originalIndex] = "present";
              remainingWordLetters.splice(wordIndex, 1);
            }
          }
        }

        // set rest as absent since we checked for the present and the corrects.
        for (let i = 0; i < length; i++) {
          if (statusRow[i] === "empty") {
            statusRow[i] = "absent";
          }
        }

        newStatuses[currentAttempt] = statusRow;
        setTileStatuses(newStatuses);

        // move to next attempt,since the currentAttempt is 0based.
        if (currentAttempt < ATTEMPTS - 1) {
          setCurrentAttempt(currentAttempt + 1);
        } else {
          setCurrentAttempt(ATTEMPTS);
        }
      } else {
        // setDisplay(true);
      }
    }
  };

  useEffect(() => {
    const handleKeyboardEvent = (e:KeyboardEvent)=>{handleKey(e.key)}
    document.addEventListener("keydown", handleKeyboardEvent);
    return () => {
    document.removeEventListener("keydown", handleKeyboardEvent);
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
              id={`tile-${rowIndex+1}`} 
              letter={guesses[rowIndex]?guesses[rowIndex][colIndex]:""}
              status={tileStatuses[rowIndex]?.[colIndex] || 'empty'}
            />
          ))}
        </div>
      ))}
      {display && <div className="bg-white/50 dark:bg-white/80 px-2 py-2 my-1 mt-4 rounded-xl shadow-sm text-shadow-sm text-center text-black text-xl">
        <h1 className="text-center font-light text-xl">
          {word.toUpperCase()}
        </h1>
      </div> }
      <Keyboard handleKey={handleKey}/> {/* need to add callback functions into this to make changes to the tiles.*/}
    </div>
  );
};
