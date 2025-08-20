import { getPlaces, getEvents, getTrips, getTravelers } from "./lib/data";
import DestinationCard from "./components/DestinationCard";
import { Place } from "./lib/types";
import Image from "next/image";
import JourneySnapshot from "./components/JourneySnapshot";
import Header from "./components/Header";
import TravelerAvatars from "./components/TravelerAvatars";
import { calculateNightsForPlace } from "./lib/utils";

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
    <div className="min-h-screen bg-background text-gray-800">
      <Header title={trip.name} />
      <div className="relative h-[calc(100vh-100px)] flex items-center justify-center text-center text-white overflow-hidden">
        <Image
          src={trip.featured_image}
          alt="Golden Gate Bridge"
          layout="fill"
          objectFit="cover"
          className="z-0"
        />
        <div className="relative z-20 p-4 w-full">
          <h1
            className="text-6xl font-extrabold drop-shadow-xl mb-2"
            style={{ textShadow: "10px 2px 4px rgba(0, 0, 0, 0.6)" }}
          >
            {trip.name}
          </h1>
          <p
            className="text-2xl font-light drop-shadow-lg"
            style={{ textShadow: "5px 2px 4px rgba(0, 0, 0, 0.6)" }}
          >
            {trip.tagline}
          </p>
          <div className="mt-8">
            <JourneySnapshot stats={stats} />
          </div>
        </div>
      </div>

      <main className="p-8 pt-12 md:p-12 bg-gray-100">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">
            Let&apos;s go!
          </h2>
        </div>
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
              const nights = calculateNightsForPlace(place.id);
              return (
                <DestinationCard
                  key={place.id}
                  place={place}
                  eventCount={placeEvents.length}
                  nightCount={nights}
                />
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
