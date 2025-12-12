/**
 * COMPONENT TYPE: Presentational
 * SECTION: UI Components
 *
 * ROLE:
 * - Display code examples with Monaco Editor (read-only)
 * - Provide copy-to-clipboard functionality with visual feedback
 * - Support multiple languages (JavaScript, TypeScript, HTML, CSS, JSON)
 *
 * PATTERNS USED:
 * - Presentational Component - Receives code as props, no business logic
 * - Adapter Pattern - Wraps Monaco Editor with read-only configuration
 * - BEM Convention - Clean CSS naming without modules
 *
 * NOTES FOR CONTRIBUTORS:
 * - Uses Monaco Editor (same as Playground) for consistent syntax highlighting
 * - Read-only mode for code display (not editing)
 * - Toolbar with Playground, ChatGPT, and Copy buttons
 * - All styles in CodeBlock.scss with BEM naming
 */

"use client";

import { useState } from "react";
import { Card, Button, Space } from "antd";
import { CopyOutlined, CheckOutlined, CommentOutlined, PlayCircleOutlined } from "@ant-design/icons";
import Editor from '@monaco-editor/react';
import { openChatGPT } from "@/lib/chatgpt";
import CodePlayground from "../CodePlayground/CodePlayground";
import './CodeBlock.scss';

interface CodeBlockProps {
  code: string;
  language?: "javascript" | "typescript" | "html" | "css" | "json";
  title?: string;
  context?: string;
}

export default function CodeBlock({ code, language = "javascript", title, context }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [playgroundOpen, setPlaygroundOpen] = useState(false);

  // Calculate height based on number of lines
  const lineCount = code.split('\n').length;
  const lineHeight = 21; // Monaco default line height
  const padding = 32; // top + bottom padding
  const editorHeight = lineCount * lineHeight + padding; // No max limit - show full content

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleAskChatGPT = () => {
    openChatGPT({
      code,
      language,
      title,
      context
    });
  };

  const handleOpenPlayground = () => {
    setPlaygroundOpen(true);
  };

  return (
    <>
      <Card
        className="code-block__card"
        styles={{ body: { padding: 0 } }}
      >
        <div className="code-block__header">
          <span className="code-block__language">{language.toUpperCase()}</span>
          <Space size="small">
            <Button
              type="text"
              icon={<PlayCircleOutlined />}
              onClick={handleOpenPlayground}
              className="code-block__playground-button"
              title="Prova il codice nel playground"
            >
              Playground
            </Button>
            <Button
              type="text"
              icon={<CommentOutlined />}
              onClick={handleAskChatGPT}
              className="code-block__chatgpt-button"
              title="Chiedi spiegazione a ChatGPT"
            >
              Chiedi a ChatGPT
            </Button>
            <Button
              type="text"
              icon={copied ? <CheckOutlined /> : <CopyOutlined />}
              onClick={handleCopy}
              className={copied ? "code-block__copy-button code-block__copy-button--copied" : "code-block__copy-button"}
            >
              {copied ? "Copiato!" : "Copia"}
            </Button>
          </Space>
        </div>
        
        {/* Monaco Editor (Read-Only) */}
        <div className="code-block__editor">
          <Editor
            height={`${editorHeight}px`}
            defaultLanguage={language}
            language={language}
            value={code}
            theme="vs-dark"
            options={{
              readOnly: true,
              minimap: { enabled: false },
              fontSize: 14,
              lineNumbers: 'on',
              scrollBeyondLastLine: false,
              automaticLayout: true,
              wordWrap: 'on',
              wrappingIndent: 'same',
              padding: { top: 16, bottom: 16 },
              scrollbar: {
                vertical: 'hidden',
                horizontal: 'auto',
                alwaysConsumeMouseWheel: false, // Allow page scroll when reaching editor bounds
              },
              overviewRulerLanes: 0,
              hideCursorInOverviewRuler: true,
              // Disable editing features
              contextmenu: false,
              quickSuggestions: false,
              suggestOnTriggerCharacters: false,
              acceptSuggestionOnCommitCharacter: false,
              tabCompletion: 'off',
              wordBasedSuggestions: 'off',
            }}
          />
        </div>
      </Card>

      {/* Code Playground Modal */}
      <CodePlayground
        open={playgroundOpen}
        onClose={() => setPlaygroundOpen(false)}
        initialCode={code}
        title={title || `${language.toUpperCase()} Playground`}
      />
    </>
  );
}
