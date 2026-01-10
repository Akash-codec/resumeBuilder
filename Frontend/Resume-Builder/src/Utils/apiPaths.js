export const BASE_URL = "https://resumebuilder-oy1b.onrender.com"

//utils/apiPaths.js
export const API_PATHS = {
    AUTH: {
        REGISTER: "/api/auth/register", //Signup
        LOGIN: "/api/auth/login", //Authentication user & return JWT token
        GET_PROFILE: "/api/auth/profile", //Get logged-in user details
    },
    RESUME: {
        CREATE: "/api/resume",                          //POST - Create a new resume
        GET_ALL: "/api/resume",                         //GET - Get all resume of logged in user
        GET_BY_ID: (id)=> `/api/resume/${id}`,          //Get - Get a specific resume
        UPDATE: (id)=> `/api/resume/${id}`,             //POST - Create a new resume
        DELETE: (id)=> `/api/resume/${id}`,             //POST - Create a new resume
        UPLOAD_IMAGES: (id)=> `/api/resume/${id}/upload-image`,        //POST - Create a new resume
    },
    IMAGES: {
        UPLOAD_IMAGES: "api/auth/upload-image",
    },
};
