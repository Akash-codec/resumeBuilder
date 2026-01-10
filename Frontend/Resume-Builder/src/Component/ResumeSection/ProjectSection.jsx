import React from "react";
import { LuGithub, LuExternalLink } from "react-icons/lu";
import ActionLink from "./ActionLink";

const ProjectSection = ({
  title,
  description,
  githubLink,
  liveDemoUrl,
  bgColor,
  isPreview,
}) => {
  return (
    <div className="mb-5">
      <h3
        className={`${
          isPreview ? "text-sm" : "text-base"
        } font-semibold text-primary-black`}
      >
        {title}
      </h3>
      <p className="text-sm text-gray-700 font-medium mt-1">{description}</p>
      <div className="flex item-center gap-3 mt-2">
        {githubLink && (
          <ActionLink icon={<LuGithub />} link={githubLink} bgColor={bgColor} />
        )}
        {liveDemoUrl && (
          <ActionLink
            icon={<LuExternalLink />}
            link={liveDemoUrl}
            bgColor={bgColor}
          />
        )}
      </div>
    </div>
  );
};

export default ProjectSection;
