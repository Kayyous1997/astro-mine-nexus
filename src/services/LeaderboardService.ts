
import { supabase } from "@/integrations/supabase/client";
import type { LeaderboardEntry } from "@/integrations/supabase/generated-types";

export const LeaderboardService = {
  // Get leaderboard data
  async getLeaderboard(limit = 10, offset = 0): Promise<LeaderboardEntry[]> {
    try {
      const { data, error } = await supabase.rpc('get_leaderboard', {
        _limit: limit,
        _offset: offset
      });
      
      if (error) throw error;
      
      return data as LeaderboardEntry[];
    } catch (error: any) {
      console.error('Error getting leaderboard:', error);
      return [];
    }
  }
};
