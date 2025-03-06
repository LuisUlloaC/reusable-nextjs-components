import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import DropdownProps from "./dropdown.props";



const Dropdown = React.forwardRef<HTMLDivElement, DropdownProps>(
  (
    { activeColor, inactiveColor, disabled, title, children, ...props },
    ref
  ) => {
    const defaultColors = {
      active: "#D93B11",
      inactive: "#F2A99B",
    };

    const activeColorValue = activeColor || defaultColors.active;
    const inactiveColorValue = inactiveColor || defaultColors.inactive;

    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
      if (!disabled) {
        setIsOpen((prev) => !prev);
      }
    };

    const controlStyle: React.CSSProperties = {
      border: "2px solid #707070",
    };

    return (
      <div className="relative w-64" ref={ref} {...props}>
        <div
          className={`flex flex-col items-center justify-between p-4 w-full rounded-md bg-white transition-colors ${
            disabled ? "cursor-not-allowed" : "cursor-pointer"
          }`}
          style={controlStyle}
        >
          <div
            className="flex w-full justify-between items-center"
            onClick={toggleDropdown}
            style={{ color: isOpen ? activeColorValue : inactiveColorValue }}
          >
            <span>{title}</span>
            <ChevronDown
              className="w-5 h-5 transform transition-transform select-none"
              style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
              stroke={disabled ? inactiveColorValue : "#707070"}
            />
          </div>

          {isOpen && children}
        </div>
      </div>
    );
  }
);

Dropdown.displayName = "Dropdown";

export default Dropdown;
