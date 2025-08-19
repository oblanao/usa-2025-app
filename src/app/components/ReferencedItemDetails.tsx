import {
  Activity,
  Briefcase,
  Clock,
  DollarSign,
  Globe,
  Heart,
  HelpCircle,
  MapPin,
  Star,
  Tag,
  Tool,
} from 'react-feather';
import {
  Accommodation,
  Attraction,
  Flight,
  Store,
  Tour,
  Transfer,
} from '../lib/types';

type DetailItemProps = {
  icon: React.ElementType;
  label: string;
  value?: string | string[];
};

const DetailItem = ({ icon: Icon, label, value }: DetailItemProps) => {
  if (!value) return null;

  return (
    <div className="flex items-start space-x-3">
      <Icon className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
      <div className="flex-1">
        <p className="text-sm font-semibold text-gray-500">{label}</p>
        {Array.isArray(value) ? (
          <ul className="list-disc list-inside mt-1">
            {value.map((item, index) => (
              <li key={index} className="text-base text-text">
                {item}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-base text-text">{value}</p>
        )}
      </div>
    </div>
  );
};

const ReferencedItemDetails = ({
  item,
  type,
}: {
  item: any;
  type: string;
}) => {
  const renderDetails = () => {
    switch (type) {
      case 'attraction':
        const attraction = item as Attraction;
        return (
          <div className="space-y-4">
            <DetailItem
              icon={HelpCircle}
              label="Did You Know?"
              value={attraction.did_you_know_fact}
            />
            <DetailItem
              icon={Tag}
              label="Type"
              value={attraction.type}
            />
            <DetailItem
              icon={Star}
              label="Top Highlights"
              value={attraction.top_highlights}
            />
            <DetailItem
              icon={DollarSign}
              label="Cost"
              value={attraction.cost}
            />
            <DetailItem
              icon={Clock}
              label="Duration"
              value={attraction.duration}
            />
            <DetailItem
              icon={Globe}
              label="Website"
              value={attraction.official_website_link}
            />
          </div>
        );
      // Add cases for other types like flight, accommodation, etc.
      default:
        return <p>No details available for this event type.</p>;
    }
  };

  return (
    <div className="mt-6 border-t border-gray-200 pt-6">
      <h3 className="text-2xl font-bold text-text mb-4">Details</h3>
      {renderDetails()}
    </div>
  );
};

export default ReferencedItemDetails;
