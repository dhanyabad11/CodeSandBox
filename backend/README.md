# CodeSandBox Backend

A Node.js backend service that provides containerized development environments for web projects. This backend powers a browser-based IDE with real-time file editing, terminal access, and Docker container management.

## 🚀 Features

-   **RESTful API** for project management
-   **Real-time file editing** via Socket.IO
-   **Containerized development environments** using Docker
-   **Terminal access** with XTerm.js integration
-   **File watching** with automatic updates
-   **React/Vite project scaffolding**

## 🛠️ Tech Stack

-   **Node.js** (ES Modules)
-   **Express.js** - REST API framework
-   **Socket.IO** - Real-time communication
-   **Docker** - Container management via dockerode
-   **Chokidar** - File system watching
-   **UUID** - Project ID generation

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── serverConfig.js       # Environment configuration
│   ├── controllers/
│   │   └── projectController.js  # HTTP request handlers
│   ├── routes/
│   │   └── v1/
│   │       └── projects.js       # Project API routes
│   ├── service/
│   │   └── projectService.js     # Business logic
│   ├── socketHandlers/
│   │   └── editorHandler.js      # Socket.IO event handlers
│   ├── containers/
│   │   ├── handleContainerCreate.js    # Docker container management
│   │   └── handleTerminalCreation.js   # Terminal stream handling
│   ├── utils/
│   │   └── execUtility.js        # Command execution utilities
│   ├── index.js                  # Main server entry point
│   └── terminalApp.js           # Alternative WebSocket server
├── projects/                     # User project directories
├── Dockerfile                    # Sandbox container definition
├── .env                         # Environment variables
└── package.json
```

## ⚙️ Environment Variables

Create a `.env` file in the backend directory:

```env
PORT=3000
REACT_PROJECT_COMMAND=npm create vite@latest sandbox -- --template react
```

## 🐳 Docker Setup

### Build the Sandbox Image

```bash
docker build -t sandbox .
```

The sandbox image includes:

-   Ubuntu 20.04 base
-   Node.js 22.x
-   Basic development tools (nano, curl)
-   Non-root `sandbox` user

### Container Features

-   **Volume mounting**: Host project files mounted to `/home/sandbox/app/`
-   **Port binding**: Vite dev server (5173) exposed with random host port
-   **Interactive terminal**: Bash shell with custom PS1 prompt

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Build Docker Image

```bash
docker build -t sandbox .
```

### 3. Start the Server

```bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start
```

### 4. Verify Setup

-   Backend API: `http://localhost:3000/ping`
-   Create project: `POST http://localhost:3000/api/v1/projects`
-   Get project tree: `GET http://localhost:3000/api/v1/projects/:id/tree`

## 🔌 API Endpoints

### Projects

-   `POST /api/v1/projects` - Create new project
-   `GET /api/v1/projects/:projectId/tree` - Get project file tree

### Health Check

-   `GET /ping` - Server health check

## 🔄 Socket.IO Namespaces

### Editor Namespace (`/editor`)

Real-time file operations with project file watching:

**Events:**

-   `readFile` - Read file content
-   `writeFile` - Write file content
-   `createFile` - Create new file
-   `deleteFile` - Delete file
-   `filechange` - File system change notifications

**Query Parameters:**

-   `projectId` - Required project identifier

### Terminal Namespace (`/terminal`)

Container terminal access:

**Events:**

-   `shell-input` - Send command input
-   `shell-output` - Receive command output
-   `container-ready` - Container initialization complete
-   `container-error` - Container creation failed

**Query Parameters:**

-   `projectId` - Required project identifier

## 🐛 Development

### File Watching

The server watches project directories and emits real-time change notifications:

-   Ignores `node_modules`
-   2-second stability threshold
-   Automatic cleanup on disconnect

### Container Management

-   **Automatic cleanup**: Removes existing containers before creating new ones
-   **Volume mounting**: Project files accessible at `/home/sandbox/app/sandbox/`
-   **Port management**: Random port assignment for Vite dev server

## 🔧 Debugging

### Common Issues

**1. Port Already in Use**

```bash
# Find process using port
lsof -i :3000
# Kill the process
kill <PID>
```

**2. Docker Container Issues**

```bash
# List containers
docker ps -a
# Check container logs
docker logs <container_name>
# Remove all containers
docker rm $(docker ps -aq)
```

**3. Environment Variables Not Loading**

-   Ensure `.env` file is in backend root directory
-   Check file permissions: `chmod 644 .env`
-   Restart server after changes

### Logs

The server provides detailed logging for:

-   Socket.IO connections
-   Container creation/management
-   File operations
-   Environment variable loading

## 📝 Usage Examples

### Creating a New Project

```javascript
// Frontend code
const response = await fetch("http://localhost:3000/api/v1/projects", {
    method: "POST",
});
const { projectId } = await response.json();
```

### Socket.IO Connection

```javascript
// Frontend code
import { io } from "socket.io-client";

// Editor connection
const editorSocket = io("http://localhost:3000/editor", {
    query: { projectId: "your-project-id" },
});

// Terminal connection
const terminalSocket = io("http://localhost:3000/terminal", {
    query: { projectId: "your-project-id" },
});
```

### Container Terminal Usage

```bash
# After terminal connection, you'll be in:
/home/sandbox/app

# Navigate to your project:
cd sandbox

# Install dependencies:
npm install

# Start development server:
npm run dev -- --host 0.0.0.0
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📄 License

This project is part of the CodeSandBox application.
