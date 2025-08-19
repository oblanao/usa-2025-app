"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Traveler } from "../lib/types";

interface TravelerAvatarsProps {
  travelers: Traveler[];
}

export default function TravelerAvatars({ travelers }: TravelerAvatarsProps) {
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center z-[100]">
      <div className="h-16" />
      <div className="h-8" />
      <div className="flex -space-x-4">
        {travelers.map((traveler, index) => (
          <div
            key={traveler.id}
            className={`transition-all duration-700 ease-out ${
              isAnimated
                ? "opacity-100 translate-x-0"
                : `opacity-0 ${
                    index === 0 ? "-translate-x-4" : "translate-x-4"
                  }`
            }`}
            style={{ transitionDelay: `${index * 150}ms` }}
          >
            <Image
              src={`/images/${traveler.id}-avatar.jpg`}
              alt={traveler.name}
              width={128}
              height={128}
              className="rounded-full border-2 border-white/50 shadow-md"
            />
          </div>
        ))}
      </div>
      <p
        className={`mt-4 text-sm font-light uppercase tracking-widest text-white/80 transition-opacity duration-1000 ease-out ${
          isAnimated ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDelay: "500ms" }}
      >
        The Adventurers
      </p>
    </div>
  );
}
