import React, { useState, useEffect } from "react";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { FileIcon } from "../../atoms/FileIcon/Fileicon";
import { CgEnter } from "react-icons/cg";
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
        console.log("Right clicked on", path);
        setFile(path);
        setFileContextMenuX(e.clientX);
        setFileContextMenuY(e.clientY);
        setFileContextMenuIsOpen(true);
    }
    useEffect(() => {
        console.log("Visibility changed", visibility);
    }, [visibility]);

    return (
        fileFolderData && (
            <div
                style={{
                    paddingLeft: "15px",
                    color: "white",
                }}
            >
                {fileFolderData.children ? (
                    <button
                        onClick={() => toggleVisibility(fileFolderData.name)}
                        style={{
                            border: "none",
                            cursor: "pointer",
                            outline: "none",
                            color: "white",
                            backgroundColor: "transparent",
                            padding: "15px",
                            fontSize: "16px",
                            marginTop: "10px",
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
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "start" }}>
                        <FileIcon extension={computeExtension(fileFolderData)} />
                        <p
                            style={{
                                marginTop: "8px",
                                paddingBottom: "15px",
                                paddingTop: "15px",
                                fontSize: "15px",
                                cursor: "pointer",
                                marginLeft: "18px",
                                // color: "white",
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
