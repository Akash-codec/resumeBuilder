import React from "react";

const StepProgress = ({ progress }) => {
  return (
    <div className="w-full bg-purple-50 h-2 overflow-hidden rounded-[2px]">
      <div
        className="h-2 bg-linear-to-r from-accent to-purple-700 transition-all rounded"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default StepProgress;
