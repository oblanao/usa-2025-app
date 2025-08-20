import { getPlaceById, getDays, getEvents } from "@/app/lib/data";
import DayCard from "@/app/components/DayCard";
import Header from "@/app/components/Header";
import { Day } from "@/app/lib/types";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Calendar, MapPin } from "react-feather";
import { calculateNightsForPlace } from "@/app/lib/utils";

type DestinationPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function DestinationPage({
  params,
}: DestinationPageProps) {
  const resolvedParams = await params;
  const place = await getPlaceById(resolvedParams.id);
  const allDays = await getDays();
  const allEvents = await getEvents();

  if (!place) {
    notFound();
  }

  const destinationDays = allDays.filter((day) =>
    place.days.includes(day.day_index)
  );
  const destinationEvents = allEvents.filter((event) =>
    place.days.includes(event.day_index)
  );

  return (
    <>
      <Header title={place.name} showBackButton />
      <div className="relative h-80 w-full">
        <Image
          src={place.featured_image}
          alt={place.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/80 to-transparent" />
      </div>

      <div className="relative bg-gray-100 -mt-16 rounded-t-3xl py-6 px-4">
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-[calc(100%-3rem)] max-w-sm">
          <div className="bg-white rounded-xl shadow-lg p-4 flex justify-around items-center">
            <div className="flex items-center space-x-2">
              <Calendar className="text-gray-500" />
              <span className="text-gray-700 font-semibold">{`${calculateNightsForPlace(
                place.id
              )} Nights`}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="text-gray-500" />
              <span className="text-gray-700 font-semibold">{`${destinationEvents.length} Events`}</span>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h1 className="text-3xl font-bold">{place.name}</h1>
          <div className="my-8">
            <div className="border-l-4 border-accent pl-4">
              <p className="text-lg text-gray-600 italic">
                {place.description}
              </p>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-text mb-4">Daily Itinerary</h2>
          <div className="space-y-6">
            {destinationDays.map((day: Day) => (
              <DayCard key={day.day_index} day={day} placeId={place.id} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
