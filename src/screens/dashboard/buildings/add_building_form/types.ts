export interface AddBuildingFormValues{
    buildingName: string;
    totalArea: number;
    buildingType: string;
    objektTag: string;
    contactPerson: ContactPersonItem[];
    address: string;
    plz: string;
    city: string;
    state: string;
    constructionDocs: File[];
    floorplanDocs: File[];
    otherDocs: File[];
    serverLink: string;
}

export interface ContactPersonItem{
    name: string;
    role: string;
    email?: string;
}
