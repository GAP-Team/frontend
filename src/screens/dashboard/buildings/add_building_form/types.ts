export interface AddBuildingFormValues{
    zip: string;
    name: string;
    city: string;
    state: string;
    street: string;
    country: string;
    totalArea: number;
    documentChoice: string;
    otherDocs: File[];
    serverLink: string;
    houseNumber: string;
    buildingType: string;
    floorplanDocs: File[];
    constructionDocs: File[];
    buildingAbbreviation: string;
    contactPerson: ContactPersonItem[];
}

export interface ContactPersonItem{
    firstName: string;
    lastName: string;
    phoneNumber: string;
    // role: string;
    email: string;
}
