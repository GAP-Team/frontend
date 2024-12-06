"use client";
import { useFormikContext } from "formik";
import { AddFacilityFormValues } from "./types";
import CustomDocumentation from "@/components/custom_documentation/CustomDocument";

const FacilityDocumentation = (): JSX.Element => {
  const formik = useFormikContext<AddFacilityFormValues>();
  return (
    <CustomDocumentation formikValue={formik.values} documentFor={"facility"} />
  );
};

export default FacilityDocumentation;
