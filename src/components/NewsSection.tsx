import { Clock } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface NewsItem {
  id: string;
  category: string;
  title: string;
  date: string;
  excerpt: string;
  image: string;
}

const NewsSection = () => {
  const newsItems: NewsItem[] = [
    { id: "1", title: "Community Food Drive Success", excerpt: "Thanks to your generous donations, we were able to help 200 families this month.", category: "Community", date: "Jan 20, 2024", image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c" },
    { id: "2", title: "Youth Camp Registration Open", excerpt: "Join us this summer for an unforgettable experience of faith, fun, and fellowship.", category: "Youth", date: "Jan 18, 2024", image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df" },
    { id: "3", title: "New Bible Study Series", excerpt: "Starting next week, we'll be exploring the book of Romans in our Wednesday evening studies.", category: "Teaching", date: "Jan 15, 2024", image: "https://images.unsplash.com/photo-1519791883288-dc8bd696e667" },
    { id: "4", title: "Mission Trip Update", excerpt: "Our team in Honduras has been making incredible progress building the new school.", category: "Missions", date: "Jan 12, 2024", image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b" },
  ];

  const useCarousel = newsItems.length > 3;

  return (
    <section className="py-16 px-4 bg-background">
      <div className="container mx-auto">
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
      </div>
    </section>
  );
};

const NewsCard = ({ item }: { item: NewsItem }) => (
  <div className="bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
    <div className="flex flex-col sm:flex-row">
      <div className="sm:w-1/3">
        <img 
          src={item.image} 
          alt={item.title}
          className="w-full h-48 sm:h-full object-cover"
        />
      </div>
      <div className="sm:w-2/3 p-6">
        <span className="inline-block px-3 py-1 bg-accent text-accent-foreground text-xs font-bold rounded mb-3">
          {item.category}
        </span>
        <h3 className="text-xl font-bold text-card-foreground mb-3 capitalize">
          {item.title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4">{item.excerpt}</p>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {item.date}
          </span>
        </div>
      </div>
    </div>
  </div>
);

export default NewsSection;
