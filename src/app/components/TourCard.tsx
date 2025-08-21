"use client";

import { motion } from "framer-motion";
import { Clock, DollarSign, MapPin } from "react-feather";
import Image from "next/image";
import { Tour } from "@/app/lib/types";

type TourCardProps = {
  tour: Tour;
  onClick?: () => void;
};

const TourCard = ({ tour, onClick }: TourCardProps) => {
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
          src={tour.featured_image}
          alt={tour.name}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-2 left-2 right-2">
          <h3 className="font-bold text-white text-sm line-clamp-2 drop-shadow-lg">
            {tour.name}
          </h3>
        </div>
        <div className="absolute top-2 right-2">
          <span className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full font-medium">
            Tour
          </span>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="bg-gradient-accent rounded-full p-2">
            <MapPin className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-accent capitalize">
            {tour.place.replace("-", " ")}
          </span>
        </div>

        <p className="text-sm text-gray-600 mb-3 line-clamp-3 leading-relaxed">
          {tour.description}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-accent" />
            <span className="text-lg font-bold text-accent">
              {tour.cost?.replace("$", "")}
            </span>
          </div>
          <div className="flex items-center gap-1 text-gray-500">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-medium">{tour.duration}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TourCard;
