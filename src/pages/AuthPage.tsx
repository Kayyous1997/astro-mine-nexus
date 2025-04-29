
import Layout from "@/components/layout/Layout";
import AuthForm from "@/components/auth/AuthForm";

export default function AuthPage() {
  return (
    <Layout>
      <div className="py-16 px-4">
        <div className="max-w-md mx-auto text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyber-blue to-cyber-purple text-transparent bg-clip-text">
              Join the Mining Revolution
            </span>
          </h1>
          <p className="text-gray-400">
            Create an account or login to start your mining journey
          </p>
        </div>
        
        <AuthForm />
      </div>
    </Layout>
  );
}
