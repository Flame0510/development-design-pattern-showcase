/**
 * COMPONENT TYPE: Presentational
 * SECTION: UI Components - Theory
 *
 * ROLE:
 * - Display complete pattern theory in structured sections
 * - Present code examples with syntax highlighting
 * - Show usage guidelines and real-world examples
 *
 * PATTERNS USED:
 * - Presentational Component - Pure display logic
 * - Composition Pattern - Composes CodeBlock and Ant Design components
 * - Progressive Disclosure - Collapsible sections for better UX
 * - BEM Convention - Clean CSS naming without modules
 *
 * NOTES FOR CONTRIBUTORS:
 * - Uses Ant Design Collapse for collapsible sections
 * - Reuses existing CodeBlock component for syntax highlighting
 * - Keep sections organized: Intent, Problem, Solution, Examples, Guidelines
 * - All styles in PatternLayout.scss with BEM naming
 */

"use client";

import { Card, Collapse, Space, Divider, Tag } from 'antd';
import { 
  BulbOutlined, 
  QuestionCircleOutlined, 
  CheckCircleOutlined,
  CodeOutlined,
  RocketOutlined,
  WarningOutlined,
  LinkOutlined
} from '@ant-design/icons';
import Link from 'next/link';
import CodeBlock from '../../CodeBlock/CodeBlock';
import type { PatternTheory } from '@/lib/patternTheory';
import './PatternLayout.scss';

interface PatternLayoutProps {
  pattern: PatternTheory;
}

export default function PatternLayout({ pattern }: PatternLayoutProps) {
  return (
    <div className="pattern-layout">
      <div className="pattern-layout__container">
        {/* Header */}
        <Card className="pattern-layout__header">
          <Space orientation="vertical" size="small" className="w-full">
            <Tag className="pattern-layout__header-tag">
              {pattern.category.toUpperCase()}
            </Tag>
            <h1 className="pattern-layout__header-title">
              {pattern.name}
            </h1>
            <p className="pattern-layout__header-intent">
              {pattern.intent}
            </p>
          </Space>
        </Card>

        {/* Main Content */}
        <Collapse 
          defaultActiveKey={['problem', 'solution', 'structure']} 
          className="pattern-layout__collapse"
          items={[
            {
              key: 'problem',
              label: (
                <Space>
                  <QuestionCircleOutlined className="pattern-layout__collapse-icon pattern-layout__collapse-icon--problem" />
                  <span className="pattern-layout__collapse-label">Il Problema</span>
                </Space>
              ),
              children: (
                <p className="pattern-layout__collapse-content">
                  {pattern.problem}
                </p>
              )
            },
            {
              key: 'solution',
              label: (
                <Space>
                  <BulbOutlined className="pattern-layout__collapse-icon pattern-layout__collapse-icon--solution" />
                  <span className="pattern-layout__collapse-label">La Soluzione</span>
                </Space>
              ),
              children: (
                <p className="pattern-layout__collapse-content">
                  {pattern.solution}
                </p>
              )
            },
            {
              key: 'structure',
              label: (
                <Space>
                  <CodeOutlined className="pattern-layout__collapse-icon pattern-layout__collapse-icon--structure" />
                  <span className="pattern-layout__collapse-label">Struttura</span>
                </Space>
              ),
              children: (
                <div>
                  <p className="pattern-layout__collapse-content mb-4">
                    {pattern.structure}
                  </p>
                  <div className="pattern-layout__collapse-participants">
                    <h5 className="pattern-layout__collapse-participants-title">Partecipanti:</h5>
                    <div>
                      {pattern.participants.map((participant, idx) => (
                        <div key={idx} className="pattern-layout__collapse-participants-item">
                          {participant}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )
            }
          ]}
        />

      {/* Code Examples */}
      {pattern.codeExamples.length > 0 && (
        <Card 
          title={
            <div className="pattern-layout__card-title">
              <CodeOutlined className="pattern-layout__card-title-icon" />
              <span>Esempi di Codice</span>
            </div>
          } 
          className="pattern-layout__card"
        >
          <Space orientation="vertical" size="large" className="w-full">
            {pattern.codeExamples.map((example, index) => (
              <div key={index} className="pattern-layout__card-example">
                <h4 className="pattern-layout__card-example-title">{example.title}</h4>
                <p className="pattern-layout__card-example-description">
                  {example.description}
                </p>
                <CodeBlock code={example.code} language={example.language} />
                {index < pattern.codeExamples.length - 1 && (
                  <Divider className="pattern-layout__card-example-divider" />
                )}
              </div>
            ))}
          </Space>
        </Card>
      )}

      {/* Real World Examples */}
      {pattern.realWorldExamples.length > 0 && (
        <Card 
          title={
            <div className="pattern-layout__card-title">
              <RocketOutlined className="pattern-layout__card-title-icon" />
              <span>Esempi nel Mondo Reale</span>
            </div>
          } 
          className="pattern-layout__card"
        >
          <div>
            {pattern.realWorldExamples.map((example, idx) => (
              <div key={idx} className="pattern-layout__real-world-item">
                <CheckCircleOutlined className="pattern-layout__real-world-item-icon" />
                <span className="pattern-layout__real-world-item-text">{example}</span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Usage Guidelines */}
      <div className="pattern-layout__guidelines">
        {/* When to Use */}
        <Card 
          title={
            <div className="pattern-layout__card-title">
              <CheckCircleOutlined className="pattern-layout__card-title-icon" style={{ color: '#10b981' }} />
              <span>Quando Usarlo</span>
            </div>
          }
          className="pattern-layout__card"
        >
          <div>
            {pattern.whenToUse.map((item, idx) => (
              <div key={idx} className="pattern-layout__guideline-item">
                <span className="pattern-layout__guideline-item-text pattern-layout__guideline-item-text--positive">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* When NOT to Use */}
        <Card 
          title={
            <div className="pattern-layout__card-title">
              <WarningOutlined className="pattern-layout__card-title-icon" style={{ color: '#ff4d6d' }} />
              <span>Quando NON Usarlo</span>
            </div>
          }
          className="pattern-layout__card"
        >
          <div>
            {pattern.whenNotToUse.map((item, idx) => (
              <div key={idx} className="pattern-layout__guideline-item">
                <span className="pattern-layout__guideline-item-text pattern-layout__guideline-item-text--negative">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Related Patterns */}
      {pattern.relatedPatterns.length > 0 && (
        <Card 
          title={
            <div className="pattern-layout__card-title">
              <LinkOutlined className="pattern-layout__card-title-icon" />
              <span>Pattern Correlati</span>
            </div>
          }
          className="pattern-layout__card"
        >
          <div className="pattern-layout__related-tags">
            {pattern.relatedPatterns.map((related) => {
              // Convert pattern name to URL slug (e.g., "Factory Method" -> "factory-method")
              const slug = related.toLowerCase().replace(/\s+/g, '-');
              // Determine category based on pattern name (you can expand this logic)
              const category = pattern.category; // Use same category for now
              
              return (
                <Link key={related} href={`/theory/${category}/${slug}`}>
                  <span className="pattern-layout__related-tag">
                    {related}
                  </span>
                </Link>
              );
            })}
          </div>
        </Card>
      )}
    </div>
    </div>
  );
}
