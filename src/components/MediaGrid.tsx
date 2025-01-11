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
    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-3 md:gap-4 p-2 md:p-4 space-y-3 md:space-y-4">
      {items.map((item) => (
        <div key={item.id} className="break-inside-avoid">
          <MediaCard {...item} />
        </div>
      ))}
    </div>
  );
};