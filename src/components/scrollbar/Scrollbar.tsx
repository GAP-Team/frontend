export const scrollBarStyles = {
  "&::-webkit-scrollbar": {
    width: "8px",
    height: "4px",
    backgroundColor: "transparent", // Ensures scrollbar is fully transparent initially
  },
  "&:hover::-webkit-scrollbar": {
    backgroundColor: "rgba(35, 86, 255, 0.1)", // Visible on hover with a subtle blue background
  },
  "&::-webkit-scrollbar-track": {
    borderRadius: "12px",
    backgroundColor: "transparent", // Keeps track fully transparent initially
  },
  "&:hover::-webkit-scrollbar-track": {
    backgroundColor: "rgba(35, 86, 255, 0.05)", // Track becomes visible on hover with a very light blue
  },
  "&::-webkit-scrollbar-thumb": {
    borderRadius: "12px",
    backgroundColor: "transparent", // Keeps thumb fully transparent initially
  },
  "&:hover::-webkit-scrollbar-thumb": {
    backgroundImage: "linear-gradient(180deg, #2356FF 0%, #637bFF 100%)", // Gradient from custom blue to lighter blue
    backgroundColor: "rgba(35, 86, 255, 0.3)", // Thumb becomes solid on hover with a translucent blue
  },
};
