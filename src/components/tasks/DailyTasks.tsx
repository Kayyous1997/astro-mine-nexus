
import { useState, useEffect } from "react";
import { Check, ExternalLink, RefreshCw, Twitter, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { useUserData } from "@/hooks/useUserData";
import { TasksService } from "@/services/TasksService";
import type { Task, UserTask } from "@/integrations/supabase/generated-types";

export default function DailyTasks() {
  const { tasks, userTasks, refreshUserTasks, loading } = useUserData();
  const { toast } = useToast();
  const [processingTaskId, setProcessingTaskId] = useState<string | null>(null);
  
  const [countdown, setCountdown] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  });
  
  // Calculate time until next reset (midnight)
  useEffect(() => {
    const calculateTimeUntilMidnight = () => {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(now.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      
      const diffMs = tomorrow.getTime() - now.getTime();
      const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
      const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      const diffSecs = Math.floor((diffMs % (1000 * 60)) / 1000);
      
      setCountdown({
        hours: diffHrs,
        minutes: diffMins,
        seconds: diffSecs,
      });
    };
    
    calculateTimeUntilMidnight();
    const interval = setInterval(calculateTimeUntilMidnight, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  const completeTask = async (taskId: string) => {
    setProcessingTaskId(taskId);
    try {
      const result = await TasksService.completeTask(taskId);
      
      if (result.success) {
        toast({
          title: "Task Completed!",
          description: `You've earned ${result.reward} tokens for completing this task.`,
        });
        
        // Refresh user tasks to get updated completion status
        await refreshUserTasks();
      } else {
        toast({
          title: "Task Failed",
          description: result.message || "Could not complete task",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while completing the task",
        variant: "destructive",
      });
      console.error("Error completing task:", error);
    } finally {
      setProcessingTaskId(null);
    }
  };
  
  // Helper to check if a task is completed
  const isTaskCompleted = (taskId: string): boolean => {
    return userTasks.some(ut => 
      ut.task_id === taskId && 
      ut.status === "completed" && 
      new Date(ut.completed_at || "").toDateString() === new Date().toDateString()
    );
  };
  
  const completedCount = tasks.filter(task => isTaskCompleted(task.id)).length;
  const progress = tasks.length > 0 ? (completedCount / tasks.length) * 100 : 0;
  
  if (loading) {
    return (
      <div className="bg-dark-card rounded-lg border border-white/10 p-5">
        <div className="flex justify-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyber-blue"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-dark-card rounded-lg border border-white/10 p-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5">
        <div>
          <h3 className="font-semibold">Daily Tasks</h3>
          <p className="text-sm text-gray-400">Complete tasks to earn rewards</p>
        </div>
        
        <div className="mt-3 sm:mt-0 p-2 bg-dark-bg rounded-lg flex items-center space-x-2">
          <span className="text-xs text-gray-400">Refreshes in:</span>
          <span className="text-sm font-mono">
            {countdown.hours.toString().padStart(2, "0")}:{countdown.minutes.toString().padStart(2, "0")}:{countdown.seconds.toString().padStart(2, "0")}
          </span>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="px-3 py-2 bg-dark-bg rounded-lg">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-gray-400">Daily Progress</span>
            <span className="text-xs font-medium">{completedCount}/{tasks.length} Tasks</span>
          </div>
          <Progress 
            value={progress} 
            className="h-2 bg-white/10 [&>div]:bg-gradient-to-r [&>div]:from-cyber-blue [&>div]:to-cyber-purple" 
          />
        </div>
        
        <div className="space-y-3">
          {tasks.map((task) => {
            const completed = isTaskCompleted(task.id);
            let icon;
            
            if (task.name.includes('Twitter')) {
              icon = <Twitter className="h-5 w-5" />;
            } else if (task.name.includes('Telegram')) {
              icon = <MessageCircle className="h-5 w-5" />;
            } else {
              icon = <RefreshCw className="h-5 w-5" />;
            }
            
            return (
              <div
                key={task.id}
                className="p-4 bg-dark-bg rounded-lg border border-white/5 flex justify-between"
              >
                <div className="flex items-start space-x-3">
                  <div className="mt-1 w-8 h-8 rounded-full bg-dark-accent flex items-center justify-center text-gray-400">
                    {icon}
                  </div>
                  <div>
                    <h4 className="font-medium">{task.name}</h4>
                    <p className="text-sm text-gray-400">{task.description}</p>
                    {task.requirements?.link && (
                      <a
                        href={task.requirements.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 flex items-center text-xs text-cyber-blue hover:underline"
                      >
                        Visit <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <div className="text-sm font-medium text-cyber-green">
                    +{task.reward} tokens
                  </div>
                  <Button
                    variant={completed ? "outline" : "default"}
                    size="sm"
                    className={`mt-2 ${
                      completed
                        ? "bg-cyber-green/20 text-cyber-green border-cyber-green/30 hover:bg-cyber-green/20"
                        : "bg-gradient-to-r from-cyber-blue to-cyber-purple"
                    }`}
                    onClick={() => completeTask(task.id)}
                    disabled={completed || processingTaskId === task.id}
                  >
                    {processingTaskId === task.id ? (
                      <span className="flex items-center">
                        <span className="w-4 h-4 mr-1 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
                        Processing
                      </span>
                    ) : completed ? (
                      <>
                        <Check className="mr-1 h-4 w-4" /> Completed
                      </>
                    ) : (
                      "Complete"
                    )}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
