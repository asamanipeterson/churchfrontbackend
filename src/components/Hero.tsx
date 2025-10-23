import { BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

const slides = [
  {
    subtitle: "YOU CAN HELP FOR THEM",
    title: "LET'S BRING THEM HOME",
    description: "Join us in our mission to spread love, faith, and hope to communities around the world.",
    image: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2073"
  },
  {
    subtitle: "FAITH IN ACTION",
    title: "SERVE WITH PURPOSE",
    description: "Experience the joy of serving others and making a real difference in people's lives.",
    image: "https://images.unsplash.com/photo-1507692049790-de58290a4334?q=80&w=2073"
  },
  {
    subtitle: "COMMUNITY OF BELIEVERS",
    title: "GROW IN FAITH TOGETHER",
    description: "Connect with a loving community dedicated to growing spiritually and supporting one another.",
    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2073"
  }
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsAnimating(false), 800);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsAnimating(false), 800);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [isAnimating]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 bg-cover bg-center transition-all duration-1000" style={{ backgroundImage: `url('${slides[currentSlide].image}')` }}>
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
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto" key={currentSlide}>
        {/* Bible Icon with Glow Animation */}
        <div className="mb-6 inline-block animate-pulse-glow">
          <div className="w-20 h-20 mx-auto bg-primary-foreground/10 rounded-lg flex items-center justify-center backdrop-blur-sm border border-primary-foreground/20">
            <BookOpen className="w-10 h-10 text-primary-foreground" />
          </div>
        </div>

        {/* Subtitle with fade animation */}
        <p className="text-accent text-lg font-semibold mb-4 tracking-wider animate-slide-in-left">
          {slides[currentSlide].subtitle}
        </p>

        {/* Main Heading sliding from top */}
        <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground mb-8 leading-tight animate-slide-in-top">
          {slides[currentSlide].title}
        </h1>

        {/* Description sliding from right */}
        <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto mb-8 animate-slide-in-right">
          {slides[currentSlide].description}
        </p>

        {/* CTA Buttons sliding from bottom */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-in-bottom">
          <button className="px-8 py-4 bg-accent text-accent-foreground font-semibold rounded hover:bg-accent/90 transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(220,38,38,0.4)]">
            JOIN US TODAY
          </button>
          <button className="px-8 py-4 bg-transparent border-2 border-primary-foreground text-primary-foreground font-semibold rounded hover:bg-primary-foreground/10 transition-all hover:scale-105">
            LEARN MORE
          </button>
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-accent/80 text-accent-foreground flex items-center justify-center hover:bg-accent transition-all hover:scale-110"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-accent/80 text-accent-foreground flex items-center justify-center hover:bg-accent transition-all hover:scale-110"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (!isAnimating) {
                setIsAnimating(true);
                setCurrentSlide(index);
                setTimeout(() => setIsAnimating(false), 800);
              }
            }}
            className={`w-3 h-3 rounded-full transition-all ${
              currentSlide === index ? "bg-accent w-8" : "bg-primary-foreground/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Decorative light rays */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};

export default Hero;