import { ListItem, Avatar, Typography, Box } from "@mui/material";
import { ApplicationItemProps } from "./types";
import { PiArrowBendDownRightBold } from "react-icons/pi";

const ApplicationItem: React.FC<ApplicationItemProps> = ({
  companyName,
  timeAgo,
  location,
  projectID,
  price,
  statusColor,
  avatarLetter,
}) => {
  return (
    <ListItem
      alignItems="flex-start"
      sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Avatar>{avatarLetter}</Avatar>
        <Box sx={{ display: "flex", flexDirection: "column", ml: 1 }}>
          <Typography variant="bodylsb">{companyName}</Typography>
          <Typography variant="body2" color="text.secondary">
            {timeAgo}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", ml: 1 }}>
          <Typography variant="bodylsb">{location}</Typography>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <PiArrowBendDownRightBold color="#A0ADB1" />
            <Typography variant="body2" sx={{ ml: 1 }}>
              {projectID}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Typography variant="bodylsb">{price + " €"}</Typography>
      <Box
        sx={{
          width: 10,
          height: 10,
          borderRadius: "50%",
          backgroundColor: statusColor,
        }}
      />
    </ListItem>
  );
};

export default ApplicationItem;