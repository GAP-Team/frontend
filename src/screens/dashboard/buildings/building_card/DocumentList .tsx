import s3API from "@/api/s3";
import { Document } from "@/typings/types";
import { useState, Fragment } from "react";
import { FiFileText } from "react-icons/fi";
import { Stack, Typography, CircularProgress, Divider } from "@mui/material";

interface DocumentListProps {
  title?: string;
  documentType?: string;
  documents: Document[];
}

const DocumentList: React.FC<DocumentListProps> = ({
  title,
  documents,
  documentType,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | undefined>();
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadFile = async (
    index: number,
    fileKey: string,
    fileName: string
  ): Promise<void> => {
    setSelectedIndex(index);
    setIsDownloading(true);

    const fileDetails = await s3API.getFile(fileKey);
    const url = window.URL.createObjectURL(
      new Blob([fileDetails.data], { type: "application/pdf" })
    );

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName);
    link.click();

    setIsDownloading(false);
  };

  const renderDocument = (document: Document, index: number): JSX.Element => (
    <Fragment key={index}>
      <Stack direction="row" alignItems="center" py="0.55rem" gap={2}>
        <FiFileText size="1.5rem" color="#22A7F1" />
        <Typography
          variant="body1"
          color="#22A7F1"
          onClick={() => handleDownloadFile(index, document.key, document.name)}
          sx={{
            cursor: "pointer",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            maxWidth: 200,
          }}
          title={document.name}
        >
          {document.name}
          {index === selectedIndex && isDownloading && (
            <CircularProgress
              color="primary"
              size={20}
              sx={{ mt: "5px", ml: "1rem" }}
            />
          )}
        </Typography>
      </Stack>
    </Fragment>
  );

  const filteredDocuments = documentType
    ? documents.filter((doc) => doc.documentType === documentType)
    : documents;

  if (!filteredDocuments.length) return null;

  return (
    <>
      {title && (
        <Typography variant="body1" color="black">
          {title}
        </Typography>
      )}
      {filteredDocuments.map(renderDocument)}
      {documentType && <Divider />}
    </>
  );
};

export default DocumentList;
