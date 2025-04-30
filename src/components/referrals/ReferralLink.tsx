
import { useState, useEffect } from "react";
import { Check, Copy, Share2, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { useUserData } from "@/hooks/useUserData";

export default function ReferralLink() {
  const { referralStats, loading } = useUserData();
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  
  const referralLink = referralStats?.referral_url || "https://astro-mine-nexus.vercel.app/ref/loading...";
  
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      toast({
        title: "Link copied!",
        description: "Your referral link has been copied to clipboard.",
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
  
  const shareReferral = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Join AstroMine",
          text: "Join me on AstroMine and get bonus tokens!",
          url: referralLink,
        });
        
        toast({
          title: "Link shared!",
          description: "Thanks for sharing AstroMine!",
        });
      } catch (err) {
        console.log("Share error:", err);
      }
    } else {
      copyToClipboard();
    }
  };

  if (loading) {
    return (
      <Card className="bg-dark-card border-white/10">
        <CardContent className="p-6">
          <div className="flex justify-center p-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyber-blue"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-dark-card border-white/10">
      <CardContent className="p-6">
        <div className="mb-4">
          <h3 className="font-semibold mb-1">Your Referral Link</h3>
          <p className="text-sm text-gray-400">Share this link to earn 10% of your referrals' mining rewards</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex-1 bg-dark-bg border border-white/10 rounded-lg px-4 py-2 text-sm truncate">
            {referralLink}
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={copyToClipboard}
            className={copied ? "bg-cyber-green/20 text-cyber-green border-cyber-green/30" : ""}
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
          <Button variant="outline" size="icon" onClick={shareReferral}>
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
        
        {/* QR code placeholder */}
        <div className="mt-6 flex justify-center">
          <div className="w-32 h-32 bg-white p-2 rounded-lg">
            <div className="w-full h-full bg-dark-bg flex items-center justify-center text-xs text-gray-400 flex-col">
              <QrCode className="h-8 w-8 mb-1 opacity-50" />
              <span>QR Code</span>
              <span className="text-[10px] mt-1">Coming Soon</span>
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex justify-center">
          <Button className="bg-gradient-to-r from-cyber-blue to-cyber-purple hover:opacity-90 transition-opacity" disabled>
            Download QR (Soon)
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
