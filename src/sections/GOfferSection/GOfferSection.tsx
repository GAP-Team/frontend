import React from "react";

const GOfferSection = () => {
  return (
    <div className="w-full mx-auto bg-[#37383f] flex flex-col md:flex-row justify-center items-center gap-4 py-6 text-white text-lg">
      <div className="flex items-center  ">
        <TickSvg />
        <span>Kostenlos & Unverbindlich</span>
      </div>
      <div className="flex items-center  ">
        <TickSvg />
        <span>von mehr als 1 Mio Auftraggebern genutzt</span>
      </div>
      <div className="flex items-center ">
        <TickSvg />
        <span>mehr als 150.000 Handwerksbetriebe</span>
      </div>
    </div>
  );
};
const TickSvg = () => {
  return (
    <figure className="flex justify-center items-center mx-2 rounded-full bg-[#304e4e] p-1 w-7 h-6">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="green"
        className="w-6 h-6"
      >
        <path
          d="M8.79992 15.9049L5.29992 12.4049C4.90992 12.0149 4.28992 12.0149 3.89992 12.4049C3.50992 12.7949 3.50992 13.4149 3.89992 13.8049L8.08992 17.9949C8.47992 18.3849 9.10992 18.3849 9.49992 17.9949L20.0999 7.4049C20.4899 7.0149 20.4899 6.3949 20.0999 6.0049C19.7099 5.6149 19.0899 5.6149 18.6999 6.0049L8.79992 15.9049Z"
          fill="#14a38c"
        />
      </svg>
    </figure>
  );
};
export default GOfferSection;
