import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import EventsCarousel from "@/components/EventsCarousel";

const Index = () => {
  return (
    <div className="min-h-screen bg-background dark">
      <Navigation />
      <Hero />
      <EventsCarousel />
    </div>
  );
};

export default Index;