import { useState } from "react";
import { useParams } from "react-router-dom";
import { Heart, MessageCircle, Share2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar } from "@/components/ui/avatar";
import { AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

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

  // Find media from sample data (in real app, this would be an API call)
  const media = {
    id: "1",
    imageUrl: "https://cdn.pixabay.com/photo/2023/03/31/12/45/anime-7888415_1280.jpg",
    title: "Cherry Blossom Dreams",
    author: "ArtistName",
    likes: 342,
    comments: comments,
    genres: ["Romance", "Drama"]
  };

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

  return (
    <div className="min-h-screen p-4 animate-fade-in max-w-[1920px] mx-auto">
      <div className="glass rounded-lg overflow-hidden">
        <div className="aspect-video relative">
          <img 
            src={media.imageUrl} 
            alt={media.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{media.title}</h1>
            <div className="flex gap-2">
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

        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="w-12 h-12">
                <AvatarImage src="https://cdn.pixabay.com/photo/2022/12/03/15/00/anime-7632903_1280.jpg" />
              </Avatar>
              <div>
                <h3 className="font-medium text-lg">{media.author}</h3>
                <p className="text-gray-400 text-sm">Content Creator</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  setIsLiked(!isLiked);
                  toast.success(isLiked ? "Removed from favorites" : "Added to favorites");
                }}
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-primary text-primary' : ''}`} />
              </Button>
              <Button variant="outline" size="icon" onClick={handleShare}>
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              Comments
            </h2>
            <div className="flex gap-2">
              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add a comment..."
                className="flex-1"
              />
              <Button onClick={handleCommentSubmit} size="icon">
                <Send className="w-5 h-5" />
              </Button>
            </div>
            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="flex gap-3 animate-fade-in">
                  <Avatar>
                    <AvatarImage src={comment.avatar} />
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{comment.user}</span>
                      <span className="text-sm text-gray-400">{comment.timestamp}</span>
                    </div>
                    <p className="text-gray-200 mt-1">{comment.content}</p>
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