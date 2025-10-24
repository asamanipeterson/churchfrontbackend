import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Instagram, Youtube, Mail, MapPin, Menu, X } from "lucide-react";
import { useState } from "react";

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-sm border-b border-primary/20">
      {/* Top bar with contact info and social links */}
      <div className="border-b border-primary/20">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center text-sm">
          <div className="flex items-center gap-2 text-primary-foreground/80">
            <MapPin className="w-4 h-4" />
            <span>684 West College St. Sun City, USA</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">
              <Youtube className="w-4 h-4" />
            </a>
            <a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center p-2">
              <img src="/images/cross.png" alt="Cross" className="w-full h-full object-contain" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-primary-foreground">ZEGEN</h1>
              <p className="text-xs text-primary-foreground/70">CHURCH WORDPRESS THEME</p>
            </div>
          </div>

          {/* Navigation links */}
          <nav className="hidden md:flex items-center gap-6 text-primary-foreground">
            <a href="#" className="hover:text-accent transition-colors">HOME</a>
            <a href="#" className="hover:text-accent transition-colors">PAGES</a>
            <a href="#" className="hover:text-accent transition-colors">SERMONS</a>
            <a href="#" className="hover:text-accent transition-colors">MINISTRIES</a>
            <a href="#" className="hover:text-accent transition-colors">BLOG</a>
            <a href="#" className="hover:text-accent transition-colors">CONTACT US</a>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-primary-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Donate button */}
          <Button className="hidden md:block bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-6">
            DONATE
          </Button>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-primary/20 animate-fade-in">
            <div className="flex flex-col gap-4 text-primary-foreground">
              <a href="#" className="hover:text-accent transition-colors">HOME</a>
              <a href="#" className="hover:text-accent transition-colors">PAGES</a>
              <a href="#" className="hover:text-accent transition-colors">SERMONS</a>
              <a href="#" className="hover:text-accent transition-colors">MINISTRIES</a>
              <a href="#" className="hover:text-accent transition-colors">BLOG</a>
              <a href="#" className="hover:text-accent transition-colors">CONTACT US</a>
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-6 w-full">
                DONATE
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navigation;