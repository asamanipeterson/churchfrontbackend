import { MapPin } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
  return (
    <section className="py-20 px-4 bg-background relative">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">Upcoming Events</h2>
          <p className="text-muted-foreground">Join us for these special gatherings</p>
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

export default EventsCarousel;