import { Users, Heart } from "lucide-react";

const AboutSection = () => {
  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1519491050282-cf00c82424b4?q=80&w=1200"
              alt="Church interior"
              className="rounded-lg shadow-2xl w-full"
            />
          </div>
          <div>
            <p className="text-accent text-sm font-bold mb-3 tracking-wider">ABOUT US</p>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              We are Taking Small Steps to Make Earth Better Place
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              This seems a little absurd to observe places. We experience this that we know that this exists very strong.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-accent-foreground" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-1">Place of Worship</h3>
                  <p className="text-sm text-muted-foreground">Lorem ipsum dolor sit amet, adipiscing elit.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-accent-foreground" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-1">Prayerful Lives</h3>
                  <p className="text-sm text-muted-foreground">Lorem ipsum dolor sit amet, adipiscing elit.</p>
                </div>
              </div>
            </div>
            <button className="px-8 py-3 bg-accent text-accent-foreground font-semibold rounded hover:bg-accent/90 transition-all hover:scale-105">
              DISCOVER MORE
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
