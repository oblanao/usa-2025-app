export type Event = {
  id: string;
  day_index: number;
  timestamp_start_local_time: string;
  referenced_item_type:
    | 'flight'
    | 'accommodation'
    | 'attraction'
    | 'restaurant'
    | 'tour'
    | 'transfer'
    | 'store';
  referenced_item_id: string;
  title: string;
  description: string;
};

export type Day = {
  day_index: number;
  date: string;
  brief_title: string;
  description: string;
};

export type Place = {
  id: string;
  name: string;
  days: number[];
  featured_image: string;
  images: string[];
  description: string;
};

export type Attraction = {
  place: string;
  name: string;
  description: string;
  did_you_know_fact: string;
  type: string;
  top_highlights: string[];
  cost: string;
  duration: string;
  hours_of_operation: string;
  official_website_link: string;
  featured_image: string;
  images: string[];
};

export type Flight = {
  id: string;
  day_index: number;
  airline: string;
  flight_number: string;
  departure_airport: string;
  arrival_airport: string;
  departure_time_local: string;
  arrival_time_local: string;
  duration: string;
};

export type Accommodation = {
  id: string;
  place: string;
  name: string;
  type: string;
  booking_link: string;
  check_in_date: string;
  check_out_date: string;
  featured_image: string;
  images: string[];
};

export type Tour = {
  id: string;
  place: string;
  name: string;
  provider: string;
  booking_link: string;
  confirmation_number: string;
  featured_image: string;
  images: string[];
};

export type Transfer = {
  id: string;
  day_index: number;
  type: string;
  provider: string;
  booking_link: string;
  confirmation_number: string;
  pickup_location: string;
  dropoff_location: string;
};

export type Store = {
  id: string;
  place: string;
  name: string;
  type: string;
  website_link: string;
};