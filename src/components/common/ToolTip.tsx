import * as React from "react";
import { styled } from "@mui/material/styles";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} placement="left" />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 250,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}));

interface CustomizedTooltipsProps {
  title: React.ReactNode;
  children: React.ReactElement;
}

export default function CustomizedTooltips({
  title,
  children,
}: CustomizedTooltipsProps): JSX.Element {
  return <HtmlTooltip title={title}>{children}</HtmlTooltip>;
}
