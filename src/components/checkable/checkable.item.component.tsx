import React from "react";
import CheckableItemProps from "./checkable.item.props";



export default function CheckableItem({
  label,
  shape = "circle",
  active = false,
  disabled = false,
  color = "#E31A1A",
  onClick,
}: CheckableItemProps) {
  const shapeClass = shape === "circle" ? "rounded-full" : "rounded-none";

  const borderColor = disabled ? "#C4C4C4" : "#000";
  const labelColor = disabled ? "#C4C4C4" : "#000";

  const outerBgColor = disabled ? "#C4C4C4" : "#fff";

  return (
    <div
      className={`flex items-center space-x-2 ${
        disabled ? "cursor-not-allowed" : "cursor-pointer"
      }`}
      onClick={!disabled ? onClick : undefined}
    >
      <div
        className={`relative w-5 h-5 ${shapeClass} border-2`}
        style={{
          borderColor: borderColor,
          backgroundColor: outerBgColor,
        }}
      >
        {active && !disabled && (
          <div
            className={`absolute ${shapeClass} inset-[3px]`}
            style={{ backgroundColor: color }}
          />
        )}
      </div>
      <span className="w-fit" style={{ color: labelColor }}>{label}</span>
    </div>
  );
}
