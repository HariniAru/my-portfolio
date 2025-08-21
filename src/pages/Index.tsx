// import React, { useState } from 'react';
// import WorldMap, { journeyStops } from '@/components/WorldMap';
// import LandingHero from '@/components/LandingHero';
// import Navigation from '@/components/Navigation';

// const Index = () => {
//   const [showHero, setShowHero] = useState(true);
//   const [mapActive, setMapActive] = useState(false);
//   const [currentStop, setCurrentStop] = useState<number | null>(null);
//   const [planePosition, setPlanePosition] = useState({ x: 50, y: 50 });

//   const handleBeginJourney = () => {
//     setShowHero(false);
//     setMapActive(true);
    
//     // Start the journey at the first stop
//     setTimeout(() => {
//       const firstStop = journeyStops[0];
//       setPlanePosition({ x: firstStop.coordinates.x, y: firstStop.coordinates.y });
//       setCurrentStop(firstStop.id);
//     }, 500);
//   };

//   const handleStopSelect = (stop: typeof journeyStops[0]) => {
//     setCurrentStop(stop.id);
//   };

//   const handlePlaneMove = (x: number, y: number) => {
//     setPlanePosition({ x, y });
//   };

//   return (
//     <div className="min-h-screen bg-gradient-hero relative overflow-hidden">
//       <Navigation currentPage="/" />
      
//       {/* World Map Background */}
//       <div className="absolute inset-0">
//         <WorldMap
//           isActive={mapActive}
//           onStopSelect={handleStopSelect}
//           currentStop={currentStop}
//           planePosition={planePosition}
//           onPlaneMove={handlePlaneMove}
//         />
//       </div>
      
//       {/* Landing Hero Overlay */}
//       <LandingHero 
//         onBeginJourney={handleBeginJourney}
//         isVisible={showHero}
//       />
//     </div>
//   );
// };

// export default Index;


// pages/Index.tsx
import React, { useState } from 'react';
import WorldMap, { journeyStops } from '@/components/WorldMap';
import LandingHero from '@/components/LandingHero';
import Navigation from '@/components/Navigation';

const Index = () => {
  const [showHero, setShowHero] = useState(true);
  const [mapActive, setMapActive] = useState(false);
  const [currentStop, setCurrentStop] = useState<number | null>(null);

  // 🚨 IMPORTANT: plane uses geographic coords now
  const [planePosition, setPlanePosition] = useState({ lon: 78.82, lat: 10.38 }); // near Pudukkottai

  const handleBeginJourney = () => {
    setShowHero(false);
    setMapActive(true); // WorldMap will auto-fly to #1 when this turns true
  };

  const handleStopSelect = (stop: typeof journeyStops[number]) => {
    setCurrentStop(stop.id);
  };

  // signature now (lon, lat)
  const handlePlaneMove = (lon: number, lat: number) => {
    setPlanePosition({ lon, lat });
  };

  return (
    <div className="min-h-screen bg-gradient-hero relative overflow-hidden">
      <Navigation currentPage="/" />

      <div className="absolute inset-0">
        <WorldMap
          isActive={mapActive}
          onStopSelect={handleStopSelect}
          currentStop={currentStop}
          planePosition={planePosition}        // { lon, lat }
          onPlaneMove={handlePlaneMove}        // (lon, lat) => void
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
