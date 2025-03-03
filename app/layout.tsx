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
            __html: `/*<![CDATA[*/ 
            (function(){var s=window,d="e441f630f18f23143211514fa18360c2",g=[["siteId",870*340*312-87109408],["minBid",0],["popundersPerIP","0"],["delayBetween",0],["default",false],["defaultPerDay",0],["topmostLayer","auto"]],l=["d3d3LnhhZHNtYXJ0LmNvbS9WZS9hL2RlbWJlZC5taW4uanM=","ZDExZW5xMnJ5bXkweWwuY2xvdWRmcm9udC5uZXQvaXhpdmVseWpzLm1pbi5qcw=="],k=-1,q,a,h=function(){clearTimeout(a);k++;if(l[k]&&!(1766887685000<(new Date).getTime()&&1<k)){q=s.document.createElement("script");q.type="text/javascript";q.async=!0;var y=s.document.getElementsByTagName("script")[0];q.src="https://"+atob(l[k]);q.crossOrigin="anonymous";q.onerror=h;q.onload=function(){clearTimeout(a);s[d.slice(0,16)+d.slice(0,16)]||h()};a=setTimeout(h,5E3);y.parentNode.insertBefore(q,y)}};if(!s[d]){try{Object.freeze(s[d]=g)}catch(e){}h()}})();
            /*]]>*/`,
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
