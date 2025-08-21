import Header from "@/app/components/Header";
import CurrencyConverter from "@/app/components/CurrencyConverter";
import TimezoneSelector from "@/app/components/TimezoneSelector";
import { HelpCircle, Star, Compass, Zap } from "react-feather";

const HelpPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header title="Travel Help" />

      {/* Hero Section */}
      <div className="bg-gradient-accent p-6 pt-20">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-white text-accent p-3 rounded-full shadow-lg">
            <HelpCircle className="w-6 h-6" />
          </div>
          <span className="text-white/90 text-sm font-semibold uppercase tracking-wide">
            Travel Resources
          </span>
        </div>
        <h1 className="text-3xl font-extrabold text-white leading-tight mb-2">
          Your Travel Toolkit
        </h1>
        <p className="text-white/90 text-lg leading-relaxed">
          Essential tools and information to make your USA adventure smooth and
          enjoyable.
        </p>
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-6">
        {/* Quick Tools Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-accent/10 p-2 rounded-full">
              <Zap className="w-5 h-5 text-accent" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Quick Tools</h2>
          </div>

          <div className="space-y-6">
            {/* Currency Converter */}
            <CurrencyConverter />

            {/* Timezone Selector */}
            <TimezoneSelector />
          </div>
        </div>

        {/* Coming Soon Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-gradient-accent p-3 rounded-full">
              <Star className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">
                More Tools Coming Soon
              </h3>
              <p className="text-sm text-gray-500">
                We're adding more helpful features
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
              <div className="flex items-center gap-3 mb-2">
                <Compass className="w-5 h-5 text-accent" />
                <h4 className="font-semibold text-gray-800">Language Guide</h4>
              </div>
              <p className="text-sm text-gray-600">
                Essential phrases and translations for your trip
              </p>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
              <div className="flex items-center gap-3 mb-2">
                <HelpCircle className="w-5 h-5 text-accent" />
                <h4 className="font-semibold text-gray-800">
                  Emergency Contacts
                </h4>
              </div>
              <p className="text-sm text-gray-600">
                Important numbers and embassy information
              </p>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
              <div className="flex items-center gap-3 mb-2">
                <Star className="w-5 h-5 text-accent" />
                <h4 className="font-semibold text-gray-800">Travel Tips</h4>
              </div>
              <p className="text-sm text-gray-600">
                Local customs, tipping guide, and cultural insights
              </p>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
              <div className="flex items-center gap-3 mb-2">
                <Compass className="w-5 h-5 text-accent" />
                <h4 className="font-semibold text-gray-800">Transportation</h4>
              </div>
              <p className="text-sm text-gray-600">
                Public transit info and ride-sharing apps
              </p>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="bg-gradient-accent-light rounded-2xl p-6 text-white">
          <div className="flex items-center gap-3 mb-4">
            <HelpCircle className="w-6 h-6" />
            <h3 className="text-xl font-bold">Need More Help?</h3>
          </div>
          <p className="text-white/90 mb-4 leading-relaxed">
            Have questions about your itinerary or need travel assistance? We're
            here to help make your trip unforgettable.
          </p>
          <div className="text-sm text-white/80">
            <p>📱 Available 24/7 during your trip</p>
            <p>✈️ Emergency travel support included</p>
          </div>
        </div>
      </div>

      {/* Bottom padding for navigation */}
      <div className="h-24"></div>
    </div>
  );
};

export default HelpPage;
