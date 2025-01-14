import { Heart, MessageCircle, Share2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

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
  const [isHovered, setIsHovered] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
    toast.success(isLiked ? "Removed from favorites" : "Added to favorites", {
      style: { background: '#1a1f2c', border: '1px solid rgba(255,255,255,0.1)' }
    });
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(window.location.origin + `/media/${id}`);
    toast.success("Link copied!", {
      style: { background: '#1a1f2c', border: '1px solid rgba(255,255,255,0.1)' }
    });
  };

  return (
    <div 
      className="media-card group h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/media/${id}`} className="block relative aspect-square h-full">
        <img 
          src={imageUrl} 
          alt={title} 
          className={`w-full h-full object-cover transition-all duration-500 
                     ${isHovered ? 'scale-110 blur-sm' : 'scale-100'}
                     ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
        />
        <div className={`media-card-content ${isMobile ? 'opacity-100' : ''}`}>
          <div className="flex justify-between items-end">
            <div className="space-y-2">
              <Link 
                to="/profile/cyberninja" 
                className="flex items-center gap-2 mb-2"
                onClick={(e) => e.stopPropagation()}
              >
                <Avatar className="w-6 h-6 ring-1 ring-primary/20">
                  <AvatarImage src="https://avatars.mds.yandex.net/i?id=4270b6a4bd492de86b93e52ff57ee426_l-4335903-images-thumbs&n=33&w=1728&h=1080" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span className="text-xs text-white/90 hover:text-primary transition-colors">CyberNinja</span>
              </Link>
              <div className="flex gap-2 flex-wrap">
                {genres.slice(0, isMobile ? 1 : 2).map((genre) => (
                  <span key={genre} className="genre-chip">{genre}</span>
                ))}
              </div>
              <h3 className="text-sm font-medium text-white/90 line-clamp-2">{title}</h3>
            </div>
            <div className="flex items-center gap-2">
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