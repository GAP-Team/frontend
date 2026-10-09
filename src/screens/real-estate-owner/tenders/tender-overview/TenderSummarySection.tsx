"use client";

import HeaderSection from "@/screens/real-estate-owner/dashboard/HeaderSection";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import GButton from "@/components/inputs/button/GButton";
import { useRouter } from "next/navigation";
import LabelText from "@/components/data-display/label/LabelText";
import { Tender } from "./types";
import { TENDER_FORM } from "@/utils/enums";
import { useAppSelector } from "@/lib/hooks";
import { ROUTES } from "@/utils/routes";
import { useReturnTo } from "@/hooks/useReturnTo";
import { withReturnTo } from "@/utils/returnTo";
import { BuildingAddress } from "@/screens/real-estate-owner/buildings/building-overview/types";
import { formatAddress } from "@/utils/distance";
import { Facility } from "@/screens/real-estate-owner/facilities/facility-overview/types";

interface TenderSummarySectionProps {
  tender?: Tender | null;
  buildingAddress?: BuildingAddress;
}

const TenderSummarySection: React.FC<TenderSummarySectionProps> = ({
  tender,
  buildingAddress,
}) => {
  const router = useRouter();
  const returnTo = useReturnTo();
  const { facilities } = useAppSelector((state) => state.facility);
  const subcategory = facilities.find(
    (facility: Facility) => facility.id === tender?.facility?.id
  )?.subcategory;

  // Prepare summary data
  const summaryData = [
    { label: "Name des Auftraggebers", value: tender?.clientName },
    {
      label: "Ausschreibungsart",
      value:
        tender?.tenderForm === TENDER_FORM.CRAFTSMAN
          ? "Handwerker"
          : "Sachverständigen",
    },
    { label: "Ausschreibungstyp", value: tender?.tenderType },
    { label: "Objekt", value: tender?.building.name },
    {
      label: "Adresse des Objekts",
      value:
        buildingAddress && formatAddress({ ...buildingAddress, country: "" }),
    },
    { label: "Anlage", value: tender?.facility.name },
    { label: "Anlagetyp", value: subcategory },
    { label: "Dringlichkeit", value: tender?.urgency },
    {
      label: "Gewünschtes Zeitfenster",
      value:
        tender?.fromDate &&
        tender?.toDate &&
        `${new Date(tender?.fromDate).toLocaleDateString()} - ${new Date(
          tender?.toDate
        ).toLocaleDateString()}`,
    },
    {
      label: "Detailbeschreibung",
      value: tender?.detailDescription
        ? `${tender?.detailDescription.substring(0, 60)}...`
        : "",
    },
    {
      label: "Sicherheit Arbeit erforderlich",
      value: tender?.safetyWorkRequired ? "Ja" : "Nein",
    },
    {
      label: "Kostenlose Parkplätze",
      value: tender?.freeParkingAvailable ? "Ja" : "Nein",
    },
  ].filter((item) => item.value);

  const editHandler = (): void => {
    router.push(
      withReturnTo(ROUTES.REAL_ESTATE.TENDER.EDIT_TENDER(tender?.id), returnTo)
    );
  };

  const backHandler = (): void => {
    router.push(returnTo ?? ROUTES.REAL_ESTATE.TENDER.TENDERS);
  };

  return (
    <>
      <HeaderSection titletext="DATEN ÜBERPRÜFEN" />
      <Typography variant="bodymsb">Zusammenfassung</Typography>
      <Grid container spacing={2} marginLeft={1} pt={2}>
        {summaryData.map((item, index) => (
          <Grid item xs={6} key={index} paddingBottom={2}>
            <LabelText
              text={item.label}
              fontSize="1.2rem"
              textColor="blue.main"
            />
            <Typography variant="bodylr" mt="0.2rem">
              {item.value}
            </Typography>
          </Grid>
        ))}
      </Grid>
      <Divider variant="middle" orientation="horizontal" flexItem />
      <Grid
        container
        justifyContent="flex-end"
        spacing={2}
        marginTop={"0.4rem"}
      >
        <Grid item>
          <GButton color="gprimary" variant="outlined" onClick={backHandler}>
            Abbrechen
          </GButton>
          <GButton color="ggreen" onClick={editHandler}>
            Bearbeiten
          </GButton>
        </Grid>
      </Grid>
    </>
  );
};

export default TenderSummarySection;
