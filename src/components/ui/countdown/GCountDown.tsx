"use client";
import React, { useState, useEffect } from "react";

interface GCountDownProps {
  label: string;
  counter: number;
}
const GCountDown: React.FC<GCountDownProps> = ({
  label = "Ausschreibungen",
  counter = 100,
}) => {
  const [count, setCount] = useState(0);
  // Determine the increment step based on the counter value
  // For larger targets, increase the count more rapidly
  const incrementStep = counter > 1000 ? Math.ceil(counter / 500) : 1;
  useEffect(() => {
    if (count >= counter) {
      return;
    }

    const intervalId = setInterval(() => {
      setCount((currentCount) => {
        let nextCount = currentCount + incrementStep;
        if (nextCount >= counter) {
          clearInterval(intervalId); // Stop the interval if the counter is reached
          return counter; // Ensure count does not exceed counter
        }
        return nextCount;
      });
    }, 5);

    return (): void => clearInterval(intervalId);
  }, [count, counter, incrementStep]); // Include incrementStep in the dependency array

  return (
    <div className="flex flex-col text-[#00395c]">
      <span className="text-4xl lg:text-6xl font-mono font-bold">
        <span>{count}</span>
      </span>
      {label}
    </div>
  );
};

export default GCountDown;
