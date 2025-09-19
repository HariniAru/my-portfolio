






// import React, { useState, useEffect } from 'react';
// import { Menu, X, Home, GraduationCap, Briefcase, FolderOpen, MapPin } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { journeyStops } from './WorldMap';
// import { getVisitedPages } from '@/lib/journey';

// interface NavigationProps {
//   currentPage?: string;
//   onNavigate?: (route: string) => void;
// }

// const Navigation: React.FC<NavigationProps> = ({ currentPage, onNavigate }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [visitedPages, setVisitedPages] = useState<string[]>([]);

//   useEffect(() => {
//     setVisitedPages(getVisitedPages());
//   }, [currentPage]); // Update when currentPage changes

//   const navItems = [
//     { name: 'Map', route: '/', icon: MapPin },
//     { name: 'Start', route: '/start', icon: MapPin },
//     { name: 'Home', route: '/home', icon: Home },
//     { name: 'Education', route: '/education', icon: GraduationCap },
//     { name: 'Experience', route: '/experience', icon: Briefcase },
//     { name: 'Projects & Research', route: '/projects&research', icon: FolderOpen },
//     { name: 'Leadership & Involvement', route: '/leadership&involvement', icon: FolderOpen },
//   ];

//   const handleNavigation = (route: string) => {
//     if (onNavigate) {
//       onNavigate(route);
//     } else {
//       window.location.href = route;
//     }
//     setIsOpen(false);
//   };

//   return (
//     <>
//       {/* Mobile Menu Button */}
//       <Button
//         variant="outline"
//         size="icon"
//         className="fixed top-6 left-6 z-50 bg-background/80 backdrop-blur-sm border-primary/20"
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
//       </Button>

//       {/* Navigation Drawer */}
//       <div
//         className={`
//           fixed inset-y-0 left-0 w-80 bg-background/95 backdrop-blur-sm border-r border-primary/20 shadow-lg z-40
//           transform transition-transform duration-300 ease-in-out
//           ${isOpen ? 'translate-x-0' : '-translate-x-full'}
//         `}
//       >
//         {/* Make the drawer a column and put scrolling on the inner container */}
//         <div className="flex h-full flex-col overscroll-contain">
//           <div className="flex-1 overflow-y-auto pt-20 px-6 pb-24">
//             <h2 className="text-xl font-bold text-foreground mb-6">Portfolio Navigation</h2>

//             <nav className="space-y-2">
//               {navItems.map((item) => {
//                 const Icon = item.icon;
//                 const isActive = currentPage === item.route;

//                 return (
//                   <Button
//                     key={item.route}
//                     variant={isActive ? 'default' : 'ghost'}
//                     className={`w-full justify-start gap-3 h-12 ${
//                       isActive
//                         ? 'bg-primary text-primary-foreground'
//                         : 'hover:bg-primary/10 text-foreground'
//                     }`}
//                     onClick={() => handleNavigation(item.route)}
//                   >
//                     <Icon className="h-5 w-5" />
//                     {item.name}
//                   </Button>
//                 );
//               })}
//             </nav>

//             {/* Journey Progress */}
//             <div className="mt-8 p-4 rounded-lg bg-accent/50 border border-primary/20">
//               <h3 className="text-sm font-semibold text-foreground mb-3">Journey Progress</h3>
//               <div className="space-y-2">
//                 {journeyStops.map((stop) => {
//                   const isVisited = visitedPages.includes(stop.route);
//                   const isCurrent = currentPage === stop.route;
//                   return (
//                     <div key={stop.id} className="flex items-center gap-2 text-sm">
//                       <div
//                         className={`w-2 h-2 rounded-full ${
//                           isCurrent
//                             ? 'bg-primary animate-pulse'
//                             : isVisited
//                             ? 'bg-primary'
//                             : 'bg-muted-foreground/30'
//                         }`}
//                       />
//                       <span
//                         className={
//                           isCurrent
//                             ? 'text-foreground font-medium'
//                             : isVisited
//                             ? 'text-foreground'
//                             : 'text-muted-foreground'
//                         }
//                       >
//                         {stop.name}
//                       </span>
//                       {isCurrent && <span className="text-xs text-primary">(current)</span>}
//                     </div>
//                   );
//                 })}
//               </div>
//               <div className="mt-3 text-xs text-muted-foreground">
//                 {visitedPages.length} of {journeyStops.length} stops visited
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Overlay */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-background/20 backdrop-blur-sm z-30"
//           onClick={() => setIsOpen(false)}
//         />
//       )}
//     </>
//   );
// };

// export default Navigation;





import React, { useState, useEffect } from 'react';
import { Menu, X, Home, GraduationCap, Briefcase, FolderOpen, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { journeyStops } from './WorldMap';
import { getVisitedPages } from '@/lib/journey';
import { Link, useLocation } from 'react-router-dom';

interface NavigationProps {
  /** Optional: you can stop passing this once you switch to useLocation everywhere */
  currentPage?: string;
  onNavigate?: (route: string) => void;
}

/** Normalize routes so comparisons are robust */
const normalizePath = (p: string) => {
  if (!p) return '/';
  try {
    p = decodeURIComponent(p); // turn %26 into &
  } catch {}
  // strip trailing slashes except root
  if (p.length > 1 && p.endsWith('/')) p = p.slice(0, -1);
  return p;
};

const Navigation: React.FC<NavigationProps> = ({ currentPage, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [visitedPages, setVisitedPages] = useState<string[]>([]);
  const location = useLocation();

  // Active path prefers the router, falls back to prop if provided
  const activePath = normalizePath(currentPage ?? location.pathname);

  useEffect(() => {
    setVisitedPages(getVisitedPages());
  }, [activePath]); // update when route changes

  const navItems = [
    { name: 'Map', route: '/', icon: MapPin },
    { name: 'Start', route: '/start', icon: MapPin },
    { name: 'Home', route: '/home', icon: Home },
    { name: 'Education', route: '/education', icon: GraduationCap },
    { name: 'Experience', route: '/experience', icon: Briefcase },
    { name: 'Projects & Research', route: '/projects&research', icon: FolderOpen },
    { name: 'Leadership & Involvement', route: '/leadership&involvement', icon: FolderOpen },
  ] as const;

  const handleNavigation = (route: string) => {
    if (onNavigate) onNavigate(route);
    else window.location.href = route;
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="outline"
        size="icon"
        className="fixed top-6 left-6 z-50 bg-background/80 backdrop-blur-sm border-primary/20"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open navigation"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Navigation Drawer */}
      <div
        className={`
          fixed inset-y-0 left-0 w-80 bg-background/95 backdrop-blur-sm border-r border-primary/20 shadow-lg z-40
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex h-full flex-col overscroll-contain">
          <div className="flex-1 overflow-y-auto pt-20 px-6 pb-24">
            <h2 className="text-xl font-bold text-foreground mb-6">Portfolio Navigation</h2>

            <nav className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activePath === normalizePath(item.route);

                return (
                  <Button
                    key={item.route}
                    variant={isActive ? 'default' : 'ghost'}
                    className={`w-full justify-start gap-3 h-12 ${
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-primary/10 text-foreground'
                    }`}
                    onClick={() => handleNavigation(item.route)}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="truncate">{item.name}</span>
                    {isActive && <span className="ml-2 text-teal-400">(current)</span>}
                  </Button>
                );
              })}
            </nav>

            {/* Journey Progress */}
            <div className="mt-8 p-4 rounded-lg bg-accent/50 border border-primary/20">
              <h3 className="text-sm font-semibold text-foreground mb-3">Journey Progress</h3>
              <div className="space-y-2">
                {journeyStops.map((stop) => {
                  const isVisited = visitedPages.includes(stop.route);
                  const isCurrent = activePath === normalizePath(stop.route);

                  // Use the same label here as your nav shows (Projects & Research)
                  // const label =
                  //   stop.name === 'Projects' ? 'Projects & Research' : stop.name;

                  return (
                    <div key={stop.id} className="flex items-center gap-2 text-sm">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          isCurrent
                            ? 'bg-primary animate-pulse'
                            : isVisited
                            ? 'bg-primary'
                            : 'bg-muted-foreground/30'
                        }`}
                      />
                      <span
                        className={
                          isCurrent
                            ? 'text-foreground font-medium'
                            : isVisited
                            ? 'text-foreground'
                            : 'text-muted-foreground'
                        }
                      >
                        {stop.name}
                      </span>
                      {isCurrent && <span className="text-xs text-primary">(current)</span>}
                    </div>
                  );
                })}
              </div>
              <div className="mt-3 text-xs text-muted-foreground">
                {visitedPages.length} of {journeyStops.length} stops visited
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/20 backdrop-blur-sm z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Navigation;
