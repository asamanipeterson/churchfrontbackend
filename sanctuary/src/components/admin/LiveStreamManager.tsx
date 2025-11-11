"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

import { 
  fetchStreamSettings, 
  updateStreamSettings, 
  type LiveStreamSettings 
} from "@/lib/livestream";

import { liveStreamSchema, type LiveStreamFormData } from "@/schemas/livestream";

const LiveStreamManager = () => {
  const { toast } = useToast();

  const [liveStream, setLiveStream] = useState<LiveStreamSettings>({
    id: 0,
    isLive: false,
    videoUrl: "",
    title: "",
  });

  const [dialogOpen, setDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState<LiveStreamFormData>({
    isLive: false,
    videoUrl: "",
    title: "",
  });

  // Extract YouTube Video ID
  const extractYouTubeId = (url: string): string | null => {
  // Match /live/ or /watch?v= or youtu.be/ formats
  const regex = /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|live\/))([^?&/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};


  // Load live stream settings
  const loadSettings = useCallback(async () => {
    try {
      const data = await fetchStreamSettings();
      setLiveStream(data);

      setFormData({
        isLive: data.isLive,
        videoUrl: data.videoUrl || "",
        title: data.title || "",
      });
    } catch {
      toast({ title: "Failed to load live stream settings", variant: "destructive" });
    }
  }, [toast]);

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  // Save/Update live stream
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const result = liveStreamSchema.safeParse(formData);
    if (!result.success) {
      const msg = Object.values(result.error.format()).flatMap((e: any) => e._errors).join(", ");
      toast({ title: "Validation error", description: msg, variant: "destructive" });
      setIsLoading(false);
      return;
    }

    try {
      const updated = await updateStreamSettings(result.data);
      setLiveStream(updated);
      toast({ title: "Live stream settings updated successfully" });
      setDialogOpen(false);
    } catch (err: any) {
      toast({
        title: "Error saving settings",
        description: err.response?.data?.message || "Something went wrong.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDialogOpen = (open: boolean) => {
    setDialogOpen(open);
    if (open) {
      setFormData({
        isLive: liveStream.isLive,
        videoUrl: liveStream.videoUrl,
        title: liveStream.title,
      });
    }
  };

  return (
    <div className="p-6">
      {/* Config Dialog */}
      <Dialog open={dialogOpen} onOpenChange={handleDialogOpen}>
        <DialogTrigger asChild>
          <Button>
            <Settings className="w-4 h-4 mr-2" />
            Configure Live Stream
          </Button>
        </DialogTrigger>

        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Live Stream Settings</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch
                checked={formData.isLive}
                onCheckedChange={(checked) => setFormData({ ...formData, isLive: checked })}
                disabled={isLoading}
              />
              <Label>Stream is Live</Label>
            </div>

            <Input
              placeholder="Stream Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              disabled={isLoading}
              required
            />

            <Input
              placeholder="YouTube Video URL"
              value={formData.videoUrl}
              onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
              disabled={isLoading}
              required
            />

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Settings"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Status Card */}
      <Card className="mt-6">
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold mb-3">Current Stream Status</h3>
          <p className="text-sm">
            Status:{" "}
            <span className={`font-bold ${liveStream.isLive ? "text-green-600" : "text-red-600"}`}>
              {liveStream.isLive ? "LIVE" : "OFFLINE"}
            </span>
          </p>
          <p className="text-sm">Title: <strong>{liveStream.title || "Not set"}</strong></p>
          <p className="text-sm">URL: <strong>{liveStream.videoUrl || "Not set"}</strong></p>
        </CardContent>
      </Card>

      {/* Embedded YouTube Video */}
      {liveStream.isLive && extractYouTubeId(liveStream.videoUrl) && (
        <div className="mt-6">
          <div className="relative w-full aspect-video rounded overflow-hidden shadow-lg">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${extractYouTubeId(liveStream.videoUrl)}?autoplay=1`}
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveStreamManager;
