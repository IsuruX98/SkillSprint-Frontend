import React, { useState } from "react";
import AddModuleDetails from "./ModuleTabs/AddModuleDetails";
import AddVideoDetails from "./ModuleTabs/AddVideoDetails";
import AddReadingDetails from "./ModuleTabs/AddReadingDetails";
import AddQuizDetails from "./ModuleTabs/AddQuizDetails";

const AddModule = () => {
  const [activeTab, setActiveTab] = useState("Add Module Details");

  const handleTabChange = (label) => {
    setActiveTab(label);
  };

  const tabs = [
    { label: "Add Module Details" },
    { label: "Add Video" },
    { label: "Add Reading" },
    { label: "Add Quiz" },
  ];

  const renderTabs = () => {
    return tabs.map((tab) => (
      <button
        key={tab.label}
        onClick={() => handleTabChange(tab.label)}
        className={`${
          activeTab === tab.label
            ? "bg-blue-500 text-white"
            : " hover:bg-gray-100 hover:text-blue-500"
        } px-4 py-2 rounded-lg border`}
      >
        {tab.label}
      </button>
    ));
  };

  const renderContent = () => {
    switch (activeTab) {
      case "Module Details":
        return <AddModuleDetails />;
      case "Add Video":
        return <AddVideoDetails />;
      case "Add Reading":
        return <AddReadingDetails />;
      case "Add Quiz":
        return <AddQuizDetails />;
      default:
        return null;
    }
  };

  return (
    <div className="">
      <div className="flex flex-wrap justify-center">
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-2 w-full">
          {renderTabs()}
        </div>
      </div>
      <div className="py-5">{renderContent()}</div>
    </div>
  );
};

export default AddModule;
