import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { ArrowRight, Image, Star, Users } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
            Добро пожаловать в АртГалерею
          </h1>
          <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
            Откройте для себя уникальную коллекцию произведений искусства от талантливых художников со всего мира
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="gap-2">
              <Link to="/recommendations">
                Начать просмотр
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link to="/about">Узнать больше</Link>
            </Button>
          </div>
        </section>

        {/* Features */}
        <section className="container mx-auto px-4 mt-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-panel p-6 text-center">
              <Image className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Уникальные работы</h3>
              <p className="text-gray-400">Тщательно отобранные произведения искусства высочайшего качества</p>
            </div>
            <div className="glass-panel p-6 text-center">
              <Star className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Персональный выбор</h3>
              <p className="text-gray-400">Рекомендации на основе ваших предпочтений</p>
            </div>
            <div className="glass-panel p-6 text-center">
              <Users className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Сообщество</h3>
              <p className="text-gray-400">Общайтесь с художниками и ценителями искусства</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;