import React from "react";

const TemplateCard = ({ thumbnailImg, isSelected, onSelect }) => {
  return (
    <div
      className={`h-auto flex items-center justify-between bg-primary-white rounded-lg border border-gray-200 hover:border-accent/60 overflow-hidden cursor-pointer ${
        isSelected ? "border-accent border-2" : ""
      }`}
      onClick={onSelect}
    >
      {thumbnailImg ? (
        <img src={thumbnailImg} alt="" className="object-cover rounded" />
      ) : (
        <div></div>
      )}
    </div>
  );
};
export default TemplateCard;
