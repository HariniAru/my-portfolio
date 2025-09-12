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
import { Plane, MapPin, ChevronLeft, ChevronRight, Images } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { getVisitedPages } from '@/lib/journey';

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

// Card metrics - optimized for better UX
const CARD_W = 320;
const CARD_H = 280; // Increased to accommodate photo gallery
const CARD_MAX_H = Math.min(CARD_H, MAP_H * 0.7); // 70% of viewport height max
const CARD_MARGIN = 20; // padding from edges
const PIN_GAP = 16;     // gap from pin

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

  return { x, y, placement: 'auto' };
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
    location: "Tamil Nadu, India",
    lat: 10.38,
    lon: 78.82,
    route: "/start",
    photos: [
      { src: '/src/assets/india/city-scene.jpg', caption: 'A vibrant, bustling street scene just outside the city of Karaikudi in Tamil Nadu.' },
      { src: '/src/assets/india/karaikudi-home.jpg', caption: 'My grandmother on a walk by our home in Karaikudi.' },
      { src: '/src/assets/india/theppakulam.jpg', caption: 'A theppakulam (pond of holy water) in front of the Karpaka Vinayakar temple.' },
    ],
  },
  {
    id: 2,
    name: "Home",
    title: "About Me",
    description: "My foundation and where I call home",
    location: "Bay Area, California",
    lat: 36.78,
    lon: -119.42,
    route: "/home",
    photos: [
      { src: '/src/assets/california/civic-center.jpg', caption: 'The Civic Center in San Francisco.' },
      { src: '/src/assets/california/golden-gate-bridge.jpg', caption: 'The Golden Gate Bridge, a symbol of San Francisco.' },
      { src: '/src/assets/california/half-moon-bay.jpg', caption: 'Cliffside serenity in the coastal fog at Half Moon Bay.' },
    ],
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
    photos: [
      { src: '/src/assets/illinois/busey-hall.jpg', caption: 'My freshman year dorm.' },
      { src: '/src/assets/illinois/bardeen-quad.jpg', caption: 'A view of the Bardeen Quad from the top floor of the CIF building.' },
      { src: '/src/assets/illinois/graduation-pose.jpg', caption: 'Sporting my graduation gown by the steps of the Foellinger Auditorium.' },
    ],
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
    photos: [
      { src: '/src/assets/new york/brooklyn-bridge.jpg', caption: 'Stunning view of the Brooklyn Bridge at nighttime.' },
      { src: '/src/assets/new york/central-park.jpg', caption: 'A peaceful walk down a path in Central Park' },
      { src: '/src/assets/new york/met.jpg', caption: 'Crowds climbing the steps of the Met, heading into history.' },
    ],
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
    photos: [
      { src: '/src/assets/cancun/cancun-sunrise.jpg', caption: 'Sunrise over the coastline of the Fiesta Americana Resort in Cancun.' },
      { src: '/src/assets/cancun/chichen-itza-pyramid.jpg', caption: 'Chichén Itzá pyramid – a testament to Mayan architecture.' },
      { src: '/src/assets/cancun/isla-mujeres-beach.jpg', caption: 'Relaxing beach vibes on Isla Mujeres.' },
    ],
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
    photos: [
      { src: '/src/assets/singapore/nature-view.jpg', caption: 'Singapore nature view' },
      { src: '/src/assets/singapore/garden-rhapsody.jpg', caption: 'Garden Rhapsody light show' },
    ],
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

interface TooltipState {
  show: boolean;
  stop: Stop | null;
  x: number;
  y: number;
}

interface LocationCardProps {
  stop: Stop;
  onEnter: () => void;
  onContinue: () => void;
  onClose: () => void;
}

// Function to get URL parameter
function getNextStopId(): number | null {
  const urlParams = new URLSearchParams(window.location.search);
  const nextParam = urlParams.get('next');
  return nextParam ? parseInt(nextParam, 10) : null;
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
  const [tooltip, setTooltip] = useState<TooltipState>({ show: false, stop: null, x: 0, y: 0 });
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

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

  // Cursor → aim nose (ALWAYS when map is active, but more responsive)
  const handleMouseMove: React.MouseEventHandler<SVGSVGElement> = (e) => {
    if (!isActive || isPlaneFlying) return; // Don't override during flight
    const svg = e.currentTarget;
    const ctm = svg.getScreenCTM();
    if (!ctm) return;

    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;

    const cursor = pt.matrixTransform(ctm.inverse());
    const plane = project(planePosition.lon, planePosition.lat);
    const angleRad = Math.atan2(cursor.y - plane.y, cursor.x - plane.x);
    const targetAngle = (angleRad * 180) / Math.PI;
    
    // More responsive interpolation when not flying
    setHeadingDeg((prev) => lerpAngle(prev, targetAngle, 0.4));
  };

  // Handle pin hover for tooltips
  const handlePinMouseEnter = (stop: Stop, e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltip({
      show: true,
      stop,
      x: rect.left + rect.width / 2,
      y: rect.top - 10
    });
  };

  const handlePinMouseLeave = () => {
    setTooltip({ show: false, stop: null, x: 0, y: 0 });
  };

  const goToStop = (stop: Stop) => {
    if (isPlaneFlying) return;
    setIsPlaneFlying(true);
    onStopSelect(stop);

    // animate in pixel space for more stable heading
    const start = project(planePosition.lon, planePosition.lat);
    const end = project(stop.lon, stop.lat);

    // Faster animation and smoother easing
    const DURATION = 1200; // Reduced from 2000ms
    const t0 = performance.now();
    let prev = start;

    // Ease-in-out function for smoother animation
    const easeInOut = (t: number) => {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    };

    const tick = (now: number) => {
      const rawT = Math.min(1, (now - t0) / DURATION);
      const t = easeInOut(rawT); // Apply easing
      
      const x = start.x + (end.x - start.x) * t;
      const y = start.y + (end.y - start.y) * t;

      // rotate toward motion with smoother interpolation
      const dx = x - prev.x;
      const dy = y - prev.y;
      if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
        const angle = Math.atan2(dy, dx);
        setHeadingDeg((prev) => lerpAngle(prev, (angle * 180) / Math.PI, 0.3));
      }
      prev = { x, y };

      // convert back to lon/lat for the Marker
      const inv = (projection as any).invert?.([x, y]);
      if (inv) {
        const [lon, lat] = inv;
        onPlaneMove(lon, lat);
      }

      if (rawT < 1) {
        requestAnimationFrame(tick);
      } else {
        setSelectedStop(stop);
        setIsPlaneFlying(false);
      }
    };

    requestAnimationFrame(tick);
  };

  // Handle map activation and journey progression
  useEffect(() => {
    if (!isActive) return;

    const nextStopId = getNextStopId();
    const visitedPages = getVisitedPages();
    
    if (nextStopId) {
      // User clicked "Continue Journey" from a page
      const targetStop = journeyStops.find(s => s.id === nextStopId);
      if (targetStop) {
        // Find the current stop based on the visited page we came from
        const prevStop = journeyStops.find(s => s.id === nextStopId - 1);
        
        if (prevStop) {
          // Position plane at the previous stop (where user was)
          onPlaneMove(prevStop.lon, prevStop.lat);
          
          // Brief delay to ensure plane is positioned, then fly to target
          setTimeout(() => {
            goToStop(targetStop);
          }, 200);
        } else {
          // Fallback: just go to target stop
          goToStop(targetStop);
        }
        
        // Clean up URL
        window.history.replaceState({}, '', window.location.pathname);
        return;
      }
    }

    // Default behavior - go to first unvisited stop or position at last visited
    if (!selectedStop && !currentStop) {
      const lastVisitedStop = visitedPages.length > 0 
        ? journeyStops.find(stop => visitedPages.includes(stop.route))
        : null;
      
      if (lastVisitedStop) {
        // Position plane at last visited location without opening card
        onPlaneMove(lastVisitedStop.lon, lastVisitedStop.lat);
      } else {
        // New user, go to first stop
        goToStop(journeyStops[0]);
      }
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
      // Start plane at current position and fly to next stop
      if (selectedStop) {
        // Ensure plane is at the current stop before flying
        onPlaneMove(selectedStop.lon, selectedStop.lat);
        setTimeout(() => {
          goToStop(next);
        }, 100);
      } else {
        goToStop(next);
      }
    } else if (selectedStop?.id === journeyStops.length) {
      // Last stop - return to start
      setSelectedStop(null);
      goToStop(journeyStops[0]);
    }
  };

  const handleEnter = () => {
    if (selectedStop) window.location.href = selectedStop.route;
  };

  const selectedXY = selectedStop ? project(selectedStop.lon, selectedStop.lat) : null;
  const visitedPages = getVisitedPages();
  // const visitedStops = journeyStops.filter(stop => visitedPages.includes(stop.route));

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

        {/* Journey Path Lines */}
        {/* {isActive && visitedStops.length > 1 && (
          <g>
            {visitedStops.slice(0, -1).map((stop, index) => {
              const nextStop = visitedStops[index + 1];
              const start = project(stop.lon, stop.lat);
              const end = project(nextStop.lon, nextStop.lat);
              
              return (
                <g key={`path-${stop.id}-${nextStop.id}`}>
                  <line
                    x1={start.x}
                    y1={start.y}
                    x2={end.x}
                    y2={end.y}
                    stroke="#6366f1"
                    strokeWidth={4}
                    opacity={0.2}
                  />
                  <line
                    x1={start.x}
                    y1={start.y}
                    x2={end.x}
                    y2={end.y}
                    stroke="#6366f1"
                    strokeWidth={2.5}
                    strokeDasharray="8,4"
                    opacity={0.8}
                    className="animate-pulse"
                    style={{
                      filter: 'drop-shadow(0 2px 4px rgba(99, 102, 241, 0.3))'
                    }}
                  />
                </g>
              );
            })}
          </g>
        )} */}

        {/* Pins */}
        {isActive &&
          journeyStops.map((stop) => {
            const isVisited = visitedPages.includes(stop.route);
            return (
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
                <circle 
                  r={18} 
                  fill="transparent" 
                  className="cursor-pointer" 
                  onMouseEnter={(e) => handlePinMouseEnter(stop, e as any)}
                  onMouseLeave={handlePinMouseLeave}
                />
                <g 
                  transform="translate(-12,-30)" 
                  className="cursor-pointer"
                  onMouseEnter={(e) => handlePinMouseEnter(stop, e as any)}
                  onMouseLeave={handlePinMouseLeave}
                >
                  <MapPin
                    className={`w-8 h-8 transition-transform ${
                      currentStop === stop.id
                        ? "text-primary scale-125 drop-shadow-lg"
                        : isVisited
                        ? "text-primary hover:scale-110"
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
            );
          })}

        {/* Plane */}
        {isActive && (
          <Marker coordinates={[planePosition.lon, planePosition.lat]}>
            <g transform={`translate(-12,-12) rotate(${headingDeg},12,12)`}>
              {/* Plane shadow for depth */}
              <Plane
                className="w-6 h-6 text-foreground/20"
                fill="currentColor"
                transform="translate(1,1)"
              />
              {/* Main plane */}
              <Plane
                className={`w-6 h-6 text-foreground transition-all duration-300 ${
                  isPlaneFlying 
                    ? "drop-shadow-lg" 
                    : "drop-shadow-plane hover:scale-110"
                }`}
                fill="currentColor"
                style={{
                  filter: isPlaneFlying 
                    ? 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))' 
                    : 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))'
                }}
              />
            </g>
          </Marker>
        )}

        {/* Enhanced popup card with photo gallery and overflow protection */}
        {selectedStop && selectedXY && (() => {
          const { x, y, placement } = placeCard(selectedXY.x, selectedXY.y, selectedStop.id);
          const photos = selectedStop.photos || [];
          const currentPhoto = photos[galleryIndex];
          const nextStopId = selectedStop.id + 1;
          const nextStop = journeyStops.find(s => s.id === nextStopId);
          const isLastStop = selectedStop.id === journeyStops.length;

          return (
            <foreignObject
              x={x}
              y={y}
              width={CARD_W}
              height={CARD_MAX_H}
              className="pointer-events-auto"
            >
              <div className="transform transition-all duration-300 ease-out animate-card-pop h-full">
                <Card className="w-full h-full bg-card/95 backdrop-blur-md border-2 border-primary/30 shadow-xl transition-shadow duration-300 flex flex-col">
                  <CardHeader className="pb-2 px-4 pt-3 flex-shrink-0">
                    <CardTitle className="flex items-center justify-between text-base">
                      <span className="font-semibold text-foreground">{selectedStop.name}</span>
                      <button
                        onClick={() => setSelectedStop(null)}
                        className="text-muted-foreground hover:text-foreground transition-colors w-7 h-7 flex items-center justify-center rounded-full hover:bg-accent text-lg"
                        aria-label="Close"
                      >
                        ×
                      </button>
                    </CardTitle>
                    <p className="text-xs text-muted-foreground font-medium">{selectedStop.location}</p>
                  </CardHeader>
                  
                  {/* Scrollable content area */}
                  <CardContent className="px-4 pb-3 flex-1 overflow-y-auto space-y-3 min-h-0">
                    <div className="flex-shrink-0">
                      <h3 className="font-semibold text-sm mb-1 text-foreground">{selectedStop.title}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {selectedStop.description}
                      </p>
                    </div>
                    
                    {/* Photo Gallery */}
                    {photos.length > 0 && (
                      <div className="space-y-2 flex-shrink-0">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Images className="h-3 w-3" />
                          <span className="font-medium">Photos ({galleryIndex + 1}/{photos.length})</span>
                        </div>
                        <div className="relative aspect-video bg-muted/30 rounded-lg overflow-hidden border border-primary/10 shadow-sm">
                          {currentPhoto && (
                            <>
                              <img
                                src={currentPhoto.src}
                                alt={currentPhoto.caption}
                                className="w-full h-full object-cover cursor-pointer transition-transform hover:scale-105"
                                onClick={() => {
                                  setLightboxIndex(galleryIndex);
                                  setLightboxOpen(true);
                                }}
                              />
                              {photos.length > 1 && (
                                <>
                                  <button
                                    onClick={() => setGalleryIndex((prev) => prev === 0 ? photos.length - 1 : prev - 1)}
                                    className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-background/90 border border-primary/20 flex items-center justify-center hover:bg-background transition-all hover:scale-110"
                                    aria-label="Previous photo"
                                  >
                                    <ChevronLeft className="h-4 w-4" />
                                  </button>
                                  <button
                                    onClick={() => setGalleryIndex((prev) => prev === photos.length - 1 ? 0 : prev + 1)}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-background/90 border border-primary/20 flex items-center justify-center hover:bg-background transition-all hover:scale-110"
                                    aria-label="Next photo"
                                  >
                                    <ChevronRight className="h-4 w-4" />
                                  </button>
                                </>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    )}
                  </CardContent>
                  
                  {/* Fixed action buttons at bottom */}
                  <div className="px-4 pb-3 flex-shrink-0 border-t border-primary/10 pt-3">
                    <div className="flex gap-2">
                      <Button 
                        onClick={handleEnter} 
                        size="sm" 
                        className="flex-1 bg-primary hover:bg-primary/90 text-xs h-9 transition-all duration-200 hover:scale-105 font-medium"
                      >
                        Enter
                      </Button>
                      <Button
                        onClick={handleContinueJourney}
                        variant="outline"
                        size="sm"
                        className="flex-1 border-primary/30 hover:bg-primary/5 text-xs h-9 transition-all duration-200 hover:scale-105 font-medium"
                      >
                        {isLastStop ? 'Return to Start' : `Continue${nextStop ? ` to ${nextStop.name}` : ''}`}
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </foreignObject>
          );
        })()}
      </ComposableMap>
      
      {/* Hover Tooltip */}
      {tooltip.show && tooltip.stop && (
        <div 
          className="fixed z-50 px-4 py-3 bg-background/95 border-2 border-primary/30 rounded-xl shadow-xl text-sm backdrop-blur-md pointer-events-none transition-all duration-200 animate-card-pop"
          style={{
            left: tooltip.x,
            top: tooltip.y,
            transform: 'translate(-50%, -100%)',
            filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.15))'
          }}
        >
          <div className="font-semibold text-foreground">{tooltip.stop.location}</div>
          <div className="text-xs text-muted-foreground font-medium">{tooltip.stop.name}</div>
        </div>
      )}
      
      {/* Photo Lightbox */}
      {selectedStop?.photos && (
        <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
          <DialogContent className="p-0 bg-background/95 border border-primary/20 max-w-3xl">
            <button
              className="absolute right-3 top-3 z-10 rounded-full p-1 bg-background/80 border border-primary/20"
              onClick={() => setLightboxOpen(false)}
              aria-label="Close"
            >
              ×
            </button>
            {selectedStop.photos[lightboxIndex] && (
              <>
                <img
                  src={selectedStop.photos[lightboxIndex].src}
                  alt={selectedStop.photos[lightboxIndex].caption}
                  className="w-full h-auto object-contain rounded-t-lg"
                />
                <div className="p-4 text-sm text-muted-foreground">
                  {selectedStop.photos[lightboxIndex].caption}
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default WorldMap;
