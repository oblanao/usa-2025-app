"use client";

import { motion } from "framer-motion";
import { Home, MapPin, Calendar } from "react-feather";
import { AccommodationData } from "@/app/lib/trip-types";

type AccommodationCardProps = {
  accommodation: AccommodationData;
  onClick?: () => void;
};

const AccommodationCard = ({
  accommodation,
  onClick,
}: AccommodationCardProps) => {
  // We'll pass the place name as a prop or get it from context
  // For now, let's create a mapping based on place ID
  const getPlaceName = (placeId: string) => {
    const placeNames: { [key: string]: string } = {
      "san-francisco": "San Francisco",
      honolulu: "Honolulu",
      "los-angeles": "Los Angeles",
    };
    return placeNames[placeId] || placeId;
  };
  const checkinDate = new Date(accommodation.timestamp_checkin_local_time);
  const checkoutDate = new Date(accommodation.timestamp_checkout_local_time);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const calculateNights = () => {
    const timeDiff = checkoutDate.getTime() - checkinDate.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
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
      <div className="flex items-start mb-3">
        <div className="flex items-center gap-2">
          <div className="bg-gradient-accent rounded-full p-2">
            <Home className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-800 line-clamp-2 leading-tight">
              Airbnb in {getPlaceName(accommodation.place)}
            </h3>
          </div>
        </div>
      </div>

      <div className="flex items-start gap-1 mb-3 text-gray-600">
        <MapPin className="w-3 h-3 flex-shrink-0 mt-0.5" />
        <span className="text-sm break-words">{accommodation.address}</span>
      </div>

      <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed font-semibold">
        {accommodation.title}
      </p>

      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-gray-500">
            <Calendar className="w-3 h-3" />
            <span className="text-xs">
              {formatDate(checkinDate)} - {formatDate(checkoutDate)}
            </span>
          </div>
        </div>

        <div className="text-center">
          <p className="font-bold text-lg text-accent">{calculateNights()}</p>
          <p className="text-xs text-gray-500 uppercase">Nights</p>
        </div>
      </div>
    </motion.div>
  );
};

export default AccommodationCard;
