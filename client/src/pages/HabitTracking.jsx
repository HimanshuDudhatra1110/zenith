import React, { useEffect, useState } from "react";
import api from "../constants/api";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const HabitTracking = () => {
  const [possitiveHabits, setPossitiveHabits] = useState([]);
  const [negativeHabits, setNegativeHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getHabits = async () => {
      try {
        const response = await api.get("/v1/habit");
        setPossitiveHabits(response.data.positiveHabits);
        setNegativeHabits(response.data.negativeHabits);
        setLoading(false);
      } catch (error) {
        setLoading(false);

        // Check if this is the "No habits found" case
        if (
          error.response &&
          error.response.status === 404 &&
          error.response.data.message === "No habits found"
        ) {
          // Handle empty state gracefully
          setPossitiveHabits([]);
          setNegativeHabits([]);
          // Optionally set a user-friendly message
          // setInfo("You haven't created any habits yet");
        } else {
          // Handle actual errors
          setError("Failed to fetch habits");
          console.error("error fetching habits", error);
        }
      }
    };
    // getHabits();
  }, []);
  return (
    <div className="container mx-auto">
      <div className="flex flex-wrap items-center lg:items-end justify-between gap-5 pb-7">
        <div className="flex flex-col justify-center gap-2">
          <h1 className="text-2xl font-medium leading-none text-gray-900">
            Habit Tracking
          </h1>
          <div className="flex items-center gap-2 text-sm font-normal text-gray-700">
            Stay consistent, track your daily routines, and master your habits.
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <button className="hz-bg-cyan-500 text-white cursor-pointer p-2 px-4 rounded-lg">
            Coins
          </button>
        </div>
      </div>
      {error ? (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded">
          {error}
        </div>
      ) : loading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 xl:gap-7">
          <div className="hz-card p-5 lg:p-7">
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton
                key={`positive-${index}`}
                height={50}
                width="100%"
                className="mb-4"
              />
            ))}
          </div>
          <div className="hz-card p-5 lg:p-7">
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton
                key={`negative-${index}`}
                height={50}
                width="100%"
                className="mb-4"
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 xl:gap-7"></div>
      )}
    </div>
  );
};

export default HabitTracking;
