import { useParams } from "react-router-dom";
import { EditorComponent } from "../components/molecules/EditorComponent/EditorComponent";
import { EditorButton } from "../components/atoms/EditorButton/EditorButton";
import { TreeStructure } from "../components/organisms/TreeStructure/TreeStructure";
import { useTreeStructureStore } from "../store/treeStructureStore";
import { useEffect } from "react";
export const ProjectPlayground = () => {
    const { projectId: projectIdFromUrl } = useParams();

    const { setProjectId, projectId } = useTreeStructureStore();

    useEffect(() => {
        setProjectId(projectIdFromUrl);
    }, [projectIdFromUrl, setProjectId]);

    return (
        <div>
            Project Id: {projectIdFromUrl}
            {projectId && <TreeStructure />}
            <EditorComponent />
            <EditorButton isActive={false} />
            <EditorButton isActive={true} />
        </div>
    );
};
