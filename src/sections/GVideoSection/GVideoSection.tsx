import React from "react";

const GVideoSection = ({
  title = "Unternehmenssuche leicht gemacht!",
  subtitle = "Lorem ipsum dolor sit amet consectetur adipiscing elit. Eaque sed tenetur rem quam nihil dolorum expedita maxime nisi recusandae sequi magni culpa fuga accusamus eveniet fugiat ipsum ab consequuntur.",
}: {
  title?: string;
  subtitle?: string;
}) => {
  return (
    <>
      <div className="w-full mx-auto flex flex-col md:flex-row justify-center items-center py-36 bg-[#ebebec] gap-14">
        <h1 className="text-4xl font-bold text-gray-800 mb-4 md:mb-0 max-w-md ">{title}</h1>
        <p className="text-lg text-gray-600 text-base max-w-lg">{subtitle}</p>
      </div>
      <video className="max-w-5xl aspect-video rounded-lg -mt-36 mb-28" controls>
        <source src="https://docs.material-tailwind.com/demo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </>
  );
};

export default GVideoSection;
