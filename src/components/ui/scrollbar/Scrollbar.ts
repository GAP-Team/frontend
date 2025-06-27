// Custom scrollbar styles for reusability across components
export const custom_styles = {
  "&::-webkit-scrollbar": {
    width: "6px",
    height: "6px",
  },
  "&::-webkit-scrollbar-track": {
    background: "transparent",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#888",
    borderRadius: "3px",
    "&:hover": {
      backgroundColor: "#666",
    },
  },
};
