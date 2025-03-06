import React from "react";
import InputProps from "./input.props";
import { Eye, EyeOff, Info } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import CountrySelect from "../utils/country.code.selector.component";

export default function Input({
  label,
  placeholder,
  type = "text",
  error,
  value,
  onChange,
  color = "#3B82F6",
  IconComponent = undefined,
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("ES");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.setProperty("--input-focus-color", color);
    }
  }, [color]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const renderIcon = () => {
    switch (type) {
      case "text":
        return IconComponent ? (
          typeof IconComponent === "function" ? (
            //@ts-ignore
            <IconComponent />
          ) : (
            <>{IconComponent}</>
          )
        ) : null;
      case "info":
        return <Info className="h-4 w-4 text-gray-400" />;
      case "password":
        return showPassword ? (
          <EyeOff
            className="h-4 w-4 text-gray-400 cursor-pointer"
            onClick={() => setShowPassword(false)}
          />
        ) : (
          <Eye
            className="h-4 w-4 text-gray-400 cursor-pointer"
            onClick={() => setShowPassword(true)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative">
      {type === "tel" && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10 flex items-center">
          <CountrySelect
            selectedCountry={selectedCountry}
            handleCountryChange={setSelectedCountry}
          />
        </div>
      )}
      <input
        ref={inputRef}
        type={
          type === "password" ? (showPassword ? "text" : "password") : "text"
        }
        className={`
          peer w-full px-3 py-2 text-sm border rounded outline-none transition-all
          placeholder-transparent
          ${error ? "border-red-500" : "border-gray-200 focus:border-current"}
          ${type === "tel" ? "pl-24" : ""}
        `}
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={{ borderColor: isFocused ? color : "" }}
      />
      <label
        className={`
          absolute left-2 -top-2.5 px-1 text-sm rounded transition-all bg-white
          peer-placeholder-shown:text-base peer-placeholder-shown:top-2 
          peer-placeholder-shown:text-gray-400
          peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-current
          ${
            type === "tel"
              ? "peer-placeholder-shown:left-24"
              : "peer-placeholder-shown:left-2"
          }
        `}
        style={{
          backgroundColor: isFocused || value ? color : "white",
          color: isFocused || value ? "#486873" : "",
        }}
      >
        {label}
      </label>
      {renderIcon() && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          {renderIcon()}
        </div>
      )}
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
