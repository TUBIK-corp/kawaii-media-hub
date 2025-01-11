import { useState } from "react";
import { MediaGrid } from "@/components/MediaGrid";
import { Button } from "@/components/ui/button";
import { Sparkles, TrendingUp, Clock } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import Particles from "react-particles";
import { loadFull } from "tsparticles";
import type { Engine } from "tsparticles-engine";
import { SearchPanel } from "@/components/SearchPanel";

export const SAMPLE_MEDIA = [
  {
    id: "1",
    imageUrl: "https://img.freepik.com/premium-photo/cute-anime-girl-kawai_941097-16202.jpg",
    title: "Kawaii Dreams",
    likes: 342,
    comments: 56,
    genres: ["Art", "Fantasy"]
  },
  {
    id: "2",
    imageUrl: "https://cdn.pixabay.com/photo/2022/12/03/15/00/anime-7632903_1280.jpg",
    title: "Magical Forest",
    likes: 567,
    comments: 89,
    genres: ["Fantasy", "Art"]
  },
  {
    id: "3",
    imageUrl: "https://cdn.pixabay.com/photo/2023/03/31/12/44/anime-7888413_1280.jpg",
    title: "Urban Adventures",
    likes: 234,
    comments: 45,
    genres: ["Action", "Comedy"]
  },
  {
    id: "4",
    imageUrl: "https://cdn.pixabay.com/photo/2022/12/03/15/00/anime-girl-7632904_1280.jpg",
    title: "Sunset Memories",
    likes: 789,
    comments: 123,
    genres: ["Slice of Life", "Romance"]
  },
  {
    id: "5",
    imageUrl: "https://cdn5.vectorstock.com/i/1000x1000/65/54/cute-anime-girl-in-black-hoodie-and-green-eyes-vector-39706554.jpg",
    title: "Mystic Eyes",
    likes: 456,
    comments: 78,
    genres: ["Mystery", "Drama"]
  },
  {
    id: "6",
    imageUrl: "https://cdn.pixabay.com/photo/2023/03/31/12/45/anime-7888415_1280.jpg",
    title: "Neon City Lights",
    likes: 678,
    comments: 91,
    genres: ["Fantasy", "Action"]
  }
];

const Recommendations = () => {
  const [activeTab, setActiveTab] = useState<'recommended' | 'trending' | 'new'>('recommended');
  const [includedGenres, setIncludedGenres] = useState<string[]>([]);
  const [excludedGenres, setExcludedGenres] = useState<string[]>([]);
  const isMobile = useIsMobile();

  const handleSearch = (included: string[], excluded: string[]) => {
    setIncludedGenres(included);
    setExcludedGenres(excluded);
  };

  const filteredMedia = SAMPLE_MEDIA.filter(item => {
    const hasIncludedGenres = includedGenres.length === 0 || 
      includedGenres.some(genre => item.genres.includes(genre));
    const hasNoExcludedGenres = excludedGenres.length === 0 || 
      !excludedGenres.some(genre => item.genres.includes(genre));
    return hasIncludedGenres && hasNoExcludedGenres;
  });

  const particlesInit = async (engine: Engine) => {
    await loadFull(engine);
  };

  return (
    <div className="min-h-screen w-full m-0 p-0 relative">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: {
            color: {
              value: "transparent",
            },
          },
          particles: {
            number: {
              value: 50,
              density: {
                enable: true,
                value_area: 800,
              },
            },
            color: {
              value: "#7E69AB",
            },
            shape: {
              type: "circle",
            },
            opacity: {
              value: 0.5,
              random: true,
            },
            size: {
              value: 3,
              random: true,
            },
            move: {
              enable: true,
              speed: 1,
              direction: "none",
              random: true,
              straight: false,
              out_mode: "out",
              bounce: false,
            },
          },
          interactivity: {
            detect_on: "canvas",
            events: {
              onhover: {
                enable: true,
                mode: "repulse",
              },
            },
          },
        }}
      />
      
      <SearchPanel onSearch={handleSearch} />
      
      <div className="relative z-10 animate-fade-in space-y-4 md:space-y-6 w-full px-4 md:px-8">
        <div className="glass rounded-lg p-3 md:p-6 space-y-4 md:space-y-6 max-w-[1920px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h1 className="text-xl md:text-3xl font-bold gradient-text">
              Discover Amazing Content
            </h1>
            <div className="flex flex-wrap md:flex-nowrap gap-2">
              <Button
                size={isMobile ? "sm" : "default"}
                variant={activeTab === 'recommended' ? 'default' : 'secondary'}
                onClick={() => setActiveTab('recommended')}
                className="flex-1 md:flex-none gap-2"
              >
                <Sparkles className="w-4 h-4" />
                {!isMobile && "Recommended"}
              </Button>
              <Button
                size={isMobile ? "sm" : "default"}
                variant={activeTab === 'trending' ? 'default' : 'secondary'}
                onClick={() => setActiveTab('trending')}
                className="flex-1 md:flex-none gap-2"
              >
                <TrendingUp className="w-4 h-4" />
                {!isMobile && "Trending"}
              </Button>
              <Button
                size={isMobile ? "sm" : "default"}
                variant={activeTab === 'new' ? 'default' : 'secondary'}
                onClick={() => setActiveTab('new')}
                className="flex-1 md:flex-none gap-2"
              >
                <Clock className="w-4 h-4" />
                {!isMobile && "New"}
              </Button>
            </div>
          </div>
        </div>

        <div className="max-w-[1920px] mx-auto">
          <MediaGrid items={filteredMedia} />
        </div>
      </div>
    </div>
  );
};

export default Recommendations;