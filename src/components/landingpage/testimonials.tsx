"use client";
import React from "react";
import TitleSection from "../common/title-section";
import Badge from "../common/badge";
import { Carousel } from "flowbite-react";
import { Button, Card, ButtonGroup } from "flowbite-react";
import Image from "next/image";
const Testimonials = () => {
  return (
    <div className="container mx-auto px-4 sm:px-2 lg:px-4  flex flex-col justify-center items-center">
      <TitleSection
        title="Das sagen unsere Kunden..."
        subtitle="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dicta maxime, maiores reiciendis fuga animi, quidem similique perspiciatis neque doloremque ut veniam modi earum non iste assumenda voluptates impedit velit debitis, voluptas aspernatur dolore incidunt pariatur beatae?"
        badge={<Badge title="Kundenstimmen" color="#d0ede8" />}
      />
      <CarousalSlider />
    </div>
  );
};

export const CarousalSlider = () => {
  return (
    <div className="flex justify-center items-center w-3/4 md:h-[30rem] sm:h-[20rem] rounded-lg shadow-xl overflow-hidden mx-auto">
      <Carousel   >
        <CarouselItem />
        <CarouselItem />
        <CarouselItem />
      </Carousel >
    </div>
  );
};

const CarouselItem = () => {
  return (
    <div className="flex flex-col items-center text-center justify-center p-6 bg-slate-800 text-white h-full">
      <div className="avatar">
        <div className="w-20 h-20 rounded-full overflow-hidden mx-auto">
          <Image src="https://placehold.co/100x100" alt="Profile placeholder image" unoptimized width={80} height={80} />
        </div>
      </div>
      <p className="md:text-xl sm:text-md lg:text-2xl mx-auto py-8 max-w-2xl">"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque, ducimus velit culpa ex blanditiis maxime minus quas."</p>
      <p className="text-md font-bold">James Powell</p>
      <p className="">Developer at CompanyY</p>
    </div>
  )
}
export default Testimonials;
