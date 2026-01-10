import React from "react";
import Input from "../../../Component/Input/Input";
import RatingInput from "../../../Component/Input/RatingInput";
import { LuPlus, LuTrash2 } from "react-icons/lu";

const AdditionalInfoForm = ({
  languagesData,
  interestsData,
  UpdateArrayItem,
  addArrayItem,
  removeArrayItem,
}) => {
  return (
    <div className="px-5 pt-5">
      <h2 className="text-lg font-semibold text-primary-black">
        Additional Info
      </h2>

      {/* languages */}
      <div className="mt-6">
        <h3 className="texxt-sm font-semibold text-gray-700 mb-2">Languages</h3>
        <div className="flex flex-col gap-4">
          {languagesData?.map((language, index) => (
            <div
              key={index}
              className="border border-gray-200 p-4 rounded-lg relative"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                <Input
                  label="Language"
                  placeholder="e.g. English"
                  type="text"
                  value={language.name || ""}
                  onChange={(e) =>
                    UpdateArrayItem("languages", index, "name", e.target.value)
                  }
                />
                <div>
                  <label className="text-xs font-medium text-slate-600 mb-7 block">
                    Proficiency
                  </label>
                  <RatingInput
                    value={language.progress || 0}
                    onChange={(value) =>
                      UpdateArrayItem("languages", index, "progress", value)
                    }
                    total={5}
                    activeColor="#0ea5e9"
                    inactiveColor="#e0f2fe"
                  />
                </div>
              </div>
              {languagesData?.length - 1 === index && (
                <button
                  type="button"
                  onClick={() => removeArrayItem("languages", index)}
                  className="absolute top-3 right-3 texxt-sm text-red-500 hover:underline cursor-pointer"
                >
                  <LuTrash2 />
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem("languages", { name: "", progress: 0 })}
            className="self-start flex items-center gap-2 px-4 py-2 rounded bg-purple-100 text-accent hover:bg-purple-200 text-sm font-medium cursor-pointer"
          >
            <LuPlus /> Add Language
          </button>
        </div>
      </div>

      {/* Interest Section  */}
      <div className="mt-8 mb-4">
        <h3 className="text-sm font-semibold text-gray-700">Interests</h3>
        <div className="flex flex-col">
          {interestsData?.map((interest, index) => (
            <div className="relative rounded-lg" key={index}>
              <Input
                placeholder="e.g. Programming"
                value={interest || ""}
                onChange={(e) =>
                  UpdateArrayItem("interests", index, null, e.target.value)
                }
              />
              {interestsData.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeArrayItem("interests", index)}
                  className="absolute top-3 right-3 texxt-sm text-red-500 hover:underline cursor-pointer"
                >
                  <LuTrash2 />
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem("interests", "")}
            className="self-start flex items-center gap-2 px-4 py-2 rounded bg-purple-100 text-accent hover:bg-purple-200 text-sm font-medium cursor-pointer"
          >
            <LuPlus /> Add Interest
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdditionalInfoForm;
