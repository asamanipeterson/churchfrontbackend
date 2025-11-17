// src/app/posts/page.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"; // Import Textarea
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Edit, Calendar, User, AlignLeft } from "lucide-react"; // Import AlignLeft
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle, 
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  createPost,
  updatePost,
  deletePost, 
  fetchPosts,
  type Post,
} from "@/lib/posts";
import { postSchema, type PostFormData } from "@/schemas/post";

const PostsManager = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [open, setOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<PostFormData>({
    title: "",
    category: "",
    date: "", // MM/DD/YYYY in form
    author: "ADMIN",
    description: "", // ADDED: description field
    image: undefined,
  });
  const { toast } = useToast();

  // ---------- Load posts function (Reusable) ----------
  const loadPosts = useCallback(async () => {
    try {
      const data = await fetchPosts();
      setPosts(data);
    } catch {
      toast({ title: "Failed to load posts", variant: "destructive" });
    }
  }, [toast]);

  // ---------- Load posts on mount ----------
  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  // ---------- Form reset (updated) ----------
  const resetForm = () => {
    setFormData({
      title: "",
      category: "",
      date: "",
      author: "ADMIN",
      description: "", // ADDED: reset description
      image: undefined,
    });
    setEditingPost(null);
  };

  // ---------- Convert YYYY-MM-DD → MM/DD/YYYY (for editing) ----------
  const toDisplayDate = (isoDate: string): string => {
    if (!isoDate) return "";
    const [year, month, day] = isoDate.split('-').map(Number);
    if (!year || !month || !day) return "";
    
    const date = new Date(year, month - 1, day); 

    const displayMonth = String(date.getMonth() + 1).padStart(2, "0");
    const displayDay = String(date.getDate()).padStart(2, "0");
    const displayYear = date.getFullYear();
    return `${displayMonth}/${displayDay}/${displayYear}`;
  };

  // ---------- Submit (Create/Update) ----------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const result = postSchema.safeParse(formData);
    if (!result.success) {
      const msg = Object.values(result.error.format())
        .flatMap((e: any) => e._errors)
        .join(", ");
      toast({ title: "Validation error", description: msg, variant: "destructive" });
      setIsLoading(false);
      return;
    }

    try {
      const payloadData: PostFormData = {
        ...result.data,
        image: formData.image, 
      };

      if (editingPost) {
        const updated = await updatePost(editingPost.id, payloadData);
        
        setPosts((prev) =>
          prev.map((p) => (p.id === editingPost.id ? updated : p))
        );
        toast({ title: "Post updated" });
      } else {
        const created = await createPost(payloadData);
        
        if (created && created.id) {
            setPosts((prev) => [created, ...prev]);
        } else {
            console.warn("New post object missing ID. Forcing data refresh.");
            await loadPosts();
        }
        
        toast({ title: "Post created" });
      }

      setOpen(false);
      resetForm();
    } catch (err: any) {
      console.error(err);
      toast({
        title: "Error",
        description: err.response?.data?.message || "Something went wrong during save/update.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // ---------- Edit, Open add dialog, Delete (updated) ----------
  const handleEdit = (post: Post) => {
    setEditingPost(post);

    setFormData({
      title: post.title,
      category: post.category,
      date: toDisplayDate(post.date), // Show MM/DD/YYYY from ISO date
      author: post.author,
      description: post.description, // ADDED: populate description
      image: undefined,
    });
    setOpen(true);
  };

  const handleAddClick = () => {
    resetForm();
    setOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this post? This cannot be undone.")) return;

    try {
      await deletePost(id); 
      setPosts((prev) => prev.filter((p) => p.id !== id));
      toast({ title: "Post deleted" });
    } catch (err: any) {
      console.error("Delete failed:", err);
      toast({
        title: "Delete failed",
        description: err.response?.data?.message || "The delete failed on the server side. Check Laravel logs.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6 p-4 max-w-5xl mx-auto">
      {/* Header */}
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
              <Input
                placeholder="Category(eg.Is the post about Woman,Children etc?)"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                required
              />
              {/* MM/DD/YYYY Input (with fixed logic) */}
             <Input
                placeholder="MM/DD/YYYY"
                value={formData.date}
                onChange={(e) => {
                  const digitsOnly = e.target.value.replace(/\D/g, "");
                  const val = digitsOnly.slice(0, 8);
                  let formatted = val;

                  if (val.length > 4) {
                    formatted = val.slice(0, 2) + "/" + val.slice(2, 4) + "/" + val.slice(4);
                  } else if (val.length > 2) {
                    formatted = val.slice(0, 2) + "/" + val.slice(2);
                  }

                  setFormData({ ...formData, date: formatted });
                }}
                required
                maxLength={10} 
              />
              <Input
                placeholder="Author (e.g. ADMIN)"
                value={formData.author}
                onChange={(e) =>
                  setFormData({ ...formData, author: e.target.value })
                }
                required
              />
              {/* ADDED: Textarea for Description */}
              <Textarea 
                placeholder="Description (min 10 characters)" 
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                className="h-28"
              />
              {/* Image upload */}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  setFormData({ ...formData, image: file }); 
                }}
                className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
              />
              {formData.image && (
                <p className="text-sm text-muted-foreground">
                  Selected: {formData.image instanceof File ? formData.image.name : "Previous image will be kept if none selected."}
                </p>
              )}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading
                  ? "Saving..."
                  : editingPost
                  ? "Update"
                  : "Create"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Posts Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {posts.map((post) => {
          if (!post || !post.id) return null; 

          return (
            <PostCard
              key={post.id}
              post={post}
              onEdit={() => handleEdit(post)}
              onDelete={() => handleDelete(post.id)}
            />
          );
        })}
        {posts.length === 0 && (
          <p className="col-span-full text-center text-muted-foreground py-12">
            No posts yet. Add one to get started!
          </p>
        )}
      </div>
    </div>
  );
};

/* ---------- Post Card (updated to show description) ---------- */
const PostCard = ({
  post,
  onEdit,
  onDelete,
}: {
  post: Post;
  onEdit: () => void;
  onDelete: () => void;
}) => {
  const safeDate = new Date(post.date + "T00:00:00"); 
  
  const formattedDate = safeDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow relative group cursor-pointer">
      <div className="flex flex-col sm:flex-row">
        {/* Image */}
        {post.image && (
          <div className="sm:w-1/3">
            <img
              src={`/storage/${post.image}`} 
              alt={post.title}
              className="w-full h-48 sm:h-full object-cover"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.src = `https://picsum.photos/800/600?random=${post.id}`;
              }}
            />
          </div>
        )}

        {/* Content */}
        <div className="sm:w-2/3 p-6 flex flex-col justify-between">
          <div>
            <span className="inline-block px-3 py-1 bg-accent text-accent-foreground text-xs font-bold rounded mb-3">
              {post.category}
            </span>
            <h3 className="text-xl font-bold text-card-foreground mb-3 line-clamp-2">
              {post.title}
            </h3>
            {/* ADDED: Description display */}
            <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex gap-2 items-start">
                {/* <AlignLeft className="w-4 h-4 shrink-0 mt-1" /> */}
                {post.description}
            </p>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="w-3 h-3" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-3 h-3" />
                <span>{formattedDate}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hover Actions */}
      <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 bg-background/80 backdrop-blur"
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