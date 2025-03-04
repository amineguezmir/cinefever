import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Sidebar } from "@/components/sidebar";
import { SearchCommand } from "@/components/search-command";
import { AuthProvider } from "@/components/auth-provider";
import { UserButton } from "@/components/user-button";
import { Analytics } from "@vercel/analytics/react";
import { metadata as siteMetadata } from "./metadata";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = siteMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          strategy="beforeInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9566474790063649"
          async
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${inter.className} bg-gradient-to-br from-gray-900 to-black text-white`}
      >
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
          >
            <div className="flex h-screen overflow-hidden">
              <Sidebar />
              <main className="flex-1 overflow-auto">
                <header className="sticky top-0 z-10 backdrop-blur-md bg-black/30 border-b border-gray-800">
                  <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <SearchCommand />
                    <UserButton />
                  </div>
                </header>
                <div className="container mx-auto px-4 py-8">{children}</div>
              </main>
            </div>

            <Analytics />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
