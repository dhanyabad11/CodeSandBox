export const FileContextMenu = ({ x, y, path }) => {
    function handleFileDelete(e) {
        e.preventDefault();
        console.log("Deleting file at", path);
    }
    return (
        <div
            style={{
                width: "120px",
                position: "fixed",
                left: x,
                top: y,
                border: "1.5px solid black",
            }}
        >
            <button onClick={handleFileDelete}>Delete File</button>
            <button>Rename File</button>
        </div>
    );
};
