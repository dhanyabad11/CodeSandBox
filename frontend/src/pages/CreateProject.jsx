import { Button } from "antd";
import { useCreateProject } from "../hooks/apis/mutations/useCreateProject";

export const CreateProject = () => {
    const { createProjectMutation, isPending } = useCreateProject();
    async function handleCreateProject() {
        console.log("Going to trigger the api");
        try {
            await createProjectMutation();
        } catch (error) {
            console.log("Error creating project", error);
        }
    }
    return (
        <div>
            <Button type="primary" onClick={handleCreateProject}>
                Create Playground
            </Button>
        </div>
    );
};
