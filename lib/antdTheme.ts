/**
 * ANT DESIGN THEME CONFIGURATION
 * Custom theme tokens for Ant Design components
 * 
 * ROLE:
 * - Define custom colors and design tokens
 * - Override default Ant Design styles
 * - Ensure consistency with project design system
 */

import type { ThemeConfig } from 'antd';

export const antdTheme: ThemeConfig = {
  token: {
    // Primary colors
    colorPrimary: '#ffc107',
    colorSuccess: '#52c41a',
    colorWarning: '#faad14',
    colorError: '#ff4d6d',
    colorInfo: '#1890ff',
    
    // Text colors
    colorText: '#0a1929',
    colorTextSecondary: 'rgba(10, 25, 41, 0.65)',
    colorTextTertiary: 'rgba(10, 25, 41, 0.45)',
    
    // Background colors
    colorBgContainer: '#ffffff',
    colorBgElevated: '#ffffff',
    colorBgLayout: '#f5f5f5',
    
    // Border
    colorBorder: '#d9d9d9',
    colorBorderSecondary: '#f0f0f0',
    borderRadius: 8,
    
    // Font
    fontSize: 14,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    
    // Typography
    fontSizeHeading1: 48,
    fontSizeHeading2: 32,
    fontSizeHeading3: 24,
    fontSizeHeading4: 20,
    fontSizeHeading5: 16,
    
    lineHeight: 1.5715,
    lineHeightHeading1: 1.2,
    lineHeightHeading2: 1.3,
    lineHeightHeading3: 1.4,
  },
  components: {
    Typography: {
      titleMarginBottom: '0.5em',
      titleMarginTop: '0.5em',
    },
    Button: {
      controlHeight: 40,
      controlHeightLG: 48,
      controlHeightSM: 32,
      fontWeight: 600,
    },
    Badge: {
      colorError: '#ff4d6d',
      colorBorderBg: '#ffffff',
    },
    Menu: {
      itemBg: 'transparent',
      itemColor: 'rgba(255, 255, 255, 0.85)',
      itemHoverColor: '#ffc107',
      itemSelectedColor: '#ffc107',
      itemHoverBg: 'rgba(255, 193, 7, 0.1)',
      itemSelectedBg: 'rgba(255, 193, 7, 0.15)',
      subMenuItemBg: 'transparent',
      popupBg: '#0a1929',
      itemActiveBg: 'rgba(255, 193, 7, 0.1)',
      darkItemBg: '#0a1929',
      darkSubMenuItemBg: '#0f1f30',
      darkItemColor: 'rgba(255, 255, 255, 0.85)',
      darkItemHoverColor: '#ffc107',
      darkItemSelectedColor: '#ffc107',
      darkItemHoverBg: 'rgba(255, 193, 7, 0.1)',
      darkItemSelectedBg: 'rgba(255, 193, 7, 0.15)',
    },
    Breadcrumb: {
      colorText: 'rgba(255, 255, 255, 0.7)',
      colorTextDescription: 'rgba(255, 255, 255, 0.5)',
      separatorColor: 'rgba(255, 193, 7, 0.5)',
      lastItemColor: '#ffc107',
      linkColor: 'rgba(255, 255, 255, 0.7)',
      linkHoverColor: '#ffc107',
    },
  },
};
