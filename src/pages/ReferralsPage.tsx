
import Layout from "@/components/layout/Layout";
import ReferralLink from "@/components/referrals/ReferralLink";
import Leaderboard from "@/components/dashboard/Leaderboard";

export default function ReferralsPage() {
  // Sample referral stats
  const referralStats = {
    totalReferrals: 14,
    activeReferrals: 8,
    totalEarned: 42.78,
  };
  
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
                  <p className="text-3xl font-semibold">{referralStats.totalReferrals}</p>
                </div>
                
                <div className="bg-dark-card rounded-lg border border-white/10 p-5">
                  <p className="text-sm text-gray-400">Active Miners</p>
                  <p className="text-3xl font-semibold">{referralStats.activeReferrals}</p>
                </div>
                
                <div className="bg-dark-card rounded-lg border border-white/10 p-5">
                  <p className="text-sm text-gray-400">Total Earned</p>
                  <p className="text-3xl font-semibold">{referralStats.totalEarned.toFixed(2)}</p>
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
