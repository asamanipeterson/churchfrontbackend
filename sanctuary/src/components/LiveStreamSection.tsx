const LiveStreamSection = () => {
  return (
    <section className="py-20 px-4 bg-card">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">Live Service</h2>
          <p className="text-muted-foreground">Join us online for our live worship service</p>
        </div>
        
        <div className="aspect-video bg-background rounded-lg overflow-hidden shadow-2xl border border-border">
          {/* Replace this with your actual YouTube/Vimeo embed code */}
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="text-6xl">📺</div>
              <h3 className="text-2xl font-semibold text-foreground">Live Stream Placeholder</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Replace this section with your YouTube or Vimeo embed code in the LiveStreamSection component
              </p>
            </div>
          </div>
          
          {/* Example YouTube embed (uncomment and replace VIDEO_ID):
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/VIDEO_ID"
            title="Live Stream"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          */}
        </div>
      </div>
    </section>
  );
};

export default LiveStreamSection;
