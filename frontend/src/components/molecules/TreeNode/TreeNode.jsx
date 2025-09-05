import { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { FileIcon } from "../../atoms/FileIcon/Fileicon";
import { useEditorSocketStore } from "../../../store/editorSocketStore";
import { useFileContextMenuStore } from "../../../store/fileContextMenuStore";

export const TreeNode = ({ fileFolderData }) => {
    const [visibility, setVisibility] = useState({});

    const { editorSocket } = useEditorSocketStore();

    const {
        setFile,
        setIsOpen: setFileContextMenuIsOpen,
        setX: setFileContextMenuX,
        setY: setFileContextMenuY,
    } = useFileContextMenuStore();

    function toggleVisibility(name) {
        setVisibility({
            ...visibility,
            [name]: !visibility[name],
        });
    }

    function computeExtension(fileFolderData) {
        const names = fileFolderData.name.split(".");
        return names[names.length - 1];
    }

    function handleDoubleClick(fileFolderData) {
        console.log("Double clicked on", fileFolderData);
        editorSocket.emit("readFile", {
            pathToFileOrFolder: fileFolderData.path,
        });
    }

    function handleContextMenuForFiles(e, path) {
        e.preventDefault();
        console.log("Right clicked on", path, e);
        setFile(path);
        setFileContextMenuX(e.clientX);
        setFileContextMenuY(e.clientY);
        setFileContextMenuIsOpen(true);
    }

    useEffect(() => {
        console.log("Visibility chanmged", visibility);
    }, [visibility]);

    return (
        fileFolderData && (
            <div
                className="sidebar-font"
                style={{
                    paddingLeft: "8px",
                    color: "#cccccc",
                }}
            >
                {fileFolderData.children /** If the current node is a folder ? */ ? (
                    /** If the current node is a folder, render it as a button */
                    <button
                        onClick={() => toggleVisibility(fileFolderData.name)}
                        className="sidebar-folder-item"
                        style={{
                            border: "none",
                            cursor: "pointer",
                            outline: "none",
                            color: "#cccccc",
                            backgroundColor: "transparent",
                            padding: "2px 4px",
                            fontSize: "14px",
                            fontFamily:
                                "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
                            marginTop: "0px",
                            width: "100%",
                            textAlign: "left",
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        {visibility[fileFolderData.name] ? (
                            <IoIosArrowDown />
                        ) : (
                            <IoIosArrowForward />
                        )}
                        {fileFolderData.name}
                    </button>
                ) : (
                    /** If the current node is not a folder, render it as a p */
                    <div
                        className="sidebar-item"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "start",
                            padding: "1px 4px",
                        }}
                    >
                        <FileIcon
                            extension={computeExtension(fileFolderData)}
                            fileName={fileFolderData.name}
                        />
                        <p
                            style={{
                                paddingTop: "2px",
                                paddingBottom: "2px",
                                marginTop: "0px",
                                fontSize: "14px",
                                fontFamily:
                                    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
                                cursor: "pointer",
                                marginLeft: "6px",
                                color: "#cccccc",
                            }}
                            onContextMenu={(e) => handleContextMenuForFiles(e, fileFolderData.path)}
                            onDoubleClick={() => handleDoubleClick(fileFolderData)}
                        >
                            {fileFolderData.name}
                        </p>
                    </div>
                )}
                {visibility[fileFolderData.name] &&
                    fileFolderData.children &&
                    fileFolderData.children.map((child) => (
                        <TreeNode fileFolderData={child} key={child.name} />
                    ))}
            </div>
        )
    );
};
