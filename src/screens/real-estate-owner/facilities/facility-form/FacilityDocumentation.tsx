"use client";
import { useFormikContext } from "formik";
import { AddFacilityFormValues } from "./types";
import DocumentForm from "@/components/common/DocumentForm";

const FacilityDocumentation = (): JSX.Element => {
  const formik = useFormikContext<AddFacilityFormValues>();
  return <DocumentForm formikValue={formik.values} documentFor={"facility"} />;
};

export default FacilityDocumentation;
