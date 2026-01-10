import React, { useEffect, useState } from "react";
import { getLightColorFromImage } from "../../Utils/helper";

const ResumeSummaryCard = ({ imgUrl, title, lastUpdated, onSelect }) => {
  const [bgColor, setBgColor] = useState("#F4FAFF");

  useEffect(() => {
    if (imgUrl) {
      getLightColorFromImage(imgUrl)
        .then((color) => setBgColor(color))
        .catch(() => {
          setBgColor("#F4FAFF");
        });
    }
  }, [imgUrl]);

  return (
    <div
      className="h-[300px] flex flex-col items-center justify-between bg-primary-white rounded-lg border border-gray-200 hover:border-accent/50 overflow-hidden cursor-pointer"
      style={{ background: bgColor }}
      onClick={onSelect}
    >
      <div className="h">
        {imgUrl ? (
          <img src={imgUrl} alt="" className="w-full h-[200px] rounded" />
        ) : (
          <div></div>
        )}
      </div>
      <div className="w-full bg-primary-white px-4 py-3">
        <h5 className="text-sm font-medium truncate overflow-hidden whitespace-nowrap">
          {title}
        </h5>
        <p className="text-xs font-medium text-primary-black mt-0.5">
          Last Updated: {lastUpdated}
        </p>
      </div>
    </div>
  );
};

export default ResumeSummaryCard;
