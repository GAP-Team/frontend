"use client";

import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { IconType } from "react-icons";

interface LabelTextWithIconProps {
  text: string;
  Icon: IconType;
  iconColor?: string;
  iconSize?: string;
  fontSize?: string;
  textColor?: string;
  iconMarginLeft?: string;
}

const LabelTextWithIcon: React.FC<LabelTextWithIconProps> = ({
  text,
  Icon,
  iconColor = "#22A7F1",
  iconSize = "1.5rem",
  fontSize = "1.2rem",
  textColor = "blue.main",
  iconMarginLeft = "0.8rem",
}) => {
  const StyledIcon = styled(Icon)({
    fontSize: iconSize,
    cursor: "pointer",
    color: iconColor,
    marginLeft: iconMarginLeft,
  });

  return (
    <Box sx={styles.iconTextContainer}>
      <Typography variant="bodylsb" fontSize={fontSize} color={textColor}>
        {text}
      </Typography>
      <StyledIcon />
    </Box>
  );
};

export default LabelTextWithIcon;

const styles = {
  iconTextContainer: {
    display: "flex",
    alignItems: "center",
  },
};
