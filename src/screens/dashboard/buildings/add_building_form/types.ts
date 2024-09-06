export interface AddBuildingFormValues {
  zip: string | undefined;
  name: string | undefined;
  city: string | undefined;
  state: string | undefined;
  street: string | undefined;
  country: string | undefined;
  totalArea: string | undefined;
  documentChoice: string | undefined;
  constructionDocs: File[] | undefined;
  floorplanDocs: File[] | undefined;
  otherDocs: File[] | undefined;
  serverLink: string | undefined;
  houseNumber: string | undefined;
  buildingType: string | undefined;
  buildingAbbreviation: string | undefined;
  contactPerson: ContactPersonItem[] | undefined;
}

export interface ContactPersonItem {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  // role: string;
  email: string;
}
