
import { supabase } from "@/integrations/supabase/client";
import type { ReferredUser } from "@/integrations/supabase/generated-types";

export const ReferralService = {
  // Get referral stats
  async getReferralStats() {
    try {
      const { data, error } = await supabase.rpc('get_referral_stats');
      
      if (error) throw error;
      
      return data;
    } catch (error: any) {
      console.error('Error getting referral stats:', error);
      return null;
    }
  },

  // Get referred users
  async getReferredUsers(): Promise<ReferredUser[]> {
    try {
      const { data, error } = await supabase
        .from('referred_users')
        .select(`
          id,
          referrer_id,
          referred_user_id,
          created_at,
          rewarded,
          profiles:referred_user_id (
            username,
            avatar_url
          )
        `);
      
      if (error) throw error;
      
      return data as unknown as ReferredUser[];
    } catch (error: any) {
      console.error('Error getting referred users:', error);
      return [];
    }
  },

  // Get referral code
  async getReferralCode(): Promise<string | null> {
    try {
      const { data, error } = await supabase
        .from('referrals')
        .select('referral_code')
        .single();
      
      if (error) throw error;
      
      return data.referral_code;
    } catch (error: any) {
      console.error('Error getting referral code:', error);
      return null;
    }
  }
};
