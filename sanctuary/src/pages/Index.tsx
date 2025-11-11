import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import NewsSection from "@/components/NewsSection";
import AboutSection from "@/components/AboutSection";
import QuoteSection from "@/components/QuoteSection";
import MinistriesSection from "@/components/MinistriesSection";
import EventsCarousel from "@/components/EventsCarousel";
import ContactSection from "@/components/ContactSection";
import LiveStreamSection from "@/components/LiveStreamSection";
import BlogSection from "@/components/BlogSection";
import Footer from "@/components/Footer";


const Index = () => {
  return (
    <div className="min-h-screen bg-background dark">
      <Navigation />
      <Hero />
      <LiveStreamSection />
      {/* <ApiTest /> */}
      <NewsSection />
      <AboutSection />
      <QuoteSection />
      <MinistriesSection />
      <EventsCarousel />
      <ContactSection />
      <BlogSection />
      <Footer />
    </div>
  );
};

export default Index;