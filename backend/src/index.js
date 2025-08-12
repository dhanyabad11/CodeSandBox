import express from "express";
import cors from "cors";
import { createServer } from "node:http";
import apiRouter from "./routes/index.js";
import { Server } from "socket.io";

import { PORT } from "./config/serverConfig.js";
import chokidar from "chokidar";
import path from "path";
import { handleEditorSocketEvents } from "./socketHandlers/editorHandler.js";
import { handleContainerCreate } from "../containers/handleContainerCreate.js";

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        method: ["GET", "POST"],
    },
});

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

io.on("connection", (socket) => {
    console.log("a user connected");
});

app.use("/api", apiRouter);

app.get("/ping", (req, res) => {
    return res.json({ message: "pong" });
});

const editorNamespace = io.of("/editor");

editorNamespace.on("connection", (socket) => {
    console.log("editor connected");

    let projectId = socket.handshake.query["projectId"];

    if (projectId) {
        console.log("Project id received after connection", projectId);

        var watcher = chokidar.watch(`./projects/${projectId}`, {
            ignored: (path) => path.includes("node_modules"),
            persistent: true,

            awaitWriteFinish: {
                stabilityThreshold: 2000,
            },
            ignoreInitial: true,
        });

        watcher.on("all", (event, path) => {
            console.log(event, path);
            socket.emit("filechange", { path });
        });
    }

    socket.on("disconnect", async () => {
        if (watcher) {
            await watcher.close();
        }
        console.log("editor disconnected");
    });

    handleEditorSocketEvents(socket, editorNamespace);
});

const terminalNamespce = io.of("/terminal");
terminalNamespce.on("connection", (socket) => {
    console.log("terminal connected");
    let projectId = socket.handshake.query["projectId"];
    socket.on("shell-input", (data) => {
        console.log("input recieved", data);
        terminalNamespce.emit("shell-output", data);
    });

    socket.on("disconnect", () => {
        console.log("terminal disconnected");
    });
    handleContainerCreate(projectId, socket);
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(process.cwd());
});
