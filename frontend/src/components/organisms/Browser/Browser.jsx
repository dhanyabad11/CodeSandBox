import { useEffect, useRef } from "react";
import { Input, Row } from "antd";
import { useEditorSocketStore } from "../../../store/editorSocketStore";
import { usePortStore } from "../../../store/portStore";
import { ReloadOutlined } from "@ant-design/icons";

export const Browser = ({ projectId }) => {
    const browserRef = useRef(null);
    const { port } = usePortStore();

    const { editorSocket } = useEditorSocketStore();

    // Use the current hostname (works for both localhost and remote servers)
    const browserUrl = `http://${window.location.hostname}:${port}`;

    useEffect(() => {
        if (!port) {
            editorSocket?.emit("getPort", {
                containerName: projectId,
            });
        }
    }, [port, editorSocket]);

    if (!port) {
        return <div>Loading....</div>;
    }

    function handleRefresh() {
        if (browserRef.current) {
            const oldAddr = browserRef.current.src;
            browserRef.current.src = oldAddr;
        }
    }

    return (
        <Row
            style={{
                backgroundColor: "#22212b",
            }}
        >
            <Input
                style={{
                    width: "100%",
                    height: "30px",
                    color: "white",
                    fontFamily: "Fira Code",
                    backgroundColor: "#282a35",
                }}
                prefix={<ReloadOutlined onClick={handleRefresh} />}
                defaultValue={browserUrl}
            />

            <iframe
                ref={browserRef}
                src={browserUrl}
                style={{
                    width: "100%",
                    height: "95vh",
                    border: "none",
                }}
            />
        </Row>
    );
};
