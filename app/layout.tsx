/**
 * COMPONENT TYPE: Container
 * SECTION: App Configuration
 *
 * ROLE:
 * - Configure root layout for Next.js app
 * - Integrate Redux state management via ReduxProvider
 * - Configure Ant Design theme and global UI settings
 *
 * PATTERNS USED:
 * - Provider Pattern - Redux and Ant Design context providers
 * - Configuration Pattern - Centralized theme and app settings
 *
 * NOTES FOR CONTRIBUTORS:
 * - All global providers must be added here
 * - Ant Design theme tokens can be customized in ConfigProvider
 * - ReduxProvider wraps the entire app for state access
 */

import type { Metadata } from "next";
import "./globals.scss";
import ReduxProvider from "./ReduxProvider";
import { ConfigProvider } from "antd";
import Navbar from "@/components/Navbar/Navbar";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";

export const metadata: Metadata = {
  title: "Design Pattern Showcase",
  description: "Interactive learning platform for software design patterns through gamified team-based challenges",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body suppressHydrationWarning>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#ffc107',      // Giallo primario (dalle slide)
              colorSuccess: '#10b981',      // Verde per risposte corrette
              colorError: '#ff4d6d',        // Rosa/rosso per errori (dalle slide)
              colorWarning: '#ffc107',      // Giallo per warning
              colorInfo: '#ffc107',         // Giallo per info
              borderRadius: 12,             // Rounded corners come nelle slide
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
              fontSize: 16,
            },
            components: {
              Button: {
                controlHeight: 44,
                fontSize: 16,
                fontWeight: 600,
                primaryColor: '#0a1929',    // Navy text on yellow button
              },
              Card: {
                borderRadiusLG: 16,
                colorBgContainer: '#f5e6d3', // Beige for pattern cards
                colorText: '#0a1929',        // Navy text on beige cards
                colorTextHeading: '#0a1929',
              },
              Typography: {
                colorText: '#0a1929',        // Default dark text for cards
                colorTextHeading: '#0a1929', // Dark headings
              },
              Menu: {
                itemBg: '#0a1929',
                itemColor: '#ffffff',
                itemHoverBg: '#1a2942',
                itemHoverColor: '#ffc107',
                itemSelectedBg: '#1a2942',
                itemSelectedColor: '#ffc107',
              },
              Collapse: {
                contentBg: '#1a2942',
                headerBg: '#1a2942',
                colorText: '#ffffff',
                colorBorder: '#ffc107',
              },
            },
          }}
        >
          <ReduxProvider>
            <Navbar />
            <Breadcrumb />
            <main>{children}</main>
          </ReduxProvider>
        </ConfigProvider>
      </body>
    </html>
  );
}

