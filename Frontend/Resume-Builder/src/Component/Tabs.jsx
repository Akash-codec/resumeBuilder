import React from "react";

const Tabs = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="my-2">
      <div className="flex">
        {tabs.map((tab) => {
          return (
            <button
              key={tab.lable}
              className={`relative px-3 md:px-4 py-2 text-sm font-medium ${
                activeTab === tab.lable
                  ? "text-accent"
                  : "text-gray-500 hover:text-gray-800"
              } cursor-pointer`}
              onClick={() => setActiveTab(tab.lable)}
            >
              <div className="flex items-center">
                <span className="text-[14px] font-semibold text-accent">
                  {tab.lable}
                </span>
              </div>
              {activeTab === tab.lable && (
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-linear-to-r from-accent/0 to-accent"></div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Tabs;
