// BuildingDocuments.tsx
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { SxProps } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { FiFileText } from "react-icons/fi";
import s3API from "@/api/s3";
import { Document } from "@/typings/types";
import { DOCUMENT_TYPE } from "@/utils/enums";

interface BuildingDocumentsProps {
  documents: Document[];
}

interface DocumentCategory {
  type: string;
  label: string;
  accentColor: string;
}

const CATEGORIES: DocumentCategory[] = [
  {
    type: DOCUMENT_TYPE.CONSTRUCTION_DOCUMENTS,
    label: "Bauunterlagen",
    accentColor: "#22A7F1",
  },
  {
    type: DOCUMENT_TYPE.FLOOR_PLANS,
    label: "Grundrisse",
    accentColor: "#22BC7E",
  },
  {
    type: DOCUMENT_TYPE.OTHER,
    label: "Sonstige Dokumente",
    accentColor: "#8D999C",
  },
];

const downloadDocument = async (doc: Document): Promise<void> => {
  const file = await s3API.getFile(doc.key);
  const url = window.URL.createObjectURL(
    new Blob([file.data], { type: "application/pdf" })
  );
  const link = window.document.createElement("a");
  link.href = url;
  link.setAttribute("download", doc.name);
  link.click();
};

const BuildingDocuments: React.FC<BuildingDocumentsProps> = ({ documents }) => {
  const [downloadingKey, setDownloadingKey] = useState<string | null>(null);

  const handleDownload = async (doc: Document): Promise<void> => {
    setDownloadingKey(doc.key);
    try {
      await downloadDocument(doc);
    } finally {
      setDownloadingKey(null);
    }
  };

  const categorized = CATEGORIES.map((category) => ({
    ...category,
    documents: documents.filter((doc) => doc.documentType === category.type),
  })).filter((category) => category.documents.length > 0);

  if (categorized.length === 0) return null;

  return (
    <Box sx={styles.container}>
      <Typography variant="bodymsb" sx={styles.title}>
        Dokumente
      </Typography>
      <Stack gap={1.25}>
        {categorized.map((category) => (
          <Box key={category.type}>
            <Stack direction="row" alignItems="center" gap={0.75} mb={0.5}>
              <Box
                sx={{ ...styles.categoryDot, bgcolor: category.accentColor }}
              />
              <Typography variant="bodysb" color="#8D999C">
                {category.label}
              </Typography>
            </Stack>
            <Stack direction="row" flexWrap="wrap" gap={0.75}>
              {category.documents.map((doc) => (
                <Chip
                  key={doc.key}
                  clickable
                  onClick={() => handleDownload(doc)}
                  icon={
                    downloadingKey === doc.key ? (
                      <CircularProgress size={14} sx={styles.spinner} />
                    ) : (
                      <FiFileText size="1rem" color={category.accentColor} />
                    )
                  }
                  label={doc.name}
                  sx={styles.chip}
                />
              ))}
            </Stack>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default BuildingDocuments;

// Styles
const styles: {
  container: SxProps;
  title: SxProps;
  categoryDot: SxProps;
  chip: SxProps;
  spinner: SxProps;
} = {
  container: {
    mt: "1rem",
    pt: "1rem",
    borderTop: "1px solid #E5E9EA",
  },
  title: {
    display: "block",
    mb: "0.75rem",
    color: "#1E3137",
  },
  categoryDot: {
    width: "0.5rem",
    height: "0.5rem",
    borderRadius: "50%",
    flexShrink: 0,
  },
  chip: {
    maxWidth: "14rem",
    bgcolor: "white",
    border: "1px solid #E5E9EA",
    "& .MuiChip-label": {
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
  },
  spinner: {
    ml: "0.5rem",
  },
};
