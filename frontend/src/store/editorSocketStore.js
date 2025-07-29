import { create } from "zustand";
import { useActiveFileTabStore } from "./activeFileTabStore";
import { useTreeStructureStore } from "./treeStructureStore";

export const useEditorSocketStore = create((set) => ({
    editorSocket: null,
    setEditorSocket: (incomingSocket) => {
        // useEffect(() => {
        //     if (editorSocket) {
        //         editorSocket.on("readFileSuccess", (data) => {
        //             console.log("Read file success", data);
        //             setActiveFileTab(data.path, data.value);
        //         });

        //         return () => {
        //             editorSocket.off("readFileSuccess");
        //         };
        //     }
        // }, [editorSocket, setActiveFileTab]);

        const activeFileTabSetter = useActiveFileTabStore.getState().setActiveFileTab;
        const projectTreeStructureSetter = useTreeStructureStore.getState().setTreeStructure;

        incomingSocket?.on("readFileSuccess", (data) => {
            console.log("Read file success", data);
            const fileExtension = data.path.split(".").pop();
            activeFileTabSetter(data.path, data.value, fileExtension);
        });

        incomingSocket?.on("writeFileSucces", (data) => {
            console.log("Write file success", data);
            // incomingSocket.emit("readFile", {
            // pathFileOrFolder: data.path,
            // });
        });

        incomingSocket?.on("deleteFileSucces", () => {
            projectTreeStructureSetter();
        });
        set({
            editorSocket: incomingSocket,
        });
    },
}));
