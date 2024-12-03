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
  const [buildings, setBuildings] = useState<BuildingTenders[]>([]);

  const user = useSelector(currentUser);

  useEffect(() => {
    getBuildings();
  }, [user?.id]);

  const getBuildings = async (): Promise<void> => {
    const buildingTenders = await userAPIs.getUserTenders(user?.id);
    setBuildings(buildingTenders?.data);
    const allTenders: Tender[] = [];
    buildingTenders?.data?.forEach((buildingTenders: BuildingTenders) => {
      buildingTenders.tenders?.forEach((tender: Tender) => {
        allTenders.push(tender);
      });
    });
    dispatch(setTenders(allTenders));

    const totalTenders = buildingTenders.data.reduce(
      (total: number, building: BuildingTenders) =>
        total + (building?.tenders?.length || 0),
      0
    );
    dispatch(setTenderNumbers(totalTenders));
  };

  return (
    <Box sx={styles.listContainer}>
      {buildings?.length > 0 ? (
        buildings?.map((building, buildingIndex) =>
          building?.tenders?.map((tender, tenderIndex) => (
            <TenderCard
              key={`${buildingIndex}-${tenderIndex}`}
              tender={tender}
              buildingName={building?.buildingName}
              buildingAdress={building?.buildingAdress}
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
