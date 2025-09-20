import React from 'react';
import { Plane } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LandingHeroProps {
  onBeginJourney: () => void;
  isVisible: boolean;
}

const LandingHero: React.FC<LandingHeroProps> = ({ onBeginJourney, isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-gradient-hero animate-fade-in">
      <div className="text-center space-y-8 max-w-lg px-6">
        {/* Main Title */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
          Join Me on My{' '}
          <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            CS Journey
          </span>
        </h1>
        
        {/* Animated Plane Icon */}
        <div className="flex justify-center">
          <div className="p-6 rounded-full bg-primary/10 backdrop-blur-sm border-2 border-primary/20">
            <Plane 
              className="w-16 h-16 md:w-20 md:h-20 text-primary animate-plane-float" 
              fill="currentColor"
            />
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="space-y-4">
          <p className="text-lg md:text-xl text-muted-foreground max-w-md mx-auto">
            Explore my professional journey through an interactive world map.
          </p>
          
          <Button 
            onClick={onBeginJourney}
            size="lg"
            className="px-8 py-6 text-lg font-semibold bg-foreground text-background hover:bg-foreground/90 transition-all duration-300 hover:scale-105 shadow-lg"
          >
            Let's Begin!
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LandingHero;