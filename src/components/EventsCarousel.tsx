import { useState } from "react";
import { MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Event {
  id: number;
  date: string;
  month: string;
  time: string;
  title: string;
}

const events: Event[] = [
  {
    id: 1,
    date: "16",
    month: "Aug",
    time: "8.00 pm",
    title: "Reflect The Person Of Jesus Christ"
  },
  {
    id: 2,
    date: "20",
    month: "Sep",
    time: "8.00 pm",
    title: "Spiritually Reborn As God's Children"
  },
  {
    id: 3,
    date: "25",
    month: "Oct",
    time: "7.30 pm",
    title: "Walking In Faith And Divine Purpose"
  },
  {
    id: 4,
    date: "15",
    month: "Nov",
    time: "6.00 pm",
    title: "Understanding The Power Of Prayer"
  }
];

const EventsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const eventsPerView = 2;
  const maxIndex = events.length - eventsPerView;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  return (
    <section className="py-20 px-4 bg-background relative">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">Upcoming Events</h2>
          <p className="text-muted-foreground">Join us for these special gatherings</p>
        </div>

        <div className="relative">
          {/* Carousel Container */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * (100 / eventsPerView)}%)` }}
            >
              {events.map((event, index) => (
                <div
                  key={event.id}
                  className="flex-shrink-0 px-3"
                  style={{ width: `${100 / eventsPerView}%` }}
                >
                  <div className="bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-border">
                    <div className="p-6">
                      {/* Date Badge */}
                      <div className="flex items-start gap-4 mb-4">
                        <div className="bg-accent text-accent-foreground rounded-lg p-3 text-center min-w-[70px]">
                          <div className="text-sm font-medium">{event.month}</div>
                          <div className="text-3xl font-bold">{event.date}</div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 text-accent mb-2">
                            <MapPin className="w-5 h-5" />
                            <span className="font-semibold text-sm">EVENT LOCATION</span>
                          </div>
                          <h3 className="text-xl font-bold text-card-foreground mb-2">
                            {event.title}
                          </h3>
                        </div>
                      </div>

                      {/* Time Badge */}
                      <div className="inline-block bg-accent/10 text-accent px-4 py-2 rounded font-semibold text-sm mb-4">
                        {event.time}
                      </div>

                      {/* Event Details Link */}
                      <a
                        href="#"
                        className="inline-flex items-center text-accent font-semibold hover:underline"
                      >
                        Event Details →
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons - Bold Red Style */}
          <div className="flex justify-center gap-4 mt-8">
            <Button
              onClick={prevSlide}
              className="bg-accent hover:bg-accent/90 text-accent-foreground w-12 h-12 rounded-full p-0 shadow-lg hover:shadow-[0_0_30px_rgba(220,38,38,0.4)] transition-all"
              aria-label="Previous events"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <Button
              onClick={nextSlide}
              className="bg-accent hover:bg-accent/90 text-accent-foreground w-12 h-12 rounded-full p-0 shadow-lg hover:shadow-[0_0_30px_rgba(220,38,38,0.4)] transition-all"
              aria-label="Next events"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {[...Array(maxIndex + 1)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentIndex === index
                    ? "bg-accent w-8"
                    : "bg-muted hover:bg-accent/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsCarousel;