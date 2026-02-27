"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [miles, setMiles] = useState(0);
  const [pace, setPace] = useState("9:00");
  const [inputMiles, setInputMiles] = useState("");

  const raceGoal = 13.1;
  const progress = (miles / raceGoal) * 100;

  useEffect(() => {
    const savedMiles = localStorage.getItem("miles");
    if (savedMiles) setMiles(parseFloat(savedMiles));
  }, []);

  useEffect(() => {
    localStorage.setItem("miles", miles.toString());
  }, [miles]);

  const addRun = () => {
    if (!inputMiles) return;
    setMiles(miles + parseFloat(inputMiles));
    setInputMiles("");
  };

  return (
    <main className="min-h-screen px-6 py-10 bg-black">
      <div className="max-w-xl mx-auto space-y-10">

        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-wide">
            HALF MARATHON
          </h1>
          <p className="text-gray-400 text-sm">
            Train like an athlete.
          </p>
        </div>

        {/* Big Pace Display */}
        <div className="text-center">
          <p className="text-gray-400 text-sm">Current Average Pace</p>
          <h2 className="text-6xl font-extrabold mt-2">{pace}</h2>
          <p className="text-gray-400">min / mile</p>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <p className="text-sm text-gray-400">
            Progress to 13.1 miles
          </p>
          <div className="w-full bg-gray-800 h-4 rounded-full">
            <div
              className="bg-green-500 h-4 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-right text-sm text-gray-400">
            {miles.toFixed(1)} / {raceGoal} miles
          </p>
        </div>

        {/* Add Run */}
        <div className="space-y-4">
          <input
            type="number"
            placeholder="Miles ran today"
            value={inputMiles}
            onChange={(e) => setInputMiles(e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500"
          />

          <button
            onClick={addRun}
            className="w-full bg-green-500 text-black font-bold py-3 rounded-xl hover:bg-green-400 transition"
          >
            LOG RUN
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-900 p-4 rounded-xl">
            <p className="text-gray-400 text-sm">Total Miles</p>
            <p className="text-2xl font-bold mt-1">
              {miles.toFixed(1)}
            </p>
          </div>

          <div className="bg-gray-900 p-4 rounded-xl">
            <p className="text-gray-400 text-sm">Goal Distance</p>
            <p className="text-2xl font-bold mt-1">
              13.1
            </p>
          </div>
        </div>

      </div>
    </main>
  );
}