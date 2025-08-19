import { getDayByIndex, getEvents } from "@/app/lib/data";
import Header from "@/app/components/Header";
import TimelineCard from "@/app/components/TimelineCard";
import { Event } from "@/app/lib/types";
import { notFound } from "next/navigation";
import { Calendar } from "react-feather";

type DayPageProps = {
  params: Promise<{
    id: string;
    day_index: string;
  }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function DayPage(props: DayPageProps) {
  const params = await props.params;
  const day = await getDayByIndex(parseInt(params.day_index, 10));
  const allEvents = await getEvents();

  if (!day) {
    notFound();
  }

  const dayEvents = allEvents.filter(
    (event) => event.day_index === day.day_index
  );

  const formattedDate = new Date(day.date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <Header
        title={`Day ${day.day_index}: ${day.brief_title}`}
        showBackButton
      />
      <div className="p-4 sm:p-6 bg-gray-50 border-b">
        <div className="flex items-center space-x-2 text-gray-600">
          <Calendar size={20} className="text-accent" />
          <span className="font-semibold">{formattedDate}</span>
        </div>
        <p className="text-lg text-gray-700 mt-2">{day.description}</p>
      </div>
      <div className="p-4">
        <h2 className="text-2xl font-bold text-text mb-4">
          Today&apos;s Events
        </h2>
        <div className="space-y-6">
          {dayEvents.map((event: Event) => (
            <TimelineCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </>
  );
}
