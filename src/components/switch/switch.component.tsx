import React from "react";
import ToggleSwitchProps from "./switch.props";

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  color = "#D93B11",
  active = false,
  disabled = false,
  title,
  onToggle,
}) => {
  return (
    <div className="flex items-center space-x-2">
      {title && <span className="text-sm">{title}</span>}

      <div
        className={`
          relative flex items-center w-14 h-6  rounded-md transition-colors 
          ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        `}
        style={{
          backgroundColor: active ? color : "#ccc",
        }}
        onClick={!disabled ? onToggle : undefined}
      >
        <div
          className={`absolute ${
            active ? "right-1" : "left-1"
          } w-5 h-5 rounded-full bg-white rounded-md shadow-lg transition duration-700`}
        />
      </div>
    </div>
  );
};

export default ToggleSwitch;
