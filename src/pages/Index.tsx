import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { ArrowRight, Compass, Wallet } from "lucide-react";
import { motion } from "framer-motion";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#01040a] overflow-hidden">
      <Header />
      
      <main className="relative">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center px-4 py-24">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://cdn.theanimegallery.com/theanimegallery/b1cbddfc-8721-4ef8-80ba-ff8cb3d3c7ac-dark-anime-wallpaper.webp"
              alt="Hero Background"
              className="w-full h-full object-cover opacity-50"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#01040a]/80 via-[#01040a]/60 to-[#01040a]" />
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-7xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400"
            >
              JUMP INTO ART WORLD
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto"
            >
              Откройте для себя уникальную коллекцию цифрового искусства от талантливых художников со всего мира
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700 text-white gap-2">
                <Link to="/recommendations">
                  Explore Gallery <Compass className="w-4 h-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="gap-2">
                <Link to="/about">
                  Connect Wallet <Wallet className="w-4 h-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Featured Collection */}
        <section className="relative py-24 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold">Featured Collection</h2>
              <Button asChild variant="ghost">
                <Link to="/recommendations" className="gap-2">
                  View All <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <FeaturedCard imageUrl="https://cdn.theanimegallery.com/theanimegallery/0b8c9a1a-f67c-4a43-8bb6-7817dfcfbbea-dark-anime-wallpaper-4k.webp" number="01" />
              <FeaturedCard imageUrl="https://cdn.theanimegallery.com/theanimegallery/0b8c9a1a-f67c-4a43-8bb6-7817dfcfbbea-dark-anime-wallpaper-4k.webp" number="02" />
              <FeaturedCard imageUrl="https://cdn.theanimegallery.com/theanimegallery/0b8c9a1a-f67c-4a43-8bb6-7817dfcfbbea-dark-anime-wallpaper-4k.webp" number="03" />
              <FeaturedCard imageUrl="https://cdn.theanimegallery.com/theanimegallery/0b8c9a1a-f67c-4a43-8bb6-7817dfcfbbea-dark-anime-wallpaper-4k.webp" number="04" />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

const FeaturedCard = ({ imageUrl, number }: { imageUrl: string; number: string }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="group relative aspect-square overflow-hidden rounded-xl bg-gray-900/50 backdrop-blur-sm border border-white/10"
    >
      <img src={imageUrl} alt={`Featured ${number}`} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-300" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <span className="text-sm text-gray-400">NO. {number}</span>
      </div>
    </motion.div>
  );
};

export default Index;