"use client";

import { motion } from "framer-motion";
import { Clock, DollarSign, Star, ArrowRight } from "react-feather";
import Image from "next/image";
import Link from "next/link";
import { Attraction } from "@/app/lib/types";

type AttractionCardProps = {
  attraction: Attraction;
  onClick?: () => void;
};

const AttractionCard = ({ attraction, onClick }: AttractionCardProps) => {
  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "urban":
        return "bg-blue-100 text-blue-700";
      case "beach":
        return "bg-yellow-100 text-yellow-700";
      case "walk":
        return "bg-green-100 text-green-700";
      case "sightseeing":
        return "bg-purple-100 text-purple-700";
      case "other":
        return "bg-orange-100 text-orange-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const isFree = attraction.cost === "$0";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group ${
        onClick ? "cursor-pointer" : ""
      }`}
      onClick={onClick}
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={attraction.featured_image}
          alt={attraction.name}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-2 left-2 right-2">
          <h3 className="font-bold text-white text-sm line-clamp-2 drop-shadow-lg">
            {attraction.name}
          </h3>
        </div>
        <div className="absolute top-2 right-2">
          <span
            className={`text-xs px-2 py-1 rounded-full font-medium ${getTypeColor(
              attraction.type
            )}`}
          >
            {attraction.type}
          </span>
        </div>
      </div>

      <div className="p-4">
        <p className="text-sm text-gray-600 mb-3 line-clamp-4 leading-relaxed">
          {attraction.description}
        </p>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-gray-500">
              <Clock className="w-3 h-3" />
              <span className="text-xs">{attraction.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              {isFree ? (
                <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded font-medium">
                  FREE
                </span>
              ) : (
                <>
                  <DollarSign className="w-3 h-3 text-gray-500" />
                  <span className="text-xs text-gray-500">
                    {attraction.cost?.replace("$", "")}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {attraction.top_highlights.length > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <div className="flex items-center gap-1 mb-2">
              <Star className="w-3 h-3 text-yellow-500" />
              <span className="text-xs font-medium text-gray-700">
                Top Highlights
              </span>
            </div>
            <ul className="text-xs text-gray-600 space-y-1">
              {attraction.top_highlights.slice(0, 2).map((highlight, index) => (
                <li key={index} className="line-clamp-1">
                  • {highlight}
                </li>
              ))}
              {attraction.top_highlights.length > 2 && (
                <li className="text-accent font-medium">
                  +{attraction.top_highlights.length - 2} more
                </li>
              )}
            </ul>
          </div>
        )}

        {/* View Details Button */}
        <div className="mt-4 pt-3 border-t border-gray-100">
          <Link
            href={`/attractions/${
              attraction.id || attraction.name.toLowerCase().replace(/ /g, "-")
            }`}
            className="group"
          >
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
      </div>
    </motion.div>
  );
};

export default AttractionCard;
