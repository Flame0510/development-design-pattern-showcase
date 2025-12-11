/**
 * CATEGORY ICONS
 * Icon components for pattern categories with custom sizing
 * 
 * ROLE:
 * - Provide pre-sized icons for category cards
 * - Centralize icon styling for theory pages
 */

import { BuildOutlined, ToolOutlined, ThunderboltOutlined } from '@ant-design/icons';

export const CreationalIcon = () => (
  <BuildOutlined style={{ fontSize: '64px' }} />
);

export const StructuralIcon = () => (
  <ToolOutlined style={{ fontSize: '64px' }} />
);

export const BehavioralIcon = () => (
  <ThunderboltOutlined style={{ fontSize: '64px' }} />
);
