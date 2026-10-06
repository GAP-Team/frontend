import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface GEmptyStateProps {
  text: string;
  description?: string;
  compact?: boolean;
}

const GEmptyState: React.FC<GEmptyStateProps> = ({
  text,
  description,
  compact = false,
}) => {
  return (
    <Box sx={emptyStateStyles}>
      <Typography
        variant="subtitle2"
        sx={compact ? compactTextStyles : { fontSize: "1.5rem" }}
      >
        {text}
      </Typography>
      {description && (
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
          {description}
        </Typography>
      )}
    </Box>
  );
};

export default GEmptyState;

const emptyStateStyles = {
  display: "grid",
  placeItems: "center",
  textAlign: "center",
  flex: 1,
  width: "100%",
  minHeight: "10rem",
};

const compactTextStyles = {
  fontSize: "1rem",
  fontWeight: 400,
};
