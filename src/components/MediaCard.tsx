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
    <div className="media-card group">
      <Link to={`/media/${id}`} className="block relative aspect-square">
        <img 
          src={imageUrl} 
          alt={title} 
          className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 
                     ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
        />
        <div className="media-card-content">
          <div className="flex justify-between items-end">
            <div className="space-y-1">
              <div className="flex gap-2">
                {genres.slice(0, isMobile ? 1 : 2).map((genre) => (
                  <span key={genre} className="genre-chip">{genre}</span>
                ))}
              </div>
              <h3 className="text-sm font-medium text-white/90">{title}</h3>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={handleLike} className="media-stat">
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-primary text-primary' : ''}`} />
                <span className="text-[10px]">{likes}</span>
              </button>
              <button onClick={handleShare} className="media-stat">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};