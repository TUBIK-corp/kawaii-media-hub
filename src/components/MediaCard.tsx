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
      <Link to={`/media/${id}`} className="block relative aspect-[3/4]">
        <img 
          src={imageUrl} 
          alt={title} 
          className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 
                     ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
        />
        <div className="media-card-content">
          <h3 className="text-xl font-semibold text-white line-clamp-2">{title}</h3>
          <div className="media-stats">
            <button onClick={handleLike} className="media-stat">
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-primary text-primary' : ''}`} />
              <span>{likes}</span>
            </button>
            <div className="media-stat">
              <MessageCircle className="w-5 h-5" />
              <span>{comments}</span>
            </div>
            <button onClick={handleShare} className="media-stat ml-auto">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
          <div className="flex gap-2 mt-4">
            {genres.slice(0, isMobile ? 1 : 2).map((genre) => (
              <span key={genre} className="genre-chip">{genre}</span>
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
};