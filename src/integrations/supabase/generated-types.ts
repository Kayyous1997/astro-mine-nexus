
export type Profile = {
  id: string;
  username: string;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
};

export type MiningSession = {
  id: string;
  user_id: string;
  start_time: string;
  end_time: string | null;
  tokens_earned: number;
  mining_rate: number;
  active: boolean;
};

export type Earnings = {
  id: string;
  user_id: string;
  total_mined: number;
  referral_earnings: number;
  task_earnings: number;
  total_earnings: number;
  updated_at: string;
};

export type Referral = {
  id: string;
  referral_code: string;
  user_id: string;
};

export type ReferredUser = {
  id: string;
  referrer_id: string;
  referred_user_id: string;
  created_at: string;
  rewarded: boolean;
};

export type Task = {
  id: string;
  name: string;
  description: string;
  reward: number;
  type: string;
  requirements: any;
  active: boolean;
};

export type UserTask = {
  id: string;
  user_id: string;
  task_id: string;
  status: 'pending' | 'completed' | 'expired';
  completed_at: string | null;
  rewarded: boolean;
};

export type UserCheckin = {
  id: string;
  user_id: string;
  checkin_date: string;
  streak_count: number;
  rewarded: boolean;
  created_at: string;
};

export type LeaderboardEntry = {
  rank: number;
  user_id: string;
  username: string;
  avatar_url: string | null;
  total_earnings: number;
};

export type UserStats = {
  user_id: string;
  username: string;
  avatar_url: string | null;
  created_at: string;
  total_mined: number;
  referral_earnings: number;
  task_earnings: number;
  total_earnings: number;
  mining_rate: number;
  active_session: {
    session_id: string;
    start_time: string;
  } | null;
  referrals: {
    referral_code: string;
    total_referrals: number;
    active_referrals: number;
    total_earned: number;
    referral_url: string;
  };
};

export type TaskResult = {
  success: boolean;
  message?: string;
  task_id?: string;
  reward?: number;
  completed_at?: string;
};

export type CheckinResult = {
  success: boolean;
  message?: string;
  streak?: number;
  base_reward?: number;
  streak_bonus?: number;
  total_reward?: number;
};

export type MiningResult = {
  success: boolean;
  message?: string;
  session_id?: string;
  duration_seconds?: number;
  tokens_earned?: number;
};
