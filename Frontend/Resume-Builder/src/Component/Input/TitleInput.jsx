import React, { useState } from "react";
import { LuCheck, LuPencil } from "react-icons/lu";

const TitleInput = ({ title, setTitle }) => {
  console.log("TitleInput received title:", title);
  const [showinput, setShowInput] = useState(false);

  return (
    <div className="flex items-center gap-3">
      {showinput ? (
        <>
          <input
            type="text"
            placeholder="Resume Title"
            className="text-sm md:text-[17px] bg-transparent outline-none text-primary-black font-semibold border-b border-gray-300 pb-1"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
          <button className="cursor-pointer">
            <LuCheck
              className="text-[16px] text-accent"
              onClick={() => setShowInput((prevState) => !prevState)}
            />
          </button>
        </>
      ) : (
        <>
          <h2 className="text-sm md:text-[17px] text-primary-black font-semibold">
            {title}
          </h2>
          <button className="cursor-pointer">
            <LuPencil
              className="text-sm text-accent"
              onClick={() => setShowInput((prevState) => !prevState)}
            />
          </button>
        </>
      )}
    </div>
  );
};

export default TitleInput;
