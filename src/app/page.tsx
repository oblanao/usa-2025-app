import { getPlaces, getEvents, getTrips, getTravelers } from './lib/data';
import DestinationCard from './components/DestinationCard';
import { Place, Trip, Traveler } from './lib/types';
import Image from 'next/image';
import {
  Calendar,
  MapPin,
  Camera,
  Users,
} from 'react-feather';

export default async function Home() {
  const places = await getPlaces();
  const events = await getEvents();
  const trips = await getTrips();
  const travelers = await getTravelers();
  const trip = trips[0];

  const startDate = new Date(trip.timestamp_start);
  const endDate = new Date(trip.timestamp_end);
  const durationInDays =
    Math.round(
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
    ) + 1;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <header className="relative h-[60vh] min-h-[500px] flex items-end justify-center text-center text-white overflow-hidden">
        <Image
          src={trip.featured_image}
          alt="Golden Gate Bridge"
          layout="fill"
          objectFit="cover"
          className="z-0"
        />
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div className="relative z-20 p-4 pb-32">
          <h1 className="text-6xl font-extrabold drop-shadow-xl mb-2">
            {trip.name}
          </h1>
          <p className="text-2xl font-light drop-shadow-lg">{trip.tagline}</p>
        </div>
      </header>

      <main className="p-8 md:p-12">
        <section className="max-w-6xl mx-auto -mt-32 relative z-30">
          <div className="bg-white rounded-2xl shadow-2xl p-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatCard
              icon={<Calendar size={28} className="text-accent" />}
              value={durationInDays.toString()}
              label="Days"
            />
            <StatCard
              icon={<MapPin size={28} className="text-accent" />}
              value={places.length.toString()}
              label="Destinations"
            />
            <StatCard
              icon={<Camera size={28} className="text-accent" />}
              value={events.length.toString()}
              label="Planned Events"
            />
            <StatCard
              icon={<Users size={28} className="text-accent" />}
              value={travelers.length.toString()}
              label="Travelers"
            />
          </div>
          <div className="flex justify-center items-center space-x-4 mt-8">
            {travelers.map(traveler => (
              <div
                key={traveler.id}
                className="flex flex-col items-center space-y-2"
              >
                <Image
                  src={`/images/${traveler.id}-avatar.jpg`}
                  alt={traveler.name}
                  width={80}
                  height={80}
                  className="rounded-full border-4 border-white shadow-lg"
                />
                <span className="font-bold text-lg">{traveler.display_name}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-7xl mx-auto mt-16">
          <h2 className="text-4xl font-bold text-center mb-10">
            Our Destinations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {places.map((place: Place) => {
              const placeEvents = events.filter(event =>
                place.days.includes(event.day_index),
              );
              return (
                <DestinationCard
                  key={place.id}
                  place={place}
                  eventCount={placeEvents.length}
                />
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}

const StatCard = ({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) => (
  <div className="flex flex-col items-center text-center">
    <div className="mb-3">{icon}</div>
    <p className="text-4xl font-extrabold text-gray-800">{value}</p>
    <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
      {label}
    </p>
  </div>
);
