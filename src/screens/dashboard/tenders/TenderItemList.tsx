// TenderItemList.tsx
import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import TenderItem from "./TenderItem";
import { Tender } from "./types";
import { Box } from "@mui/material";

interface TenderItemListProps {
  tenders: Tender[];
  itemsPerPage?: number;
}

const TenderItemList: React.FC<TenderItemListProps> = ({
  tenders,
  itemsPerPage = 8,
}) => {
  const [page, setPage] = useState<number>(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  // Calculate current page items
  const indexOfLastItem = page * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = tenders.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <Box sx={styles.container}>
      <Grid
        container
        spacing={"1.25rem"}
        // paddingBottom={1}
        sx={{ overflow: "auto", flexGrow: 1 }}
      >
        {currentItems.map((tender) => (
          <Grid item xs={12} md={6} lg={3} key={tender.id}>
            <TenderItem tender={tender} />
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={Math.ceil(tenders.length / itemsPerPage)}
        page={page}
        onChange={handleChange}
        color="primary"
        sx={styles.pagination}
      />
    </Box>
  );
};

export default TenderItemList;

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
