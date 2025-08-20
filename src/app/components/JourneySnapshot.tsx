"use client";

import { useState, useEffect, ReactNode } from "react";
import { Calendar, MapPin, Users } from "react-feather";

interface StatItemProps {
  icon: ReactNode;
  value: number;
  label: string;
}

const StatItem = ({ icon, value, label }: StatItemProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const duration = 500; // ms

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * value));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [value]);

  return (
    <div className="flex flex-col items-center text-center text-white flex-1">
      <div className="mb-2 text-white">{icon}</div>
      <p className="text-4xl font-bold drop-shadow-md mb-1 text-white">
        {count}
      </p>
      <p className="text-xs font-light uppercase tracking-widest text-white">
        {label}
      </p>
    </div>
  );
};

interface JourneySnapshotProps {
  stats: {
    days: number;
    destinations: number;
    events: number;
    travelers: number;
  };
}

export default function JourneySnapshot({ stats }: JourneySnapshotProps) {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div
        className="backdrop-blur-xl rounded-2xl border border-white/10 shadow-inner p-6 px-0"
        style={{
          backgroundColor: "rgba(20, 30, 55, 0.6)",
        }}
      >
        <div className="flex justify-around items-center divide-x divide-white/20">
          <StatItem
            icon={<MapPin size={24} />}
            value={stats.destinations}
            label="Places"
          />
          <StatItem
            icon={<Users size={24} />}
            value={stats.travelers}
            label="Travelers"
          />
          <StatItem icon={<Calendar size={24} />} value={1} label="Adventure" />
        </div>
      </div>
    </div>
  );
}
