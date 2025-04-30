
import Layout from "@/components/layout/Layout";
import UserProfile from "@/components/profile/UserProfile";
import MiningStats from "@/components/dashboard/MiningStats";

export default function ProfilePage() {
  return (
    <Layout>
      <div className="py-8 px-4">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold mb-6">User Profile</h1>
          <div className="grid grid-cols-1 gap-6">
            <UserProfile />
            <MiningStats />
          </div>
        </div>
      </div>
    </Layout>
  );
}
