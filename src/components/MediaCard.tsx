import { Heart, MessageCircle } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

interface MediaCardProps {
  id: string;
  imageUrl: string;
  title: string;
  likes: number;
  comments: number;
  genres: string[];
}

export const MediaCard = ({ id, imageUrl, title, likes, comments, genres }: MediaCardProps) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="media-card">
      <Link to={`/media/${id}`}>
        <div className="relative group">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
            <h3 className="text-white font-medium truncate">{title}</h3>
          </div>
        </div>
      </Link>
      <div className="p-3 flex items-center justify-between">
        <div className="flex gap-3">
          <button 
            onClick={() => setIsLiked(!isLiked)}
            className="flex items-center gap-1 text-sm"
          >
            <Heart 
              className={`w-4 h-4 ${isLiked ? 'fill-primary text-primary' : 'text-gray-400'}`}
            />
            <span>{likes}</span>
          </button>
          <div className="flex items-center gap-1 text-sm text-gray-400">
            <MessageCircle className="w-4 h-4" />
            <span>{comments}</span>
          </div>
        </div>
        <div className="flex gap-1">
          {genres.slice(0, 2).map((genre) => (
            <span 
              key={genre}
              className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary"
            >
              {genre}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};