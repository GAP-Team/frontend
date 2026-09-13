// BuildingHierarchyList.tsx
import React from "react";
import Stack from "@mui/material/Stack";
import { SxProps } from "@mui/material/styles";
import { Building } from "./types";
import BuildingRow from "./BuildingRow";
import { styles as scrollbarStyles } from "@/components/utils/scrollbar/styles";

interface BuildingHierarchyListProps {
  buildings: Building[];
}

const BuildingHierarchyList: React.FC<BuildingHierarchyListProps> = ({
  buildings,
}) => {
  return (
    <Stack sx={styles.container} gap={1.25}>
      {buildings.map((building) => (
        <BuildingRow key={building.id} building={building} />
      ))}
    </Stack>
  );
};

export default BuildingHierarchyList;

// Styles
const styles: { container: SxProps } = {
  container: {
    overflow: "auto",
    height: "calc(100vh - 9.125rem)",
    px: "1.5rem",
    pt: "1.5rem",
    pb: "1.5rem",
    ...scrollbarStyles,
  },
};
