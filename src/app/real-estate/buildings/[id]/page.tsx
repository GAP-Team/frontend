// app/dashboard/tenders/[id]/page.tsx
"use client";

import { useParams } from "next/navigation";
import React from "react";
import Dashboard from "@/screens/dashboard/Dashboard";
import NewBuilding from "@/screens/dashboard/buildings/add_building_form/NewBuilding";
import TenderDetails from "@/screens/dashboard/tenders/tender_card/TenderDetails";
import ReactStateUserLayout from "../../page";

export default function UpdatedBuilding() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  return (
    <ReactStateUserLayout>
      <NewBuilding id={id} />
    </ReactStateUserLayout>
  );
}
