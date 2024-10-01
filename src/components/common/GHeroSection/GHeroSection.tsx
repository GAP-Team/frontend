"use client";
import React, { useState } from "react";
import Badge from "../../badge/GBadge";
import { FaCheck } from "react-icons/fa";
import { Dropdown, DropdownItem, Button } from "flowbite-react";
import GNavbar from "@/components/navigation/GNavbar/GNavbar";
import { FaArrowRightLong } from "react-icons/fa6";
import {
  germanStates,
  listOfOrderTypes,
  listOfTrades,
} from "@/utils/Constants";
import heroBackgroundPicture from "../../../../public/images/hero6.jpg";
import Image from "next/image";

const HeroSection = (): JSX.Element => {
  const [selectedFacility, setSelectedFacility] = useState("Anlagentyp");
  const [selectedOrderType, setSelectedOrderType] = useState("Auftragstypen");
  const [selectedState, setSelectedState] = useState("Bundesländer");

  const truncateLabel = (label: string): string => {
    const maxLength = 20;
    if (label?.length > maxLength) {
      return label.substring(0, maxLength) + "..."; // Truncate and append ellipsis
    }
    return label;
  };
  const truncatedOrderType = truncateLabel(selectedOrderType);

  return (
    <>
      <section className="bg-white w-full dark:bg-gray-900">
        <GNavbar />
        <div className="relative">
          <Image
            src={heroBackgroundPicture}
            className="absolute inset-0 object-cover w-full h-full"
            alt=""
          />
          <div className="absolute inset-x-0 bottom-0">
            <svg
              viewBox="0 0 224 12"
              fill="currentColor"
              className="w-full -mb-0 text-white"
              preserveAspectRatio="none"
            >
              <path d="M0,0 C48.8902582,6.27314026 86.2235915,9.40971039 112,9.40971039 C137.776408,9.40971039 175.109742,6.27314026 224,0 L224,12.0441132 L0,12.0441132 L0,0 Z" />
            </svg>
          </div>

          <div className="relative bg-gray-900 bg-opacity-0 h-[800px]">
            <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
              <div className="flex flex-col items-center justify-center">
                <div className="w-full xl:mb-0 xl:px-16">
                  <div className="bg-white bg-opacity-90 rounded-xl shadow-2xl p-4 sm:p-7 md:p-10">
                    <div className="flex justify-center flex-col items-center text-center pb-5 px-4 md:px-5">
                      <Badge
                        title="In 3 Schritten zum Erfolg"
                        color="#d0ede8"
                      />
                      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold my-5">
                        Unternehmen gesucht?
                      </h1>
                      <p className="text-base sm:text-lg md:text-xl font-normal max-w-xl sm:max-w-2xl md:max-w-4xl mx-auto py-2">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Ipsa, rem neque doloribus impedit explicabo minus
                        laborum cupiditate atque esse consectetur.
                      </p>
                    </div>
                    <form className="flex flex-col justify-center text-center pt-10 pb-4 md:flex-row">
                      <div className="flex flex-col w-full px-2 sm:px-4 md:w-1/3">
                        <label
                          htmlFor="craft"
                          className="text-sm font-medium text-gray-700"
                        >
                          Wählen Sie ein Anlagentyp aus:
                        </label>
                        <Dropdown
                          label={truncateLabel(selectedFacility)}
                          size="lg"
                          color="gray"
                          style={{
                            width: "90%",
                            alignSelf: "center",
                            margin: 2,
                          }}
                        >
                          <div className="max-h-60 overflow-y-auto">
                            {listOfTrades.map((category, index) => (
                              <React.Fragment key={index}>
                                {category.category ? (
                                  <Dropdown
                                    label={category.category}
                                    size="md"
                                    placement="right"
                                    style={{ width: "300px" }}
                                    color="gray"
                                  >
                                    {category.items.map((item, itemIndex) => (
                                      <DropdownItem
                                        onClick={() =>
                                          setSelectedFacility(category.category)
                                        }
                                        key={itemIndex}
                                      >
                                        {item}
                                      </DropdownItem>
                                    ))}
                                  </Dropdown>
                                ) : (
                                  category.items.map((item, itemIndex) => (
                                    <DropdownItem
                                      onClick={() =>
                                        setSelectedFacility(category.category)
                                      }
                                      key={itemIndex}
                                    >
                                      {item}
                                    </DropdownItem>
                                  ))
                                )}
                              </React.Fragment>
                            ))}
                          </div>
                        </Dropdown>
                      </div>

                      <div className="flex flex-col w-full px-2 sm:px-4 md:w-1/3">
                        <label
                          htmlFor="type"
                          className="text-sm font-medium text-gray-700"
                        >
                          Wählen Sie ein Auftragstyp aus:
                        </label>
                        <Dropdown
                          label={truncatedOrderType}
                          size="lg"
                          style={{
                            width: "90%",
                            alignSelf: "center",
                            margin: 2,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            maxWidth: "100%",
                          }}
                          color="gray"
                        >
                          {listOfOrderTypes.map((category, index) => (
                            <React.Fragment key={index}>
                              {category.category ? (
                                <Dropdown
                                  label={category.category}
                                  size="md"
                                  placement="right"
                                  style={{ width: "300px" }}
                                  color="gray"
                                >
                                  {category.items.map((item, itemIndex) => (
                                    <DropdownItem
                                      onClick={() => setSelectedOrderType(item)}
                                      key={itemIndex}
                                    >
                                      {item}
                                    </DropdownItem>
                                  ))}
                                </Dropdown>
                              ) : (
                                category.items.map((item, itemIndex) => (
                                  <DropdownItem
                                    onClick={() => setSelectedOrderType(item)}
                                    key={itemIndex}
                                  >
                                    {item}
                                  </DropdownItem>
                                ))
                              )}
                            </React.Fragment>
                          ))}
                        </Dropdown>
                      </div>

                      <div className="flex flex-col w-full px-2 sm:px-4 md:w-1/3">
                        <label
                          htmlFor="type"
                          className="text-sm font-medium text-gray-700"
                        >
                          Wählen Sie ein Bundesland aus:
                        </label>
                        <Dropdown
                          label={selectedState}
                          size="lg"
                          style={{
                            width: "90%",
                            alignSelf: "center",
                            margin: 2,
                          }}
                          color="gray"
                        >
                          <div className="relative w-90% self-center m-2 max-h-60 overflow-y-auto">
                            {germanStates.map((item, ind) => (
                              <DropdownItem
                                onClick={() => setSelectedState(item.label)}
                                key={ind}
                              >
                                {item.label}
                              </DropdownItem>
                            ))}
                          </div>
                        </Dropdown>
                      </div>
                    </form>
                    <div className="flex justify-center items-center">
                      <Button
                        as="a"
                        href="#"
                        className="mt-10 text-lg bg-[#005e99] hover:bg-[#0071b8] rounded-lg"
                        size="xl"
                      >
                        Jetzt Auftrag Finden
                        <FaArrowRightLong className="ml-2 h-5 w-5" />
                      </Button>
                    </div>
                    <div className="flex justify-center items-center pt-6 gap-4 px-4">
                      <div className="flex items-center">
                        <FaCheck />
                        <label
                          htmlFor="free-signup"
                          className="ml-2 block text-sm md:text-md text-gray-900"
                        >
                          Kostenlos anmelden
                        </label>
                      </div>
                      <div className="flex items-center">
                        <FaCheck />
                        <label
                          htmlFor="test-without-commitment"
                          className="ml-2 block text-sm md:text-md text-gray-900"
                        >
                          Unverbindlich testen
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
