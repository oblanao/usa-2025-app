// Types that match the actual JSON data structure for the trip page
export type FlightData = {
  id: string;
  origin: string;
  destination: string;
  stopovers: Array<{
    airport: string;
    city: string;
    duration: string;
  }>;
  timestamp_depart_local_time: string;
  timestamp_arrive_local_time: string;
  duration: string;
  aircraft_type: string;
  seat_included: boolean;
  meal_included: boolean;
  luggage_policy: string;
  airline: string;
  cost: string;
  contact_details: string;
};

export type AccommodationData = {
  id: string;
  place: string;
  address: string;
  timestamp_checkin_local_time: string;
  timestamp_checkout_local_time: string;
  title: string;
  brief_description: string;
  cost: string;
  contact_details: string;
  checkin_instructions: string;
  free_cancellation: boolean;
  other_notes: string;
};
