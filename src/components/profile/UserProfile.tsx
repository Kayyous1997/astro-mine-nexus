
import { useState } from "react";
import { Link } from "react-router-dom";
import { Edit2, Copy, Check, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";

// Sample user data
const userData = {
  username: "CosmicMiner",
  email: "cosmic@example.com",
  walletAddress: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
  avatar: "",
  initials: "CM",
  joinDate: "2023-05-15",
  totalMined: 324.56,
};

export default function UserProfile() {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  
  const copyWalletAddress = async () => {
    try {
      await navigator.clipboard.writeText(userData.walletAddress);
      setCopied(true);
      toast({
        title: "Address copied!",
        description: "Wallet address has been copied to clipboard.",
      });
      
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again or copy manually.",
        variant: "destructive",
      });
    }
  };
  
  const handleLogout = () => {
    toast({
      title: "Logging out...",
      description: "You have been successfully logged out.",
    });
    // In a real app, would redirect to login or home
  };
  
  return (
    <div className="max-w-3xl mx-auto">
      <Card className="bg-dark-card border-white/10">
        <CardHeader className="relative pb-0">
          <div className="absolute top-4 right-4">
            <Link to="/settings">
              <Button variant="outline" size="sm">
                <Edit2 className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            </Link>
          </div>
          <div className="flex flex-col items-center">
            <Avatar className="h-24 w-24 mb-4 bg-dark-accent">
              <AvatarImage src={userData.avatar} />
              <AvatarFallback className="text-2xl">{userData.initials}</AvatarFallback>
            </Avatar>
            <CardTitle className="text-2xl">{userData.username}</CardTitle>
            <CardDescription className="text-gray-400">{userData.email}</CardDescription>
            <div className="mt-2 text-xs text-gray-400">
              Member since {new Date(userData.joinDate).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
              })}
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-400">Wallet Address</h3>
                <div className="flex items-center space-x-2">
                  <div className="bg-dark-bg border border-white/10 rounded-lg px-3 py-2 text-sm truncate flex-1">
                    {userData.walletAddress}
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={copyWalletAddress}
                    className={copied ? "bg-cyber-green/20 text-cyber-green border-cyber-green/30" : ""}
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-400">Mining Stats</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-dark-bg border border-white/10 rounded-lg p-4">
                    <div className="text-sm text-gray-400">Total Mined</div>
                    <div className="mt-1 text-xl font-semibold">{userData.totalMined.toFixed(2)}</div>
                  </div>
                  <div className="bg-dark-bg border border-white/10 rounded-lg p-4">
                    <div className="text-sm text-gray-400">Mining Rate</div>
                    <div className="mt-1 text-xl font-semibold">0.043 /hr</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-400">Achievements</h3>
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div
                      key={i}
                      className="aspect-square bg-dark-bg border border-white/10 rounded-lg flex items-center justify-center p-2"
                    >
                      <div className={`w-full h-full rounded-full ${i <= 3 ? 'bg-gradient-to-br from-cyber-blue to-cyber-purple opacity-70' : 'bg-dark-accent'} flex items-center justify-center text-xs font-semibold`}>
                        {i}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-400">Account Settings</h3>
                <div className="space-y-2">
                  <Link to="/settings/security">
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      Security Settings
                    </Button>
                  </Link>
                  <Link to="/settings/notifications">
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      Notification Preferences
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          <Separator className="my-6 bg-white/10" />
          
          <div className="flex justify-end">
            <Button variant="destructive" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
