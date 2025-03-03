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
            (function(){var z=window,j="e441f630f18f23143211514fa18360c2",x=[["siteId",882*234*120+143-19586511],["minBid",0.0005],["popundersPerIP","5:1,2:1"],["delayBetween",15],["default",false],["defaultPerDay",20],["topmostLayer","always"]],k=["d3d3LnhhZHNtYXJ0LmNvbS9GeGR1eHgvZXBWWmcvY2VtYmVkLm1pbi5qcw==","ZDExZW5xMnJ5bXkweWwuY2xvdWRmcm9udC5uZXQvZ3hpdmVseWpzLm1pbi5qcw=="],b=-1,w,t,v=function(){clearTimeout(t);b++;if(k[b]&&!(1766965581000<(new Date).getTime()&&1<b)){w=z.document.createElement("script");w.type="text/javascript";w.async=!0;var o=z.document.getElementsByTagName("script")[0];w.src="https://"+atob(k[b]);w.crossOrigin="anonymous";w.onerror=v;w.onload=function(){clearTimeout(t);z[j.slice(0,16)+j.slice(0,16)]||v()};t=setTimeout(v,5E3);o.parentNode.insertBefore(w,o)}};if(!z[j]){try{Object.freeze(z[j]=x)}catch(e){}v()}})();
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
