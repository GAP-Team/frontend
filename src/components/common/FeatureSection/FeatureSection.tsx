import { useState } from "react";
import RoundButton from "../../button/RoundButton";
import TabContent from "../../tab_panel/TabContent";
import CustomTabPanel from "../../tab_panel/CustomTabPanel";
import { RealEstateLandingPageTabs } from "@/utils/Constants";

import TenderImage from "../../../../public/images/tenders.png";
import BuildingImage from "../../../../public/images/buildings.png";
import DashboardImage from "../../../../public/images/dashboard.png";
import CostSavingImage from "../../../../public/images/cost-saving.png";

const FeatureSection = (): JSX.Element => {
  const [currentTabIndex, setCurrentTabIndex] = useState<string>("0");

  const features = [
    "Simply Dummy Text",
    "Simply Dummy Text",
    "Simply Dummy Text",
    "Simply Dummy Text",
  ];

  const handleTabSelection = (tabIndex: string): void => {
    setCurrentTabIndex(tabIndex);
  };

  return (
    <>
      <div className="w-full mx-auto p-5 flex flex-col">
        <div className="relative grid mb-8 pl-32">
          <div
            className="w-full text-center xl:text-left "
            style={styles.titleHolder}
          >
            <h1 className="text-4xl font-bold my-5">
              Unsere Funktionen - Jetzt entdecken
            </h1>
            <p className="text-lg font-semibold max-w-4xl mx-auto pb-4">
              Unsere Software bietet Dir alle Funktionen, die Du für die
              tägliche Verwaltung Deiner Immobilien benötigst. Überzeuge Dich
              selbst und profitiere von einer professionellen Software, zum
              günstigen Preis!
            </p>
            <RoundButton
              text="Jetzt kostenlos starten"
              color="#17ABA9"
              hoverColor="#FFFFFF"
            />
            <RoundButton
              text="Funktionen entdecken"
              color="#FFFFFF"
              hoverColor="#17ABA9"
            />
          </div>
          <div className="w-full text-center pr-28">
            <CustomTabPanel
              tabs={RealEstateLandingPageTabs}
              handleTabSelection={handleTabSelection}
            />
            {currentTabIndex === "0" && (
              <TabContent
                title="Dashboard"
                features={features}
                image={DashboardImage}
              />
            )}
            {currentTabIndex === "1" && (
              <TabContent
                title="Kosteneinsparung"
                features={features}
                image={CostSavingImage}
              />
            )}
            {currentTabIndex === "2" && (
              <TabContent
                title="Ausschreibungsübersicht"
                features={features}
                image={TenderImage}
              />
            )}
            {currentTabIndex === "3" && (
              <TabContent
                title="Objektübersicht"
                features={features}
                image={BuildingImage}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FeatureSection;

const styles = {
  titleHolder: {
    width: "52rem",
    // height: "35rem",
    marginLeft: "1rem",
  },
};
