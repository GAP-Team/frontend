import { Box, Grid, Link, Paper, Typography } from "@mui/material";
import { Document } from "@/typings/types";
import { DOCUMENT_TYPE, DocumentChoice } from "@/utils/enums";
import DocumentList from "@/screens/real-estate-owner/buildings/building-overview/DocumentList";

interface DocumentGroup {
  title: string;
  documentType: DOCUMENT_TYPE;
}

interface ContractDocumentsSectionProps {
  title: string;
  groups: DocumentGroup[];
  documents?: Document[];
  uploadType?: string;
  serverLink?: string | null;
}

const ContractDocumentsSection: React.FC<ContractDocumentsSectionProps> = ({
  title,
  groups,
  documents = [],
  uploadType,
  serverLink,
}) => {
  const renderMessage = (message: string): JSX.Element => (
    <Typography variant="body1" color="black">
      {message}
    </Typography>
  );

  const renderServerLink = (): JSX.Element =>
    serverLink ? (
      <Link href={serverLink} target="_blank" rel="noopener noreferrer">
        {serverLink}
      </Link>
    ) : (
      renderMessage("Es gibt keinen Server-Link.")
    );

  const renderDocuments = (): JSX.Element => (
    <Grid container spacing={2}>
      {groups.map(({ title: groupTitle, documentType }) => (
        <Grid item xs={12} key={documentType}>
          <DocumentList
            title={groupTitle}
            documentType={documentType}
            documents={documents}
          />
        </Grid>
      ))}
    </Grid>
  );

  const renderContent = (): JSX.Element => {
    switch (uploadType) {
      case DocumentChoice.NO_DOCUMENTS:
        return renderMessage("Es gibt keine Dokumente vorhanden.");
      case DocumentChoice.SERVER_LINK:
        return renderServerLink();
      case DocumentChoice.PER_EMAIL:
        return renderMessage("Die Dokumente werden per E-Mail versendet.");
      case DocumentChoice.ON_SITE:
        return renderMessage(
          "Die Dokumente werden vor Ort zur Verfügung gestellt."
        );
      default:
        return documents.length
          ? renderDocuments()
          : renderMessage("Es gibt keine Dokumente vorhanden.");
    }
  };

  const showCount = !uploadType || uploadType === DocumentChoice.UPLOAD_NOW;

  return (
    <Grid item xs={12}>
      <Paper sx={styles.documentContainer}>
        <Typography
          variant="body2"
          color="text.secondary"
          style={styles.documentTitle}
        >
          {showCount ? `${title} (${documents.length})` : title}
        </Typography>
        <Box sx={styles.documentsContainer}>{renderContent()}</Box>
      </Paper>
    </Grid>
  );
};

export default ContractDocumentsSection;

const styles = {
  documentContainer: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "false",
    width: "100%",
    borderRadius: "0.8rem",
    p: "1.25rem",
  },
  documentsContainer: {
    display: "flex",
    flexWrap: "wrap",
    mb: 1,
  },
  documentTitle: {
    marginBottom: "0.5rem",
    borderWidth: "medium",
    borderBottom: "3px solid #22A7F2",
    maxWidth: "15rem",
    paddingBottom: "0.50rem",
  },
};
