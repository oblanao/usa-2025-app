import fs from 'fs';
import path from 'path';
import {
  Event,
  Day,
  Place,
  Attraction,
  Flight,
  Accommodation,
  Tour,
  Transfer,
  Store,
} from './types';

const dataDirectory = path.join(process.cwd(), 'data');

async function readJsonFile<T>(filename: string): Promise<T> {
  const filePath = path.join(dataDirectory, filename);
  const jsonData = await fs.promises.readFile(filePath, 'utf-8');
  return JSON.parse(jsonData);
}

export async function getEvents(): Promise<Event[]> {
  return readJsonFile<Event[]>('events.json');
}

export async function getEventById(id: string): Promise<Event | undefined> {
  const events = await getEvents();
  return events.find(event => event.id === id);
}

export async function getDays(): Promise<Day[]> {
  return readJsonFile<Day[]>('days.json');
}

export async function getDayByIndex(
  index: number,
): Promise<Day | undefined> {
  const days = await getDays();
  return days.find(day => day.day_index === index);
}

export async function getPlaces(): Promise<Place[]> {
  return readJsonFile<Place[]>('places.json');
}

export async function getPlaceById(id: string): Promise<Place | undefined> {
  const places = await getPlaces();
  return places.find(place => place.id === id);
}

export async function getAttractions(): Promise<Attraction[]> {
  return readJsonFile<Attraction[]>('attractions.json');
}

export async function getAttractionById(
  id: string,
): Promise<Attraction | undefined> {
  const attractions = await getAttractions();
  return attractions.find(attraction => attraction.name.toLowerCase().replace(/ /g, '-') === id);
}

export async function getFlights(): Promise<Flight[]> {
  return readJsonFile<Flight[]>('flights.json');
}

export async function getFlightById(id: string): Promise<Flight | undefined> {
  const flights = await getFlights();
  return flights.find(flight => flight.id === id);
}

export async function getAccommodations(): Promise<Accommodation[]> {
  return readJsonFile<Accommodation[]>('accommodations.json');
}

export async function getAccommodationById(
  id: string,
): Promise<Accommodation | undefined> {
  const accommodations = await getAccommodations();
  return accommodations.find(accommodation => accommodation.id === id);
}

export async function getTours(): Promise<Tour[]> {
  return readJsonFile<Tour[]>('tours.json');
}

export async function getTourById(id: string): Promise<Tour | undefined> {
  const tours = await getTours();
  return tours.find(tour => tour.id === id);
}

export async function getTransfers(): Promise<Transfer[]> {
  return readJsonFile<Transfer[]>('transfers.json');
}

export async function getTransferById(
  id: string,
): Promise<Transfer | undefined> {
  const transfers = await getTransfers();
  return transfers.find(transfer => transfer.id === id);
}

export async function getStores(): Promise<Store[]> {
  return readJsonFile<Store[]>('stores.json');
}

export async function getStoreById(id: string): Promise<Store | undefined> {
  const stores = await getStores();
  return stores.find(store => store.id === id);
}

export async function getReferencedItem(
  type: Event['referenced_item_type'],
  id: string,
) {
  switch (type) {
    case 'attraction':
      return getAttractionById(id);
    case 'flight':
      return getFlightById(id);
    case 'accommodation':
      return getAccommodationById(id);
    case 'tour':
      return getTourById(id);
    case 'transfer':
      return getTransferById(id);
    case 'store':
      return getStoreById(id);
    default:
      return null;
  }
}
