import { Clock, MapPin } from "lucide-react";

const newsItems = [
  {
    id: 1,
    category: "CHURCH",
    title: "Every measure belongs to God's glory",
    date: "JUNE 24, 2021",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=800"
  },
  {
    id: 2,
    category: "BLOG",
    title: "Every reason to work harder towards jesus",
    date: "JUNE 24, 2021",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "https://images.unsplash.com/photo-1507692049790-de58290a4334?q=80&w=800"
  }
];

const NewsSection = () => {
  return (
    <section className="py-16 px-4 bg-background">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {newsItems.map((item) => (
            <div key={item.id} className="bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
