"use client";
import GBadge from "@/components/data-display/badge/GBadge";
import { BmaSvgIcon } from "../../../../public/svgs/BmaSvgIcon";
import { SprinklerSvgIcon } from "../../../../public/svgs/SprinklerSvgIcon";
import { RwaSvgIcon } from "../../../../public/svgs/RwaSvgIcon";
import { VentilationSvgIcon } from "../../../../public/svgs/VentilationSvgIcon";
import { ElectricalSvgIcon } from "../../../../public/svgs/ElectricalSvgIcon";
import { WaterSvgIcon } from "../../../../public/svgs/WaterSvgIcon";
import { EmergencyLightSvgIcon } from "../../../../public/svgs/EmergencyLightSvgIcon";
import { DoorSvgIcon } from "../../../../public/svgs/DoorSvgIcon";
import { CoolingSvgIcon } from "../../../../public/svgs/CoolingSvgIcon";
import TitleSection from "@/components/data-display/label/title-section";
import { FeatureCard } from "@/components/surfaces/card/FeatureCard";
import { ElevatorSvgIcon } from "../../../../public/svgs/ElevatorSvgIcon";
import { FireWatchSvgIcon } from "../../../../public/svgs/FireWatchSvgIcon";
import { FireExtinguisherSvgIcon } from "../../../../public/svgs/FireExtinguisherSvgIcon";
import { WallHydrantSystemSvgIcon } from "../../../../public/svgs/WallHydrantSystemSvgIcon";
import { HygieneCheckWaterAirSvgIcon } from "../../../../public/svgs/HygieneCheckWaterAirSvgIcon";

const GFeatures = (): JSX.Element => {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center">
      <TitleSection
        title="Einfach Fachgebiet auswählen und starten."
        subtitle="Ob Aufzug, Brandmeldeanlage oder Lüftungssystem – GAP unterstützt alle relevanten Gewerke bei Anlagenprüfung, Wartung, Beratung und Instandsetzung."
        badge={<GBadge title="Jetzt direkt loslegen" color="#ccdfeb" />}
      />
      <div className="grid grid-cols-2 sm:grid-cols-3  lg:grid-cols-6 gap-4 sm:px-16 mb-8">
        <FeatureCard title="Aufzugsanlagen" icon={<ElevatorSvgIcon />} />
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
        <FeatureCard title="Brandwache" icon={<FireWatchSvgIcon />} />
        <FeatureCard
          title="Brandschutz- und Löschanlagenkonzept"
          icon={<WaterSvgIcon />}
        />
        <FeatureCard
          title="Notbeleuchtung und Sicherheitsbeleuchtung"
          icon={<EmergencyLightSvgIcon />}
        />
        <FeatureCard title="Tür- und Toranlagen" icon={<DoorSvgIcon />} />
        <FeatureCard title="Feuerlöscher" icon={<FireExtinguisherSvgIcon />} />
        <FeatureCard
          title="Druckbehälter und Tankanlagen"
          icon={<CoolingSvgIcon />}
        />
        <FeatureCard
          title="Wandhydrantenanlage"
          icon={<WallHydrantSystemSvgIcon />}
        />
        <FeatureCard
          title="Hygieneprüfung Trinkwasser und Lüftungsanlage"
          icon={<HygieneCheckWaterAirSvgIcon />}
        />
      </div>
    </div>
  );
};

export default GFeatures;
