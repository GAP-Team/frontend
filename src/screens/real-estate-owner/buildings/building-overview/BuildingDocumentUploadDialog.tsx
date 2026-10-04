import React from "react";
import { useAppDispatch } from "@/lib/hooks";
import { updateBuilding } from "@/lib/features/buildingSlice";
import DocumentUploadDialog, {
  DocumentCategory,
} from "@/components/common/DocumentUploadDialog";
import { DOCUMENT_TYPE, DocumentChoice } from "@/utils/enums";
import { Document } from "@/typings/types";
import { Building } from "./types";

interface BuildingDocumentUploadDialogProps {
  building: Building;
  open: boolean;
  onClose: () => void;
}

const categories: DocumentCategory[] = [
  { value: DOCUMENT_TYPE.CONSTRUCTION_DOCUMENTS, label: "Bauunterlagen" },
  { value: DOCUMENT_TYPE.FLOOR_PLANS, label: "Grundrisse" },
  { value: DOCUMENT_TYPE.OTHER, label: "Sonstige Dokumente" },
];

const BuildingDocumentUploadDialog: React.FC<
  BuildingDocumentUploadDialogProps
> = ({ building, open, onClose }) => {
  const dispatch = useAppDispatch();

  const handleUpload = async (newDocuments: Document[]): Promise<void> => {
    await dispatch(
      updateBuilding({
        buildingId: building.id,
        data: {
          documents: [...(building.documents ?? []), ...newDocuments],
          documentUploadType: DocumentChoice.UPLOAD_NOW,
        },
      })
    ).unwrap();
  };

  return (
    <DocumentUploadDialog
      title={`Dokumente hochladen – ${building.buildingName}`}
      open={open}
      categories={categories}
      onClose={onClose}
      onUpload={handleUpload}
    />
  );
};

export default BuildingDocumentUploadDialog;
