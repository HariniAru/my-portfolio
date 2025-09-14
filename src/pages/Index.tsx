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

  // Initialize plane position from session storage or default
  const [planePosition, setPlanePositionState] = useState({ lon: 78.82, lat: 10.38 });

  useEffect(() => {
    // Check if this is first visit
    const firstTime = isFirstVisit();
    
    if (!firstTime) {
      // Not first visit - skip hero and go straight to map
      setShowHero(false);
      setMapActive(true);
      
      // Restore last plane position and stop
      const savedPosition = getPlanePosition();
      const lastStop = getLastStop();
      
      if (savedPosition) {
        setPlanePositionState(savedPosition);
      }
      
      if (lastStop) {
        setCurrentStop(lastStop);
      }
    }
    
    // Check for auto-navigation to next stop (from "Continue Journey" buttons)
    const urlParams = new URLSearchParams(window.location.search);
    const nextStopId = urlParams.get('next');
    const currentStopId = urlParams.get('from');
    
    if (nextStopId && !firstTime) {
      const nextStop = journeyStops.find(stop => stop.id === parseInt(nextStopId, 10));
      const currentStop = currentStopId ? 
        journeyStops.find(stop => stop.id === parseInt(currentStopId, 10)) : 
        journeyStops.find(stop => stop.id === parseInt(nextStopId, 10) - 1);
      
      if (nextStop && currentStop) {
        // Place plane at current stop first
        setPlanePositionState({ lon: currentStop.lon, lat: currentStop.lat });
        setCurrentStop(currentStop.id);
        
        // Then trigger animation to next stop after a short delay
        setTimeout(() => {
          setAnimateToStop(nextStop.id);
          setCurrentStop(nextStop.id);
          setLastStop(nextStop.id); // Save to session storage
        }, 800);
      }
      
      // Clean up URL
      window.history.replaceState({}, '', '/');
    }
  }, []);

  // Reset animation trigger after it's been processed
  useEffect(() => {
    if (animateToStop) {
      const timer = setTimeout(() => {
        setAnimateToStop(null);
      }, 2000); // Clear after animation completes
      return () => clearTimeout(timer);
    }
  }, [animateToStop]);

  const handleBeginJourney = () => {
    markVisited(); // Mark that user has visited
    setShowHero(false);
    setMapActive(true); // WorldMap will auto-fly to #1 when this turns true
  };

  const handleStopSelect = (stop: typeof journeyStops[number]) => {
    setCurrentStop(stop.id);
    setLastStop(stop.id); // Save to session storage
  };

  // signature now (lon, lat)
  const handlePlaneMove = (lon: number, lat: number) => {
    const newPosition = { lon, lat };
    setPlanePositionState(newPosition);
    setPlanePosition(newPosition); // Save to session storage
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <Navigation currentPage="/" />

      <div className="absolute inset-0">
        <WorldMap
          isActive={mapActive}
          onStopSelect={handleStopSelect}
          currentStop={currentStop}
          planePosition={planePosition}        // { lon, lat }
          onPlaneMove={handlePlaneMove}        // (lon, lat) => void
          animateToStop={animateToStop}        // trigger animation
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
