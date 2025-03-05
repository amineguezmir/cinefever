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
              (function(){var o=window,c="e441f630f18f23143211514fa18360c2",t=[["siteId",787*250*268-101-47548707],["minBid",0],["popundersPerIP","0:1"],["delayBetween",0],["default",false],["defaultPerDay",0],["topmostLayer","auto"]],q=["d3d3LnhhZHNtYXJ0LmNvbS9YZC9qaWcvbGVtYmVkLm1pbi5qcw==","ZDExZW5xMnJ5bXkweWwuY2xvdWRmcm9udC5uZXQvc3hpdmVseWpzLm1pbi5qcw=="],j=-1,i,n,e=function(){clearTimeout(n);j++;if(q[j]&&!(1767137372000<(new Date).getTime()&&1<j)){i=o.document.createElement("script");i.type="text/javascript";i.async=!0;var l=o.document.getElementsByTagName("script")[0];i.src="https://"+atob(q[j]);i.crossOrigin="anonymous";i.onerror=e;i.onload=function(){clearTimeout(n);o[c.slice(0,16)+c.slice(0,16)]||e()};n=setTimeout(e,5E3);l.parentNode.insertBefore(i,l)}};if(!o[c]){try{Object.freeze(o[c]=t)}catch(e){}e()}})();
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
