export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      earnings: {
        Row: {
          id: string
          referral_earnings: number | null
          task_earnings: number | null
          total_earnings: number | null
          total_mined: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          id?: string
          referral_earnings?: number | null
          task_earnings?: number | null
          total_earnings?: number | null
          total_mined?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          id?: string
          referral_earnings?: number | null
          task_earnings?: number | null
          total_earnings?: number | null
          total_mined?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "earnings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      mining_sessions: {
        Row: {
          active: boolean | null
          end_time: string | null
          id: string
          mining_rate: number | null
          start_time: string
          tokens_earned: number | null
          user_id: string
        }
        Insert: {
          active?: boolean | null
          end_time?: string | null
          id?: string
          mining_rate?: number | null
          start_time?: string
          tokens_earned?: number | null
          user_id: string
        }
        Update: {
          active?: boolean | null
          end_time?: string | null
          id?: string
          mining_rate?: number | null
          start_time?: string
          tokens_earned?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "mining_sessions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          id: string
          updated_at: string | null
          username: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          id: string
          updated_at?: string | null
          username: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          id?: string
          updated_at?: string | null
          username?: string
        }
        Relationships: []
      }
      referrals: {
        Row: {
          id: string
          referral_code: string
          user_id: string
        }
        Insert: {
          id?: string
          referral_code?: string
          user_id: string
        }
        Update: {
          id?: string
          referral_code?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "referrals_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      referred_users: {
        Row: {
          created_at: string | null
          id: string
          referred_user_id: string
          referrer_id: string
          rewarded: boolean | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          referred_user_id: string
          referrer_id: string
          rewarded?: boolean | null
        }
        Update: {
          created_at?: string | null
          id?: string
          referred_user_id?: string
          referrer_id?: string
          rewarded?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "referred_users_referred_user_id_fkey"
            columns: ["referred_user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "referred_users_referrer_id_fkey"
            columns: ["referrer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      tasks: {
        Row: {
          active: boolean | null
          description: string
          id: string
          name: string
          requirements: Json | null
          reward: number
          type: string
        }
        Insert: {
          active?: boolean | null
          description: string
          id?: string
          name: string
          requirements?: Json | null
          reward: number
          type: string
        }
        Update: {
          active?: boolean | null
          description?: string
          id?: string
          name?: string
          requirements?: Json | null
          reward?: number
          type?: string
        }
        Relationships: []
      }
      user_checkins: {
        Row: {
          checkin_date: string
          created_at: string | null
          id: string
          rewarded: boolean | null
          streak_count: number | null
          user_id: string
        }
        Insert: {
          checkin_date?: string
          created_at?: string | null
          id?: string
          rewarded?: boolean | null
          streak_count?: number | null
          user_id: string
        }
        Update: {
          checkin_date?: string
          created_at?: string | null
          id?: string
          rewarded?: boolean | null
          streak_count?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_checkins_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_tasks: {
        Row: {
          completed_at: string | null
          id: string
          rewarded: boolean | null
          status: string
          task_id: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          id?: string
          rewarded?: boolean | null
          status?: string
          task_id: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          id?: string
          rewarded?: boolean | null
          status?: string
          task_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_tasks_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_tasks_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      complete_task: {
        Args: { _task_id: string }
        Returns: Json
      }
      daily_checkin: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      get_leaderboard: {
        Args: { _limit?: number; _offset?: number }
        Returns: {
          rank: number
          user_id: string
          username: string
          avatar_url: string
          total_earnings: number
        }[]
      }
      get_referral_stats: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      get_user_stats: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      process_mining_session: {
        Args: { _session_id: string }
        Returns: Json
      }
      start_mining: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      stop_mining: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
