import React from "react";
import Input from "../../../Component/Input/Input";
import { LuTrash2 } from "react-icons/lu";

const CertificatesForm = ({
  certificatesData,
  UpdateArrayItem,
  addArrayItem,
  removeArrayItem,
}) => {
  return (
    console.log(certificatesData),
    (
      <div className="px-5 pt-5">
        <h2 className="text-lg font-semibold text-primary-black">
          Certificates
        </h2>

        <div className="mt-4 flex flex-col gap-4 mb-3">
          {certificatesData.map((certificate, index) => (
            <div
              key={index}
              className="border border-gray-200/80 p-4 rounded-lg relative"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Certificate Title"
                  placeholder="Full Stack Web Developer"
                  type="text"
                  value={certificate.title || ""}
                  onChange={(e) =>
                    UpdateArrayItem(index, "title", e.target.value)
                  }
                />
                <Input
                  label="Issuer"
                  placeholder="Coursera / Google / etc."
                  type="text"
                  value={certificate.issuer || ""}
                  onChange={(e) =>
                    UpdateArrayItem(index, "issuer", e.target.value)
                  }
                />
                <Input
                  label="Year"
                  placeholder="2022"
                  type="text"
                  value={certificate.year || ""}
                  onChange={(e) =>
                    UpdateArrayItem(index, "year", e.target.value)
                  }
                />
              </div>
              {certificatesData.length > 1 && (
                <button
                  className="absolute top-3 right-3 text-sm text-red-600 hover:underline cursor-pointer"
                  type="button"
                  onClick={() => removeArrayItem(index)}
                >
                  <LuTrash2 />
                </button>
              )}
            </div>
          ))}
          <button
            className="self-start flex items-center gap-2 px-4 py-2 rounded bg-purple-100 text-accent text-sm font-medium hover:bg-purple-200 cursor-pointer"
            type="button"
            onClick={() => addArrayItem({ title: "", issuer: "", year: "" })}
          >
            Add Certificate
          </button>
        </div>
      </div>
    )
  );
};

export default CertificatesForm;
