import { MediaCard } from "./MediaCard";
import type { MediaPost } from "@/data/database";

interface MediaGridProps {
  items: MediaPost[];
}

export const MediaGrid = ({ items }: MediaGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4 md:gap-6 p-4">
      {items.map((item, index) => (
        <div 
          key={item.id} 
          className="animate-fade-in"
          style={{ 
            animationDelay: `${index * 0.1}s`,
            height: '100%'
          }}
        >
          <MediaCard {...item} />
        </div>
      ))}
    </div>
  );
};