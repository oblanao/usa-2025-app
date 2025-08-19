import { getPlaces, getEvents, getTrips, getTravelers } from "./lib/data";
import DestinationCard from "./components/DestinationCard";
import { Place, Trip, Traveler } from "./lib/types";
import Image from "next/image";
import JourneySnapshot from "./components/JourneySnapshot";
import { Calendar, MapPin, Camera, Users } from "react-feather";
import Header from "./components/Header";
import TravelerAvatars from "./components/TravelerAvatars";

export default async function Home() {
  const places = await getPlaces();
  const events = await getEvents();
  const trips = await getTrips();
  const travelers = await getTravelers();
  const trip = trips[0];

  const startDate = new Date(trip.timestamp_start);
  const endDate = new Date(trip.timestamp_end);
  const durationInDays = Math.round(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  const stats = {
    destinations: places.length,
    days: durationInDays,
    events: events.length,
    travelers: travelers.length,
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Header title={trip.name} />
      <div className="relative h-screen flex items-center justify-center text-center text-white overflow-hidden">
        <Image
          src={trip.featured_image}
          alt="Golden Gate Bridge"
          layout="fill"
          objectFit="cover"
          className="z-0"
        />
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div className="relative z-20 p-4 w-full">
          <div className="h-16" />
          <div className="h-16" />
          <h1 className="text-6xl font-extrabold drop-shadow-xl mb-2">
            {trip.name}
          </h1>
          <p className="text-2xl font-light drop-shadow-lg">{trip.tagline}</p>
          <div className="mt-8">
            <JourneySnapshot stats={stats} />
          </div>
        </div>
      </div>

      <main className="p-8 md:p-12 -mt-16">
        <TravelerAvatars travelers={travelers} />
        <section className="max-w-7xl mx-auto mt-16">
          <h2 className="text-4xl font-bold text-center mb-10">
            Our Destinations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {places.map((place: Place) => {
              const placeEvents = events.filter((event) =>
                place.days.includes(event.day_index)
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
