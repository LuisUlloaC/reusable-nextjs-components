import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import DoubleRangeSliderProps from "./double.range.selector.props";


const DoubleRangeSlider: React.FC<DoubleRangeSliderProps> = ({
  min = 0,
  max = 100,
  initialMin,
  initialMax,
  onChange,
  color,
  label,
  variant = "principal",
  disabled,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [minVal, setMinVal] = useState<number>(initialMin || min);
  const [maxVal, setMaxVal] = useState<number>(initialMax || max);
  const textColor = color || (label ? "black" : "gray");

  useEffect(() => {
    setMinVal((prev) => Math.max(min, Math.min(prev, max)));
    setMaxVal((prev) => Math.min(max, Math.max(prev, min)));
  }, [min, max]);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), maxVal);
    setMinVal(value);
    onChange?.({ min: value, max: maxVal });
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), minVal);
    setMaxVal(value);
    onChange?.({ min: minVal, max: value });
  };

  const minPos = ((minVal - min) / (max - min)) * 100;
  const maxPos = ((maxVal - min) / (max - min)) * 100;

  const toggle = () => {
    if (!disabled) {
      setIsOpen((prev) => !prev);
    }
  };

  return (
    <div className="flex flex-col w-full">
      {variant === "principal" ? (
        <>
          <span className="w-fit text-sm text-[#486873] bg-[#EDEDED] p-1 rounded">
            {label}
          </span>
          <div className="relative w-full h-8">
            <input
              type="range"
              min={min}
              max={max}
              value={minVal}
              onChange={handleMinChange}
              className="absolute w-full h-1 top-4 appearance-none pointer-events-none z-[3] bg-transparent"
            />
            <input
              type="range"
              min={min}
              max={max}
              value={maxVal}
              onChange={handleMaxChange}
              className="absolute w-full h-1 top-4 appearance-none pointer-events-none z-[4] bg-transparent"
            />

            <div className="absolute top-4 h-1 w-full bg-gray-300 rounded-full" />

            <div
              className="absolute top-4 h-1 bg-black rounded-full"
              style={{ left: `${minPos}%`, width: `${maxPos - minPos}%` }}
            />

            <div
              className="absolute rounded-sm top-6 -translate-x-1/2"
              style={{ left: `${minPos}%` }}
            />

            <div
              className="absolute top-6 -translate-x-1/2"
              style={{ left: `${maxPos}%` }}
            />

            <style>
              {`
            input[type="range"] {
              -webkit-appearance: none;
              -moz-appearance: none;
              appearance: none;
            }

            input[type="range"]::-webkit-slider-thumb {
              -webkit-appearance: none;
              width: 20px;
              height: 20px;
              background: ${color};
              border: none;
              border-radius: 8;
              cursor: pointer;
              pointer-events: all;
              box-shadow: 0 2px 4px rgba(0,0,0,0.1);
              margin-top: -8px;
            }

            input[type="range"]::-moz-range-thumb {
              width: 20px;
              height: 20px;
              background: ${color};
              border: none;
              border-radius: 8;
              cursor: pointer;
              pointer-events: all;
              box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
          `}
            </style>
          </div>
          <div className="flex items-center justify-end">
            <span className="w-fit text-sm text-[#486873] px-2 border rounded">
              {minVal} €
            </span>
            <span className="mx-2">-</span>
            <span className="w-fit text-sm text-[#486873] px-2 border rounded">
              {maxVal} €
            </span>
          </div>
        </>
      ) : (
        <div
          className={`relative w-full cursor-pointer border border-gray-300 rounded-md transition-colors min-h-[3rem] ${
            disabled ? "bg-gray-100 cursor-not-allowed" : ""
          }`}
        >
          <div
            onClick={toggle}
            className="relative flex justify-between gap-2 px-3 py-3 w-full"
          >
            <span className="block" style={{ color: textColor }}>
              {label}
            </span>
            {isOpen ? (
              <ChevronUp
                className=" text-gray-500"
                style={{ color: textColor }}
              />
            ) : (
              <ChevronDown className=" text-gray-500" />
            )}
            <label
              className={`absolute left-3 transform pointer-events-none transition-all duration-200 ${
                isOpen
                  ? "text-xs -top-2 px-1 bg-[#707070] rounded-sm text-white"
                  : "top-1/2 -translate-y-1/2 text-base"
              }`}
            >
              {label}
            </label>
          </div>
          {isOpen && (
            <div className="mx-4 mb-4 ">
              <div className="relative w-full h-8">
                <input
                  type="range"
                  min={min}
                  max={max}
                  value={minVal}
                  onChange={handleMinChange}
                  className="absolute w-full h-1 top-4 appearance-none pointer-events-none z-[3] bg-transparent"
                />
                <input
                  type="range"
                  min={min}
                  max={max}
                  value={maxVal}
                  onChange={handleMaxChange}
                  className="absolute w-full h-1 top-4 appearance-none pointer-events-none z-[4] bg-transparent"
                />

                <div className="absolute top-4 h-1 w-full bg-gray-300 rounded-full" />

                <div
                  className="absolute top-4 h-1 bg-black rounded-full"
                  style={{ left: `${minPos}%`, width: `${maxPos - minPos}%` }}
                />

                <div
                  className="absolute rounded-sm top-6 -translate-x-1/2"
                  style={{ left: `${minPos}%` }}
                />

                <div
                  className="absolute top-6 -translate-x-1/2"
                  style={{ left: `${maxPos}%` }}
                />

                <style>
                  {`
            input[type="range"] {
              -webkit-appearance: none;
              -moz-appearance: none;
              appearance: none;
            }

            input[type="range"]::-webkit-slider-thumb {
              -webkit-appearance: none;
              width: 20px;
              height: 20px;
              background: ${color};
              border: none;
              border-radius: 8;
              cursor: pointer;
              pointer-events: all;
              box-shadow: 0 2px 4px rgba(0,0,0,0.1);
              margin-top: -8px;
            }

            input[type="range"]::-moz-range-thumb {
              width: 20px;
              height: 20px;
              background: ${color};
              border: none;
              border-radius: 8;
              cursor: pointer;
              pointer-events: all;
              box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
          `}
                </style>
              </div>
              <div className="flex items-center justify-end">
                <span className="w-fit text-sm text-[#486873] px-2 border rounded">
                  {minVal} €
                </span>
                <span className="mx-2">-</span>
                <span className="w-fit text-sm text-[#486873] px-2 border rounded">
                  {maxVal} €
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DoubleRangeSlider;
