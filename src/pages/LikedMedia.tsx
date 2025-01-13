import { Header } from "@/components/Header";
import { MediaGrid } from "@/components/MediaGrid";
import { Heart } from "lucide-react";

const LIKED_MEDIA = [
  {
    id: "1",
    imageUrl: "https://img.freepik.com/premium-photo/cute-anime-girl-kawai_941097-16202.jpg",
    title: "Kawaii Dreams",
    likes: 342,
    comments: 56,
    genres: ["Art", "Fantasy"]
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

const LikedMedia = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary via-secondary/95 to-secondary/90">
      <Header />
      
      <div className="container mx-auto px-4 pt-24">
        <div className="glass-panel p-6 md:p-8 mb-8">
          <div className="flex items-center gap-4">
            <Heart className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-2xl md:text-3xl font-bold gradient-text">
                Понравившиеся медиа
              </h1>
              <p className="text-gray-400">
                Ваша коллекция сохраненных работ
              </p>
            </div>
          </div>
        </div>

        <MediaGrid items={LIKED_MEDIA} />
      </div>
    </div>
  );
};

export default LikedMedia;