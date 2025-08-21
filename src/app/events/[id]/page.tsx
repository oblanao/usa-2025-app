import { getEventById, getReferencedItem } from "@/app/lib/data";
import Header from "@/app/components/Header";
import { notFound } from "next/navigation";
import Image from "next/image";
import {
  Clock,
  Calendar,
  Info,
  MapPin,
  Send,
  Home,
  Camera,
  Coffee,
  Truck,
  ShoppingCart,
} from "react-feather";
import FlightCard from "@/app/components/FlightCard";
import AttractionCard from "@/app/components/AttractionCard";
import AccommodationCard from "@/app/components/AccommodationCard";
import TourCard from "@/app/components/TourCard";
import TransferCard from "@/app/components/TransferCard";
import StoreCard from "@/app/components/StoreCard";
import {
  FlightData,
  AccommodationData,
  TransferData,
} from "@/app/lib/trip-types";
import { Attraction, Tour, Store } from "@/app/lib/types";

type EventPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EventPage({ params }: EventPageProps) {
  const resolvedParams = await params;
  const event = await getEventById(resolvedParams.id);

  if (!event) {
    notFound();
  }

  const referencedItem = await getReferencedItem(
    event.referenced_item_type,
    event.referenced_item_id
  );

  // Format event start time without timezone conversion
  const formatEventDateTime = (timestampString: string) => {
    // Extract date and time from ISO string without timezone conversion
    // Format: "2025-08-26T07:00:00+03:00" -> extract "2025-08-26" and "07:00"
    const match = timestampString.match(
      /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/
    );

    if (!match) {
      // Fallback to current implementation if parsing fails
      const date = new Date(timestampString);
      return {
        date: date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        time: date.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
        dayOfWeek: date.toLocaleDateString("en-US", {
          weekday: "long",
        }),
      };
    }

    const [, year, month, day, hour, minute] = match;

    // Create date object for day of week calculation (using UTC to avoid timezone issues)
    const dateForDayOfWeek = new Date(`${year}-${month}-${day}T00:00:00Z`);

    // Format month name
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const monthName = monthNames[parseInt(month) - 1];

    // Format day of week
    const dayNames = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayOfWeek = dayNames[dateForDayOfWeek.getUTCDay()];

    return {
      date: `${monthName} ${parseInt(day)}, ${year}`,
      time: `${hour}:${minute}`,
      dayOfWeek: dayOfWeek,
    };
  };

  const eventDateTime = formatEventDateTime(event.timestamp_start_local_time);

  // Get type-specific styling
  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case "flight":
        return Send;
      case "accommodation":
        return Home;
      case "attraction":
        return Camera;
      case "restaurant":
        return Coffee;
      case "tour":
        return MapPin;
      case "transfer":
        return Truck;
      case "store":
        return ShoppingCart;
      default:
        return Calendar;
    }
  };

  // Render the appropriate card component based on type
  const renderReferencedItemCard = () => {
    if (!referencedItem) return null;

    switch (event.referenced_item_type) {
      case "flight":
        if (
          "origin" in referencedItem &&
          "destination" in referencedItem &&
          "airline" in referencedItem
        ) {
          return <FlightCard flight={referencedItem as FlightData} />;
        }
        return null;
      case "attraction":
        if ("name" in referencedItem && "description" in referencedItem) {
          return <AttractionCard attraction={referencedItem as Attraction} />;
        }
        return null;
      case "accommodation":
        if (
          "address" in referencedItem &&
          "timestamp_checkin_local_time" in referencedItem
        ) {
          return (
            <AccommodationCard
              accommodation={referencedItem as AccommodationData}
            />
          );
        }
        return null;
      case "tour":
        if ("name" in referencedItem && "place" in referencedItem) {
          return <TourCard tour={referencedItem as Tour} />;
        }
        return null;
      case "transfer":
        if (
          "origin" in referencedItem &&
          "destination" in referencedItem &&
          "name" in referencedItem
        ) {
          return <TransferCard transfer={referencedItem as TransferData} />;
        }
        return null;
      case "store":
        if ("name" in referencedItem && "type" in referencedItem) {
          return <StoreCard store={referencedItem as Store} />;
        }
        return null;
      default:
        return null;
    }
  };

  return (
    <>
      <Header title={"Event Details"} showBackButton />

      {/* Hero Section with Event Header */}
      <div className="bg-gradient-accent p-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-white text-accent p-3 rounded-full shadow-lg">
            {(() => {
              const IconComponent = getEventTypeIcon(
                event.referenced_item_type
              );
              return <IconComponent size={24} />;
            })()}
          </div>
          <span className="text-white/90 text-sm font-semibold uppercase tracking-wide">
            {event.referenced_item_type}
          </span>
        </div>
        <h1 className="text-3xl font-extrabold text-white leading-tight">
          {event.title}
        </h1>
      </div>

      {/* Event Details Section */}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <Info className="w-5 h-5 text-accent" />
          <h2 className="text-xl font-bold text-gray-800">About This Event</h2>
        </div>
        {/* Date and Time Info */}
        <div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="bg-accent/10 p-3 rounded-full">
              <Calendar className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">
                Date
              </p>
              <p className="text-sm font-bold text-gray-800">
                {eventDateTime.date}
              </p>
              <p className="text-xs text-gray-600">{eventDateTime.dayOfWeek}</p>
            </div>
          </div>

          <div className="w-px h-12 bg-gray-300"></div>

          <div className="flex items-center gap-3">
            <div className="bg-accent/10 p-3 rounded-full">
              <Clock className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">
                Time
              </p>
              <p className="text-sm font-bold text-gray-800">
                {eventDateTime.time}
              </p>
              <p className="text-xs text-gray-600">Local Time</p>
            </div>
          </div>
        </div>

        {/* Event Description */}
        <div className="mb-8">
          <div className="border-l-4 border-accent pl-6">
            <p className="text-gray-700 leading-relaxed text-lg">
              {event.description}
            </p>
          </div>
        </div>

        {/* Referenced Item Details */}
        {referencedItem && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-accent" />
              <h2 className="text-xl font-bold text-gray-800">Details</h2>
            </div>
            {renderReferencedItemCard()}
          </div>
        )}
      </div>

      {/* Bottom padding for better mobile experience */}
      <div className="h-20"></div>
    </>
  );
}
