
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LandingPage from "./LandingPage";

const Index = () => {
  const navigate = useNavigate();

  // Automatically redirect to the landing page
  useEffect(() => {
    // In this case, we'll just render the LandingPage directly
    // But you could also do a redirect if needed
    // navigate('/landing');
  }, [navigate]);

  return <LandingPage />;
};

export default Index;
