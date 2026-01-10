import React, { useRef, useState } from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

const ProfilePhotoSelector = ({ image, setImage, preview, setPreview }) => {
  const inputRef = useRef(null);
  const [previewURL, setPreviewURL] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);

      // Generate preview URL
      const url = URL.createObjectURL(file);
      setPreviewURL(url);

      if (setPreview) setPreview(url);
    }
    // Clear input value to allow re-selecting the same file
    event.target.value = "";
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewURL(null);
    if (setPreview) setPreview(null);
    // Clear input ref value
    if (inputRef.current) inputRef.current.value = "";
  };

  const onChooseFile = () => {
    if (inputRef.current) inputRef.current.click();
  };

  return (
    <div className="flex justify-center mb-6">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {!image ? (
        <div
          className="w-20 h-20 flex items-center justify-center bg-accent/30 rounded-full relative cursor-pointer"
          onClick={onChooseFile}
        >
          <LuUser className="text-4xl text-accent" />

          <button
            type="button"
            className="w-8 h-8 flex items-center justify-center bg-linear-to-r from-accent to-purple-900 text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer"
          >
            <LuUpload />
          </button>
        </div>
      ) : (
        <div className="relative">
          <img
            src={
              preview || previewURL || (typeof image === "string" ? image : "")
            }
            alt="profile photo"
            className="w-20 h-20 rounded-full object-cover"
          />

          <button
            type="button"
            className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer"
            onClick={handleRemoveImage}
          >
            <LuTrash />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;
