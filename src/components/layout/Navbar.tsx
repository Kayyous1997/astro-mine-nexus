
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Bell, LogOut } from "lucide-react";
import ThemeSwitcher from "./ThemeSwitcher";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { toast } = useToast();
  const { user, signOut } = useAuth();
  
  const handleNotification = () => {
    toast({
      title: "No new notifications",
      description: "Check back later for updates!",
    });
  };

  const handleSignOut = async () => {
    await signOut();
  };

  // Get user initials for avatar fallback
  const getUserInitials = () => {
    if (!user) return "U";
    if (user.user_metadata?.username) {
      return user.user_metadata.username.substring(0, 1).toUpperCase();
    }
    return user.email?.substring(0, 1).toUpperCase() || "U";
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-dark-card/80 backdrop-blur-lg border-b border-white/10">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center space-x-2"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyber-blue to-cyber-purple flex items-center justify-center">
              <div className="w-6 h-6 rounded-full bg-dark-bg flex items-center justify-center">
                <div className="w-3 h-3 rounded-full cyber-gradient animate-pulse-glow"></div>
              </div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-cyber-blue to-cyber-purple text-transparent bg-clip-text">
              AstroMine
            </span>
          </Link>

          {/* Desktop menu */}
          <div className="hidden lg:flex items-center space-x-6">
            <Link to="/dashboard" className="text-sm hover:text-cyber-blue transition-colors">Dashboard</Link>
            <Link to="/tasks" className="text-sm hover:text-cyber-blue transition-colors">Tasks</Link>
            <Link to="/referrals" className="text-sm hover:text-cyber-blue transition-colors">Referrals</Link>
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-2">
            {user ? (
              <>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-full w-9 h-9"
                  onClick={handleNotification}
                >
                  <Bell className="h-5 w-5 text-gray-400" />
                </Button>
                
                <ThemeSwitcher />
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="rounded-full h-9 w-9 p-0">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={user.user_metadata?.avatar_url || ""} />
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {getUserInitials()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/profile">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/settings">Settings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <ThemeSwitcher />
                <Button asChild variant="outline" className="hidden sm:flex">
                  <Link to="/login">Login</Link>
                </Button>
                <Button asChild className="bg-gradient-to-r from-cyber-blue to-cyber-purple hover:opacity-90 transition-opacity hidden sm:flex">
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </>
            )}
            
            {/* Mobile menu button */}
            <Button
              variant="ghost" 
              size="icon" 
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 py-4 border-t border-white/10 animate-fade-in">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/dashboard" 
                className="px-2 py-2 hover:bg-white/5 rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link 
                to="/tasks" 
                className="px-2 py-2 hover:bg-white/5 rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Tasks
              </Link>
              <Link 
                to="/referrals" 
                className="px-2 py-2 hover:bg-white/5 rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Referrals
              </Link>
              {!user && (
                <div className="flex flex-col sm:hidden space-y-2 pt-2">
                  <Button asChild variant="outline">
                    <Link to="/login">Login</Link>
                  </Button>
                  <Button asChild className="bg-gradient-to-r from-cyber-blue to-cyber-purple">
                    <Link to="/signup">Sign Up</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
