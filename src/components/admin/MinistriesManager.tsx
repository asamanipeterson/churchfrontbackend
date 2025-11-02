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
import { Users, Globe, Heart, BookOpen, Music } from "lucide-react";

interface Ministry {
  id: string;
  title: string;
  description: string;
  icon: string;
  image: string;
}

const MinistriesManager = () => {
  const [ministries, setMinistries] = useState<Ministry[]>([
    {
      id: "1",
      title: "Family Ministry",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed molestie sem.",
      icon: "Users",
      image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800",
    },
    {
      id: "2",
      title: "Web Ministry",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed molestie sem.",
      icon: "Globe",
      image: "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=800",
    },
  ]);

  const [open, setOpen] = useState(false);
  const [editingMinistry, setEditingMinistry] = useState<Ministry | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    icon: "",
    image: "",
  });
  const { toast } = useToast();

  const generateId = () => Math.random().toString(36).substr(2, 9);

  /* ---------- CRUD ---------- */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingMinistry) {
      setMinistries((prev) =>
        prev.map((m) =>
          m.id === editingMinistry.id ? { ...m, ...formData } : m
        )
      );
      toast({ title: "Ministry updated successfully" });
    } else {
      const newMinistry: Ministry = {
        id: generateId(),
        ...formData,
      };
      setMinistries((prev) => [newMinistry, ...prev]);
      toast({ title: "Ministry created successfully" });
    }

    setOpen(false);
    setEditingMinistry(null);
    setFormData({ title: "", description: "", icon: "", image: "" });
  };

  const handleDelete = (id: string) => {
    setMinistries((prev) => prev.filter((m) => m.id !== id));
    toast({ title: "Ministry deleted successfully" });
  };

  const handleEdit = (ministry: Ministry) => {
    setEditingMinistry(ministry);
    setFormData({
      title: ministry.title,
      description: ministry.description,
      icon: ministry.icon,
      image: ministry.image,
    });
    setOpen(true);
  };

  const handleAddClick = () => {
    setEditingMinistry(null);
    setFormData({ title: "", description: "", icon: "", image: "" });
  };

  // Map icon name to Lucide component
  const iconMap: Record<string, React.FC<any>> = {
    Users,
    Globe,
    Heart,
    BookOpen,
    Music,
  };

  const IconComponent = ({ name }: { name: string }) => {
    const Icon = iconMap[name];
    return Icon ? <Icon className="w-6 h-6" /> : <Users className="w-6 h-6" />;
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
                placeholder="Title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />
              <Textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                required
                className="min-h-24"
              />
              <Input
                placeholder="Icon (e.g., Users, Globe, Heart)"
                value={formData.icon}
                onChange={(e) =>
                  setFormData({ ...formData, icon: e.target.value })
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
                {editingMinistry ? "Update" : "Create"} Ministry
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
            IconComponent={IconComponent}
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

/* ---------- Ministry Card (Like Posts/News) ---------- */
const MinistryCard = ({
  ministry,
  onEdit,
  onDelete,
  IconComponent,
}: {
  ministry: Ministry;
  onEdit: () => void;
  onDelete: () => void;
  IconComponent: React.FC<{ name: string }>;
}) => {
  return (
    <div className="bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 relative group border border-border cursor-pointer">
      <div className="flex flex-col sm:flex-row">
        {/* Image */}
        <div className="sm:w-1/3">
          <img
            src={ministry.image}
            alt={ministry.title}
            className="w-full h-48 sm:h-full object-cover"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = `https://picsum.photos/800/600?random=${ministry.id}`;
            }}
          />
        </div>

        {/* Content */}
        <div className="sm:w-2/3 p-6 flex flex-col justify-between">
          <div>
            {/* Icon + Title */}
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <IconComponent name={ministry.icon} />
              </div>
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