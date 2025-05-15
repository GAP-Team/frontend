"use client";
import { useEffect } from "react";
import { Grid } from "@mui/material";
import TopFilter from "./TopFilterPanel";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/lib/hooks";
import ContractCard from "@/components/card/ContractCard";
import { showSnackbar } from "@/components/root-snackbar";
import SideFilterPanel from "../../components/search/SideFilterPanel";
import { getAllContracts, fetchContracts } from "@/lib/features/contractSlice";

const ContractsOverview = (): JSX.Element => {
  const appdispatch = useAppDispatch();
  const contracts = useSelector(getAllContracts);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const states = searchParams.getAll("states") || [];
    const tenderTypes = searchParams.getAll("tenderTypes") || [];
    const facilitySubcategories =
      searchParams.getAll("facilitySubcategories") || [];

    getContracts(states, tenderTypes, facilitySubcategories);
  }, []);

  const getContracts = async (
    states: string[],
    tenderTypes: string[],
    facilitySubcategories: string[]
  ): Promise<void> => {
    try {
      await appdispatch(
        fetchContracts({
          states: states,
          tenderTypes: tenderTypes,
          facilitySubcategories: facilitySubcategories,
        })
      ).unwrap();
    } catch {
      appdispatch(
        showSnackbar({
          type: "error",
          message:
            "Etwas ist schiefgelaufen. Versuchen Sie es später noch einmal!",
        })
      );
    }
  };

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
            <Grid item sx={styles.innerContainer}>
              <ContractCard contracts={contracts} />
            </Grid>
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
  innerContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    // justifyContent: "space-between",
    // alignItems: "center",
    padding: "0.5rem",
    marginBottom: "1rem",
    width: "100%",
  },
};
