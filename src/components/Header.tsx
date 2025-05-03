
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Features", href: "#features" },
    { label: "How it Works", href: "#how-it-works" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-sm border-b bg-background/80">
      <div className="budgetu-container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <a href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 bg-budgetu-purple rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-lg">B</span>
            </div>
            <span className="font-bold text-xl">BudgetU</span>
          </a>
        </div>

        {/* Desktop menu */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <a 
              key={item.label}
              href={item.href}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Button variant="outline">Log In</Button>
          <Button>Sign Up Free</Button>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed inset-0 top-16 z-50 bg-background md:hidden",
          mobileMenuOpen ? "flex flex-col" : "hidden"
        )}
      >
        <nav className="flex flex-col items-center gap-6 p-6">
          {navItems.map((item) => (
            <a 
              key={item.label}
              href={item.href}
              className="text-lg font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <div className="flex flex-col w-full gap-2 mt-4">
            <Button variant="outline" className="w-full">Log In</Button>
            <Button className="w-full">Sign Up Free</Button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
