import { Button, Flex } from "antd";
import { useCreateProject } from "../hooks/apis/mutations/useCreateProject";
import { useNavigate } from "react-router-dom";
export const CreateProject = () => {
    const { createProjectMutation, isPending } = useCreateProject();

    const navigate = useNavigate();
    async function handleCreateProject() {
        console.log("Going to trigger the api");
        try {
            const response = await createProjectMutation();
            console.log("API Response:", response);
            console.log("Now we should redirect to the editor");

            // Handle different possible response structures
            let projectId;
            if (response?.id) {
                projectId = response.id;
            } else if (response?.data?.id) {
                projectId = response.data.id;
            } else if (response?.projectId) {
                projectId = response.projectId;
            } else if (response?.data?.projectId) {
                projectId = response.data.projectId;
            } else {
                // If no ID found, use the entire response or a fallback
                projectId = response?.data || response || "new-project";
            }

            console.log("Navigating to project:", projectId);
            navigate(`/project/${projectId}`);
        } catch (error) {
            console.log("Error creating project", error);
        }
    }
    return (
        <Flex justify="center" align="center" style={{ minHeight: "100vh" }}>
            <Button type="primary" onClick={handleCreateProject}>
                Create Playground
            </Button>
        </Flex>
    );
};
