import { create } from "zustand";
import { useActiveFileTabStore } from "./activeFileTabStore";

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

        incomingSocket?.on("readFileSuccess", (data) => {
            console.log("Read file success", data);
            activeFileTabSetter(data.path, data.value);
        });
        set({
            editorSocket: incomingSocket,
        });
    },
}));
