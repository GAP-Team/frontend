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
  houseNumber: number;
  buildingType: string;
  buildingAbbreviation: string;
  contactPerson: ContactPersonItem[];
}

export interface ContactPersonItem {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  // role: string;
  email: string;
}
