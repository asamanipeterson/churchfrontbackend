import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

import PostsManager from "@/components/admin/PostsManager";
import EventsManager from "@/components/admin/EventsManager";
import NewsManager from "@/components/admin/NewsManager";
import MinistriesManager from "@/components/admin/MinistriesManager";
import LiveStreamManager from "@/components/admin/LiveStreamManager";

const Admin = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  // Optional: Simulate sign out
  const handleSignOut = () => {
    toast({ title: "Signed out successfully" });
    navigate("/auth"); // Uncomment when auth is added
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
          <Button variant="outline" onClick={handleSignOut}>
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="grid w-full grid-cols-5 gap-1">
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="news">News</TabsTrigger>
            <TabsTrigger value="ministries">Ministries</TabsTrigger>
            <TabsTrigger value="stream">Live Stream</TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="mt-6">
            <PostsManager />
          </TabsContent>

          <TabsContent value="events" className="mt-6">
            <EventsManager />
          </TabsContent>

          <TabsContent value="news" className="mt-6">
            <NewsManager />
          </TabsContent>

          <TabsContent value="ministries" className="mt-6">
            <MinistriesManager />
          </TabsContent>

          <TabsContent value="stream" className="mt-6">
            <LiveStreamManager />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;