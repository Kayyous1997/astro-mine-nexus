
import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import ReferralLink from "@/components/referrals/ReferralLink";
import Leaderboard from "@/components/dashboard/Leaderboard";
import { useUserData } from "@/hooks/useUserData";
import { useToast } from "@/components/ui/use-toast";

export default function ReferralsPage() {
  const { referralStats, loading } = useUserData();
  const { toast } = useToast();
  
  // Show notification when referral stats change (in production, you'd want to compare previous vs new)
  useEffect(() => {
    if (referralStats && referralStats.total_referrals > 0) {
      const checkNewReferrals = sessionStorage.getItem('last_referral_count');
      const lastCount = checkNewReferrals ? parseInt(checkNewReferrals) : 0;
      
      if (referralStats.total_referrals > lastCount) {
        // Only show toast if this isn't the first load (lastCount > 0)
        if (lastCount > 0) {
          toast({
            title: "New referral!",
            description: "Someone joined using your referral link!",
            variant: "default",
          });
        }
        
        // Update the stored count
        sessionStorage.setItem('last_referral_count', referralStats.total_referrals.toString());
      }
    }
  }, [referralStats, toast]);
  
  if (loading || !referralStats) {
    return (
      <Layout>
        <div className="py-8 px-4">
          <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-6">Referrals</h1>
            <div className="flex justify-center p-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyber-blue"></div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="py-8 px-4">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold mb-6">Referrals</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-dark-card rounded-lg border border-white/10 p-5">
                  <p className="text-sm text-gray-400">Total Referrals</p>
                  <p className="text-3xl font-semibold">{referralStats.total_referrals}</p>
                </div>
                
                <div className="bg-dark-card rounded-lg border border-white/10 p-5">
                  <p className="text-sm text-gray-400">Active Miners</p>
                  <p className="text-3xl font-semibold">{referralStats.active_referrals}</p>
                </div>
                
                <div className="bg-dark-card rounded-lg border border-white/10 p-5">
                  <p className="text-sm text-gray-400">Total Earned</p>
                  <p className="text-3xl font-semibold">{referralStats.total_earned.toFixed(2)}</p>
                </div>
              </div>
              
              <ReferralLink />
            </div>
            
            <div>
              <div className="bg-dark-card rounded-lg border border-white/10 p-5">
                <h2 className="text-lg font-semibold mb-4">Top Referrers</h2>
                <Leaderboard />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
