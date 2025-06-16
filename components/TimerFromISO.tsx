"use client";
import React from "react";
import { useTimer } from "react-timer-hook";

const TimerFromISO = ({ expiryTimestamp }: { expiryTimestamp: string }) => {
  const parsedTimestamp = new Date(expiryTimestamp);

  const { seconds, minutes, hours } = useTimer({
    expiryTimestamp: parsedTimestamp,
  });

  const renderTimeUnit = (time: number) => {
    return (
      <div className="bg-red-600 text-white font-semibold w-8 h-8 rounded-lg flex items-center justify-center ">
        <p className="text-sm">{String(time).padStart(2, "0")}</p>
      </div>
    );
  };

  return (
    <div className="flex gap-1">
      {renderTimeUnit(hours)}
      <p className="text-red-600 font-semibold">:</p>
      {renderTimeUnit(minutes)}
      <p className="text-red-600 font-semibold">:</p>
      {renderTimeUnit(seconds)}
    </div>
  );
};

export default TimerFromISO;
