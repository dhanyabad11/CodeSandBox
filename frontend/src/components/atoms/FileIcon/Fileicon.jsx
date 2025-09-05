import { FaCss3, FaHtml5, FaJs, FaNodeJs, FaMarkdown, FaGitAlt } from "react-icons/fa";
import { GrReactjs } from "react-icons/gr";
import { AiOutlineFile, AiOutlineFileText } from "react-icons/ai";
import { VscJson } from "react-icons/vsc";
import { SiMarkdown } from "react-icons/si";

export const FileIcon = ({ extension, fileName }) => {
    const iconStyle = {
        height: "12px",
        width: "12px",
    };

    // Special handling for specific filenames
    const fileNameIcons = {
        "package.json": <FaNodeJs color="#8cc84b" style={iconStyle} />,
        "package-lock.json": <FaNodeJs color="#8cc84b" style={iconStyle} />,
        "tsconfig.json": <VscJson color="#007acc" style={iconStyle} />,
        "README.md": <SiMarkdown color="#007acc" style={iconStyle} />,
        ".gitignore": <FaGitAlt color="#f54d27" style={iconStyle} />,
        "index.html": <FaHtml5 color="#e34c26" style={iconStyle} />,
    };

    // Check for specific filename first
    if (fileName && fileNameIcons[fileName]) {
        return fileNameIcons[fileName];
    }

    // Extension-based icons
    const IconMapper = {
        js: <FaJs color="#f7df1e" style={iconStyle} />,
        jsx: <GrReactjs color="#61dbfa" style={iconStyle} />,
        ts: <AiOutlineFileText color="#007acc" style={iconStyle} />,
        tsx: <GrReactjs color="#007acc" style={iconStyle} />,
        css: <FaCss3 color="#1572b6" style={iconStyle} />,
        html: <FaHtml5 color="#e34c26" style={iconStyle} />,
        json: <VscJson color="#ffd700" style={iconStyle} />,
        md: <FaMarkdown color="#ffffff" style={iconStyle} />,
        txt: <AiOutlineFileText color="#ffffff" style={iconStyle} />,
        svg: <AiOutlineFile color="#ffb13b" style={iconStyle} />,
    };

    return <>{IconMapper[extension] || <AiOutlineFile color="#ffffff" style={iconStyle} />}</>;
};
