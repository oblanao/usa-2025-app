import { getAttractionById } from "@/app/lib/data";
import Header from "@/app/components/Header";
import { notFound } from "next/navigation";
import Image from "next/image";
import {
  Clock,
  ExternalLink,
  Info,
  Camera,
  DollarSign,
  Star,
  Users,
  Zap,
} from "react-feather";

type AttractionPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AttractionPage({ params }: AttractionPageProps) {
  const resolvedParams = await params;
  const attraction = await getAttractionById(resolvedParams.id);

  if (!attraction) {
    notFound();
  }

  // Get type-specific styling and icon
  const getAttractionTypeInfo = (type: string) => {
    switch (type) {
      case "urban":
        return {
          bgColor: "bg-blue-500",
          bgGradient: "from-blue-500 to-blue-600",
          textColor: "text-blue-600",
          bgLight: "bg-blue-50",
          label: "Urban Experience",
        };
      case "nature":
        return {
          bgColor: "bg-green-500",
          bgGradient: "from-green-500 to-green-600",
          textColor: "text-green-600",
          bgLight: "bg-green-50",
          label: "Nature Experience",
        };
      case "cultural":
        return {
          bgColor: "bg-purple-500",
          bgGradient: "from-purple-500 to-purple-600",
          textColor: "text-purple-600",
          bgLight: "bg-purple-50",
          label: "Cultural Experience",
        };
      case "adventure":
        return {
          bgColor: "bg-orange-500",
          bgGradient: "from-orange-500 to-orange-600",
          textColor: "text-orange-600",
          bgLight: "bg-orange-50",
          label: "Adventure Experience",
        };
      case "walk":
        return {
          bgColor: "bg-teal-500",
          bgGradient: "from-teal-500 to-teal-600",
          textColor: "text-teal-600",
          bgLight: "bg-teal-50",
          label: "Walking Experience",
        };
      default:
        return {
          bgColor: "bg-gray-500",
          bgGradient: "from-gray-500 to-gray-600",
          textColor: "text-gray-600",
          bgLight: "bg-gray-50",
          label: "Experience",
        };
    }
  };

  const typeInfo = getAttractionTypeInfo(attraction.type);

  return (
    <>
      <Header title={"Attraction Details"} showBackButton />

      {/* Hero Section with Featured Image */}
      <div className="relative h-80 overflow-hidden">
        <Image
          src={attraction.featured_image}
          alt={attraction.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Floating Type Badge */}
        <div className="absolute top-4 right-4">
          <div
            className={`${typeInfo.bgColor} text-white px-3 py-1 rounded-full shadow-lg`}
          >
            <span className="text-sm font-semibold">{typeInfo.label}</span>
          </div>
        </div>

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full shadow-lg">
              <Camera className="w-6 h-6 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-extrabold text-white leading-tight mb-2">
            {attraction.name}
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4">
        {/* Quick Info Cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div
            className={`${
              typeInfo.bgLight
            } p-4 rounded-xl border-l-4 ${typeInfo.bgColor.replace(
              "bg-",
              "border-"
            )}`}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs text-gray-600 uppercase tracking-wide font-semibold">
                Cost
              </span>
            </div>
            <p className="text-lg font-bold text-gray-800 flex gap-2 items-center">
              <DollarSign className={`w-4 h-4 ${typeInfo.textColor}`} />
              {attraction.cost?.replace("$", "")}
            </p>
          </div>

          <div
            className={`${
              typeInfo.bgLight
            } p-4 rounded-xl border-l-4 ${typeInfo.bgColor.replace(
              "bg-",
              "border-"
            )}`}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs text-gray-600 uppercase tracking-wide font-semibold">
                Duration
              </span>
            </div>
            <p className="text-lg font-bold text-gray-800 flex gap-2 items-center">
              <Clock className={`w-4 h-4 ${typeInfo.textColor}`} />
              {attraction.duration}
            </p>
          </div>
        </div>

        {/* Operating Hours */}
        <div className="mb-6 p-4 bg-gray-50 rounded-xl">
          <div className="flex items-center gap-2 mb-3">
            <div className={`${typeInfo.bgColor}/10 p-2 rounded-full`}>
              <Clock className={`w-5 h-5 ${typeInfo.textColor}`} />
            </div>
            <h3 className="text-lg font-bold text-gray-800">
              Hours of Operation
            </h3>
          </div>
          <p className="text-gray-700 font-medium">
            {attraction.hours_of_operation}
          </p>
        </div>

        {/* Description Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Info className={`w-5 h-5 ${typeInfo.textColor}`} />
            <h2 className="text-xl font-bold text-gray-800">
              About This Attraction
            </h2>
          </div>
          <div
            className={`border-l-4 ${typeInfo.bgColor.replace(
              "bg-",
              "border-"
            )} pl-6`}
          >
            <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
              {attraction.description}
            </p>
          </div>
        </div>

        {/* Did You Know Fact */}
        <div className="mb-8 p-2 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-200">
          <div className="flex items-center gap-3">
            <div className="bg-amber-100 p-3 rounded-full mt-1">
              <Zap className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-amber-800 mb-2">
                Did You Know?
              </h3>
              <p className="text-amber-700 leading-relaxed">
                {attraction.did_you_know_fact}
              </p>
            </div>
          </div>
        </div>

        {/* Top Highlights */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Star className={`w-5 h-5 ${typeInfo.textColor}`} />
            <h2 className="text-xl font-bold text-gray-800">Top Highlights</h2>
          </div>
          <div className="space-y-3">
            {attraction.top_highlights.map((highlight, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-4 bg-white rounded-lg border border-gray-200 shadow-sm"
              >
                <div
                  className={`${typeInfo.bgColor} text-white p-2 rounded-full flex-shrink-0 mt-0.5`}
                >
                  <Star size={16} fill="currentColor" />
                </div>
                <p className="text-gray-700 leading-relaxed">{highlight}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Official Website Link */}
        <div className="mb-8">
          <a
            href={attraction.official_website_link}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-center gap-3 p-4 bg-gradient-to-r ${typeInfo.bgGradient} text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]`}
          >
            <ExternalLink className="w-5 h-5" />
            <span className="font-semibold">Visit Official Website</span>
          </a>
        </div>

        {/* Additional Info Card */}
        <div
          className={`p-6 ${
            typeInfo.bgLight
          } rounded-xl border-2 border-dashed ${typeInfo.bgColor.replace(
            "bg-",
            "border-"
          )}/30`}
        >
          <div className="flex items-center gap-3 mb-3">
            <Users className={`w-5 h-5 ${typeInfo.textColor}`} />
            <h3 className="text-lg font-bold text-gray-800">
              Planning Your Visit
            </h3>
          </div>
          <div className="space-y-2 text-sm text-gray-700">
            <p>
              <span className="font-semibold">Best for:</span>{" "}
              {typeInfo.label.toLowerCase()}
            </p>
            <p>
              <span className="font-semibold">Duration:</span> Plan for{" "}
              {attraction.duration.toLowerCase()}
            </p>
            <p>
              <span className="font-semibold">Cost:</span>{" "}
              {attraction.cost === "$0"
                ? "Free entry"
                : `Budget ${attraction.cost} per person`}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom padding for better mobile experience */}
      <div className="h-20"></div>
    </>
  );
}
