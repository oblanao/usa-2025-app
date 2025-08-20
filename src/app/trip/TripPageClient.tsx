"use client";

import { useState } from "react";
import FlightCard from "../components/FlightCard";
import AccommodationCard from "../components/AccommodationCard";
import AttractionCard from "../components/AttractionCard";
import { Send, Home, MapPin, Calendar, Star, Search } from "react-feather";
import Image from "next/image";
import { Trip, Attraction } from "../lib/types";
import { FlightData, AccommodationData } from "../lib/trip-types";
import { ComponentType } from "react";

type TabType = "flights" | "accommodations" | "attractions";

interface TabConfig {
  id: TabType;
  label: string;
  icon: ComponentType<{ size?: number }>;
  count: number;
}

interface TripPageClientProps {
  trips: Trip[];
  flights: FlightData[];
  accommodations: AccommodationData[];
  attractions: Attraction[];
}

export default function TripPageClient({
  trips,
  flights,
  accommodations,
  attractions,
}: TripPageClientProps) {
  const [activeTab, setActiveTab] = useState<TabType>("flights");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [submittedSearchQuery, setSubmittedSearchQuery] = useState<string>("");
  const [filteredAttractions, setFilteredAttractions] =
    useState<Attraction[]>(attractions);

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

  // Search functionality
  const handleSearch = () => {
    const trimmedQuery = searchQuery.trim();
    setSubmittedSearchQuery(trimmedQuery);

    if (!trimmedQuery) {
      setFilteredAttractions(attractions);
      return;
    }

    const query = trimmedQuery.toLowerCase();

    // Separate attractions by match type
    const titleMatches: Attraction[] = [];
    const descriptionOnlyMatches: Attraction[] = [];

    attractions.forEach((attraction) => {
      const nameMatch = attraction.name.toLowerCase().includes(query);
      const descriptionMatch = attraction.description
        .toLowerCase()
        .includes(query);

      if (nameMatch) {
        titleMatches.push(attraction);
      } else if (descriptionMatch) {
        descriptionOnlyMatches.push(attraction);
      }
    });

    // Sort title matches by length (shorter first)
    titleMatches.sort((a, b) => a.name.length - b.name.length);

    // Combine results: title matches first, then description matches
    const filtered = [...titleMatches, ...descriptionOnlyMatches];

    setFilteredAttractions(filtered);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch();
  };

  const handleSearchKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

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
      count:
        activeTab === "attractions"
          ? filteredAttractions.length
          : attractions.length,
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
          <div className="space-y-6">
            <div className="flex flex-col gap-4">
              <h3 className="text-2xl font-bold text-gray-800">Attractions</h3>

              {/* Search Bar */}
              <form onSubmit={handleSearchSubmit} className="relative">
                <div className="flex items-center bg-white rounded-xl border-2 border-gray-200 focus-within:border-accent transition-colors shadow-sm">
                  <input
                    type="text"
                    placeholder="Search attractions by name or description..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleSearchKeyPress}
                    className="flex-1 px-4 py-3 bg-transparent border-0 outline-none text-gray-700 placeholder-gray-400"
                  />
                  <button
                    type="submit"
                    className="p-3 text-gray-500 hover:text-accent transition-colors"
                    aria-label="Search"
                  >
                    <Search size={20} />
                  </button>
                </div>
              </form>

              {/* Search Results Info */}
              {submittedSearchQuery && (
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>
                    {filteredAttractions.length} result
                    {filteredAttractions.length !== 1 ? "s" : ""}
                    {submittedSearchQuery && ` for "${submittedSearchQuery}"`}
                  </span>
                  {submittedSearchQuery && (
                    <button
                      onClick={() => {
                        setSearchQuery("");
                        setSubmittedSearchQuery("");
                        setFilteredAttractions(attractions);
                      }}
                      className="text-accent hover:text-accent/80 transition-colors font-medium"
                    >
                      Clear search
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Attractions Grid */}
            {filteredAttractions.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredAttractions.map((attraction) => (
                  <AttractionCard
                    key={`${attraction.place}-${attraction.name}`}
                    attraction={attraction}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search size={48} className="mx-auto" />
                </div>
                <h4 className="text-lg font-semibold text-gray-600 mb-2">
                  No attractions found
                </h4>
                <p className="text-gray-500">
                  Try searching with different keywords or{" "}
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSubmittedSearchQuery("");
                      setFilteredAttractions(attractions);
                    }}
                    className="text-accent hover:text-accent/80 transition-colors font-medium underline"
                  >
                    view all attractions
                  </button>
                </p>
              </div>
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
            {trip.tagline}
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
