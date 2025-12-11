/**
 * COMPONENT TYPE: Presentational
 * SECTION: UI Components - Navigation
 *
 * ROLE:
 * - Display breadcrumb navigation based on current route
 * - Show hierarchy: Home > Theory > Category > Pattern
 *
 * PATTERNS USED:
 * - Ant Design Breadcrumb component
 * - Dynamic breadcrumb generation from pathname
 *
 * NOTES FOR CONTRIBUTORS:
 * - Automatically generates breadcrumb from URL segments
 * - Handles pattern name formatting (kebab-case to Title Case)
 */

"use client";

import { Breadcrumb as AntBreadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PATTERN_CATEGORIES } from '@/lib/patternTheory';
import './Breadcrumb.scss';

export default function Breadcrumb() {
  const pathname = usePathname();

  const generateBreadcrumbs = () => {
    const segments = pathname.split('/').filter(Boolean);
    const breadcrumbs = [
      {
        title: (
          <Link href="/">
            <HomeOutlined /> Home
          </Link>
        )
      }
    ];

    if (segments.length === 0) return breadcrumbs;

    // /theory
    if (segments[0] === 'theory') {
      breadcrumbs.push({
        title: segments.length === 1 ? (
          <span>Teoria Design Patterns</span>
        ) : (
          <Link href="/theory">Teoria Design Patterns</Link>
        )
      });

      // /theory/category
      if (segments[1]) {
        const category = segments[1] as keyof typeof PATTERN_CATEGORIES;
        const categoryInfo = PATTERN_CATEGORIES[category];
        
        breadcrumbs.push({
          title: segments.length === 2 ? (
            <span>{categoryInfo.icon} {categoryInfo.name}</span>
          ) : (
            <Link href={`/theory/${category}`}>
              {categoryInfo.icon} {categoryInfo.name}
            </Link>
          )
        });

        // /theory/category/pattern
        if (segments[2]) {
          const patternName = segments[2]
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
          
          breadcrumbs.push({
            title: <span>{patternName}</span>
          });
        }
      }
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <div className="breadcrumb">
      <div className="breadcrumb__container">
        <AntBreadcrumb items={breadcrumbs} />
      </div>
    </div>
  );
}
