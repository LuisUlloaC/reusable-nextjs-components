import React from "react";
import CustomTabsProps from "./tabs.props";

export default function Tabs({
  tabs,
  color = "#E74C3C",
  activeTab,
  setActiveTab,
  onChange,
}: CustomTabsProps) {
  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
    if (onChange) {
      onChange(tabName);
    }
  };

  return (
    <div className="flex">
      {tabs.map((title) => (
        <button
          key={title}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === title
              ? "bg-white border border-1"
              : "bg-gray-100 border-none hover:bg-gray-200"
          }
          ${
            tabs.indexOf(title) === 0
              ? "rounded-tl rounded-bl"
              : "rounded-tl-none rounded-bl-none"
          } 
            ${
              tabs.indexOf(title) === tabs.length - 1
                ? "rounded-tr rounded-br"
                : "rounded-tr-none rounded-br-none"
            }
          `}
          style={{
            borderColor: activeTab === title ? color : "transparent",
          }}
          onClick={() => handleTabClick(title)}
        >
          <span
            className="text-sm"
            style={{ color: activeTab === title ? color : "" }}
          >
            {title}
          </span>
        </button>
      ))}
    </div>
  );
}
