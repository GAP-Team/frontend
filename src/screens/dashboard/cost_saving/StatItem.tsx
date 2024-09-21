// StatItem.tsx
import React from "react";
import { Stack, Typography } from "@mui/material";
import { ReactNode } from "react";

const StatItem = ({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string | number;
}) => (
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
      <Typography variant="bodylsb">{label}</Typography>
    </Stack>
    <Typography
      variant="h4b"
      fontSize="2.4rem"
      textAlign="right"
      color="#FECB00"
    >
      {value}
    </Typography>
  </Stack>
);

export default StatItem;
