import { Paper } from "@mui/material";
import HeaderSection from "../../dashboard/HeaderSection";

interface PDFViewerProps {
  offerID?: string;
  fileName?: string;
  width?: string;
  height?: string;
  className?: string;
}

const PDFViewer: React.FC<PDFViewerProps> = ({
  width = "100%",
  height = "600px",
  className = "color: white",
}) => {
  return (
    <Paper sx={styles.paper}>
      <HeaderSection titletext="ANGEBOT PDF" />
      <div
        className={`pdf-viewer-container ${className}`}
        style={{ backgroundColor: "white" }}
      >
        <iframe
          src={`${fileName}#toolbar=0`}
          width={width}
          height={height}
          title="PDF Viewer"
        />
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
};
