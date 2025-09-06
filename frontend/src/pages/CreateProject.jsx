import { Button, Col, Flex, Row } from "antd";
import { useCreateProject } from "../hooks/apis/mutations/useCreateProject";
import { useNavigate } from "react-router-dom";
import { FaCode, FaRocket, FaLightbulb } from "react-icons/fa";
import { SiJavascript, SiReact, SiNodedotjs, SiPython, SiTypescript } from "react-icons/si";

export const CreateProject = () => {
    const { createProjectMutation } = useCreateProject();
    const navigate = useNavigate();

    async function handleCreateProject() {
        console.log("Going to trigger the api");
        try {
            const response = await createProjectMutation();
            console.log("Now we should redirect to the editor");
            navigate(`/project/${response.data}`);
        } catch (error) {
            console.log("Error creating project", error);
        }
    }

    return (
        <div style={{
            minHeight: "100vh",
            backgroundColor: "#1e1e1e",
            color: "#cccccc",
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
            padding: "0 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <div style={{
                maxWidth: "800px",
                width: "100%",
                textAlign: "center"
            }}>
                {/* Header Section */}
                <div style={{ marginBottom: "60px" }}>
                    <div style={{
                        fontSize: "48px",
                        fontWeight: "600",
                        marginBottom: "16px",
                        background: "linear-gradient(135deg, #007acc 0%, #4fc3f7 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text"
                    }}>
                        <FaCode style={{ marginRight: "12px", verticalAlign: "middle" }} />
                        CodeSandbox
                    </div>
                    <p style={{
                        fontSize: "20px",
                        color: "#8c8c8c",
                        marginBottom: "0",
                        lineHeight: "1.5"
                    }}>
                        Create, code, and collaborate in your browser
                    </p>
                </div>

                {/* Features Section */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                    gap: "24px",
                    marginBottom: "60px"
                }}>
                    <div style={{
                        backgroundColor: "#252526",
                        border: "1px solid #3e3e42",
                        borderRadius: "8px",
                        padding: "24px",
                        textAlign: "left"
                    }}>
                        <FaRocket style={{ fontSize: "24px", color: "#007acc", marginBottom: "12px" }} />
                        <h3 style={{ color: "#ffffff", fontSize: "16px", marginBottom: "8px", fontWeight: "500" }}>
                            Instant Setup
                        </h3>
                        <p style={{ color: "#8c8c8c", fontSize: "14px", margin: "0", lineHeight: "1.4" }}>
                            No configuration needed. Start coding immediately with a fully configured environment.
                        </p>
                    </div>

                    <div style={{
                        backgroundColor: "#252526",
                        border: "1px solid #3e3e42",
                        borderRadius: "8px",
                        padding: "24px",
                        textAlign: "left"
                    }}>
                        <FaLightbulb style={{ fontSize: "24px", color: "#007acc", marginBottom: "12px" }} />
                        <h3 style={{ color: "#ffffff", fontSize: "16px", marginBottom: "8px", fontWeight: "500" }}>
                            Modern Tools
                        </h3>
                        <p style={{ color: "#8c8c8c", fontSize: "14px", margin: "0", lineHeight: "1.4" }}>
                            Built-in terminal, code editor, and browser preview. Everything you need in one place.
                        </p>
                    </div>

                    <div style={{
                        backgroundColor: "#252526",
                        border: "1px solid #3e3e42",
                        borderRadius: "8px",
                        padding: "24px",
                        textAlign: "left"
                    }}>
                        <div style={{ fontSize: "24px", color: "#007acc", marginBottom: "12px" }}>
                            <SiJavascript style={{ marginRight: "4px" }} />
                            <SiReact style={{ marginRight: "4px" }} />
                            <SiNodedotjs />
                        </div>
                        <h3 style={{ color: "#ffffff", fontSize: "16px", marginBottom: "8px", fontWeight: "500" }}>
                            Multi-Language
                        </h3>
                        <p style={{ color: "#8c8c8c", fontSize: "14px", margin: "0", lineHeight: "1.4" }}>
                            Support for JavaScript, TypeScript, React, Node.js, Python, and more.
                        </p>
                    </div>
                </div>

                {/* CTA Section */}
                <div style={{
                    backgroundColor: "#252526",
                    border: "1px solid #3e3e42",
                    borderRadius: "12px",
                    padding: "40px",
                    marginBottom: "40px"
                }}>
                    <h2 style={{
                        color: "#ffffff",
                        fontSize: "24px",
                        marginBottom: "16px",
                        fontWeight: "500"
                    }}>
                        Ready to start coding?
                    </h2>
                    <p style={{
                        color: "#8c8c8c",
                        fontSize: "16px",
                        marginBottom: "32px",
                        lineHeight: "1.5"
                    }}>
                        Create your playground and dive into coding with our VS Code-inspired environment
                    </p>
                    
                    <button
                        onClick={handleCreateProject}
                        style={{
                            backgroundColor: "#007acc",
                            color: "#ffffff",
                            border: "none",
                            borderRadius: "6px",
                            padding: "16px 32px",
                            fontSize: "16px",
                            fontWeight: "500",
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "8px",
                            boxShadow: "0 2px 8px rgba(0, 122, 204, 0.3)"
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.backgroundColor = "#106ebe";
                            e.target.style.transform = "translateY(-1px)";
                            e.target.style.boxShadow = "0 4px 12px rgba(0, 122, 204, 0.4)";
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.backgroundColor = "#007acc";
                            e.target.style.transform = "translateY(0)";
                            e.target.style.boxShadow = "0 2px 8px rgba(0, 122, 204, 0.3)";
                        }}
                    >
                        <FaRocket />
                        Create New Playground
                    </button>
                </div>

                {/* Footer */}
                <div style={{
                    borderTop: "1px solid #3e3e42",
                    paddingTop: "20px",
                    color: "#6a6a6a",
                    fontSize: "14px"
                }}>
                    <p style={{ margin: "0" }}>
                        Powered by VS Code • Built for developers
                    </p>
                </div>
            </div>
        </div>
    );
};
