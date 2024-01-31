import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';
import { isNotNil } from 'ramda';

import type { GeocodingApiResponse } from '@/types/GeocodingApi';

export const getLocations = async (
  lat: number,
  lng: number
): Promise<GeocodingApiResponse> => {
  const { data } = await axios(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${lat},${lng}.json?access_token=${import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}`
  );
  return data;
};

const useLocations = (
  lat?: number,
  lng?: number
): UseQueryResult<GeocodingApiResponse, Error> =>
  useQuery({
    queryKey: ['location', lat, lng],
    queryFn: () => getLocations(lat as number, lng as number),
    enabled: isNotNil(lat) && isNotNil(lng),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

export default useLocations;
