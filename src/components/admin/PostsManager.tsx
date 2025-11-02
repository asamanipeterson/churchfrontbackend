import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Edit } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Post {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  author: string;
  image: string;
}

const PostsManager = () => {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: "1",
      title: "Every measure belongs to church",
      excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      category: "Church Life",
      date: "2021-06-24",
      author: "ADMIN",
      image: "https://images.unsplash.com/photo-1519491050282-cf00c82424b4?w=800",
    },
    {
      id: "2",
      title: "Working for The path of Jesus",
      excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      category: "Faith Journey",
      date: "2021-06-24",
      author: "ADMIN",
      image: "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=800",
    },
  ]);

  const [open, setOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    category: "",
    date: new Date().toISOString().split("T")[0],
    author: "ADMIN",
    image: "",
  });
  const { toast } = useToast();

  const generateId = () => Math.random().toString(36).substr(2, 9);

  /* ---------- CRUD ---------- */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingPost) {
      setPosts((prev) =>
        prev.map((p) =>
          p.id === editingPost.id ? { ...p, ...formData } : p
        )
      );
      toast({ title: "Post updated successfully" });
    } else {
      const newPost: Post = {
        id: generateId(),
        ...formData,
      };
      setPosts((prev) => [newPost, ...prev]);
      toast({ title: "Post created successfully" });
    }

    setOpen(false);
    setEditingPost(null);
    setFormData({
      title: "",
      excerpt: "",
      category: "",
      date: new Date().toISOString().split("T")[0],
      author: "ADMIN",
      image: "",
    });
  };

  const handleDelete = (id: string) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
    toast({ title: "Post deleted successfully" });
  };

  const handleEdit = (post: Post) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      category: post.category,
      date: post.date,
      author: post.author,
      image: post.image,
    });
    setOpen(true);
  };

  const handleAddClick = () => {
    setEditingPost(null);
    setFormData({
      title: "",
      excerpt: "",
      category: "",
      date: new Date().toISOString().split("T")[0],
      author: "ADMIN",
      image: "",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header + Add Button */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Posts</h2>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAddClick}>
              <Plus className="w-4 h-4 mr-2" />
              Add Post
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingPost ? "Edit Post" : "Add New Post"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                placeholder="Title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />
              <Textarea
                placeholder="Excerpt"
                value={formData.excerpt}
                onChange={(e) =>
                  setFormData({ ...formData, excerpt: e.target.value })
                }
                required
                className="min-h-24"
              />
              <Input
                placeholder="Category"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                required
              />
              <Input
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                required
              />
              <Input
                placeholder="Author (e.g. ADMIN)"
                value={formData.author}
                onChange={(e) =>
                  setFormData({ ...formData, author: e.target.value })
                }
                required
              />
              <Input
                placeholder="Image URL (Unsplash with ?w=800)"
                value={formData.image}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
                required
              />
              <Button type="submit" className="w-full">
                {editingPost ? "Update" : "Create"} Post
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Posts Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onEdit={() => handleEdit(post)}
            onDelete={() => handleDelete(post.id)}
          />
        ))}

        {posts.length === 0 && (
          <p className="col-span-full text-center text-muted-foreground py-12">
            No posts yet. Add one to get started!
          </p>
        )}
      </div>
    </div>
  );
};

/* ---------- Card (like NewsCard + Author) ---------- */
const PostCard = ({
  post,
  onEdit,
  onDelete,
}: {
  post: Post;
  onEdit: () => void;
  onDelete: () => void;
}) => {
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow relative group cursor-pointer">
      <div className="flex flex-col sm:flex-row">
        {/* Image */}
        <div className="sm:w-1/3">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-48 sm:h-full object-cover"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = `https://picsum.photos/800/600?random=${post.id}`;
            }}
          />
        </div>

        {/* Content */}
        <div className="sm:w-2/3 p-6 flex flex-col justify-between">
          <div>
            <span className="inline-block px-3 py-1 bg-accent text-accent-foreground text-xs font-bold rounded mb-3">
              {post.category}
            </span>
            <h3 className="text-xl font-bold text-card-foreground mb-3">
              {post.title}
            </h3>
            <p className="text-muted-foreground text-sm mb-4">{post.excerpt}</p>
          </div>

          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>By {post.author}</span>
            <span>{formattedDate}</span>
          </div>
        </div>
      </div>

      {/* Hover Edit / Delete */}
      <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={onEdit}
        >
          <Edit className="w-3 h-3" />
        </Button>
        <Button
          variant="destructive"
          size="icon"
          className="h-8 w-8"
          onClick={onDelete}
        >
          <Trash2 className="w-3 h-3" />
        </Button>
      </div>
    </div>
  );
};

export default PostsManager;