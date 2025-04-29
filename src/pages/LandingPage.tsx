
import { Link } from "react-router-dom";
import { ArrowRight, Activity, Award, Users } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-24 px-4 relative overflow-hidden grid-pattern">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-cyber-purple/20 to-transparent opacity-30"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyber-blue rounded-full filter blur-[8rem] opacity-20"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-cyber-purple rounded-full filter blur-[8rem] opacity-20"></div>
        
        <div className="container mx-auto text-center relative z-10">
          <div className="inline-block mb-4 px-4 py-1 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full">
            <span className="text-sm font-medium bg-gradient-to-r from-cyber-blue to-cyber-purple text-transparent bg-clip-text">
              The Future of Mining Simulations
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-gray-300 text-transparent bg-clip-text">
              Mine the Future with
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyber-blue to-cyber-purple text-transparent bg-clip-text">
              AstroMine
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10">
            Engage in futuristic mining simulations, earn rewards, and compete with miners across the galaxy
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button asChild size="lg" className="bg-gradient-to-r from-cyber-blue to-cyber-purple hover:opacity-90 transition-opacity px-8">
              <Link to="/signup">Start Mining</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="group">
              <Link to="/learn-more" className="flex items-center">
                Learn More <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
          
          {/* Animated mining visual */}
          <div className="mt-16 relative">
            <div className="h-64 max-w-3xl mx-auto bg-dark-card/50 rounded-xl border border-white/10 overflow-hidden backdrop-blur-sm">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-cyber-purple/20 animate-pulse-glow"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-cyber-blue/10 animate-spin-slow"></div>
              
              {/* Mining particles */}
              <div className="absolute inset-0 flex justify-center items-center">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-cyber-blue rounded-full animate-mining-anim"
                    style={{
                      left: `${20 + i * 15}%`,
                      animationDelay: `${i * 0.3}s`,
                      opacity: 0.7,
                    }}
                  ></div>
                ))}
                
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-cyber-purple rounded-full animate-mining-anim"
                    style={{
                      left: `${30 + i * 10}%`,
                      animationDelay: `${i * 0.2 + 0.1}s`,
                      opacity: 0.7,
                    }}
                  ></div>
                ))}
                
                <div className="relative w-20 h-20 bg-dark-card rounded-full border border-white/20 flex items-center justify-center z-20">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyber-blue/20 to-cyber-purple/20 animate-pulse-glow"></div>
                  <div className="w-16 h-16 rounded-full bg-dark-bg flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full cyber-gradient"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 px-4 bg-dark-bg">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              <span className="bg-gradient-to-r from-cyber-blue to-cyber-purple text-transparent bg-clip-text">
                Explore the Features
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Discover the advanced capabilities of our futuristic mining platform
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-dark-card border border-white/10 rounded-xl p-6 glow">
              <div className="w-12 h-12 rounded-lg bg-cyber-blue/20 flex items-center justify-center mb-4">
                <Activity className="h-6 w-6 text-cyber-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Real-time Mining</h3>
              <p className="text-gray-400">
                Experience seamless mining with real-time visualizations and performance tracking
              </p>
            </div>
            
            <div className="bg-dark-card border border-white/10 rounded-xl p-6 glow">
              <div className="w-12 h-12 rounded-lg bg-cyber-purple/20 flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-cyber-purple" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Compete & Earn</h3>
              <p className="text-gray-400">
                Rise through the ranks on our global leaderboard and earn valuable rewards
              </p>
            </div>
            
            <div className="bg-dark-card border border-white/10 rounded-xl p-6 glow">
              <div className="w-12 h-12 rounded-lg bg-cyber-green/20 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-cyber-green" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Referral System</h3>
              <p className="text-gray-400">
                Invite friends and earn passive income through our tiered referral program
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-dark-bg via-dark-bg to-cyber-purple/30"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjI4MzEiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0wLTZoLTJ2LTRoMnY0eiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>
        
        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to begin your mining journey?
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10">
            Join thousands of miners already exploring the frontiers of virtual mining
          </p>
          
          <Button asChild size="lg" className="bg-gradient-to-r from-cyber-blue to-cyber-purple hover:opacity-90 transition-opacity px-8">
            <Link to="/signup">Get Started Now</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
