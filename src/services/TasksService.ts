
import { supabase } from "@/integrations/supabase/client";
import type { Task, UserTask, TaskResult, CheckinResult } from "@/integrations/supabase/generated-types";

export const TasksService = {
  // Get all available tasks
  async getTasks(): Promise<Task[]> {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('active', true);
      
      if (error) throw error;
      
      return data as Task[];
    } catch (error: any) {
      console.error('Error getting tasks:', error);
      return [];
    }
  },

  // Get user tasks
  async getUserTasks(): Promise<UserTask[]> {
    try {
      const { data, error } = await supabase
        .from('user_tasks')
        .select('*');
      
      if (error) throw error;
      
      return data as UserTask[];
    } catch (error: any) {
      console.error('Error getting user tasks:', error);
      return [];
    }
  },

  // Complete a task
  async completeTask(taskId: string): Promise<TaskResult> {
    try {
      const { data, error } = await supabase.rpc('complete_task', {
        _task_id: taskId
      });
      
      if (error) throw error;
      
      return data as TaskResult;
    } catch (error: any) {
      console.error('Error completing task:', error);
      return { 
        success: false,
        message: error.message || 'Failed to complete task'
      };
    }
  },

  // Daily check-in
  async dailyCheckin(): Promise<CheckinResult> {
    try {
      const { data, error } = await supabase.rpc('daily_checkin');
      
      if (error) throw error;
      
      return data as CheckinResult;
    } catch (error: any) {
      console.error('Error checking in:', error);
      return { 
        success: false,
        message: error.message || 'Failed to check in'
      };
    }
  },

  // Get task completion status
  async getTaskCompletionStatus(taskId: string): Promise<'pending' | 'completed' | null> {
    try {
      const { data, error } = await supabase
        .from('user_tasks')
        .select('status')
        .eq('task_id', taskId)
        .maybeSingle();
      
      if (error) throw error;
      
      return data?.status || 'pending';
    } catch (error: any) {
      console.error('Error getting task status:', error);
      return null;
    }
  }
};
