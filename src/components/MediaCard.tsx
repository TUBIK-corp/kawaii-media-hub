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
    <div className="media-card group w-full">
      <Link to={`/media/${id}`} className="block relative">
        <div className="relative aspect-[4/5] overflow-hidden">
          <img 
            src={imageUrl} 
            alt={title} 
            className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImageLoaded(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
            <h3 className="text-base sm:text-lg text-white font-medium line-clamp-2">{title}</h3>
          </div>
        </div>
      </Link>
      <div className="p-3 sm:p-4 flex items-center justify-between bg-[#1A1F2C]/80 backdrop-blur-sm">
        <div className="flex gap-3 sm:gap-4">
          <button 
            onClick={handleLike}
            className="flex items-center gap-1.5 text-sm transition-colors hover:text-primary"
          >
            <Heart 
              className={`w-4 h-4 sm:w-5 sm:h-5 transition-all ${isLiked ? 'fill-primary text-primary scale-110' : 'text-gray-400'}`}
            />
            <span>{likes}</span>
          </button>
          <div className="flex items-center gap-1.5 text-sm text-gray-400">
            <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>{comments}</span>
          </div>
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-primary transition-colors"
          >
            <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
        <div className="flex gap-2">
          {genres.slice(0, isMobile ? 1 : 2).map((genre) => (
            <span 
              key={genre}
              className="text-xs px-2.5 py-1 rounded-full bg-primary/20 text-primary font-medium"
            >
              {genre}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};