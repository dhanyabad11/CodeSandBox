import util from "util";
import child_process from "child_process";
import fs from "fs/promises";
import { v4 as uuid4 } from "uuid";
import { REACT_PROJECT_COMMAND } from "../config/serverConfig.js";

const execPromisified = util.promisify(child_process.exec);

export const createProjectController = async (req, res) => {
    const projectId = uuid4();
    console.log("New project id is", projectId);
    await fs.mkdir(`./projects/${projectId}`);

    const response = await execPromisified(REACT_PROJECT_COMMAND, {
        cwd: `./projects/${projectId}`,
    });

    return res.json({ message: "Project created", data: projectId });
};
