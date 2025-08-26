import { Terminal } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import "@xterm/xterm/css/xterm.css"; // required styles
import { useEffect, useRef } from "react";
import { AttachAddon } from "@xterm/addon-attach";
import { useTerminalSocketStore } from "../../../store/terminalSocketStore";

export const BrowserTerminal = () => {
    const terminalRef = useRef(null);
    // const socket = useRef(null);
    // const {projectId: projectIdFromUrl } = useParams();

    const { terminalSocket } = useTerminalSocketStore();

    useEffect(() => {
        const term = new Terminal({
            cursorBlink: true,
            theme: {
                background: "#282a37",
                foreground: "#f8f8f3",
                cursor: "#f8f8f3",
                cursorAccent: "#282a37",
                red: "#ff5544",
                green: "#50fa7c",
                yellow: "#f1fa8c",
                cyan: "#8be9fd",
            },
            fontSize: 16,
            fontFamily: "Fira Code",
            convertEol: true, // convert CRLF to LF
        });

        // Wait for the DOM element to be ready before opening terminal
        if (terminalRef.current) {
            term.open(terminalRef.current);

            const fitAddon = new FitAddon();
            term.loadAddon(fitAddon);

            // Use setTimeout to ensure the container is properly sized
            setTimeout(() => {
                try {
                    if (terminalRef.current && terminalRef.current.offsetWidth > 0) {
                        fitAddon.fit();
                    }
                } catch (error) {
                    console.error("Error fitting terminal:", error);
                }
            }, 100);
        }

        if (terminalSocket) {
            terminalSocket.onopen = () => {
                const attachAddon = new AttachAddon(terminalSocket);
                term.loadAddon(attachAddon);
                // socket.current = ws;
            };
        }

        return () => {
            term.dispose();
            terminalSocket?.close();
        };
    }, [terminalSocket]);

    return (
        <div
            ref={terminalRef}
            style={{
                width: "100%",
                height: "400px", // Add explicit height
                minHeight: "300px", // Ensure minimum height
            }}
            className="terminal"
            id="terminal-container"
        ></div>
    );
};
