import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

const pastors = [
  {
    id: 1,
    name: "Sophia Jones",
    role: "Senior Pastor",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600",
  },
  {
    id: 2,
    name: "Johnny",
    role: "Youth Pastor",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=600",
  },
  {
    id: 3,
    name: "Jackson",
    role: "Worship Pastor",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600",
  },
  {
    id: 4,
    name: "Emily Davis",
    role: "Children's Pastor",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=600",
  },
];

const PastorsCarousel = () => {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <p className="text-accent text-sm font-bold mb-2 tracking-wider">MEET OUR TEAM</p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-2">Church Pastors</h2>
          <div className="w-20 h-1 bg-accent mx-auto"></div>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent>
            {pastors.map((pastor) => (
              <CarouselItem key={pastor.id} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card className="overflow-hidden bg-card border-none shadow-lg">
                    <CardContent className="p-0">
                      <div className="relative group">
                        <img
                          src={pastor.image}
                          alt={pastor.name}
                          className="w-full h-80 object-cover"
                        />
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary via-primary/90 to-transparent p-6 translate-y-2 group-hover:translate-y-0 transition-transform">
                          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                            <div className="w-4 h-6 border-l-3 border-r-3 border-b-3 border-accent-foreground"></div>
                          </div>
                          <h3 className="text-xl font-bold text-white text-center mt-6">
                            {pastor.name}
                          </h3>
                          <p className="text-white/80 text-sm text-center">{pastor.role}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0 -translate-x-12" />
          <CarouselNext className="right-0 translate-x-12" />
        </Carousel>
      </div>
    </section>
  );
};

export default PastorsCarousel;
