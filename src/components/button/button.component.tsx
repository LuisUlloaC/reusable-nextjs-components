import React, { useState } from "react";
import ButtonProps from "./button.props";

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = "",
      variant = "principal",
      activeColor,
      hoverColor,
      inactiveColor,
      disabled,
      ...props
    },
    ref
  ) => {
    const [isHovered, setIsHovered] = useState(false);

    const defaultColors = {
      principal: {
        active: "#D93B11",
        hover: "#E31A1A",
        inactive: "#F2A99B",
      },
      secundario: {
        active: "#486873",
        hover: "#486873",
        inactive: "#486873",
      },
    };

    const activeColorValue = activeColor || defaultColors[variant].active;
    const hoverColorValue = hoverColor || defaultColors[variant].hover;
    const inactiveColorValue = inactiveColor || defaultColors[variant].inactive;

    const getButtonStyles = () => {
      if (disabled) {
        return variant === "principal"
          ? { backgroundColor: inactiveColorValue, color: "#C4C4C4" }
          : { borderColor: inactiveColorValue, color: inactiveColorValue };
      }
      if (isHovered) {
        return variant === "principal"
          ? { backgroundColor: hoverColorValue }
          : { borderColor: hoverColorValue, backgroundColor: hoverColorValue };
      }
      return variant === "principal"
        ? { backgroundColor: activeColorValue }
        : { borderColor: activeColorValue, color: activeColorValue };
    };

    const baseStyles =
      "inline-flex items-center justify-center rounded text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 w-full py-3 px-4";
    const variantStyles =
      variant === "principal" ? "text-white" : "bg-white border-2";

    return (
      <button
        className={`${baseStyles} ${variantStyles} ${className}`}
        ref={ref}
        disabled={disabled}
        style={getButtonStyles()}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
