import { useParams } from "react-router-dom";
import { EditorComponent } from "../components/molecules/EditorComponent/EditorComponent";
import { EditorButton } from "../components/atoms/EditorButton/EditorButton";
import { TreeStructure } from "../components/organisms/TreeStructure/TreeStructure";
import { useTreeStructureStore } from "../store/treeStructureStore";
import { useEffect } from "react";
import { useEditorSocketStore } from "../store/editorSocketStore";
import { io } from "socket.io-client";

export const ProjectPlayground = () => {
    const { projectId: projectIdFromUrl } = useParams();

    const { setProjectId, projectId } = useTreeStructureStore();

    const { setEditorSocket } = useEditorSocketStore();

    useEffect(() => {
        if (projectIdFromUrl) {
            setProjectId(projectIdFromUrl);

            const editorSocketConn = io(
                `${import.meta.env.VITE_BACKEND_URL}/editor?projectId=${projectId}`,
                {
                    query: `projectId=${projectIdFromUrl}`,
                }
            );
            setEditorSocket(editorSocketConn);
        }
    }, [projectIdFromUrl, setProjectId, setEditorSocket, projectId]);

    return (
        <>
            <div style={{ display: "flex" }}>
                {projectId && (
                    <div
                        style={{
                            backgroundColor: "#22213c",
                            paddingRight: "10px",
                            paddingTop: "0.3vh",
                            minWidth: "250px",
                            maxWidth: "25%",
                            height: "99.7vh",
                            overFlow: "auto",
                        }}
                    >
                        <TreeStructure />
                    </div>
                )}
                <EditorComponent />
            </div>
            <EditorButton isActive={false} />
            <EditorButton isActive={true} />
        </>
    );
};
