import React, { useState, useEffect } from 'react';
import WorldMap, { journeyStops } from '@/components/WorldMap';
import LandingHero from '@/components/LandingHero';
import Navigation from '@/components/Navigation';
import { isFirstVisit, markVisited, getLastStop, getPlanePosition, setPlanePosition, setLastStop } from '@/lib/journey';

const Index = () => {
  const [showHero, setShowHero] = useState(true);
  const [mapActive, setMapActive] = useState(false);
  const [currentStop, setCurrentStop] = useState<number | null>(null);
  const [animateToStop, setAnimateToStop] = useState<number | null>(null);

  const [planePosition, setPlanePositionState] = useState({ lon: 78.82, lat: 10.38 });

  useEffect(() => {
    const firstTime = isFirstVisit();
    
    if (!firstTime) {
      setShowHero(false);
      setMapActive(true);

      const savedPosition = getPlanePosition();
      const lastStop = getLastStop();
      
      if (savedPosition) {
        setPlanePositionState(savedPosition);
      }
      
      if (lastStop) {
        setCurrentStop(lastStop);
      }
    }
    
    const urlParams = new URLSearchParams(window.location.search);
    const nextStopId = urlParams.get('next');
    const currentStopId = urlParams.get('from');
    
    if (nextStopId && !firstTime) {
      const nextStop = journeyStops.find(stop => stop.id === parseInt(nextStopId, 10));
      const currentStop = currentStopId ? 
        journeyStops.find(stop => stop.id === parseInt(currentStopId, 10)) : 
        journeyStops.find(stop => stop.id === parseInt(nextStopId, 10) - 1);
      
      if (nextStop && currentStop) {
        setPlanePositionState({ lon: currentStop.lon, lat: currentStop.lat });
        setCurrentStop(currentStop.id);

        setTimeout(() => {
          setAnimateToStop(nextStop.id);
          setCurrentStop(nextStop.id);
          setLastStop(nextStop.id);
        }, 150);
      }

      window.history.replaceState({}, '', '/');
    }
  }, []);

  useEffect(() => {
    if (animateToStop) {
      const timer = setTimeout(() => {
        setAnimateToStop(null);
      }, 1400);
      return () => clearTimeout(timer);
    }
  }, [animateToStop]);

  const handleBeginJourney = () => {
    markVisited();
    setShowHero(false);
    setMapActive(true);
  };

  const handleStopSelect = (stop: typeof journeyStops[number]) => {
    setCurrentStop(stop.id);
    setLastStop(stop.id);
  };

  const handlePlaneMove = (lon: number, lat: number) => {
    const newPosition = { lon, lat };
    setPlanePositionState(newPosition);
    setPlanePosition(newPosition);
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <Navigation currentPage="/" />

      <div className="absolute inset-0">
        <WorldMap
          isActive={mapActive}
          onStopSelect={handleStopSelect}
          currentStop={currentStop}
          planePosition={planePosition}
          onPlaneMove={handlePlaneMove}
          animateToStop={animateToStop}
        />
      </div>

      <LandingHero
        onBeginJourney={handleBeginJourney}
        isVisible={showHero}
      />
    </div>
  );
};

export default Index;
