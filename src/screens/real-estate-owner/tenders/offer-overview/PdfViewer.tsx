import { useEffect, useState } from "react";
import { Box, CircularProgress, Paper, Typography } from "@mui/material";
import HeaderSection from "@/screens/real-estate-owner/dashboard/HeaderSection";
import s3API from "@/api/s3";
import logger from "@/utils/Logger";

interface PDFViewerProps {
  documentKey?: string;
}

const RENDER_SCALE = 2.5;

// Rasterizes every page, so the offer is shown as images instead of in the
// browser's PDF viewer.
const renderPagesAsImages = async (data: ArrayBuffer): Promise<string[]> => {
  const pdfjs = await import("pdfjs-dist");
  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.js",
    import.meta.url
  ).toString();
  const source = await pdfjs.getDocument({ data }).promise;
  const images: string[] = [];
  for (let pageNo = 1; pageNo <= source.numPages; pageNo++) {
    const page = await source.getPage(pageNo);
    const viewport = page.getViewport({ scale: RENDER_SCALE });
    const canvas = document.createElement("canvas");
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const canvasContext = canvas.getContext("2d") as CanvasRenderingContext2D;
    await page.render({ canvasContext, viewport }).promise;
    images.push(canvas.toDataURL("image/jpeg", 0.85));
  }
  return images;
};

const PDFViewer: React.FC<PDFViewerProps> = ({ documentKey }) => {
  const [pages, setPages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!documentKey) return;
    let isActive = true;
    const loadDocument = async (): Promise<void> => {
      try {
        const file = await s3API.getFile(documentKey);
        const images = await renderPagesAsImages(
          await new Blob([file.data]).arrayBuffer()
        );
        if (isActive) setPages(images);
      } catch (error) {
        logger.error("Failed to load offer document", error);
        if (isActive) setFailed(true);
      } finally {
        if (isActive) setLoading(false);
      }
    };
    loadDocument();
    return () => {
      isActive = false;
    };
  }, [documentKey]);

  const renderContent = (): JSX.Element => {
    if (loading) return <CircularProgress />;
    if (failed) {
      return (
        <Typography variant="body2" color="error">
          Das Angebot konnte nicht geladen werden
        </Typography>
      );
    }
    return (
      <>
        {pages.map((page, index) => (
          <Box
            key={page}
            component="img"
            src={page}
            alt={`Angebot Seite ${index + 1}`}
            sx={styles.page}
          />
        ))}
      </>
    );
  };

  return (
    <Paper sx={styles.paper}>
      <HeaderSection titletext="ANGEBOT PDF" />
      <Box sx={styles.pdfViewerContainer}>{renderContent()}</Box>
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
    height: "100%",
    maxHeight: "75vh",
    overflowY: "auto",
    bgcolor: "white",
  },
  page: {
    display: "block",
    width: "100%",
    mb: 1,
  },
};
