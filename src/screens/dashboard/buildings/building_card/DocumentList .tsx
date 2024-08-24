import { useState } from "react";
import List from "@mui/material/List";
import Stack from "@mui/material/Stack";
import { FiFileText } from "react-icons/fi";
import Typography from "@mui/material/Typography";
import { CircularProgress, Divider } from "@mui/material";

import s3APIs from "@/api/s3";
import { Document } from "./types";
import { scrollBarStyles } from "@/components/scrollbar/Scrollbar";
import { Fragment } from "react";

interface DocumentListProps {
  title: string;
  documentType: string;
  documents: Document[];
}

const DocumentList: React.FC<DocumentListProps> = ({
  title,
  documentType,
  documents,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | undefined>(undefined);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  const handleDownloadFile = async (
    selectedIndex: number,
    fileKey: string,
    fileName: string
  ) => {
    setSelectedIndex(selectedIndex);
    setIsDownloading(true);

    let fileDetails = await s3APIs.getFile(fileKey);

    const url = window.URL.createObjectURL(
      new Blob([fileDetails.data], { type: "application/pdf" })
    );

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName);

    link.click();

    setIsDownloading(false);
  };

  return (
    <List sx={{ ...styles.listContainer }}>
      {documents?.filter((doc) => doc.documentType === documentType).length > 0 && (
        <Typography variant="body1" color="black">
          {title}
        </Typography>
      )}

      {documents
        ?.filter((doc) => doc.documentType === documentType)
        .map((document, index) => (
          <Fragment key={index}>
            <Stack direction="row" alignItems="center" py="0.55rem" gap={2}>
              <FiFileText size="1.5rem" color="#22A7F1" />
              <Typography
                variant="body1"
                color="#22A7F1"
                onClick={() => handleDownloadFile(index, document.key, document.name)}
                style={{
                  cursor: "pointer",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  maxWidth: "200px",
                }}
                title={document.name}
              >
                {document.name}
                {index === selectedIndex && isDownloading && (
                  <CircularProgress
                    color="primary"
                    size={20}
                    style={{ marginTop: "5px", marginLeft: "1rem" }}
                  />
                )}
              </Typography>
            </Stack>
          </Fragment>
        ))}

      {documents?.filter((doc) => doc.documentType === documentType).length > 0 && <Divider />}
    </List>
  );
};

export default DocumentList;

// Styles
const styles = {
  listContainer: {
    flexGrow: 1,
    paddingTop: "0.5rem",
    overflow: "auto",
    paddingRight: "0.65rem",
    ...scrollBarStyles,
  },
};
