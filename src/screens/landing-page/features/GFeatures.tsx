"use client";
import GBadge from "../../../components/data_display/badge/GBadge";
import { AufzugSvgIcon } from "../../../../public/svgs/AufzugSvgIcon";
import { BmaSvgIcon } from "../../../../public/svgs/BmaSvgIcon";
import { SprinklerSvgIcon } from "../../../../public/svgs/SprinklerSvgIcon";
import { RwaSvgIcon } from "../../../../public/svgs/RwaSvgIcon";
import { VentilationSvgIcon } from "../../../../public/svgs/VentilationSvgIcon";
import { ElectricalSvgIcon } from "../../../../public/svgs/ElectricalSvgIcon";
import { HeatingSvgIcon } from "../../../../public/svgs/HeatingSvgIcon";
import { WaterSvgIcon } from "../../../../public/svgs/WaterSvgIcon";
import { EmergencyLightSvgIcon } from "../../../../public/svgs/EmergencyLightSvgIcon";
import { DoorSvgIcon } from "../../../../public/svgs/DoorSvgIcon";
import { GasSvgIcon } from "../../../../public/svgs/GasSvgIcon";
import { CoolingSvgIcon } from "../../../../public/svgs/CoolingSvgIcon";
import TitleSection from "../../../components/data_display/label/title-section";
import { FeatureCard } from "../../../components/surfaces/card/FeatureCard";

const GFeatures = (): JSX.Element => {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center">
      <TitleSection
        title="Einfach Fachgebiet auswählen und starten."
        subtitle="Ob Aufzug, Brandmeldeanlage oder Lüftungssystem – GAP unterstützt alle relevanten Gewerke bei Anlagenprüfung, Wartung, Beratung und Instandsetzung."
        badge={<GBadge title="Jetzt direkt loslegen" color="#ccdfeb" />}
      />
      <div className="grid grid-cols-2 sm:grid-cols-3  lg:grid-cols-6 gap-4 sm:px-16 mb-8">
        <FeatureCard title="Aufzugsanlagen" icon={<AufzugSvgIcon />} />
        <FeatureCard title="Brandmeldeanlagen" icon={<BmaSvgIcon />} />
        <FeatureCard title="Sprinkleranlagen" icon={<SprinklerSvgIcon />} />
        <FeatureCard
          title="Rauch- und Wärmeabzugsanlagen"
          icon={<RwaSvgIcon />}
        />
        <FeatureCard title="Lüftungsanlagen" icon={<VentilationSvgIcon />} />
        <FeatureCard
          title="Elektrotechnische Anlagen"
          icon={<ElectricalSvgIcon />}
        />
        <FeatureCard title="Heizungsanlagen" icon={<HeatingSvgIcon />} />
        <FeatureCard title="Trinkwasseranlagen" icon={<WaterSvgIcon />} />
        <FeatureCard
          title="Notbeleuchtung und Sicherheitsbeleuchtung"
          icon={<EmergencyLightSvgIcon />}
        />
        <FeatureCard title="Tür- und Toranlagen" icon={<DoorSvgIcon />} />
        <FeatureCard title="Gasleitungen" icon={<GasSvgIcon />} />
        <FeatureCard
          title="Kälte- und Klimatechnik"
          icon={<CoolingSvgIcon />}
        />
      </div>
    </div>
  );
};

export default GFeatures;
