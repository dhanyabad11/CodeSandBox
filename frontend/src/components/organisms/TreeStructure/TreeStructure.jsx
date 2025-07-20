import { useEffect } from "react";
import { useTreeStructureStore } from "../../../store/treeStructureStore";

export const TreeStructure = () => {
    const { TreeStructure, setTreeStructure } = useTreeStructureStore();

    useEffect(() => {
        if (TreeStructure) {
            console.log("tree:", TreeStructure);
        } else {
            setTreeStructure();
        }
    }, [setTreeStructure, TreeStructure]);

    return (
        <div>
            <h1>Tree Structure</h1>
        </div>
    );
};
