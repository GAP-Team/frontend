// TotalSavingSection.tsx
import React from "react";
import Box from "@mui/material/Box";
import SectionTitle from "@/components/ui/label/SectionTitle";
import DividerDecorator from "@/components/ui/divider/DividerDecorator";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import StatItem from "./StatItem";
import { TbProgressCheck, TbPigMoney } from "react-icons/tb";
import { Divider } from "@mui/material";
import { LuClipboardCheck } from "react-icons/lu";

const TotalSavingSection = (): JSX.Element => {
  const stats = [
    {
      icon: <TbProgressCheck size="2.4rem" />,
      label: "Durchgeführte Ausschreibungen",
      value: 7,
    },
    {
      icon: <LuClipboardCheck size="2.4rem" />,
      label: "Aufträge mit Einsparungen",
      value: 6,
    },
  ];

  return (
    <Box sx={styles.container}>
      <SectionTitle
        text="GESAMMTE EINSPARUNG"
        sx={{ color: "white", lineHeight: "1rem" }}
      />
      <DividerDecorator />

      {/* Stats Section */}
      <Box sx={styles.header} marginTop="1rem" gap={1.5}>
        {stats.map((stat, index) => (
          <React.Fragment key={index}>
            <StatItem icon={stat.icon} label={stat.label} value={stat.value} />
            {index < stats.length - 1 && (
              <Divider
                variant="middle"
                orientation="horizontal"
                flexItem
                sx={{ height: "0.25rem" }}
              />
            )}
          </React.Fragment>
        ))}
      </Box>

      {/* Savings Section */}
      <Box sx={styles.savingsContainer} marginTop="1.5rem" gap={2}>
        {/* Gesamteinsparung Card */}
        <Box sx={styles.savingItem}>
          <Box sx={styles.iconContainer}>
            <TbPigMoney size={85} color="#FECB00" />
          </Box>
          <Typography variant="h4b" fontSize="1.5rem" textAlign="center" mt={1}>
            4.193 €
          </Typography>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            sx={{ marginTop: "auto" }}
          >
            Gesamteinsparung
          </Typography>
        </Box>

        {/* Gesamte Einsparung Progress Card */}
        <Box sx={styles.savingItem}>
          <Box
            sx={styles.iconContainer}
            position="relative"
            display="inline-flex"
          >
            <CircularProgress
              variant="determinate"
              value={48}
              size={85}
              thickness={6}
              sx={{ color: "#FECB00" }}
            />
            <Box
              position="absolute"
              top={0}
              left={0}
              right={0}
              bottom={0}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="h6" fontWeight={600} color="black">
                48%
              </Typography>
            </Box>
          </Box>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            sx={{ marginTop: "auto" }}
          >
            gesamte Einsparung
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default TotalSavingSection;

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  savingsContainer: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
    height: "100%",
    gap: 2,
    flexWrap: "wrap",
  },
  savingItem: {
    backgroundColor: "white",
    borderRadius: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "1rem",
    flex: 1,
    minWidth: "150px",
    minHeight: "200px",
    textAlign: "center",
  },
  iconContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  header: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
};
