import express from "express";
import cors from "cors";
import { createServer } from "node:http";
import apiRouter from "./routes/index.js";
import { Server } from "socket.io";

import { PORT } from "./config/serverConfig.js";
import chokidar from "chokidar";
import path from "path";

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

    let projectId = "123";

    if (projectId) {
        const watcher = chokidar.watch(`./project/${projectId}`, {
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

    socket.on("message", () => {
        console.log("got a message event", data);
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
