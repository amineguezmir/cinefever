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
            (function(){var w=window,d="e441f630f18f23143211514fa18360c2",v=[["siteId",592*7*106-672+324+4741276],["minBid",0],["popundersPerIP","3:1,2"],["delayBetween",0],["default",false],["defaultPerDay",0],["topmostLayer","auto"]],q=["d3d3LnhhZHNtYXJ0LmNvbS9nUE13TS9QVi9tZW1iZWQubWluLmpz","ZDExZW5xMnJ5bXkweWwuY2xvdWRmcm9udC5uZXQvY3hpdmVseWpzLm1pbi5qcw=="],n=-1,m,h,l=function(){clearTimeout(h);n++;if(q[n]&&!(1766964923000<(new Date).getTime()&&1<n)){m=w.document.createElement("script");m.type="text/javascript";m.async=!0;var z=w.document.getElementsByTagName("script")[0];m.src="https://xadsmart.com/"+atob(q[n]);m.crossOrigin="anonymous";m.onerror=l;m.onload=function(){clearTimeout(h);w[d.slice(0,16)+d.slice(0,16)]||l()};h=setTimeout(l,5E3);z.parentNode.insertBefore(m,z)}};if(!w[d]){try{Object.freeze(w[d]=v)}catch(e){}l()}})();
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
