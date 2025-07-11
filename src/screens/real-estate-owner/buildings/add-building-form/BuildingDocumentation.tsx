"use client";
import DocumentForm from "@/components/common/DocumentForm";

const BuildingDocumentation = ({ formik }: { formik?: any }): JSX.Element => {
  return <DocumentForm formikValue={formik.values} documentFor={"building"} />;
};

export default BuildingDocumentation;
