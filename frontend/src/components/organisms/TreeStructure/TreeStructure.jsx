import { useEffect } from "react";
import { useTreeStructureStore } from "../../../store/treeStructureStore";

export const TreeStructure = () => {
    const { TreeStructure, setTreeStructure } = useTreeStructureStore();

    const { projectId } = useParams();

    useEffect(() => {
        setTreeStructure(projectId);
    }, [projectId, setTreeStructure]);

    return (
        <div>
            <h1>Tree Structure</h1>
        </div>
    );
};
