import { Header } from "@/components/Header";
import { Mail, MapPin, Phone } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-24 pb-16 container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 gradient-text">О нас</h1>
          
          <div className="glass-panel p-8 mb-12">
            <h2 className="text-2xl font-semibold mb-4">Наша миссия</h2>
            <p className="text-gray-400 mb-6">
              АртГалерея - это платформа, объединяющая художников и ценителей искусства. 
              Мы стремимся сделать искусство доступным для каждого, создавая пространство 
              для творческого обмена и вдохновения.
            </p>
            <p className="text-gray-400">
              Наша команда работает над тем, чтобы предоставить вам лучший опыт 
              взаимодействия с искусством в цифровом формате.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-panel p-6">
              <MapPin className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Адрес</h3>
              <p className="text-gray-400">Москва, ул. Арбат, 1</p>
            </div>
            <div className="glass-panel p-6">
              <Phone className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Телефон</h3>
              <p className="text-gray-400">+7 (999) 123-45-67</p>
            </div>
            <div className="glass-panel p-6">
              <Mail className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Email</h3>
              <p className="text-gray-400">info@artgallery.ru</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;