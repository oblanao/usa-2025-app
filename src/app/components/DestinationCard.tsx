'use client';

import { Place } from '@/app/lib/types';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'react-feather';

type DestinationCardProps = {
  place: Place;
  eventCount: number;
};

const DestinationCard = ({ place, eventCount }: DestinationCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="relative rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 group aspect-[4/5] max-w-md"
    >
      <Image
        src={place.featured_image}
        alt={place.name}
        layout="fill"
        objectFit="cover"
        className="z-0 transition-transform duration-300 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
      <div className="relative z-20 p-6 flex flex-col justify-end h-full text-white">
        <div>
          <h2 className="text-4xl font-bold text-white drop-shadow-lg">
            {place.name}
          </h2>
          <p className="text-white/90 text-base mt-2 leading-relaxed line-clamp-2">
            {place.description}
          </p>
        </div>
        <div className="flex justify-between items-end mt-6 pt-4 border-t border-white/20">
          <div className="flex space-x-8">
            <div className="text-center">
              <p className="text-3xl font-bold">{place.days.length}</p>
              <p className="text-xs text-white/80 uppercase tracking-widest">
                Days
              </p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">{eventCount}</p>
              <p className="text-xs text-white/80 uppercase tracking-widest">
                Events
              </p>
            </div>
          </div>
          <Link href={`/destinations/${place.id}`} passHref>
            <span className="flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-bold rounded-full h-12 w-12 transition-colors cursor-pointer">
              <ArrowRight size={20} />
            </span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default DestinationCard;
