import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PastorsCarousel from "@/components/PastorsCarousel";
import { Users, Heart, Play } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background dark">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-[300px] flex items-center justify-center bg-gradient-to-b from-primary/20 to-background">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=1200')] bg-cover bg-center opacity-20"></div>
        <div className="relative text-center">
          {/* <p className="text-accent text-sm font-bold mb-2 tracking-wider">WELCOME</p> */}
          <h1 className="text-5xl md:text-6xl font-bold text-foreground">About Us</h1>
        </div>
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-accent rounded-full flex items-center justify-center shadow-lg p-3">
          <img src="/images/cross.png" alt="Cross" className="w-full h-full object-contain brightness-0 invert" />
        </div>
      </section>

      {/* Main About Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800"
                alt="Church pastor"
                className="rounded-lg shadow-2xl w-full"
              />
            </div>
            <div>
              <p className="text-accent text-sm font-bold mb-3 tracking-wider">ABOUT US</p>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                We are Taking Small Steps to Make Earth Better Planet
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo. Integer sagittis arcu non felis molestie volutpat.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">Place Of Worgen</h3>
                    <p className="text-sm text-muted-foreground">Lorem ipsum dolor sit amet, adipiscing elit.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                    <Heart className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">Bloody Knife</h3>
                    <p className="text-sm text-muted-foreground">Lorem ipsum dolor sit amet, adipiscing elit.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-12 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-card rounded-lg shadow-lg p-8 flex items-center gap-6">
            <button className="w-16 h-16 rounded-full bg-accent flex items-center justify-center flex-shrink-0 hover:bg-accent/90 transition-all hover:scale-105">
              <Play className="w-6 h-6 text-accent-foreground ml-1" fill="currentColor" />
            </button>
            <div>
              <p className="text-lg text-foreground italic">
                "Pray! And listen to God! You can do this alone, but find somebody to do it with you."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pastors Carousel Section */}
      <PastorsCarousel />

      <Footer />
    </div>
  );
};

export default About;
