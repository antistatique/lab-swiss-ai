import type { GeocodingApiResponse } from '@/types/GeocodingApi';

const placeFromLocations = (locations: GeocodingApiResponse) => {
  const result = locations.features.filter(i =>
    i.place_type.includes('postcode')
  )[0]?.place_name;
  return result;
};

export default placeFromLocations;
