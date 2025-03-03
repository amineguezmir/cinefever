"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Home,
  Compass,
  Film,
  Library,
  Info,
  Menu,
  X,
  Github,
  Twitter,
  Instagram,
  Mail,
  HelpCircle,
  Facebook,
  Tv,
  HeadphonesIcon,
  Tv2Icon,
} from "lucide-react";
import { SupportDialog } from "./support-dialog";
import { useSession } from "next-auth/react";

const routes = [
  {
    label: "Home",
    icon: Home,
    href: "/",
    color: "from-pink-500 to-rose-500",
  },
  {
    label: "Discover",
    icon: Compass,
    href: "/discover",
    color: "from-purple-500 to-indigo-500",
  },
  {
    label: "Movies",
    icon: Film,
    href: "/movies",
    color: "from-blue-500 to-cyan-500",
  },
  {
    label: "TV Shows",
    icon: Tv,
    href: "/tv",
    color: "from-purple-500 to-cyan-500",
  },
  {
    label: "Anime",
    icon: Tv2Icon,
    href: "/anime",
    color: "from-pink-500 to-pink-300",
  },
  {
    label: "Library",
    icon: Library,
    href: "/library",
    color: "from-emerald-500 to-green-500",
  },
  {
    label: "About",
    icon: Info,
    href: "/about",
    color: "from-amber-500 to-yellow-500",
  },
];

const socialLinks = [
  {
    label: "GitHub",
    icon: Github,
    href: "https://github.com/amineguezmir",
    color: "from-gray-600 to-gray-400",
  },
  {
    label: "Twitter",
    icon: Facebook,
    href: "https://www.facebook.com/profile.php?id=100010802672227",
    color: "from-blue-400 to-blue-600",
  },
  {
    label: "Instagram",
    icon: Instagram,
    href: "https://www.instagram.com/guezmiramine/",
    color: "from-pink-500 to-purple-500",
  },
  {
    label: "Gmail",
    icon: Mail,
    href: "guezmiramine1@gmail.com",
    color: "from-red-500 to-orange-500",
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [showSupport, setShowSupport] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div
        className={cn(
          "flex flex-col h-full bg-black/90 backdrop-blur-md border-r border-r-zinc-800/50",
          "transition-all duration-300 ease-in-out flex-shrink-0",
          isMobile && !isOpen ? "w-0" : "",
          isMobile && isOpen ? "w-[220px]" : "",
          !isMobile && isOpen ? "w-[240px]" : "",
          !isMobile && !isOpen ? "w-[80px]" : "",
          "z-10"
        )}
      >
        <div className="flex items-center justify-between p-4">
          <div
            className={cn(
              "overflow-hidden transition-opacity duration-200",
              !isOpen && "invisible opacity-0",
              isOpen && "visible opacity-100"
            )}
          >
            <Link href="/" className="flex items-center gap-x-2">
              <div className="relative w-8 h-8">
                <div
                  className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 animate-pulse"
                  style={{ animationDuration: "3s" }}
                ></div>
                <div className="absolute inset-0.5 rounded-full bg-black/90 flex items-center justify-center">
                  <Film className="h-4 w-4 text-blue-400" />
                </div>
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                CINE<span className="text-white">FEVER</span>
              </h1>
            </Link>
          </div>

          <button
            onClick={toggleSidebar}
            className="p-2 rounded-full hover:bg-zinc-800/80 transition-colors"
          >
            {isOpen ? (
              <X size={20} className="text-zinc-400" />
            ) : (
              <Menu size={20} className="text-zinc-400" />
            )}
          </button>
        </div>

        <ScrollArea className="flex-1 px-3 py-4">
          <div className="space-y-2">
            {routes.map((route) => {
              const isActive = pathname === route.href;

              return (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "group block relative rounded-xl transition-all duration-200 hover:shadow-lg",
                    isActive && "shadow-md"
                  )}
                >
                  <div
                    className={cn(
                      "relative flex items-center p-3 transition-all duration-200",
                      isActive
                        ? "bg-zinc-800/80 text-white"
                        : "text-zinc-400 hover:text-white hover:bg-zinc-800/50",
                      "rounded-xl group-hover:shadow-inner"
                    )}
                  >
                    {isActive && (
                      <div
                        className={cn(
                          "absolute left-0 top-0 bottom-0 w-1 rounded-full bg-gradient-to-b",
                          route.color
                        )}
                      />
                    )}

                    <div
                      className={cn(
                        "flex items-center justify-center w-10 h-10 rounded-full transition-transform duration-200",
                        isActive
                          ? `bg-gradient-to-br ${route.color}`
                          : "bg-zinc-800/80",
                        "group-hover:scale-110"
                      )}
                    >
                      <route.icon
                        className={cn(
                          "h-5 w-5 transition-transform duration-200",
                          isActive ? "text-white" : "text-zinc-400",
                          "group-hover:scale-110"
                        )}
                      />
                    </div>

                    <span
                      className={cn(
                        "ml-3 font-medium transition-all duration-200",
                        isActive ? "text-white" : "text-zinc-400",
                        !isOpen && "opacity-0 invisible w-0",
                        isOpen && "opacity-100 visible w-auto"
                      )}
                    >
                      {route.label}
                    </span>

                    {isActive && isOpen && (
                      <div className="absolute right-3 h-2 w-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600" />
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </ScrollArea>

        <div className="p-4 mt-auto border-t border-zinc-800/50">
          <div className="flex flex-col gap-2">
            <button
              onClick={() => setShowSupport(true)}
              className="group flex items-center gap-2 px-2 py-3 rounded-xl hover:bg-zinc-800/50 transition-all duration-200"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-zinc-800/80 group-hover:bg-gradient-to-br from-violet-500 to-fuchsia-500 transition-all duration-200">
                <HelpCircle className="h-5 w-5 text-zinc-400 group-hover:text-white group-hover:scale-110 transition-all duration-200" />
              </div>
              {isOpen && (
                <span className="text-sm font-medium text-zinc-400 group-hover:text-white transition-colors">
                  {session?.user
                    ? `Hi, ${session.user.name?.split(" ")[0]}!`
                    : "Need Help?"}
                </span>
              )}
            </button>

            {isOpen && (
              <div className="grid grid-cols-4 gap-2 pt-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-center"
                    aria-label={`Visit our ${social.label}`}
                  >
                    <div
                      className={cn(
                        "flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200",
                        "bg-zinc-800/80 hover:bg-gradient-to-br hover:scale-110",
                        social.color
                      )}
                    >
                      <social.icon className="h-5 w-5 text-zinc-400 group-hover:text-white transition-colors" />
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <SupportDialog
        open={showSupport}
        onOpenChange={setShowSupport}
        user={session?.user}
      />
    </>
  );
}
