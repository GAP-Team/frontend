import Box from "@mui/material/Box";
import tenderAPIs from "@/api/tender";
import TenderCard from "./TenderCard";
import { Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { currentUser } from "@/lib/features/userSlice";
import { BuildingTenders } from "../../tenders/tender_card/types";
import { setTenderNumbers } from "@/lib/features/tenderSlice";
import { scrollBarStyles } from "@/components/scrollbar/Scrollbar";

const TenderCardList: React.FC = () => {
  const [buildings, setBuildings] = useState<BuildingTenders[]>([]);
  const dispatch = useDispatch();

  const user = useSelector(currentUser);

  useEffect(() => {
    getBuildings();
  }, [user?.id]);

  const getBuildings = async (): Promise<void> => {
    const buildings = await tenderAPIs.getTenders(user?.id);
    setBuildings(buildings?.data);

    const totalTenders = buildings.data.reduce(
      (total: any, building: any) => total + (building?.tenders?.length || 0),
      0
    );
    dispatch(setTenderNumbers(totalTenders));
  };

  const renderSortedTenders = (buildings: BuildingTenders[]): React.ReactNode => {
    if (!Array.isArray(buildings) || buildings.length === 0) {
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
    const allTendersWithBuilding = buildings.flatMap((building) =>
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

  return <Box sx={styles.listContainer}>{renderSortedTenders(buildings)}</Box>;
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
