import { MediaCard } from "./MediaCard";

interface MediaGridProps {
  items: Array<{
    id: string;
    imageUrl: string;
    title: string;
    likes: number;
    comments: number;
    genres: string[];
  }>;
}

export const MediaGrid = ({ items }: MediaGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 p-6">
      {items.map((item, index) => (
        <div 
          key={item.id} 
          className="animate-fade-in"
          style={{ 
            animationDelay: `${index * 100}ms`,
            opacity: 0,
            animation: 'fade-in 0.5s ease-out forwards'
          }}
        >
          <MediaCard {...item} />
        </div>
      ))}
    </div>
  );
};