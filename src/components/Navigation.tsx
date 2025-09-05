import React, { useState } from 'react';
import { Menu, X, Home, GraduationCap, Briefcase, FolderOpen, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { journeyStops } from './WorldMap';

interface NavigationProps {
  currentPage?: string;
  onNavigate?: (route: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentPage, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Map', route: '/', icon: MapPin },
    { name: 'Start', route: '/start', icon: MapPin },
    { name: 'Home', route: '/home', icon: Home },
    { name: 'Education', route: '/education', icon: GraduationCap },
    { name: 'Experience', route: '/experience', icon: Briefcase },
    { name: 'Projects & Research', route: '/projects&research', icon: FolderOpen },
    { name: 'Leadership & Involvement', route: '/leadership&involvement', icon: FolderOpen },
  ];

  const handleNavigation = (route: string) => {
    if (onNavigate) {
      onNavigate(route);
    } else {
      window.location.href = route;
    }
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
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Navigation Menu */}
      <div className={`
        fixed top-0 left-0 h-full w-80 bg-background/95 backdrop-blur-sm border-r border-primary/20 shadow-lg z-40 
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="pt-20 px-6">
          <h2 className="text-xl font-bold text-foreground mb-6">Portfolio Navigation</h2>
          
          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.route;
              
              return (
                <Button
                  key={item.route}
                  variant={isActive ? "default" : "ghost"}
                  className={`w-full justify-start gap-3 h-12 ${
                    isActive 
                      ? 'bg-primary text-primary-foreground' 
                      : 'hover:bg-primary/10 text-foreground'
                  }`}
                  onClick={() => handleNavigation(item.route)}
                >
                  <Icon className="h-5 w-5" />
                  {item.name}
                </Button>
              );
            })}
          </nav>

          {/* Journey Progress */}
          <div className="mt-8 p-4 rounded-lg bg-accent/50 border border-primary/20">
            <h3 className="text-sm font-semibold text-foreground mb-3">Journey Progress</h3>
            <div className="space-y-2">
              {journeyStops.map((stop, index) => (
                <div key={stop.id} className="flex items-center gap-2 text-sm">
                  <div className={`w-2 h-2 rounded-full ${
                    index < 2 ? 'bg-primary' : 'bg-muted-foreground/30'
                  }`} />
                  <span className={index < 2 ? 'text-foreground' : 'text-muted-foreground'}>
                    {stop.name}
                  </span>
                </div>
              ))}
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