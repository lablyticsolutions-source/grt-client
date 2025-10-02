import React from "react";

interface AnimatedBackgroundProps {
  variant?: "default" | "subtle" | "vibrant";
  className?: string;
}

export function AnimatedBackground({ 
  variant = "default", 
  className = "" 
}: AnimatedBackgroundProps) {
  const getVariantClasses = () => {
    switch (variant) {
      case "subtle":
        return "bg-animated-waves-subtle";
      case "vibrant":
        return "bg-animated-waves-vibrant";
      default:
        return "bg-animated-waves";
    }
  };

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Primary wave layer */}
      <div className={`absolute inset-0 ${getVariantClasses()}`}>
        <div className="wave-layer-1"></div>
        <div className="wave-layer-2"></div>
        <div className="wave-layer-3"></div>
      </div>
      
      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/60 to-white/40"></div>
    </div>
  );
}