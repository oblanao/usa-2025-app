"use client";

import { motion } from "framer-motion";
import { Truck, Clock, DollarSign } from "react-feather";
import { TransferData } from "@/app/lib/trip-types";

type TransferCardProps = {
  transfer: TransferData;
  onClick?: () => void;
};

const TransferCard = ({ transfer, onClick }: TransferCardProps) => {
  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "uber":
        return "bg-black text-white";
      case "taxi":
        return "bg-yellow-500 text-black";
      case "shuttle":
        return "bg-blue-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 p-5 ${
        onClick ? "cursor-pointer" : ""
      }`}
      onClick={onClick}
    >
      {/* Header with service info */}
      <div className="flex items-center gap-3 mb-5">
        <div className="bg-gradient-accent rounded-full p-2.5">
          <Truck className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-800 text-base leading-tight">
            {transfer.name}
          </h3>
        </div>
        <span
          className={`text-xs px-3 py-1.5 rounded-full font-semibold uppercase ${getTypeColor(
            transfer.type
          )}`}
        >
          {transfer.type}
        </span>
      </div>

      {/* Journey Details - Clean Layout */}
      <div className="space-y-5 mb-5">
        {/* From Location */}
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-1">
            <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-blue-400 uppercase tracking-wide mb-1">
              FROM
            </p>
            <p className="text-sm font-semibold text-gray-800 leading-tight break-words">
              {transfer.origin}
            </p>
          </div>
        </div>

        {/* To Location */}
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-1">
            <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-blue-600 uppercase tracking-wide mb-1">
              TO
            </p>
            <p className="text-sm font-semibold text-gray-800 leading-tight break-words">
              {transfer.destination}
            </p>
          </div>
        </div>
      </div>

      {/* Footer with cost and duration */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-accent" />
          <span className="text-lg font-bold text-accent">
            {transfer.cost?.replace("$", "")}
          </span>
        </div>
        <div className="flex items-center gap-1 text-gray-500">
          <Clock className="w-4 h-4" />
          <span className="text-sm font-medium">{transfer.duration}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default TransferCard;
