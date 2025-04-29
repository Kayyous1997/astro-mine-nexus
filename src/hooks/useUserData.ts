
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { MiningService } from '@/services/MiningService';
import { TasksService } from '@/services/TasksService';
import { ReferralService } from '@/services/ReferralService';
import type { UserStats, Task, UserTask } from '@/integrations/supabase/generated-types';
import { supabase } from '@/integrations/supabase/client';

export const useUserData = () => {
  const { user } = useAuth();
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [userTasks, setUserTasks] = useState<UserTask[]>([]);
  const [referralStats, setReferralStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Fetch user stats
        const stats = await MiningService.getUserStats();
        if (stats) {
          setUserStats(stats);
        }

        // Fetch tasks
        const availableTasks = await TasksService.getTasks();
        setTasks(availableTasks);

        // Fetch user tasks
        const completedTasks = await TasksService.getUserTasks();
        setUserTasks(completedTasks);

        // Fetch referral stats
        const refStats = await ReferralService.getReferralStats();
        setReferralStats(refStats);
      } catch (err: any) {
        console.error('Error fetching user data:', err);
        setError(err.message || 'Failed to load user data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Set up realtime subscription to listen for changes
    const userStatsSubscription = supabase
      .channel('user-stats-changes')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'earnings' 
      }, payload => {
        // Refresh user stats when earnings change
        MiningService.getUserStats().then((stats) => {
          if (stats) setUserStats(stats);
        });
      })
      .subscribe();

    const userTasksSubscription = supabase
      .channel('user-tasks-changes')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'user_tasks' 
      }, payload => {
        // Refresh user tasks when they change
        TasksService.getUserTasks().then(setUserTasks);
      })
      .subscribe();
      
    const referralsSubscription = supabase
      .channel('referrals-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'referred_users'
      }, payload => {
        // Refresh referral stats when they change
        ReferralService.getReferralStats().then(setReferralStats);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(userStatsSubscription);
      supabase.removeChannel(userTasksSubscription);
      supabase.removeChannel(referralsSubscription);
    };
  }, [user]);

  return { 
    userStats, 
    tasks, 
    userTasks, 
    referralStats,
    loading, 
    error,
    refreshUserStats: () => MiningService.getUserStats().then((stats) => {
      if (stats) setUserStats(stats);
    }),
    refreshTasks: () => TasksService.getTasks().then(setTasks),
    refreshUserTasks: () => TasksService.getUserTasks().then(setUserTasks),
    refreshReferralStats: () => ReferralService.getReferralStats().then(setReferralStats)
  };
};
