"use client";
import { useEffect } from "react";
import { Item } from "@/utils/Constants";
import { useFormikContext } from "formik";
import { AddBuildingFormValues } from "@/screens/dashboard/buildings/add_building_form/types";

interface CustomDocumentationProps {
    name: string;
    formikValue: any;
    options: Item[];
    onChange: (selectedItem: any) => void;
  }
  
  const CustomDocumentation = ({
    formikValue
  }: CustomDocumentationProps): JSX.Element => {
    const formik = useFormikContext<AddBuildingFormValues>();

    useEffect(() => {
      if (formikValue.documentChoice !== "Jetzt hochladen Empfohlen") {
        formik.setFieldValue("constructionDocs", []);
        formik.setFieldValue("floorplanDocs", []);
        formik.setFieldValue("otherDocs", []);
      }
  
      if (formikValue.documentChoice !== "Server verküpfung") {
        formik.setFieldValue("serverLink", "");
      }
    }, [formikValue.documentChoice]);
    
    return(
      <></>
    )
  };

  export default CustomDocumentation;