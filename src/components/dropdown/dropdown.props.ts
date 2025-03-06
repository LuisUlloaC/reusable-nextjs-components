export default interface DropdownProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  disabled?: boolean;
  activeColor?: string;
  inactiveColor?: string;
  children: React.ReactNode;
}
