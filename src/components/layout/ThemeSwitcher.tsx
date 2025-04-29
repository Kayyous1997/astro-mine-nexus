
import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

export default function ThemeSwitcher() {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "light") {
      setIsLight(true);
      document.documentElement.classList.add("light-mode");
    }
  }, []);

  const toggleTheme = () => {
    if (isLight) {
      document.documentElement.classList.remove("light-mode");
      localStorage.setItem("theme", "dark");
      toast({
        title: "Dark mode activated",
        description: "Your eyes will thank you later.",
      });
    } else {
      document.documentElement.classList.add("light-mode");
      localStorage.setItem("theme", "light");
      toast({
        title: "Light mode activated",
        description: "Welcome to the bright side!",
      });
    }
    setIsLight(!isLight);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="rounded-full w-9 h-9"
    >
      {isLight ? (
        <Moon className="h-5 w-5 text-slate-800" />
      ) : (
        <Sun className="h-5 w-5 text-yellow-300" />
      )}
    </Button>
  );
}
