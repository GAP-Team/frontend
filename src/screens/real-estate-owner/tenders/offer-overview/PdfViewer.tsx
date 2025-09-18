import { Box, Paper } from "@mui/material";
import HeaderSection from "@/screens/real-estate-owner/dashboard/HeaderSection";

interface PDFViewerProps {
  offerID?: string;
  fileName?: string;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ fileName }) => {
  return (
    <Paper sx={styles.paper}>
      <HeaderSection titletext="ANGEBOT PDF" />
      <div
        className={`pdf-viewer-container`}
        style={{ backgroundColor: "white" }}
      >
        <Box sx={styles.pdfViewerContainer}>
          <iframe src={`${fileName}#toolbar=0`} title="PDF Viewer" />
        </Box>
      </div>
    </Paper>
  );
};
export default PDFViewer;

//Styles
const styles = {
  paper: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "false",
    width: "100%",
    borderRadius: "0.8rem",
    p: "1.25rem",
  },

  pdfViewerContainer: {
    width: "100%",
    height: "600px",
  },
};
