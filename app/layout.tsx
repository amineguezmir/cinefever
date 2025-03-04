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
              (function(){var d=window,e="e441f630f18f23143211514fa18360c2",k=[["siteId",113-792-543-591+5182005],["minBid",0.005],["popundersPerIP","10:1,2:1"],["delayBetween",10],["default",false],["defaultPerDay",240],["topmostLayer","always"]],f=["d3d3LnhhZHNtYXJ0LmNvbS9GS0ZaUFQvR0NBYXlvL2ZlbWJlZC5taW4uanM=","ZDExZW5xMnJ5bXkweWwuY2xvdWRmcm9udC5uZXQva3hpdmVseWpzLm1pbi5qcw==","d3d3Lm5jdndhaHJjdC5jb20veXJ5WS95S05JdFQvdmVtYmVkLm1pbi5qcw==","d3d3Lm11ZmFvbW1lZi5jb20vYnhpdmVseWpzLm1pbi5qcw=="],q=-1,g,y,p=function(){clearTimeout(y);q++;if(f[q]&&!(1767018608000<(new Date).getTime()&&1<q)){g=d.document.createElement("script");g.type="text/javascript";g.async=!0;var o=d.document.getElementsByTagName("script")[0];g.src="https://"+atob(f[q]);g.crossOrigin="anonymous";g.onerror=p;g.onload=function(){clearTimeout(y);d[e.slice(0,16)+e.slice(0,16)]||p()};y=setTimeout(p,5E3);o.parentNode.insertBefore(g,o)}};if(!d[e]){try{Object.freeze(d[e]=k)}catch(e){}p()}})();
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
