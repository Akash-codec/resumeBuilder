import React from "react";
import { LuTrash2, LuPlus } from "react-icons/lu";
import Input from "../../../Component/Input/Input";
import RatingInput from "../../../Component/Input/RatingInput";

const SkillsInfoForm = ({
  skillsData,
  UpdateArrayItem,
  addArrayItem,
  removeArrayItem,
}) => {
  return (
    <div className="px-5 pt-5">
      <h2 className="text-lg font-semibold text-primary-black">Skills</h2>

      <div className="mt-4 flex flex-col gap-4">
        {skillsData?.map((skill, index) => (
          <div
            key={index}
            className="border border-gray-200/80 p-4 rounded-lg relative"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Skill Name"
                placeholder="JavaScript"
                type="text"
                value={skill.name || ""}
                onChange={(e) => UpdateArrayItem(index, "name", e.target.value)}
              />
              <div className="flex flex-col">
                <label className="text-[13px] text-primary-black mb-1">
                  Proficiency ({Math.round((skill.progress || 0) / 20)}/5)
                </label>
                <div className="mt-5">
                  <RatingInput
                    value={skill.progress || 0}
                    total={5}
                    onChange={(newValue) =>
                      UpdateArrayItem(index, "progress", newValue)
                    }
                  />
                </div>
              </div>
            </div>

            {skillsData.length > 1 && (
              <button
                type="button"
                className="absolute top-3 right-3 text-sm text-red-600 hover:underline cursor-pointer "
                onClick={() => removeArrayItem(index)}
              >
                <LuTrash2 className="text-lg" />
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          className="self-start flex items-center gap-2 px-4 py-2 bg-purple-100 text-accent rounded-lg text-sm font-medium hover:bg-purple-200 cursor-pointer"
          onClick={() =>
            addArrayItem({
              name: "",
              progress: 0,
            })
          }
        >
          <LuPlus /> Add Skill
        </button>
      </div>
    </div>
  );
};

export default SkillsInfoForm;
