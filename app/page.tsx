"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Home() {
  const raceDate = new Date("2026-05-31");
  const totalMilesGoal = 120;

  const [goalTime, setGoalTime] = useState<number>(105); // minutes
  const [milesLogged, setMilesLogged] = useState<number>(0);
  const [newMiles, setNewMiles] = useState<string>("");
  const [newPace, setNewPace] = useState<string>("");
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("halfMarathonPro");
    if (saved) {
      const parsed = JSON.parse(saved);
      setMilesLogged(parsed.milesLogged);
      setHistory(parsed.history);
      setGoalTime(parsed.goalTime);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "halfMarathonPro",
      JSON.stringify({ milesLogged, history, goalTime })
    );
  }, [milesLogged, history, goalTime]);

  const addRun = () => {
    const miles = parseFloat(newMiles);
    const pace = parseFloat(newPace);

    if (!isNaN(miles) && miles > 0) {
      setMilesLogged((prev) => prev + miles);
      setHistory((prev) => [
        ...prev,
        { run: prev.length + 1, miles, pace },
      ]);
      setNewMiles("");
      setNewPace("");
    }
  };

  const daysToRace = Math.max(
    0,
    Math.ceil((raceDate.getTime() - new Date().getTime()) / 86400000)
  );

  const averagePace =
    history.length > 0
      ? (
          history.reduce((acc, run) => acc + (run.pace || 0), 0) /
          history.length
        ).toFixed(2)
      : "0";

  const predictedFinish =
    averagePace !== "0"
      ? (parseFloat(averagePace) * 13.1).toFixed(1)
      : "0";

  const goalPace = (goalTime / 13.1).toFixed(2);

  const progressPercent = Math.min(
    (milesLogged / totalMilesGoal) * 100,
    100
  );

  const coachingInsight = () => {
    if (averagePace === "0")
      return "Log runs to unlock AI coaching insights.";
    if (parseFloat(averagePace) < parseFloat(goalPace))
      return "🔥 You're ahead of goal pace. Keep pushing.";
    return "Focus on tempo consistency to close the gap.";
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-6"
      >
        Elite Half Marathon Dashboard
      </motion.h1>

      {/* Countdown */}
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-xl mb-6">
        <h2 className="text-xl font-semibold mb-2">Race Countdown</h2>
        <p>{daysToRace} days remaining</p>
      </div>

      {/* Goal Adjustment */}
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-xl mb-6">
        <h2 className="text-xl font-semibold mb-2">Goal Time (minutes)</h2>
        <input
          type="number"
          value={goalTime}
          onChange={(e) => setGoalTime(parseFloat(e.target.value))}
          className="border p-2 rounded w-full"
        />
        <p className="text-sm mt-2">Goal Pace: {goalPace} min/mile</p>
      </div>

      {/* Log Run */}
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-xl mb-6">
        <h2 className="text-xl font-semibold mb-4">Log Run</h2>
        <div className="flex gap-2 mb-4">
          <input
            type="number"
            placeholder="Miles"
            value={newMiles}
            onChange={(e) => setNewMiles(e.target.value)}
            className="border p-2 rounded w-1/2"
          />
          <input
            type="number"
            placeholder="Avg Pace (min/mile)"
            value={newPace}
            onChange={(e) => setNewPace(e.target.value)}
            className="border p-2 rounded w-1/2"
          />
        </div>
        <button
          onClick={addRun}
          className="bg-black text-white px-4 py-2 rounded-xl"
        >
          Add Run
        </button>
      </div>

      {/* Performance */}
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-xl mb-6">
        <h2 className="text-xl font-semibold mb-2">Performance Metrics</h2>
        <p>Total Miles: {milesLogged}</p>
        <p>Average Pace: {averagePace} min/mile</p>
        <p>Predicted Finish: {predictedFinish} minutes</p>
        <p className="mt-3 text-sm">{coachingInsight()}</p>
        <div className="w-full bg-gray-200 rounded-full h-3 mt-4">
          <div
            className="bg-green-500 h-3 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-xl">
        <h2 className="text-xl font-semibold mb-4">Mileage Trend</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={history}>
            <XAxis dataKey="run" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="miles" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}