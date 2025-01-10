import { useState } from "react";
import { MediaGrid } from "@/components/MediaGrid";
import { Button } from "@/components/ui/button";
import { Sparkles, TrendingUp, Clock } from "lucide-react";

const GENRES = ["Action", "Romance", "Comedy", "Fantasy", "Slice of Life", "Drama", "Art", "Memes"];

const SAMPLE_MEDIA = [
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
    imageUrl: "https://img.freepik.com/premium-photo/cute-anime-girl-kawai_941097-16202.jpg",
    title: "Cherry Blossom Dreams",
    likes: 456,
    comments: 78,
    genres: ["Romance", "Art"]
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
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'recommended' | 'trending' | 'new'>('recommended');

  const filteredMedia = selectedGenre 
    ? SAMPLE_MEDIA.filter(item => item.genres.includes(selectedGenre))
    : SAMPLE_MEDIA;

  return (
    <div className="min-h-screen animate-fade-in space-y-6 max-w-7xl mx-auto px-4">
      <div className="glass rounded-lg p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent-foreground bg-clip-text text-transparent">
            Discover Amazing Content
          </h1>
          <div className="flex gap-2">
            <Button
              variant={activeTab === 'recommended' ? 'default' : 'secondary'}
              onClick={() => setActiveTab('recommended')}
              className="gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Recommended
            </Button>
            <Button
              variant={activeTab === 'trending' ? 'default' : 'secondary'}
              onClick={() => setActiveTab('trending')}
              className="gap-2"
            >
              <TrendingUp className="w-4 h-4" />
              Trending
            </Button>
            <Button
              variant={activeTab === 'new' ? 'default' : 'secondary'}
              onClick={() => setActiveTab('new')}
              className="gap-2"
            >
              <Clock className="w-4 h-4" />
              New
            </Button>
          </div>
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-primary scrollbar-track-secondary">
          {GENRES.map((genre) => (
            <Button
              key={genre}
              variant={selectedGenre === genre ? "default" : "outline"}
              onClick={() => setSelectedGenre(selectedGenre === genre ? null : genre)}
              className="whitespace-nowrap transition-all hover:scale-105"
            >
              {genre}
            </Button>
          ))}
        </div>
      </div>

      <MediaGrid items={filteredMedia} />
    </div>
  );
};

export default Recommendations;