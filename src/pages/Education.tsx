import React from 'react';
import { ArrowLeft, MapPin, GraduationCap, Book, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Navigation from '@/components/Navigation';

const Education = () => {
  const handleBackToMap = () => {
    window.location.href = '/';
  };

  const handleContinueJourney = () => {
    window.location.href = '/experience';
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation currentPage="/education" />
      
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
            <span>Illinois, USA</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-8 animate-fade-in">
          {/* Title Section */}
          <div className="text-center space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground">
              EDUCATION
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Learning and growing through formal education - my academic journey 
              that laid the foundation for my technical expertise.
            </p>
          </div>

          {/* Education Timeline */}
          <div className="space-y-6">
            {/* University Education */}
            <Card className="bg-card/80 backdrop-blur-sm border-2 border-primary/20 shadow-card-travel">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <GraduationCap className="h-7 w-7 text-primary" />
                  Bachelor of Science in Computer Science
                </CardTitle>
                <p className="text-muted-foreground">University of Illinois • 2020 - 2024</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Graduated with honors from one of the top computer science programs in the nation. 
                  My education at UIUC provided me with a strong foundation in algorithms, data structures, 
                  software engineering principles, and cutting-edge research opportunities.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <Book className="h-5 w-5 text-primary" />
                      Core Coursework
                    </h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Data Structures & Algorithms</li>
                      <li>• Software Engineering</li>
                      <li>• Database Systems</li>
                      <li>• Computer Networks</li>
                      <li>• Machine Learning</li>
                      <li>• Web Development</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <Award className="h-5 w-5 text-primary" />
                      Achievements
                    </h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Dean's List - Multiple Semesters</li>
                      <li>• CS Honors Program</li>
                      <li>• Teaching Assistant - CS 225</li>
                      <li>• Research Assistant - AI Lab</li>
                      <li>• Hackathon Winner - HackIllinois</li>
                      <li>• GPA: 3.8/4.0</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Projects & Research */}
            <Card className="bg-card/80 backdrop-blur-sm border-2 border-primary/20 shadow-card-travel">
              <CardHeader>
                <CardTitle className="text-lg">Academic Projects & Research</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-foreground">Senior Capstone Project</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Developed a full-stack web application for campus resource management, 
                      utilizing React, Node.js, and MongoDB. The project served over 1,000 students 
                      and was adopted by the university administration.
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-semibold text-foreground">AI Research Assistant</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Contributed to cutting-edge research in natural language processing, 
                      working with graduate students and faculty to develop novel algorithms 
                      for text classification and sentiment analysis.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Skills Developed */}
            <Card className="bg-card/80 backdrop-blur-sm border-2 border-primary/20 shadow-card-travel">
              <CardHeader>
                <CardTitle className="text-lg">Technical Skills Developed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    'JavaScript', 'Python', 'Java', 'C++',
                    'React', 'Node.js', 'Django', 'Spring',
                    'SQL', 'MongoDB', 'Redis', 'PostgreSQL',
                    'Git', 'Docker', 'AWS', 'Linux'
                  ].map((skill) => (
                    <div 
                      key={skill}
                      className="bg-accent/50 px-3 py-2 rounded-lg text-center text-sm font-medium text-foreground border border-primary/10"
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Navigation */}
          <div className="flex justify-center">
            <Button 
              onClick={handleContinueJourney}
              size="lg"
              className="px-8 py-6 text-lg bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-105"
            >
              Continue Journey to New York
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Education;