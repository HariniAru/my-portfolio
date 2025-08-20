import React, { useState } from 'react';
import WorldMap, { journeyStops } from '@/components/WorldMap';
import LandingHero from '@/components/LandingHero';
import Navigation from '@/components/Navigation';

const Index = () => {
  const [showHero, setShowHero] = useState(true);
  const [mapActive, setMapActive] = useState(false);
  const [currentStop, setCurrentStop] = useState<number | null>(null);
  const [planePosition, setPlanePosition] = useState({ x: 50, y: 50 });

  const handleBeginJourney = () => {
    setShowHero(false);
    setMapActive(true);
    
    // Start the journey at the first stop
    setTimeout(() => {
      const firstStop = journeyStops[0];
      setPlanePosition({ x: firstStop.coordinates.x, y: firstStop.coordinates.y });
      setCurrentStop(firstStop.id);
    }, 500);
  };

  const handleStopSelect = (stop: typeof journeyStops[0]) => {
    setCurrentStop(stop.id);
  };

  const handlePlaneMove = (x: number, y: number) => {
    setPlanePosition({ x, y });
  };

  return (
    <div className="min-h-screen bg-gradient-hero relative overflow-hidden">
      <Navigation currentPage="/" />
      
      {/* World Map Background */}
      <div className="absolute inset-0">
        <WorldMap
          isActive={mapActive}
          onStopSelect={handleStopSelect}
          currentStop={currentStop}
          planePosition={planePosition}
          onPlaneMove={handlePlaneMove}
        />
      </div>
      
      {/* Landing Hero Overlay */}
      <LandingHero 
        onBeginJourney={handleBeginJourney}
        isVisible={showHero}
      />
    </div>
  );
};

export default Index;
