export default interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "principal" | "secundario";
  activeColor?: string;
  hoverColor?: string;
  inactiveColor?: string;
}
