import { Phone, Mail, MapPin } from "lucide-react";

const ContactSection = () => {
  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Background with darker overlay */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2073')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/85"></div>
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Call Us */}
          <div className="bg-accent p-10 rounded-lg text-center">
            <div className="w-16 h-16 bg-accent-foreground/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Phone className="w-8 h-8 text-accent-foreground" />
            </div>
            <h3 className="text-2xl font-bold text-accent-foreground mb-4">Call Us</h3>
            <p className="text-accent-foreground/80 mb-6">
              Need to talk with us? Feel free to get in touch. We're always ready to help.
            </p>
            <a href="tel:+123456789" className="text-3xl font-bold text-accent-foreground hover:opacity-80 transition-opacity">
              +1 (123) 456-789
            </a>
          </div>

          {/* Contact Us Form */}
          <div className="bg-card p-10 rounded-lg">
            <h3 className="text-2xl font-bold text-card-foreground mb-4">Don't Hesitate Contact Us</h3>
            <p className="text-muted-foreground text-sm mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sollicitudin elementum lorem gravida tincidunt.
            </p>
            <form className="space-y-4">
              <input 
                type="text" 
                placeholder="Your Name" 
                className="w-full px-4 py-3 bg-background border border-border rounded focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <input 
                type="email" 
                placeholder="Your Email" 
                className="w-full px-4 py-3 bg-background border border-border rounded focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <textarea 
                placeholder="Your Message" 
                rows={4}
                className="w-full px-4 py-3 bg-background border border-border rounded focus:outline-none focus:ring-2 focus:ring-accent resize-none"
              ></textarea>
              <button 
                type="submit"
                className="w-full px-8 py-3 bg-accent text-accent-foreground font-semibold rounded hover:bg-accent/90 transition-all"
              >
                SUBMIT NOW
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
