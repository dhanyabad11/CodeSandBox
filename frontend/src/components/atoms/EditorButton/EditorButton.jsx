import "./EditorButton.css";
export const EditorButton = ({ isActive }) => {
    function handleClick() {}
    return (
        <button
            style={{
                color: isActive ? "white" : "#6272a4",
                backgroundColor: isActive ? "#303242" : "#4a4859",
                borderTop: isActive ? "1px solid #f7b9dd" : "none",
            }}
            className="editor-button"
            onClick={handleClick}
        >
            file.js
        </button>
    );
};
