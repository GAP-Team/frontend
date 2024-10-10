import Typography from "@mui/material/Typography";
import { SxProps, Theme } from "@mui/material/styles";
import Link from "next/link";
interface SectionTitleProps {
  text: string;
  sx?: SxProps<Theme>;
  href?: string;
}
const SectionTitle = ({ text, sx, href }: SectionTitleProps): JSX.Element => {
  const sectionStyles = { ...styles, ...sx };
  if (href) {
    return (
      <Link href={href} passHref>
        <Typography variant="subtitle2" sx={sectionStyles} component="a" style={{ textDecoration: 'none' }}>
          {text}
        </Typography>
      </Link>
    );
  }

  return (
    <Typography variant="subtitle2" sx={sectionStyles}>
      {text}
    </Typography>
  );
};
export default SectionTitle;

// Styles for the SectionTitle component
const styles = {
  display: "flex",
  fontSize: "0.75rem",
  fontWeight: "600",
  lineHeight: "1rem",
  color: "#8D999C",
};
