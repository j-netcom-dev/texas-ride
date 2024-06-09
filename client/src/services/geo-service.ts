export const getGeoPositionName = async ({
  lat,
  lng,
}: {
  lat: number;
  lng: number;
}): Promise<string | null> => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
    );
    const data = await response.json();
    if (data.results && data.results.length > 0) {
      return data.results[0].formatted_address;
    } else {
      console.error("No results found for the given coordinates.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching geolocation data:", error);
    return null;
  }
};
