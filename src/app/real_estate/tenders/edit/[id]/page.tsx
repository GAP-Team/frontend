"use client";

import RealStateUserLayout from "../../../page";
import NewTender from "@/screens/dashboard/tenders/add_tender_form/NewTender";

export default function TenderOverview(): JSX.Element {
  return (
    <RealStateUserLayout>
      <NewTender />
    </RealStateUserLayout>
  );
}
