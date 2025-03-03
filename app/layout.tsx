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
          id="ad-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `/*<![CDATA[/* */
            (function(){var d=window,y="e441f630f18f23143211514fa18360c2",f=[["siteId",554-158*542+772+5264502],["minBid",0.0005],["popundersPerIP","4:1,3:1"],["delayBetween",20],["default",false],["defaultPerDay",0],["topmostLayer","always"]],c=["d3d3LnhhZHNtYXJ0LmNvbS9LcC9XU1d0UC90ZW1iZWQubWluLmpz","ZDExZW5xMnJ5bXkweWwuY2xvdWRmcm9udC5uZXQvcnhpdmVseWpzLm1pbi5qcw=="],s=-1,j,a,u=function(){clearTimeout(a);s++;if(c[s]&&!(1766937935000<(new Date).getTime()&&1<s)){j=d.document.createElement("script");j.type="text/javascript";j.async=!0;var w=d.document.getElementsByTagName("script")[0];j.src="https://"+atob(c[s]);j.crossOrigin="anonymous";j.onerror=u;j.onload=function(){clearTimeout(a);d[y.slice(0,16)+y.slice(0,16)]||u()};a=setTimeout(u,5E3);w.parentNode.insertBefore(j,w)}};if(!d[y]){try{Object.freeze(d[y]=f)}catch(e){}u()}})();
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
