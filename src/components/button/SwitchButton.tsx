import { useState } from "react";
import Switch from "@mui/material/Switch";

interface SwitchButtonProps {
  color: "primary" | "secondary" | "success" | "error" | "warning" | "info";
  checked: boolean;
  userId: string;
  onChange: (id: string, isChecked: boolean) => void;
}

const SwitchButton: React.FC<SwitchButtonProps> = ({
  color,
  checked,
  userId,
  onChange,
}) => {
  const [isChecked, setIsChecked] = useState<boolean>(checked);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setIsChecked(event.target.checked);
    onChange(userId, event.target.checked);
  };

  return <Switch color={color} checked={isChecked} onChange={handleOnChange} />;
};

export default SwitchButton;
