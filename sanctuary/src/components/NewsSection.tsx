"use client";

import { useState, useEffect } from "react";
import { Clock } from "lucide-react";
import { fetchNews, type News } from "@/lib/news";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const NewsSection = () => {
  const [newsItems, setNewsItems] = useState<News[]>([]);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const data = await fetchNews();
        setNewsItems(data);
      } catch (error) {
        console.error("Failed to fetch news:", error);
      }
    };
    loadNews();
  }, []);

  const useCarousel = newsItems.length >= 3;

  return (
    <section className="py-16 px-4 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <p className="text-accent text-sm font-bold mb-3 tracking-wider"> NEWS</p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Church News</h2>
        </div>

        {useCarousel ? (
          <Carousel opts={{ align: "start", loop: true }} className="w-full max-w-6xl mx-auto">
            <CarouselContent className="-ml-4">
              {newsItems.map((item) => (
                <CarouselItem key={item.id} className="pl-4 md:basis-1/2">
                  <NewsCard item={item} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-4 md:-left-12 bg-accent hover:bg-accent/90 text-accent-foreground border-0" />
            <CarouselNext className="-right-4 md:-right-12 bg-accent hover:bg-accent/90 text-accent-foreground border-0" />
          </Carousel>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {newsItems.map((item) => (
              <NewsCard key={item.id} item={item} />
            ))}
          </div>
        )}

        {newsItems.length === 0 && (
          <p className="text-center text-muted-foreground py-12">
            No news available yet.
          </p>
        )}

      </div>
    </section>
  );
};

const NewsCard = ({ item }: { item: News }) => {
  // Load correct date
  const cleanedDate = item.date?.split("T")[0];
  const dateObj = cleanedDate ? new Date(`${cleanedDate}T12:00:00Z`) : null;
  const formattedDate = dateObj
    ? dateObj.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    : "No Date";

  return (
    <div className="bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
      <div className="flex flex-col sm:flex-row">

        {/* 🖼 Dynamic Image */}
        {item.image && (
          <div className="sm:w-1/3">
            <img
              src={`/storage/${item.image}`}
              alt={item.title}
              className="w-full h-48 sm:h-full object-cover"
              onError={(e) => (e.currentTarget.src = `https://picsum.photos/600/400?random=${item.id}`)}
            />
          </div>
        )}

        <div className="sm:w-2/3 p-6">
          <span className="inline-block px-3 py-1 bg-accent text-accent-foreground text-xs font-bold rounded mb-3">
            {item.category}
          </span>

          <h3 className="text-xl font-bold text-card-foreground mb-3 capitalize">
            {item.title}
          </h3>

          <p className="text-muted-foreground text-sm mb-4">
            {item.description?.length > 120
              ? item.description.slice(0, 120) + "..."
              : item.description}
          </p>

          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {formattedDate}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default NewsSection;
