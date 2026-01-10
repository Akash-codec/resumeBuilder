import React, { useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import {
  LuArrowLeft,
  LuCircleAlert,
  LuDownload,
  LuPalette,
  LuSave,
  LuTrash2,
  LuUpload,
} from "react-icons/lu";
import toast from "react-hot-toast";
import DashboardLayout from "../../../Component/Layout/DashboardLayout";
import TitleInput from "../../../Component/Input/TitleInput";
import { useReactToPrint } from "react-to-print";
import axiosInstance from "../../../Utils/axiosInstance";
import { API_PATHS } from "../../../Utils/apiPaths";
import StepProgress from "../../../Component/StepProgress";
import ProfileInfoForm from "./ProfileInfoForm";
import ContactInfoForm from "./ContactInfoForm";
import WorkExperienceForm from "./WorkExperienceForm";
import EducationDetailForm from "./EducationDetailForm";
import SkillsInfoForm from "./SkillsInfoForm";
import ProjectsForm from "./ProjectsForm";
import CertificatesForm from "./CertificatesForm";
import AdditionalInfoForm from "./AdditionalInfoForm";
import RenderResume from "../../../Component/Resumetemplate/RenderResume";
import {
  captureElementAsImage,
  dataURltoFile,
  fixTailwindColors,
} from "../../../Utils/helper";
import Modal from "../../../Component/Modal";
import ThemeSelector from "../ThemeSelector";

const EditResume = () => {
  const { resumeId } = useParams();
  const navigate = useNavigate();

  const resumeRef = useRef(null);
  const resumeDownloadRef = useRef(null);

  const [baseWidth, setBaseWidth] = useState(800);

  const [openThemeSelector, setOpenThemeSelector] = useState(false);

  const [openPreviewModal, setOpenPreviewModal] = useState(false);

  const [currentPage, setCurrentPage] = useState("profile-info");
  const [progress, setProgress] = useState(0);
  const [resumeData, setResumeData] = useState({
    title: "",
    thumbnailLink: "",
    profileInfo: {
      profileImg: null,
      profilePreviewUrl: "",
      fullName: "",
      designation: "",
      summary: "",
    },
    template: {
      theme: "",
      colorPalette: "",
    },
    contactInfo: {
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      github: "",
      website: "",
    },
    workExperience: [
      {
        company: "",
        role: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ],
    education: [
      {
        degree: "",
        institution: "",
        startDate: "",
        endDate: "",
      },
    ],
    skills: [
      {
        name: "",
        progress: 0, // percentage value (0-100)
      },
    ],
    projects: [
      {
        title: "",
        description: "",
        githubLink: "",
        liveDemo: "",
      },
    ],
    certificates: [
      {
        title: "",
        issuer: "",
        year: "",
      },
    ],
    languages: [
      {
        name: "",
        progress: 0, // percentage value (0-100)
      },
    ],
    interests: [""],
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Validate Inputs
  const validateAndNext = (e) => {
    const error = [];

    switch (currentPage) {
      case "profile-info":
        const { fullName, designation, summary } = resumeData.profileInfo;
        if (!fullName.trim())
          error.push("Full name is required in Personal Info");
        if (!designation.trim())
          error.push("Designation is required in Personal Info");
        if (!summary.trim()) error.push("Summary is required in Personal Info");
        break;

      case "contact-info":
        const { email, phone } = resumeData.contactInfo;
        if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email))
          error.push("Email is required in Contact Info");
        if (!phone.trim()) error.push("Phone is required in Contact Info");
        break;

      case "work-experience":
        resumeData.workExperience.forEach(
          ({ company, role, startDate, endDate }, index) => {
            if (!company.trim())
              error.push(
                `Company name is required in Work Experience ${index + 1}`
              );
            if (!role.trim())
              error.push(`Role is required in Work Experience ${index + 1}`);
            if (!startDate || !endDate)
              error.push(
                `Start date and end date are required in Work Experience ${
                  index + 1
                }`
              );
          }
        );
        break;

      case "education-info":
        resumeData.education.forEach(
          ({ degree, institution, startDate, endDate }, index) => {
            if (!degree.trim())
              error.push(`Degree is required in Education Info ${index + 1}`);
            if (!institution.trim())
              error.push(
                `Institution is required in Education Info ${index + 1}`
              );
            if (!startDate || !endDate)
              error.push(
                `Start date and end date are required in Education Info ${
                  index + 1
                }`
              );
          }
        );
        break;

      case "skills":
        resumeData.skills.forEach(({ name, progress }, index) => {
          if (!name.trim())
            error.push(`Skill name is required in Skills ${index + 1}`);
          if (progress < 1 || progress > 100)
            error.push(
              `Skill progress should be between 1 and 100 in Skills ${
                index + 1
              }`
            );
        });
        break;

      case "projects":
        resumeData.projects.forEach(({ title, description }, index) => {
          if (!title.trim())
            error.push(`Project title is required in Projects ${index + 1}`);
          if (!description.trim())
            error.push(
              `Project description is required in Projects ${index + 1}`
            );
        });
        break;

      case "certificates":
        resumeData.certificates.forEach(({ title, issuer }, index) => {
          if (!title.trim())
            error.push(
              `Certificate title is required in Certificates ${index + 1}`
            );
          if (!issuer.trim())
            error.push(
              `Certificate issuer is required in Certificates ${index + 1}`
            );
        });
        break;

      case "additionalInfo":
        if (
          resumeData.languages.length === 0 ||
          resumeData.languages[0].name.trim()
        ) {
          error.push("At least one language is required");
        }

        if (
          resumeData.languages.length === 0 ||
          resumeData.languages[0].name.trim()
        ) {
          error.push("At least one language is required");
        }
        break;

      default:
        break;
    }

    if (error.length > 0) {
      setErrorMsg(error.join(", "));
      return;
    }

    //Move to next page
    setErrorMsg("");
    goToNextStep();
  };

  // Function to navigate to the next page
  const goToNextStep = () => {
    const pages = [
      "profile-info",
      "contact-info",
      "work-experience",
      "education-info",
      "skills",
      "projects",
      "certificates",
      "additionalInfo",
    ];
    if (currentPage === "additionalInfo") setOpenPreviewModal(true);

    const currentIndex = pages.indexOf(currentPage);
    if (currentIndex !== -1 && currentIndex < pages.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentPage(pages[nextIndex]);
    }

    //Set progress as percentage
    const percentage = Math.round((nextIndex / (pages.length - 1)) * 100);
    setProgress(percentage);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Function to navigate to the previous page
  const goBack = () => {
    const pages = [
      "profile-info",
      "contact-info",
      "work-experience",
      "education-info",
      "skills",
      "projects",
      "certificates",
      "additionalInfo",
    ];

    if (currentPage === "profile-info") navigate("/dashboard");

    const currentIndex = pages.indexOf(currentPage);
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentPage(pages[prevIndex]);
    }

    //Update progress
    const percentage = Math.round((prevIndex / (pages.length - 1)) * 100);
    setProgress(percentage);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const renderForm = () => {
    switch (currentPage) {
      case "profile-info":
        return (
          <ProfileInfoForm
            profileData={resumeData?.profileInfo}
            updateSection={(key, value) =>
              updateSection("profileInfo", key, value)
            }
            onNext={validateAndNext}
          />
        );
      case "contact-info":
        return (
          <ContactInfoForm
            contactData={resumeData?.contactInfo}
            updateSection={(key, value) =>
              updateSection("contactInfo", key, value)
            }
          />
        );
      case "work-experience":
        return (
          <WorkExperienceForm
            workExperienceData={resumeData?.workExperience}
            UpdateArrayItem={(index, key, value) => {
              UpdateArrayItem("workExperience", index, key, value);
            }}
            addArrayItem={(newItem) => {
              addArrayItem("workExperience", newItem);
            }}
            removeArrayItem={(index) => {
              removeArrayItem("workExperience", index);
            }}
          />
        );
      case "education-info":
        return (
          <EducationDetailForm
            educationData={resumeData?.education}
            UpdateArrayItem={(index, key, value) => {
              UpdateArrayItem("education", index, key, value);
            }}
            addArrayItem={(newItem) => {
              addArrayItem("education", newItem);
            }}
            removeArrayItem={(index) => {
              removeArrayItem("education", index);
            }}
          />
        );
      case "skills":
        return (
          <SkillsInfoForm
            skillsData={resumeData?.skills}
            UpdateArrayItem={(index, key, value) => {
              UpdateArrayItem("skills", index, key, value);
            }}
            addArrayItem={(newItem) => {
              addArrayItem("skills", newItem);
            }}
            removeArrayItem={(index) => {
              removeArrayItem("skills", index);
            }}
          />
        );
      case "projects":
        return (
          <ProjectsForm
            projectsData={resumeData?.projects}
            UpdateArrayItem={(index, key, value) => {
              UpdateArrayItem("projects", index, key, value);
            }}
            addArrayItem={(newItem) => {
              addArrayItem("projects", newItem);
            }}
            removeArrayItem={(index) => {
              removeArrayItem("projects", index);
            }}
          />
        );
      case "certificates":
        return (
          <CertificatesForm
            certificatesData={resumeData?.certificates}
            UpdateArrayItem={(index, key, value) => {
              UpdateArrayItem("certificates", index, key, value);
            }}
            addArrayItem={(newItem) => {
              addArrayItem("certificates", newItem);
            }}
            removeArrayItem={(index) => {
              removeArrayItem("certificates", index);
            }}
          />
        );
      case "additionalInfo":
        return (
          <AdditionalInfoForm
            languagesData={resumeData?.languages}
            interestsData={resumeData?.interests}
            UpdateArrayItem={(section, index, key, value) => {
              UpdateArrayItem(section, index, key, value);
            }}
            addArrayItem={(section, newItem) => {
              addArrayItem(section, newItem);
            }}
            removeArrayItem={(section, index) => {
              removeArrayItem(section, index);
            }}
          />
        );
      default:
        return null;
    }
  };

  // Update single nested object (Like profileInfo, contactInfo, etc)
  const updateSection = (section, key, value) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  //Update arry items (like workExperience[0], skills[1], etc)
  const UpdateArrayItem = (section, index, key, value) => {
    setResumeData((prev) => {
      const updatedArray = [...prev[section]];
      if (key == null) {
        updatedArray[index] = value;
      } else {
        updatedArray[index] = { ...updatedArray[index], [key]: value };
      }
      return {
        ...prev,
        [section]: updatedArray,
      };
    });
  };

  // Add Item from array
  const addArrayItem = (section, newItem) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: [...prev[section], newItem],
    }));
  };

  // Remove item from Array
  const removeArrayItem = (section, index) => {
    setResumeData((prev) => {
      const updatedArray = [...prev[section]];
      updatedArray.splice(index, 1);
      return {
        ...prev,
        [section]: updatedArray,
      };
    });
  };

  // Fetch resume by ID
  const fetchResumeDetailsById = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.RESUME.GET_BY_ID(resumeId)
      );
      if (response.data) {
        const resumeInfo = response.data;

        setResumeData((prevState) => ({
          ...prevState,
          title: resumeInfo?.title || "Untitled",
          template: resumeInfo?.template || prevState?.template,
          profileInfo: resumeInfo?.profileInfo || prevState?.profileInfo,
          contactInfo: resumeInfo?.contactInfo || prevState?.contactInfo,
          workExperience:
            resumeInfo?.workExperience || prevState?.workExperience,
          education: resumeInfo?.education || prevState?.education,
          skills: resumeInfo?.skills || prevState?.skills,
          projects: resumeInfo?.projects || prevState?.projects,
          certificates:
            resumeInfo?.certificates?.length > 0
              ? resumeInfo.certificates
              : prevState.certificates,
          languages:
            resumeInfo?.languages?.length > 0
              ? resumeInfo.languages
              : prevState.languages,

          interests:
            resumeInfo?.interests?.length > 0
              ? resumeInfo.interests
              : prevState.interests,
        }));
      }
    } catch (error) {
      console.log("Error fetching resume", error);
    }
  };

  // Upload thumbnail and resume profile img
  const uploadResumeImages = async () => {
    try {
      setIsLoading(true);

      fixTailwindColors(resumeRef.current);
      const imageDataUrl = await captureElementAsImage(resumeRef.current);

      //Convert base64 to File
      const thumbnailFile = dataURltoFile(
        imageDataUrl,
        `resume-${resumeId}.png`
      );

      const profileImageFile = resumeData?.profileInfo?.profileImg || null;
      const formData = new FormData();
      if (profileImageFile) formData.append("profileImage", profileImageFile);
      if (thumbnailFile) formData.append("thumbnail", thumbnailFile);

      const uploadResponse = await axiosInstance.put(
        API_PATHS.RESUME.UPLOAD_IMAGES(resumeId),
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(uploadResponse.data);
      const { thumbnail, profilePreviewUrl } = uploadResponse.data;
      // console.log(thumbnail, profilePreviewUrl);
      // console.log("Resume_Data___", resumeData);

      // Call the second API to update other Resume Data
      await updateResumeDetails(thumbnail, profilePreviewUrl);

      toast.success("Resume Updated Successfully");
      navigate("/dashboard");
    } catch (error) {
      console.log("Error updating resume", error);
      toast.error("Error updating resume");
    } finally {
      setIsLoading(false);
    }
  };

  const updateResumeDetails = async (thumbnailLink, profilePreviewUrl) => {
    try {
      setIsLoading(true);

      const response = await axiosInstance.put(
        API_PATHS.RESUME.UPDATE(resumeId),
        {
          ...resumeData,
          thumbnailLink: thumbnailLink,
          profileInfo: {
            ...resumeData.profileInfo,
            profilePreviewUrl: profilePreviewUrl,
          },
        }
      );
    } catch (error) {
      console.log("Error updating resume", error);
      toast.error("Error updating resume");
    } finally {
      setIsLoading(false);
    }
  };

  //Delete Resume
  const handleDeleteResume = async () => {
    try {
      setIsLoading(true);

      const response = await axiosInstance.delete(
        API_PATHS.RESUME.DELETE(resumeId)
      );
      toast.success("Resume Deleted Successfully");
      navigate("/dashboard");
    } catch (error) {
      console.log("Error deleting resume", error);
      toast.error("Error deleting resume");
    } finally {
      setIsLoading(false);
    }
  };

  // Download resume
  const reactToPrintFn = useReactToPrint({ contentRef: resumeDownloadRef });

  // function to update baseWidth base on the resume container size
  const updateBaseWidth = () => {
    if (resumeRef.current) {
      setBaseWidth(resumeRef.current.offsetWidth);
    }
  };

  useEffect(() => {
    updateBaseWidth();
    window.addEventListener("resize", updateBaseWidth);

    if (resumeId) {
      fetchResumeDetailsById();
    }

    return () => {
      window.removeEventListener("resize", updateBaseWidth);
    };
  }, []);

  return (
    <DashboardLayout>
      <div className="container mx-auto">
        <div className="flex items-center justify-between gap-5 bg-primary-white rounded-lg border border-purple-100 py-3 px-4 mb-4">
          {console.log("EditResume rendering title:", resumeData.title)}
          <TitleInput
            title={resumeData.title}
            setTitle={(value) =>
              setResumeData((prevState) => ({
                ...prevState,
                title: value,
              }))
            }
          />
          <div className="flex items-center gap-4">
            <button
              className="btn-small-light"
              onClick={() => setOpenThemeSelector(true)}
            >
              <LuPalette className="text-[16px] " />
              <span className="hidden md:block">Change Theme</span>
            </button>
            <button className="btn-small-light" onClick={handleDeleteResume}>
              <LuTrash2 className="text-[16px]" />
              <span className="hidden md:block">Delete</span>
            </button>
            <button
              className="btn-small-light"
              onClick={() => setOpenPreviewModal(true)}
            >
              <LuDownload className="text-[16px]" />
              <span className="hidden md:block">Preview & Download</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-primary-white rounded-lg border border-purple-100 overflow-hidden">
            <StepProgress progress={progress} />
            {renderForm()}

            <div className="mx-5">
              {errorMsg && (
                <div className="flex items-center gap-2 text-[11px] font-medium text-amber-600 bg-amber-100 px-2 py-0.5 my-1 rounded">
                  <LuCircleAlert className="text-md" /> {errorMsg}
                </div>
              )}

              <div className="flex item-end justify-end gap-3 mt-3 mb-5">
                <button
                  className="btn-small-light"
                  onClick={goBack}
                  disabled={isLoading}
                >
                  <LuArrowLeft className="text-[16px]" />
                  Back
                </button>
                <button
                  className="btn-small-light"
                  onClick={uploadResumeImages}
                  disabled={isLoading}
                >
                  <LuUpload className="text-[16px]" />
                  {isLoading ? "Uploading..." : "Save & Exit"}
                </button>
                <button
                  className="btn-small"
                  onClick={validateAndNext}
                  disabled={isLoading}
                >
                  {currentPage === "additionalInfo" && (
                    <LuDownload className="text-[16px]" />
                  )}
                  {currentPage === "additionalInfo"
                    ? "Preview & Download"
                    : "Next"}
                  {currentPage !== "additionalInfo" && (
                    <LuArrowLeft className="text-[16px] rotate-180" />
                  )}
                </button>
              </div>
            </div>
          </div>
          <div ref={resumeRef} className="h-[100vh">
            {/* Resume Template  */}
            <RenderResume
              templateId={resumeData?.template?.theme || ""}
              resumeData={resumeData}
              colorPalette={resumeData?.template?.colorPalette || []}
              containerWidth={baseWidth}
            />
          </div>
        </div>
      </div>
      <Modal
        isOpen={openThemeSelector}
        onClose={() => setOpenThemeSelector(false)}
        title="Select Theme"
      >
        <div className="w-[90vw] h-[80vh]">
          <ThemeSelector
            selectedTheme={resumeData?.template}
            setSelectedTheme={(value) => {
              setResumeData((prevState) => ({
                ...prevState,
                template: value || prevState.template,
              }));
            }}
            resumeData={null}
            onClose={() => setOpenThemeSelector(false)}
          />
        </div>
      </Modal>
      <Modal
        isOpen={openPreviewModal}
        onClose={() => setOpenPreviewModal(false)}
        title={resumeData.title}
        showActionBtn
        actionBtnText="Download"
        actionBtnIcon={<LuDownload className="text-[16px]" />}
        onActionClick={() => reactToPrintFn()}
      >
        <div ref={resumeDownloadRef} className="w-[98vw] h-[90vh]">
          <RenderResume
            templateId={resumeData?.template?.theme || ""}
            resumeData={resumeData}
            colorPalette={resumeData?.template?.colorPalette || []}
          />
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export default EditResume;
