import { getPlaceById, getDays, getEvents } from "@/app/lib/data";
import DayCard from "@/app/components/DayCard";
import Header from "@/app/components/Header";
import { Day } from "@/app/lib/types";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Calendar, MapPin } from "react-feather";

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
      <div className="relative h-64 w-full">
        <Image
          src={place.featured_image}
          alt={place.name}
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-6 left-4 right-4">
          <h1 className="text-4xl font-extrabold text-white drop-shadow-lg">
            {place.name}
          </h1>
        </div>
      </div>
      <div className="p-4 sm:p-6 bg-gray-50">
        <div className="flex items-center space-x-6 text-gray-600">
          <div className="flex items-center space-x-2">
            <Calendar size={20} className="text-accent" />
            <span className="font-semibold">{`${destinationDays.length} Days`}</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin size={20} className="text-accent" />
            <span className="font-semibold">{`${destinationEvents.length} Events`}</span>
          </div>
        </div>
        <p className="text-lg text-gray-700 mt-4">{place.description}</p>
      </div>

      <div className="p-4">
        <h2 className="text-2xl font-bold text-text mb-4">Daily Itinerary</h2>
        <div className="space-y-6">
          {destinationDays.map((day: Day) => (
            <DayCard key={day.day_index} day={day} placeId={place.id} />
          ))}
        </div>
      </div>
    </>
  );
}
