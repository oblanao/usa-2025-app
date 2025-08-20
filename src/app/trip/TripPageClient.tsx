"use client";

import { useState } from "react";
import FlightCard from "../components/FlightCard";
import AccommodationCard from "../components/AccommodationCard";
import AttractionCard from "../components/AttractionCard";
import { Send, Home, MapPin, Calendar, Star } from "react-feather";
import Image from "next/image";
import { Trip, Attraction, Place } from "../lib/types";
import { FlightData, AccommodationData } from "../lib/trip-types";

type TabType = "flights" | "accommodations" | "attractions";

interface TabConfig {
  id: TabType;
  label: string;
  icon: any;
  count: number;
}

interface TripPageClientProps {
  trips: Trip[];
  flights: FlightData[];
  accommodations: AccommodationData[];
  attractions: Attraction[];
  places: Place[];
}

export default function TripPageClient({
  trips,
  flights,
  accommodations,
  attractions,
  places,
}: TripPageClientProps) {
  const [activeTab, setActiveTab] = useState<TabType>("flights");

  const trip = trips[0];
  const startDate = new Date(trip.timestamp_start);
  const endDate = new Date(trip.timestamp_end);

  const formatTripDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const calculateDuration = () => {
    const timeDiff = endDate.getTime() - startDate.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  };

  // Group attractions by destination
  const attractionsByDestination = places
    .map((place) => ({
      place,
      attractions: attractions.filter(
        (attraction) => attraction.place === place.id
      ),
    }))
    .filter((group) => group.attractions.length > 0);

  // Tab configuration
  const tabs: TabConfig[] = [
    {
      id: "flights",
      label: "Flights",
      icon: Send,
      count: flights.length,
    },
    {
      id: "accommodations",
      label: "Hotels",
      icon: Home,
      count: accommodations.length,
    },
    {
      id: "attractions",
      label: "Attractions",
      icon: Star,
      count: attractions.length,
    },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "flights":
        return (
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gray-800">Flights</h3>
            {flights.map((flight) => (
              <FlightCard key={flight.id} flight={flight} />
            ))}
          </div>
        );

      case "accommodations":
        return (
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gray-800">Hotels</h3>
            {accommodations.map((accommodation) => (
              <AccommodationCard
                key={accommodation.id}
                accommodation={accommodation}
              />
            ))}
          </div>
        );

      case "attractions":
        return (
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-gray-800">Attractions</h3>
            {attractionsByDestination.map(
              ({ place, attractions: placeAttractions }) => (
                <div key={place.id}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden">
                      <Image
                        src={place.featured_image}
                        alt={place.name}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">
                        {place.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {placeAttractions.length} attraction
                        {placeAttractions.length > 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {placeAttractions.map((attraction) => (
                      <AttractionCard
                        key={`${attraction.place}-${attraction.name}`}
                        attraction={attraction}
                      />
                    ))}
                  </div>
                </div>
              )
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={trip.featured_image}
          alt={trip.name}
          layout="fill"
          objectFit="cover"
          className="z-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
        <div className="relative z-20 p-6 flex flex-col justify-end h-full text-white">
          <h1 className="text-4xl font-bold mb-2 drop-shadow-lg flex items-center gap-2">
            <MapPin />
            {trip.name}
          </h1>
          <div className="flex items-center gap-2 text-white/90">
            <div>
              <Calendar />
            </div>
            <div className="flex flex-col">
              <span className="text-sm">{formatTripDate(startDate)}</span>
              <span className="text-sm">{formatTripDate(endDate)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-accent text-white shadow-lg transform scale-105"
                      : "text-gray-600 hover:text-gray-800 hover:bg-gray-200"
                  }`}
                >
                  <Icon size={18} />
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-gray-300 text-gray-600"
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="animate-fadeIn">{renderTabContent()}</div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
