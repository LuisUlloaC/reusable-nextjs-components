export default interface DoubleRangeSliderProps {
  label: string;
  min?: number;
  max?: number;
  color?: string;
  initialMin?: number;
  initialMax?: number;
  onChange?: (values: { min: number; max: number }) => void;
  variant?: "principal" | "dropdown";
  disabled?: boolean;
}
