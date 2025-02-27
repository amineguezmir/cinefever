"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Loader2, LogOut, User, UserCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export function UserButton() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return (
      <Button variant="ghost" size="icon" className="w-9 h-9 rounded-full">
        <Loader2 className="h-4 w-4 animate-spin text-primary" />
      </Button>
    );
  }

  if (!session) {
    return (
      <Button
        onClick={() => signIn()}
        variant="outline"
        className="rounded-full px-4 transition-all hover:bg-primary hover:text-primary-foreground"
      >
        <UserCircle className="mr-2 h-4 w-4" />
        Sign In
      </Button>
    );
  }

  const handleProfileClick = () => {
    router.push("/profile");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-10 rounded-full pl-0 pr-4 flex items-center gap-2 ring-offset-background transition-all hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <span className="relative">
            <Avatar className="h-10 w-10 border-2 border-muted-foreground/10">
              <AvatarImage
                src={session.user?.image || ""}
                alt={session.user?.name || ""}
              />
              <AvatarFallback className="bg-primary/10 text-primary font-medium">
                {session.user?.name?.[0]}
              </AvatarFallback>
            </Avatar>
            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 ring-1 ring-background" />
          </span>
          <span className="font-medium text-sm">
            {session.user?.name?.split(" ")[0]}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-64 p-2 mt-1"
        align="end"
        forceMount
        sideOffset={8}
      >
        <DropdownMenuLabel className="font-normal p-3">
          <div className="flex flex-col space-y-2">
            <p className="text-sm font-semibold leading-none">
              {session.user?.name}
            </p>
            <p className="text-xs leading-none text-muted-foreground truncate">
              {session.user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleProfileClick}
          className="cursor-pointer flex items-center p-3 text-sm transition-colors hover:bg-primary hover:text-primary-foreground rounded-md"
        >
          <User className="mr-2 h-4 w-4" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => signOut()}
          className="cursor-pointer flex items-center p-3 text-sm transition-colors hover:bg-destructive hover:text-destructive-foreground rounded-md"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
