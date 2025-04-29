
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-cyber-blue to-cyber-purple text-transparent bg-clip-text mb-4">
          404
        </h1>
        <div className="w-24 h-1 bg-gradient-to-r from-cyber-blue to-cyber-purple rounded-full mb-8"></div>
        <p className="text-xl text-gray-400 mb-6">
          Oops! This area of space hasn't been mined yet
        </p>
        <Button asChild className="bg-gradient-to-r from-cyber-blue to-cyber-purple hover:opacity-90 transition-opacity">
          <Link to="/">Return to Base</Link>
        </Button>
      </div>
    </Layout>
  );
};

export default NotFound;
