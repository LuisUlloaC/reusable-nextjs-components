export default interface InputProps {
  label: string;
  placeholder?: string;
  type?: "text" | "password" | "info" | "tel";
  error?: string;
  value: string;
  onChange: (value: string) => void;
  color?: string;
  onCountryChange?: (country: string) => void;
  IconComponent?: React.ReactNode;
}
