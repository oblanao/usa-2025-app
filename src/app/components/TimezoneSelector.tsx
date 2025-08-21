"use client";

import { useState, useEffect } from "react";
import { Clock, Globe, Home as HomeIcon } from "react-feather";

interface Location {
  id: string;
  name: string;
  timezone: string;
  flag?: string;
}

const TimezoneSelector = () => {
  const [selectedLocation, setSelectedLocation] = useState<string>("bucharest");
  const [currentTime, setCurrentTime] = useState<string>("");
  const [currentDate, setCurrentDate] = useState<string>("");

  const locations: Location[] = [
    {
      id: "bucharest",
      name: "Bucharest (Home)",
      timezone: "Europe/Bucharest",
      flag: "🇷🇴",
    },
    {
      id: "san-francisco",
      name: "San Francisco",
      timezone: "America/Los_Angeles",
      flag: "🇺🇸",
    },
    {
      id: "honolulu",
      name: "Honolulu",
      timezone: "Pacific/Honolulu",
      flag: "🇺🇸",
    },
    {
      id: "los-angeles",
      name: "Los Angeles",
      timezone: "America/Los_Angeles",
      flag: "🇺🇸",
    },
  ];

  const updateTime = () => {
    const location = locations.find((loc) => loc.id === selectedLocation);
    if (!location) return;

    const now = new Date();

    // Format time
    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: location.timezone,
    };

    // Format date
    const dateOptions: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: location.timezone,
    };

    setCurrentTime(now.toLocaleTimeString("en-US", timeOptions));
    setCurrentDate(now.toLocaleDateString("en-US", dateOptions));
  };

  useEffect(() => {
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [selectedLocation]);

  const selectedLocationData = locations.find(
    (loc) => loc.id === selectedLocation
  );

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-accent/10 p-3 rounded-full">
          <Globe className="w-6 h-6 text-accent" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-800">World Clock</h3>
          <p className="text-sm text-gray-500">
            Check time across your destinations
          </p>
        </div>
      </div>

      {/* Location Selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Select Location
        </label>
        <div className="grid grid-cols-2 gap-2">
          {locations.map((location) => (
            <button
              key={location.id}
              onClick={() => setSelectedLocation(location.id)}
              className={`p-3 rounded-xl border-2 transition-all duration-200 text-left ${
                selectedLocation === location.id
                  ? "border-accent bg-accent/5 text-accent"
                  : "border-gray-200 hover:border-gray-300 text-gray-700"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">{location.flag}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">
                    {location.id === "bucharest" && (
                      <HomeIcon className="w-3 h-3 inline mr-1" />
                    )}
                    {location.name}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Current Time Display */}
      {selectedLocationData && (
        <div className="bg-gradient-accent rounded-xl p-6 text-white">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="w-6 h-6" />
            <div>
              <h4 className="font-semibold text-lg">
                {selectedLocationData.flag} {selectedLocationData.name}
              </h4>
              <p className="text-white/80 text-sm">
                {selectedLocationData.timezone.replace(/_/g, " ")}
              </p>
            </div>
          </div>

          <div className="text-center">
            <div className="text-4xl font-bold mb-2 font-mono tracking-wider">
              {currentTime}
            </div>
            <div className="text-white/90 text-sm">{currentDate}</div>
          </div>
        </div>
      )}

      {/* Time Zone Info */}
      <div className="mt-4 text-xs text-gray-500 text-center">
        Times are updated in real-time and account for daylight saving time
      </div>
    </div>
  );
};

export default TimezoneSelector;
