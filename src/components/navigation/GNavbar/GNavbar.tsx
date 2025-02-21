import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@mui/material";
import { FiMenu } from "react-icons/fi";
import { Lalezar } from "next/font/google";
import { usePathname } from "next/navigation";
import { FaArrowRightToBracket } from "react-icons/fa6";
import { ROUTES, REAL_ESTATE_BASE } from "@/utils/routes";
import gapLogo from "../../../../public/icons/gap-logo.svg";

const lalezar = Lalezar({ subsets: ["latin"], weight: ["400"] });

const GNavbar = (): JSX.Element => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Als Dienstleister", path: ROUTES.SERVICE_PROVIDER_HOME },
    { name: "Als Immobilienbetreiber", path: REAL_ESTATE_BASE },
  ];

  return (
    <nav className="container p-4 mx-auto lg:flex lg:justify-between lg:items-center bg-opacity-70">
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="flex flex-row justify-start items-center gap-4"
        >
          <div style={{ position: "relative", height: "3rem", width: "3rem" }}>
            <Image alt="Follow us on Twitter" src={gapLogo} fill priority />
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
          {menuItems.map((item) => (
            <Link key={item.path} href={item.path}>
              <span
                className={`
                  text-gray-700 
                  transition-colors 
                  text-lg 
                  font-semibold 
                  duration-300 
                  transform lg:mx-8 
                  dark:text-gray-200 
                  dark:hover:text-blue-400 
                  hover:text-[#005e99]
                  ${pathname === item.path && "bg-yellow-500"}
                `}
                style={
                  pathname === item.path
                    ? styles.activeMenu
                    : styles.inActiveMenu
                }
              >
                {item?.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
      <Button
        component="a"
        href="/login"
        className="block px-5 py-2 mt-4 text-center rounded-lg text-md"
        size="small"
        style={styles.loginButton}
        sx={{
          textTransform: "none",
          whiteSpace: "pre",
        }}
      >
        <FaArrowRightToBracket className="mr-2 h-5 w-5" />
        Anmeldung
      </Button>
    </nav>
  );
};

export default GNavbar;

const styles = {
  activeMenu: {
    background: "#D0EDE8",
    padding: 15,
    borderRadius: 7,
  },
  inActiveMenu: {
    background: "#FFFFFF",
  },
  loginButton: {
    background: "#005e99",
    color: "#FFFFFF",
    padding: "0.7rem",
    paddingRight: "1.7rem",
    paddingLeft: "1.7rem",
    borderRadius: 7,
    "&:hover": {
      background: "#0071b8",
    },
  },
};
