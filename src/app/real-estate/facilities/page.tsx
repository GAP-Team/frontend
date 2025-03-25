import FacilityOverview from "@/screens/dashboard/facilities/FacilityOverview";
type Props = {
  searchParams: { id?: string };
};

export default function FacilitiesPage({ searchParams }: Props): JSX.Element {
  return <FacilityOverview facilityId={searchParams.id} />;
}
