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
import { getImagesByLocation, type ImageInfo } from '@/lib/imageRegistry';

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

// Compute a safe card top-left (x,y) given the pin's pixel (px,py)
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
    photos: getImagesByLocation('india'),
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
    photos: getImagesByLocation('california'),
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
    photos: getImagesByLocation('illinois'),
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
    photos: getImagesByLocation('new-york'),
  },
  {
    id: 5,
    name: "Projects & Research",
    title: "Featured Projects",
    description: "Showcasing my technical skills and creativity",
    location: "Cancún, Mexico",
    lat: 19.1619,
    lon: -86.8515,
    route: "/projects&research",
    photos: getImagesByLocation('cancun'),
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
    photos: getImagesByLocation('singapore'),
  },
] as const;

/** --------------------------
 *  Bonus stops (photo galleries only)
 *  -------------------------- */
export const bonusStops = [
  {
    id: 'bonus-florida',
    name: "Florida",
    title: "Bonus Gallery",
    description: "Explore Florida through photos",
    location: "Tampa",
    // lat: 27.6648,
    // lon: -81.5158,
    lat: 25.4,
    lon: -81.0,
    photos: [
      { src: '/images/florida/tampa-sunset.jpg', caption: 'Stunning sunset over the appropriately-named Sunset Beach in Treasure Island.' },
      { src: '/images/florida/tampa-sign.jpg', caption: 'Tampa sign.' },
      { src: '/images/florida/florida-brunch.jpg', caption: 'Brunch spot in Tampa, Florida.' },
      { src: '/images/florida/avocado-toast.jpg', caption: 'Avocado toast and sweet potato fries.' },
      { src: '/images/florida/indoor-view.jpg', caption: 'Interior of the building connected to the brunch spot, with plenty of visitors.' },
      { src: '/images/florida/tampa-skyline-view.jpg', caption: 'A breathtaking nighttime skyline view in Tampa.' },
      { src: '/images/florida/tampa-beach-sand.jpg', caption: 'Golden hour, ocean breeze, and sandy feet.' },
      { src: '/images/florida/kayaking.jpg', caption: 'First-time kayaking along calm waters alive with otters and dragonflies.' },
      { src: '/images/florida/alligator.jpg', caption: 'An alligator’s gaze above the water at the Tampa Aquarium.' },
      { src: '/images/florida/ring-tailed-lemur.jpg', caption: 'A ring-tailed lemur at the Tampa Aquarium, quiet and curious.' },
      { src: '/images/florida/rowing.jpg', caption: 'A rowing crew gliding across the river by one of Tampa\'s universities.' },
    ],
  },
  {
    id: 'bonus-seattle',
    name: "Washington",
    title: "Bonus Gallery",
    description: "Explore Seattle through photos",
    location: "Seattle",
    lat: 43.6062,
    lon: -120.3321,
    photos: [
      { src: '/images/seattle/public-market.jpg', caption: 'The famous Pike Place Market sign, always buzzing with life.' },
      { src: '/images/seattle/seattle-city-skyline-view.jpg', caption: 'Seattle’s skyline sparkling against the water at dusk.' },
      { src: '/images/seattle/seattle-library.jpg', caption: 'The iconic geometric interior of Seattle’s Central Library.' },
      { src: '/images/seattle/space-needle-at-night.jpg', caption: 'The Space Needle glowing under a deep Seattle night sky.' },
      { src: '/images/seattle/space-needle-sunset.jpg', caption: 'Golden hour views over Elliott Bay from the Space Needle.' },
      { src: '/images/seattle/space-needle-view.jpg', caption: 'Seattle’s cityscape stretching into the horizon from the top of the Space Needle.' },
      { src: '/images/seattle/starbucks-reserve.jpg', caption: 'Inside the world’s largest Starbucks Reserve Roastery in Seattle.' },
      { src: '/images/seattle/tacoma.jpg', caption: 'Tacoma views with the mountain rising in the distance.' },
      { src: '/images/seattle/uw-cat-cafe.jpg', caption: 'A cozy cat nap at a cat café and bookstore by UW campus.' },
      { src: '/images/seattle/uw-pad-thai.jpg', caption: 'Student-favorite pad thai, stir-fried to perfection on UW campus.' },
    ],
  },
  {
    id: 'bonus-hawaii',
    name: "Hawaii",
    title: "Bonus Gallery",
    description: "Explore Hawaii through photos",
    location: "Oahu, Maui, Kauai, Big Island",
    lat: 19.3069,
    lon: -155.8583,
    photos: getImagesByLocation('hawaii'),
  },
  {
    id: 'bonus-indonesia',
    name: "Indonesia",
    title: "Bonus Gallery",
    description: "Explore Indonesia through photos",
    location: "Bintan Island",
    lat: -5.3405,
    lon: 105.0920,
    photos: getImagesByLocation('indonesia'),
  },
] as const;

type Stop = (typeof journeyStops)[number];
type BonusStop = (typeof bonusStops)[number];
type AnyStop = Stop | BonusStop;

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
  stop: AnyStop | null;
  x: number;
  y: number;
}

interface LocationCardProps {
  stop: AnyStop;
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
  const [selectedStop, setSelectedStop] = useState<AnyStop | null>(null);
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
  const handlePinMouseEnter = (stop: AnyStop, e: React.MouseEvent) => {
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

  const goToStop = (stop: AnyStop) => {
    if (isPlaneFlying) return;
    setIsPlaneFlying(true);
    
    // Only call onStopSelect for journey stops, not bonus stops
    if ('route' in stop) {
      onStopSelect(stop as Stop);
    }

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

  const handlePinClick = (stop: AnyStop, e: React.MouseEvent) => {
    e.stopPropagation();
    goToStop(stop);
  };

  const handleContinueJourney = () => {
    // Only continue journey for actual journey stops, not bonus stops
    if (selectedStop && 'route' in selectedStop) {
      const nextId = selectedStop.id + 1;
      const next = journeyStops.find((s) => s.id === nextId);
      if (next) {
        setSelectedStop(null);
        // Start plane at current position and fly to next stop
        onPlaneMove(selectedStop.lon, selectedStop.lat);
        setTimeout(() => {
          goToStop(next);
        }, 100);
      } else if (selectedStop.id === journeyStops.length) {
        // Last stop - return to start
        setSelectedStop(null);
        goToStop(journeyStops[0]);
      }
    }
  };

  const handleEnter = () => {
    if (selectedStop && 'route' in selectedStop) {
      window.location.href = selectedStop.route;
    }
  };

  const selectedXY = selectedStop ? project(selectedStop.lon, selectedStop.lat) : null;
  const visitedPages = getVisitedPages();

  const getContinueLabel = (nextStopName?: string, isLast?: boolean) => {
    if (isLast) return 'Return to Start';
    if (!nextStopName) return 'Continue';

    // Shorten this specific long title
    if (nextStopName.trim() === 'Projects & Research') {
      return 'Continue to Projects';
    }
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

        {/* Journey Stops Pins */}
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

        {/* Bonus Stops Pins */}
        {isActive &&
          bonusStops.map((stop) => {
            return (
              <Marker
                key={stop.id}
                coordinates={[stop.lon, stop.lat]}
                onClick={(e) => handlePinClick(stop, e as any)}
                role="button"
                aria-label={`Open ${stop.name} gallery`}
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
                    className="w-8 h-8 text-amber-500 hover:scale-110 transition-transform"
                    fill="currentColor"
                  />
                  {/* <Images
                    className="w-4 h-4 text-white absolute"
                    style={{ transform: 'translate(8px, 6px)' }}
                  /> */}
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
          const isJourneyStop = 'route' in selectedStop;
          const { x, y, placement } = placeCard(
            selectedXY.x, 
            selectedXY.y, 
            isJourneyStop ? (selectedStop as Stop).id : undefined
          );
          const photos = selectedStop.photos || [];
          const currentPhoto = photos[galleryIndex];
          const nextStopId = isJourneyStop ? (selectedStop as Stop).id + 1 : null;
          const nextStop = nextStopId ? journeyStops.find(s => s.id === nextStopId) : null;
          const isLastStop = isJourneyStop ? (selectedStop as Stop).id === journeyStops.length : false;

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
                    {/* Photo Gallery */}
                    {photos.length > 0 && (
                      <div className="space-y-2 flex-shrink-0">
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
                  
                  {/* Action buttons only for journey stops */}
                  {isJourneyStop && (
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
                          {getContinueLabel(nextStop?.name, isLastStop)}
                        </Button>
                      </div>
                    </div>
                  )}
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
