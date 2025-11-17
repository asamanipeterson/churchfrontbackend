"use client";

import { useState, useEffect } from "react";
import { fetchStreamSettings, type LiveStreamSettings } from "@/lib/livestream";

const LiveStreamSection = () => {
  const [liveStream, setLiveStream] = useState<LiveStreamSettings | null>(null);

  // Extract YouTube Video ID
  const extractYouTubeId = (url: string): string | null => {
    const regex = /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|live\/))([^?&/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  useEffect(() => {
    const loadStream = async () => {
      try {
        const data = await fetchStreamSettings();
        setLiveStream(data);
      } catch (err) {
        console.error("Error fetching live stream:", err);
      }
    };

    loadStream();
  }, []);

  const videoId = liveStream?.videoUrl ? extractYouTubeId(liveStream.videoUrl) : null;

  return (
    <section className="py-20 px-4 bg-card">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">Live Service</h2>
          <p className="text-muted-foreground">Join us online for our live worship service</p>
        </div>

        <div className="aspect-video bg-background rounded-lg overflow-hidden shadow-2xl border border-border">

          {/* ✅ If live AND video exists → Show video */}
          {liveStream?.isLive && videoId ? (
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              title={liveStream?.title || "Live Stream"}
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          ) : (
            /* ❌ Offline placeholder */
            <div className="w-full h-full flex flex-col items-center justify-center text-center space-y-4 p-10">
              <div className="text-6xl">📺</div>
              <h3 className="text-2xl font-semibold text-foreground">
                The Stream is Currently Offline
              </h3>
              <p className="text-muted-foreground max-w-md">
                Please check back later or join us during our scheduled live worship services.
              </p>
            </div>
          )}

        </div>

        {/* Stream Title (Optional Display) */}
        {liveStream?.title && (
          <p className="text-center text-lg font-medium mt-6 text-foreground opacity-90">
            {liveStream.title}
          </p>
        )}
      </div>
    </section>
  );
};

export default LiveStreamSection;
