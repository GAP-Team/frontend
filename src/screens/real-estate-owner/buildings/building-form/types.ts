export interface AddBuildingFormValues {
  zip: string;
  name: string;
  city: string;
  state: string;
  street: string;
  country: string;
  totalArea: string;
  documentChoice: string;
  constructionDocs: File[];
  floorplanDocs: File[];
  otherDocs: File[];
  serverLink: string;
  houseNumber: string;
  buildingType: string;
  buildingAbbreviation: string;
}

export interface NewBuildingProps {
  id: string;
}
export interface Address {
  city: string;
  country: string;
  houseNumber: string;
  state: string;
  street: string;
  zip: string;
}
export interface SelectedBuildingData {
  id: string;
  buildingName: string;
  totalArea: string;
  buildingType: string;
  buildingAbbreviation: string;
  address: Address;
  documentUploadType: string;
  constructionDocs: File[];
  floorplanDocs: File[];
  otherDocs: File[];
  documents: File[];
  serverLink: string;
}
