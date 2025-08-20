import { getDayByIndex, getEvents } from "@/app/lib/data";
import Header from "@/app/components/Header";
import TimelineCard from "@/app/components/TimelineCard";
import { Event } from "@/app/lib/types";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Map } from "react-feather";

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

  const shortHeaderDate = new Date(day.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });

  const previousDay =
    day.day_index > 1 ? await getDayByIndex(day.day_index - 1) : undefined;
  const nextDay = await getDayByIndex(day.day_index + 1);

  return (
    <>
      <Header
        title={`Day ${day.day_index} - ${shortHeaderDate}`}
        showBackButton
      />
      <div className="p-4 sm:p-6 border-b">
        <h2 className="text-2xl font-bold text-text">{day.brief_title}</h2>
        <div className="mt-4 border-l-4 border-accent pl-4">
          <p className="text-lg italic text-gray-700 leading-relaxed">
            {day.description}
          </p>
        </div>
      </div>
      <div className="p-4">
        <h2 className="text-2xl font-bold text-text mb-4 flex items-center">
          <Map size={20} className="text-accent mr-2" />
          Timeline
        </h2>
        <div className="space-y-6">
          {dayEvents.map((event: Event) => (
            <TimelineCard key={event.id} event={event} />
          ))}
        </div>
      </div>
      <div className="p-4 border-t flex items-center justify-between">
        <div>
          {previousDay && (
            <Link
              href={`/destinations/${params.id}/day/${previousDay.day_index}`}
              className="text-accent font-semibold hover:underline"
            >
              ← Previous Day
            </Link>
          )}
        </div>
        <div>
          {nextDay && (
            <Link
              href={`/destinations/${params.id}/day/${nextDay.day_index}`}
              className="text-accent font-semibold hover:underline"
            >
              Next Day →
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
