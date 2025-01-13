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
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4 p-4">
      {items.map((item) => (
        <div key={item.id} className="animate-fade-in">
          <MediaCard {...item} />
        </div>
      ))}
    </div>
  );
};