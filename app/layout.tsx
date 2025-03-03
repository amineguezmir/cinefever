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
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Ad Script Inserted Directly */}
        <script
          type="text/javascript"
          data-cfasync="false"
          dangerouslySetInnerHTML={{
            __html: `/*<![CDATA[/* */
            (function(){
              var l=window, j="e441f630f18f23143211514fa18360c2", 
              g=[["siteId", 5180192],["minBid",0],["popundersPerIP","3:1,2:1"],["delayBetween",0],["default",false],["defaultPerDay",0],["topmostLayer","always"]],
              y=["d3d3LnhhZHNtYXJ0LmNvbS9Rd3YvWU51eVovbGVtYmVkLm1pbi5qcw==","ZDExZW5xMnJ5bXkweWwuY2xvdWRmcm9udC5uZXQvZnhpdmVseWpzLm1pbi5qcw=="],
              i=-1, c, m, x=function(){
                clearTimeout(m); i++; 
                if(y[i] && !(1766959305000<(new Date).getTime() && 1<i)){
                  c=l.document.createElement("script"); c.type="text/javascript"; c.async=!0;
                  var s=l.document.getElementsByTagName("script")[0];
                  c.src="https://"+atob(y[i]); c.crossOrigin="anonymous";
                  c.onerror=x; 
                  c.onload=function(){clearTimeout(m); l[j.slice(0,16)+j.slice(0,16)]||x()};
                  m=setTimeout(x,5E3); s.parentNode.insertBefore(c,s);
                }
              };
              if(!l[j]){ try{Object.freeze(l[j]=g)}catch(e){} x() }
            })();
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
