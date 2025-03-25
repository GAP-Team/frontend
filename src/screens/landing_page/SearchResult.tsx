import { Grid } from "@mui/material";
import TopFilter from "./TopFilterPanel";
import ContractCard from "@/components/tender_card/ContractCard";
import SideFilterPanel from "../../components/search/SideFilterPanel";

const result = 8;

const SearchResult = (): JSX.Element => {
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

export default SearchResult;

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
