import { Button } from "flowbite-react";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import gapLogo from "../../../../public/icons/gap-logo.svg";
import { Lalezar } from "next/font/google";
import { FaArrowRightToBracket } from "react-icons/fa6";
const lalezar = Lalezar({ subsets: ["latin"], weight: ["400"] });
import { FiMenu } from "react-icons/fi";

const GNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="container p-4 mx-auto lg:flex lg:justify-between lg:items-center bg-opacity-70">
      <div className="flex items-center justify-between">
        <Link
          href="#"
          className="flex flex-row justify-start items-center gap-4"
        >
          <div style={{position:"relative", height:'3rem',width:'3rem' }}>
            <Image
              alt="Follow us on Twitter"
              src={gapLogo}
              fill
              priority
            />
          </div>
          <p
            className={`${lalezar.className} text-[#0D1F4E] text-3xl md:text-5xl  text-center md:mt-3 `}
          >
            {" "}
            {/* Ensure text is centered */}
            GAP
          </p>
        </Link>
        <div className="flex lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
            aria-label="toggle menu"
          >
            {isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <FiMenu className="h-8 w-8" />
            )}
          </button>
        </div>
      </div>

      <div
        className={`absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white shadow-md lg:bg-transparent lg:dark:bg-transparent lg:shadow-none dark:bg-gray-900 lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center ${isOpen ? "translate-x-0 opacity-100" : "opacity-0 -translate-x-full"}`}
      >
        <div className="flex flex-col space-y-4 lg:mt-0 lg:flex-row lg:-px-8 lg:space-y-0">
          <a
            className="text-gray-700 transition-colors text-lg font-semibold duration-300 transform lg:mx-8 dark:text-gray-200 dark:hover:text-blue-400 hover:text-[#005e99]"
            href="#"
          >
            Startseite
          </a>
          <a
            className="text-gray-700 transition-colors text-lg font-semibold duration-300 transform lg:mx-8 dark:text-gray-200 dark:hover:text-blue-400 hover:text-[#005e99]"
            href="#"
          >
            Für Dienstleister
          </a>
          <a
            className="text-gray-700 transition-colors text-lg font-semibold duration-300 transform lg:mx-8 dark:text-gray-200 dark:hover:text-blue-400 hover:text-[#005e99]"
            href="#"
          >
            für Immobilienbetreiber
          </a>
        </div>
      </div>
      <Button
        as="a"
        href="/login"
        className="block px-5 py-2 mt-4 text-center text-sm text-white rounded-lg text-md lg:mt-0 capitalize lg:w-auto bg-[#005e99] hover:bg-[#0071b8]"
        size="sm"
      >
        <FaArrowRightToBracket className="mr-2 h-5 w-5" />
        Anmeldung
      </Button>
    </nav>
  );
};

export default GNavbar;
