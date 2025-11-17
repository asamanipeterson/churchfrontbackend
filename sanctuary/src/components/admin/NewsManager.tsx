import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Edit, Calendar, AlignLeft } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  createNews,
  updateNews,
  deleteNews,
  fetchNews,
  type News,
} from "@/lib/news";
import { newsSchema, type NewsFormData } from "@/schemas/new";

// Utility to clean the date string from the database (e.g., "2025-11-10T00:00:00.000000Z" -> "2025-11-10")
const cleanIsoDate = (isoDate: string): string => {
    // Matches YYYY-MM-DD at the start of the string
    const match = isoDate.match(/^\d{4}-\d{2}-\d{2}/);
    return match ? match[0] : isoDate;
};

const NewsManager = () => {
  const [news, setNews] = useState<News[]>([]);
  const [open, setOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<News | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<NewsFormData>({
    title: "",
    category: "",
    date: "",
    description: "",
    image: undefined,
  });
  const { toast } = useToast();

  const loadNews = useCallback(async () => {
    try {
      const data = await fetchNews();
      setNews(data);
    } catch {
      toast({ title: "Failed to load posts", variant: "destructive" });
    }
  }, [toast]);

  useEffect(() => {
    loadNews();
  }, [loadNews]);

  const resetForm = () => {
    setFormData({
      title: "",
      category: "",
      date: "",
      description: "",
      image: undefined,
    });
    setEditingNews(null);
  };

  // FIX: Use the cleaned date to construct a reliable Date object for display.
  const toDisplayDate = (isoDate: string): string => {
    if (!isoDate) return "";
    // Clean the date to get YYYY-MM-DD, then append T12:00:00Z to ensure
    // consistent parsing that doesn't shift the day based on local timezone.
    const cleanedDate = cleanIsoDate(isoDate);
    
    // Check if cleanedDate is valid YYYY-MM-DD format before creating Date
    if (!/^\d{4}-\d{2}-\d{2}$/.test(cleanedDate)) return "Invalid Date"; 
    
    const d = new Date(`${cleanedDate}T12:00:00Z`);

    if (isNaN(d.getTime())) return "Invalid Date";

    return `${String(d.getMonth() + 1).padStart(2, "0")}/${String(
      d.getDate()
    ).padStart(2, "0")}/${d.getFullYear()}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const result = newsSchema.safeParse(formData);
    if (!result.success) {
      const msg = Object.values(result.error.format())
        .flatMap((e: any) => e._errors)
        .join(", ");
      toast({ title: "Validation error", description: msg, variant: "destructive" });
      setIsLoading(false);
      return;
    }

    try {
      // NOTE: The date in result.data is already in MM/DD/YYYY format, which 
      // is converted to YYYY-MM-DD in your `buildFormData` utility.
      const payloadData: NewsFormData = { ...result.data, image: formData.image };

      if (editingNews) {
        // Need to handle the PUT method with FormData correctly, it's already done in your API layer
        const updated = await updateNews(editingNews.id, payloadData);
        setNews((prev) => prev.map((p) => (p.id === editingNews.id ? updated : p)));
        toast({ title: "Post updated" });
      } else {
        const created = await createNews(payloadData);
        if (created?.id) setNews((prev) => [created, ...prev]);
        else await loadNews();
        toast({ title: "Post created" });
      }

      setOpen(false);
      resetForm();
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.response?.data?.message || "Something went wrong.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (news: News) => {
    setEditingNews(news);
    setFormData({
      title: news.title,
      category: news.category,
      // FIX: Use the updated toDisplayDate to populate the input with MM/DD/YYYY
      date: toDisplayDate(news.date),
      description: news.description,
      image: undefined,
    });
    setOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this news?")) return;
    try {
      await deleteNews(id);
      setNews((prev) => prev.filter((p) => p.id !== id));
      toast({ title: "Post deleted" });
    } catch {
      toast({ title: "Delete failed", variant: "destructive" });
    }
  };

  return (
    <div className="space-y-6 p-4 max-w-5xl mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">News</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { resetForm(); setOpen(true); }}>
              <Plus className="w-4 h-4 mr-2" /> Add News
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingNews ? "Edit News" : "Add News"}</DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input placeholder="Title" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
              <Input placeholder="Category" required value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} />

              <Input
                placeholder="MM/DD/YYYY"
                required
                value={formData.date}
                onChange={(e) => {
                  const raw = e.target.value.replace(/\D/g, "").slice(0, 8);
                  const formatted =
                    raw.length > 4 ? `${raw.slice(0, 2)}/${raw.slice(2, 4)}/${raw.slice(4)}`
                    : raw.length > 2 ? `${raw.slice(0, 2)}/${raw.slice(2)}`
                    : raw;
                  setFormData({ ...formData, date: formatted });
                }}
              />

              <Textarea placeholder="Description" className="h-28" required value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />

              <input 
              type="file" 
              accept="image/*" 
              onChange={(e) => setFormData({ ...formData, image: e.target.files?.[0] })} 
              className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
              />

              <Button type="submit" className="w-full" disabled={isLoading}>{isLoading ? "Saving..." : editingNews ? "Update" : "Create"}</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {news.length === 0 && <p className="text-center text-muted-foreground py-12 col-span-full">No News yet.</p>}
        {news.map((n) => (
          <NewsCard key={n.id} NewsItem={n} onEdit={() => handleEdit(n)} onDelete={() => handleDelete(n.id)} /> 
        ))}
      </div>
    </div>
  );
};

const NewsCard = ({ NewsItem, onEdit, onDelete }: { NewsItem: News; onEdit: () => void; onDelete: () => void }) => {
  // FIX: Clean the date string before trying to parse it
  const cleanedDate = cleanIsoDate(NewsItem.date);
  
  // Use the cleaned date and append T12:00:00Z for reliable parsing
  const safeDate = new Date(`${cleanedDate}T12:00:00Z`);

  const formattedDate = isNaN(safeDate.getTime()) 
    ? "Invalid Date" // Display fallback if still invalid
    : safeDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition relative group">
      <div className="flex flex-col sm:flex-row">
        {NewsItem.image && (
          <img src={`/storage/${NewsItem.image}`} className="sm:w-1/3 h-40 sm:h-auto object-cover" alt={NewsItem.title}
            onError={(e) => (e.currentTarget.src = `https://picsum.photos/600/400?random=${NewsItem.id}`)}
          />
        )}

        <div className="p-5 flex flex-col gap-3 sm:w-2/3">
          <span className="text-xs px-3 py-1 bg-red-600 text-white rounded font-semibold w-fit">{NewsItem.category}</span>

          <h3 className="text-xl font-bold text-gray-900">{NewsItem.title}</h3>

          <p className="text-sm text-gray-700 leading-relaxed flex gap-2">
             {NewsItem.description}
          </p>

          <p className="flex items-center text-sm text-gray-600 gap-2 mt-auto">
            <Calendar className="w-4 h-4" /> {formattedDate}
          </p>
        </div>
      </div>

      <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition">
        <Button variant="outline" size="icon" className="h-8 w-8" onClick={onEdit}><Edit className="w-4 h-4" /></Button>
        <Button variant="destructive" size="icon" className="h-8 w-8" onClick={onDelete}><Trash2 className="w-4 h-4" /></Button>
      </div>
    </div>
  );
};

export default NewsManager;