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

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
    toast.success(isLiked ? "Removed from favorites" : "Added to favorites");
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(window.location.origin + `/media/${id}`);
    toast.success("Link copied to clipboard!");
  };

  return (
    <div className="media-card group">
      <Link to={`/media/${id}`}>
        <div className="relative overflow-hidden">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-36 sm:h-48 object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2 sm:p-4">
            <h3 className="text-sm sm:text-base text-white font-medium truncate">{title}</h3>
          </div>
        </div>
      </Link>
      <div className="p-2 sm:p-3 flex items-center justify-between bg-secondary/50 backdrop-blur-sm">
        <div className="flex gap-2 sm:gap-3">
          <button 
            onClick={handleLike}
            className="flex items-center gap-1 text-xs sm:text-sm transition-colors hover:text-primary"
          >
            <Heart 
              className={`w-3 h-3 sm:w-4 sm:h-4 transition-all ${isLiked ? 'fill-primary text-primary scale-110' : 'text-gray-400'}`}
            />
            <span>{likes}</span>
          </button>
          <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-400">
            <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>{comments}</span>
          </div>
          <button
            onClick={handleShare}
            className="flex items-center gap-1 text-xs sm:text-sm text-gray-400 hover:text-primary transition-colors"
          >
            <Share2 className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>
        </div>
        <div className="flex gap-1">
          {genres.slice(0, isMobile ? 1 : 2).map((genre) => (
            <span 
              key={genre}
              className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full bg-primary/20 text-primary"
            >
              {genre}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};