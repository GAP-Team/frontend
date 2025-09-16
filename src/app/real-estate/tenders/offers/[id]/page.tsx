"use client";
import { useParams } from "next/navigation";
import OfferOverview from "@/screens/real-estate-owner/tenders/offer-overview/OfferOverview";

export default function OfferDetailPage(): JSX.Element {
  const params = useParams();
  const offerID = Array.isArray(params.id) ? params.id[0] : params.id;
  return <OfferOverview offerID={offerID} />;
}
