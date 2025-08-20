import React from 'react';
import { ArrowLeft, MapPin, FolderOpen, ExternalLink, Github, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Navigation from '@/components/Navigation';

const Projects = () => {
  const handleBackToMap = () => {
    window.location.href = '/';
  };

  const projects = [
    {
      title: 'EcoTrack - Sustainability Platform',
      description: 'A comprehensive web application that helps individuals and organizations track their carbon footprint and implement sustainable practices.',
      location: 'Florida, USA',
      technologies: ['React', 'Node.js', 'MongoDB', 'Chart.js', 'AWS'],
      features: [
        'Real-time carbon footprint calculation',
        'Personalized sustainability recommendations',
        'Community challenges and leaderboards',
        'Integration with IoT devices'
      ],
      impact: 'Used by 5,000+ users, reduced average carbon footprint by 25%',
      links: {
        live: '#',
        github: '#'
      }
    },
    {
      title: 'TravelBuddy - Trip Planning Assistant',
      description: 'An AI-powered travel planning application that creates personalized itineraries based on user preferences and real-time data.',
      location: 'Cancun, Mexico',
      technologies: ['Vue.js', 'Python', 'FastAPI', 'TensorFlow', 'Google Maps API'],
      features: [
        'AI-powered itinerary generation',
        'Real-time weather and event integration',
        'Budget optimization algorithms',
        'Social sharing and collaboration'
      ],
      impact: 'Helped plan 10,000+ trips, 95% user satisfaction rate',
      links: {
        live: '#',
        github: '#'
      }
    },
    {
      title: 'CodeMentor - Learning Platform',
      description: 'An interactive coding education platform with personalized learning paths and real-time code collaboration features.',
      location: 'Singapore',
      technologies: ['Angular', 'Django', 'PostgreSQL', 'Socket.io', 'Docker'],
      features: [
        'Interactive coding challenges',
        'Real-time collaborative IDE',
        'Personalized learning analytics',
        'Peer-to-peer mentoring system'
      ],
      impact: 'Taught 2,000+ students, 90% course completion rate',
      links: {
        live: '#',
        github: '#'
      }
    },
    {
      title: 'HealthTracker - Wellness Dashboard',
      description: 'A comprehensive health monitoring application that integrates wearable devices and provides actionable health insights.',
      location: 'Hawaii, USA',
      technologies: ['React Native', 'Express.js', 'Redis', 'D3.js', 'Firebase'],
      features: [
        'Wearable device integration',
        'Health trend visualization',
        'Medication reminders',
        'Doctor-patient communication portal'
      ],
      impact: 'Improved medication adherence by 40% for 1,000+ patients',
      links: {
        live: '#',
        github: '#'
      }
    },
    {
      title: 'FoodieFind - Restaurant Discovery',
      description: 'A location-based restaurant discovery app with advanced filtering, reviews, and social features for food enthusiasts.',
      location: 'Indonesia',
      technologies: ['React', 'GraphQL', 'MySQL', 'Elasticsearch', 'Stripe API'],
      features: [
        'AI-powered restaurant recommendations',
        'Advanced search and filtering',
        'Social reviews and ratings',
        'Table reservation system'
      ],
      impact: 'Connected 50,000+ users with local restaurants',
      links: {
        live: '#',
        github: '#'
      }
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation currentPage="/projects" />
      
      <div className="container mx-auto px-6 py-20 max-w-6xl">
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
            <span>Around the World</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-8 animate-fade-in">
          {/* Title Section */}
          <div className="text-center space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground">
              PROJECTS
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Showcasing my technical skills and creativity through projects inspired by 
              my travels and experiences around the world.
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <Card 
                key={index}
                className="bg-card/80 backdrop-blur-sm border-2 border-primary/20 shadow-card-travel hover:shadow-lg transition-all duration-300"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <CardTitle className="flex items-center gap-3 text-xl mb-2">
                        <FolderOpen className="h-6 w-6 text-primary" />
                        {project.title}
                      </CardTitle>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>Inspired by {project.location}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="icon"
                        className="h-9 w-9 border-primary/30 hover:bg-primary/10"
                        onClick={() => window.open(project.links.live, '_blank')}
                      >
                        <Globe className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon"
                        className="h-9 w-9 border-primary/30 hover:bg-primary/10"
                        onClick={() => window.open(project.links.github, '_blank')}
                      >
                        <Github className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                  
                  {/* Technologies */}
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span 
                          key={tech}
                          className="bg-accent/50 text-foreground px-3 py-1 rounded-full text-sm border border-primary/10"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Key Features */}
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Key Features</h4>
                    <ul className="space-y-2">
                      {project.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Impact */}
                  <div className="pt-4 border-t border-primary/10">
                    <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                      <h4 className="font-semibold text-foreground mb-2">Impact & Results</h4>
                      <p className="text-sm text-muted-foreground">
                        {project.impact}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Skills & Technologies Summary */}
          <Card className="bg-card/80 backdrop-blur-sm border-2 border-primary/20 shadow-card-travel">
            <CardHeader>
              <CardTitle className="text-xl">Technical Expertise Across Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-6">
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Frontend</h4>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div>React, Vue.js, Angular</div>
                    <div>React Native</div>
                    <div>TypeScript</div>
                    <div>Responsive Design</div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Backend</h4>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div>Node.js, Python</div>
                    <div>Express, Django, FastAPI</div>
                    <div>GraphQL, REST APIs</div>
                    <div>Microservices</div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Database & Cloud</h4>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div>MongoDB, PostgreSQL</div>
                    <div>Redis, Elasticsearch</div>
                    <div>AWS, Firebase</div>
                    <div>Docker, Kubernetes</div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Specialized</h4>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div>Machine Learning</div>
                    <div>Data Visualization</div>
                    <div>Real-time Systems</div>
                    <div>API Integrations</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Back to Journey */}
          <div className="flex justify-center">
            <Button 
              onClick={handleBackToMap}
              size="lg"
              className="px-8 py-6 text-lg bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-105"
            >
              Return to Journey Map
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;