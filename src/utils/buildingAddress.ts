import { BuildingAddress } from "@/screens/real-estate-owner/buildings/building-overview/types";
import { NewBuildingFields } from "@/screens/real-estate-owner/tenders/tender-form/types";

const normalize = (value: string | number | undefined | null): string =>
  String(value ?? "")
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase();

// A building is uniquely identified by its address (street, house number, zip, city).
export const isSameAddress = (
  address: Partial<BuildingAddress> | undefined,
  candidate: NewBuildingFields
): boolean =>
  !!address &&
  normalize(address.street) === normalize(candidate.street) &&
  normalize(address.houseNumber) === normalize(candidate.houseNumber) &&
  normalize(address.zip) === normalize(candidate.zip) &&
  normalize(address.city) === normalize(candidate.city);

export const DUPLICATE_ADDRESS_MESSAGE =
  "Ein Gebäude mit dieser Adresse existiert bereits.";
