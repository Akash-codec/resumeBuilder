import React from "react";

const WorkExperience = ({
  company,
  role,
  duration,
  durationColor,
  description,
}) => {
  return (
    <div className="mb-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-[15px] font-semibold text-primary-black">
            {company}
          </h3>
          <p className="text-[15px] font-medium text-gray-600">{role}</p>
        </div>
        <p
          className="text-xs font-bold italic"
          style={{ color: durationColor }}
        >
          {duration}
        </p>
      </div>
      <p className="text-sm font-medium text-gray-600 italic mt-[0.2cqw]">
        {description}
      </p>
    </div>
  );
};

export default WorkExperience;
