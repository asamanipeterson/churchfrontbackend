"use client";

import { useEffect, useState, useCallback } from "react";
import { Calendar, User, ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { fetchPosts, type Post } from "@/lib/posts";
import { useToast } from "@/hooks/use-toast";

const BlogSection = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const { toast } = useToast();

  // Load posts
  const loadPosts = useCallback(async () => {
    try {
      const data = await fetchPosts();
      setPosts(data);
    } catch (err) {
      toast({
        title: "Failed to load posts",
        variant: "destructive",
      });
    }
  }, [toast]);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  // Format date LOOK: JUNE 24, 2024
  const formatDate = (dateStr: string) => {
    const safeDate = new Date(dateStr + "T00:00:00");
    return safeDate
      .toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
      .toUpperCase();
  };

  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <p className="text-accent text-sm font-bold mb-3 tracking-wider">
            BLOG
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Latest Posts
          </h2>
        </div>

        {/* If less than 3 → Normal Grid */}
        {posts.length > 0 && posts.length < 3 && (
          <div className="grid md:grid-cols-2 gap-8">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}

        {/* If 3 or more → Carousel */}
        {posts.length >= 3 && (
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {posts.map((post) => (
                <CarouselItem
                  key={post.id}
                  className="pl-4 md:basis-1/2 lg:basis-1/3"
                >
                  <BlogCard post={post} />
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="-left-4 md:-left-12 bg-accent hover:bg-accent/90 text-accent-foreground border-0" />
            <CarouselNext className="-right-4 md:-right-12 bg-accent hover:bg-accent/90 text-accent-foreground border-0" />
          </Carousel>
        )}

        {posts.length === 0 && (
          <p className="text-center text-muted-foreground py-10">
            No posts yet.
          </p>
        )}
      </div>
    </section>
  );
};

/* ---------- Blog card (reduced width) ---------- */
const BlogCard = ({ post }: { post: Post }) => {
  const safeDate = new Date(post.date + "T00:00:00");
  const dateText = safeDate
    .toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
    .toUpperCase();

  return (
    <article
      className="
        group bg-card rounded-lg overflow-hidden 
        shadow-lg hover:shadow-2xl 
        transition-all duration-300 
        max-w-[360px] mx-auto
      "
    >
      {/* Reduced image height */}
      <div className="relative overflow-hidden h-48 cursor-pointer">
        <img
          src={
            post.image
              ? `/storage/${post.image}`
              : `https://picsum.photos/800/600?random=${post.id}`
          }
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>

      {/* Reduced padding */}
      <div className="p-5">
        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {dateText}
          </span>
          <span className="flex items-center gap-1">
            <User className="w-3 h-3" />
            {post.author}
          </span>
        </div>

        <h3 className="text-lg font-bold text-card-foreground mb-3 capitalize group-hover:text-accent transition-colors">
          {post.title}
        </h3>

        <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
          {post.description?.slice(0, 120)}...
        </p>

        <button className="flex items-center gap-2 text-accent font-semibold hover:gap-3 transition-all">
          READ MORE <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </article>
  );
};

export default BlogSection;
