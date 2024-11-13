import Box from "@mui/material/Box";
import tenderAPIs from "@/api/tender";
import TenderCard from "./TenderCard";
import { Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { currentUser } from "@/lib/features/userSlice";
import { Building } from "../../tenders/tender_card/types";
import { setTenderNumbers } from "@/lib/features/tenderSlice";
import { scrollBarStyles } from "@/components/scrollbar/Scrollbar";

const TenderCardList: React.FC = () => {
  const [buildings, setBuildings] = useState<Building[]>([]);
  const dispatch = useDispatch();

  const user = useSelector(currentUser);

  useEffect(() => {
    getBuildings();
  }, [user?._id]);

  const getBuildings = async (): Promise<void> => {
    const buildings = await tenderAPIs.getTenders(user?._id);
    setBuildings(buildings.data);
    const totalTenders = buildings.data.reduce(
      (total: any, building: any) => total + (building.tenders?.length || 0),
      0
    );
    dispatch(setTenderNumbers(totalTenders));
  };

  return (
    <Box sx={styles.listContainer}>
      {buildings.length > 0 ? (
        buildings.map((building, buildingIndex) =>
          building.tenders.map((tender, tenderIndex) => (
            <TenderCard
              key={`${buildingIndex}-${tenderIndex}`}
              tender={tender}
              buildingName={building.buildingName}
              buildingAdress={building.buildingAdress}
            />
          ))
        )
      ) : (
        <Box sx={styles.noDataContainer}>
          <Typography
            component="a"
            variant="subtitle2"
            style={{ textDecoration: "none", fontSize: "1.50rem" }}
          >
            Keine Aufträge vorhanden
          </Typography>
        </Box>
      )}
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
    marginLeft: "38rem",
    marginBottom: "10rem",
    justifyContent: "center",
    flexDirection: "column",
  },
};