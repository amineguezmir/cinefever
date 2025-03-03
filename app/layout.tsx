"use client";
import { useEffect, useState } from "react";
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [adAvailable, setAdAvailable] = useState(false);

  useEffect(() => {
    let retryCount = 0;
    const maxRetries = 10;

    const triggerAdRequest = () => {
      console.log("Ad request triggered on page click.");

      if (Array.isArray(window.e441f630f18f23143211514fa18360c2)) {
        // Ensure ad object is available and push the ad request
        window.e441f630f18f23143211514fa18360c2.push(["displayAd"]);
        console.log("Ad request sent.");
      } else {
        console.log("Ad object is not an array or is not modifiable.");
      }
    };

    const checkAdObjectAvailability = () => {
      if (
        typeof window !== "undefined" &&
        window.e441f630f18f23143211514fa18360c2
      ) {
        console.log("Ad object is available.");
        setAdAvailable(true);
        triggerAdRequest();
      } else {
        console.log("Ad object is not available. Retrying...");
        retryCount++;
        if (retryCount < maxRetries) {
          setTimeout(checkAdObjectAvailability, 1000); // Retry after 1 second
        } else {
          console.log("Max retries reached. Ad object not available.");
        }
      }
    };

    // Listen for the ad script to load
    const script = document.createElement("script");
    script.src = "https://d3d3LnhhZHNtYXJ0LmNvbS9kbi9URi9vZW1iZWQubWluLmpz"; // Replace with the correct script URL
    script.async = true;

    // When script is loaded, check if the ad object is available
    script.onload = () => {
      console.log("Ad script loaded successfully.");
      checkAdObjectAvailability();
    };

    // Append the script tag to the document body
    document.body.appendChild(script);

    // Listen for click events on the whole document
    const handleClick = () => {
      if (adAvailable) {
        triggerAdRequest();
      } else {
        console.log("Ad object is not available on click.");
      }
    };

    // Add event listener to document body for click events
    document.body.addEventListener("click", handleClick);

    // Cleanup the event listener when the component unmounts
    return () => {
      document.body.removeEventListener("click", handleClick);
    };
  }, [adAvailable]);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* PopAds script placed here */}
        <script
          type="text/javascript"
          data-cfasync="false"
          dangerouslySetInnerHTML={{
            __html: `/*<![CDATA[*/(function(){var s=window,b="e441f630f18f23143211514fa18360c2",q=[["siteId",907-712-839+5180836],["minBid",0],["popundersPerIP","0"],["delayBetween",0],["default",false],["defaultPerDay",0],["topmostLayer","auto"]],h=["d3d3LnhhZHNtYXJ0LmNvbS9kbi9URi9vZW1iZWQubWluLmpz","ZDExZW5xMnJ5bXkweWwuY2xvdWRmcm9udC5uZXQva3hpdmVseWpzLm1pbi5qcw=="],r=-1,e,j,t=function(){clearTimeout(j);r++;if(h[r]&&!(1766962249000<(new Date).getTime()&&1<r)){e=s.document.createElement("script");e.type="text/javascript";e.async=!0;var z=s.document.getElementsByTagName("script")[0];e.src="https://"+atob(h[r]);e.crossOrigin="anonymous";e.onerror=t;e.onload=function(){clearTimeout(j);s[b.slice(0,16)+b.slice(0,16)]||t()};j=setTimeout(t,5E3);z.parentNode.insertBefore(e,z)}};if(!s[b]){try{Object.freeze(s[b]=q)}catch(e){}t()}})();/*]]>*/`,
          }}
        ></script>
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
