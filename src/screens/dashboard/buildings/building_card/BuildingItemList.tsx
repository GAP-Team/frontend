// BuildingItemList.tsx
import { Building } from "./types";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import React, { useState } from "react";
import BuildingItem from "./BuildingItem";
import Pagination from "@mui/material/Pagination";

interface BuildingItemListProps {
  buildings: Building[];
  itemsPerPage?: number;
}

const BuildingItemList: React.FC<BuildingItemListProps> = ({
  buildings,
  itemsPerPage = 8,
}) => {
  const [page, setPage] = useState<number>(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  // Calculate current page items
  const indexOfLastItem = page * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = buildings.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <Box sx={styles.container}>
      <Grid
        container
        spacing={"1.25rem"}
        // paddingBottom={1}
        sx={{ overflow: "auto", flexGrow: 1 }}
      >
        {currentItems.map((building) => (
          <Grid item xs={12} md={6} lg={3} key={building._id}>
            <BuildingItem building={building} />
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={Math.ceil(buildings.length / itemsPerPage)}
        page={page}
        onChange={handleChange}
        color="primary"
        sx={styles.pagination}
      />
    </Box>
  );
};

export default BuildingItemList;

const styles = {
  container: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    height: "calc(100vh - 9.125rem)",
    px: "1.5rem",
    pt: "1.5rem",
    pb: 0,
    // Subtract height of header or any other top components if exist
  },
  pagination: {
    mt: "auto",
    py: 1,
    display: "flex",
    justifyContent: "center",
  },
};
