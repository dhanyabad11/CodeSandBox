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
                background: "#1e1e1e",
                foreground: "#cccccc",
                cursor: "#cccccc",
                cursorAccent: "#1e1e1e",
                red: "#f14c4c",
                green: "#23d18b",
                yellow: "#f5f543",
                blue: "#3b8eea",
                magenta: "#d670d6",
                cyan: "#29b8db",
                white: "#cccccc",
                black: "#1e1e1e",
                brightRed: "#f14c4c",
                brightGreen: "#23d18b",
                brightYellow: "#f5f543",
                brightBlue: "#3b8eea",
                brightMagenta: "#d670d6",
                brightCyan: "#29b8db",
                brightWhite: "#ffffff",
                brightBlack: "#666666",
            },
            fontSize: 16,
            fontFamily:
                '"Fira Code", "SF Mono", Monaco, "Cascadia Code", "Ubuntu Mono", "Roboto Mono", Consolas, "Courier New", monospace',
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
