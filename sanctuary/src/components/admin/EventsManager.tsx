// src/app/events/page.ts
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Edit, MapPin, Clock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,  
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  createEvent,
  updateEvent,
  deleteEvent,
  fetchEvents,
  type Event,
} from "@/lib/events";
import { eventSchema, type EventFormData } from "@/schemas/event";

const EventsManager = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [open, setOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<EventFormData>({
    title: "",
    date: "",
    month: "",
    time: "",
    location: "EVENT LOCATION",
    image: undefined,
  });

  const { toast } = useToast();

  // ---------- Load events ----------
  useEffect(() => {
    (async () => {
      try {
        const data = await fetchEvents();
        setEvents(data);
      } catch {
        toast({ title: "Failed to load events", variant: "destructive" });
      }
    })();
  }, [toast]);

  // ---------- Form reset ----------
  const resetForm = () => {
    setFormData({
      title: "",
      date: "",
      month: "",
      time: "",
      location: "EVENT LOCATION",
      image: undefined,
    });
    setEditingEvent(null);
  };

  // ---------- Submit ----------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const result = eventSchema.safeParse(formData);
    if (!result.success) {
      const msg = Object.values(result.error.format())
        .flatMap((e: any) => e._errors)
        .join(", ");
      toast({ title: "Validation error", description: msg, variant: "destructive" });
      setIsLoading(false);
      return;
    }

    try {
      if (editingEvent) {
        const updated = await updateEvent(editingEvent.id, result.data);
        setEvents((prev) =>
          prev.map((ev) => (ev.id === editingEvent.id ? updated : ev))
        );
        toast({ title: "Event updated" });
      } else {
        const created = await createEvent(result.data);
        setEvents((prev) => [created, ...prev]);
        toast({ title: "Event created" });
      }
      setOpen(false);
      resetForm();
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.response?.data?.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // ---------- Delete ----------
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this event?")) return;
    try {
      await deleteEvent(id);
      setEvents((prev) => prev.filter((ev) => ev.id !== id));
      toast({ title: "Event deleted" });
    } catch {
      toast({ title: "Failed to delete", variant: "destructive" });
    }
  };

  // ---------- Edit ----------
  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      date: event.date,
      month: event.month,
      time: event.time,
      location: event.location,
      image: undefined,
    });
    setOpen(true);
  };

  // ---------- Open add dialog ----------
  const handleAddClick = () => {
    resetForm();
    setOpen(true);
  };

  return (
    <div className="space-y-6 p-4 max-w-5xl mx-auto">
      {/* Header */}
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
  {/* Date */}
  <Input
    placeholder="Date (1-31)"
    type="number"
    min="1"
    max="31"
    value={formData.date}
    onChange={(e) => {
      const value = e.target.value.replace(/\D/g, ""); // restrict to digits
      setFormData({ ...formData, date: value });
    }}
    required
  />

  {/* Month Dropdown */}
  <select
    value={formData.month}
    onChange={(e) => setFormData({ ...formData, month: e.target.value })}
    className="w-full border border-input rounded-md px-3 py-2"
    required
  >
    <option value="">Month</option>
    {["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].map((m) => (
      <option key={m} value={m}>{m}</option>
    ))}
  </select>

  {/* Time Auto-format */}
  <Input
    placeholder="8:00 pm"
    value={formData.time}
    onChange={(e) => {
      let value = e.target.value.toLowerCase();

      // Convert "8.00pm" or "8:00pm" -> uniform format
      value = value
        .replace(/ /g, "")      // remove spaces
        .replace(/(\d)(am|pm)/, "$1 $2") // add space before am/pm
        .replace(/:/, ".");     // replace ":" with "."

      setFormData({ ...formData, time: value });
    }}
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

              {/* Image upload */}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setFormData({ ...formData, image: file });
                }}
                className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
              />
              {formData.image && (
                <p className="text-sm text-muted-foreground">
                  Selected: {formData.image.name}
                </p>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading
                  ? "Saving..."
                  : editingEvent
                  ? "Update"
                  : "Create"}
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

/* ---------- Event Card (Styled as Post Card) ---------- */
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
    // 1. Updated Outer Div to match PostCard styling
    <div className="bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow relative group cursor-pointer">
      
      {/* 2. Added responsive flex wrapper to achieve horizontal layout */}
      <div className="flex flex-col sm:flex-row">
        
        {/* Image - Styled for horizontal layout (1/3 width on sm and up) */}
        {event.image && (
          <div className="sm:w-1/3"> 
          <img
            src={`/storage/${event.image}`}
            alt={event.title}
            // Adjusted height for responsive layout: h-48 for mobile, h-full for desktop
            className="w-full h-48 sm:h-full object-cover"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = `https://picsum.photos/800/600?random=${event.id}`;
            }}
          />
          </div>
        )}

        {/* 3. Original Date badge (Absolute positioning adjusted for mobile) */}
        <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-bold shadow-md z-10 sm:hidden">
          {event.date} {event.month}
        </div>

        {/* 4. Content Area - Styled for horizontal layout (2/3 width) and padding */}
        <div className="sm:w-2/3 p-6 flex flex-col justify-between"> 
          <div>
            {/* Date badge: Added visible date badge for desktop view (mimicking category badge) */}
            <span className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-bold shadow-md z-10">
              {event.date} {event.month}
            </span>

            {/* Title */}
            <h3 className="text-xl font-bold text-card-foreground mb-3 line-clamp-2">
              {event.title}
            </h3>

            {/* Event details (Time and Location) */}
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
        </div>

      </div> {/* End of flex wrapper */}

      {/* Hover actions - Kept the same styling */}
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

export default EventsManager;