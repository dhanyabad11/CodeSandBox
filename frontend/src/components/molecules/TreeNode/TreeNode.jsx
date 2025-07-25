import React, { useState, useEffect } from "react";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { FileIcon } from "../../atoms/FileIcon/Fileicon";
import { CgEnter } from "react-icons/cg";
import { useEditorSocketStore } from "../../../store/editorSocketStore";

export const TreeNode = ({ fileFolderData }) => {
    const [visibility, setVisibility] = useState({});

    const { editorSocket } = useEditorSocketStore();

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
                            paddingTop: "15px",
                            fontSize: "16px",
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
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <FileIcon extension={computeExtension(fileFolderData)} />
                        <p
                            style={{
                                paddingTop: "5px",
                                fontSize: "15px",
                                cursor: "pointer",
                                marginLeft: "5px",
                                // color: "white",
                            }}
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
