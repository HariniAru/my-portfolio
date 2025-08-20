import React, { useState, useRef, useEffect } from 'react';
import { Plane, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import worldMapImage from '@/assets/world-map.png';

// Journey stops data - coordinates are approximate percentages of map position
export const journeyStops = [
  {
    id: 1,
    name: 'Start',
    title: 'Objective Statement',
    description: 'Where it all began - my journey into Computer Science',
    location: 'Pudukkottai, Tamil Nadu, India',
    coordinates: { x: 78.5, y: 42 }, // Approximate position for South India
    route: '/start'
  },
  {
    id: 2,
    name: 'Home',
    title: 'About Me',
    description: 'My foundation and where I call home',
    location: 'California, USA',
    coordinates: { x: 12, y: 35 },
    route: '/home'
  },
  {
    id: 3,
    name: 'Education',
    title: 'Academic Journey',
    description: 'Learning and growing through formal education',
    location: 'Illinois, USA',
    coordinates: { x: 25, y: 32 },
    route: '/education'
  },
  {
    id: 4,
    name: 'Experience',
    title: 'Work Experience',
    description: 'Professional growth and real-world applications',
    location: 'New York, USA',
    coordinates: { x: 32, y: 28 },
    route: '/experience'
  },
  {
    id: 5,
    name: 'Projects',
    title: 'Featured Projects',
    description: 'Showcasing my technical skills and creativity',
    location: 'Florida, USA',
    coordinates: { x: 30, y: 45 },
    route: '/projects'
  }
];

interface WorldMapProps {
  isActive: boolean;
  onStopSelect: (stop: typeof journeyStops[0]) => void;
  currentStop: number | null;
  planePosition: { x: number; y: number };
  onPlaneMove: (x: number, y: number) => void;
}

interface LocationCardProps {
  stop: typeof journeyStops[0];
  onEnter: () => void;
  onContinue: () => void;
  onClose: () => void;
}

const LocationCard: React.FC<LocationCardProps> = ({ stop, onEnter, onContinue, onClose }) => {
  return (
    <Card className="absolute z-20 w-80 bg-card/95 backdrop-blur-sm border-2 border-primary/20 shadow-card-travel animate-card-pop">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-lg">
          <span>{stop.name}</span>
          <button 
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            ×
          </button>
        </CardTitle>
        <p className="text-sm text-muted-foreground">{stop.location}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold text-base mb-2">{stop.title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{stop.description}</p>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={onEnter}
            variant="default"
            size="sm" 
            className="flex-1 bg-primary hover:bg-primary/90"
          >
            Enter
          </Button>
          <Button 
            onClick={onContinue}
            variant="outline" 
            size="sm"
            className="flex-1 border-primary/30 hover:bg-primary/5"
          >
            Continue Journey
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const WorldMap: React.FC<WorldMapProps> = ({ 
  isActive, 
  onStopSelect, 
  currentStop, 
  planePosition, 
  onPlaneMove 
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [selectedStop, setSelectedStop] = useState<typeof journeyStops[0] | null>(null);
  const [isPlaneFlying, setIsPlaneFlying] = useState(false);

  const handlePinClick = (stop: typeof journeyStops[0], event: React.MouseEvent) => {
    event.stopPropagation();
    
    if (isPlaneFlying) return;
    
    setIsPlaneFlying(true);
    onPlaneMove(stop.coordinates.x, stop.coordinates.y);
    
    // Show location card after plane animation
    setTimeout(() => {
      setSelectedStop(stop);
      setIsPlaneFlying(false);
      onStopSelect(stop);
    }, 2000);
  };

  const handleContinueJourney = () => {
    const nextStopIndex = currentStop ? journeyStops.findIndex(stop => stop.id === currentStop + 1) : 0;
    const nextStop = journeyStops[nextStopIndex];
    
    if (nextStop) {
      setSelectedStop(null);
      handlePinClick(nextStop, { stopPropagation: () => {} } as React.MouseEvent);
    }
  };

  const handleEnter = () => {
    if (selectedStop) {
      // Navigate to the specific page
      window.location.href = selectedStop.route;
    }
  };

  return (
    <div 
      ref={mapRef}
      className={`relative w-full h-full transition-all duration-1000 ${
        isActive ? 'opacity-100' : 'opacity-30 blur-sm'
      }`}
    >
      {/* World Map Background */}
      <img 
        src={worldMapImage}
        alt="World Map" 
        className="w-full h-full object-contain"
      />
      
      {/* Journey Stops */}
      {isActive && journeyStops.map((stop) => (
        <div
          key={stop.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
          style={{
            left: `${stop.coordinates.x}%`,
            top: `${stop.coordinates.y}%`,
          }}
          onClick={(e) => handlePinClick(stop, e)}
        >
          {/* Pin */}
          <div className="relative">
            <MapPin 
              className={`w-8 h-8 transition-all duration-300 ${
                currentStop === stop.id 
                  ? 'text-primary scale-125 drop-shadow-lg' 
                  : 'text-primary/70 hover:text-primary hover:scale-110'
              }`}
              fill="currentColor"
            />
            {/* Pin number */}
            <div className="absolute top-1 left-1/2 transform -translate-x-1/2 text-white text-xs font-bold">
              {stop.id}
            </div>
          </div>
          
          {/* Hover tooltip */}
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            <div className="bg-foreground text-background px-3 py-1 rounded-lg text-sm whitespace-nowrap">
              {stop.name}
            </div>
          </div>
        </div>
      ))}
      
      {/* Animated Plane */}
      {isActive && (
        <div
          className={`absolute transform -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-2000 ease-in-out ${
            isPlaneFlying ? '' : 'animate-plane-float'
          }`}
          style={{
            left: `${planePosition.x}%`,
            top: `${planePosition.y}%`,
          }}
        >
          <Plane 
            className="w-12 h-12 text-foreground drop-shadow-plane" 
            fill="currentColor"
          />
        </div>
      )}
      
      {/* Location Card */}
      {selectedStop && (
        <div
          className="absolute transform -translate-x-1/2 -translate-y-full"
          style={{
            left: `${selectedStop.coordinates.x}%`,
            top: `${selectedStop.coordinates.y}%`,
            marginTop: '-20px'
          }}
        >
          <LocationCard
            stop={selectedStop}
            onEnter={handleEnter}
            onContinue={handleContinueJourney}
            onClose={() => setSelectedStop(null)}
          />
        </div>
      )}
    </div>
  );
};

export default WorldMap;