// app/dashboard/tenders/[id]/page.tsx
"use client";

import { useParams } from "next/navigation";
import React from "react";
import Dashboard from "@/screens/dashboard/Dashboard";
import TenderDetails from "@/screens/dashboard/tenders/tender_card/TenderDetails";
import ReactStateUserLayout from "../../page";

export default function TenderOverview() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  return (
    <ReactStateUserLayout>
      <TenderDetails id={id} />
    </ReactStateUserLayout>
  );
}
