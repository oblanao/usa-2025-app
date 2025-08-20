"use client";

import { motion } from "framer-motion";
import { Send, Clock, ArrowRight } from "react-feather";
import { FlightData } from "@/app/lib/trip-types";

type FlightCardProps = {
  flight: FlightData;
  onClick?: () => void;
};

const FlightCard = ({ flight, onClick }: FlightCardProps) => {
  const departDate = new Date(flight.timestamp_depart_local_time);
  const arriveDate = new Date(flight.timestamp_arrive_local_time);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 p-4 ${
        onClick ? "cursor-pointer" : ""
      }`}
      onClick={onClick}
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="bg-gradient-accent rounded-full p-2">
          <Send className="w-4 h-4 text-white" />
        </div>
        <span className="font-semibold text-accent">{flight.airline}</span>
      </div>

      <div className="flex items-center justify-between mb-3">
        <div className="text-center">
          <p className="font-bold text-lg text-gray-800">
            {flight.origin.split("(")[1]?.replace(")", "") || flight.origin}
          </p>
          <p className="text-sm text-gray-600">{formatTime(departDate)}</p>
          <p className="text-xs text-gray-500">{formatDate(departDate)}</p>
        </div>

        <div className="flex flex-col items-center flex-1 mx-4">
          <div className="flex items-center gap-1 text-gray-400 mb-1">
            <Clock className="w-3 h-3" />
            <span className="text-xs">{flight.duration}</span>
          </div>
          <div className="w-full h-px bg-gray-300 relative">
            <ArrowRight className="w-4 h-4 text-gray-400 absolute -top-2 left-1/2 transform -translate-x-1/2 bg-white" />
          </div>
          {flight.stopovers.length > 0 && (
            <p className="text-xs text-gray-500 mt-1">
              {flight.stopovers.length} stop
              {flight.stopovers.length > 1 ? "s" : ""}
            </p>
          )}
        </div>

        <div className="text-center">
          <p className="font-bold text-lg text-gray-800">
            {flight.destination.split("(")[1]?.replace(")", "") ||
              flight.destination}
          </p>
          <p className="text-sm text-gray-600">{formatTime(arriveDate)}</p>
          <p className="text-xs text-gray-500">{formatDate(arriveDate)}</p>
        </div>
      </div>

      <div className="flex justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
        <span>{flight.aircraft_type.split("/")[0]}</span>
        <div className="flex gap-2">
          {flight.seat_included && (
            <span className="bg-green-100 text-green-700 px-2 py-1 rounded">
              Seat ✓
            </span>
          )}
          {flight.meal_included && (
            <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">
              Meal ✓
            </span>
          )}
          <span
            className={`px-2 py-1 rounded ${
              flight.luggage_policy
                .toLowerCase()
                .includes("checked bag included")
                ? "bg-green-100 text-green-700"
                : "bg-orange-100 text-orange-700"
            }`}
          >
            {flight.luggage_policy
              .toLowerCase()
              .includes("checked bag included")
              ? "Baggage ✓"
              : "Baggage ✗"}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default FlightCard;
