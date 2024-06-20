export interface AddTenderFormValues{
    //Tender Info feilds = Form 1
    clientName: string;
    tenderName: string;
    tenderForm: string; 
    tenderType: string;
    //Tender Building feilds = Form 2
    buildingName: string;
    equipmentName: string;
    equipmentType: string;
    //Description feild = Form 3
    detailDescription: string;
    //Classification = Form 4
    urgency: string;
    fromDate: Date;
    toDate: Date;
    safetyWorkRequired: string;
    freeParkingAvailable: string;
    //Documentation = Form 5 
    documentChoice: string;
    constructionDocs: File[];
    floorplanDocs: File[];
    equipmentDocs: File[];
    serverLink: string;
}
export interface ActiveStepItem {
    id: number;
    stepName: string;
    component?: () => JSX.Element;
  }