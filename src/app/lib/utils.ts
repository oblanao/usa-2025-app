import accommodations from '../../../data/accommodations.json';

export function calculateNightsForPlace(placeId: string): number {
  // Find accommodation for the given place
  const accommodation = accommodations.find(acc => acc.place === placeId);
  
  if (!accommodation) {
    console.warn(`No accommodation found for place: ${placeId}`);
    return 1; // Fallback to 1 night
  }

  // Parse check-in and check-out timestamps
  const checkInDate = new Date(accommodation.timestamp_checkin_local_time);
  const checkOutDate = new Date(accommodation.timestamp_checkout_local_time);

  // Calculate the difference in milliseconds
  const timeDifference = checkOutDate.getTime() - checkInDate.getTime();
  
  // Convert to days and round to nearest whole number
  const nights = Math.round(timeDifference / (1000 * 60 * 60 * 24));
  
  // Ensure at least 1 night
  return Math.max(nights, 1);
}
