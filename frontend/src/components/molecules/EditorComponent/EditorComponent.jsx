import Editor from "@monaco-editor/react";
import { useEffect, useState } from "react";

export const EditorComponent = () => {
    const [editorState, setEditorState] = useState({
        theme: null,
    });

    useEffect(() => {
        async function downloadTheme() {
            try {
                const response = await fetch("/Dracula.json");
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setEditorState((prev) => ({ ...prev, theme: data }));
            } catch (error) {
                console.error("Failed to load theme:", error);
                // Fallback to default theme if custom theme fails
                setEditorState((prev) => ({ ...prev, theme: "default" }));
            }
        }
        downloadTheme();
    }, []);

    function handleEditorTheme(editor, monaco) {
        if (editorState.theme && editorState.theme !== "default") {
            monaco.editor.defineTheme("dracula", editorState.theme);
            monaco.editor.setTheme("dracula");
        }
    }
    return (
        <>
            {editorState.theme && (
                <Editor
                    height={"80vh"}
                    width={"100%"}
                    defaultLanguage="javascript"
                    defaultValue="// Welcome to the playground"
                    options={{
                        fontSize: 18,
                        fontFamily: "monospace",
                    }}
                    onMount={handleEditorTheme}
                />
            )}
        </>
    );
};
