export interface Option {
  label: string;
  value: string;
}

export interface FloatingLabelSelectorProps {
  label: string;
  options: Option[];
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  activeColor?: string;
}
