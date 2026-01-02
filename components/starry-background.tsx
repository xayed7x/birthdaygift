import { useEffect, useState } from "react";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}

interface StarryBackgroundProps {
  variant?: "light" | "dark" | "islamic";
}

const StarryBackground = ({ variant = "light" }: StarryBackgroundProps) => {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const generateStars = () => {
      const newStars: Star[] = [];
      const starCount = variant === "islamic" ? 80 : 50;
      
      for (let i = 0; i < starCount; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          delay: Math.random() * 5,
          duration: Math.random() * 3 + 2,
        });
      }
      setStars(newStars);
    };

    generateStars();
  }, [variant]);

  const bgClass = variant === "islamic" 
    ? "bg-islamic-blue" 
    : variant === "dark" 
    ? "bg-midnight" 
    : "bg-gradient-romantic";

  const starColor = variant === "light" 
    ? "bg-gold/60" 
    : "bg-cream/80";

  return (
    <div className={`fixed inset-0 overflow-hidden ${bgClass}`}>
      {/* Stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className={`absolute rounded-full ${starColor}`}
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animation: `twinkle ${star.duration}s ease-in-out ${star.delay}s infinite`,
          }}
        />
      ))}

      {/* Decorative gradient overlays */}
      {variant === "light" && (
        <>
          <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-romantic-pink/30 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-romantic-pink/20 to-transparent" />
        </>
      )}

      {variant === "islamic" && (
        <div className="absolute inset-0 islamic-pattern opacity-30" />
      )}
    </div>
  );
};

export default StarryBackground;
