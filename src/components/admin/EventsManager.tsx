import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Edit, MapPin, Calendar, Clock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Event {
  id: string;
  title: string;
  date: string;
  month: string;
  time: string;
  location: string;
}

const EventsManager = () => {
  const [events, setEvents] = useState<Event[]>([
    {
      id: "1",
      title: "Reflect The Person Of Jesus Christ",
      date: "16",
      month: "Aug",
      time: "8.00 pm",
      location: "Main Sanctuary",
    },
    {
      id: "2",
      title: "Spiritually Reborn As God's Children",
      date: "20",
      month: "Sep",
      time: "8.00 pm",
      location: "Youth Hall",
    },
  ]);

  const [open, setOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    month: "",
    time: "",
    location: "EVENT LOCATION",
  });
  const { toast } = useToast();

  const generateId = () => Math.random().toString(36).substr(2, 9);

  /* ---------- CRUD ---------- */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingEvent) {
      setEvents((prev) =>
        prev.map((ev) =>
          ev.id === editingEvent.id ? { ...ev, ...formData } : ev
        )
      );
      toast({ title: "Event updated successfully" });
    } else {
      const newEvent: Event = { id: generateId(), ...formData };
      setEvents((prev) => [newEvent, ...prev]);
      toast({ title: "Event created successfully" });
    }

    setOpen(false);
    setEditingEvent(null);
    setFormData({
      title: "",
      date: "",
      month: "",
      time: "",
      location: "EVENT LOCATION",
    });
  };

  const handleDelete = (id: string) => {
    setEvents((prev) => prev.filter((ev) => ev.id !== id));
    toast({ title: "Event deleted successfully" });
  };

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      date: event.date,
      month: event.month,
      time: event.time,
      location: event.location,
    });
    setOpen(true);
  };

  const handleAddClick = () => {
    setEditingEvent(null);
    setFormData({
      title: "",
      date: "",
      month: "",
      time: "",
      location: "EVENT LOCATION",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header + Add Button */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Events</h2>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAddClick}>
              <Plus className="w-4 h-4 mr-2" />
              Add Event
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingEvent ? "Edit Event" : "Add New Event"}
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
              <div className="grid grid-cols-3 gap-2">
                <Input
                  placeholder="Date (16)"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  required
                />
                <Input
                  placeholder="Month (Aug)"
                  value={formData.month}
                  onChange={(e) =>
                    setFormData({ ...formData, month: e.target.value })
                  }
                  required
                />
                <Input
                  placeholder="Time (8.00 pm)"
                  value={formData.time}
                  onChange={(e) =>
                    setFormData({ ...formData, time: e.target.value })
                  }
                  required
                />
              </div>
              <Input
                placeholder="Location"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                required
              />
              <Button type="submit" className="w-full">
                {editingEvent ? "Update" : "Create"} Event
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Events Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {events.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onEdit={() => handleEdit(event)}
            onDelete={() => handleDelete(event.id)}
          />
        ))}

        {events.length === 0 && (
          <p className="col-span-full text-center text-muted-foreground py-12">
            No events yet. Add one to get started!
          </p>
        )}
      </div>
    </div>
  );
};

/* ---------- Event Card (Creative & Beautiful) ---------- */
const EventCard = ({
  event,
  onEdit,
  onDelete,
}: {
  event: Event;
  onEdit: () => void;
  onDelete: () => void;
}) => {
  return (
    <div className="bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 relative group border border-border cursor-pointer">
      {/* Date Badge */}
      <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-bold shadow-md z-10">
        {event.date} {event.month}
      </div>

      <div className="p-6 pt-14">
        <h3 className="text-xl font-bold text-card-foreground mb-3 line-clamp-2">
          {event.title}
        </h3>

        {/* Time & Location */}
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" />
            <span>{event.location}</span>
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

      {/* Optional: Add a subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none" />
    </div>
  );
};

export default EventsManager;