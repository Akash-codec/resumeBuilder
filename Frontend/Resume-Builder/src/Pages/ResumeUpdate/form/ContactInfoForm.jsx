import React from "react";
import Input from "../../../Component/Input/Input";
const ContactInfoForm = ({ contactData, updateSection }) => {
  return (
    <div className="px-5 pt-5">
      <h2 className="text-lg font-semibold text-primary-black">
        Contact Information
      </h2>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="col-span-2">
          <Input
            label="Address"
            placeholder="Short Address"
            type="text"
            value={contactData.location || ""}
            onChange={(e) => updateSection("location", e.target.value)}
          />
        </div>
        <Input
          label="Email"
          placeholder="john@example.com"
          type="text"
          value={contactData.email || ""}
          onChange={(e) => updateSection("email", e.target.value)}
        />
        <Input
          label="Phone Number"
          placeholder="9876543210"
          type="text"
          value={contactData.phone || ""}
          onChange={(e) => updateSection("phone", e.target.value)}
        />
        <Input
          label="LinkedIn"
          placeholder="http://linkedin.com/username"
          type="text"
          value={contactData.linkedin || ""}
          onChange={(e) => updateSection("linkedin", e.target.value)}
        />
        <Input
          label="Github"
          placeholder="http://github.com/username"
          type="text"
          value={contactData.github || ""}
          onChange={(e) => updateSection("github", e.target.value)}
        />
        <div className="md:col-span-2">
          <Input
            label="Portfolio / Website"
            placeholder="http://yourwebsite.com"
            type="text"
            value={contactData.website || ""}
            onChange={(e) => updateSection("website", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default ContactInfoForm;
