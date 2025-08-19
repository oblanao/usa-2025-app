'use client';

import { Day } from '@/app/lib/types';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, ChevronRight } from 'react-feather';

type DayCardProps = {
  day: Day;
  placeId: string;
};

const DayCard = ({ day, placeId }: DayCardProps) => {
  const formattedDate = new Date(day.date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
  });

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
    >
      <Link
        href={`/destinations/${placeId}/day/${day.day_index}`}
        className="flex items-center p-4"
      >
        <div className="flex flex-col items-center justify-center mr-4">
          <span className="text-accent font-extrabold text-3xl">
            {new Date(day.date).getDate()}
          </span>
          <span className="text-gray-500 text-sm uppercase">
            {new Date(day.date).toLocaleString('en-US', { month: 'short' })}
          </span>
        </div>
        <div className="flex-1">
          <p className="font-bold text-lg text-text">{day.brief_title}</p>
          <p className="text-gray-600 text-sm mt-1">{day.description}</p>
        </div>
        <ChevronRight className="w-6 h-6 text-gray-400 ml-4" />
      </Link>
    </motion.div>
  );
};

export default DayCard;
