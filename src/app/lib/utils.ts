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

export function getPlaceDateRangeLabel(placeId: string): string {
  const accommodation = accommodations.find(acc => acc.place === placeId);

  if (!accommodation) {
    console.warn(`No accommodation found for place: ${placeId}`);
    return '';
  }

  // Parse the local date parts directly to avoid timezone shifts
  const startStr = accommodation.timestamp_checkin_local_time.slice(0, 10); // YYYY-MM-DD
  const endStr = accommodation.timestamp_checkout_local_time.slice(0, 10); // YYYY-MM-DD

  const [startYearStr, startMonthStr, startDayStr] = startStr.split('-');
  const [endYearStr, endMonthStr, endDayStr] = endStr.split('-');

  const startYear = Number(startYearStr);
  const endYear = Number(endYearStr);
  const startMonth = Number(startMonthStr); // 1-12
  const endMonth = Number(endMonthStr);
  const startDay = Number(startDayStr);
  const endDay = Number(endDayStr);

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const sameYear = startYear === endYear;
  const sameMonth = sameYear && startMonth === endMonth;

  if (sameYear && sameMonth) {
    // Aug 26 - 30, 2025
    return `${months[startMonth - 1]} ${startDay} - ${endDay}, ${startYear}`;
  }

  if (sameYear) {
    // Aug 30 - Sep 5, 2025
    return `${months[startMonth - 1]} ${startDay} - ${months[endMonth - 1]} ${endDay}, ${startYear}`;
  }

  // Cross-year: Dec 30, 2025 - Jan 2, 2026
  return `${months[startMonth - 1]} ${startDay}, ${startYear} - ${months[endMonth - 1]} ${endDay}, ${endYear}`;
}