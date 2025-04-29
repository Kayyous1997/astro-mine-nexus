
import Layout from "@/components/layout/Layout";
import MiningAnimation from "@/components/dashboard/MiningAnimation";
import MiningStats from "@/components/dashboard/MiningStats";
import Leaderboard from "@/components/dashboard/Leaderboard";

export default function DashboardPage() {
  return (
    <Layout>
      <div className="py-8 px-4">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold mb-6">Mining Dashboard</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <MiningAnimation />
              <MiningStats />
            </div>
            
            <div>
              <Leaderboard />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
