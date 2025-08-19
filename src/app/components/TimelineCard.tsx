'use client';

import {
  Send as Plane,
  Home as Bed,
  Camera,
  Coffee,
  MapPin,
  ShoppingCart,
  Truck,
} from 'react-feather';
import { Event } from '@/app/lib/types';
import { motion } from 'framer-motion';
import Link from 'next/link';

const categoryIcons = {
  flight: Plane,
  accommodation: Bed,
  attraction: Camera,
  restaurant: Coffee,
  tour: MapPin,
  transfer: Truck,
  store: ShoppingCart,
};

const TimelineCard = ({ event }: { event: Event }) => {
  const Icon = categoryIcons[event.referenced_item_type] || MapPin;
  const time = new Date(
    `${event.timestamp_start_local_time.substring(0, 19)}Z`,
  ).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'UTC',
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-start space-x-4"
    >
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
          <Icon className="text-accent" size={20} />
        </div>
        <div className="text-sm font-semibold text-gray-700 mt-1">{time}</div>
      </div>
      <Link href={`/events/${event.id}`} className="flex-1">
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-base font-bold text-text">{event.title}</h2>
        </div>
      </Link>
    </motion.div>
  );
};

export default TimelineCard;
