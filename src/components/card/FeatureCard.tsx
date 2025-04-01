import React, { useState } from "react";

export const FeatureCard = ({
    title,
    icon,
  }: {
    title: string;
    icon: any;
  }): JSX.Element => {
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
  