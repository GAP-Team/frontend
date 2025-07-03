import { useRouter } from "next/navigation";
import DoneIcon from "@mui/icons-material/Done";
import Image, { StaticImageData } from "next/image";
import { Box, useMediaQuery, useTheme } from "@mui/material";

import { ROUTES } from "@/utils/routes";
import RoundButton from "../inputs/button/RoundButton";

interface TabContentProps {
  title: string;
  features: string[];
  image: StaticImageData;
}

const TabContent: React.FC<TabContentProps> = ({
  title,
  image,
  features,
}): JSX.Element => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleOnClick = (): void => {
    router.push(ROUTES.LOGIN);
  };

  return (
    <Box className="relative flex flex-col md:flex-row justify-between mb-8 pt-6 md:pt-20">
      <Box className="text-center md:text-left w-full md:w-[45%] order-2 md:order-1 mt-6 md:mt-0">
        <Box className="flex flex-col">
          <Box className="flex flex-col justify-between lg:justify-start">
            <p className="text-xl md:text-2xl font-extrabold mb-4 md:mb-5">
              {title}
            </p>
            {features.map((feature, index) => (
              <Box className="flex flex-row items-start mb-2" key={index}>
                <DoneIcon
                  fontSize={isMobile ? "medium" : "large"}
                  style={{ color: "#00d8af", flexShrink: 0, marginTop: "4px" }}
                />
                <p className="text-base md:text-lg font-semibold md:font-bold ml-2 md:ml-4 text-left">
                  {feature}
                </p>
              </Box>
            ))}
            <Box className="pt-6 md:pt-12 flex justify-center md:justify-start">
              <RoundButton
                text="Zum Immobilienmanagement"
                color="#17ABA9"
                hoverColor="#FFFFFF"
                handleOnClick={handleOnClick}
              />
            </Box>
          </Box>
        </Box>
      </Box>

      <Box className="w-full md:w-[55%] text-center order-1 md:order-2">
        <Box
          className="w-full md:w-[95%] mx-auto"
          sx={{
            borderRadius: "1rem",
            boxShadow: "0 8px 12px rgba(0, 0, 0, 0.15)",
            overflow: "hidden",
          }}
        >
          <Image
            alt="Feature Image"
            layout="responsive"
            src={image}
            style={{ borderRadius: "0.5rem" }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default TabContent;
