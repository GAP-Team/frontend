"use client";
import { Grid } from "@mui/material";
import { ROUTES } from "@/utils/routes";
import TopFilter from "./TopFilterPanel";
import { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation';
import ContractCard from "@/components/card/ContractCard";
import SideFilterPanel from "../../components/search/SideFilterPanel";
import { log } from "console";

const result = 8;

const ContractsOverview = (): JSX.Element => {

  const searchParams = useSearchParams();
  const arrayParam = searchParams.get(ROUTES.SERVICE_PROVIDER.CONTRACTS);
  const arrayElements = arrayParam ? arrayParam.split(',') : [];
  console.log("Array Elements:", arrayElements);

  const [arrayData, setArrayData] = useState<any[]>([]);

  /*useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    console.log("Params:", params);
    const data = params.get("data");
    console.log("Data:", data);
    if (data) {
      try {
        const parsed = JSON.parse(decodeURIComponent(data));
        console.log("Array Data:", parsed);
        if (Array.isArray(parsed)) {
          setArrayData(parsed);
        }
      } catch (err) {
        console.error("Invalid array data", err);
      }
    }
  }, []);*/

  return (
    <section className="bg-#E0E0E0 w-full px-3 py-5">
      <div className="mb-4 mr-8">
        <TopFilter />
      </div>
      <div className="flex flex-cols-2 justify-between mb-8 ">
        <div style={styles.filterSection}>
          <SideFilterPanel />
        </div>
        <div
          style={styles.resultSection}
          className="flex flex-cols-4 mb-8 pl-2"
        >
          <Grid
            container
            spacing={"1.25rem"}
            sx={{ overflow: "auto", flexGrow: 1 }}
          >
            {Array.from({ length: result }).map((_, index) => (
              <Grid item key={index}>
                <ContractCard key={index} />
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </section>
  );
};

export default ContractsOverview;

const styles = {
  filterSection: {
    width: "25%",
    marginRight: "0.5rem",
    borderRadius: "0.5rem",
    border: "1px #FFF solid",
  },
  resultSection: {
    width: "75%",
  },
};
