const fs = require("node:fs");
const path = require("node:path")
const Resume = require("../models/Resume.js");
const { json } = require("node:stream/consumers");

// @desc    Create a new resume
// @route   POST /api/resume
// @access  Private   
const createResume = async (req, res)=>{
    try {
        const {title} = req.body;

        //Default template
        const defaultResumeData = {
            profileInfo: {
                profileImg: null,
                previewUrl: "",
                fullName: "",
                designation: "",
                summary: "",
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
                    progress: 0,
                },
            ],
            projects: [
                {
                    title: "",
                    description: "",
                    github: "",
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
                    progress: 0,
                },
            ],
            interests: [""],
        };
        const newResume = await Resume.create({
            userId: req.user._id,
            title,
            ...defaultResumeData,
        });

        res.status(201).json(newResume);
    } catch (error) {
        res.status(500).json({message: "Failed to create resume", error: error.message});
    }
     
}

// @desc    Get all resume for logged-in user
// @route   Get /api/resume
// @access  Private   
const getUserResume = async (req, res)=>{
    try {
        const resumes = await Resume.find({ userId: req.user._id }).sort({updatedAt: -1,})
        res.json(resumes);
    } catch (error) {
        res.status(500).json({message: "Failed to Fetch resume", error: error.message});
    }
     
}

// @desc    Get single resume by ID
// @route   Get /api/resume/:id
// @access  Private   
const getResumeById = async (req, res)=>{
    try {
        const resume = await Resume.findOne({ _id: req.params.id, userId: req.user._id});

        if(!resume){
            return res.status(404).json({message: "Resume not found"})
        }

        res.json(resume);
    } catch (error) {
        res.status(500).json({message: "Failed to Fetch resume", error: error.message});
    }
     
}

// @desc    Update a resume
// @route   Put /api/resume/:id
// @access  Private   
const updateResume = async (req, res)=>{
    try {
        const resume = await Resume.findOne({_id: req.params.id, userId: req.user._id});

        if(!resume){
            return res.status(404).json({message: "Resume not found or unauthorized" })
        }

        //Merge update from req.body into existing resume
        Object.assign(resume, req.body);

        //Save update from req.body into existing resume
        const savedResume = await resume.save();

        res.json(savedResume);
    } catch (error) {
        res.status(500).json({message: "Failed to Update resume", error: error.message});
    }
     
}

// @desc    Delete a resume
// @route   DELETE /api/resume/:id
// @access  Private   
const deleteResume = async (req, res)=>{
    try {
        const resume = await Resume.findOne({ _id: req.params.id, userId: req.user._id});

        if(!resume){
            return res.status(404).json({message: "Resume not found or unauthorized"})
        }

        //Delete thumbnailLink and profilePreviewURL images from Uploads folder
        const uploadFolder = path.join(__dirname, "..", "uploads");
        const baseURL = `${req.protcol}://${req.get("host")}`;

        if(resume.thumbnailLink){
            const oldThumbnail = path.join(uploadFolder, path.basename(resume.thumbnailLink));
            if(fs.existsSync(oldThumbnail)) fs.unlinkSync(oldThumbnail);
        }

        if(resume.profileInfo?.profilePreviewURL){
            const oldProfile = path.join(uploadFolder, path.basename(resume.profileInfo.profilePreviewURL));
            if (fs.existsSync(oldProfile)) fs.unlinkSync(oldProfile);
        }

        const deleted = await Resume.findOneAndDelete({
            _id: req.params.id,
            userId: req.user._id,
        })

        if(!deleted){
            return res.status(404).json({message: "Resume Not found or unauthorized"});
        }

        res.json({message: "Resume delete successfully"})
    } catch (error) {
        res.status(500).json({message: "Failed to delete resume", error: error.message});
    }
     
}

module.exports = {
    createResume, 
    getUserResume, 
    getResumeById, 
    updateResume, 
    deleteResume
}
