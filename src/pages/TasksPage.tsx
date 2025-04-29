
import Layout from "@/components/layout/Layout";
import DailyTasks from "@/components/tasks/DailyTasks";

export default function TasksPage() {
  return (
    <Layout>
      <div className="py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-2xl font-bold mb-6">Tasks</h1>
          
          <div className="space-y-6">
            <DailyTasks />
            
            {/* Additional task categories could be added here */}
            <div className="bg-dark-card rounded-lg border border-white/10 p-5">
              <h2 className="text-lg font-semibold mb-4">Weekly Challenges</h2>
              <div className="flex items-center justify-center h-40 border border-dashed border-white/10 rounded-lg">
                <p className="text-gray-400">Coming Soon</p>
              </div>
            </div>
            
            <div className="bg-dark-card rounded-lg border border-white/10 p-5">
              <h2 className="text-lg font-semibold mb-4">Special Events</h2>
              <div className="flex items-center justify-center h-40 border border-dashed border-white/10 rounded-lg">
                <p className="text-gray-400">Coming Soon</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
