import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Heart, MessageCircle, Share2, Send, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

// Sample media data - in a real app this would come from an API
const MEDIA_DATA = [
  {
    id: "1",
    imageUrl: "https://cdn.pixabay.com/photo/2023/03/31/12/45/anime-7888415_1280.jpg",
    title: "Cherry Blossom Dreams",
    author: "ArtistName",
    description: "A beautiful scene capturing the essence of spring in Japan. The cherry blossoms create a magical atmosphere as they dance in the wind.",
    genres: ["Romance", "Drama", "Slice of Life"]
  },
  {
    id: "2",
    imageUrl: "https://cdn.pixabay.com/photo/2023/03/31/12/44/anime-7888413_1280.jpg",
    title: "Midnight Adventure",
    author: "NightArtist",
    description: "An exciting journey through the neon-lit streets of a cyberpunk city, where danger and mystery lurk around every corner.",
    genres: ["Action", "Sci-Fi", "Adventure"]
  },
  {
    id: "3",
    imageUrl: "https://cdn5.vectorstock.com/i/1000x1000/65/54/cute-anime-girl-in-black-hoodie-and-green-eyes-vector-39706554.jpg",
    title: "Green Eyes",
    author: "HoodieArt",
    description: "A mysterious character with piercing green eyes, wearing a black hoodie. The contrast creates an atmosphere of intrigue and mystery.",
    genres: ["Drama", "Mystery"]
  }
];

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
  const [isLiked, setIsLiked] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(SAMPLE_COMMENTS);
  const [likes, setLikes] = useState(342);

  // Find media from sample data
  const media = MEDIA_DATA.find(m => m.id === id) || MEDIA_DATA[0];

  const handleCommentSubmit = () => {
    if (!comment.trim()) {
      toast.error("Please enter a comment");
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
    toast.success("Comment posted successfully!");
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
    toast.success(isLiked ? "Removed from favorites" : "Added to favorites");
  };

  return (
    <div className="min-h-screen w-full animate-fade-in">
      <div className="max-w-[1920px] mx-auto p-4">
        <Link to="/recommendations" className="inline-flex items-center gap-2 text-gray-400 hover:text-primary transition-colors mb-4">
          <ArrowLeft className="w-4 h-4" />
          Back to recommendations
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-4">
          <div className="space-y-4">
            <div className="glass rounded-lg overflow-hidden">
              <img 
                src={media.imageUrl} 
                alt={media.title}
                className="w-full aspect-video object-cover"
              />
              <div className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl md:text-3xl font-bold">{media.title}</h1>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleLike}
                      className="shrink-0"
                    >
                      <Heart className={`w-5 h-5 ${isLiked ? 'fill-primary text-primary' : ''}`} />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleShare}
                      className="shrink-0"
                    >
                      <Share2 className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="https://cdn.pixabay.com/photo/2022/12/03/15/00/anime-7632903_1280.jpg" />
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{media.author}</h3>
                    <p className="text-sm text-gray-400">Content Creator</p>
                  </div>
                </div>

                <p className="text-gray-300">{media.description}</p>

                <div className="flex flex-wrap gap-2">
                  {media.genres.map((genre) => (
                    <span 
                      key={genre}
                      className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="glass rounded-lg p-4 h-fit lg:sticky lg:top-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                <h2 className="text-xl font-bold">Comments</h2>
              </div>

              <div className="flex gap-2">
                <Textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="flex-1 min-h-[80px]"
                />
                <Button onClick={handleCommentSubmit} size="icon" className="shrink-0 self-end">
                  <Send className="w-5 h-5" />
                </Button>
              </div>

              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                {comments.map((comment) => (
                  <div key={comment.id} className="flex gap-3 animate-fade-in">
                    <Avatar className="shrink-0">
                      <AvatarImage src={comment.avatar} />
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{comment.user}</span>
                        <span className="text-sm text-gray-400">{comment.timestamp}</span>
                      </div>
                      <p className="text-gray-200">{comment.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaView;