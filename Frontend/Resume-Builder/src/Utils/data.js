import TEMPLATE_ONE_IMG from "../assets/template-one.png";
import TEMPLATE_TWO_IMG from "../assets/template-two.png";
import TEMPLATE_THREE_IMG from "../assets/template-three.png";

export const resumeTemplates = [
    {
        id: 1,
        thumbnailImg: TEMPLATE_ONE_IMG,
        colorPalette: "themeOne"
    },
    {
        id: 2,
        thumbnailImg: TEMPLATE_TWO_IMG,
        colorPalette: "themeTwo"
    },
    {
        id: 3,
        thumbnailImg: TEMPLATE_THREE_IMG,
        colorPalette: "themeThree"
    },
];

export const themeColorPalette = {
    themeOne: [
        ["#EBFDFF", "#A1F4FD", "#CEFAFE","#00B8DB", "#4A5565"],

        ["#E9FBF8", "#B4EFE7", "#93E2DA","#2AC9A0", "#3D4C5A"],
        ["#F5F4FF", "#E0DBFF", "#C9C2F8","#8579D1", "#4B4B5C"],
        ["#F0FAFF", "#D6F0FF", "#AFDEFF","#3399FF", "#445361"],
        ["#FFF5F7", "#FFE0EC", "#FAC6D4","#F6729C", "#5A5A5A"],
        ["#F9FAFB", "#E4E7EB", "#CBD5E0","#7F9CF5", "#2D3748"],

        ["#F4FFFD", "#D3FDF2", "#B0E9D4","#34C790", "#384C48"],
        ["#FFF7F0", "#FFE6D9", "#FFD2BA","#FF9561", "#4C4743"],
        ["#F9FCFF", "#E3F0F9", "#C0DDEE","#6CA6CF", "#46545E"],
        ["#FFFDF6", "#FFF4DF", "#FFE7A0","#FFD000", "#57534E"],
        ["#EFFCFF", "#C8F0FF", "#99E0FF","#007BA7", "#2B3A42"],

        ["#F7F7F7", "#E4E4E4", "#CFCFCF","#4A4A4A", "#222222"],
        ["#E3F2FD", "#90CAF9", "#A8D2F4","#1E88E5", "#0D47A1"],
    ],
};

export const DUMMY_RESUME_DATA = {
    profileInfo: {
        profileInfo: null,
        previewUrl: "",
        fullName: "John Doe",
        designation: "Software Engineer",
        summary: "Experienced software engineer with a proven track record of developing scalable and efficient software solutions. Skilled in multiple programming languages and frameworks, with a focus on delivering high-quality results on time and within budget."
    },
    contactInfo: {
        email: "john.doe@example.com",
        phone: "123-456-7890",
        location: "123 Main St, City, Country",
        linkedin: "https://linkedin.com/in/johndoe",
        github: "https://github.com/johndoe",
        website: "https://johndoe.com"
    },
    workExperience: [
        {
            company: "Tech Solutions",
            role: "Senior Software Engineer",
            startDate: "2022-03",
            endDate: "2025-04",
            description: "Experienced software engineer with a proven track record of developing scalable and efficient software solutions. Skilled in multiple programming languages and frameworks, with a focus on delivering high-quality results on time and within budget."
        },
        {
            company: "Coding dev",
            role: "Full Stack Developer",
            startDate: "2020- 01",
            endDate: "2022-02",
            description: "worked on cross-functional team to develop and maintain software applications."
        },
        {
            company: "Startup company",
            role: "junior web Developer",
            startDate: "2018- 06",
            endDate: "2019-12",
            description: "Built responsive and user-friendly websites using HTML, CSS, and JavaScript."
        }
    ],
    education: [
        {
            degree: "M.Sc. Software Engineering",
            institution: "Tech University",
            startDate: "2021-08",
            endDate: "2023-06",
        },
        {
            degree: "B.Sc. Computer Science",
            institution: "State University",
            startDate: "2017-08",
            endDate: "2021-05",
        },
        {
            degree: "High School",
            institution: "Central High School",
            startDate: "2015-06",
            endDate: "2017-05",
        },
    ],
    skills: [
        { name: "JavaScript", progress: 80 },
        { name: "React", progress: 75 },
        { name: "TypeScript", progress: 90 },
        { name: "MongoDB", progress: 85 },
        { name: "Node.js", progress: 70 },
    ],
    projects: [
        {
            title: "E-commerce Website",
            description: "Developed an e-commerce website using React and Node.js.",
            githubLink: "https://github.com/johndoe/e-commerce",
            liveDemo: "https://ecommerce.com",
        },
        {
            title: "Task Management App",
            description: "Built a task management app using React and Node.js.",
            githubLink: "https://github.com/johndoe/task-management",
            liveDemo: "https://task-management.com",
        },
    ],
    certificates: [
        {
            title: "React Certification",
            issuer: "React Training Institute",
            year: "2022",
        },
        {
            title: "Node.js Certification",
            issuer: "Node.js Training Institute",
            year: "2022",
        },
    ],
    languages: [
        { name: "English", progress: 100 },
        { name: "Hindi", progress: 80 },
    ],
    interests: ["Reading", "Traveling", "Gaming"],
}