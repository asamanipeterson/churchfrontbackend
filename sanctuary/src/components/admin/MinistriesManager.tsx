import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Edit, Check } from "lucide-react"; // Removed icon imports except for utility ones
import {
  Dialog,
  DialogContent, 
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Import the necessary files
import { ministrySchema, type MinistryFormData } from "@/schemas/ministry";
import { 
    fetchMinistries, 
    createMinistry, 
    updateMinistry, 
    deleteMinistry, 
    type Ministry 
} from "@/lib/ministries";


const MinistriesManager = () => {
  const [ministries, setMinistries] = useState<Ministry[]>([]);
  const [open, setOpen] = useState(false);
  const [editingMinistry, setEditingMinistry] = useState<Ministry | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // NOTE: icon field is removed from formData
  const [formData, setFormData] = useState<MinistryFormData>({
    title: "",
    description: "",
    image: undefined, 
  });
  const { toast } = useToast();

  // The icon map and IconComponent are now removed as they are no longer needed

  // ---------- Load Ministries Function ----------
  const loadMinistries = useCallback(async () => {
    try {
      const data = await fetchMinistries();
      setMinistries(data);
    } catch {
      toast({ title: "Failed to load ministries", variant: "destructive" });
    }
  }, [toast]);

  // ---------- Load data on mount ----------
  useEffect(() => {
    loadMinistries();
  }, [loadMinistries]);


  // ---------- Form Reset ----------
  const resetForm = () => {
    // Removed icon from reset
    setFormData({ title: "", description: "", image: undefined });
    setEditingMinistry(null);
  }

  /* ---------- CRUD Submission ---------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const result = ministrySchema.safeParse(formData);
    
    if (!result.success) {
        const msg = Object.values(result.error.format())
        .flatMap((e: any) => e._errors)
        .join(", ");
      
      toast({ title: "Validation error", description: msg, variant: "destructive" });
      setIsLoading(false);
      return;
    }
    
    try {
        const payloadData: MinistryFormData = result.data;

        if (editingMinistry) {
            // UPDATE
            const updated = await updateMinistry(editingMinistry.id, payloadData);
            setMinistries((prev) =>
                prev.map((m) =>
                    m.id === editingMinistry.id ? updated : m
                )
            );
            toast({ title: "Ministry updated successfully" });

        } else {
            // CREATE
            const created = await createMinistry(payloadData);
            setMinistries((prev) => [created, ...prev]);
            toast({ title: "Ministry created successfully" });
        }

        setOpen(false);
        resetForm();
    } catch (err: any) {
        toast({
            title: "Error",
            description: err.response?.data?.message || "Something went wrong saving the ministry.",
            variant: "destructive",
        });
    } finally {
        setIsLoading(false);
    }
  };

  // ---------- Delete ----------
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this ministry?")) return;

    try {
        await deleteMinistry(id);
        setMinistries((prev) => prev.filter((m) => m.id !== id));
        toast({ title: "Ministry deleted successfully" });
    } catch {
        toast({ title: "Failed to delete ministry", variant: "destructive" });
    }
  };

  // ---------- Edit setup ----------
  const handleEdit = (ministry: Ministry) => {
    setEditingMinistry(ministry);
    // Removed icon from edit data
    setFormData({
      title: ministry.title,
      description: ministry.description,
      image: undefined, 
    });
    setOpen(true);
  };

  const handleAddClick = () => {
    resetForm();
    setOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header + Add Button */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Ministries</h2>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAddClick}>
              <Plus className="w-4 h-4 mr-2" />
              Add Ministry
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingMinistry ? "Edit Ministry" : "Add New Ministry"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                placeholder="Name of Ministry"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
                disabled={isLoading}
              />
              <Textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                required
                className="min-h-24"
                disabled={isLoading}
              />
              
              {/* Removed Icon Input Field */}
              
              {/* Image File Input */}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  setFormData({ ...formData, image: file }); 
                }}
                disabled={isLoading}
                className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
              />
              {/* Display a hint for the user */}
              {editingMinistry && (
                  <p className="text-sm text-muted-foreground">
                      Current image will be kept unless a new file is selected.
                  </p>
              )}


              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Saving..." : editingMinistry ? "Update" : "Create"} Ministry
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Ministries Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {ministries.map((ministry) => (
          <MinistryCard
            key={ministry.id}
            ministry={ministry}
            onEdit={() => handleEdit(ministry)}
            onDelete={() => handleDelete(ministry.id)}
            // IconComponent prop is now removed
          />
        ))}

        {ministries.length === 0 && (
          <p className="col-span-full text-center text-muted-foreground py-12">
            No ministries yet. Add one to get started!
          </p>
        )}
      </div>
    </div>
  );
};

/* ---------- Ministry Card (Updated) ---------- */
const MinistryCard = ({
  ministry,
  onEdit,
  onDelete,
}: {
  ministry: Ministry;
  onEdit: () => void;
  onDelete: () => void;
  // IconComponent prop removed
}) => {
  // Use the storage path for the image
  const imagePath = `/storage/${ministry.image}`;

  return (
    <div className="bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 relative group border border-border cursor-pointer">
      <div className="flex flex-col sm:flex-row">
        {/* Image */}
        <div className="sm:w-1/3">
          <img
            src={imagePath} 
            alt={ministry.title}
            className="w-full h-48 sm:h-full object-cover"
            loading="lazy"
            onError={(e) => {
              // Fallback for missing images
              e.currentTarget.src = `https://picsum.photos/800/600?random=${ministry.id}`;
            }}
          />
        </div>

        {/* Content */}
        <div className="sm:w-2/3 p-6 flex flex-col justify-between">
          <div>
            {/* Title - Icon removed */}
            <div className="flex items-center gap-3 mb-3">
              <h3 className="text-xl font-bold text-card-foreground">
                {ministry.title}
              </h3>
            </div>

            {/* Description */}
            <p className="text-muted-foreground text-sm leading-relaxed">
              {ministry.description}
            </p>
          </div>
        </div>
      </div>

      {/* Hover Edit / Delete */}
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

export default MinistriesManager;