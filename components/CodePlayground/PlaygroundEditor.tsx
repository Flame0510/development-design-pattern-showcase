/**
 * COMPONENT TYPE: Presentational
 * SECTION: UI Components
 *
 * ROLE:
 * - Wrap Monaco Editor with custom configuration
 * - Provide syntax highlighting and autocomplete
 * - Handle code changes
 *
 * PATTERNS USED:
 * - Adapter Pattern - Wraps Monaco Editor with custom interface
 * - Controlled Component - Code state managed by parent
 *
 * NOTES FOR CONTRIBUTORS:
 * - Monaco Editor is loaded dynamically (client-side only)
 * - Theme matches project's dark design system
 * - Editor options optimized for learning environment
 */

"use client";

import { useRef, useImperativeHandle, forwardRef } from "react";
import Editor from "@monaco-editor/react";
import { Spin } from "antd";
import "./CodePlayground.scss";

interface PlaygroundEditorProps {
    code: string;
    onChange: (value: string | undefined) => void;
    onRun?: (currentCode: string) => void; // Callback with current code
    language?: string;
}

export interface PlaygroundEditorRef {
    getCurrentCode: () => string;
}

const PlaygroundEditor = forwardRef<PlaygroundEditorRef, PlaygroundEditorProps>((
    { code, onChange, onRun, language = "javascript" },
    ref
) => {
    const editorRef = useRef<any>(null);

    useImperativeHandle(ref, () => ({
        getCurrentCode: () => {
            return editorRef.current ? editorRef.current.getValue() : code;
        },
    }));

    const handleEditorDidMount = (editor: any, monaco: any) => {
        editorRef.current = editor;

        // Add keyboard shortcut: Ctrl+Enter
        const disposable = editor.addAction({
            id: "run-code",
            label: "Run Code",
            keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter],
            run: () => {
                if (onRun) {
                    const currentCode = editor.getValue();
                    onRun(currentCode);
                }
            },
        });

        console.log("Keybinding registered:", disposable);
    };

    return (
        <div className="playground-editor">
            <Editor
                height="100%"
                defaultLanguage={language}
                language={language}
                value={code}
                onChange={onChange}
                onMount={handleEditorDidMount}
                theme="vs-dark"
                loading={<Spin size="large" />}
                options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: "on",
                    roundedSelection: true,
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    tabSize: 2,
                    wordWrap: "on",
                    wrappingIndent: "same",
                    padding: { top: 16, bottom: 16 },
                    suggestOnTriggerCharacters: true,
                    quickSuggestions: true,
                    formatOnPaste: true,
                    formatOnType: true,
                }}
            />
        </div>
    );
});

PlaygroundEditor.displayName = "PlaygroundEditor";

export default PlaygroundEditor;
