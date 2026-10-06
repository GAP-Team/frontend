import { geocodeByAddress, getLatLng } from "react-places-autocomplete";

interface Coordinates {
  lat: number;
  lng: number;
}

export interface PostalAddress {
  street?: string;
  houseNumber?: number;
  zip?: number;
  city: string;
  country: string;
}

const EARTH_RADIUS_KM = 6371;
const coordinatesCache = new Map<string, Promise<Coordinates>>();

const toRadians = (degrees: number): number => (degrees * Math.PI) / 180;

export const formatAddress = ({
  street,
  houseNumber,
  zip,
  city,
  country,
}: PostalAddress): string => {
  const streetLine = [street, houseNumber].filter(Boolean).join(" ");
  const cityLine = [zip, city].filter(Boolean).join(" ");
  return [streetLine, cityLine, country].filter(Boolean).join(", ");
};

const geocode = (address: string): Promise<Coordinates> => {
  const cached = coordinatesCache.get(address);
  if (cached) {
    return cached;
  }
  const request = geocodeByAddress(address).then((results) =>
    getLatLng(results[0])
  );
  // Do not cache failures, so a later attempt can retry.
  request.catch(() => coordinatesCache.delete(address));
  coordinatesCache.set(address, request);
  return request;
};

const haversineKm = (from: Coordinates, to: Coordinates): number => {
  const dLat = toRadians(to.lat - from.lat);
  const dLng = toRadians(to.lng - from.lng);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(from.lat)) *
      Math.cos(toRadians(to.lat)) *
      Math.sin(dLng / 2) ** 2;
  return 2 * EARTH_RADIUS_KM * Math.asin(Math.sqrt(a));
};

/** Straight-line distance in km between two postal addresses. */
export const getDistanceKm = async (
  from: PostalAddress,
  to: PostalAddress
): Promise<number> => {
  const [fromCoordinates, toCoordinates] = await Promise.all([
    geocode(formatAddress(from)),
    geocode(formatAddress(to)),
  ]);
  return haversineKm(fromCoordinates, toCoordinates);
};

export const formatDistance = (km: number): string =>
  `${km.toLocaleString("de-DE", { maximumFractionDigits: 1 })} km`;
