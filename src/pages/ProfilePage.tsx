
import Layout from "@/components/layout/Layout";
import UserProfile from "@/components/profile/UserProfile";

export default function ProfilePage() {
  return (
    <Layout>
      <div className="py-8 px-4">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold mb-6">User Profile</h1>
          <UserProfile />
        </div>
      </div>
    </Layout>
  );
}
