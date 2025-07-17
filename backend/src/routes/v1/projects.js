import express from "express";
import { createProjectController } from "../../controllers/projectController.js";
import { getProjectTree } from "../../controllers/projectController.js";
const router = express.Router();

router.post("/", createProjectController);
router.get("/:projectId", getProjectTree);

export default router;
