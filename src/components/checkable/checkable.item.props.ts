export default interface CheckableItemProps {
  label: React.ReactNode | string;
  shape?: "circle" | "square";
  active?: boolean;
  disabled?: boolean;
  color?: string;
  onClick?: () => void;
}
