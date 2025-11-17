"use client";

import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { fetchMinistries, type Ministry } from "@/lib/ministries";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const MinistriesSection = () => {
  const [ministries, setMinistries] = useState<Ministry[]>([]);

  useEffect(() => {
    const loadMinistries = async () => {
      try {
        const data = await fetchMinistries();
        setMinistries(data);
      } catch (err) {
        console.error("Failed to fetch ministries:", err);
      }
    };
    loadMinistries();
  }, []);

  const useCarousel = ministries.length >= 3;

  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <p className="text-accent text-sm font-bold mb-3 tracking-wider">MINISTRIES</p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Our Ministries</h2>
        </div>

        {useCarousel ? (
          <Carousel opts={{ align: "start", loop: true }} className="w-full">
            <CarouselContent className="-ml-4">
              {ministries.map((ministry) => (
                <CarouselItem key={ministry.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <MinistryCard ministry={ministry} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-4 md:-left-12 bg-accent hover:bg-accent/90 text-accent-foreground border-0" />
            <CarouselNext className="-right-4 md:-right-12 bg-accent hover:bg-accent/90 text-accent-foreground border-0" />
          </Carousel>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {ministries.map((ministry) => (
              <MinistryCard key={ministry.id} ministry={ministry} />
            ))}
          </div>
        )}

        {ministries.length === 0 && (
          <p className="text-center text-muted-foreground py-12">
            No ministries available yet.
          </p>
        )}
      </div>
    </section>
  );
};

const MinistryCard = ({ ministry }: { ministry: Ministry }) => {
  const imagePath = ministry.image ? `/storage/${ministry.image}` : undefined;

  return (
    <div className="group bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
      <div className="relative overflow-hidden h-56 ministry-image">
        <img
          src={imagePath || `https://picsum.photos/800/600?random=${ministry.id}`}
          alt={ministry.title}
          className="w-full h-full object-cover transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>
      <div className="p-6 flex flex-col gap-4">
        <h3 className="text-xl font-bold text-card-foreground mb-2">{ministry.title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {ministry.description?.length > 120
            ? ministry.description.slice(0, 120) + "..."
            : ministry.description}
        </p>
        <button className="flex items-center gap-2 text-accent font-semibold hover:gap-3 transition-all mt-2">
          READ MORE <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}; 


export default MinistriesSection;
