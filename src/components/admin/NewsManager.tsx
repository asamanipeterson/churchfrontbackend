import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Edit, Clock } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
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

const NewsManager = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([
    {
      id: "1",
      title: "Community Food Drive Success",
      excerpt: "Thanks to your generous donations, we were able to help 200 families this month.",
      category: "Community",
      date: "2024-01-20",
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800",
    },
    {
      id: "2",
      title: "Youth Camp Registration Open",
      excerpt: "Join us this summer for an unforgettable experience of faith, fun, and fellowship.",
      category: "Youth",
      date: "2024-01-18",
      image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=800",
    },
  ]);

  const [open, setOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    category: "",
    date: new Date().toISOString().split("T")[0],
    image: "",
  });
  const { toast } = useToast();

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingNews) {
      setNewsItems((prev) =>
        prev.map((item) =>
          item.id === editingNews.id
            ? { ...item, ...formData }
            : item
        )
      );
      toast({ title: "News updated successfully" });
    } else {
      const newItem: NewsItem = {
        id: generateId(),
        ...formData,
      };
      setNewsItems((prev) => [newItem, ...prev]);
      toast({ title: "News created successfully" });
    }

    setOpen(false);
    setEditingNews(null);
    setFormData({
      title: "",
      excerpt: "",
      category: "",
      date: new Date().toISOString().split("T")[0],
      image: "",
    });
  };

  const handleDelete = (id: string) => {
    setNewsItems((prev) => prev.filter((item) => item.id !== id));
    toast({ title: "News deleted successfully" });
  };

  const handleEdit = (item: NewsItem) => {
    setEditingNews(item);
    setFormData({
      title: item.title,
      excerpt: item.excerpt,
      category: item.category,
      date: item.date,
      image: item.image,
    });
    setOpen(true);
  };

  const handleAddClick = () => {
    setEditingNews(null);
    setFormData({
      title: "",
      excerpt: "",
      category: "",
      date: new Date().toISOString().split("T")[0],
      image: "",
    });
  };

  const useCarousel = newsItems.length > 2;

  return (
    <div className="space-y-6">
      {/* Header + Add Button */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">News</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAddClick}>
              <Plus className="w-4 h-4 mr-2" />
              Add News
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingNews ? "Edit News" : "Add New News"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                placeholder="Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
              <Textarea
                placeholder="Excerpt"
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                required
                className="min-h-24"
              />
              <Input
                placeholder="Category (e.g., Community, Youth)"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
              />
              <Input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
              <Input
                placeholder="Image URL"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                required
              />
              <Button type="submit" className="w-full">
                {editingNews ? "Update" : "Create"} News
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* News Display */}
      <div className="py-8">
        {useCarousel ? (
          <Carousel opts={{ align: "start", loop: true }} className="w-full max-w-6xl mx-auto">
            <CarouselContent className="-ml-4">
              {newsItems.map((item) => (
                <CarouselItem key={item.id} className="pl-4 md:basis-1/2">
                  <NewsCard item={item} onEdit={() => handleEdit(item)} onDelete={() => handleDelete(item.id)} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-4 md:-left-12 bg-accent hover:bg-accent/90 text-accent-foreground border-0" />
            <CarouselNext className="-right-4 md:-right-12 bg-accent hover:bg-accent/90 text-accent-foreground border-0" />
          </Carousel>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {newsItems.map((item) => (
              <NewsCard key={item.id} item={item} onEdit={() => handleEdit(item)} onDelete={() => handleDelete(item.id)} />
            ))}
          </div>
        )}
      </div>

      {newsItems.length === 0 && (
        <p className="text-center text-muted-foreground py-12">No news yet. Add one to get started!</p>
      )}
    </div>
  );
};

// Updated NewsCard with Edit/Delete buttons (only in manager)
const NewsCard = ({ 
    item, onEdit, 
    onDelete }: 
    { item: NewsItem;
         onEdit: () => void; 
        onDelete: () => void }) => 
            
    (
  <div className="bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow relative group cursor-pointer">
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
            {new Date(item.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
          </span>
        </div>
      </div>
    </div>

    {/* Edit/Delete Buttons (visible on hover in manager) */}
    <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
      <Button variant="outline" size="icon" className="h-8 w-8" onClick={onEdit}>
        <Edit className="w-3 h-3" />
      </Button>
      <Button variant="destructive" size="icon" className="h-8 w-8" onClick={onDelete}>
        <Trash2 className="w-3 h-3" />
      </Button>
    </div>
  </div>
);

export default NewsManager;