import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../Utils/axiosInstance";
import { API_PATHS } from "../../Utils/apiPaths";
import DashboardLayout from "../../Component/Layout/DashboardLayout";
import { LuCirclePlus } from "react-icons/lu";
import moment from "moment";
import ResumeSummaryCard from "../../Component/Cards/ResumeSummaryCard";
import CreateResumeform from "./CreateResumeform";
import Modal from "../../Component/Modal";

const Dashboard = () => {
  const navigate = useNavigate();

  const [openCreateModal, setopenCreateModal] = useState(false);
  const [allResume, setAllResume] = useState(null);

  const fetchAllResume = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.RESUME.GET_ALL);
      setAllResume(response.data);
    } catch (error) {
      console.error("Error detching resume", error);
    }
  };

  useEffect(() => {
    fetchAllResume();
  }, []);
  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-7 pt-1 pb-6 px-4 md:px-2">
        <div
          className="h-[300px] flex flex-col gap-5 items-center justify-center bg-primary-white rounded-lg border border-purple-100 hover:bg-accent/20 cursor-pointer"
          onClick={() => setopenCreateModal(true)}
        >
          <div className="w-12 h-12 flex items-center justify-center bg-accent/20 rounded-2xl">
            <LuCirclePlus className="text-xl text-purple-500" />
          </div>
          <h3 className="font-semibold text-center text-primary-black">
            Add New Resume
          </h3>
        </div>
        {allResume?.map((resume) => (
          <ResumeSummaryCard
            key={resume._id}
            imgUrl={resume.thumbnailLink || null}
            title={resume.title}
            lastUpdated={
              resume.updatedAt
                ? moment(resume.updatedAt).format("Do MM YYYY")
                : ""
            }
            onSelect={() => navigate(`/resume/${resume._id}`)}
          />
        ))}
      </div>
      <Modal
        isOpen={openCreateModal}
        onClose={() => setopenCreateModal(false)}
        hideHeader
      >
        <div>
          <CreateResumeform />
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export default Dashboard;
