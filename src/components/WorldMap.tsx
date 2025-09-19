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
      { src: '/images/india/city-scene.jpg', caption: 'A vibrant, bustling street scene just outside the city of Karaikudi in Tamil Nadu.' },
      { src: '/images/india/karaikudi-home.jpg', caption: 'My grandmother on a walk by our home in Karaikudi.' },
      { src: '/images/india/theppakulam.jpg', caption: 'A theppakulam (pond of holy water) in front of the Karpaka Vinayakar temple.' },
      { src: '/images/india/filter-coffee.jpg', caption: 'Savoring freshly made filter coffee with my family.' },
      { src: '/images/india/deer.jpg', caption: 'A deer quietly greets us, peeking out from the trees and bushes on our morning forest walk.' },
      { src: '/images/india/cows-grazing.jpg', caption: 'A herd of cows grazing peacefully in the fields outside a temple.', },
      { src: '/images/india/jackfruit.jpg', caption: 'A ripe jackfruit hanging from a tree in the backyard of our ancestral home in Athangudi.' },
      { src: '/images/india/calf.jpg', caption: 'A calf waiting for its mother in my grandmother\'s farm in Arasampatti.' },
      { src: '/images/india/tamarind-tree.jpg', caption: 'A tamarind tree by our home in Ararasampatti, bearing fruit.' },
      { src: '/images/india/outdoor-restaurant.jpg', caption: 'Outdoor hut-like seating at the Karaikudi Garden Biriyani restaurant in Karaikudi.' },
      { src: '/images/india/vimana.jpg', caption: 'The vimana of the Karpaka Vinayakar temple, rising gracefully into the monsoon sky.' },
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
      { src: '/images/california/civic-center.jpg', caption: 'The Civic Center in San Francisco.' },
      { src: '/images/california/mural.jpg', caption: 'A mural of a man running on a high school building in San Francisco.' },
      { src: '/images/california/fine-arts-museum.jpg', caption: 'View at the top of the Fine Arts Museum building in San Francisco.' },
      { src: '/images/california/golden-gate-bridge.jpg', caption: 'The Golden Gate Bridge, a symbol of San Francisco.' },
      { src: '/images/california/half-moon-bay.jpg', caption: 'Cliffside serenity in the coastal fog at Half Moon Bay.' },
      { src: '/images/california/lake-tahoe.jpg', caption: 'A serene view of Lake Tahoe, surrounded by mountains.' },
      { src: '/images/california/pastries.jpg', caption: 'Delicious pastries from Arsicault, a famous French bakery in San Francisco.' },
    ],
  },
  {
    id: 3,
    name: "Education",
    title: "Academic Journey",
    description: "Learning and growing through formal education",
    location: "Illinois",
    lat: 40.0,
    lon: -89.0,
    route: "/education",
    photos: [
      { src: '/images/illinois/busey-hall.jpg', caption: 'My freshman year dorm.' },
      { src: '/images/illinois/bardeen-quad.jpg', caption: 'A view of the Bardeen Quad from the top floor of the CIF building.' },
      { src: '/images/illinois/swe-photo-wall.jpg', caption: 'Photo wall composed of SWE shirt designs at a SWE Diversity event.' },
      { src: '/images/illinois/dads-4-daughters.jpg', caption: 'Dads 4 Daughters event organized by SWE at UIUC.' },
      { src: '/images/illinois/snow-on-campus.jpg', caption: 'Snow on campus by the bridge area near the engineering quad.' },
      { src: '/images/illinois/snow-heart.jpg', caption: 'A heart made with my friend’s and my boots during a particularly snowy walk to class.' },
      { src: '/images/illinois/graduation-pose.jpg', caption: 'Sporting my graduation gown by the steps of the Foellinger Auditorium.' },
      { src: '/images/illinois/commencement-ceremony.jpg', caption: 'An exhilerating, memorable Commencement ceremony at the Memorial Stadium.' },
    ],
  },
  {
    id: 4,
    name: "Experience",
    title: "Work Experience",
    description: "Professional growth and real-world applications",
    location: "New York",
    lat: 40.71,
    lon: -74.01,
    route: "/experience",
    photos: [
      { src: '/images/new york/brooklyn-bridge.jpg', caption: 'Stunning view of the Brooklyn Bridge at nighttime.' },
      { src: '/images/new york/aladdin-broadway.jpg', caption: 'Inside a beautiful Broadway theater, moments before Aladdin begins.' },
      { src: '/images/new york/central-park.jpg', caption: 'A peaceful walk down a path in Central Park' },
      { src: '/images/new york/chinatown.jpg', caption: 'Rows of lanterns guide the way through Chinatown.' },
      { src: '/images/new york/met.jpg', caption: 'Crowds climbing the steps of the Met, heading into history.' },
      { src: '/images/new york/met-interior.jpg', caption: 'The Met’s American Wing, glowing with afternoon light.' },
      { src: '/images/new york/new-york-street.jpg', caption: 'Walking past towers and time in lower Manhattan.' },
      { src: '/images/new york/south-street-seaport.jpg', caption: 'Cobblestone streets and city views down by the South Street Seaport in FiDi.' }
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
      { src: '/images/cancun/cancun-sunrise.jpg', caption: 'Sunrise over the coastline of the Fiesta Americana Resort in Cancun.' },
      { src: '/images/cancun/hut-ceiling.jpg', caption: 'Palm-thatched ceiling view from our stay at the Fiesta Americana Resort in Cancun.' },
      { src: '/images/cancun/valladolid-centro-church.jpg', caption: 'Quick snap of a beautiful church in Valladolid Centro while crossing the street.' },
      { src: '/images/cancun/cancun-paragliding.jpg', caption: 'Morning paragliding over Benito Juárez — blue skies above, cool waters below.' },
      { src: '/images/cancun/chichen-itza-pyramid.jpg', caption: 'Chichén Itzá pyramid – a testament to Mayan architecture.' },
      { src: '/images/cancun/chichen-itza-wall-mural.jpg', caption: 'A powerful, intense mural at Chichén Itzá, depicting an ancient ritual beheading for the gods.' },
      { src: '/images/cancun/isla-mujeres-sharks.jpg', caption: 'Sharks swimming in the reserves of Isla Mujeres.' },
      { src: '/images/cancun/isla-mujeres-beach.jpg', caption: 'Relaxing beach vibes on Isla Mujeres.' },
    ],
  },
  {
    id: 6,
    name: "Leadership & Involvement",
    title: "Leadership & Involvement",
    description: "Showcasing my leadership skills and community involvement",
    location: "Singapore",
    // lat: 27.66,
    // lon: -81.52,
    lat: 1.3521,
    lon: 102.8,
    route: "/leadership&involvement",
    photos: [
      { src: '/images/singapore/jewel-rain-vortex.jpg', caption: 'The Jewel Rain Vortex at Changi Airport.' },
      { src: '/images/singapore/garden-rhapsody.jpg', caption: 'The mesmerizing Garden Rhapsody light show in Gardens by the Bay.' },
      { src: '/images/singapore/greenhouse-indoor.jpg', caption: 'A mini safari beneath Singapore’s giant greenhouse canopy.' },
      { src: '/images/singapore/greenhouse-sunset.jpg', caption: 'Golden hour from within the glass conservatory.' },
      { src: '/images/singapore/bugis-junction.jpg', caption: 'Entrance of Bugis Junction mall in Singapore.' },
      { src: '/images/singapore/singapore-apartment-sunset-view.jpg', caption: 'A sunset illuminates Singapore\'s city skyline.' },
      { src: '/images/singapore/helix-bridge.jpg', caption: 'The Helix Bridge at night, a stunning architectural marvel.' },
      { src: '/images/singapore/singapore-city-skyline.jpg', caption: 'The Singapore city skyline at night, a breathtaking view.' },
      { src: '/images/singapore/nature-view.jpg', caption: 'Tropical trail, water on the horizon.' },
      { src: '/images/singapore/singapore-apartment-night-view.jpg', caption: 'The tall buildings of Singapore glow at night.' },
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
  animateToStop?: number | null; // Add this prop to trigger animation
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
  animateToStop
}) => {
  console.log('WorldMap component loaded with animateToStop:', animateToStop);
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

    // Default behavior - go to first unvisited stop or position at last visited
    if (!selectedStop && !currentStop) {
      const visitedPages = getVisitedPages();
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

  // Handle external animation requests
  useEffect(() => {
    console.log('WorldMap useEffect - animateToStop:', animateToStop, 'isActive:', isActive);
    if (animateToStop && isActive) {
      const targetStop = journeyStops.find(s => s.id === animateToStop);
      console.log('Found targetStop:', targetStop);
      if (targetStop) {
        goToStop(targetStop);
      }
    }
  }, [animateToStop, isActive]);

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

  const getContinueLabel = (nextStopName?: string, isLast?: boolean) => {
    if (isLast) return 'Return to Start';
    if (!nextStopName) return 'Continue';

    // Shorten this specific long title
    if (nextStopName.trim() === 'Leadership & Involvement') {
      return 'Continue to Leadership';
    }
    return `Continue to ${nextStopName.trim()}`;
};

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
                    {/* <div className="flex-shrink-0">
                      <h3 className="font-semibold text-sm mb-1 text-foreground">{selectedStop.title}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {selectedStop.description}
                      </p>
                    </div> */}
                    
                    {/* Photo Gallery */}
                    {photos.length > 0 && (
                      <div className="space-y-2 flex-shrink-0">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          {/* <Images className="h-3 w-3" /> */}
                          {/* <span className="font-medium">Photos ({galleryIndex + 1}/{photos.length})</span> */}
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
                      {/* <Button
                        onClick={handleContinueJourney}
                        variant="outline"
                        size="sm"
                        className="flex-1 border-primary/30 hover:bg-primary/5 text-xs h-9 transition-all duration-200 hover:scale-105 font-medium"
                      >
                        {isLastStop ? 'Return to Start' : `Continue${nextStop ? ` to ${nextStop.name}` : ''}`}
                      </Button> */}
                      <Button
                        onClick={handleContinueJourney}
                        variant="outline"
                        size="sm"
                        className="flex-1 border-primary/30 hover:bg-primary/5 text-xs h-9 transition-all duration-200 hover:scale-105 font-medium"                      >
                        {/* <span className="text-xs block w-full text-center whitespace-nowrap overflow-hidden text-ellipsis"> */}
                          {getContinueLabel(nextStop?.name, isLastStop)}
                        {/* </span> */}
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
