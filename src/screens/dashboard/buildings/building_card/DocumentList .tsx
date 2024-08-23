import { useState } from "react";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import Stack from "@mui/material/Stack";
import { FiFileText } from "react-icons/fi";
import Typography from "@mui/material/Typography";
import { CircularProgress, Divider } from "@mui/material";

import s3APIs from "@/api/s3";
import { Document } from "./types";
import building from "@/api/building";
import { scrollBarStyles } from "@/components/scrollbar/Scrollbar";

interface DocumentListProps{
    title: string
    documentType: string
    documents: Document[];
}
const DocumentList: React.FC<DocumentListProps> = ({ title, documentType, documents }) => {

    const [ selectedIndex, setSelectedIndex ] = useState<number>();
    const [ isDownloading, setIsDownloading ] = useState<boolean>(false);

    const handleDownloadFile = async (selectedIndex: number, fileKey: string) => {
        setSelectedIndex(selectedIndex);
        setIsDownloading(true);

        let fileDetails = await s3APIs.getFile(fileKey);

        const url = window.URL.createObjectURL(new Blob([fileDetails.data], { type: 'application/pdf' }));

        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileKey);

        link.click();

        setIsDownloading(false);
    }

    return(
        <List sx={styles.listContainer}>
            <Typography
                variant="bodymr"
                color="black"
            >
                {title}
            </Typography>
            {documents?.filter(doc => doc.documentType === documentType).map((document, index) => 
                {
                    return (
                        <Stack
                            direction="row"
                            alignItems="center"
                            py="0.55rem"
                            gap={2}
                            key={index}
                        >
                            <FiFileText size="1.5rem" color="#22A7F1" />
                            <Typography
                                variant="bodymr"
                                color="#22A7F1"
                                onClick={() => handleDownloadFile(index, document.key)}
                                style={{cursor: 'pointer'}}
                            >
                                {`${document.name}`}
                                {index === selectedIndex && isDownloading && <CircularProgress color="gprimary" size={20} style={{marginTop: '5px', marginLeft: '5rem'}} /> }
                            </Typography>
                        </Stack>
                    )
                }
            )}
            <Divider />
        </List>
    );
}

export default DocumentList;

// Styles
const styles = {
    listContainer: {
      flexGrow: 1,
      paddingTop: "0.5rem",
      overflow: "auto",
      // maxHeight: "8rem",
      paddingRight: "0.65rem", // Add padding to the bottom for the scrollbar
      ...scrollBarStyles,
    },
  };