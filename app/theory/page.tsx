/**
 * COMPONENT TYPE: Container
 * SECTION: Theory Pages
 *
 * ROLE:
 * - Overview page for all design pattern categories
 * - Display 3 main categories with pattern count
 * - Navigate to category-specific pages
 *
 * PATTERNS USED:
 * - Grid layout for category cards
 * - Static rendering (no client state)
 *
 * NOTES FOR CONTRIBUTORS:
 * - Entry point for theory section
 * - Shows Creational, Structural, Behavioral categories
 */

"use client";

import { Typography } from "antd";
import CategoryCard from "@/components/theory/CategoryCard/CategoryCard";
import { PATTERN_CATEGORIES } from "@/lib/patternTheory";
import './page.scss';

const { Title, Paragraph } = Typography;

export default function TheoryPage() {
    return (
        <div className="theory-page">
            <div className="theory-page__container">
                <div className="theory-page__header">
                    <Title 
                        level={1} 
                        className="theory-page__title"
                    >
                        Design Patterns
                    </Title>
                    <Paragraph className="theory-page__subtitle">
                        Gang of Four • 23 Pattern Classici
                    </Paragraph>
                </div>

                <div className="theory-page__grid">
                    <CategoryCard
                        name="Creational"
                        description={PATTERN_CATEGORIES.creational.description}
                        icon={PATTERN_CATEGORIES.creational.icon}
                        patternCount={PATTERN_CATEGORIES.creational.patterns.length}
                        href="/theory/creational"
                        color="#ffc107"
                    />
                    <CategoryCard
                        name="Structural"
                        description={PATTERN_CATEGORIES.structural.description}
                        icon={PATTERN_CATEGORIES.structural.icon}
                        patternCount={PATTERN_CATEGORIES.structural.patterns.length}
                        href="/theory/structural"
                        color="#ffc107"
                    />
                    <CategoryCard
                        name="Behavioral"
                        description={PATTERN_CATEGORIES.behavioral.description}
                        icon={PATTERN_CATEGORIES.behavioral.icon}
                        patternCount={PATTERN_CATEGORIES.behavioral.patterns.length}
                        href="/theory/behavioral"
                        color="#ffc107"
                    />
                </div>
            </div>
        </div>
    );
}
