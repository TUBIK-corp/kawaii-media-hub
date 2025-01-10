import { useState } from "react";
import { useParams } from "react-router-dom";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar } from "@/components/ui/avatar";
import { AvatarImage } from "@/components/ui/avatar";

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

  // Find media from sample data (in real app, this would be an API call)
  const media = {
    id: "1",
    imageUrl: "https://cdn.pixabay.com/photo/2023/03/31/12/45/anime-7888415_1280.jpg",
    title: "Cherry Blossom Dreams",
    author: "ArtistName",
    likes: 342,
    comments: SAMPLE_COMMENTS,
    genres: ["Romance", "Drama"]
  };

  return (
    <div className="min-h-screen p-4 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        <div className="glass p-4 rounded-lg mb-4">
          <img 
            src={media.imageUrl} 
            alt={media.title}
            className="w-full rounded-lg mb-4"
          />
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">{media.title}</h1>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsLiked(!isLiked)}
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-primary text-primary' : ''}`} />
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
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

        <div className="glass p-4 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Comments</h2>
          <div className="mb-4">
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment..."
              className="mb-2"
            />
            <Button>Post Comment</Button>
          </div>
          <div className="space-y-4">
            {SAMPLE_COMMENTS.map((comment) => (
              <div key={comment.id} className="flex gap-3">
                <Avatar>
                  <AvatarImage src={comment.avatar} />
                </Avatar>
                <div>
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
  );
};

export default MediaView;