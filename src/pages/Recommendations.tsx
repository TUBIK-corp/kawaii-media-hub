import { useState } from "react";
import { MediaGrid } from "@/components/MediaGrid";
import { Button } from "@/components/ui/button";
import { Sparkles, TrendingUp, Clock } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import Particles from "react-particles";
import { loadFull } from "tsparticles-engine";
import type { Engine } from "tsparticles-engine";
import { SearchPanel } from "@/components/SearchPanel";
import { Header } from "@/components/Header";

export const SAMPLE_MEDIA = [
  {
    id: "1",
    imageUrl: "https://img.freepik.com/premium-photo/cute-anime-girl-kawai_941097-16202.jpg",
    title: "Kawaii Dreams",
    likes: 342,
    comments: 56,
    genres: ["Art", "Fantasy"],
    type: "image"
  },
  {
    id: "2",
    imageUrl: "https://cdn.pixabay.com/photo/2022/12/03/15/00/anime-7632903_1280.jpg",
    title: "Magical Forest",
    likes: 567,
    comments: 89,
    genres: ["Fantasy", "Art"],
    type: "image"
  },
  {
    id: "3",
    videoUrl: "https://example.com/sample.mp4",
    thumbnailUrl: "https://cdn.pixabay.com/photo/2023/03/31/12/44/anime-7888413_1280.jpg",
    title: "Urban Adventures",
    likes: 234,
    comments: 45,
    genres: ["Action", "Comedy"],
    type: "video"
  },
  {
    id: "4",
    imageUrl: "https://cdn.pixabay.com/photo/2022/12/03/15/00/anime-girl-7632904_1280.jpg",
    title: "Sunset Memories",
    likes: 789,
    comments: 123,
    genres: ["Slice of Life", "Romance"],
    type: "image"
  },
  {
    id: "5",
    gifUrl: "https://example.com/sample.gif",
    thumbnailUrl: "https://cdn5.vectorstock.com/i/1000x1000/65/54/cute-anime-girl-in-black-hoodie-and-green-eyes-vector-39706554.jpg",
    title: "Mystic Eyes",
    likes: 456,
    comments: 78,
    genres: ["Mystery", "Drama"],
    type: "gif"
  },
  {
    id: "6",
    imageUrl: "https://cdn.pixabay.com/photo/2023/03/31/12/45/anime-7888415_1280.jpg",
    title: "Neon City Lights",
    likes: 678,
    comments: 91,
    genres: ["Fantasy", "Action"],
    type: "image"
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
    <div 
      className="min-h-screen w-full relative bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://avatars.mds.yandex.net/i?id=4270b6a4bd492de86b93e52ff57ee426_l-4335903-images-thumbs&n=33&w=1728&h=1080')`,
      }}
    >
      <Header />
      
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: { value: "transparent" } },
          particles: {
            number: { value: 30, density: { enable: true, value_area: 1000 } },
            color: { value: "#4f46e5" },
            shape: { type: "circle" },
            opacity: { value: 0.2, random: true },
            size: { value: 3, random: true },
            move: {
              enable: true,
              speed: 0.5,
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
              onhover: { enable: true, mode: "repulse" },
            },
          },
        }}
      />
      
      <SearchPanel onSearch={handleSearch} />
      
      <div className="relative z-10 pt-24 animate-fade-in">
        <div className="glass-panel mx-6 p-6 md:p-8 space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold gradient-text">
                Медиа Галерея
              </h1>
              <p className="text-gray-400 text-sm md:text-base">
                Исследуйте нашу коллекцию уникальных работ
              </p>
            </div>
            <div className="flex flex-wrap md:flex-nowrap gap-3 w-full md:w-auto justify-center">
              <Button
                size={isMobile ? "sm" : "default"}
                variant={activeTab === 'recommended' ? 'default' : 'secondary'}
                onClick={() => setActiveTab('recommended')}
                className={`flex-1 md:flex-none gap-2 ${activeTab === 'recommended' ? 'shadow-lg shadow-primary/20' : ''}`}
              >
                <Sparkles className="w-4 h-4" />
                <span className={isMobile ? 'hidden' : 'inline'}>Рекомендации</span>
              </Button>
              <Button
                size={isMobile ? "sm" : "default"}
                variant={activeTab === 'trending' ? 'default' : 'secondary'}
                onClick={() => setActiveTab('trending')}
                className={`flex-1 md:flex-none gap-2 ${activeTab === 'trending' ? 'shadow-lg shadow-primary/20' : ''}`}
              >
                <TrendingUp className="w-4 h-4" />
                <span className={isMobile ? 'hidden' : 'inline'}>Популярное</span>
              </Button>
              <Button
                size={isMobile ? "sm" : "default"}
                variant={activeTab === 'new' ? 'default' : 'secondary'}
                onClick={() => setActiveTab('new')}
                className={`flex-1 md:flex-none gap-2 ${activeTab === 'new' ? 'shadow-lg shadow-primary/20' : ''}`}
              >
                <Clock className="w-4 h-4" />
                <span className={isMobile ? 'hidden' : 'inline'}>Новое</span>
              </Button>
            </div>
          </div>
        </div>

        <MediaGrid items={filteredMedia} />
      </div>
    </div>
  );
};

export default Recommendations;