"use client";
import GBadge from "../../badge/GBadge";
import { AufzugSvgIcon } from "../../../../public/svg/AufzugSvgIcon";
import { BmaSvgIcon } from "../../../../public/svg/BmaSvgIcon";
import { SprinklerSvgIcon } from "../../../../public/svg/SprinklerSvgIcon";
import { RwaSvgIcon } from "../../../../public/svg/RwaSvgIcon";
import { VentilationSvgIcon } from "../../../../public/svg/VentilationSvgIcon";
import { ElectricalSvgIcon } from "../../../../public/svg/ElectricalSvgIcon";
import { HeatingSvgIcon } from "../../../../public/svg/HeatingSvgIcon";
import { WaterSvgIcon } from "../../../../public/svg/WaterSvgIcon";
import { EmergencyLightSvgIcon } from "../../../../public/svg/EmergencyLightSvgIcon";
import { DoorSvgIcon } from "../../../../public/svg/DoorSvgIcon";
import { GasSvgIcon } from "../../../../public/svg/GasSvgIcon";
import { CoolingSvgIcon } from "../../../../public/svg/CoolingSvgIcon";
import TitleSection from "../../label/title-section";
import { FeatureCard } from "./../../card/FeatureCard";

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
