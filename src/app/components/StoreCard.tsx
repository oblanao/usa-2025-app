"use client";

import { motion } from "framer-motion";
import { ShoppingCart, MapPin, Clock, ExternalLink } from "react-feather";
import { Store } from "@/app/lib/types";

type StoreCardProps = {
  store: Store;
  onClick?: () => void;
};

const StoreCard = ({ store, onClick }: StoreCardProps) => {
  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "vices":
        return "bg-green-100 text-green-700";
      case "grocery":
        return "bg-blue-100 text-blue-700";
      case "shopping":
        return "bg-purple-100 text-purple-700";
      case "specialty":
        return "bg-orange-100 text-orange-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
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
        <div className="flex items-center gap-2 flex-1">
          <div className="bg-gradient-accent rounded-full p-2">
            <ShoppingCart className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-800 line-clamp-2 leading-tight">
              {store.name}
            </h3>
          </div>
        </div>
        <span
          className={`text-xs px-2 py-1 rounded-full font-medium capitalize ${getTypeColor(
            store.type
          )}`}
        >
          {store.type}
        </span>
      </div>

      {store.address && (
        <div className="flex items-start gap-1 mb-3 text-gray-600">
          <MapPin className="w-3 h-3 flex-shrink-0 mt-0.5" />
          <span className="text-sm break-words">{store.address}</span>
        </div>
      )}

      <p className="text-sm text-gray-600 mb-4 line-clamp-3 leading-relaxed">
        {store.brief_description}
      </p>

      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="flex items-center gap-3">
          {store.hours_of_operation && (
            <div className="flex items-center gap-1 text-gray-500">
              <Clock className="w-3 h-3" />
              <span className="text-xs">{store.hours_of_operation}</span>
            </div>
          )}
        </div>
        {store.website_link && (
          <div className="flex items-center gap-1 text-accent">
            <ExternalLink className="w-3 h-3" />
            <span className="text-xs font-medium">Visit Store</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default StoreCard;
