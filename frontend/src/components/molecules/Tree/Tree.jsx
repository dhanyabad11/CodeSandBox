import { IoIosArrowForward } from "react-icons/io";

export const Tree = ({ fileFolderData }) => {
    return (
        fileFolderData && (
            <div
                style={{
                    paddingLeft: "15px",
                    color: "white",
                }}
            >
                {fileFolderData.children ? (
                    <button>
                        <IoIosArrowForward
                            style={{
                                height: "16px",
                                width: "16px",
                            }}
                        />
                        {fileFolderData.name}
                    </button>
                ) : (
                    <p>{fileFolderData.name}</p>
                )}
            </div>
        )
    );
};
