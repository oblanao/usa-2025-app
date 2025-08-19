'use client';

import { Place } from '@/app/lib/types';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Calendar, ArrowRight } from 'react-feather';

type DestinationCardProps = {
  place: Place;
  eventCount: number;
};

const DestinationCard = ({ place, eventCount }: DestinationCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
    >
      <div className="relative h-52 w-full">
        <Image
          src={place.featured_image}
          alt={place.name}
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4">
          <h2 className="text-3xl font-extrabold text-white drop-shadow-lg">
            {place.name}
          </h2>
        </div>
      </div>
      <div className="p-5">
        <p className="text-gray-600 text-base line-clamp-3">
          {place.description}
        </p>
        <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
          <div className="flex space-x-4">
            <div className="flex items-center space-x-1.5 text-gray-500">
              <Calendar size={18} />
              <span className="font-semibold">{`${place.days.length} Days`}</span>
            </div>
            <div className="flex items-center space-x-1.5 text-gray-500">
              <MapPin size={18} />
              <span className="font-semibold">{`${eventCount} Events`}</span>
            </div>
          </div>
          <Link href={`/destinations/${place.id}`}>
            <span className="flex items-center text-accent font-bold hover:underline">
              View Destination
              <ArrowRight size={18} className="ml-1" />
            </span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default DestinationCard;
