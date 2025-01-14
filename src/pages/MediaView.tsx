import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Heart, MessageCircle, Share2, Send, ArrowLeft, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { SAMPLE_MEDIA } from "@/pages/Recommendations";

const SAMPLE_COMMENTS = [
  {
    id: "1",
    user: "AnimeGirl",
    avatar: "https://cdn.pixabay.com/photo/2023/03/31/12/44/anime-7888413_1280.jpg",
    content: "This is absolutely beautiful! Love the colors and composition.",
    timestamp: "2 hours ago"
  },
  {
    id: "2",
    user: "OtakuMaster",
    avatar: "https://cdn.pixabay.com/photo/2022/12/03/15/00/anime-7632903_1280.jpg",
    content: "The lighting in this piece is incredible. Great work!",
    timestamp: "5 hours ago"
  }
];

const MediaView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(SAMPLE_COMMENTS);
  const [likes, setLikes] = useState(342);
  const [views] = useState(1337);
  const [imageLoaded, setImageLoaded] = useState(false);

  const media = SAMPLE_MEDIA.find(m => m.id === id);

  if (!media) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-secondary/20">
        <div className="text-center space-y-4 animate-pulse">
          <h1 className="text-2xl font-bold gradient-text">Media not found</h1>
          <Link to="/recommendations" className="text-primary hover:text-primary/80 transition-colors">
            Return to recommendations
          </Link>
        </div>
      </div>
    );
  }

  const handleCommentSubmit = () => {
    if (!comment.trim()) {
      toast.error("Please enter a comment", {
        style: { background: '#1a1f2c', border: '1px solid rgba(255,255,255,0.1)' }
      });
      return;
    }

    const newComment = {
      id: String(Date.now()),
      user: "You",
      avatar: "https://cdn.pixabay.com/photo/2022/12/03/15/00/anime-7632903_1280.jpg",
      content: comment,
      timestamp: "Just now"
    };

    setComments([newComment, ...comments]);
    setComment("");
    toast.success("Comment posted!", {
      style: { background: '#1a1f2c', border: '1px solid rgba(255,255,255,0.1)' }
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied!", {
      style: { background: '#1a1f2c', border: '1px solid rgba(255,255,255,0.1)' }
    });
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
    toast.success(isLiked ? "Removed from favorites" : "Added to favorites", {
      style: { background: '#1a1f2c', border: '1px solid rgba(255,255,255,0.1)' }
    });
  };

  const handleProfileClick = () => {
    navigate('/profile/cyberninja');
  };

  return (
    <div 
      className="min-h-screen w-full animate-fade-in bg-cover bg-center bg-fixed"
      style={{ 
        backgroundImage: `linear-gradient(to bottom, rgba(26, 31, 44, 0.95), rgba(26, 31, 44, 0.98)), 
                         url(https://avatars.mds.yandex.net/i?id=4270b6a4bd492de86b93e52ff57ee426_l-4335903-images-thumbs&n=33&w=1728&h=1080)` 
      }}
    >
      <div className="max-w-[1920px] mx-auto p-4 space-y-6">
        <Link 
          to="/recommendations" 
          className="inline-flex items-center gap-2 text-gray-400 hover:text-primary transition-colors group
                   bg-secondary/20 backdrop-blur-sm px-4 py-2 rounded-full"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm">Back to recommendations</span>
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr,1fr] gap-6">
          <div className="space-y-6">
            <div className="glass-panel overflow-hidden group">
              <div className="relative">
                <img 
                  src={media.imageUrl} 
                  alt={media.title}
                  className={`w-full h-auto max-h-[80vh] object-contain bg-black/40 transition-all duration-700
                           ${imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                  onLoad={() => setImageLoaded(true)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
              </div>
              
              <div className="p-6 space-y-6 relative backdrop-blur-sm">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary 
                               bg-clip-text text-transparent animate-pulse">{media.title}</h1>
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleLike}
                      className="hover:bg-primary/20 transition-colors duration-300 
                               border-primary/20 hover:border-primary/40"
                    >
                      <Heart className={`w-5 h-5 transition-colors duration-300 
                                    ${isLiked ? 'fill-primary text-primary' : ''}`} />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleShare}
                      className="hover:bg-primary/20 transition-colors duration-300 
                               border-primary/20 hover:border-primary/40"
                    >
                      <Share2 className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
                
                <div 
                  className="flex items-center gap-4 cursor-pointer hover:bg-white/5 p-3 rounded-lg transition-colors"
                  onClick={handleProfileClick}
                >
                  <Avatar className="ring-2 ring-primary/20 ring-offset-2 ring-offset-background 
                                   hover:ring-primary/40 transition-colors">
                    <AvatarImage src="https://avatars.mds.yandex.net/i?id=4270b6a4bd492de86b93e52ff57ee426_l-4335903-images-thumbs&n=33&w=1728&h=1080" />
                  </Avatar>
                  <div>
                    <h3 className="font-medium text-white/90">CyberNinja</h3>
                    <p className="text-sm text-gray-400">Digital Artist & NFT Creator</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-6">
                  <div className="flex items-center gap-2 text-sm text-gray-400 bg-black/20 px-4 py-2 rounded-full">
                    <Eye className="w-4 h-4 text-primary" />
                    <span>{views.toLocaleString()} views</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400 bg-black/20 px-4 py-2 rounded-full">
                    <Heart className={`w-4 h-4 ${isLiked ? 'text-primary' : ''}`} />
                    <span>{likes.toLocaleString()} likes</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400 bg-black/20 px-4 py-2 rounded-full">
                    <MessageCircle className="w-4 h-4 text-primary" />
                    <span>{comments.length} comments</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {media.genres.map((genre) => (
                    <span 
                      key={genre}
                      className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm
                               hover:bg-primary/20 transition-colors cursor-pointer border border-primary/20
                               hover:border-primary/40 backdrop-blur-sm"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="glass-panel p-6 h-fit lg:sticky lg:top-4 space-y-6 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-6">
              <MessageCircle className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary 
                            bg-clip-text text-transparent">Comments</h2>
            </div>

            <div className="flex gap-3">
              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your thoughts..."
                className="flex-1 min-h-[80px] bg-black/20 border-primary/20 
                         focus:border-primary/40 transition-colors resize-none
                         placeholder:text-gray-500"
              />
              <Button 
                onClick={handleCommentSubmit} 
                size="icon" 
                className="shrink-0 self-end hover:bg-primary/20 border-primary/20 
                          hover:border-primary/40 transition-colors"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>

            <div className="space-y-6 max-h-[600px] overflow-y-auto custom-scrollbar">
              {comments.map((comment, index) => (
                <div 
                  key={comment.id} 
                  className="flex gap-3 animate-fade-in hover:bg-white/5 p-3 rounded-lg transition-colors"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Avatar className="shrink-0 ring-1 ring-primary/20 hover:ring-primary/40 transition-colors">
                    <AvatarImage src={comment.avatar} />
                  </Avatar>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-white/90">{comment.user}</span>
                      <span className="text-xs text-gray-400">{comment.timestamp}</span>
                    </div>
                    <p className="text-gray-300 text-sm">{comment.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaView;