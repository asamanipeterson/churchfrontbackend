import { Users, Globe, HandHeart, ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const ministries = [
  {
    icon: Users,
    title: "Family Ministry",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed molestie sem.",
    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=800"
  },
  {
    icon: Globe,
    title: "Web Ministry",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed molestie sem.",
    image: "https://images.unsplash.com/photo-1507692049790-de58290a4334?q=80&w=800"
  },
  {
    icon: HandHeart,
    title: "Help Ministry",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed molestie sem.",
    image: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=800"
  },
  {
    icon: Users,
    title: "Youth Ministry",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed molestie sem.",
    image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=800"
  }
];

const MinistriesSection = () => {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <p className="text-accent text-sm font-bold mb-3 tracking-wider">MINISTRIES</p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Our Ministries</h2>
        </div>
        
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {ministries.map((ministry, index) => {
              const Icon = ministry.icon;
              return (
                <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="group bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                    <div className="relative overflow-hidden h-56 ministry-image">
                      <img 
                        src={ministry.image} 
                        alt={ministry.title}
                        className="w-full h-full object-cover transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    </div>
                    <div className="p-6">
                      <div className="w-14 h-14 bg-accent rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Icon className="w-7 h-7 text-accent-foreground" />
                      </div>
                      <h3 className="text-xl font-bold text-card-foreground mb-3">{ministry.title}</h3>
                      <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{ministry.description}</p>
                      <button className="flex items-center gap-2 text-accent font-semibold hover:gap-3 transition-all">
                        READ MORE <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="-left-4 md:-left-12 bg-accent hover:bg-accent/90 text-accent-foreground border-0" />
          <CarouselNext className="-right-4 md:-right-12 bg-accent hover:bg-accent/90 text-accent-foreground border-0" />
        </Carousel>
      </div>
    </section>
  );
};

export default MinistriesSection;
