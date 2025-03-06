import React from "react";
import ReactCountryFlag from "react-country-flag";
import { useState, useEffect, useRef } from "react";
import {
  getCountries,
  getCountryCallingCode,
  CountryCode,
} from "libphonenumber-js";

interface CountrySelectProps {
  selectedCountry: CountryCode | string;
  handleCountryChange: (country: CountryCode) => void;
}

const CountrySelect: React.FC<CountrySelectProps> = ({
  selectedCountry,
  handleCountryChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const countries: CountryCode[] = getCountries();

  const handleClickOutside = (event: MouseEvent) => {
    if (
      wrapperRef.current &&
      !wrapperRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative ml-2" ref={wrapperRef}>
      <div
        role="button"
        tabIndex={0}
        className="flex items-center cursor-pointer text-gray-500 hover:text-gray-700 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={(e) => e.key === "Enter" && setIsOpen(!isOpen)}
      >
        <ReactCountryFlag
          countryCode={selectedCountry}
          svg
          style={{ width: "1.5em", height: "1.5em" }}
          className="mr-1"
        />
        <span>+{getCountryCallingCode(selectedCountry as CountryCode)}</span>
      </div>

      {isOpen && (
        <div
          role="listbox"
          className="absolute z-10 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 max-h-60 overflow-y-auto"
        >
          <div className="p-2">
            {countries.map((country) => (
              <div
                key={country}
                role="option"
                aria-selected={country === selectedCountry}
                className={`flex items-center p-2 cursor-pointer rounded-md hover:bg-gray-100 ${
                  country === selectedCountry ? "bg-blue-50" : ""
                }`}
                onClick={() => {
                  handleCountryChange(country);
                  setIsOpen(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleCountryChange(country);
                    setIsOpen(false);
                  }
                }}
                tabIndex={0}
              >
                <ReactCountryFlag
                  countryCode={country}
                  svg
                  style={{ width: "1.5em", height: "1.5em" }}
                  className="mr-2"
                />
                <span className="text-gray-700">
                  +{getCountryCallingCode(country)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CountrySelect;
