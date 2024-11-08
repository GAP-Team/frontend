import Box from "@mui/material/Box";
import tenderAPIs from "@/api/tender";
import TenderCard from "./TenderCard";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { currentUser } from "@/lib/features/userSlice";
import { Building } from "../../tenders/tender_card/types";
import { setTenderNumbers } from "@/lib/features/tenderSlice";
import NoContentPage from "@/components/common/NoContentPage";
import addTenderSrc from "@../../../public/icons/add_tender.svg";
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
          <NoContentPage
            width={100}
            height={100}
            alt="No Tenders"
            image={addTenderSrc}
            title="Erstelle eine neue Ausschreibung."
            buttonLabel="Ausschreibung erstellen"
            buttonLink="/real_estate/tenders/add"
          />
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
    marginLeft: "32.5rem",
    justifyContent: "center",
    flexDirection: "column",
  },
};
