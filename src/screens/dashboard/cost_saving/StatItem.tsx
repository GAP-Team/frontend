import { Stack, Typography } from "@mui/material";
import { ReactNode, FC } from "react";
import { StatItemProps } from "./types";

const StatItem: FC<StatItemProps> = ({ icon, label, value }) => (
  <Stack
    direction="row"
    alignItems="center"
    gap={2}
    justifyContent="space-between"
    width="100%"
  >
    <Stack
      direction="row"
      alignItems="center"
      gap={2}
      justifyContent="flex-start"
      flexGrow={1}
    >
      {icon}
      <Typography variant="body1" fontWeight="bold">
        {label}
      </Typography>
    </Stack>
    <Typography
      variant="h4"
      fontSize="2.4rem"
      textAlign="right"
      color="#FECB00"
    >
      {value}
    </Typography>
  </Stack>
);

export default StatItem;
