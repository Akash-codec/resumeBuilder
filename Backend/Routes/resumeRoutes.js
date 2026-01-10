const express = require("express")
const {
    createResume,
    getUserResume,
    getResumeById,
    updateResume,
    deleteResume
} = require("../Controllers/resumeController.js");
const {protect} = require("../middleware/authMiddleware.js");
const {uploadResumeImages}= require("../Controllers/uploadImage.js");

const router = express.Router();

router.post("/", protect, createResume);    // Create Resume
router.get("/", protect, getUserResume);    // Get Resume
router.get("/:id", protect, getResumeById);    // Get Resume by ID
router.put("/:id", protect, updateResume);    // Update Resume
router.put("/:id/upload-image", protect, uploadResumeImages);   

router.delete("/:id", protect , deleteResume);  // Delete Resume

module.exports = router;
