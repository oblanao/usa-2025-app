import {
  getTrips,
  getFlightDetails,
  getAccommodationDetails,
  getAttractions,
} from "../lib/data";
import TripPageClient from "./TripPageClient";

export default async function TripPage() {
  const [trips, flights, accommodations, attractions] = await Promise.all([
    getTrips(),
    getFlightDetails(),
    getAccommodationDetails(),
    getAttractions(),
  ]);

  return (
    <TripPageClient
      trips={trips}
      flights={flights}
      accommodations={accommodations}
      attractions={attractions}
    />
  );
}
