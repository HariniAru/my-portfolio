import React from 'react';
import { ArrowLeft, MapPin, User, Heart, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Navigation from '@/components/Navigation';

const Home = () => {
  const handleBackToMap = () => {
    window.location.href = '/';
  };

  const handleContinueJourney = () => {
    window.location.href = '/education';
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation currentPage="/home" />
      
      <div className="container mx-auto px-6 py-20 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="outline" 
            size="icon"
            onClick={handleBackToMap}
            className="border-primary/30"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-5 w-5" />
            <span>California, USA</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-8 animate-fade-in">
          {/* Title Section */}
          <div className="text-center space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground">
              HOME
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              My foundation and where I call home - California, where dreams meet innovation 
              and technology shapes the future.
            </p>
          </div>

          {/* About Me Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Personal Story */}
            <Card className="bg-card/80 backdrop-blur-sm border-2 border-primary/20 shadow-card-travel">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <User className="h-6 w-6 text-primary" />
                  About Me
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Born in India and now calling California home, I bring a unique perspective 
                  that blends diverse cultural experiences with cutting-edge technical skills. 
                  My journey from the vibrant landscapes of Tamil Nadu to the innovative 
                  ecosystem of Silicon Valley has shaped my approach to technology and problem-solving.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  I believe that the best solutions come from understanding both the human element 
                  and the technical possibilities, creating bridges between complex technology 
                  and real-world applications.
                </p>
              </CardContent>
            </Card>

            {/* Passions & Interests */}
            <Card className="bg-card/80 backdrop-blur-sm border-2 border-primary/20 shadow-card-travel">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Heart className="h-6 w-6 text-primary" />
                  Passions & Interests
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Code className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <div className="font-medium text-foreground">Full-Stack Development</div>
                      <div className="text-sm text-muted-foreground">Building end-to-end solutions</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-primary rounded-full mt-1"></div>
                    <div>
                      <div className="font-medium text-foreground">Travel & Exploration</div>
                      <div className="text-sm text-muted-foreground">Discovering new cultures and perspectives</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-primary rounded-full mt-1"></div>
                    <div>
                      <div className="font-medium text-foreground">Continuous Learning</div>
                      <div className="text-sm text-muted-foreground">Staying curious about emerging technologies</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-primary rounded-full mt-1"></div>
                    <div>
                      <div className="font-medium text-foreground">Community Building</div>
                      <div className="text-sm text-muted-foreground">Connecting with fellow developers</div>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Philosophy */}
          <Card className="bg-card/80 backdrop-blur-sm border-2 border-primary/20 shadow-card-travel">
            <CardContent className="pt-6">
              <blockquote className="text-center">
                <p className="text-lg md:text-xl text-foreground italic leading-relaxed mb-4">
                  "Technology is best when it brings people together and solves real problems. 
                  My goal is to create solutions that not only work efficiently but also 
                  make a meaningful difference in people's lives."
                </p>
                <footer className="text-muted-foreground">
                  — My development philosophy
                </footer>
              </blockquote>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-center">
            <Button 
              onClick={handleContinueJourney}
              size="lg"
              className="px-8 py-6 text-lg bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-105"
            >
              Continue Journey to Illinois
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;