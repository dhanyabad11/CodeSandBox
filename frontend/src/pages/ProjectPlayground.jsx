import { useParams } from "react-router-dom";
import { EditorComponent } from "../components/molecules/EditorComponent/EditorComponent";
import { EditorButton } from "../components/atoms/EditorButton/EditorButton";
export const ProjectPlayground = () => {
    const { projectId } = useParams();
    return (
        <div>
            <h2>Project Id: {projectId}</h2>
            <EditorComponent />
            <EditorButton isActive={false} />
            <EditorButton isActive={true} />
        </div>
    );
};
