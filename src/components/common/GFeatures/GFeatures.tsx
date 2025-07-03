"use client";
import GBadge from "../../badge/GBadge";
import { AufzugSvgIcon } from "../../../../public/svg/AufzugSvgIcon";
import { BmaSvgIcon } from "../../../../public/svg/BmaSvgIcon";
import { SprinklerSvgIcon } from "../../../../public/svg/SprinklerSvgIcon";
import { RwaSvgIcon } from "../../../../public/svg/RwaSvgIcon";
import { VentilationSvgIcon } from "../../../../public/svg/VentilationSvgIcon";
import { ElectricalSvgIcon } from "../../../../public/svg/ElectricalSvgIcon";
import { WaterSvgIcon } from "../../../../public/svg/WaterSvgIcon";
import { EmergencyLightSvgIcon } from "../../../../public/svg/EmergencyLightSvgIcon";
import { DoorSvgIcon } from "../../../../public/svg/DoorSvgIcon";
import { GasSvgIcon } from "../../../../public/svg/GasSvgIcon";
import { CoolingSvgIcon } from "../../../../public/svg/CoolingSvgIcon";
import TitleSection from "../../label/title-section";
import { FeatureCard } from "./../../card/FeatureCard";
import { BrandwacheSvgIcon } from "../../../../public/svg/BrandwacheSvgIcon";
import { WandhydrantenanlageSvgIcon } from "../../../../public/svg/WandhydrantenanlageSvgIcon";
import { HygieneCheckWaterAirSvgIcon } from "../../../../public/svg/HygieneCheckWaterAirScgIcon";

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
        <FeatureCard title="Brandwache" icon={<BrandwacheSvgIcon />} />
        <FeatureCard
          title="Brandschutzkonzept und Löschanlagenkonzept"
          icon={<WaterSvgIcon />}
        />
        <FeatureCard
          title="Notbeleuchtung und Sicherheitsbeleuchtung"
          icon={<EmergencyLightSvgIcon />}
        />
        <FeatureCard title="Tür- und Toranlagen" icon={<DoorSvgIcon />} />
        <FeatureCard title="Feuerlöscher" icon={<GasSvgIcon />} />
        <FeatureCard
          title="Druckbehälter und Tankanlagen"
          icon={<CoolingSvgIcon />}
        />
        <FeatureCard
          title="Wandhydrantenanlage"
          icon={<WandhydrantenanlageSvgIcon />}
        />
        <FeatureCard
          title="Hygienprüfung Trinkwasser und Lüftungsanlage"
          icon={<HygieneCheckWaterAirSvgIcon />}
        />
      </div>
    </div>
  );
};

export default GFeatures;
