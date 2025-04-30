
import { useState, useEffect } from "react";
import { TrendingUp, Clock, BarChart2, Calendar, Wallet } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUserData } from "@/hooks/useUserData";
import { MiningService } from "@/services/MiningService";
import { MiningSession } from "@/integrations/supabase/generated-types";

// Stats card component
const StatCard = ({ icon, label, value, subvalue }: { 
  icon: React.ReactNode; 
  label: string; 
  value: string; 
  subvalue?: string;
}) => (
  <div className="bg-dark-bg rounded-lg p-4 border border-white/5 flex flex-col">
    <div className="flex items-center mb-1">
      <div className="mr-2 text-gray-400">{icon}</div>
      <span className="text-sm text-gray-400">{label}</span>
    </div>
    <div className="mt-1">
      <div className="text-xl font-semibold">{value}</div>
      {subvalue && <div className="text-xs text-gray-400">{subvalue}</div>}
    </div>
  </div>
);

export default function MiningStats() {
  const { userStats, loading } = useUserData();
  const [recentSessions, setRecentSessions] = useState<MiningSession[]>([]);
  const [sessionsLoading, setSessionsLoading] = useState(false);

  useEffect(() => {
    const loadRecentSessions = async () => {
      setSessionsLoading(true);
      try {
        const sessions = await MiningService.getMiningHistory(5);
        setRecentSessions(sessions);
      } catch (error) {
        console.error("Error loading mining sessions:", error);
      } finally {
        setSessionsLoading(false);
      }
    };

    loadRecentSessions();
  }, []);

  const formatDuration = (startTime: string, endTime: string | null): string => {
    if (!endTime) return "Active";
    
    const start = new Date(startTime).getTime();
    const end = new Date(endTime).getTime();
    const diffSeconds = Math.floor((end - start) / 1000);
    
    const hours = Math.floor(diffSeconds / 3600);
    const minutes = Math.floor((diffSeconds % 3600) / 60);
    const seconds = diffSeconds % 60;
    
    return [
      hours > 0 ? `${hours}h` : null,
      minutes > 0 ? `${minutes}m` : null,
      `${seconds}s`
    ].filter(Boolean).join(' ');
  };

  if (loading) {
    return (
      <Card className="bg-dark-card border-white/10">
        <CardHeader>
          <CardTitle>Mining Stats</CardTitle>
          <CardDescription>Your mining performance and history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center p-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyber-blue"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-dark-card border-white/10">
      <CardHeader>
        <CardTitle>Mining Stats</CardTitle>
        <CardDescription>Your mining performance and history</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <StatCard 
            icon={<TrendingUp size={18} />}
            label="Total Mined"
            value={userStats?.total_mined.toFixed(2) || "0.00"}
          />
          <StatCard 
            icon={<BarChart2 size={18} />}
            label="Mining Rate"
            value={`${userStats?.mining_rate.toFixed(3) || "0.010"}/hr`}
          />
          <StatCard 
            icon={<Wallet size={18} />}
            label="Total Earnings"
            value={userStats?.total_earnings.toFixed(2) || "0.00"}
          />
          <StatCard 
            icon={<Calendar size={18} />}
            label="Active Since"
            value={userStats ? new Date(userStats.created_at).toLocaleDateString() : "N/A"}
          />
        </div>
        
        <Tabs defaultValue="history">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="history">Mining History</TabsTrigger>
            <TabsTrigger value="earnings">Earnings Breakdown</TabsTrigger>
          </TabsList>
          <TabsContent value="history" className="h-60 overflow-auto">
            {sessionsLoading ? (
              <div className="flex justify-center items-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyber-blue"></div>
              </div>
            ) : recentSessions.length === 0 ? (
              <div className="flex justify-center items-center h-full text-gray-400">
                No mining history available
              </div>
            ) : (
              <div className="space-y-3">
                {recentSessions.map((session) => (
                  <div key={session.id} className="bg-dark-bg p-3 rounded-lg flex justify-between items-center">
                    <div>
                      <div className="text-sm font-medium">
                        {new Date(session.start_time).toLocaleDateString()} {new Date(session.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                      <div className="text-xs text-gray-400">
                        Duration: {formatDuration(session.start_time, session.end_time)}
                      </div>
                    </div>
                    <div className="text-cyber-green font-medium">
                      +{session.tokens_earned.toFixed(4)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
          <TabsContent value="earnings" className="h-60 overflow-auto">
            <div className="space-y-3">
              <div className="bg-dark-bg p-3 rounded-lg flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-cyber-blue rounded-full mr-2"></div>
                  <span>Mining Rewards</span>
                </div>
                <div className="font-medium">{userStats?.total_mined.toFixed(2) || "0.00"} tokens</div>
              </div>
              <div className="bg-dark-bg p-3 rounded-lg flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-cyber-purple rounded-full mr-2"></div>
                  <span>Referral Rewards</span>
                </div>
                <div className="font-medium">{userStats?.referral_earnings.toFixed(2) || "0.00"} tokens</div>
              </div>
              <div className="bg-dark-bg p-3 rounded-lg flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-cyber-green rounded-full mr-2"></div>
                  <span>Task Rewards</span>
                </div>
                <div className="font-medium">{userStats?.task_earnings.toFixed(2) || "0.00"} tokens</div>
              </div>
              <div className="bg-dark-bg p-3 rounded-lg flex justify-between items-center font-semibold">
                <div>Total Earnings</div>
                <div>{userStats?.total_earnings.toFixed(2) || "0.00"} tokens</div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
