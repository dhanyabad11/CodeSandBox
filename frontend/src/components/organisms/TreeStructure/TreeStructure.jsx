import { useEffect } from "react";
import { useTreeStructureStore } from "../../../store/treeStructureStore";
import { TreeNode } from "../../molecules/TreeNode/TreeNode";
import { useFileContextMenuStore } from "../../../store/fileContextMenuStore";

export const TreeStructure = () => {
    const { treeStructure, setTreeStructure } = useTreeStructureStore();
    useFileContextMenuStore();
    useEffect(() => {
        if (treeStructure) {
            console.log("tree:", treeStructure);
        } else {
            setTreeStructure();
        }
    }, [setTreeStructure, treeStructure]);

    return (
        <>
            <TreeNode fileFolderData={treeStructure} />
        </>
    );
};
