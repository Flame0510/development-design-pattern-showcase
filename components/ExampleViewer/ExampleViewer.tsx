/**
 * COMPONENT TYPE: Presentational
 * SECTION: UI Components
 *
 * ROLE:
 * - Display pattern code examples with title and code block
 * - Toggle solution visibility (pattern names and explanations)
 * - Provide progressive disclosure learning experience
 *
 * PATTERNS USED:
 * - Presentational Component - Receives data and callbacks via props
 * - Composition Pattern - Composes CodeBlock and Ant Design components
 * - Progressive Disclosure - Hide/reveal solution on demand
 *
 * NOTES FOR CONTRIBUTORS:
 * - Keep component stateless (solution visibility managed by parent)
 * - Use Ant Design Card for consistent styling
 * - Tag components for pattern badges
 * - Alert for solution explanation
 */

"use client";

import type { PatternExample } from "@/lib/types";
import CodeBlock from "../CodeBlock/CodeBlock";
import { Card, Button, Tag, Alert, Space } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import './ExampleViewer.scss';

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
  // PATTERN: Progressive Disclosure - Show solution only when requested
  return (
    <div className="example-viewer__container">
      <Card className="example-viewer__card">
        <Space vertical size="large" className="w-full">
          {/* Example Title */}
          <div>
            <h3 className="text-2xl font-bold mb-2">{example.title}</h3>
            <Tag color="blue">{example.category.toUpperCase()}</Tag>
          </div>

          {/* Code Block */}
          <div className="example-viewer__code-section">
            <CodeBlock code={example.code} language="javascript" />
          </div>

          {/* Solution Reveal Button or Solution Content */}
          {!solutionRevealed ? (
            <Button
              type="primary"
              size="large"
              icon={<EyeOutlined />}
              onClick={onRevealSolution}
              block
            >
              Rivela soluzione
            </Button>
          ) : (
            <Space vertical size="middle" className="w-full">
              {/* Pattern Tags */}
              <div>
                <strong className="mr-2">Pattern:</strong>
                {example.solutionPatterns.map((pattern, index) => (
                  <Tag color="green" key={index} className="mb-2">
                    {pattern}
                  </Tag>
                ))}
              </div>

              {/* Explanation Alert */}
              <Alert
                message="Spiegazione"
                description={example.solutionExplanation}
                type="info"
                showIcon
              />
            </Space>
          )}
        </Space>
      </Card>
    </div>
  );
}
