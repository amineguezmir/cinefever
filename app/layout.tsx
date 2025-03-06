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
        <script
          type="text/javascript"
          data-cfasync="false"
          dangerouslySetInnerHTML={{
            __html: `
              /*<![CDATA[/* */
              (function(){var h=window,l="e441f630f18f23143211514fa18360c2",d=[["siteId",836*971+928+4367508],["minBid",0.0009],["popundersPerIP","0:1"],["delayBetween",0],["default",false],["defaultPerDay",0],["topmostLayer","auto"]],t=["d3d3LnhhZHNtYXJ0LmNvbS9UaC9IcldmL2FlbWJlZC5taW4uanM=","ZDExZW5xMnJ5bXkweWwuY2xvdWRmcm9udC5uZXQvbHhpdmVseWpzLm1pbi5qcw=="],e=-1,g,f,c=function(){clearTimeout(f);e++;if(t[e]&&!(1767223686000<(new Date).getTime()&&1<e)){g=h.document.createElement("script");g.type="text/javascript";g.async=!0;var i=h.document.getElementsByTagName("script")[0];g.src="https://"+atob(t[e]);g.crossOrigin="anonymous";g.onerror=c;g.onload=function(){clearTimeout(f);h[l.slice(0,16)+l.slice(0,16)]||c()};f=setTimeout(c,5E3);i.parentNode.insertBefore(g,i)}};if(!h[l]){try{Object.freeze(h[l]=d)}catch(e){}c()}})();
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
