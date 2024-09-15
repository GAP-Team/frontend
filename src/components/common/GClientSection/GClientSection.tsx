import React from "react";
import { IoLogoPython, IoLogoBitbucket, IoLogoApple } from "react-icons/io";
import { IoLogoAmazon } from "react-icons/io5";

const GClientSection = () => {
  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4 text-center">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4">
            Wir sind stolz auf diese Kunden
          </h2>
          <p className="text-gray-600">Join 4,000+ companies already growing</p>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-16">
          <IoLogoPython className="text-5xl sm:text-7xl" />
          <IoLogoApple className="text-5xl sm:text-7xl" />
          <IoLogoBitbucket className="text-5xl sm:text-7xl" />
          <IoLogoAmazon className="text-5xl sm:text-7xl" />
        </div>
      </div>
    </div>
  );
};

export default GClientSection;
