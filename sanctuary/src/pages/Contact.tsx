import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { MapPin, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const contactFormSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  phone: z.string().trim().min(1, "Phone is required").max(20, "Phone must be less than 20 characters"),
  message: z.string().trim().min(1, "Message is required").max(1000, "Message must be less than 1000 characters"),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const Contact = () => {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    console.log("Form submitted:", data);
    toast.success("Message sent successfully!");
    form.reset();
  };

  return (
    <div className="min-h-screen bg-background dark">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-[300px] flex items-center justify-center bg-gradient-to-b from-primary/20 to-background">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=1200')] bg-cover bg-center opacity-20"></div>
        <div className="relative text-center">
          <p className="text-accent text-sm font-bold mb-2 tracking-wider">GET IN TOUCH</p>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground">Contact Us</h1>
        </div>
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-accent rounded-full flex items-center justify-center shadow-lg p-3">
          <img src="/images/cross.png" alt="Cross" className="w-full h-full object-contain brightness-0 invert" />
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {/* Location Card */}
            <div className="relative rounded-lg p-8 text-center shadow-lg overflow-hidden min-h-[220px]">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1477281765962-ef34e8bb0967?q=80&w=800')] bg-cover bg-center"></div>
              <div className="absolute inset-0 bg-accent/90"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-full bg-accent-foreground/20 flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-bold text-accent-foreground mb-3">Our Location</h3>
                <p className="text-accent-foreground/90 text-sm leading-relaxed">
                  684 West College St, Sun City,<br />
                  United States America
                </p>
              </div>
            </div>

            {/* Phone Card */}
            <div className="relative rounded-lg p-8 text-center shadow-lg overflow-hidden min-h-[220px]">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1423666639041-f56000c27a9a?q=80&w=800')] bg-cover bg-center"></div>
              <div className="absolute inset-0 bg-primary/90"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-full bg-primary-foreground/20 flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold text-primary-foreground mb-3">Phone Number</h3>
                <p className="text-primary-foreground/90 text-sm leading-relaxed">
                  (+55) 654-5418<br />
                  (+55) 654-545-1235
                </p>
              </div>
            </div>

            {/* Email Card */}
            <div className="relative rounded-lg p-8 text-center shadow-lg overflow-hidden min-h-[220px]">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1526413232644-8a40f03cc03b?q=80&w=800')] bg-cover bg-center"></div>
              <div className="absolute inset-0 bg-primary/90"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-full bg-primary-foreground/20 flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold text-primary-foreground mb-3">Email Address</h3>
                <p className="text-primary-foreground/90 text-sm leading-relaxed">
                  info@example.com<br />
                  info@zegen.com
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form Section - Updated: Equal Height */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Form */}
            <div className="bg-card rounded-lg p-8 shadow-lg flex flex-col h-full">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1 flex flex-col">
                  <div className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} className="p-6"/>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="Your email" {...field} className="p-6"/>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input placeholder="Your phone" {...field} className="p-6"/>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Type your message here..." 
                              className="min-h-[120px] resize-none"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground mt-6"
                  >
                    Send Now
                  </Button>
                </form>
              </Form>
            </div>

            {/* Image - Matches Form Height */}
            <div className="relative overflow-hidden rounded-lg shadow-lg h-full">
              <img 
                src="https://elementor.zozothemes.com/zegen/wp-content/uploads/sites/2/elementor/thumbs/contact-bg-5-1-1-p1y0pte6gylmbsnugittl47iqk4aycy6wipxnzqfe2.jpg" 
                alt="Non Profit WordPress Theme" 
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-card rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1422937950147!2d-73.98731968459391!3d40.74844097932681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1234567890123"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;