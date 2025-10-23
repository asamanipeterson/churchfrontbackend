import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">About Church</h3>
            <p className="text-primary-foreground/80 text-sm leading-relaxed mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed molestie sem.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-accent rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                <Facebook className="w-5 h-5 text-accent-foreground" />
              </a>
              <a href="#" className="w-10 h-10 bg-accent rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                <Twitter className="w-5 h-5 text-accent-foreground" />
              </a>
              <a href="#" className="w-10 h-10 bg-accent rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                <Instagram className="w-5 h-5 text-accent-foreground" />
              </a>
              <a href="#" className="w-10 h-10 bg-accent rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                <Youtube className="w-5 h-5 text-accent-foreground" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">About Us</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">Events</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">Sermons</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">Ministries</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">Blog</a></li>
            </ul>
          </div>

          {/* Ministries */}
          <div>
            <h3 className="text-xl font-bold mb-4">Ministries</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">Family Ministry</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">Youth Ministry</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">Children Ministry</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">Web Ministry</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">Help Ministry</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-primary-foreground/80">123 Church Street, City, State 12345</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-accent flex-shrink-0" />
                <a href="tel:+123456789" className="text-primary-foreground/80 hover:text-accent transition-colors">+1 (123) 456-789</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-accent flex-shrink-0" />
                <a href="mailto:info@church.com" className="text-primary-foreground/80 hover:text-accent transition-colors">info@church.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-6 text-center">
          <p className="text-primary-foreground/60 text-sm">
            © 2025 Church. All rights reserved. Made with love and faith.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
