import util from "util";
import child_process from "child_process";

const execPromisified = util.promisify(child_process.exec);
console.log("stdout", stdout);
console.error("stderr:", stderr);

export const createProjectController = async (req, res) => {};
