
import { supabase } from "@/integrations/supabase/client";
import type { MiningSession, MiningResult, UserStats } from "@/integrations/supabase/generated-types";

export const MiningService = {
  // Start mining session
  async startMining(): Promise<MiningResult> {
    try {
      const { data, error } = await supabase.rpc('start_mining');
      
      if (error) throw error;
      
      return data as MiningResult;
    } catch (error: any) {
      console.error('Error starting mining session:', error);
      return { 
        success: false,
        message: error.message || 'Failed to start mining session'
      };
    }
  },

  // Stop mining session
  async stopMining(): Promise<MiningResult> {
    try {
      const { data, error } = await supabase.rpc('stop_mining');
      
      if (error) throw error;
      
      return data as MiningResult;
    } catch (error: any) {
      console.error('Error stopping mining session:', error);
      return { 
        success: false,
        message: error.message || 'Failed to stop mining session'
      };
    }
  },

  // Get user stats including mining rate and active sessions
  async getUserStats(): Promise<UserStats | null> {
    try {
      const { data, error } = await supabase.rpc('get_user_stats');
      
      if (error) throw error;
      
      return data as UserStats;
    } catch (error: any) {
      console.error('Error getting user stats:', error);
      return null;
    }
  },

  // Get active mining session
  async getActiveMiningSession(): Promise<MiningSession | null> {
    try {
      const { data, error } = await supabase
        .from('mining_sessions')
        .select('*')
        .eq('active', true)
        .maybeSingle();
      
      if (error) throw error;
      
      return data as MiningSession;
    } catch (error: any) {
      console.error('Error getting active mining session:', error);
      return null;
    }
  },

  // Get mining history
  async getMiningHistory(limit = 10, offset = 0): Promise<MiningSession[]> {
    try {
      const { data, error } = await supabase
        .from('mining_sessions')
        .select('*')
        .eq('active', false)
        .order('start_time', { ascending: false })
        .range(offset, offset + limit - 1);
      
      if (error) throw error;
      
      return data as MiningSession[];
    } catch (error: any) {
      console.error('Error getting mining history:', error);
      return [];
    }
  }
};
