// fully vibecoded, im too lazy to do the work.

import { useState } from 'react';

export default function Keyboard() {
  const [input, setInput] = useState('');
  const [message, setMessage] = useState('');

  const rows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
  ];

  const handleKeyPress = (key) => {
    setInput(prev => prev + key);
    setMessage('');
  };

  const handleDelete = () => {
    setInput(prev => prev.slice(0, -1));
    setMessage('');
  };

  const handleEnter = () => {
    if (input.trim()) {
      setMessage(`Verifying: ${input}`);
      // Add your verification logic here
      console.log('Enter pressed with input:', input);
    } else {
      setMessage('Please enter something first');
    }
  };

  return (
    <div className="min-h-100 w-full max-w-5xl from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <div className="space-y-2">
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
                    className="flex-1 max-w-125 aspect-square bg-slate-700 hover:bg-slate-600 active:bg-slate-500
                     text-white font-semibold transition-all duration-150 text-sm  px-4 py-px rounded-sm cursor-pointer
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
                className="flex-1 md:flex-[3] text-white font-semibold rounded-lg 
                 transition-all duration-150 py-4 text-sm md:text-lg shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
              >
                ENTER
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 max-w-[120px] bg-red-600 hover:bg-red-500 active:bg-red-400 text-white font-semibold rounded-lg transition-all duration-150 py-4 text-sm md:text-lg shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
              >
                ⌫
              </button>
            </div>
        </div>
    </div>
)}