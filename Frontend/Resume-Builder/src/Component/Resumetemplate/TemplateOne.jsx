import React, { useEffect, useRef, useState } from "react";
import {
  LuMapPinHouse,
  LuPhone,
  LuMail,
  LuRss,
  LuGithub,
  LuUser,
} from "react-icons/lu";
import { RiLinkedinLine } from "react-icons/ri";
import ContactInfo from "../ResumeSection/ContactInfo";
import EducationInfo from "../ResumeSection/EducationInfo";
import { formatYearMonth } from "../../Utils/helper";
import LanguageSection from "../ResumeSection/LanguageSection";
import WorkExperience from "../ResumeSection/WorkExperience";
import ProjectSection from "../ResumeSection/ProjectSection";
import SkillSection from "../ResumeSection/SkillSection";
import CertificationSection from "../ResumeSection/CertificationSection";

const DEFAULT_THEME = ["#EBFDFF", "#A1F3FD", "#CEFAFE", "#00B8DB", "#4A5565"];

const Title = ({ text, color }) => {
  return (
    <div className="relative w-fit mb-2.5">
      <span
        className="absolute bottom-0 left-0 w-full h-2"
        style={{ backgroundColor: color }}
      ></span>
      <h2 className={`relative text-sm font-bold`}>{text}</h2>
    </div>
  );
};
const TemplateOne = ({ resumeData, colorPalette, containerWidth }) => {
  const themeColors = colorPalette?.length > 0 ? colorPalette : DEFAULT_THEME;
  const resumeRef = useRef(null);
  const [baseWidth, setBaseWidth] = useState(800);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    // Calculate the scale factor based on container width
    const actualBaseWidth = resumeRef.current.offsetWidth;
    setBaseWidth(actualBaseWidth); //Get the actual base width
    setScale(containerWidth / baseWidth);
  }, [containerWidth]);
  return (
    <div
      ref={resumeRef}
      className="bg-white"
      style={{
        transform: containerWidth > 0 ? `scale(${scale})` : "none",
        transformOrigin: "top left",
        width: containerWidth > 0 ? `${baseWidth}px` : "auto",
        height: "auto",
      }}
    >
      <div className="grid grid-cols-12 gap-8">
        <div
          className="col-span-4 py-18"
          style={{ backgroundColor: themeColors[0] }}
        >
          <div className="flex flex-col items-center px-2">
            <div
              className="w-[100px] h-[100px] max-w-[110px] max-h-[110px] rounded-full flex items-center justify-center"
              style={{ backgroundColor: themeColors[1] }}
            >
              {console.log(resumeData)}
              {resumeData?.profileInfo?.profileImg ||
              resumeData?.profileInfo?.profilePreviewUrl ? (
                <img
                  src={
                    resumeData?.profileInfo?.profilePreviewUrl ||
                    resumeData?.profileInfo?.profileImg
                  }
                  className="w-[90px] h-[90px] flex items-center justify-center rounded-full object-cover"
                />
              ) : (
                <div className="w-[90px] h-[90px] flex items-center justify-center text-5xl rounded-full">
                  <LuUser />
                </div>
              )}
            </div>

            <h2 className="text-xl font-bold mt-3">
              {resumeData.profileInfo.fullName}
            </h2>
            <p className="text-sm text-center">
              {resumeData.profileInfo.designation}
            </p>
          </div>
          <div className="my-6 mx-6">
            <div className="flex flex-col gap-5">
              <ContactInfo
                icon={<LuMapPinHouse />}
                iconBG={themeColors[2]}
                value={resumeData.contactInfo.location}
              />
              <ContactInfo
                icon={<LuMail />}
                iconBG={themeColors[2]}
                value={resumeData.contactInfo.email}
              />
              <ContactInfo
                icon={<LuPhone />}
                iconBG={themeColors[2]}
                value={resumeData.contactInfo.phone}
              />
              {resumeData.contactInfo.linkedin && (
                <ContactInfo
                  icon={<RiLinkedinLine />}
                  iconBG={themeColors[2]}
                  value={resumeData.contactInfo.linkedin}
                />
              )}
              {resumeData.contactInfo.github && (
                <ContactInfo
                  icon={<LuGithub />}
                  iconBG={themeColors[2]}
                  value={resumeData.contactInfo.github}
                />
              )}
              <ContactInfo
                icon={<LuRss />}
                iconBG={themeColors[2]}
                value={resumeData.contactInfo.website}
              />
            </div>

            <div className="mt-5">
              <Title text="Education" color={themeColors[1]} />
              {resumeData.education.map((education, index) => (
                <EducationInfo
                  key={`education-${index}`}
                  degree={education.degree}
                  institution={education.institution}
                  duration={`${formatYearMonth(
                    education.startDate
                  )} - ${formatYearMonth(education.endDate)}`}
                />
              ))}
            </div>

            <div className="mt-5">
              <Title text="Languages" color={themeColors[1]} />
              <LanguageSection
                languages={resumeData.languages}
                accentColor={themeColors[3]}
                bgColor={themeColors[2]}
              />
            </div>
          </div>
        </div>

        <div className="col-span-8 pt-10 mr-10 pb-5">
          <div>
            <Title text="Professional Summary" color={themeColors[1]} />
            <p className="text-sm font-medium">
              {resumeData.profileInfo.summary}
            </p>
          </div>

          <div className="mt-5">
            <Title text="Work Experience" color={themeColors[1]} />
            {resumeData.workExperience.map((experience, index) => (
              <WorkExperience
                key={`experience-${index}`}
                company={experience.company}
                role={experience.role}
                duration={`${formatYearMonth(
                  experience.startDate
                )} - ${formatYearMonth(experience.endDate)}`}
                durationColor={themeColors[4]}
                description={experience.description}
              />
            ))}
          </div>

          <div className="mt-5">
            <Title text="Projects" color={themeColors[1]} />
            {resumeData.projects.map((project, index) => (
              <ProjectSection
                key={`project-${index}`}
                title={project.title}
                description={project.description}
                githubLink={project.githubLink}
                liveDemoUrl={project.liveDemo}
                bgColor={themeColors[2]}
              />
            ))}
          </div>

          <div className="mt-5">
            <Title text="Skills" color={themeColors[1]} />
            <SkillSection
              skills={resumeData.skills}
              accentColor={themeColors[3]}
              bgColor={themeColors[2]}
            />
          </div>

          <div className="mt-5">
            <Title text="Certifications" color={themeColors[1]} />
            <div className="h">
              {resumeData.certificates.map((certificate, index) => (
                <CertificationSection
                  key={`certificate-${index}`}
                  title={certificate.title}
                  issuer={certificate.issuer}
                  year={certificate.year}
                  bgColor={themeColors[2]}
                />
              ))}
            </div>
          </div>

          {resumeData.interests.length > 0 &&
            resumeData.interests[0] !== "" && (
              <div className="mt-5">
                <Title text="Interests" color={themeColors[1]} />
                <div className="flex items-center flex-wrap gap-3 mt-4">
                  {resumeData.interests.map((interest, index) => (
                    <div
                      className="text-[10px] font-medium py-1 px-3 rounded-lg"
                      key={`interest-${index}`}
                      style={{ backgroundColor: themeColors[2] }}
                    >
                      {interest}
                    </div>
                  ))}
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default TemplateOne;
