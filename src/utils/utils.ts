export const tenderStatusStyles: {
    [key: string]: { bgcolor: string; color: string; title: string };
  } = {
    OPEN: { bgcolor: "#E7E0FF", color: "#582EFF", title: "öffen" },
    DONE: { bgcolor: "#E5F5FA", color: "#22A7F1", title: "abgeschlossen" },
    ACTIVE: { bgcolor: "#96E9CB", color: "#056643", title: "Aktiv" },
    REVIEW_REQUIRED: {
      bgcolor: "#FFE1D7",
      color: "#EB4444",
      title: "Nachprüfung",
    },
  };