
import { useState, useEffect } from "react";
import { Trophy, Medal } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LeaderboardService } from "@/services/LeaderboardService";
import { LeaderboardEntry } from "@/integrations/supabase/generated-types";

export default function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        setLoading(true);
        const data = await LeaderboardService.getLeaderboard();
        setLeaderboardData(data);
      } catch (error) {
        console.error("Error loading leaderboard:", error);
      } finally {
        setLoading(false);
      }
    };

    loadLeaderboard();
  }, []);

  const getInitials = (username: string): string => {
    return username.slice(0, 2).toUpperCase();
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-4 w-4 text-yellow-500" />;
      case 2:
        return <Trophy className="h-4 w-4 text-gray-400" />;
      case 3:
        return <Trophy className="h-4 w-4 text-amber-700" />;
      default:
        return <span className="text-xs">{rank}</span>;
    }
  };

  return (
    <Card className="bg-dark-card border-white/10">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center">
          <Medal className="mr-2 h-5 w-5 text-cyber-green" />
          Leaderboard
        </CardTitle>
        <CardDescription>Top miners by earnings</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center p-6">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-cyber-blue"></div>
          </div>
        ) : (
          <div className="space-y-2">
            {leaderboardData.map((entry) => (
              <div 
                key={entry.user_id} 
                className={`flex items-center p-2 rounded-md ${
                  entry.rank <= 3 ? "bg-dark-bg/80" : ""
                }`}
              >
                <div className="w-6 h-6 flex items-center justify-center mr-3">
                  {getRankIcon(entry.rank)}
                </div>
                <Avatar className="h-7 w-7 mr-3">
                  <AvatarImage src={entry.avatar_url || ""} />
                  <AvatarFallback className="text-xs bg-dark-accent">
                    {getInitials(entry.username)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 truncate">
                  {entry.username}
                </div>
                <div className="font-medium">
                  {entry.total_earnings.toFixed(2)}
                </div>
              </div>
            ))}

            {leaderboardData.length === 0 && (
              <div className="text-center py-6 text-gray-400">
                No miners on the leaderboard yet
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
