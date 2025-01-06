import Box from "@mui/material/Box";
import TenderCard from "./TenderCard";
import { Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { currentUser } from "@/lib/features/userSlice";
import { scrollBarStyles } from "@/components/scrollbar/Scrollbar";
import { BuildingTenders, Tender } from "../../tenders/tender_card/types";
import { setTenderNumbers, setTenders } from "@/lib/features/tenderSlice";
import userAPIs from "@/api/user";

const TenderCardList: React.FC = () => {
  const dispatch = useDispatch();
  const [tendersInBuilding, setTendersInBuildings] = useState<
    BuildingTenders[]
  >([]);

  const user = useSelector(currentUser);

  useEffect(() => {
    getBuildings();
  }, []);

  const getBuildings = async (): Promise<void> => {
    const buildingTendersList = await userAPIs.getUserTenders(user?.id);
    setTendersInBuildings(buildingTendersList?.data);

    const allTenders: Tender[] = [];
    buildingTendersList?.data?.forEach((buildingTenders: BuildingTenders) => {
      buildingTenders.tenders?.forEach((tender: Tender) => {
        allTenders.push(tender);
      });
    });

    dispatch(setTenders(allTenders));

    const totalTenders = buildingTendersList.data.reduce(
      (total: number, building: BuildingTenders) =>
        total + (building?.tenders?.length || 0),
      0
    );
    dispatch(setTenderNumbers(totalTenders));
  };

  const renderSortedTenders = (
    tendersInBuilding: BuildingTenders[]
  ): React.ReactNode => {
    if (!Array.isArray(tendersInBuilding) || tendersInBuilding.length === 0) {
      return (
        <Box sx={styles.noDataContainer}>
          <Typography
            component="a"
            variant="subtitle2"
            style={{ textDecoration: "none", fontSize: "1.50rem" }}
          >
            Keine Aufträge vorhanden
          </Typography>
        </Box>
      );
    }

    // Extract tenders and include building details
    const allTendersWithBuilding = tendersInBuilding.flatMap((building) =>
      (building.tenders || []).map((tender) => ({
        ...tender,
        buildingName: building.buildingName,
        buildingAdress: building.buildingAdress,
      }))
    );

    // Sort tenders by urgency and createdAt
    const sortedTenders = allTendersWithBuilding.sort((a, b) => {
      // Sort by urgency: "URGENT" comes first
      if (a.urgency === "URGENT" && b.urgency !== "URGENT") return -1;
      if (a.urgency !== "URGENT" && b.urgency === "URGENT") return 1;

      // Sort by createdAt: most recent first
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    // Render the sorted tenders
    return sortedTenders.map((tender, index) => (
      <TenderCard
        key={tender.id || index}
        tender={tender}
        buildingName={tender.buildingName}
        buildingAdress={tender.buildingAdress}
      />
    ));
  };

  return (
    <Box sx={styles.listContainer}>
      {renderSortedTenders(tendersInBuilding)}
    </Box>
  );
};

export default TenderCardList;

// Styles
const styles = {
  listContainer: {
    display: "flex",
    flexDirection: "row",
    gap: "1.25rem",
    paddingBottom: "0.65rem",
    paddingTop: "1rem",
    px: "0.2rem",
    overflowX: "auto",
    ...scrollBarStyles,
  },
  noDataContainer: {
    display: "flex",
    height: "20rem",
    justifyContent: "center",
    flexDirection: "column",
    textAlign: "center",
  },
};
