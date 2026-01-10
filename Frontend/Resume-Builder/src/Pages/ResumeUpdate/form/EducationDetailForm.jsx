import React from "react";
import Input from "../../../Component/Input/Input";
import { LuPlus, LuTrash2 } from "react-icons/lu";

const EducationDetailForm = ({
  educationData,
  UpdateArrayItem,
  addArrayItem,
  removeArrayItem,
}) => {
  return (
    <div className="px-5 pt-5">
      <h2 className="text-lg font-semibold text-primary-black">Education</h2>
      <div className="mt-4 flex flex-col gap-4">
        {educationData?.map((education, index) => (
          <div
            key={index}
            className="border border-gray-200/80 p-4 rounded-lg relative"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Degree"
                placeholder="B.Tech in Computer Science"
                type="text"
                value={education.degree || ""}
                onChange={(e) =>
                  UpdateArrayItem(index, "degree", e.target.value)
                }
              />
              <Input
                label="Institution"
                placeholder="XYZ University"
                type="text"
                value={education.institution || ""}
                onChange={(e) =>
                  UpdateArrayItem(index, "institution", e.target.value)
                }
              />
              <Input
                label="Start Date"
                type="month"
                value={education.startDate || ""}
                onChange={(e) =>
                  UpdateArrayItem(index, "startDate", e.target.value)
                }
              />
              <Input
                label="End Date"
                type="month"
                value={education.endDate || ""}
                onChange={(e) =>
                  UpdateArrayItem(index, "endDate", e.target.value)
                }
              />
            </div>
            {educationData?.length > 1 && (
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
          onClick={() =>
            addArrayItem({
              degree: "",
              institution: "",
              startDate: "",
              endDate: "",
            })
          }
          className="self-start flex items-center gap-2 px-4 py-2 rounded bg-purple-100 text-accent text-sm font-medium hover:bg-purple-200 cursor-pointer"
        >
          <LuPlus />
          Add Education
        </button>
      </div>
    </div>
  );
};

export default EducationDetailForm;
