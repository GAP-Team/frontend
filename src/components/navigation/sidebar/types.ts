import { IconType } from "react-icons";

export interface SubItem {
  id: number;
  text: string;
  url: string;
  component?: React.ReactElement;
}
export interface SidebarItemTypes {
  id: number;
  icon: IconType;
  text: string;
  url?: string;
  component?: React.ReactElement;
  subItems?: SubItem[];
}