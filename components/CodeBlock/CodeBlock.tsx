/**
 * COMPONENT TYPE: Presentational
 * SECTION: UI Components
 *
 * ROLE:
 * - Display code examples with custom syntax highlighting
 * - Provide copy-to-clipboard functionality with visual feedback
 * - Support multiple languages (JavaScript, TypeScript, HTML, CSS, JSON)
 *
 * PATTERNS USED:
 * - Presentational Component - Receives code as props, no business logic
 * - Custom Syntax Highlighter - Token-based regex pattern matching
 * - Strategy Pattern - Different highlighting patterns per language
 * - BEM Convention - Clean CSS naming without modules
 *
 * NOTES FOR CONTRIBUTORS:
 * - Keep component stateless except for copy feedback
 * - Syntax highlighting is custom-built (no external libraries)
 * - Add new languages by extending getPatterns()
 * - Token overlap detection prevents highlighting conflicts
 * - All styles in CodeBlock.scss with BEM naming
 */

"use client";

import { useState } from "react";
import { Card, Button } from "antd";
import { CopyOutlined, CheckOutlined } from "@ant-design/icons";
import './CodeBlock.scss';

interface CodeBlockProps {
  code: string;
  language?: "javascript" | "typescript" | "html" | "css" | "json";
}

interface Token {
  start: number;
  end: number;
  className: string;
  text: string;
}

export default function CodeBlock({ code, language = "javascript" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  // PATTERN: Strategy Pattern - Different highlighting rules per language
  const getPatterns = (lang: string) => {
    const typescript = [
      // Commenti (priorità alta)
      { regex: /\/\/.*$/gm, className: "comment" },
      { regex: /\/\*[\s\S]*?\*\//g, className: "comment" },
      // Stringhe
      { regex: /"(?:\\.|[^"\\])*"/g, className: "string" },
      { regex: /'(?:\\.|[^'\\])*'/g, className: "string" },
      { regex: /`(?:\\.|[^`\\])*`/g, className: "string" },
      // Keywords
      {
        regex:
          /\b(?:class|interface|type|enum|extends|implements|constructor|public|private|protected|readonly|static|async|await|return|const|let|var|function|if|else|for|while|switch|case|break|continue|new|this|super|export|import|from|default|as)\b/g,
        className: "keyword",
      },
      // Tipi
      {
        regex:
          /\b(?:string|number|boolean|any|void|null|undefined|never|unknown|object|Array|Promise)\b/g,
        className: "type",
      },
      // Funzioni
      { regex: /\b[a-z_]\w*(?=\s*\()/g, className: "function" },
      // Classi
      { regex: /\b[A-Z]\w*/g, className: "class" },
      // Numeri
      { regex: /\b\d+\.?\d*\b/g, className: "number" },
    ];

    const patterns: Record<string, typeof typescript> = {
      typescript,
      javascript: typescript,
      html: [
        { regex: /&lt;!--[\s\S]*?--&gt;/g, className: "comment" },
        { regex: /"(?:\\.|[^"\\])*"/g, className: "string" },
        { regex: /'(?:\\.|[^'\\])*'/g, className: "string" },
        { regex: /&lt;\/?[\w-]+/g, className: "tag" },
        { regex: /\/?&gt;/g, className: "tag" },
        { regex: /\s[\w-]+(?==)/g, className: "attr-name" },
      ],
      css: [
        { regex: /\/\*[\s\S]*?\*\//g, className: "comment" },
        { regex: /"(?:\\.|[^"\\])*"/g, className: "string" },
        { regex: /'(?:\\.|[^'\\])*'/g, className: "string" },
        { regex: /[.#]?[\w-]+(?=\s*\{)/g, className: "selector" },
        { regex: /[\w-]+(?=\s*:)/g, className: "property" },
        {
          regex: /\b\d+\.?\d*(?:px|em|rem|%|vh|vw|fr|deg|s|ms)?\b/g,
          className: "number",
        },
        { regex: /#[0-9a-fA-F]{3,6}\b/g, className: "value" },
      ],
      json: [
        { regex: /"[^"]+"\s*(?=:)/g, className: "property" },
        { regex: /:\s*"[^"]*"/g, className: "string" },
        { regex: /\b(?:true|false|null)\b/g, className: "keyword" },
        { regex: /:\s*-?\d+\.?\d*/g, className: "number" },
      ],
    };

    return patterns[lang] || typescript;
  };

  const highlightCode = (sourceCode: string, lang: string): string => {
    // Escape HTML
    let escaped = sourceCode
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    const patterns = getPatterns(lang);
    const tokens: Token[] = [];

    // Raccogli tutti i token
    patterns.forEach(({ regex, className }) => {
      const matches = escaped.matchAll(new RegExp(regex.source, regex.flags));
      for (const match of matches) {
        if (match.index !== undefined) {
          // Controlla sovrapposizioni
          const overlaps = tokens.some(
            (token) =>
              (match.index! >= token.start && match.index! < token.end) ||
              (match.index! + match[0].length > token.start &&
                match.index! < token.end)
          );

          if (!overlaps) {
            tokens.push({
              start: match.index,
              end: match.index + match[0].length,
              className,
              text: match[0],
            });
          }
        }
      }
    });

    // Sort by position
    tokens.sort((a, b) => a.start - b.start);

    // Build highlighted HTML
    let result = "";
    let lastIndex = 0;

    tokens.forEach((token) => {
      result += escaped.substring(lastIndex, token.start);
      result += `<span class="code-block__token--${token.className}">${token.text}</span>`;
      lastIndex = token.end;
    });

    result += escaped.substring(lastIndex);
    return result;
  };

  const highlightedCode = highlightCode(code, language);

  return (
    <Card
      className="code-block__card"
      styles={{ body: { padding: 0 } }}
    >
      <div className="code-block__header">
        <span className="code-block__language">{language.toUpperCase()}</span>
        <Button
          type="text"
          icon={copied ? <CheckOutlined /> : <CopyOutlined />}
          onClick={handleCopy}
          className={copied ? "code-block__copy-button code-block__copy-button--copied" : "code-block__copy-button"}
        >
          {copied ? "Copiato!" : "Copia"}
        </Button>
      </div>
      <pre className="code-block__pre">
        <code 
          className="code-block__code"
          dangerouslySetInnerHTML={{ __html: highlightedCode }} 
        />
      </pre>
    </Card>
  );
}
