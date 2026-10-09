import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import GButton from "@/components/inputs/button/GButton";
import { FiFileText } from "react-icons/fi";
import { useAppDispatch } from "@/lib/hooks";
import { showSnackbar } from "@/components/feedback/snackbar";
import { handleUploadMultipleDoc } from "@/utils/uploadToS3";
import { Document } from "@/typings/types";

export interface DocumentCategory {
  value: string;
  label: string;
}

interface DocumentUploadDialogProps {
  title: string;
  open: boolean;
  categories: DocumentCategory[];
  onClose: () => void;
  // Receives the freshly uploaded documents and persists them on the owner
  // (facility, building, ...). Throw to signal a failed save.
  onUpload: (documents: Document[]) => Promise<void>;
}

const uploadFiles = async (
  files: File[],
  documentType: string
): Promise<Document[]> => {
  const uploaded = await Promise.all(files.map(handleUploadMultipleDoc));
  if (uploaded.some((doc) => !doc?.key)) {
    throw new Error("Upload failed");
  }
  return uploaded.map((doc) => ({ ...doc, documentType }));
};

const DocumentUploadDialog: React.FC<DocumentUploadDialogProps> = ({
  title,
  open,
  categories,
  onClose,
  onUpload,
}) => {
  const dispatch = useAppDispatch();
  const [category, setCategory] = useState<string>(categories[0].value);
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const handleClose = (): void => {
    if (isUploading) return;
    setFiles([]);
    onClose();
  };

  const handleFilesChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setFiles(Array.from(event.target.files ?? []));
  };

  const notify = (type: "success" | "error", message: string): void => {
    dispatch(showSnackbar({ type, message }));
  };

  const handleUpload = async (): Promise<void> => {
    setIsUploading(true);
    try {
      await onUpload(await uploadFiles(files, category));
      notify("success", "Die Dokumente wurden erfolgreich hochgeladen!");
      setFiles([]);
      onClose();
    } catch {
      notify(
        "error",
        "Die Dokumente konnten nicht hochgeladen werden. Bitte versuchen Sie es erneut."
      );
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Box sx={styles.content}>
          <TextField
            select
            fullWidth
            label="Dokumentenart"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            {categories.map((item) => (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </TextField>
          <Box sx={styles.dropZone}>
            <FiFileText size="1.5rem" color="#A0ADB1" />
            <Typography sx={styles.fileText}>
              {files.length > 0
                ? files.map((file) => file.name).join(", ")
                : "Noch keine Dokumente ausgewählt"}
            </Typography>
            <Button
              component="label"
              color="gprimary"
              variant="outlined"
              sx={styles.searchButton}
            >
              Dokumente suchen
              <input
                hidden
                multiple
                type="file"
                accept="application/pdf"
                onChange={handleFilesChange}
              />
            </Button>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <GButton onClick={handleClose} color="primary" disabled={isUploading}>
          Abbrechen
        </GButton>
        <GButton
          onClick={handleUpload}
          color="ggreen"
          disabled={files.length === 0 || isUploading}
        >
          {isUploading ? "Wird hochgeladen…" : "Hochladen"}
        </GButton>
      </DialogActions>
    </Dialog>
  );
};

export default DocumentUploadDialog;

// Styles
const styles = {
  content: {
    display: "flex",
    flexDirection: "column",
    gap: "1.25rem",
    pt: "0.5rem",
  },
  dropZone: {
    display: "flex",
    alignItems: "center",
    gap: "0.8rem",
    border: "1px dashed #D0D7D9",
    borderRadius: "0.5rem",
    p: "1rem",
    backgroundColor: "#F9FAFA",
  },
  searchButton: {
    borderRadius: "0.5rem",
    fontWeight: 600,
    textTransform: "capitalize",
  },
  fileText: {
    flexGrow: 1,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
};
