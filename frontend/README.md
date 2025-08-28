# CodeSandbox Clone - Frontend

A modern web-based IDE and development environment built with React and Vite, featuring a Monaco Editor, integrated terminal, and file management system.

## 🚀 Features

-   **Monaco Editor**: Full-featured code editor with syntax highlighting for multiple languages
-   **File Tree**: Interactive file explorer with context menu operations
-   **Integrated Terminal**: Browser-based terminal with xterm.js
-   **Real-time Collaboration**: Socket.io integration for live editing
-   **Resizable Panels**: Allotment-based layout with draggable splitters
-   **Project Management**: Create and manage multiple coding projects
-   **Live Preview**: Built-in browser for viewing your applications

## 🛠 Tech Stack

-   **Frontend Framework**: React 18
-   **Build Tool**: Vite
-   **Code Editor**: Monaco Editor
-   **Terminal**: xterm.js with FitAddon and AttachAddon
-   **UI Components**: Ant Design
-   **State Management**: Zustand
-   **API Client**: Axios + React Query
-   **Real-time**: Socket.io Client
-   **Styling**: CSS-in-JS with custom themes
-   **Fonts**: Fira Code (Google Fonts)

## 📁 Project Structure

```
src/
├── components/
│   ├── atoms/              # Small reusable components
│   ├── molecules/          # Medium components (Editor, Terminal)
│   └── organisms/          # Large components (TreeStructure, Browser)
├── pages/                  # Page components
├── store/                  # Zustand state management
├── hooks/                  # Custom React hooks
├── apis/                   # API client functions
├── utils/                  # Utility functions
└── config/                 # Configuration files
```

## 🚀 Getting Started

### Prerequisites

-   Node.js 16+
-   npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd CodeSandBox/frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create environment file:

```bash
cp .env.example .env.local
```

4. Configure environment variables:

```env
VITE_BACKEND_URL=http://localhost:3000
```

5. Start the development server:

```bash
npm run dev
```

6. Open [http://localhost:5173](http://localhost:5173) in your browser

## 🔧 Available Scripts

-   `npm run dev` - Start development server
-   `npm run build` - Build for production
-   `npm run preview` - Preview production build
-   `npm run lint` - Run ESLint

## 🎯 Key Components

### EditorComponent

-   Monaco Editor integration
-   Language detection based on file extensions
-   Auto-save functionality
-   Theme customization (Dracula theme)

### BrowserTerminal

-   xterm.js terminal emulation
-   WebSocket connection for real shell commands
-   Responsive terminal sizing
-   Custom color scheme

### TreeStructure

-   File/folder tree visualization
-   Context menu for file operations
-   Real-time updates via Socket.io

### ProjectPlayground

-   Main IDE layout
-   Resizable panels with Allotment
-   Editor + Terminal split view
-   Browser preview panel

## 🔌 API Integration

The frontend communicates with a backend server for:

-   Project creation and management
-   File operations (read, write, delete)
-   Real-time collaboration
-   Terminal command execution

## 🎨 Theming

-   **Dark Theme**: Primary UI theme
-   **Editor Theme**: Dracula theme for Monaco Editor
-   **Terminal Theme**: Custom dark color scheme
-   **Fonts**: Fira Code with fallbacks

## 🧩 Browser Support

-   Chrome/Edge 80+
-   Firefox 75+
-   Safari 13+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🚨 Known Issues

-   WebSocket connection may fail if backend is not running
-   Some terminal features require backend integration
-   Monaco Editor themes require external JSON files

## 🔗 Related Projects

-   [Backend Repository](../backend) - Node.js backend server
-   [Monaco Editor](https://microsoft.github.io/monaco-editor/)
-   [xterm.js](https://xtermjs.org/)
