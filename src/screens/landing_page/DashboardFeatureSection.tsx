import { useState } from "react";
import { ROUTES } from "@/utils/routes";
import { useRouter } from "next/navigation";
import RoundButton from "../../components/inputs/button/RoundButton";
import TabContent from "@/screens/landing_page/TabContent";
import CustomTabPanel from "@/components/navigation/tab_panel/CustomTabPanel";
import { RealEstateLandingPageTabs } from "@/utils/Constants";
import Box from "@mui/material/Box";

import TenderImage from "../../../public/images/tenders.png";
import BuildingImage from "../../../public/images/buildings.png";
import DashboardImage from "../../../public/images/dashboard.png";
import CostSavingImage from "../../../public/images/cost-saving.png";

// FIXME: find better name to differentiate between it and GFeature
const DashboardFeatureSection = (): JSX.Element => {
  const router = useRouter();
  const [currentTabIndex, setCurrentTabIndex] = useState<string>("0");

  const DashboardFeatures = [
    "Übersicht aller Objekte und Anlagen",
    "Anstehende Prüfungen und Fristen im Blick",
    "Echtzeit-Status der Prüfberichte",
    "Einfache Aufgabenverteilung im Team",
  ];

  const SavingFeatures = [
    "Bündelung von Prüfaufträgen zur Kostenreduktion",
    "Transparente Angebote von zertifizierten Dienstleistern",
    "Effiziente Prozesse – weniger Aufwand, weniger Kosten",
    "Reduktion von Bußgeldern durch fristgerechte Prüfungen",
  ];

  const tenderFeatures = [
    "Individuelle Ausschreibungen für Prüf- und Wartungsleistungen",
    "Vergleich von Dienstleister-Angeboten",
    "Kommunikation & Beauftragung direkt über die Plattform",
    "Faire Vergabeprozesse – transparent & DSGVO-konform",
  ];

  const buildingFeatures = [
    "Zentrale Verwaltung aller Immobilien und Einheiten",
    "Intelligente Verknüpfung von Objekt- & Anlagendaten",
    "Import bestehender Excel-Daten per Klick",
    "Strukturierte Dokumentation & Protokollarchiv",
  ];

  const handleTabSelection = (tabIndex: string): void => {
    setCurrentTabIndex(tabIndex);
  };

  const handleOnClick = (route: string): void => {
    router.push(route);
  };

  return (
    <Box
      className="w-full"
      sx={{
        px: { xs: 2, sm: 4, md: 6, lg: 8 },
        py: { xs: 4, md: 5 },
        overflow: "hidden",
      }}
    >
      <Box className="flex flex-col gap-6 lg:gap-8">
        <Box className="text-center">
          <h1 className="text-xl md:text-2xl lg:text-4xl font-bold my-3 md:my-5">
            Unsere Funktionen – Jetzt entdecken
          </h1>
          <p className="text-sm md:text-base lg:text-lg font-semibold max-w-4xl mx-auto pb-4">
            GAP bietet Dir alles, was Du für die rechtssichere Verwaltung Deiner
            Immobilien brauchst. Spare Zeit, reduziere Kosten und vertraue auf
            geprüfte Qualität.
          </p>
          <Box className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-4">
            <RoundButton
              text="Jetzt kostenlos starten"
              color="#17ABA9"
              hoverColor="#FFFFFF"
              handleOnClick={() => handleOnClick(ROUTES.REGISTRATION)}
            />
            <RoundButton
              text="Funktionen entdecken"
              color="#FFFFFF"
              hoverColor="#17ABA9"
              handleOnClick={() => handleOnClick(ROUTES.FUNCTIONS)}
            />
          </Box>
        </Box>

        {/* Tab content section - now always centered */}
        <Box className="w-full text-center mt-2">
          <CustomTabPanel
            tabs={RealEstateLandingPageTabs}
            handleTabSelection={handleTabSelection}
          />
          <Box sx={{ mt: { xs: 2, md: 0 } }}>
            {currentTabIndex === "0" && (
              <TabContent
                title="Dashboard"
                features={DashboardFeatures}
                image={DashboardImage}
              />
            )}
            {currentTabIndex === "1" && (
              <TabContent
                title="Kosteneinsparung"
                features={SavingFeatures}
                image={CostSavingImage}
              />
            )}
            {currentTabIndex === "2" && (
              <TabContent
                title="Ausschreibungsübersicht"
                features={tenderFeatures}
                image={TenderImage}
              />
            )}
            {currentTabIndex === "3" && (
              <TabContent
                title="Objektübersicht"
                features={buildingFeatures}
                image={BuildingImage}
              />
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardFeatureSection;
