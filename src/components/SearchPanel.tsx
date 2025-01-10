import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

interface SearchPanelProps {
  onSearch: (included: string[], excluded: string[]) => void;
}

const GENRES = [
  "Action", "Romance", "Comedy", "Fantasy", 
  "Slice of Life", "Drama", "Art", "Memes",
  "Adventure", "Mystery", "Horror", "Sci-Fi"
];

export const SearchPanel = ({ onSearch }: SearchPanelProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [includedGenres, setIncludedGenres] = useState<string[]>([]);
  const [excludedGenres, setExcludedGenres] = useState<string[]>([]);

  const handleGenreClick = (genre: string) => {
    if (includedGenres.includes(genre)) {
      setIncludedGenres(includedGenres.filter(g => g !== genre));
      setExcludedGenres([...excludedGenres, genre]);
    } else if (excludedGenres.includes(genre)) {
      setExcludedGenres(excludedGenres.filter(g => g !== genre));
    } else {
      setIncludedGenres([...includedGenres, genre]);
    }
  };

  const handleSearch = () => {
    onSearch(includedGenres, excludedGenres);
    toast.success("Search filters applied!");
  };

  const filteredGenres = GENRES.filter(genre =>
    genre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getGenreChipClass = (genre: string) => {
    if (includedGenres.includes(genre)) return "genre-chip selected animate-scale-in";
    if (excludedGenres.includes(genre)) return "genre-chip excluded animate-scale-in";
    return "genre-chip default";
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="fixed right-4 top-4 z-50">
          <Search className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px] glass">
        <SheetHeader>
          <SheetTitle className="gradient-text">Advanced Search</SheetTitle>
          <SheetDescription>
            Click genres to include (purple) or exclude (red) them from your search
          </SheetDescription>
        </SheetHeader>
        
        <div className="mt-6 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Search Genres</label>
            <Input
              placeholder="Type to filter genres..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-secondary/50"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Selected Filters</label>
            <div className="min-h-[100px] p-4 rounded-lg bg-secondary/30 space-y-2">
              {includedGenres.length > 0 && (
                <div>
                  <span className="text-xs text-primary">Including:</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {includedGenres.map(genre => (
                      <span key={genre} className="genre-chip selected animate-fade-in">
                        {genre}
                        <X 
                          className="inline-block ml-1 w-3 h-3 cursor-pointer" 
                          onClick={(e) => {
                            e.stopPropagation();
                            setIncludedGenres(includedGenres.filter(g => g !== genre));
                          }}
                        />
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {excludedGenres.length > 0 && (
                <div>
                  <span className="text-xs text-destructive">Excluding:</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {excludedGenres.map(genre => (
                      <span key={genre} className="genre-chip excluded animate-fade-in">
                        {genre}
                        <X 
                          className="inline-block ml-1 w-3 h-3 cursor-pointer" 
                          onClick={(e) => {
                            e.stopPropagation();
                            setExcludedGenres(excludedGenres.filter(g => g !== genre));
                          }}
                        />
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Available Genres</label>
            <div className="flex flex-wrap gap-2">
              {filteredGenres.map(genre => (
                <span
                  key={genre}
                  onClick={() => handleGenreClick(genre)}
                  className={getGenreChipClass(genre)}
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>

          <Button 
            className="w-full" 
            onClick={handleSearch}
          >
            Apply Filters
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};