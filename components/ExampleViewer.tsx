"use client";

import type { PatternExample } from "@/lib/types";
import CodeBlock from "./CodeBlock";
import styles from "./ExampleViewer.module.css";

interface ExampleViewerProps {
  example: PatternExample;
  solutionRevealed: boolean;
  onRevealSolution: () => void;
}

export default function ExampleViewer({
  example,
  solutionRevealed,
  onRevealSolution,
}: ExampleViewerProps) {
  return (
    <div className={styles.container}>
      <div className={styles.exampleCard}>
        <h3 className={styles.title}>{example.title}</h3>

        <div className={styles.codeSection}>
          <CodeBlock code={example.code} language="javascript" />
        </div>

        {!solutionRevealed ? (
          <button
            onClick={onRevealSolution}
            className={styles.revealButton}
          >
            Rivela soluzione
          </button>
        ) : (
          <div className={styles.solutionSection}>
            <div className={styles.patternName}>
              <strong>Pattern:</strong>{" "}
              {example.solutionPatterns.map((pattern, index) => (
                <span key={index}>
                  {pattern}
                  {index < example.solutionPatterns.length - 1 && " + "}
                </span>
              ))}
            </div>
            <div className={styles.explanation}>
              <strong>Spiegazione:</strong>
              <p>{example.solutionExplanation}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
