import React from 'react';
import { FileDown, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TopRightButtonsProps {
  className?: string;
}

const TopRightButtons: React.FC<TopRightButtonsProps> = ({ className = '' }) => {
  return (
    <div className={`fixed top-6 right-6 z-50 flex gap-2 ${className}`}>
      <Button
        asChild
        variant="outline"
        size="icon"
        className="bg-background/80 backdrop-blur-sm border-primary/20 hover:bg-primary/10 transition-all duration-200 hover:scale-105"
      >
        <a
          href="https://drive.google.com/file/d/1jOxKXMELNMyJXem_6vGwdsoDzhYBKi44/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Download Resume"
        >
          <FileDown className="h-4 w-4" />
        </a>
      </Button>
      <Button
        asChild
        variant="outline"
        size="icon"
        className="bg-background/80 backdrop-blur-sm border-primary/20 hover:bg-primary/10 transition-all duration-200 hover:scale-105"
      >
        <a
          href="https://github.com/HariniAru"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View GitHub Profile"
        >
          <Github className="h-4 w-4" />
        </a>
      </Button>
    </div>
  );
};

export default TopRightButtons;