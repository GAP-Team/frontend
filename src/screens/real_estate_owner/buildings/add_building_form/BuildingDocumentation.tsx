"use client";
import CustomDocumentation from "@/components/common/CustomDocument";

const BuildingDocumentation = ({ formik }: { formik?: any }): JSX.Element => {
  return (
    <CustomDocumentation formikValue={formik.values} documentFor={"building"} />
  );
};

export default BuildingDocumentation;
