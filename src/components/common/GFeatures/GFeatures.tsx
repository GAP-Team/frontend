"use client";
import React, { useState } from "react";
import GBadge from "../../badge/GBadge";
import {
  AufzugSvgIcon,
  FireSvgIcon,
  BulbSvgIcon,
  VentSvgIcon,
  HomeSvgIcon,
} from "../../svg/features-svg";
import TitleSection from "../../label/title-section";

const GFeatures = () : JSX.Element => {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center">
      <TitleSection
        title=" Einfach Gewerk auswählen und loslegen"
        subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta maxime,
      maiores reiciendis fuga animi, quidem similique perspiciatis neque
      doloremque ut veniam modi earum non iste assumenda voluptates impedit
      velit debitis, voluptas aspernatur dolore incidunt pariatur beatae?"
        badge={<GBadge title="Jetzt direkt loslegen" color="#ccdfeb" />}
      />
      <div className="grid grid-cols-2 sm:grid-cols-3  lg:grid-cols-6 gap-4 sm:px-16 mb-8">
        <FeatureCard title="Aufzugsanlagen" icon={<AufzugSvgIcon />} />
        <FeatureCard title="Brandschutz" icon={<FireSvgIcon />} />
        <FeatureCard title="Brandmelde-anlage" icon={<BulbSvgIcon />} />
        <FeatureCard title="Lüftungs-anlagen" icon={<VentSvgIcon />} />
        <FeatureCard title="Gewerktitel" icon={<HomeSvgIcon />} />
        <FeatureCard title="Aufzugsanlagen" icon={<AufzugSvgIcon />} />

        <FeatureCard title="Brandschutz" icon={<FireSvgIcon />} />
        <FeatureCard title="Brandmelde-anlage" icon={<BulbSvgIcon />} />
        <FeatureCard title="Lüftungs-anlagen" icon={<VentSvgIcon />} />
        <FeatureCard title="Gewerktitel" icon={<HomeSvgIcon />} />
        <FeatureCard title="Aufzugsanlagen" icon={<AufzugSvgIcon />} />
        <FeatureCard title="Aufzugsanlagen" icon={<AufzugSvgIcon />} />
      </div>
    </div>
  );
};

const FeatureCard = ({ title, icon }: { title: string; icon: any }) : JSX.Element => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <a
      href="#"
      className="hover:bg-primary flex flex-col items-center justify-center hover:text-white p-6 rounded-xl hover:shadow-lg transition duration-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {icon && (
        <div
          className={
            isHovered
              ? "fill-white m-8 w-12 h-12 transition duration-500"
              : "fill-primary m-8 w-12 h-12 transition duration-500"
          }
        >
          {icon}
        </div>
      )}
      <p className="font-bold break-words text-center">{title}</p>
    </a>
  );
};

export default GFeatures;
