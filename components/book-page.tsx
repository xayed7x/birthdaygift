import { ReactNode } from "react";

interface BookPageProps {
  children: ReactNode;
  variant?: "romantic" | "night" | "islamic";
  className?: string;
}

const BookPage = ({ children, variant = "romantic", className = "" }: BookPageProps) => {
  const baseClasses = "relative h-full flex items-start justify-center p-6 pt-12 md:p-12 overflow-y-auto pb-24";
  
  const variantClasses = {
    romantic: "bg-gradient-page text-midnight",
    night: "bg-gradient-night text-cream",
    islamic: "bg-islamic-blue islamic-pattern text-cream",
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {/* Decorative corner ornaments */}
      {variant === "romantic" && (
        <>
          <div className="absolute top-4 left-4 w-16 h-16 border-t-2 border-l-2 border-gold/40 rounded-tl-lg" />
          <div className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-gold/40 rounded-tr-lg" />
          <div className="absolute bottom-4 left-4 w-16 h-16 border-b-2 border-l-2 border-gold/40 rounded-bl-lg" />
          <div className="absolute bottom-4 right-4 w-16 h-16 border-b-2 border-r-2 border-gold/40 rounded-br-lg" />
        </>
      )}

      {variant === "islamic" && (
        <>
          <div className="absolute top-8 left-1/2 -translate-x-1/2 text-islamic-gold text-4xl">✦</div>
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-islamic-gold text-4xl">✦</div>
        </>
      )}

      <div className="relative z-10 max-w-2xl mx-auto animate-fade-in-up">
        {children}
      </div>
    </div>
  );
};

export default BookPage;
