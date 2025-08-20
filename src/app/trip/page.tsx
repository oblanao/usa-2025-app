import {
  getTrips,
  getFlightDetails,
  getAccommodationDetails,
  getAttractions,
  getPlaces,
} from "../lib/data";
import TripPageClient from "./TripPageClient";

export default async function TripPage() {
  const [trips, flights, accommodations, attractions, places] =
    await Promise.all([
      getTrips(),
      getFlightDetails(),
      getAccommodationDetails(),
      getAttractions(),
      getPlaces(),
    ]);

  return (
    <TripPageClient
      trips={trips}
      flights={flights}
      accommodations={accommodations}
      attractions={attractions}
      places={places}
    />
  );
}
