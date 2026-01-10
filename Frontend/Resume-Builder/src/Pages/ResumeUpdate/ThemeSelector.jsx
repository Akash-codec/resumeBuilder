import React, { useEffect, useRef, useState } from "react";
import {
  DUMMY_RESUME_DATA,
  resumeTemplates,
  themeColorPalette,
} from "../../Utils/data.js";
import Tabs from "../../Component/Tabs.jsx";
import { LuCircleCheckBig } from "react-icons/lu";
import TemplateCard from "../../Component/Cards/TemplateCard.jsx";
import ColorPalette from "../../Component/Cards/ColorPalette.jsx";
import RenderResume from "../../Component/Resumetemplate/RenderResume.jsx";

const TAB_DATA = [{ lable: "Template" }, { lable: "Color Palette" }];

const ThemeSelector = ({
  selectedTheme,
  setSelectedTheme,
  resumeData,
  onClose,
}) => {
  const resumeRef = useRef(null);
  const [baseWidth, setBaseWidth] = useState(800);
  const [tabValue, setTabValue] = useState("Template");
  const [selectedColorPalette, setSelectedColorPalette] = useState({
    colors: selectedTheme?.colorPalette,
    index: -1,
  });
  const [selectedTemplate, setSelectedTemplate] = useState({
    theme: selectedTheme?.theme || "",
    index: -1,
  });

  // Handle Theme change
  const handleThemeSelect = () => {
    setSelectedTheme({
      colorPalette: selectedColorPalette?.colors,
      theme: selectedTemplate?.theme,
    });
    onClose();
  };

  const updateBaswWidth = () => {
    if (resumeRef.current) {
      setBaseWidth(resumeRef.current.offsetWidth);
    }
  };

  useEffect(() => {
    updateBaswWidth();
    window.addEventListener("resize", updateBaswWidth);
    return () => {
      window.removeEventListener("resize", updateBaswWidth);
    };
  }, []);
  return (
    <div className="conatiner mx-auto px-2 md:px-0">
      <div className="flex items-center justify-between mb-5 mt-2">
        <Tabs tabs={TAB_DATA} activeTab={tabValue} setActiveTab={setTabValue} />

        <button className="btn-small-light" onClick={() => handleThemeSelect()}>
          <LuCircleCheckBig className="text-[16px]" />
          Done
        </button>
      </div>
      <div className="grid grid-cols-12 gap-3 px-3">
        <div className="col-span-12 md:col-span-7 lg:col-span-6 bg-primary-white">
          <div className="grid grid-cols-2 gap-5 max-h-[80vh] overflow-scroll custom-scrollbar md:px-5">
            {tabValue === "Template" &&
              resumeTemplates.map((template, index) => (
                <TemplateCard
                  key={index}
                  thumbnailImg={template.thumbnailImg}
                  isSelected={selectedTemplate?.index === index}
                  onSelect={() =>
                    setSelectedTemplate({
                      theme: template.id,
                      index,
                    })
                  }
                />
              ))}
            {tabValue === "Color Palette" &&
              themeColorPalette.themeOne.map((color, index) => (
                <ColorPalette
                  key={`palette_${index}`}
                  colors={color}
                  isSelected={selectedColorPalette?.index === index}
                  onSelect={() =>
                    setSelectedColorPalette({
                      colors: color,
                      index,
                    })
                  }
                />
              ))}
          </div>
        </div>
        <div
          className="col-span-12 md:col-span-5 lg:col-span-6 bg-primary-white -mt-3"
          ref={resumeRef}
        >
          <RenderResume
            templateId={selectedTemplate?.theme || ""}
            resumeData={resumeData || DUMMY_RESUME_DATA}
            containerWidth={baseWidth}
            colorPalette={selectedColorPalette?.colors || []}
          />
        </div>
      </div>
    </div>
  );
};

export default ThemeSelector;
