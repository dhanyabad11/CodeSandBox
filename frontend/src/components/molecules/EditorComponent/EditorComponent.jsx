import Editor from "@monaco-editor/react";
import { useActiveFileTabStore } from "../../../store/activeFileTabStore";
import { useEditorSocketStore } from "../../../store/editorSocketStore";
import { extensionToFileType } from "../../../utils/extensionToFileType";

export const EditorComponent = () => {
    let timerId = null;

    const { activeFileTab } = useActiveFileTabStore();
    const { editorSocket } = useEditorSocketStore();

    function handleChange(value) {
        // Clear old timer
        if (timerId != null) {
            clearTimeout(timerId);
        }
        // set the new timer
        timerId = setTimeout(() => {
            const editorContent = value;
            console.log("Sending writefile event");
            editorSocket.emit("writeFile", {
                data: editorContent,
                pathToFileOrFolder: activeFileTab.path,
            });
        }, 2000);
    }

    return (
        <>
            <Editor
                width={"100%"}
                defaultLanguage={undefined}
                defaultValue="// Welcome to the playground"
                theme="vs-dark"
                options={{
                    fontSize: 14,
                    fontFamily:
                        "'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', 'Courier New', monospace",
                    lineHeight: 22,
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                }}
                language={extensionToFileType(activeFileTab?.extension)}
                onChange={handleChange}
                value={activeFileTab?.value ? activeFileTab.value : "// Welcome to the playground"}
            />
        </>
    );
};
