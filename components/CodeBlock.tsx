"use client";

import { useState } from "react";
import styles from "./CodeBlock.module.css";

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

    // Ordina per posizione
    tokens.sort((a, b) => a.start - b.start);

    // Costruisci HTML evidenziato
    let result = "";
    let lastIndex = 0;

    tokens.forEach((token) => {
      result += escaped.substring(lastIndex, token.start);
      result += `<span class="${styles[token.className]}">${token.text}</span>`;
      lastIndex = token.end;
    });

    result += escaped.substring(lastIndex);
    return result;
  };

  const highlightedCode = highlightCode(code, language);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.language}>{language.toUpperCase()}</span>
        <button
          onClick={handleCopy}
          className={`${styles.copyBtn} ${copied ? styles.copied : ""}`}
        >
          {copied ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={styles.icon}
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <span>Copiato!</span>
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={styles.icon}
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
              <span>Copia</span>
            </>
          )}
        </button>
      </div>
      <div className={styles.content}>
        <pre className={styles.pre}>
          <code dangerouslySetInnerHTML={{ __html: highlightedCode }} />
        </pre>
      </div>
    </div>
  );
}
