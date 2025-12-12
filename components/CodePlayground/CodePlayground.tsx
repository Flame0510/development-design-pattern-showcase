/**
 * COMPONENT TYPE: Container
 * SECTION: UI Components
 *
 * ROLE:
 * - Interactive code playground with editor and console
 * - Execute JavaScript code safely in isolated environment
 * - Display console output (logs, errors, warnings)
 *
 * PATTERNS USED:
 * - Container/Presentational Split - Manages state, delegates UI to child components
 * - Facade Pattern - Simplifies complex Monaco Editor + execution environment
 * - Observer Pattern - Captures console.log/error/warn calls
 *
 * NOTES FOR CONTRIBUTORS:
 * - Code execution happens in Function() constructor (safer than eval)
 * - Console methods are intercepted to capture output
 * - Split layout: Editor (60%) | Console (40%)
 * - Modal is full-screen on mobile, large on desktop
 */

"use client";

import { useState, useRef } from "react";
import { Modal, Button, Space } from "antd";
import {
    PlayCircleOutlined,
    ReloadOutlined,
    CloseOutlined,
    CommentOutlined,
} from "@ant-design/icons";
import { openChatGPT } from "@/lib/chatgpt";
import PlaygroundEditor, { PlaygroundEditorRef } from "./PlaygroundEditor";
import PlaygroundConsole, { ConsoleLog } from "./PlaygroundConsole";
import "./CodePlayground.scss";

interface CodePlaygroundProps {
    open: boolean;
    onClose: () => void;
    initialCode: string;
    title?: string;
}

export default function CodePlayground({
    open,
    onClose,
    initialCode,
    title = "JavaScript Playground",
}: CodePlaygroundProps) {
    const [code, setCode] = useState(initialCode);
    const [logs, setLogs] = useState<ConsoleLog[]>([]);
    const [isRunning, setIsRunning] = useState(false);
    const editorRef = useRef<PlaygroundEditorRef>(null);

    // Detect OS for keyboard shortcut hint
    const isMac =
        typeof window !== "undefined" &&
        navigator.platform.toUpperCase().indexOf("MAC") >= 0;
    const isMobile =
        typeof window !== "undefined" &&
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
        );
    const shortcutHint = isMobile ? "" : isMac ? "(⌘+Enter)" : "(Ctrl+Enter)";

    const handleReset = () => {
        setCode(initialCode);
        setLogs([]);
    };

    const handleClearConsole = () => {
        setLogs([]);
    };

    const addLog = (type: ConsoleLog["type"], ...args: any[]) => {
        const message = args
            .map((arg) => {
                if (typeof arg === "object") {
                    try {
                        return JSON.stringify(arg, null, 2);
                    } catch {
                        return String(arg);
                    }
                }
                return String(arg);
            })
            .join(" ");

        setLogs((prev) => [...prev, { type, message, timestamp: Date.now() }]);
    };

    const executeCode = (codeToExecute?: string) => {
        setIsRunning(true);
        setLogs([]); // Clear previous output

        // Use provided code or current state
        const actualCode = codeToExecute || code;

        // Create a safe execution environment
        try {
            // Intercept console methods
            const customConsole = {
                log: (...args: any[]) => addLog("log", ...args),
                error: (...args: any[]) => addLog("error", ...args),
                warn: (...args: any[]) => addLog("warn", ...args),
                info: (...args: any[]) => addLog("info", ...args),
            };

            // Execute code in isolated scope
            // Using Function constructor instead of eval for better security
            const executionFunction = new Function("console", actualCode);
            executionFunction(customConsole);

            // If no output, show success message
            if (logs.length === 0) {
                addLog("info", "Codice eseguito con successo (nessun output)");
            }
        } catch (error: any) {
            addLog("error", `Errore di esecuzione: ${error.message}`);
        } finally {
            setIsRunning(false);
        }
    };

    return (
        <Modal
            open={open}
            onCancel={onClose}
            title={title}
            width="90vw"
            centered
            footer={null}
            closeIcon={<CloseOutlined />}
            className="code-playground-modal"
        >
            <div className="code-playground">
                {/* Toolbar */}
                <div className="code-playground__toolbar">
                    <Space>
                        <Button
                            type="primary"
                            icon={<PlayCircleOutlined />}
                            onClick={() => {
                                const currentCode = editorRef.current?.getCurrentCode() || code;
                                executeCode(currentCode);
                            }}
                            loading={isRunning}
                            className="code-playground__run-button"
                        >
                            Esegui Codice
                            {shortcutHint && (
                                <span className="code-playground__shortcut-hint">
                                    {shortcutHint}
                                </span>
                            )}
                        </Button>
                        <Button
                            icon={<ReloadOutlined />}
                            onClick={handleReset}
                            className="code-playground__reset-button"
                        >
                            Reset
                        </Button>
                        <Button
                            icon={<CommentOutlined />}
                            onClick={() =>
                                openChatGPT({ code, language: "javascript", title })
                            }
                        >
                            Chiedi a ChatGPT
                        </Button>
                    </Space>
                </div>

                {/* Split View: Editor + Console */}
                <div className="code-playground__content">
                    <div className="code-playground__editor-panel">
                        <PlaygroundEditor
                            ref={editorRef}
                            code={code}
                            onChange={(value) => setCode(value || "")}
                            onRun={executeCode}
                            language="javascript"
                        />
                    </div>
                    <div className="code-playground__console-panel">
                        <PlaygroundConsole logs={logs} onClear={handleClearConsole} />
                    </div>
                </div>
            </div>
        </Modal>
    );
}
