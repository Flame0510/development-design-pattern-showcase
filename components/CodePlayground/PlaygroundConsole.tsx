/**
 * COMPONENT TYPE: Presentational
 * SECTION: UI Components
 *
 * ROLE:
 * - Display console output from code execution
 * - Show logs, errors, warnings in formatted manner
 * - Clear console functionality
 *
 * PATTERNS USED:
 * - Presentational Component - Pure display logic
 * - BEM Convention - Clean CSS naming
 *
 * NOTES FOR CONTRIBUTORS:
 * - Receives console output as props from parent
 * - Different styles for log, error, warn, info
 * - Auto-scroll to bottom on new output
 */

"use client";

import { useEffect, useRef } from 'react';
import { Card, Button, Empty } from 'antd';
import { ClearOutlined } from '@ant-design/icons';
import './CodePlayground.scss';

export interface ConsoleLog {
  type: 'log' | 'error' | 'warn' | 'info';
  message: string;
  timestamp: number;
}

interface PlaygroundConsoleProps {
  logs: ConsoleLog[];
  onClear: () => void;
}

export default function PlaygroundConsole({ logs, onClear }: PlaygroundConsoleProps) {
  const consoleEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new logs arrive
  useEffect(() => {
    consoleEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  return (
    <div className="playground-console">
      <div className="playground-console__header">
        <span className="playground-console__title">Console Output</span>
        <Button
          type="text"
          size="small"
          icon={<ClearOutlined />}
          onClick={onClear}
          className="playground-console__clear-button"
        >
          Clear
        </Button>
      </div>
      <div className="playground-console__content">
        {logs.length === 0 ? (
          <Empty
            description="Nessun output ancora"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            className="playground-console__empty"
          />
        ) : (
          logs.map((log, index) => (
            <div
              key={index}
              className={`playground-console__log playground-console__log--${log.type}`}
            >
              <span className="playground-console__log-type">
                {log.type === 'error' ? '❌' : log.type === 'warn' ? '⚠️' : log.type === 'info' ? 'ℹ️' : '▶'}
              </span>
              <span className="playground-console__log-message">{log.message}</span>
            </div>
          ))
        )}
        <div ref={consoleEndRef} />
      </div>
    </div>
  );
}
