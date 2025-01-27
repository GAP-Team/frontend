export const getTenderStatusStyle: {
  [key: string]: { bgcolor: string; color: string; title: string };
} = {
  OPEN: { bgcolor: "#E7E0FF", color: "#582EFF", title: "offen" },
  DONE: { bgcolor: "#E5F5FA", color: "#22A7F1", title: "abgeschlossen" },
  ACTIVE: { bgcolor: "#96E9CB", color: "#056643", title: "Aktiv" },
  REVIEW_REQUIRED: {
    bgcolor: "#FFE1D7",
    color: "#EB4444",
    title: "Nachprüfung",
  },
};

export const calculateStrength = (password: string): Promise<number> => {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;
  return Promise.resolve(score);
};

export const getPasswordStrengthLabel = (passwordStrength: number): string => {
  switch (passwordStrength) {
    case 1:
    case 2:
      return "Schwach";
    case 3:
      return "Medium";
    case 4:
      return "Stark";
    case 5:
      return "Sehr Stark";
    default:
      return "Sehr Schwach";
  }
};

export const getPasswordStrengthColor = (passwordStrength: number): string => {
  switch (passwordStrength) {
    case 1:
    case 2:
      return "red";
    case 3:
      return "orange";
    case 4:
      return "green";
    case 5:
      return "darkgreen";
    default:
      return "gray";
  }
};
