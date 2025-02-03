'use client';
import { useEffect, useState } from 'react';

export default function ProgressBar({ timeLeft, totalTime }) {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    setProgress((timeLeft / totalTime) * 100);
  }, [timeLeft, totalTime]);

  return (
    <div className="mb-8">
      <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-purple-500 transition-all duration-1000 ease-out"
          style={{ width: `${progress}%` }}
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin="0"
          aria-valuemax="100"
        >
          <div className="h-full w-full bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse" />
        </div>
      </div>
      <div className="mt-2 text-center text-gray-600 font-bold">
        Time Left: {timeLeft}s
      </div>
    </div>
  );
}
