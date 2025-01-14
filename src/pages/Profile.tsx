import { useState } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Edit2, Image as ImageIcon, Film, Share2, Settings, Plus } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { MediaGrid } from "@/components/MediaGrid";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

const MOCK_USERS = {
  cyberninja: {
    username: "CyberNinja",
    avatar: "https://avatars.mds.yandex.net/i?id=4270b6a4bd492de86b93e52ff57ee426_l-4335903-images-thumbs&n=33&w=1728&h=1080",
    bio: "Digital art enthusiast | Cyberpunk lover | NFT Creator",
    stats: {
      posts: 42,
      followers: 890,
      following: 234
    },
    posts: [
      {
        id: "1",
        imageUrl: "https://img.freepik.com/premium-photo/cute-anime-girl-kawai_941097-16202.jpg",
        title: "Kawaii Dreams",
        likes: 342,
        comments: 56,
        genres: ["Art", "Fantasy"]
      },
      {
        id: "4",
        imageUrl: "https://cdn.pixabay.com/photo/2022/12/03/15/00/anime-girl-7632904_1280.jpg",
        title: "Sunset Memories",
        likes: 789,
        comments: 123,
        genres: ["Slice of Life", "Romance"]
      }
    ]
  }
};

const Profile = () => {
  const { username } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const user = MOCK_USERS[username as keyof typeof MOCK_USERS];

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-secondary via-secondary/95 to-secondary/90 flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-white">User not found</h1>
          <Link to="/" className="text-primary hover:text-primary/80">Return home</Link>
        </div>
      </div>
    );
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Profile link copied to clipboard!", {
      style: { background: '#1a1f2c', border: '1px solid rgba(255,255,255,0.1)' }
    });
  };

  return (
    <div className="min-h-screen bg-[url('https://avatars.mds.yandex.net/i?id=4270b6a4bd492de86b93e52ff57ee426_l-4335903-images-thumbs&n=33&w=1728&h=1080')] bg-cover bg-fixed bg-center">
      <div className="min-h-screen bg-gradient-to-b from-secondary/95 via-secondary/98 to-secondary/95">
        <Header />
        
        <div className="container mx-auto px-4 pt-24">
          <Card className="relative overflow-hidden border-primary/20 bg-secondary/30 backdrop-blur-md">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
            
            <CardContent className="relative p-6 md:p-8">
              <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                <div className="relative group">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden ring-2 ring-primary/30 ring-offset-2 ring-offset-background">
                    <Avatar className="w-full h-full">
                      <AvatarImage src={user.avatar} className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110" />
                      <AvatarFallback>{user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </div>
                  {username === "cyberninja" && (
                    <Button 
                      size="icon"
                      variant="secondary"
                      className="absolute bottom-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => setIsEditing(true)}
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>

                <div className="flex-1 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-between gap-4 mb-4">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
                      {user.username}
                    </h1>
                    <div className="flex gap-2">
                      <Button variant="secondary" size="sm" onClick={handleShare}>
                        <Share2 className="w-4 h-4 mr-2" />
                        Share
                      </Button>
                      {username === "cyberninja" && (
                        <>
                          <Button variant="secondary" size="sm">
                            <Settings className="w-4 h-4 mr-2" />
                            Settings
                          </Button>
                          <Button variant="default" size="sm">
                            <Plus className="w-4 h-4 mr-2" />
                            New Post
                          </Button>
                        </>
                      )}
                    </div>
                  </div>

                  <p className="text-gray-400 mb-6">{user.bio}</p>

                  <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="stat-card">
                      <span className="text-2xl font-bold text-primary">{user.stats.posts}</span>
                      <span className="text-sm text-gray-400">Posts</span>
                    </div>
                    <div className="stat-card">
                      <span className="text-2xl font-bold text-primary">{user.stats.followers}</span>
                      <span className="text-sm text-gray-400">Followers</span>
                    </div>
                    <div className="stat-card">
                      <span className="text-2xl font-bold text-primary">{user.stats.following}</span>
                      <span className="text-sm text-gray-400">Following</span>
                    </div>
                  </div>

                  {username !== "cyberninja" && (
                    <Button className="w-full md:w-auto">
                      Follow
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
              Posts
            </h2>
            <MediaGrid items={user.posts} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;