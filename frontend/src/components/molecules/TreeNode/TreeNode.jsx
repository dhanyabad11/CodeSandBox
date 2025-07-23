import React, { useState } from "react";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";

export const TreeNode = ({ fileFolderData }) => {
    const [visibility, setVisibility] = useState({});

    function toggleVisibility(name) {
        setVisibility({
            ...visibility,
            [name]: !visibility[name],
        });
    }

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
                            color: "black",
                            // backgroundColor: "transparent",
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
                    <p
                        style={{
                            paddingTop: "10px",
                            fontSize: "15px",
                            cursor: "pointer",
                            marginLeft: "5px",
                            color: "black",
                        }}
                    >
                        {fileFolderData.name}
                    </p>
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
