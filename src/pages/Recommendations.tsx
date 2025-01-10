import { useState } from "react";
import { MediaGrid } from "@/components/MediaGrid";
import { Button } from "@/components/ui/button";

const GENRES = ["Action", "Romance", "Comedy", "Fantasy", "Slice of Life", "Drama"];

const SAMPLE_MEDIA = [
  {
    id: "1",
    imageUrl: "https://cdn.pixabay.com/photo/2023/03/31/12/45/anime-7888415_1280.jpg",
    title: "Cherry Blossom Dreams",
    likes: 342,
    comments: 56,
    genres: ["Romance", "Drama"]
  },
  {
    id: "2",
    imageUrl: "https://cdn.pixabay.com/photo/2022/12/03/15/00/anime-7632903_1280.jpg",
    title: "Magical Forest",
    likes: 567,
    comments: 89,
    genres: ["Fantasy", "Action"]
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
  }
];

const Recommendations = () => {
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  const filteredMedia = selectedGenre 
    ? SAMPLE_MEDIA.filter(item => item.genres.includes(selectedGenre))
    : SAMPLE_MEDIA;

  return (
    <div className="min-h-screen animate-fade-in">
      <div className="glass mx-4 mt-4 p-4 rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Recommended for You</h1>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {GENRES.map((genre) => (
            <Button
              key={genre}
              variant={selectedGenre === genre ? "default" : "outline"}
              onClick={() => setSelectedGenre(selectedGenre === genre ? null : genre)}
              className="whitespace-nowrap"
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