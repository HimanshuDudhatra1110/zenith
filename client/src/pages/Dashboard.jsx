import React from "react";
import { useAuth } from "../context/AuthContext.jsx";

const Dashboard = () => {
  const { user } = useAuth();

  const getGreeting = () => {
    const currentDate = new Date();
    const hours = currentDate.getHours();

    if (hours > 5 && hours < 12) {
      return "Good Morning ☀️";
    } else if (hours >= 12 && hours < 17) {
      return "Good Afternoon 🌤️";
    } else if (hours >= 17 && hours < 21) {
      return "Good Evening 🌆";
    } else {
      return "Good Night 🌙";
    }
  };
  return (
    <div className="container">
      <div className="flex flex-wrap items-center justify-between gap-5 pb-7.5">
        <div className="flex flex-col justify-center gap-2">
          <h1 className="text-xl font-medium leading-none text-gray-900">
            Dashboard
          </h1>
          <div className="flex items-center gap-2 text-sm font-normal text-gray-700">
            Central Hub for Personal Customization
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <button
            id="date"
            className="btn btn-sm btn-light data-[state=open]:bg-light-active"
            type="button"
            aria-haspopup="dialog"
            aria-expanded="false"
            aria-controls="radix-:r8v:"
            data-state="closed"
            fdprocessedid="h1iwy9"
          >
            <i className="ki-filled ki-calendar me-0.5" />
            Jan 20, 2025 - Feb 09, 2025
          </button>
        </div>
      </div>
      <div className="grid grid-5">
        <div className="grid lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2">
            <div className="hz-card h-full justify-center">
              <div className="p-15 flex flex-col items-center justify-center gap-4">
                <span className="text-3xl font-medium text-gray-900">
                  {getGreeting()}
                </span>
                <span className="text-2xl font-medium hz-text-cyan-600">
                  {user?.name}
                </span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="grid grid-cols-2 gap-5 h-full">
              <div className="hz-card hz-score-card-bg flex-col justify-between gap-6 h-full">
                <span className="text-2xl mt-4 ms-4">🔥</span>
                <div className="flex flex-col gap-1 pb-4 px-5">
                  <span className="text-3xl font-semibold text-gray-900">
                    {user?.diaryStreak}
                  </span>
                  <span className="text-2sm font-normal text-gray-700">
                    Days Diary Streak
                  </span>
                </div>
              </div>
              <div className="hz-card hz-score-card-bg flex-col justify-between gap-6 h-full">
                <span className="text-2xl mt-4 ms-5">🪙</span>
                <div className="flex flex-col gap-1 pb-4 px-5">
                  <span className="text-3xl font-semibold text-gray-900">
                    {user?.habitScore}
                  </span>
                  <span className="text-2sm font-normal text-gray-700">
                    Habit Score
                  </span>
                </div>
              </div>
              <div className="hz-card hz-score-card-bg flex-col justify-between gap-6 h-full">
                <span className="text-2xl mt-4 ms-5">🔥</span>
                <div className="flex flex-col gap-1 pb-4 px-5">
                  <span className="text-3xl font-semibold text-gray-900">
                    {user?.diaryStreak}
                  </span>
                  <span className="text-2sm font-normal text-gray-700">
                    Days Diary Streak
                  </span>
                </div>
              </div>
              <div className="hz-card hz-score-card-bg flex-col justify-between gap-6 h-full">
                <span className="text-2xl mt-4 ms-5">🔥</span>
                <div className="flex flex-col gap-1 pb-4 px-5">
                  <span className="text-3xl font-semibold text-gray-900">
                    {user?.diaryStreak}
                  </span>
                  <span className="text-2sm font-normal text-gray-700">
                    Days Diary Streak
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
