import { getPlaces, getEvents } from './lib/data';
import DestinationCard from './components/DestinationCard';
import { Place } from './lib/types';

export default async function Home() {
  const places = await getPlaces();
  const events = await getEvents();

  return (
    <div className="p-4">
      <div className="space-y-8">
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
    </div>
  );
}
