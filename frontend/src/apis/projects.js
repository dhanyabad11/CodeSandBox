import axios from "../config/axiosConfig";

export const createProjectApi = async (projectData = {}) => {
    try {
        console.log("Making API call to create project...");
        console.log("Project data:", projectData);

        // Default project data if none provided
        const defaultData = {
            name: `Project ${Date.now()}`,
            description: "A new project",
            ...projectData,
        };

        const response = await axios.post("/api/v1/projects", defaultData);
        console.log("API response:", response.data);
        return response.data;
    } catch (error) {
        console.log("API Error Details:", {
            message: error.message,
            status: error.response?.status,
            statusText: error.response?.statusText,
            data: error.response?.data,
            url: error.config?.url,
            method: error.config?.method,
        });
        throw error;
    }
};

export const getProjectTree = async ({ projectId }) => {
    try {
        const response = await axios.get(`/api/v1/projects/${projectId}/tree`);
        console.log(response.data);
        return response?.data?.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
