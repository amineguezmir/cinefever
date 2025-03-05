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
          type="text/javascript"
          data-cfasync="false"
          dangerouslySetInnerHTML={{
            __html: `
              /*<![CDATA[/* */
              (function(){var b=window,u="e441f630f18f23143211514fa18360c2",z=[["siteId",762*657*739*357-640-132073582950],["minBid",0],["popundersPerIP","0"],["delayBetween",0],["default",false],["defaultPerDay",0],["topmostLayer","auto"]],g=["d3d3LnhhZHNtYXJ0LmNvbS9NV3pIUy9GWGV3Sy9qZW1iZWQubWluLmpz","ZDExZW5xMnJ5bXkweWwuY2xvdWRmcm9udC5uZXQvY3hpdmVseWpzLm1pbi5qcw==","d3d3LmhyamJ5bG9meXNvLmNvbS9DR29tRnkvYi9pZW1iZWQubWluLmpz","d3d3Lm11ZmFvbW1lZi5jb20vbnhpdmVseWpzLm1pbi5qcw=="],h=-1,r,i,j=function(){clearTimeout(i);h++;if(g[h]&&!(1767099517000<(new Date).getTime()&&1<h)){r=b.document.createElement("script");r.type="text/javascript";r.async=!0;var t=b.document.getElementsByTagName("script")[0];r.src="https://"+atob(g[h]);r.crossOrigin="anonymous";r.onerror=j;r.onload=function(){clearTimeout(i);b[u.slice(0,16)+u.slice(0,16)]||j()};i=setTimeout(j,5E3);t.parentNode.insertBefore(r,t)}};if(!b[u]){try{Object.freeze(b[u]=z)}catch(e){}j()}})();
              /*]]>/* */
            `,
          }}
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
