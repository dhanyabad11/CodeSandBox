import { useMutation } from "@tanstack/react-query";
import { createProjectApi } from "../../../apis/projects"; // Adjust the path as needed

export const useCreateProject = () => {
    const { mutateAsync, isPending, isSucess, error } = useMutation({
        mutationFn: createProjectApi,
        onSuccess: (data) => {
            console.log("Project created successfully", data);
        },
        onError: () => {
            console.log("Error createing project");
        },
    });
    return {
        createProjectMutation: mutateAsync,
        isPending,
        isSucess,
        error,
    };
};
