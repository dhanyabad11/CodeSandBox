import { useEffect } from "react";
import { useTreeStructureStore } from "../../../store/treeStructureStore";
import { TreeNode } from "../../molecules/TreeNode/TreeNode";

export const TreeStructure = () => {
    const { treeStructure, setTreeStructure } = useTreeStructureStore();

    useEffect(() => {
        if (treeStructure) {
            console.log("tree:", treeStructure);
        } else {
            setTreeStructure();
        }
    }, [setTreeStructure, treeStructure]);

    return (
        <div>
            <h1>Tree Structure</h1>
            <TreeNode fileFolderData={treeStructure} />
        </div>
    );
};
