import { useState } from 'react';

export default function Keyboard() {
  const [input, setInput] = useState('');

  const rows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
  ];

  const handleKeyPress = (key:string) => {
    console.log(key)
  };

  const handleDelete = () => {
    setInput(prev => prev.slice(0, -1));
  };

  const handleEnter = () => {
    if (input.trim()) {
      console.log('Verifying:', input);
      // Add your verification logic here
      alert(`Verifying: ${input}`);
    }
  };

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
                onClick={() => handleKeyPress(key)}
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
            onClick={handleEnter}
            className="flex-[1] sm:flex-[2] md:flex-[3] dark:bg-neutral-400/50 bg-neutral-400/90  text-shadow-md
            text-white font-semibold rounded-lg transition-all duration-150 py-3 sm:py-4 text-xs sm:text-sm md:text-lg 
            shadow-md hover:shadow-xl transform hover:scale-101 cursor-pointer"
          >
            ENTER
          </button>
          <button
            onClick={handleDelete}
            className="flex-1 dark:bg-red-600/70 bg-red-600/90
            text-white font-semibold rounded-lg transition-all duration-150 py-3 sm:py-4 text-xs sm:text-sm md:text-lg 
            shadow-md hover:shadow-xl transform hover:scale-105 active:scale-95 cursor-pointer"
          >
            ⌫
          </button>
        </div>
      </div>
    </div>
  );
}