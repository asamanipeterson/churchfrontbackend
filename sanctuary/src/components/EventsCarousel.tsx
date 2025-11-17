"use client";

import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { fetchEvents, type Event } from "@/lib/events";
import { useToast } from "@/hooks/use-toast";

const EventsCarousel = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const { toast } = useToast();

  // Fetch events from backend
  useEffect(() => {
    (async () => {
      try {
        const data = await fetchEvents();
        setEvents(data);
      } catch {
        toast({ title: "Failed to load events", variant: "destructive" });
      }
    })();
  }, [toast]);

  if (events.length === 0) {
    return (
      <section className="py-20 px-4 bg-background text-center">
        <h2 className="text-3xl font-bold text-foreground mb-4">
          Upcoming Events
        </h2>
        <p className="text-muted-foreground">No events available yet.</p>
      </section>
    );
  }

  // Show static grid if less than 3 events
  if (events.length < 3) {
    return (
      <section className="py-20 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Upcoming Events
            </h2>
            <p className="text-muted-foreground">
              Join us for these special gatherings
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Show carousel when 3 or more events
  return (
    <section className="py-20 px-4 bg-background relative">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Upcoming Events
          </h2>
          <p className="text-muted-foreground">
            Join us for these special gatherings
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {events.map((event) => (
              <CarouselItem key={event.id} className="pl-4 md:basis-1/2">
                <EventCard event={event} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-4 md:-left-12 bg-accent hover:bg-accent/90 text-accent-foreground border-0" />
          <CarouselNext className="-right-4 md:-right-12 bg-accent hover:bg-accent/90 text-accent-foreground border-0" />
        </Carousel>
      </div>
    </section>
  );
};

/* ---------- Event Card (Classic Design) ---------- */
const EventCard = ({ event }: { event: Event }) => {
  return (
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
              <span className="font-semibold text-sm">
                {event.location || "EVENT LOCATION"}
              </span>
            </div>
            <h3 className="text-xl font-bold text-card-foreground mb-2 line-clamp-2">
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
  );
};

export default EventsCarousel;
