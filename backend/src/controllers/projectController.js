import util from "util";
import child_process from "child_process";
import { createProjectService, getProjectTreeService } from "../service/projectService.js";

export const createProjectController = async (req, res) => {
    const projectId = await createProjectService();
    return res.json({ message: "Project created", data: projectId });
};

export const getProjectTree = async (req, res) => {
    const projectId = req.params.projectId || req.params.projectid;
    const tree = await getProjectTreeService(projectId);
    if (!tree) {
        return res.status(404).json({
            data: null,
            success: false,
            message: "Project directory not found or is empty.",
        });
    }
    return res.status(200).json({
        data: tree,
        success: true,
        message: "Successfully fetched the tree",
    });
};
