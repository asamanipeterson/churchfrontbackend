import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Instagram, Youtube, Mail, MapPin, Menu, X, Shield } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

// inside the component




const Navigation = () => {

  const navigate = useNavigate();
  const handleSignOut = () => {
  localStorage.removeItem("user");   // or .clear() if you store more
  navigate("/auth");                 // or "/login"
};
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

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
            <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center p-1.5">
              <img src="/images/cross.png" alt="Cross" className="w-full h-full object-contain brightness-0 invert" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-primary-foreground">ZEGEN</h1>
              <p className="text-xs text-primary-foreground/70">CHURCH WORDPRESS THEME</p>
            </div>
          </div>

          {/* Navigation links */}
          <nav className="hidden lg:flex items-center gap-4 text-primary-foreground text-sm">
            <Link to="/" className="hover:text-accent transition-colors">HOME</Link>
            <Link to="/about" className="hover:text-accent transition-colors">ABOUT</Link>
            <a href="#" className="hover:text-accent transition-colors">SERMONS</a>
            <Link to="/ministries" className="hover:text-accent transition-colors">MINISTRIES</Link>
            <a href="#" className="hover:text-accent transition-colors">BLOG</a>
            <Link to="/contact" className="hover:text-accent transition-colors">CONTACT US</Link>
          </nav>

          {/* Mobile menu button */}
          <button
            className="lg:hidden text-primary-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Admin and Donate buttons */}
         {/* Admin and Donate buttons */}
{/* Admin and Donate buttons */}
<div className="hidden lg:flex items-center gap-2">

  {/* ✅ Show Admin only if user is admin */}
  {user?.user_type === "admin" && (
    <>
      <Link to="/admin">
        <Button
          className="bg-primary-foreground/30 text-primary-foreground hover:bg-red-600 transition-colors border-none"
        >
          <Shield className="w-4 h-4 mr-2" />
          Admin
        </Button>
      </Link>

      <Button
        onClick={handleSignOut}
        className="bg-primary-foreground/30 text-primary-foreground hover:bg-red-600 transition-colors border-none"
      >
        <LogOut className="w-4 h-4 mr-2" />
        Sign Out
      </Button>
    </>
  )}

  <Button className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-6">
    DONATE
  </Button>
</div>

        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-primary/20 animate-fade-in">
            <div className="flex flex-col gap-4 text-primary-foreground">
              <Link to="/" className="hover:text-accent transition-colors">HOME</Link>
            <Link to="/about" className="hover:text-accent transition-colors">ABOUT</Link>
            <a href="#" className="hover:text-accent transition-colors">SERMONS</a>
            <Link to="/ministries" className="hover:text-accent transition-colors">MINISTRIES</Link>
            <a href="#" className="hover:text-accent transition-colors">BLOG</a>
            <Link to="/contact" className="hover:text-accent transition-colors">CONTACT US</Link>
                {user?.user_type === "admin" && (
              <>
                <Link to="/admin">
                  <Button variant="outline" className="bg-primary-foreground/15 text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/25">
                    <Shield className="w-4 h-4 mr-2" />
                    Admin
                  </Button>
                </Link>

                <Button
                  variant="outline"
                  onClick={handleSignOut}
                  className="bg-accent-foreground/15 text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/25"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </>
            )}

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