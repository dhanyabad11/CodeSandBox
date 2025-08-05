import { Terminal } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import "@xterm/xterm/css/xterm.css";

export const BrowserTerminal = () => {
    const terminalRef = useRef(null);

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
            fontFamily: "Ubuntu Mono",
            convertEol: true,
        });
    });
    return (
        <div
            style={{
                width: "100",
                height: "100vh",
                overflow: "hidden",
            }}
        ></div>
    );
};
