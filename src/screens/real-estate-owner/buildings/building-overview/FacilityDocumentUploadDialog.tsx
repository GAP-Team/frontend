import React from "react";
import { useAppDispatch } from "@/lib/hooks";
import { updateFacility } from "@/lib/features/facilitySlice";
import DocumentUploadDialog, {
  DocumentCategory,
} from "@/components/common/DocumentUploadDialog";
import { DOCUMENT_TYPE, DocumentChoice } from "@/utils/enums";
import { Document } from "@/typings/types";
import { Facility } from "@/screens/real-estate-owner/facilities/facility-overview/types";

interface FacilityDocumentUploadDialogProps {
  facility: Facility;
  open: boolean;
  onClose: () => void;
}

const categories: DocumentCategory[] = [
  {
    value: DOCUMENT_TYPE.CHECK_REPORTS,
    label: "Berichte (Prüf- und Wartungsberichte)",
  },
  { value: DOCUMENT_TYPE.FLOOR_PLANS, label: "Grundrisse & Schema" },
  { value: DOCUMENT_TYPE.OTHER, label: "Sonstige Dokumente" },
];

const FacilityDocumentUploadDialog: React.FC<
  FacilityDocumentUploadDialogProps
> = ({ facility, open, onClose }) => {
  const dispatch = useAppDispatch();

  const handleUpload = async (newDocuments: Document[]): Promise<void> => {
    await dispatch(
      updateFacility({
        facilityId: facility.id,
        data: {
          documents: [...(facility.documents ?? []), ...newDocuments],
          documentUploadType: DocumentChoice.UPLOAD_NOW,
        },
      })
    ).unwrap();
  };

  return (
    <DocumentUploadDialog
      title={`Dokumente hochladen – ${facility.name}`}
      open={open}
      categories={categories}
      onClose={onClose}
      onUpload={handleUpload}
    />
  );
};

export default FacilityDocumentUploadDialog;
