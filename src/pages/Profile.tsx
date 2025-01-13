import { useState } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Edit2, Image, Film, Heart, Settings } from "lucide-react";
import { Link } from "react-router-dom";

const MOCK_USER = {
  username: "CyberNinja",
  avatar: "https://avatars.mds.yandex.net/i?id=4270b6a4bd492de86b93e52ff57ee426_l-4335903-images-thumbs&n=33&w=1728&h=1080",
  bio: "Digital art enthusiast | Cyberpunk lover",
  stats: {
    posts: 42,
    likes: 1337,
    followers: 890,
    following: 234
  }
};

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary via-secondary/95 to-secondary/90">
      <Header />
      
      <div className="container mx-auto px-4 pt-24">
        <Card className="relative overflow-hidden border-primary/20 bg-secondary/30 backdrop-blur-md">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
          
          <CardContent className="relative p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              <div className="relative group">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-primary/30 shadow-lg shadow-primary/20">
                  <img 
                    src={MOCK_USER.avatar} 
                    alt={MOCK_USER.username}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <Button 
                  size="icon"
                  variant="secondary"
                  className="absolute bottom-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => setIsEditing(true)}
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-between gap-4 mb-4">
                  <h1 className="text-3xl font-bold gradient-text">{MOCK_USER.username}</h1>
                  <div className="flex gap-2">
                    <Button variant="secondary" size="sm">
                      <Settings className="w-4 h-4 mr-2" />
                      Настройки
                    </Button>
                    <Button variant="default" size="sm">
                      <Edit2 className="w-4 h-4 mr-2" />
                      Редактировать
                    </Button>
                  </div>
                </div>

                <p className="text-gray-400 mb-6">{MOCK_USER.bio}</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="stat-card">
                    <span className="text-2xl font-bold text-primary">{MOCK_USER.stats.posts}</span>
                    <span className="text-sm text-gray-400">Публикации</span>
                  </div>
                  <div className="stat-card">
                    <span className="text-2xl font-bold text-primary">{MOCK_USER.stats.likes}</span>
                    <span className="text-sm text-gray-400">Лайки</span>
                  </div>
                  <div className="stat-card">
                    <span className="text-2xl font-bold text-primary">{MOCK_USER.stats.followers}</span>
                    <span className="text-sm text-gray-400">Подписчики</span>
                  </div>
                  <div className="stat-card">
                    <span className="text-2xl font-bold text-primary">{MOCK_USER.stats.following}</span>
                    <span className="text-sm text-gray-400">Подписки</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Link to="/liked">
                    <Button variant="secondary" className="w-full md:w-auto">
                      <Heart className="w-4 h-4 mr-2" />
                      Понравившиеся
                    </Button>
                  </Link>
                  <Button variant="secondary" className="w-full md:w-auto">
                    <Image className="w-4 h-4 mr-2" />
                    Изображения
                  </Button>
                  <Button variant="secondary" className="w-full md:w-auto">
                    <Film className="w-4 h-4 mr-2" />
                    Видео
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Grid of user's media will go here */}
        </div>
      </div>
    </div>
  );
};

export default Profile;