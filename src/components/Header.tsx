import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Home, Image, Info, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-secondary/80 backdrop-blur-lg border-b border-white/5">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <Image className="w-6 h-6 text-primary" />
            <span className="font-bold text-lg">АртГалерея</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm hover:text-primary transition-colors">
              Главная
            </Link>
            <Link to="/recommendations" className="text-sm hover:text-primary transition-colors">
              Рекомендации
            </Link>
            <Link to="/about" className="text-sm hover:text-primary transition-colors">
              О нас
            </Link>
          </nav>

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-secondary/95 backdrop-blur-lg">
              <nav className="flex flex-col gap-4 mt-8">
                <Link to="/" className="flex items-center gap-2 p-2 hover:bg-primary/10 rounded-lg transition-colors">
                  <Home className="w-5 h-5" />
                  Главная
                </Link>
                <Link to="/recommendations" className="flex items-center gap-2 p-2 hover:bg-primary/10 rounded-lg transition-colors">
                  <Image className="w-5 h-5" />
                  Рекомендации
                </Link>
                <Link to="/about" className="flex items-center gap-2 p-2 hover:bg-primary/10 rounded-lg transition-colors">
                  <Info className="w-5 h-5" />
                  О нас
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};