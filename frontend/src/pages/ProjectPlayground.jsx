import { useParams } from "react-router-dom";
import { EditorComponent } from "../components/molecules/EditorComponent/EditorComponent";

export const ProjectPlayground = () => {
    const { projectId } = useParams();
    return (
        <div>
            <h2>Project Id: {projectId}</h2>
            <EditorComponent />
        </div>
    );
};
