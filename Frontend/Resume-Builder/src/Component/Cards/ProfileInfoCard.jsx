import React, { useContext } from "react";
import { UserContext } from "../../Context/userContext";
import { useNavigate } from "react-router-dom";

const ProfileInfoCard = () => {
  const { user, clearUser, loading } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex items-center">
      <img
        src={user.profileImageURL}
        alt=""
        className="w-11 h-11 bg-gray-300 rounded-full mr-3"
      />
      <div>
        <div className="text-[15px] font-bold leading-3">{user.name || ""}</div>
        <button
          onClick={handleLogout}
          className="text-accent text-sm font-semibold cursor-pointer hover:underline"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileInfoCard;
