import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Menu, User, Wallet } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#01040a]/80 backdrop-blur-lg border-b border-white/5">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
              ArtWorld
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-sm text-gray-400 hover:text-white transition-colors">
              Home
            </Link>
            <Link to="/recommendations" className="text-sm text-gray-400 hover:text-white transition-colors">
              Gallery
            </Link>
            <Link to="/about" className="text-sm text-gray-400 hover:text-white transition-colors">
              About
            </Link>
            <Link to="/profile/cyberninja" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
              <Avatar className="w-8 h-8 border border-primary/20">
                <AvatarImage src="https://avatars.mds.yandex.net/i?id=4270b6a4bd492de86b93e52ff57ee426_l-4335903-images-thumbs&n=33&w=1728&h=1080" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <span>CyberNinja</span>
            </Link>
            <Button className="bg-purple-600 hover:bg-purple-700 gap-2">
              <Wallet className="w-4 h-4" />
              Connect Wallet
            </Button>
          </nav>

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-[#01040a]/95 backdrop-blur-lg">
              <nav className="flex flex-col gap-4 mt-8">
                <Link to="/" className="flex items-center gap-2 p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                  Home
                </Link>
                <Link to="/recommendations" className="flex items-center gap-2 p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                  Gallery
                </Link>
                <Link to="/about" className="flex items-center gap-2 p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                  About
                </Link>
                <Link to="/profile/cyberninja" className="flex items-center gap-2 p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                  <Avatar className="w-8 h-8 border border-primary/20">
                    <AvatarImage src="https://avatars.mds.yandex.net/i?id=4270b6a4bd492de86b93e52ff57ee426_l-4335903-images-thumbs&n=33&w=1728&h=1080" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <span>Profile</span>
                </Link>
                <Button className="bg-purple-600 hover:bg-purple-700 gap-2 mt-4">
                  <Wallet className="w-4 h-4" />
                  Connect Wallet
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};