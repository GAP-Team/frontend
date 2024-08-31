"use client";

import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

interface LabeledTextProps {
  text: string;
  fontSize?: string;
  textColor?: string;
}

const LabeledText: React.FC<LabeledTextProps> = ({
  text,
  fontSize = "1.2rem",
  textColor = "blue.main",
}) => {
  return (
    <Box sx={styles.iconTextContainer}>
      <Typography variant="bodylsb" fontSize={fontSize} color={textColor}>
        {text}
      </Typography>
    </Box>
  );
};

export default LabeledText;

const styles = {
  iconTextContainer: {
    display: "flex",
    alignItems: "center",
  },
};
