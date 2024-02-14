import React from "react";
interface GVideoSectionProps {
  title?: string;
  subtitle?: string;
}

const GVideoSection = ({
  title = "Unternehmenssuche leicht gemacht!",
  subtitle = "Lorem ipsum dolor sit amet consectetur adipiscing elit. Eaque sed tenetur rem quam nihil dolorum expedita maxime nisi recusandae sequi magni culpa fuga accusamus eveniet fugiat ipsum ab consequuntur.",
}: GVideoSectionProps) => {
  return (
    <>
      <div className="w-full mx-auto flex flex-col md:flex-row justify-center items-center py-16 md:py-24 lg:py-36 p-12 bg-[#ebebec] gap-8 md:gap-14">
        <h1 className="text-4xl font-bold text-gray-800 mb-4 md:mb-0 md:text-3xl lg:text-4xl max-w-md text-center md:text-left">{title}</h1>
        <p className="text-md text-gray-600 md:text-md lg:max-w-lg max-w-md text-center md:text-left">{subtitle}</p>
      </div>
      <video className="w-full mx-auto rounded-lg aspect-video max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-5xl -mt-28 md:-mt-32 lg:-mt-36 md:mb-28" controls>
        <source src="https://docs.material-tailwind.com/demo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </>
  );
};
export default GVideoSection;
