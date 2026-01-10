import React from "react";

const ColorPalette = ({ colors, isSelected, onSelect }) => {
  return (
    <div
      className={`h-28 bg-purple-50 flex rounded-lg overflow-hidden border-2 ${
        isSelected ? "border-accent" : "border-none"
      }`}
    >
      {colors.map((color, index) => (
        <div
          key={`color_${index}`}
          className="flex-1"
          style={{ backgroundColor: color }}
          onClick={onSelect}
        />
      ))}
    </div>
  );
};

export default ColorPalette;
