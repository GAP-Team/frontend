import Typography from '@mui/material/Typography';

interface LabelWithAsteriskProps {
  children: string;
}

const LabelWithAsterisk: React.FC<LabelWithAsteriskProps> = ({ children }) => (
  <Typography variant="gsub" color="gray.500">
    {children} <span style={{ color: 'red' }}>*</span>
  </Typography>
);

export default LabelWithAsterisk;