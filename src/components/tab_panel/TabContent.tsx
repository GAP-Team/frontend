import { useRouter } from "next/navigation";
import DoneIcon from "@mui/icons-material/Done";
import Image, { StaticImageData } from "next/image";

import { ROUTES } from "@/utils/routes";
import RoundButton from "../button/RoundButton";

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

  const handleOnClick = (): void => {
    router.push(ROUTES.LOGIN);
  };

  return (
    <>
      <div className="relative flex flex-row justify-between mb-8 pt-20">
        <div className="text-center xl:text-left " style={styles.contentDiv}>
          <div className="flex flex-col grid-cols-1">
            <div className="flex flex-col justify-between lg:justify-start">
              <p style={styles.tabSubtitle}>{title}</p>
              {features.map((feature, index) => (
                <div className="grid-cols-1 flex flex-row" key={index}>
                  <DoneIcon fontSize="large" style={{ color: "#00d8af" }} />
                  <p className="text-lg font-normal" style={styles.featureText}>
                    {feature}
                  </p>
                </div>
              ))}
              <div className="pt-12">
                <RoundButton
                  text="Zum Immobilienmanagement"
                  color="#17ABA9"
                  hoverColor="#FFFFFF"
                  handleOnClick={handleOnClick}
                />
              </div>
            </div>
          </div>
        </div>
        <div
          className="w-full text-center xl:text-left "
          style={styles.imageDiv}
        >
          <div style={styles.imageHolder}>
            <Image
              alt="Feature Image"
              layout="responsive"
              src={image}
              style={styles.image}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default TabContent;

const styles = {
  tabSubtitle: {
    fontWeight: "900",
    fontSize: "1.5rem",
    marginBottom: "1.25rem",
  },
  contentDiv: {
    width: "45%",
  },
  imageDiv: {
    width: "55%",
  },
  imageHolder: {
    width: "95%",
    height: "auto",
    borderRadius: "2rem",
    boxShadow:
      "0 16px 15px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
  },
  image: {
    borderRadius: "0.8rem",
  },
  featureText: {
    fontSize: "20px",
    fontWeight: "700",
    marginLeft: "1rem",
  },
};
