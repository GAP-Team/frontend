"use client";
import CustomDocumentation from "@/components/custom_documentation/CustomDocument";

const BuildingDocumentation = ({ formik }: { formik?: any }): JSX.Element => {
  return (
    <CustomDocumentation formikValue={formik.values} documentFor={"building"} />
  );
};

export default BuildingDocumentation;
