import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { FloatingLabelSelectorProps, Option } from "./select.props";


export default function FloatingLabelSelector({
  label,
  options,
  value = "",
  onChange,
  disabled,
  activeColor,
}: FloatingLabelSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    if (!disabled) {
      setIsOpen((prev) => !prev);
    }
  };

  const handleSelect = (option: Option, e: React.MouseEvent) => {
    e.stopPropagation();
    onChange?.(option.value);
    setIsOpen(false);
  };

  const showFloatingLabel = isOpen || value !== "";
  const textColor = activeColor || (value ? "black" : "gray");

  return (
    <div className="relative">
      <div
        className={`relative cursor-pointer border border-gray-300 rounded bg-white transition-colors min-h-[3rem] ${
          disabled ? "bg-gray-100 cursor-not-allowed" : ""
        }`}
      >
        <div onClick={toggle} className="relative px-3 py-3">
          <span className="block" style={{ color: textColor }}>
            {value ? options.find((opt) => opt.value === value)?.label : label}
          </span>
          {isOpen ? (
            <ChevronUp className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" style={{ color: textColor }} />
          ) : (
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
          )}
          <label
            className={`absolute left-3 rounded transform pointer-events-none transition-all duration-200 ${
              showFloatingLabel
                ? "text-xs -top-2 px-1 bg-[#EDEDED] text-[#486873]"
                : "top-1/2 -translate-y-1/2 text-base"
            }`}
          >
            {label}
          </label>
        </div>
        {isOpen && (
          <div>
            {options.map((option) => (
              <div
                key={option.value}
                onClick={(e) => handleSelect(option, e)}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
