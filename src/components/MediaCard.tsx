import { Heart, MessageCircle, Share2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";

interface MediaCardProps {
  id: string;
  imageUrl: string;
  title: string;
  likes: number;
  comments: number;
  genres: string[];
}

export const MediaCard = ({ id, imageUrl, title, likes: initialLikes, comments, genres }: MediaCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(initialLikes);
  const isMobile = useIsMobile();
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
    toast.success(isLiked ? "Удалено из избранного" : "Добавлено в избранное");
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(window.location.origin + `/media/${id}`);
    toast.success("Ссылка скопирована!");
  };

  return (
    <div className="group relative overflow-hidden rounded-lg bg-[#01040a]/80 border border-primary/10 hover:border-primary/30 transition-all duration-300">
      <Link to={`/media/${id}`} className="block">
        <div className="relative aspect-[3/4]">
          <img 
            src={imageUrl} 
            alt={title}
            className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 
                       ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImageLoaded(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#01040a] via-[#01040a]/70 to-transparent opacity-90" />
          
          <div className="absolute inset-x-0 bottom-0 p-4 space-y-3">
            <h3 className="text-xl font-semibold text-white/90 line-clamp-2 group-hover:text-primary transition-colors">
              {title}
            </h3>
            
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <button onClick={handleLike} className="flex items-center gap-2 hover:text-primary transition-colors">
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-primary text-primary' : ''}`} />
                <span>{likes}</span>
              </button>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                <span>{comments}</span>
              </div>
              <button onClick={handleShare} className="flex items-center gap-2 hover:text-primary transition-colors ml-auto">
                <Share2 className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {genres.slice(0, isMobile ? 1 : 2).map((genre) => (
                <span 
                  key={genre} 
                  className="px-2 py-1 text-xs font-medium rounded-full 
                           bg-primary/10 text-primary/90 border border-primary/20
                           hover:bg-primary/20 transition-colors"
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};