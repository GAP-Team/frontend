"use client";
import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

interface CustomLinearProgressBarProps {
  value: number;
  maxValue?: number;
}

const CustomLinearProgressBar = styled(
  LinearProgress
)<CustomLinearProgressBarProps>(({ theme, value }) => ({
  width: "15rem",
  height: "8px",
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: value < 10 ? "#FFE1D7" : "#96E9CB", // Grey for the unfilled area
    ...(theme.palette.mode === "dark" && {
      backgroundColor: theme.palette.grey[800],
    }),
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: value < 10 ? "#ff3d00" : "#388e3c", // Red if value < 100, green if >= 100
    ...(theme.palette.mode === "dark" && {
      backgroundColor: value < 10 ? "#d32f2f" : "#388e3c", // Dark mode red/green adjustment
    }),
  },
}));

export default function GProgressLinearBar({
  value,
  maxValue = 1000,
}: CustomLinearProgressBarProps) {
  const normalizedValue = (value / maxValue) * 100;

  return (
    <CustomLinearProgressBar variant="determinate" value={normalizedValue} />
  );
}
