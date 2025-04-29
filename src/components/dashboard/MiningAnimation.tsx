
import { useState, useEffect } from "react";
import { Play, Pause, Zap } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { MiningService } from "@/services/MiningService";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function MiningAnimation() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isMining, setIsMining] = useState(false);
  const [miningSession, setMiningSession] = useState<any>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [estimatedEarnings, setEstimatedEarnings] = useState(0);
  const [miningRate, setMiningRate] = useState(0.01); // Default mining rate (tokens per hour)
  const [loading, setLoading] = useState(false);

  // Check for active mining session on component load
  useEffect(() => {
    const checkExistingSession = async () => {
      if (!user) return;
      
      try {
        const userStats = await MiningService.getUserStats();
        
        if (userStats?.active_session) {
          setIsMining(true);
          setMiningSession(userStats.active_session);
          setMiningRate(userStats.mining_rate || 0.01);
          
          // Calculate elapsed time since session start
          const startTime = new Date(userStats.active_session.start_time).getTime();
          const currentTime = new Date().getTime();
          const initialElapsed = Math.floor((currentTime - startTime) / 1000);
          setElapsedTime(initialElapsed);
        }
      } catch (error) {
        console.error("Error checking mining session:", error);
      }
    };
    
    checkExistingSession();
  }, [user]);

  // Update elapsed time and earnings while mining
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    
    if (isMining) {
      timer = setInterval(() => {
        setElapsedTime(prev => {
          const newElapsed = prev + 1;
          // Calculate earnings: mining rate per hour / 3600 seconds * elapsed seconds
          const newEarnings = miningRate * (newElapsed / 3600);
          setEstimatedEarnings(newEarnings);
          return newElapsed;
        });
      }, 1000);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isMining, miningRate]);

  const formatTime = (seconds: number): string => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startMining = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to start mining",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    try {
      const result = await MiningService.startMining();
      
      if (result.success) {
        setIsMining(true);
        setMiningSession({
          session_id: result.session_id,
          start_time: new Date().toISOString(),
        });
        setElapsedTime(0);
        setEstimatedEarnings(0);
        
        toast({
          title: "Mining Started",
          description: "Your mining operation has begun!",
        });
      } else {
        toast({
          title: "Mining Failed",
          description: result.message || "Could not start mining",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error starting mining:", error);
      toast({
        title: "Error",
        description: "An error occurred while starting mining",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const stopMining = async () => {
    setLoading(true);
    try {
      const result = await MiningService.stopMining();
      
      if (result.success) {
        setIsMining(false);
        setMiningSession(null);
        
        toast({
          title: "Mining Stopped",
          description: `You earned ${Number(result.tokens_earned).toFixed(6)} tokens in this session!`,
        });
        
        // Reset values
        setElapsedTime(0);
        setEstimatedEarnings(0);
      } else {
        toast({
          title: "Error Stopping",
          description: result.message || "Could not stop mining",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error stopping mining:", error);
      toast({
        title: "Error",
        description: "An error occurred while stopping mining",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-dark-card border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Zap className="mr-2 h-5 w-5 text-cyber-blue" />
          Mining Operation
        </CardTitle>
        <CardDescription>Earn tokens through active mining operations</CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="flex flex-col items-center justify-center">
          {/* Mining animation */}
          <div className="relative w-48 h-48 mb-4">
            {/* Background effects */}
            <div className={`absolute inset-0 rounded-full ${isMining ? 'bg-cyber-blue/5 animate-pulse' : 'bg-gray-900/30'}`}></div>
            
            {/* Inner circle that rotates when mining */}
            <div className={`absolute inset-4 rounded-full border-4 border-white/5 ${isMining ? 'animate-spin-slow' : ''}`}></div>
            
            {/* Mining particles - only show when mining */}
            {isMining && (
              <>
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-cyber-blue rounded-full animate-mining-anim"
                    style={{
                      left: `${50 + Math.cos(i * 72 * Math.PI / 180) * 40}%`,
                      top: `${50 + Math.sin(i * 72 * Math.PI / 180) * 40}%`,
                      animationDelay: `${i * 0.3}s`,
                      opacity: 0.7,
                    }}
                  ></div>
                ))}
                
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-cyber-purple rounded-full animate-mining-anim"
                    style={{
                      left: `${50 + Math.cos((i * 72 + 36) * Math.PI / 180) * 30}%`,
                      top: `${50 + Math.sin((i * 72 + 36) * Math.PI / 180) * 30}%`,
                      animationDelay: `${i * 0.2 + 0.1}s`,
                      opacity: 0.7,
                    }}
                  ></div>
                ))}
              </>
            )}
            
            {/* Central dot */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-dark-bg flex items-center justify-center">
              <div className={`w-12 h-12 rounded-full ${isMining ? 'bg-gradient-to-br from-cyber-blue to-cyber-purple animate-pulse' : 'bg-dark-accent'} flex items-center justify-center text-xl`}>
                {isMining ? (
                  <span className="text-white font-bold">
                    {estimatedEarnings > 0 ? `+${estimatedEarnings.toFixed(4)}` : '...'}
                  </span>
                ) : (
                  <span className="text-white/50">IDLE</span>
                )}
              </div>
            </div>
          </div>
          
          {/* Mining stats */}
          <div className="grid grid-cols-2 gap-4 w-full max-w-xs mb-4">
            <div className="bg-dark-bg p-3 rounded-lg text-center">
              <p className="text-xs text-gray-400 mb-1">Duration</p>
              <p className="font-mono text-lg">{formatTime(elapsedTime)}</p>
            </div>
            <div className="bg-dark-bg p-3 rounded-lg text-center">
              <p className="text-xs text-gray-400 mb-1">Rate</p>
              <p className="font-mono text-lg">{miningRate.toFixed(3)}/hr</p>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="justify-center">
        <Button
          onClick={isMining ? stopMining : startMining}
          className={`w-48 ${isMining ? 'bg-red-600 hover:bg-red-700' : 'bg-gradient-to-r from-cyber-blue to-cyber-purple hover:opacity-90'}`}
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center">
              <span className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Processing...
            </span>
          ) : isMining ? (
            <>
              <Pause className="mr-2 h-4 w-4" /> Stop Mining
            </>
          ) : (
            <>
              <Play className="mr-2 h-4 w-4" /> Start Mining
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
