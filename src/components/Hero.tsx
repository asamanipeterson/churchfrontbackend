import { BookOpen } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2073')] bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-b from-hero-overlay/90 via-hero-bg/85 to-hero-bg/90"></div>
      </div>

      {/* Animated Background Characters/Silhouettes */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-fade-in"
            style={{
              left: `${15 + i * 12}%`,
              bottom: '0',
              animationDelay: `${i * 0.2}s`,
              animationDuration: '1.5s'
            }}
          >
            <div 
              className="w-12 h-32 bg-primary-foreground/10 rounded-t-full animate-float"
              style={{
                animationDelay: `${i * 0.3}s`,
                animationDuration: `${3 + (i % 3)}s`
              }}
            ></div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Bible Icon with Glow Animation */}
        <div className="mb-6 inline-block animate-pulse-glow">
          <div className="w-20 h-20 mx-auto bg-primary-foreground/10 rounded-lg flex items-center justify-center backdrop-blur-sm border border-primary-foreground/20">
            <BookOpen className="w-10 h-10 text-primary-foreground" />
          </div>
        </div>

        {/* Subtitle with fade animation */}
        <p className="text-accent text-lg font-semibold mb-4 tracking-wider animate-fade-in">
          YOU CAN HELP FOR THEM
        </p>

        {/* Main Heading with staggered animation */}
        <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground mb-8 leading-tight animate-fade-in-up">
          LET'S BRING THEM HOME
        </h1>

        {/* Optional description */}
        <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          Join us in our mission to spread love, faith, and hope to communities around the world.
        </p>

        {/* CTA Buttons with slide animation */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <button className="px-8 py-4 bg-accent text-accent-foreground font-semibold rounded hover:bg-accent/90 transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(220,38,38,0.4)]">
            JOIN US TODAY
          </button>
          <button className="px-8 py-4 bg-transparent border-2 border-primary-foreground text-primary-foreground font-semibold rounded hover:bg-primary-foreground/10 transition-all hover:scale-105">
            LEARN MORE
          </button>
        </div>
      </div>

      {/* Decorative light rays */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};

export default Hero;