import React from "react";

import Input from "../../../Component/Input/Input";
import ProfilePhotoSelector from "../../../Component/Input/ProfilePhotoSelector";
const ProfileInfoForm = ({ profileData, updateSection }) => {
  return (
    <div className="px-5 pt-5">
      <h2 className="text-lg font-semibold text-primary-black">
        Personal Information
      </h2>
      <div className="mt-4">
        <ProfilePhotoSelector
          image={profileData?.profileImg || profileData?.profilePreviewUrl}
          setImage={(value) => updateSection("profileImg", value)}
          preview={profileData?.profilePreviewUrl}
          setPreview={(value) => updateSection("profilePreviewUrl", value)}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Full Name"
            value={profileData.fullName || ""}
            onChange={(e) => updateSection("fullName", e.target.value)}
            placeholder="John"
            type="text"
          />

          <Input
            label="Designation"
            value={profileData.designation || ""}
            onChange={(e) => updateSection("designation", e.target.value)}
            placeholder="Software Engineer"
            type="text"
          />
          <div className="col-span-2 mt-3">
            <label className="text-xs font-medium text-primary-black">
              Summary
            </label>
            <textarea
              placeholder="Short Introduction about yourself"
              value={profileData.summary || ""}
              onChange={(e) => updateSection("summary", e.target.value)}
              rows={4}
              className="form-input"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfoForm;
