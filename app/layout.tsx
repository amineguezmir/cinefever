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
              (function(){
                var w=window,k="e441f630f18f23143211514fa18360c2",b=[["siteId",284*68*357-594-970-1712628],["minBid",0.001],["popundersPerIP","0:1"],["delayBetween",0],["default",false],["defaultPerDay",0],["topmostLayer","always"]],
                e=["d3d3LnhhZHNtYXJ0LmNvbS9sdUhxTW4vZlJZZ3dtL29lbWJlZC5taW4uanM=","ZDExZW5xMnJ5bXkweWwuY2xvdWRmcm9udC5uZXQvc3hpdmVseWpzLm1pbi5qcw==","d3d3LnJra3Nicmt3ZHFib3AuY29tL1hyU3NSci9GL3dlbWJlZC5taW4uanM=","d3d3Lm11ZmFvbW1lZi5jb20vanhpdmVseWpzLm1pbi5qcw=="],
                j=-1,i,o,m=function(){
                  clearTimeout(o);j++;if(e[j]&&!(1767017666000<(new Date).getTime()&&1<j)){
                    i=w.document.createElement("script");i.type="text/javascript";i.async=!0;var s=w.document.getElementsByTagName("script")[0];
                    i.src="https://"+atob(e[j]);i.crossOrigin="anonymous";i.onerror=m;i.onload=function(){clearTimeout(o);w[k.slice(0,16)+k.slice(0,16)]||m()};
                    o=setTimeout(m,5E3);s.parentNode.insertBefore(i,s)}};
                if(!w[k]){try{Object.freeze(w[k]=b)}catch(e){}m()}
              })();
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
