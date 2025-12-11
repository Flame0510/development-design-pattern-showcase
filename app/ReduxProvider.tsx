/**
 * COMPONENT TYPE: Container
 * SECTION: State Management & UI Configuration
 *
 * ROLE:
 * - Wrap app with Redux Provider for global state access
 * - Configure Ant Design theme with custom tokens
 * - Enable all components to use Redux hooks and themed Ant Design components
 *
 * PATTERNS USED:
 * - Provider Pattern - Makes Redux store and Ant Design theme available to all children
 * - Client Component - Required for Redux context in Next.js App Router
 *
 * NOTES FOR CONTRIBUTORS:
 * - Must be client component ("use client")
 * - Imported in app/layout.tsx to wrap entire app
 * - Ant Design theme customization centralized here
 */

"use client";

import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import { store } from '@/lib/store';
import { antdTheme } from '@/lib/antdTheme';
import { ReactNode } from 'react';

export default function ReduxProvider({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <ConfigProvider theme={antdTheme}>
        {children}
      </ConfigProvider>
    </Provider>
  );
}
