import { Calendar, User, ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const blogPosts = [
  {
    id: 1,
    title: "Every measure belongs to church",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    date: "JUNE 24, 2021",
    author: "ADMIN",
    image: "https://images.unsplash.com/photo-1519491050282-cf00c82424b4?q=80&w=800"
  },
  {
    id: 2,
    title: "Working for The path of Jesus",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    date: "JUNE 24, 2021",
    author: "ADMIN",
    image: "https://images.unsplash.com/photo-1507692049790-de58290a4334?q=80&w=800"
  },
  {
    id: 3,
    title: "Time to join our massive charity fair",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    date: "JUNE 24, 2021",
    author: "ADMIN",
    image: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=800"
  },
  {
    id: 4,
    title: "Building faith in our community",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    date: "JUNE 24, 2021",
    author: "ADMIN",
    image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=800"
  }
];

const BlogSection = () => {
  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <p className="text-accent text-sm font-bold mb-3 tracking-wider">BLOG</p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Latest Posts</h2>
        </div>
        
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {blogPosts.map((post) => (
              <CarouselItem key={post.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <article className="group bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                  <div className="relative overflow-hidden h-56">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {post.author}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-card-foreground mb-3 capitalize group-hover:text-accent transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">{post.excerpt}</p>
                    <button className="flex items-center gap-2 text-accent font-semibold hover:gap-3 transition-all">
                      READ MORE <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </article>
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

export default BlogSection;
