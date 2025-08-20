import React from 'react';
import { ArrowLeft, MapPin, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Navigation from '@/components/Navigation';

const Start = () => {
  const handleBackToMap = () => {
    window.location.href = '/';
  };

  const handleContinueJourney = () => {
    window.location.href = '/home';
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation currentPage="/start" />
      
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
            <span>Pudukkottai, Tamil Nadu, India</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-8 animate-fade-in">
          {/* Title Section */}
          <div className="text-center space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground">
              START
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              This country is my starting point. I was born in Pudukkottai, Tamil Nadu, India - 
              where my journey into the world of technology and Computer Science began.
            </p>
          </div>

          {/* Objective Statement Card */}
          <Card className="bg-card/80 backdrop-blur-sm border-2 border-primary/20 shadow-card-travel">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <Target className="h-8 w-8 text-primary" />
                Objective Statement
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">
                    My Mission
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    As a passionate software engineer, my objective is to leverage cutting-edge technology 
                    to solve real-world problems and create meaningful digital experiences. I believe in 
                    the power of code to transform ideas into reality and make a positive impact on people's lives.
                  </p>
                </div>
                
                <div className="bg-accent/50 p-6 rounded-lg border border-primary/10">
                  <h4 className="font-semibold text-foreground mb-3">Core Values</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      Innovation through continuous learning
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      Collaborative problem-solving
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      Building accessible technology
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      Ethical and sustainable development
                    </li>
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-primary/10">
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  When we start something, we often think about what our goals are for that task.
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  As an engineer, my objective is to bridge the gap between complex technical challenges 
                  and elegant, user-friendly solutions. I strive to write clean, maintainable code while 
                  staying at the forefront of emerging technologies and best practices.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-center">
            <Button 
              onClick={handleContinueJourney}
              size="lg"
              className="px-8 py-6 text-lg bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-105"
            >
              Continue Journey to California
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Start;