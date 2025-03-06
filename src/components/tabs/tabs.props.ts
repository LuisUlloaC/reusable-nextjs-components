import { Dispatch, SetStateAction } from "react";

export default interface CustomTabsProps {
  tabs: string[];
  color?: string;
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
  onChange?: (tabName: string) => void;
}
