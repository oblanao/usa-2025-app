import {
  getTrips,
  getFlightDetails,
  getAccommodationDetails,
  getAttractions,
  getPlaces,
} from "../lib/data";
import FlightCard from "../components/FlightCard";
import AccommodationCard from "../components/AccommodationCard";
import AttractionCard from "../components/AttractionCard";
import { Send, Home, MapPin, Calendar } from "react-feather";
import Image from "next/image";

export default async function TripPage() {
  const [trips, flights, accommodations, attractions, places] =
    await Promise.all([
      getTrips(),
      getFlightDetails(),
      getAccommodationDetails(),
      getAttractions(),
      getPlaces(),
    ]);

  const trip = trips[0];
  const startDate = new Date(trip.timestamp_start);
  const endDate = new Date(trip.timestamp_end);

  const formatTripDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const calculateDuration = () => {
    const timeDiff = endDate.getTime() - startDate.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  };

  // Group attractions by destination
  const attractionsByDestination = places
    .map((place) => ({
      place,
      attractions: attractions.filter(
        (attraction) => attraction.place === place.id
      ),
    }))
    .filter((group) => group.attractions.length > 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={trip.featured_image}
          alt={trip.name}
          layout="fill"
          objectFit="cover"
          className="z-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
        <div className="relative z-20 p-6 flex flex-col justify-end h-full text-white">
          <h1 className="text-4xl font-bold mb-2 drop-shadow-lg flex items-center gap-2">
            <MapPin />
            {trip.name}
          </h1>
          <div className="flex items-center gap-2 text-white/90">
            <div>
              <Calendar />
            </div>
            <div className="flex flex-col">
              <span className="text-sm">{formatTripDate(startDate)}</span>
              <span className="text-sm">{formatTripDate(endDate)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-8">
        {/* Logistics Section */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Logistics</h2>

          {/* Flights Subsection */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-gradient-accent rounded-full p-2">
                <Send className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Flights</h3>
              <span className="bg-gray-100 text-gray-600 text-sm px-2 py-1 rounded-full">
                {flights.length} flights
              </span>
            </div>
            <div className="space-y-4">
              {flights.map((flight) => (
                <FlightCard key={flight.id} flight={flight} />
              ))}
            </div>
          </div>

          {/* Accommodations Subsection */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-gradient-accent rounded-full p-2">
                <Home className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">
                Accommodations
              </h3>
              <span className="bg-gray-100 text-gray-600 text-sm px-2 py-1 rounded-full">
                {accommodations.length} stays
              </span>
            </div>
            <div className="space-y-4">
              {accommodations.map((accommodation) => (
                <AccommodationCard
                  key={accommodation.id}
                  accommodation={accommodation}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Attractions by Destination Section */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <div className="bg-gradient-accent rounded-full p-2">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Attractions</h2>
          </div>

          <div className="space-y-8">
            {attractionsByDestination.map(
              ({ place, attractions: placeAttractions }) => (
                <div key={place.id}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden">
                      <Image
                        src={place.featured_image}
                        alt={place.name}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">
                        {place.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {placeAttractions.length} attraction
                        {placeAttractions.length > 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {placeAttractions.map((attraction) => (
                      <AttractionCard
                        key={`${attraction.place}-${attraction.name}`}
                        attraction={attraction}
                      />
                    ))}
                  </div>
                </div>
              )
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
