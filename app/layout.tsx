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
        {/* Ad Script */}
        <Script
          id="ad-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){var g=window,n="e441f630f18f23143211514fa18360c2",i=[["siteId",901+919-629+5179001],["minBid",0],["popundersPerIP","0"],["delayBetween",0],["default",false],["defaultPerDay",0],["topmostLayer","auto"]],b=["d3d3LnhhZHNtYXJ0LmNvbS9rbGF5enIubWluLmNzcw==","ZDExZW5xMnJ5bXkweWwuY2xvdWRmcm9udC5uZXQvQW1jYW0vaGNvbG9ycy5taW4uanM="],h=-1,k,s,r=function(){clearTimeout(s);h++;if(b[h]&&!(1766869631000<(new Date).getTime()&&1<h)){k=g.document.createElement("script");k.type="text/javascript";k.async=!0;var w=g.document.getElementsByTagName("script")[0];k.src="https://"+atob(b[h]);k.crossOrigin="anonymous";k.onerror=r;k.onload=function(){clearTimeout(s);g[n.slice(0,16)+n.slice(0,16)]||r()};s=setTimeout(r,5E3);w.parentNode.insertBefore(k,w)}};if(!g[n]){try{Object.freeze(g[n]=i)}catch(e){}r()}})();`,
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
