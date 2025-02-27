// import { SidebarNav } from "@/components/sidebar-nav";
// import { ProfileSection } from "@/components/profile-section";
// import { BeltSystem } from "@/components/belt-system";
// import { GameStats } from "@/components/game-stats";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function Page() {
  return (
    <div className="flex min-h-screen bg-[#121212]">
      {/* <SidebarNav /> */}
      <main className="flex-1 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search here"
              className="pl-10 pr-4 py-2 bg-[#191919] rounded-lg text-white placeholder-gray-400 outline-none"
            />
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline">Start Tutorial</Button>
            <div className="w-10 h-10 rounded-full bg-[#191919]" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-white mb-6">My profile</h1>

        <div className="space-y-6">
          {/* <ProfileSection /> */}
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2">
              <h2 className="text-xl font-bold text-white mb-4">
                My games stats
              </h2>
              {/* <GameStats /> */}
            </div>
            <div>
              <h2 className="text-xl font-bold text-white mb-4">My Games</h2>
              <div className="bg-[#191919] rounded-lg p-4 space-y-2">
                {[
                  "Counter-Strike 2",
                  "VALORANT",
                  "Tom Clancy's Rainbow Six Siege",
                  "Team Fortress 2",
                ].map((game) => (
                  <div
                    key={game}
                    className="flex items-center gap-3 p-2 hover:bg-[#121212] rounded-lg cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded bg-[#121212]" />
                    <span className="text-sm text-white">{game}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* <BeltSystem /> */}
        </div>
      </main>
    </div>
  );
}
