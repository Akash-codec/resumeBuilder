import React from "react";
import Input from "../../../Component/Input/Input";
import { LuPlus, LuTrash2 } from "react-icons/lu";

const ProjectsForm = ({
  projectsData = [],
  UpdateArrayItem,
  addArrayItem,
  removeArrayItem,
}) => {
  return (
    <div className="px-5 pt-5">
      <h2 className="text-lg font-semibold text-primary-black">Projects</h2>

      <div className="mt-4 flex flex-col gap-4 mb-3">
        {projectsData.map((project, index) => (
          <div
            key={index}
            className="border border-gray-200/80 p-4 rounded-lg relative"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="col-span-2">
                <Input
                  label="Project Title"
                  placeholder="Protfolio Website"
                  type="text"
                  value={project.title || ""}
                  onChange={(e) =>
                    UpdateArrayItem(index, "title", e.target.value)
                  }
                />
              </div>
              <div className="col-span-2">
                <label className="text-[13px] font-medium text-slate-800 mb-1">
                  Description
                </label>
                <textarea
                  placeholder="Short description about the project"
                  className="form-input w-full mt-1"
                  rows={3}
                  value={project.description || ""}
                  onChange={(e) =>
                    UpdateArrayItem(index, "description", e.target.value)
                  }
                ></textarea>
              </div>
              <Input
                label="GitHub Link"
                placeholder="https://github.com/username/project"
                type="url"
                value={project.githubLink || ""}
                onChange={(e) =>
                  UpdateArrayItem(index, "githubLink", e.target.value)
                }
              />
              <Input
                label="Live Demo"
                placeholder="https://yourproject.live"
                type="url"
                value={project.liveDemo || ""}
                onChange={(e) =>
                  UpdateArrayItem(index, "liveDemo", e.target.value)
                }
              />
            </div>
            {projectsData.length > 1 && (
              <button
                type="button"
                onClick={() => removeArrayItem(index)}
                className="absolute top-3 right-3 text-sm text-red-600 hover:underline cursor-pointer"
              >
                <LuTrash2 />
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          className="self-start flex items-center gap-2 px-4 py-2 rounded bg-purple-100 text-accent text-sm font-medium hover:bg-purple-200 cursor-pointer"
          onClick={() =>
            addArrayItem({
              title: "",
              description: "",
              githubLink: "",
              liveDemo: "",
            })
          }
        >
          <LuPlus /> Add Project
        </button>
      </div>
    </div>
  );
};

export default ProjectsForm;
