
import { useState } from "react";
import { Check, ExternalLink, RefreshCw, Twitter, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";

interface Task {
  id: string;
  title: string;
  description: string;
  reward: number;
  icon: React.ReactNode;
  link?: string;
  completed: boolean;
}

export default function DailyTasks() {
  const { toast } = useToast();
  
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "daily-check",
      title: "Daily Check-in",
      description: "Check in daily to earn rewards",
      reward: 5,
      icon: <RefreshCw className="h-5 w-5" />,
      completed: false,
    },
    {
      id: "twitter-follow",
      title: "Follow on Twitter",
      description: "Follow our Twitter account",
      reward: 10,
      icon: <Twitter className="h-5 w-5" />,
      link: "https://twitter.com/astromine",
      completed: false,
    },
    {
      id: "telegram-join",
      title: "Join Telegram",
      description: "Join our Telegram community",
      reward: 15,
      icon: <MessageCircle className="h-5 w-5" />,
      link: "https://t.me/astromine",
      completed: false,
    },
  ]);
  
  const [countdown, setCountdown] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  });
  
  const completeTask = (taskId: string) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, completed: true } : task
      )
    );
    
    toast({
      title: "Task Completed!",
      description: `You've earned tokens for completing this task.`,
    });
  };
  
  const completedCount = tasks.filter((task) => task.completed).length;
  const progress = (completedCount / tasks.length) * 100;
  
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
          <Progress value={progress} className="h-2 bg-white/10" indicatorClassName="bg-gradient-to-r from-cyber-blue to-cyber-purple" />
        </div>
        
        <div className="space-y-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="p-4 bg-dark-bg rounded-lg border border-white/5 flex justify-between"
            >
              <div className="flex items-start space-x-3">
                <div className="mt-1 w-8 h-8 rounded-full bg-dark-accent flex items-center justify-center text-gray-400">
                  {task.icon}
                </div>
                <div>
                  <h4 className="font-medium">{task.title}</h4>
                  <p className="text-sm text-gray-400">{task.description}</p>
                  {task.link && (
                    <a
                      href={task.link}
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
                  variant={task.completed ? "outline" : "default"}
                  size="sm"
                  className={`mt-2 ${
                    task.completed
                      ? "bg-cyber-green/20 text-cyber-green border-cyber-green/30 hover:bg-cyber-green/20"
                      : "bg-gradient-to-r from-cyber-blue to-cyber-purple"
                  }`}
                  onClick={() => completeTask(task.id)}
                  disabled={task.completed}
                >
                  {task.completed ? (
                    <>
                      <Check className="mr-1 h-4 w-4" /> Completed
                    </>
                  ) : (
                    "Complete"
                  )}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
