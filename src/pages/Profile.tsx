import { useState } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Edit2, Share2, Settings, Plus } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { MediaGrid } from "@/components/MediaGrid";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { getUser, getUserPosts } from "@/data/database";
import { useIsMobile } from "@/hooks/use-mobile";

const Profile = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const isMobile = useIsMobile();
  
  const user = username ? getUser(username) : undefined;
  const posts = username ? getUserPosts(username) : [];

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
            
            <CardContent className="relative p-4 md:p-8">
              <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start">
                <div className="relative group">
                  <div className="w-24 h-24 md:w-40 md:h-40 rounded-full overflow-hidden ring-2 ring-primary/30 ring-offset-2 ring-offset-background">
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
                  <div className="flex flex-col md:flex-row items-center md:justify-between gap-4 mb-4">
                    <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
                      {user.username}
                    </h1>
                    <div className="flex flex-wrap justify-center md:justify-end gap-2">
                      <Button variant="secondary" size={isMobile ? "sm" : "default"} onClick={handleShare}>
                        <Share2 className="w-4 h-4 mr-2" />
                        Share
                      </Button>
                      {username === "cyberninja" && (
                        <>
                          <Button variant="secondary" size={isMobile ? "sm" : "default"}>
                            <Settings className="w-4 h-4 mr-2" />
                            Settings
                          </Button>
                          <Button variant="default" size={isMobile ? "sm" : "default"}>
                            <Plus className="w-4 h-4 mr-2" />
                            New Post
                          </Button>
                        </>
                      )}
                    </div>
                  </div>

                  <p className="text-gray-400 mb-6 text-sm md:text-base">{user.bio}</p>

                  <div className="grid grid-cols-3 gap-2 md:gap-4 mb-6 md:mb-8">
                    <div className="stat-card p-2 md:p-4">
                      <span className="text-xl md:text-2xl font-bold text-primary">{user.stats.posts}</span>
                      <span className="text-xs md:text-sm text-gray-400">Posts</span>
                    </div>
                    <div className="stat-card p-2 md:p-4">
                      <span className="text-xl md:text-2xl font-bold text-primary">{user.stats.followers}</span>
                      <span className="text-xs md:text-sm text-gray-400">Followers</span>
                    </div>
                    <div className="stat-card p-2 md:p-4">
                      <span className="text-xl md:text-2xl font-bold text-primary">{user.stats.following}</span>
                      <span className="text-xs md:text-sm text-gray-400">Following</span>
                    </div>
                  </div>

                  {username !== "cyberninja" && (
                    <Button className="w-full md:w-auto" size={isMobile ? "sm" : "default"}>
                      Follow
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6 md:mt-8">
            <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
              Posts
            </h2>
            <MediaGrid items={posts} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;