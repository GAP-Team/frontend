import { ListItem, Avatar, Typography, Box } from "@mui/material";
import { NewsItemProps } from "./types";

const NewsItem: React.FC<NewsItemProps> = ({
  companyName,
  numberOfMessages,
  location,
  minLeft,
  statusNew,
  avatarLetter,
}) => {
  const statusIndicatorStyle = {
    ...styles.statusIndicator,
    backgroundColor: statusNew ? "#3498db" : "transparent",
  };

  return (
    <ListItem alignItems="flex-start" sx={styles.listItem}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Avatar alt={avatarLetter}>{avatarLetter}</Avatar>
        <Box sx={styles.textContainer}>
          <Box>
            <Typography variant="bodylsb">{companyName}</Typography>
            <Typography
              variant="bodylsb"
              fontWeight={400}
            >{` hat ${numberOfMessages} Nachrichten gesendet.`}</Typography>
          </Box>
          <Typography
            variant="body2"
            color="text.secondary"
          >{`Anlagenerneuerung ${location} | ${minLeft} mins ago`}</Typography>
        </Box>
      </Box>
      <Box sx={statusIndicatorStyle} />
    </ListItem>
  );
};

export default NewsItem;

// Define the styles
const styles = {
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
  textContainer: {
    display: "flex",
    flexDirection: "column",
    ml: 1,
  },
  statusIndicator: {
    width: 10,
    height: 10,
    placeSelf: "center",
    borderRadius: "50%",
    backgroundColor: "transparent", // The actual color will be set conditionally in the component
  },
};
