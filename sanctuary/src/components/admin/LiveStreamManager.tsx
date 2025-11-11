import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const LiveStreamManager = () => {
  const { toast } = useToast();
  const [streamSettings, setStreamSettings] = useState({
    isLive: false,
    videoUrl: "",
    title: "Sunday Service Live",
  });
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Live stream settings updated successfully" });
    setDialogOpen(false);
  };

  return (
    <div>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
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
                checked={streamSettings.isLive}
                onCheckedChange={(checked) => setStreamSettings({ ...streamSettings, isLive: checked })}
              />
              <Label>Stream is Live</Label>
            </div>
            <Input
              placeholder="Stream Title"
              value={streamSettings.title}
              onChange={(e) => setStreamSettings({ ...streamSettings, title: e.target.value })}
              required
            />
            <Input
              placeholder="YouTube Video URL"
              value={streamSettings.videoUrl}
              onChange={(e) => setStreamSettings({ ...streamSettings, videoUrl: e.target.value })}
              required
            />
            <Button type="submit" className="w-full">
              Save Settings
            </Button>
          </form>
        </DialogContent>
      </Dialog>
      
      <Card className="mt-6">
        <CardContent className="pt-6">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Current Status: <span className="font-semibold">{streamSettings.isLive ? "Live" : "Offline"}</span></p>
            <p className="text-sm text-muted-foreground">Title: <span className="font-semibold">{streamSettings.title || "Not set"}</span></p>
            <p className="text-sm text-muted-foreground">URL: <span className="font-semibold">{streamSettings.videoUrl || "Not set"}</span></p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LiveStreamManager;
