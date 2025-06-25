import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

interface CustomDialogProps {
  open: boolean;
  handleClose: () => void;
  title: string;
  content: string;
  buttonText?: string;
}

const CustomDialog: React.FC<CustomDialogProps> = ({
  open,
  handleClose,
  title,
  content,
  buttonText = "Schließen",
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Dialog fullScreen={fullScreen} open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography>{content}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          {buttonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomDialog;
