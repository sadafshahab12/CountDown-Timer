"use client";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
const Countdown = () => {
  const [duration, setDuration] = useState<number | string>("");
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const timerReference = useRef<NodeJS.Timeout | null>(null);

  // The handleSetDuration function sets the countdown time based on user input, checks if input is positive, sets remaining time, ensures timer is active, and clears existing intervals.
  const handleSetDuration = (): void => {
    if (typeof duration === "number" && duration > 0) {
      setTimeLeft(duration);
      setIsActive(false);
      setIsPaused(false);
      if (timerReference.current) {
        clearInterval(timerReference.current);
      }
    }
  };
  // The handleStart function makes the timer active, stops it from pausing, and starts the countdown if there is any leftover time.
  const handleStart = (): void => {
    if (timeLeft > 0) {
      setIsActive(true);
      setIsPaused(false);
    }
  };

  // The handlePause method pauses the countdown of a running timer by clearing any existing interval, pauses the timer, and halting its activity.
  const handlePause = (): void => {
    if (isActive) {
      setIsPaused(true);
      setIsActive(false);
      if (timerReference.current) {
        clearInterval(timerReference.current);
      }
    }
  };

  // The handleReset function stops the timer, clears any previous timer interval, and resets it to the user's original duration.

  const handleReset = (): void => {
    setIsActive(false);
    setIsPaused(false);
    setTimeLeft(typeof duration === "number" ? duration : 0);
    if (timerReference.current) {
      //clears any existing timer interval.
      clearInterval(timerReference.current);
    }
  };

  useEffect(() => {
    if (isActive && !isPaused) {
      timerReference.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timerReference.current!);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerReference.current) {
        clearInterval(timerReference.current);
      }
    };
  }, [isActive, isPaused]);

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")} : ${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  const handleDurationChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setDuration(Number(e.target.value || ""));
  };
  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="bg-gradient-to-l from-red-500 to-yellow-400 shadow p-8 rounded-2xl w-full max-w-md m-5">
          <h1 className="lg:text-4xl text-[1.5rem] text-center font-bold pb-7">
            Count Down Timer
          </h1>

          <div className="flex w-full">
            <input
              type="number"
              id="duration"
              placeholder="Enter duration in seconds"
              value={duration}
              onChange={handleDurationChange}
              className="w-full pl-5 pr-2 flex-1 mr-4 rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 outline-none focus:outline-none"
            />
            <Button
              onClick={handleSetDuration}
              variant="outline"
              className="lg:px-7 sm:px-4 lg:text-[1.2rem] sm:text-[1rem]  active:scale-[1.1] duration-200 transition-all"
            >
              Set
            </Button>
          </div>
          {/* formatted time left */}
          <div className="text-center text-6xl font-bold py-5">
            {formatTime(timeLeft)}
          </div>
          <div className="flex justify-center items-center gap-5 mt-8">
            <Button
              onClick={handleStart}
              variant="outline"
              className="lg:text-[1.2rem] sm:text-[1rem]  active:scale-[1.1] duration-200 transition-all"
            >
              {isPaused ? "Resume" : "Start"}
            </Button>
            <Button
              onClick={handlePause}
              variant="outline"
              className="lg:text-[1.2rem] sm:text-[1rem] active:scale-[1.1] duration-200 transition-all "
            >
              Paused
            </Button>
            <Button
              onClick={handleReset}
              variant="outline"
              className="lg:text-[1.2rem] sm:text-[1rem] active:scale-[1.1] duration-200 transition-all"
            >
              Reset
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Countdown;
