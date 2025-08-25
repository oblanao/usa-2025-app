"use client";

import { motion } from "framer-motion";
import { Home, MapPin, Calendar, ArrowRight } from "react-feather";
import { AccommodationData } from "@/app/lib/trip-types";
import Link from "next/link";

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

  // Parse the timezone-aware timestamps properly
  const parseLocalDateTime = (timestamp: string) => {
    // Extract the date part (YYYY-MM-DD) from the timestamp
    // This preserves the local date without timezone conversion
    const dateMatch = timestamp.match(/^(\d{4}-\d{2}-\d{2})/);
    if (dateMatch) {
      return new Date(dateMatch[1] + "T00:00:00");
    }
    // Fallback to original parsing if regex fails
    return new Date(timestamp);
  };

  const checkinDate = parseLocalDateTime(
    accommodation.timestamp_checkin_local_time
  );
  const checkoutDate = parseLocalDateTime(
    accommodation.timestamp_checkout_local_time
  );

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

      {/* View Details Button */}
      <div className="mt-4 pt-3 border-t border-gray-100">
        <Link href={`/accommodations/${accommodation.id}`} className="group">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-between p-3 bg-gradient-to-r from-accent/5 to-accent/10 hover:from-accent/10 hover:to-accent/20 rounded-lg border border-accent/20 hover:border-accent/30 transition-all duration-200"
          >
            <span className="text-sm font-semibold text-accent group-hover:text-accent/80 transition-colors">
              View Details
            </span>
            <ArrowRight className="w-4 h-4 text-accent group-hover:text-accent/80 group-hover:translate-x-1 transition-all duration-200" />
          </motion.div>
        </Link>
      </div>
    </motion.div>
  );
};

export default AccommodationCard;
