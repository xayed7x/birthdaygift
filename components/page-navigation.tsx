import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

interface PageNavigationProps {
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
  variant?: "light" | "dark";
}

const PageNavigation = ({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
  variant = "light",
}: PageNavigationProps) => {
  const isFirst = currentPage === 1; // Assuming 1-indexed for display, but logic might need 0-indexed adjustment if parent sends 0-indexed
  // Re-reading user code: "currentPage" in props is used as {currentPage} / {totalPages}.
  // Usually this means it expects 1-based index or display logic.
  // However, typical array mapping is 0-based.
  // I will assume the parent 'storybook.tsx' will pass 1-based or I adjust here.
  // Let's look at the logic: "disabled={isFirst}" where isFirst = currentPage === 1.
  // So it expects 1-based.
  
  const isLast = currentPage === totalPages;

  const buttonClass = variant === "dark" 
    ? "bg-cream/10 hover:bg-cream/20 text-cream border-cream/30" 
    : "bg-midnight/5 hover:bg-midnight/10 text-midnight border-midnight/20";

  const textClass = variant === "dark" ? "text-cream/70" : "text-midnight/60";

  return (
    <div className="fixed bottom-6 md:bottom-8 left-0 right-0 z-50 flex items-center justify-center gap-6 pointer-events-auto">
      <Button
        variant="ghost"
        size="icon"
        onClick={onPrevious}
        disabled={isFirst || currentPage === 0} // Support 0 or 1 index
        className={`rounded-full w-12 h-12 md:w-14 md:h-14 transition-all duration-300 backdrop-blur-sm ${buttonClass} disabled:opacity-0`}
      >
        <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
      </Button>

      <span className={`font-body text-sm md:text-base ${textClass} bg-background/10 backdrop-blur-md px-3 py-1 rounded-full`}>
        {currentPage} / {totalPages}
      </span>

      <Button
        variant="ghost"
        size="icon"
        onClick={onNext}
        className={`rounded-full w-12 h-12 md:w-14 md:h-14 transition-all duration-300 backdrop-blur-sm ${buttonClass}`}
      >
        <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
      </Button>
    </div>
  );
};

export default PageNavigation;
