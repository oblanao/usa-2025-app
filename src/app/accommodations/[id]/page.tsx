import Header from "@/app/components/Header";
import { notFound } from "next/navigation";
import {
  Clock,
  MapPin,
  Info,
  Home,
  Calendar,
  Phone,
  DollarSign,
  Users,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  Mail,
} from "react-feather";
import { AccommodationData } from "@/app/lib/trip-types";

// Extended type to include the communications array
type AccommodationWithCommunications = AccommodationData & {
  communications?: Array<{
    type: string;
    sender: string;
    message: string;
  }>;
};
import { getAccommodationDetails } from "@/app/lib/data";

type AccommodationPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AccommodationPage({
  params,
}: AccommodationPageProps) {
  const resolvedParams = await params;
  const accommodations = await getAccommodationDetails();
  const accommodation = accommodations.find(
    (acc) => acc.id === resolvedParams.id
  ) as AccommodationWithCommunications | undefined;

  if (!accommodation) {
    notFound();
  }

  // Get place name mapping
  const getPlaceName = (placeId: string) => {
    const placeNames: { [key: string]: string } = {
      "san-francisco": "San Francisco",
      honolulu: "Honolulu",
      "los-angeles": "Los Angeles",
    };
    return placeNames[placeId] || placeId;
  };

  // Parse local times properly
  const parseLocalDateTime = (timestamp: string) => {
    return new Date(timestamp);
  };

  const checkinDate = parseLocalDateTime(
    accommodation.timestamp_checkin_local_time
  );
  const checkoutDate = parseLocalDateTime(
    accommodation.timestamp_checkout_local_time
  );

  const formatDateTime = (date: Date) => {
    return {
      date: date.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      time: date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }),
    };
  };

  const checkinFormatted = formatDateTime(checkinDate);
  const checkoutFormatted = formatDateTime(checkoutDate);

  const calculateNights = () => {
    const timeDiff = checkoutDate.getTime() - checkinDate.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  };

  // Communication helper functions
  const getSenderLabel = (sender: string) => {
    return sender === "host" ? "Host" : "Me";
  };

  const getSenderStyle = (sender: string) => {
    return sender === "host"
      ? "bg-blue-50 border-l-4 border-blue-500"
      : "bg-green-50 border-l-4 border-green-500";
  };

  return (
    <>
      <Header title={"Accommodation Details"} showBackButton />

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-white text-blue-600 p-3 rounded-full shadow-lg">
            <Home size={24} />
          </div>
          <span className="text-white/90 text-sm font-semibold uppercase tracking-wide">
            Accommodation
          </span>
        </div>
        <h1 className="text-3xl font-extrabold text-white leading-tight mb-2">
          {accommodation.title}
        </h1>
        <p className="text-blue-100 text-lg">
          {getPlaceName(accommodation.place)}
        </p>
      </div>

      {/* Main Content */}
      <div className="p-4">
        {/* Quick Info Cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-blue-50 p-4 rounded-xl border-l-4 border-blue-500">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs text-gray-600 uppercase tracking-wide font-semibold">
                Cost
              </span>
            </div>
            <p className="text-lg font-bold text-gray-800 flex gap-2 items-center">
              <DollarSign className="w-4 h-4 text-blue-600" />
              {accommodation.cost?.replace("$", "")}
            </p>
          </div>

          <div className="bg-blue-50 p-4 rounded-xl border-l-4 border-blue-500">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs text-gray-600 uppercase tracking-wide font-semibold">
                Duration
              </span>
            </div>
            <p className="text-lg font-bold text-gray-800 flex gap-2 items-center">
              <Clock className="w-4 h-4 text-blue-600" />
              {calculateNights()} Nights
            </p>
          </div>
        </div>

        {/* Address Section */}
        <div className="mb-6 p-4 bg-gray-50 rounded-xl">
          <div className="flex items-center gap-2 mb-3">
            <div className="bg-blue-500/10 p-2 rounded-full">
              <MapPin className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-800">Address</h3>
          </div>
          <p className="text-gray-700 font-medium">{accommodation.address}</p>
        </div>

        {/* Check-in & Check-out Section */}
        <div className="mb-6 p-4 bg-gray-50 rounded-xl">
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-blue-500/10 p-2 rounded-full">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-800">
              Check-in & Check-out
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                  Check-in
                </span>
              </div>
              <p className="text-lg font-bold text-gray-800 mb-1">
                {checkinFormatted.date}
              </p>
              <p className="text-blue-600 font-semibold">
                {checkinFormatted.time}
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-4 h-4 text-orange-600" />
                <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                  Check-out
                </span>
              </div>
              <p className="text-lg font-bold text-gray-800 mb-1">
                {checkoutFormatted.date}
              </p>
              <p className="text-blue-600 font-semibold">
                {checkoutFormatted.time}
              </p>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Info className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-800">Description</h2>
          </div>
          <div className="border-l-4 border-blue-500 pl-6">
            <p className="text-gray-700 leading-relaxed text-lg">
              {accommodation.brief_description}
            </p>
          </div>
        </div>

        {/* Contact Details Section */}
        <div className="mb-6 p-4 bg-gray-50 rounded-xl">
          <div className="flex items-center gap-2 mb-3">
            <div className="bg-blue-500/10 p-2 rounded-full">
              <Phone className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-800">Contact Details</h3>
          </div>
          <p className="text-gray-700 font-medium">
            {accommodation.contact_details}
          </p>
        </div>

        {/* Check-in Instructions */}
        <div className="mb-6 p-4 bg-amber-50 rounded-xl border border-amber-200">
          <div className="flex items-center gap-2 mb-3">
            <div className="bg-amber-100 p-2 rounded-full">
              <Users className="w-5 h-5 text-amber-600" />
            </div>
            <h3 className="text-lg font-bold text-amber-800">
              Check-in Instructions
            </h3>
          </div>
          <p className="text-amber-700 leading-relaxed">
            {accommodation.checkin_instructions}
          </p>
        </div>

        {/* Communications Section */}
        {accommodation.communications &&
          accommodation.communications.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare className="w-5 h-5 text-blue-600" />
                <h2 className="text-xl font-bold text-gray-800">
                  Communications
                </h2>
              </div>

              <div className="space-y-4">
                {accommodation.communications.map((comm, index: number) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg ${getSenderStyle(comm.sender)}`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Mail className="w-4 h-4 text-gray-600" />
                      <span className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                        {getSenderLabel(comm.sender)} •{" "}
                        {comm.type.replace("-", " ").toUpperCase()}
                      </span>
                    </div>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {comm.message}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

        {/* Additional Notes */}
        {accommodation.other_notes && (
          <div className="mb-6 p-4 bg-purple-50 rounded-xl border border-purple-200">
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-purple-100 p-2 rounded-full">
                <Info className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-purple-800">
                Additional Notes
              </h3>
            </div>
            <p className="text-purple-700 leading-relaxed">
              {accommodation.other_notes}
            </p>
          </div>
        )}

        {/* Cancellation Policy */}
        <div className="mb-8 p-4 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
          <div className="flex items-center gap-3 mb-3">
            <AlertCircle className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-bold text-gray-800">
              Cancellation Policy
            </h3>
          </div>
          <div className="flex items-center gap-2">
            {accommodation.free_cancellation ? (
              <>
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-green-700 font-semibold">
                  Free cancellation available
                </span>
              </>
            ) : (
              <>
                <AlertCircle className="w-4 h-4 text-red-600" />
                <span className="text-red-700 font-semibold">
                  No free cancellation
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Bottom padding for better mobile experience */}
      <div className="h-20"></div>
    </>
  );
}
