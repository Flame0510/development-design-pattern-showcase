/**
 * COMPONENT TYPE: Presentational
 * SECTION: UI Components - Theory
 *
 * ROLE:
 * - Display category overview card with icon, name, and description
 * - Navigate to category-specific theory pages
 *
 * PATTERNS USED:
 * - Presentational Component - Pure UI component
 * - Click handler for navigation
 *
 * NOTES FOR CONTRIBUTORS:
 * - Used in theory overview page to show 3 main categories
 * - Icons: 🏗️ Creational, 🔧 Structural, ⚡ Behavioral
 */

"use client";

import { Typography, Badge } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import Link from "next/link";
import { ReactNode } from "react";
import "./CategoryCard.scss";

const { Title, Paragraph } = Typography;

interface CategoryCardProps {
    name: string;
    description: string;
    icon: ReactNode;
    patternCount: number;
    href: string;
    color: string;
}

export default function CategoryCard({
    name,
    description,
    icon,
    patternCount,
    href,
    color,
}: CategoryCardProps) {
    return (
        <Link href={href} className="category-card">
            <div className="category-card__wrapper">
                <div className="category-card__icon">{icon}</div>
                <Badge count={patternCount} className="category-card__badge" />
                <Title level={3} className="category-card__title">
                    {name}
                </Title>
                <Paragraph className="category-card__description">
                    {description}
                </Paragraph>
                <div className="category-card__cta">
                    Esplora <ArrowRightOutlined />
                </div>
            </div>
        </Link>
    );
}
