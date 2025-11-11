import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Users, Globe, HandHeart, BookOpen, Heart, School } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Ministry {
  id: string;
  icon: any;
  title: string;
  description: string;
  image: string;
}

const iconMap: Record<string, any> = {
  Users,
  Globe,
  HandHeart,
  BookOpen,
  Heart,
  School,
};

const Ministries = () => {
  const ministries: Ministry[] = [
    { 
      id: "1", 
      icon: Globe, 
      title: "Web Ministry", 
      description: "Children's ministry is the most important ministry in our church. This ministry helps kids learn about the", 
      image: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=800" 
    },
    { 
      id: "2", 
      icon: HandHeart, 
      title: "Help Ministry", 
      description: "Children's ministry is the most important ministry in our church. This ministry helps kids learn about the", 
      image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=800" 
    },
    { 
      id: "3", 
      icon: Users, 
      title: "Prison Ministry", 
      description: "Children's ministry is the most important ministry in our church. This ministry helps kids learn about the", 
      image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=800" 
    },
    { 
      id: "4", 
      icon: Heart, 
      title: "Family Ministry", 
      description: "Children's ministry is the most important ministry in our church. This ministry helps kids learn about the", 
      image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=800" 
    },
    { 
      id: "5", 
      icon: BookOpen, 
      title: "Music Ministry", 
      description: "Children's ministry is the most important ministry in our church. This ministry helps kids learn about the", 
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800" 
    },
    { 
      id: "6", 
      icon: School, 
      title: "Global Ministry", 
      description: "Children's ministry is the most important ministry in our church. This ministry helps kids learn about the", 
      image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=800" 
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-[300px] flex items-center justify-center bg-gradient-to-b from-primary/30 to-primary/10">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=1200')] bg-cover bg-center opacity-100"></div>
        <div className="relative text-center">
          {/* <p className="text-accent text-sm font-bold mb-2 tracking-wider">Ministries All</p> */}
          <h1 className="text-5xl md:text-6xl font-bold text-primary-foreground">Ministries All</h1>
        </div>
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-accent rounded-full flex items-center justify-center shadow-lg p-3">
          <img src="/images/cross.png" alt="Cross" className="w-full h-full object-contain brightness-0 invert" />
        </div>
      </section>

      {/* Ministries Grid */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {ministries.map((ministry) => (
              <MinistryCard key={ministry.id} ministry={ministry} />
            ))}
          </div>
          
          <div className="text-center">
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 text-base">
              View All Ministries
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

const MinistryCard = ({ ministry }: { ministry: Ministry }) => {
  const Icon = ministry.icon;
  
  return (
    <div className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border-b-4 border-accent">
      <div className="relative overflow-hidden h-56">
        <img 
          src={ministry.image} 
          alt={ministry.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Hover overlay with wine color */}
        <div className="absolute inset-0 bg-accent/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="w-16 h-16 opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-50 group-hover:scale-100">
            <img src="/images/cross.png" alt="Cross" className="w-full h-full object-contain brightness-0 invert" />
          </div>
        </div>
      </div>
      <div className="p-6 bg-white">
        <h3 className="text-xl font-bold text-gray-900 mb-3">{ministry.title}</h3>
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">{ministry.description}</p>
        <button className="text-accent font-semibold hover:underline transition-all">
          Read More
        </button>
      </div>
    </div>
  );
};

export default Ministries;
