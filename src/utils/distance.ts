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
const MAPS_POLL_INTERVAL_MS = 100;
const MAPS_LOAD_TIMEOUT_MS = 10000;
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

const isMapsReady = (): boolean =>
  typeof window !== "undefined" && Boolean(window.google?.maps?.Geocoder);

// The Maps script is added to the layout with `async`, so it can still be
// loading when a screen first asks for a distance.
const waitForMaps = (): Promise<void> =>
  new Promise((resolve, reject) => {
    const startedAt = Date.now();
    const check = (): void => {
      if (isMapsReady()) {
        resolve();
      } else if (Date.now() - startedAt > MAPS_LOAD_TIMEOUT_MS) {
        reject(new Error("Google Maps did not load in time"));
      } else {
        setTimeout(check, MAPS_POLL_INTERVAL_MS);
      }
    };
    check();
  });

const geocode = (address: string): Promise<Coordinates> => {
  const cached = coordinatesCache.get(address);
  if (cached) {
    return cached;
  }
  const request = waitForMaps()
    .then(() => geocodeByAddress(address))
    .then((results) => getLatLng(results[0]));
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
