
import { Trophy } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Sample leaderboard data
const leaderboardData = [
  {
    id: 1,
    rank: 1,
    username: "CosmoMiner",
    tokens: 156.32,
    avatar: "",
    initials: "CM",
  },
  {
    id: 2,
    rank: 2,
    username: "NebulaNomad",
    tokens: 142.87,
    avatar: "",
    initials: "NN",
  },
  {
    id: 3,
    rank: 3,
    username: "GalacticHarvester",
    tokens: 128.45,
    avatar: "",
    initials: "GH",
  },
  {
    id: 4,
    rank: 4,
    username: "VoidExcavator",
    tokens: 115.21,
    avatar: "",
    initials: "VE",
  },
  {
    id: 5,
    rank: 5,
    username: "StarDustCollector",
    tokens: 109.76,
    avatar: "",
    initials: "SD",
  },
  {
    id: 6,
    rank: 6,
    username: "AstroProspector",
    tokens: 98.33,
    avatar: "",
    initials: "AP",
  },
  {
    id: 7,
    rank: 7,
    username: "VoidDigger",
    tokens: 87.12,
    avatar: "",
    initials: "VD",
  },
];

export default function Leaderboard() {
  const getRankStyles = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-[#FFD700]/10 border-[#FFD700]/30 text-[#FFD700]";
      case 2:
        return "bg-[#C0C0C0]/10 border-[#C0C0C0]/30 text-[#C0C0C0]";
      case 3:
        return "bg-[#CD7F32]/10 border-[#CD7F32]/30 text-[#CD7F32]";
      default:
        return "bg-dark-bg border-white/5 text-gray-400";
    }
  };

  const getAvatarStyles = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-br from-amber-300 to-yellow-500 text-yellow-900";
      case 2:
        return "bg-gradient-to-br from-gray-300 to-gray-400 text-gray-800";
      case 3:
        return "bg-gradient-to-br from-amber-700 to-amber-600 text-amber-100";
      default:
        return "bg-dark-accent text-gray-300";
    }
  };

  return (
    <div className="bg-dark-card rounded-lg border border-white/10 p-5">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-cyber-purple" />
          <h3 className="font-semibold">Top Miners</h3>
        </div>
        <button className="text-xs text-cyber-blue hover:underline">
          View All
        </button>
      </div>

      <div className="space-y-3">
        {leaderboardData.map((user) => (
          <div
            key={user.id}
            className={`flex items-center justify-between p-3 rounded-lg border ${getRankStyles(
              user.rank
            )}`}
          >
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-7 h-7">
                {user.rank <= 3 ? (
                  <span className="text-lg font-bold">{user.rank}</span>
                ) : (
                  <span className="text-sm">{user.rank}</span>
                )}
              </div>
              <Avatar className={`h-8 w-8 ${getAvatarStyles(user.rank)}`}>
                <AvatarImage src={user.avatar} />
                <AvatarFallback>{user.initials}</AvatarFallback>
              </Avatar>
              <div className="text-sm font-medium">{user.username}</div>
            </div>
            <div className="font-mono text-sm font-medium">
              {user.tokens.toFixed(2)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
