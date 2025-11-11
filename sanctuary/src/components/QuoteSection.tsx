const QuoteSection = () => {
  return (
    <section className="relative py-24 px-4 overflow-hidden">
      {/* Background with darker overlay */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2073')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/85"></div>
      </div>
      
      <div className="container mx-auto max-w-4xl relative z-10 text-center">
        <div className="w-16 h-16 mx-auto mb-6 bg-accent rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-accent-foreground" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/>
          </svg>
        </div>
        <blockquote className="text-2xl md:text-4xl font-bold text-white mb-6 leading-relaxed">
          "Pray! And listen to God! You can do this alone, but find somebody to do it with you"
        </blockquote>
        <p className="text-white/70 text-lg">
          Everything from <span className="text-accent font-semibold">Jesus over Sermon</span>
        </p>
        <button className="mt-8 px-8 py-3 border-2 border-accent text-accent font-semibold rounded hover:bg-accent hover:text-accent-foreground transition-all">
          KNOW A BIT MORE
        </button>
      </div>
    </section>
  );
};

export default QuoteSection;
