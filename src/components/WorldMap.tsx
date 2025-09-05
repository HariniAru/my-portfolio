// // WorldMap.tsx
// import React, { useMemo, useEffect, useState } from "react";
// import { Plane, MapPin } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// import {
//   ComposableMap,
//   Geographies,
//   Geography,
//   Marker,
//   Graticule,
// } from "react-simple-maps";
// import { geoEqualEarth, geoInterpolate } from "d3-geo";

// const GEO_URL =
//   "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// // Map pixel size (the same numbers you pass to <ComposableMap>)
// const MAP_W = 980;
// const MAP_H = 520;

// // Card metrics used for placement
// const CARD = { width: 320, height: 220, pad: 12, offset: 16 };

// type Anchor = "top" | "bottom" | "left" | "right";

// const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

// /**
//  * Given the pin's pixel coords (x,y) inside the map SVG, return a safe
//  * x/y for the card's top-left corner and which side we anchored to.
//  */
// function placeCard(x: number, y: number): { x: number; y: number; anchor: Anchor } {
//   // Try ABOVE first
//   let px = x - CARD.width / 2;
//   let py = y - CARD.height - CARD.offset;
//   let anchor: Anchor = "top";

//   // If clipped at top, move BELOW
//   if (py < CARD.pad) {
//     anchor = "bottom";
//     py = y + CARD.offset;
//   }

//   // Horizontal clamping for above/below
//   px = clamp(px, CARD.pad, MAP_W - CARD.pad - CARD.width);

//   // If still clipping bottom (e.g., near bottom edge) try SIDE placement
//   const clipsBottom = py + CARD.height > MAP_H - CARD.pad;
//   if (anchor === "bottom" && clipsBottom) {
//     // Choose a side based on which half of the map we're on
//     if (x < MAP_W / 2) {
//       // Place RIGHT of pin
//       anchor = "right";
//       px = x + CARD.offset;
//     } else {
//       // Place LEFT of pin
//       anchor = "left";
//       px = x - CARD.width - CARD.offset;
//     }
//     // Vertically center near the pin, but clamp to the viewport
//     py = clamp(y - CARD.height / 2, CARD.pad, MAP_H - CARD.pad - CARD.height);
//   }

//   return { x: px, y: py, anchor };
// }

// /** --------------------------
//  *  Journey stops (now lat/lon)
//  *  -------------------------- */
// export const journeyStops = [
//   {
//     id: 1,
//     name: "Start",
//     title: "Objective Statement",
//     description: "Where it all began - my journey into Computer Science",
//     location: "Pudukkottai, Tamil Nadu, India",
//     lat: 10.38,
//     lon: 78.82,
//     route: "/start",
//   },
//   {
//     id: 2,
//     name: "Home",
//     title: "About Me",
//     description: "My foundation and where I call home",
//     location: "California, USA",
//     lat: 36.78,
//     lon: -119.42,
//     route: "/home",
//   },
//   {
//     id: 3,
//     name: "Education",
//     title: "Academic Journey",
//     description: "Learning and growing through formal education",
//     location: "Illinois, USA",
//     lat: 40.0,
//     lon: -89.0,
//     route: "/education",
//   },
//   {
//     id: 4,
//     name: "Experience",
//     title: "Work Experience",
//     description: "Professional growth and real-world applications",
//     location: "New York, USA",
//     lat: 40.71,
//     lon: -74.01,
//     route: "/experience",
//   },
//   {
//     id: 5,
//     name: "Projects",
//     title: "Featured Projects",
//     description: "Showcasing my technical skills and creativity",
//     location: "Florida, USA",
//     lat: 27.66,
//     lon: -81.52,
//     route: "/projects",
//   },
// ] as const;

// type Stop = (typeof journeyStops)[number];

// interface WorldMapProps {
//   /** When false, we blur/fade the map (your intro state) */
//   isActive: boolean;
//   onStopSelect: (stop: Stop) => void;
//   currentStop: number | null;

//   /** NEW: planePosition is geographic (lon/lat) */
//   planePosition: { lon: number; lat: number };
//   onPlaneMove: (lon: number, lat: number) => void;
// }

// interface LocationCardProps {
//   stop: Stop;
//   onEnter: () => void;
//   onContinue: () => void;
//   onClose: () => void;
// }

// /** Popover card rendered via <foreignObject> so we can use your shadcn Card */
// const LocationCardSVG: React.FC<
//   LocationCardProps & { x: number; y: number }
// > = ({ stop, onEnter, onContinue, onClose, x, y }) => {
//   const width = 320;
//   const height = 220;
//   // position slightly above the pin
//   const offsetY = 16;

//   return (
//     <foreignObject x={x - width / 2} y={y - height - offsetY} width={width} height={height}>
//       <div className="pointer-events-auto">
//         <Card className="absolute z-20 w-80 bg-card/95 backdrop-blur-sm border-2 border-primary/20 shadow-card-travel animate-card-pop">
//           <CardHeader className="pb-3">
//             <CardTitle className="flex items-center justify-between text-lg">
//               <span>{stop.name}</span>
//               <button
//                 onClick={onClose}
//                 className="text-muted-foreground hover:text-foreground transition-colors"
//               >
//                 ×
//               </button>
//             </CardTitle>
//             <p className="text-sm text-muted-foreground">{stop.location}</p>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div>
//               <h3 className="font-semibold text-base mb-2">{stop.title}</h3>
//               <p className="text-sm text-muted-foreground leading-relaxed">
//                 {stop.description}
//               </p>
//             </div>
//             <div className="flex gap-2">
//               <Button
//                 onClick={onEnter}
//                 variant="default"
//                 size="sm"
//                 className="flex-1 bg-primary hover:bg-primary/90"
//               >
//                 Enter
//               </Button>
//               <Button
//                 onClick={onContinue}
//                 variant="outline"
//                 size="sm"
//                 className="flex-1 border-primary/30 hover:bg-primary/5"
//               >
//                 Continue Journey
//               </Button>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </foreignObject>
//   );
// };

// const WorldMap: React.FC<WorldMapProps> = ({
//   isActive,
//   onStopSelect,
//   currentStop,
//   planePosition,
//   onPlaneMove,
// }) => {
//   const [selectedStop, setSelectedStop] = useState<Stop | null>(null);
//   const [isPlaneFlying, setIsPlaneFlying] = useState(false);

//   const width = 980;
//   const height = 520;
//   const projection = useMemo(
//     () => geoEqualEarth().fitSize([width, height], { type: "Sphere" } as any),
//     []
//   );

//   const project = (lon: number, lat: number) => {
//     const p = projection([lon, lat]);
//     return p ? { x: p[0], y: p[1] } : { x: 0, y: 0 };
//   };


//   const lerpAngle = (a: number, b: number, t: number) => {
//     // shortest angular distance (wrap around 360)
//     const diff = (((b - a) % 360) + 540) % 360 - 180;
//     return a + diff * t;
//   };

//   const [headingDeg, setHeadingDeg] = useState(0);

//   // convert cursor to SVG coords and point nose at it
//   const handleMouseMove: React.MouseEventHandler<SVGSVGElement> = (e) => {
//     if (!isActive || isPlaneFlying) return; // don't react during flight

//     const svg = e.currentTarget;
//     const ctm = svg.getScreenCTM();
//     if (!ctm) return;

//     const pt = svg.createSVGPoint();
//     pt.x = e.clientX;
//     pt.y = e.clientY;

//     const cursor = pt.matrixTransform(ctm.inverse()); // SVG space
//     const plane = project(planePosition.lon, planePosition.lat);

//     const angleRad = Math.atan2(cursor.y - plane.y, cursor.x - plane.x);
//     // setHeadingDeg((angleRad * 180) / Math.PI);
//     setHeadingDeg((prev) => lerpAngle(prev, (angleRad * 180) / Math.PI, 0.2));
//   };



//   const goToStop = (stop: Stop) => {
//     if (isPlaneFlying) return;
//     setIsPlaneFlying(true);
//     onStopSelect(stop);

//     // project current & target to pixel space
//     const start = project(planePosition.lon, planePosition.lat);
//     const end = project(stop.lon, stop.lat);

//     const DURATION = 2000;
//     const t0 = performance.now();
//     let prev = start;

//     const tick = (now: number) => {
//       const t = Math.min(1, (now - t0) / DURATION);
//       const x = start.x + (end.x - start.x) * t;
//       const y = start.y + (end.y - start.y) * t;

//       // rotate to face movement
//       const angle = Math.atan2(y - prev.y, x - prev.x);
//       setHeadingDeg((angle * 180) / Math.PI);
//       prev = { x, y };

//       // invert back to lon/lat for the Marker
//       const inv = (projection as any).invert?.([x, y]);
//       if (inv) {
//         const [lon, lat] = inv;
//         onPlaneMove(lon, lat);
//       }

//       if (t < 1) requestAnimationFrame(tick);
//       else {
//         setSelectedStop(stop);
//         setIsPlaneFlying(false);
//       }
//     };

//     requestAnimationFrame(tick);
//   };

//   useEffect(() => {
//     if (isActive && !selectedStop && !currentStop) {
//       goToStop(journeyStops[0]);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [isActive]);

//   const handlePinClick = (stop: Stop, e: React.MouseEvent) => {
//     e.stopPropagation();
//     goToStop(stop);
//   };

//   const handleContinueJourney = () => {
//     const nextId = selectedStop ? selectedStop.id + 1 : (currentStop ?? 0) + 1;
//     const next = journeyStops.find((s) => s.id === nextId);
//     if (next) {
//       setSelectedStop(null);
//       goToStop(next);
//     }
//   };

//   const handleEnter = () => {
//     if (selectedStop) window.location.href = selectedStop.route;
//   };

//   const planeXY = project(planePosition.lon, planePosition.lat);
//   const selectedXY = selectedStop ? project(selectedStop.lon, selectedStop.lat) : null;

//   return (
//     <div className={`relative w-full h-full transition-all duration-1000 ${isActive ? "opacity-100" : "opacity-30 blur-sm"}`}>
//       <ComposableMap
//         projection={projection}
//         width={980}
//         height={520}
//         className="w-full h-full"
//         onMouseMove={handleMouseMove}
//         style={{ overflow: 'visible' }}   // optional, helps with glow/shadow
//       >
//         <defs>
//           {/* inner shadow for “paper cutout” look */}
//           <filter id="landInnerShadow" x="-20%" y="-20%" width="140%" height="140%">
//             <feOffset dx="0" dy="1" />
//             <feGaussianBlur stdDeviation="2" result="offset-blur" />
//             <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
//             <feFlood floodColor="#000000" floodOpacity="0.18" result="color" />
//             <feComposite operator="in" in="color" in2="inverse" result="shadow" />
//             <feComposite operator="over" in="shadow" in2="SourceGraphic" />
//           </filter>
//         </defs>

//         {/* Ocean backdrop to prove the SVG is there */}
//         <rect x={0} y={0} width={980} height={520} fill="#ffffff" />

//         <Graticule stroke="#e9f0f0" strokeWidth={0.5} opacity={0.4} />

//         {/* ⬇️ THIS DRAWS THE LAND. If this is missing, the map looks “gone”. */}
//         <Geographies geography={GEO_URL}>
//           {({ geographies }) =>
//             geographies.map((geo) => (
//               <Geography
//                 key={geo.rsmKey}
//                 geography={geo}
//                 fill="#bcd3d3"             // calm aqua
//                 stroke="#ffffff"
//                 strokeWidth={0.6}
//                 strokeLinejoin="round"
//                 strokeLinecap="round"
//                 style={{
//                   default: { filter: "url(#landInnerShadow)" },
//                   hover:   { filter: "url(#landInnerShadow)", opacity: 0.95 },
//                   pressed: { filter: "url(#landInnerShadow)" },
//                 }}
//               />
//             ))
//           }
//         </Geographies>

//         {/* Pins */}
//         {isActive && journeyStops.map((stop) => (
//           <Marker
//             key={stop.id}
//             coordinates={[stop.lon, stop.lat]}
//             onClick={(e) => handlePinClick(stop, e as any)}
//             role="button"
//             aria-label={`Open ${stop.name}`}
//             tabIndex={0}
//             onKeyDown={(e) => {
//               if (e.key === "Enter" || e.key === " ") handlePinClick(stop, e as any);
//             }}
//           >
//             {/* invisible hit area */}
//             <circle r={18} fill="transparent" className="cursor-pointer" />

//             {/* pin */}
//             <g transform="translate(-12,-30)" className="cursor-pointer">
//               <MapPin
//                 className={`w-8 h-8 transition-transform ${
//                   currentStop === stop.id
//                     ? "text-primary scale-125 drop-shadow-lg"
//                     : "text-primary/70 hover:text-primary hover:scale-110"
//                 }`}
//                 fill="currentColor"
//               />
//               <text
//                 x="12"
//                 y="16"
//                 textAnchor="middle"
//                 className="pointer-events-none"
//                 style={{ fontSize: 10, fontWeight: 700, fill: "#fff" }}
//               >
//                 {stop.id}
//               </text>
//             </g>
//           </Marker>

//         ))}

//         {/* Plane */}
//         {isActive && (
//         <Marker coordinates={[planePosition.lon, planePosition.lat]}>
//           <g transform={`translate(-12,-12) rotate(${headingDeg},12,12)`}>
//             <Plane
//               className={`w-6 h-6 text-foreground drop-shadow-plane ${
//                 isPlaneFlying ? "" : "animate-plane-float"
//               }`}
//               fill="currentColor"
//             />
//           </g>
//         </Marker>
//       )}

//         {/* Card */}
//         {selectedStop && selectedXY && (() => {
//         const CARD_W = 320;
//         const CARD_H = 220;
//         const MARGIN = 12;     // breathing room from edges
//         const PIN_GAP = 16;    // gap from the pin

//         // Start by placing above the pin
//         let x = selectedXY.x - CARD_W / 2;
//         let y = selectedXY.y - CARD_H - PIN_GAP;

//         // If above goes off the top, flip below the pin
//         if (y < MARGIN) {
//           y = selectedXY.y + PIN_GAP;
//         }

//         // Clamp within SVG bounds so it never gets cut off
//         x = Math.max(MARGIN, Math.min(x, 980 - CARD_W - MARGIN));
//         y = Math.max(MARGIN, Math.min(y, 520 - CARD_H - MARGIN));

//         return (
//           <foreignObject
//             x={x}
//             y={y}
//             width={CARD_W}
//             height={CARD_H}
//             className="pointer-events-auto"
//           >
//             <div>
//               <Card className="w-80 bg-card/95 backdrop-blur-sm border-2 border-primary/20 shadow-card-travel animate-card-pop">
//                 <CardHeader className="pb-3">
//                   <CardTitle className="flex items-center justify-between text-lg">
//                     <span>{selectedStop.name}</span>
//                     <button
//                       onClick={() => setSelectedStop(null)}
//                       className="text-muted-foreground hover:text-foreground transition-colors"
//                     >
//                       ×
//                     </button>
//                   </CardTitle>
//                   <p className="text-sm text-muted-foreground">{selectedStop.location}</p>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                   <div>
//                     <h3 className="font-semibold text-base mb-2">{selectedStop.title}</h3>
//                     <p className="text-sm text-muted-foreground leading-relaxed">
//                       {selectedStop.description}
//                     </p>
//                   </div>
//                   <div className="flex gap-2">
//                     <Button onClick={handleEnter} size="sm" className="flex-1 bg-primary hover:bg-primary/90">
//                       Enter
//                     </Button>
//                     <Button
//                       onClick={handleContinueJourney}
//                       variant="outline"
//                       size="sm"
//                       className="flex-1 border-primary/30 hover:bg-primary/5"
//                     >
//                       Continue Journey
//                     </Button>
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>
//           </foreignObject>
//         );
//       })()}

//       </ComposableMap>
//     </div>
//   );

// };

// export default WorldMap;



// WorldMap.tsx
import React, { useMemo, useEffect, useState } from "react";
import { Plane, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Graticule,
} from "react-simple-maps";
import { geoEqualEarth } from "d3-geo";

const GEO_URL =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// Map pixel size (must match <ComposableMap> width/height)
const MAP_W = 980;
const MAP_H = 520;

// Card metrics - smaller for better UX
const CARD_W = 280;
const CARD_H = 180;
const CARD_MARGIN = 16; // padding from edges
const PIN_GAP = 12;     // gap from pin

// Compute a safe card top-left (x,y) given the pin’s pixel (px,py)
function placeCard(px: number, py: number, stopId?: number) {
  // Default: try above first
  let x = px - CARD_W / 2;
  let y = py - CARD_H - PIN_GAP;

  // If clipped at top, move below
  if (y < CARD_MARGIN) {
    y = py + PIN_GAP;
  }

  // If still clipped at bottom, try sides
  if (y + CARD_H > MAP_H - CARD_MARGIN) {
    if (px < MAP_W / 2) {
      // Place to the right
      x = px + PIN_GAP + 20;
      y = py - CARD_H / 2;
    } else {
      // Place to the left
      x = px - CARD_W - PIN_GAP - 20;
      y = py - CARD_H / 2;
    }
  }

  // Special cases for better placement
  if (stopId === 1) {
    // India: prefer left side to avoid center clustering
    x = px - CARD_W - PIN_GAP - 10;
    y = py - CARD_H / 2;
  } else if (stopId === 4) {
    // New York: prefer right side to avoid edge clipping
    x = px + PIN_GAP + 10;
    y = py - CARD_H / 2;
  }

  // Final clamping to ensure it stays in bounds
  x = Math.max(CARD_MARGIN, Math.min(x, MAP_W - CARD_W - CARD_MARGIN));
  y = Math.max(CARD_MARGIN, Math.min(y, MAP_H - CARD_H - CARD_MARGIN));

  return { x, y };
}

/** --------------------------
 *  Journey stops (lon/lat)
 *  -------------------------- */
export const journeyStops = [
  {
    id: 1,
    name: "Start",
    title: "Objective Statement",
    description: "Where it all began - my journey into Computer Science",
    location: "Pudukkottai, Tamil Nadu, India",
    lat: 10.38,
    lon: 78.82,
    route: "/start",
  },
  {
    id: 2,
    name: "Home",
    title: "About Me",
    description: "My foundation and where I call home",
    location: "California, USA",
    lat: 36.78,
    lon: -119.42,
    route: "/home",
  },
  {
    id: 3,
    name: "Education",
    title: "Academic Journey",
    description: "Learning and growing through formal education",
    location: "Illinois, USA",
    lat: 40.0,
    lon: -89.0,
    route: "/education",
  },
  {
    id: 4,
    name: "Experience",
    title: "Work Experience",
    description: "Professional growth and real-world applications",
    location: "New York, USA",
    lat: 40.71,
    lon: -74.01,
    route: "/experience",
  },
  {
    id: 5,
    name: "Projects",
    title: "Featured Projects",
    description: "Showcasing my technical skills and creativity",
    location: "Cancún, Mexico",
    lat: 19.1619,
    lon: -86.8515,
    route: "/projects&research",
  },
  {
    id: 6,
    name: "Leadership & Involvement",
    title: "Leadership & Involvement",
    description: "Showcasing my leadership skills and community involvement",
    location: "Florida, USA",
    lat: 27.66,
    lon: -81.52,
    route: "/leadership&involvement",
  },
] as const;

type Stop = (typeof journeyStops)[number];

interface WorldMapProps {
  isActive: boolean;
  onStopSelect: (stop: Stop) => void;
  currentStop: number | null;
  planePosition: { lon: number; lat: number };
  onPlaneMove: (lon: number, lat: number) => void;
}

interface LocationCardProps {
  stop: Stop;
  onEnter: () => void;
  onContinue: () => void;
  onClose: () => void;
}

const WorldMap: React.FC<WorldMapProps> = ({
  isActive,
  onStopSelect,
  currentStop,
  planePosition,
  onPlaneMove,
}) => {
  const [selectedStop, setSelectedStop] = useState<Stop | null>(null);
  const [isPlaneFlying, setIsPlaneFlying] = useState(false);
  const [headingDeg, setHeadingDeg] = useState(0);

  const projection = useMemo(
    () => geoEqualEarth().fitSize([MAP_W, MAP_H], { type: "Sphere" } as any),
    []
  );

  const project = (lon: number, lat: number) => {
    const p = projection([lon, lat]);
    return p ? { x: p[0], y: p[1] } : { x: 0, y: 0 };
  };

  // smooth angle helper
  const lerpAngle = (a: number, b: number, t: number) => {
    const diff = (((b - a) % 360) + 540) % 360 - 180;
    return a + diff * t;
  };

  // Cursor → aim nose (but NOT while flying)
  const handleMouseMove: React.MouseEventHandler<SVGSVGElement> = (e) => {
    if (!isActive || isPlaneFlying) return;
    const svg = e.currentTarget;
    const ctm = svg.getScreenCTM();
    if (!ctm) return;

    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;

    const cursor = pt.matrixTransform(ctm.inverse());
    const plane = project(planePosition.lon, planePosition.lat);
    const angleRad = Math.atan2(cursor.y - plane.y, cursor.x - plane.x);
    setHeadingDeg((prev) => lerpAngle(prev, (angleRad * 180) / Math.PI, 0.2));
  };

  const goToStop = (stop: Stop) => {
    if (isPlaneFlying) return;
    setIsPlaneFlying(true);
    onStopSelect(stop);

    // animate in pixel space for more stable heading
    const start = project(planePosition.lon, planePosition.lat);
    const end = project(stop.lon, stop.lat);

    const DURATION = 2000;
    const t0 = performance.now();
    let prev = start;

    const tick = (now: number) => {
      const t = Math.min(1, (now - t0) / DURATION);
      const x = start.x + (end.x - start.x) * t;
      const y = start.y + (end.y - start.y) * t;

      // rotate toward motion
      const angle = Math.atan2(y - prev.y, x - prev.x);
      setHeadingDeg((angle * 180) / Math.PI);
      prev = { x, y };

      // convert back to lon/lat for the Marker
      const inv = (projection as any).invert?.([x, y]);
      if (inv) {
        const [lon, lat] = inv;
        onPlaneMove(lon, lat);
      }

      if (t < 1) requestAnimationFrame(tick);
      else {
        setSelectedStop(stop);
        setIsPlaneFlying(false);
      }
    };

    requestAnimationFrame(tick);
  };

  // Auto-fly to first stop when map activates
  useEffect(() => {
    if (isActive && !selectedStop && !currentStop) {
      goToStop(journeyStops[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive]);

  const handlePinClick = (stop: Stop, e: React.MouseEvent) => {
    e.stopPropagation();
    goToStop(stop);
  };

  const handleContinueJourney = () => {
    const nextId = selectedStop ? selectedStop.id + 1 : (currentStop ?? 0) + 1;
    const next = journeyStops.find((s) => s.id === nextId);
    if (next) {
      setSelectedStop(null);
      goToStop(next);
    }
  };

  const handleEnter = () => {
    if (selectedStop) window.location.href = selectedStop.route;
  };

  const selectedXY = selectedStop ? project(selectedStop.lon, selectedStop.lat) : null;

  return (
    <div
      className={`relative w-full h-full transition-all duration-1000 ${
        isActive ? "opacity-100" : "opacity-30 blur-sm"
      }`}
    >
      <ComposableMap
        projection={projection}
        width={MAP_W}
        height={MAP_H}
        className="w-full h-full"
        onMouseMove={handleMouseMove}
        style={{ overflow: "visible" }}
      >
        <defs>
          <filter id="landInnerShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feOffset dx="0" dy="1" />
            <feGaussianBlur stdDeviation="2" result="offset-blur" />
            <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
            <feFlood floodColor="#000000" floodOpacity="0.18" result="color" />
            <feComposite operator="in" in="color" in2="inverse" result="shadow" />
            <feComposite operator="over" in="shadow" in2="SourceGraphic" />
          </filter>
        </defs>

        <rect x={0} y={0} width={MAP_W} height={MAP_H} fill="#ffffff" />
        <Graticule stroke="#e9f0f0" strokeWidth={0.5} opacity={0.4} />

        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#bcd3d3"
                stroke="#ffffff"
                strokeWidth={0.6}
                strokeLinejoin="round"
                strokeLinecap="round"
                style={{
                  default: { filter: "url(#landInnerShadow)" },
                  hover: { filter: "url(#landInnerShadow)", opacity: 0.95 },
                  pressed: { filter: "url(#landInnerShadow)" },
                }}
              />
            ))
          }
        </Geographies>

        {/* Pins */}
        {isActive &&
          journeyStops.map((stop) => (
            <Marker
              key={stop.id}
              coordinates={[stop.lon, stop.lat]}
              onClick={(e) => handlePinClick(stop, e as any)}
              role="button"
              aria-label={`Open ${stop.name}`}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") handlePinClick(stop, e as any);
              }}
            >
              <circle r={18} fill="transparent" className="cursor-pointer" />
              <g transform="translate(-12,-30)" className="cursor-pointer">
                <MapPin
                  className={`w-8 h-8 transition-transform ${
                    currentStop === stop.id
                      ? "text-primary scale-125 drop-shadow-lg"
                      : "text-primary/70 hover:text-primary hover:scale-110"
                  }`}
                  fill="currentColor"
                />
                <text
                  x="12"
                  y="16"
                  textAnchor="middle"
                  className="pointer-events-none"
                  style={{ fontSize: 10, fontWeight: 700, fill: "#fff" }}
                >
                  {stop.id}
                </text>
              </g>
            </Marker>
          ))}

        {/* Plane */}
        {isActive && (
          <Marker coordinates={[planePosition.lon, planePosition.lat]}>
            <g transform={`translate(-12,-12) rotate(${headingDeg},12,12)`}>
              <Plane
                className={`w-6 h-6 text-foreground drop-shadow-plane ${
                  isPlaneFlying ? "" : "animate-plane-float"
                }`}
                fill="currentColor"
              />
            </g>
          </Marker>
        )}

        {/* Compact popup card with smart placement */}
        {selectedStop && selectedXY && (() => {
          const { x, y } = placeCard(selectedXY.x, selectedXY.y, selectedStop.id);

          return (
            <foreignObject
              x={x}
              y={y}
              width={CARD_W}
              height={CARD_H}
              className="pointer-events-auto"
            >
              <div className="transform transition-all duration-300 ease-out">
                <Card className="w-full bg-card/95 backdrop-blur-md border border-primary/30 shadow-lg hover:shadow-xl transition-shadow duration-300 animate-card-pop">
                  <CardHeader className="pb-2 px-4 pt-3">
                    <CardTitle className="flex items-center justify-between text-base">
                      <span className="font-semibold">{selectedStop.name}</span>
                      <button
                        onClick={() => setSelectedStop(null)}
                        className="text-muted-foreground hover:text-foreground transition-colors w-6 h-6 flex items-center justify-center rounded-full hover:bg-accent"
                        aria-label="Close"
                      >
                        ×
                      </button>
                    </CardTitle>
                    <p className="text-xs text-muted-foreground">{selectedStop.location}</p>
                  </CardHeader>
                  <CardContent className="px-4 pb-3 space-y-3">
                    <div>
                      <h3 className="font-medium text-sm mb-1">{selectedStop.title}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                        {selectedStop.description}
                      </p>
                    </div>
                    <div className="flex gap-1.5">
                      <Button 
                        onClick={handleEnter} 
                        size="sm" 
                        className="flex-1 bg-primary hover:bg-primary/90 text-xs h-8 transition-colors duration-200"
                      >
                        Enter
                      </Button>
                      <Button
                        onClick={handleContinueJourney}
                        variant="outline"
                        size="sm"
                        className="flex-1 border-primary/30 hover:bg-primary/5 text-xs h-8 transition-colors duration-200"
                      >
                        Continue
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </foreignObject>
          );
        })()}
      </ComposableMap>
    </div>
  );
};

export default WorldMap;
