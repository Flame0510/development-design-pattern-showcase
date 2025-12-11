/**
 * COMPONENT TYPE: Container
 * SECTION: UI Components - Navigation
 *
 * ROLE:
 * - Global navigation bar with dropdown menus for pattern categories
 * - Links to home, theory sections, and quiz game
 * - Responsive design for mobile and desktop
 *
 * PATTERNS USED:
 * - Ant Design Menu with SubMenu for dropdowns
 * - Next.js Link for client-side navigation
 * - BEM Convention for clean CSS naming
 *
 * NOTES FOR CONTRIBUTORS:
 * - Menu items dynamically generated from PATTERN_CATEGORIES
 * - Active route highlighting
 * - Sticky navbar on scroll
 * - All styles in Navbar.scss with BEM naming
 */

"use client";

import { Menu } from 'antd';
import { 
  HomeOutlined, 
  BookOutlined, 
  TrophyOutlined,
  BuildOutlined,
  ToolOutlined,
  ThunderboltOutlined
} from '@ant-design/icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PATTERN_CATEGORIES } from '@/lib/patternTheory';
import './Navbar.scss';

export default function Navbar() {
  const pathname = usePathname();

  const categoryIcons = {
    creational: <BuildOutlined />,
    structural: <ToolOutlined />,
    behavioral: <ThunderboltOutlined />
  };

  // Generate menu items from pattern categories
  const theoryMenuItems = Object.entries(PATTERN_CATEGORIES).map(([key, category]) => ({
    key: `theory-${key}`,
    label: (
      <Link href={`/theory/${key}`}>
        {category.icon} {category.name}
      </Link>
    ),
    icon: categoryIcons[key as keyof typeof categoryIcons],
    children: category.patterns.map(patternId => ({
      key: `pattern-${patternId}`,
      label: (
        <Link href={`/theory/${key}/${patternId}`}>
          {patternId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
        </Link>
      )
    }))
  }));

  const menuItems = [
    {
      key: 'home',
      icon: <HomeOutlined />,
      label: <Link href="/">Home</Link>
    },
    {
      key: 'theory',
      icon: <BookOutlined />,
      label: <Link href="/theory">Teoria</Link>,
      children: theoryMenuItems
    },
    {
      key: 'quiz',
      icon: <TrophyOutlined />,
      label: <Link href="/">Quiz Game</Link>
    }
  ];

  // Determine selected key based on pathname
  const getSelectedKey = () => {
    if (pathname === '/') return 'home';
    if (pathname.startsWith('/theory')) {
      const segments = pathname.split('/');
      if (segments.length === 4) {
        // /theory/category/pattern
        return `pattern-${segments[3]}`;
      }
      if (segments.length === 3) {
        // /theory/category
        return `theory-${segments[2]}`;
      }
      return 'theory';
    }
    return 'home';
  };

  return (
    <div className="navbar">
      <div className="navbar__container">
        <Menu
          mode="horizontal"
          selectedKeys={[getSelectedKey()]}
          items={menuItems}
          className="navbar__menu"
        />
      </div>
    </div>
  );
}
