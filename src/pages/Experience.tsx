import React from 'react';
import { ArrowLeft, MapPin, Briefcase, Calendar, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Navigation from '@/components/Navigation';

const Experience = () => {
  const handleBackToMap = () => {
    window.location.href = '/';
  };

  const handleContinueJourney = () => {
    window.location.href = '/projects';
  };

  const experiences = [
    {
      title: 'Software Engineer',
      company: 'Tech Innovation Corp',
      location: 'New York, NY',
      duration: 'June 2024 - Present',
      description: 'Leading development of scalable web applications serving 100K+ users. Architecting microservices and implementing CI/CD pipelines.',
      technologies: ['React', 'Node.js', 'AWS', 'Docker', 'PostgreSQL'],
      achievements: [
        'Reduced application load time by 40% through optimization',
        'Led a team of 4 developers on critical product features',
        'Implemented automated testing increasing code coverage to 90%'
      ]
    },
    {
      title: 'Software Development Intern',
      company: 'StartupXYZ',
      location: 'San Francisco, CA',
      duration: 'May 2023 - August 2023',
      description: 'Developed full-stack features for a fintech platform, collaborating with cross-functional teams to deliver user-centric solutions.',
      technologies: ['Python', 'Django', 'React', 'MongoDB', 'Redis'],
      achievements: [
        'Built real-time payment processing system',
        'Improved API response time by 60%',
        'Mentored 2 junior interns on best practices'
      ]
    },
    {
      title: 'Research Assistant',
      company: 'University of Illinois AI Lab',
      location: 'Urbana-Champaign, IL',
      duration: 'September 2022 - May 2024',
      description: 'Conducted research on natural language processing and machine learning algorithms, contributing to academic publications.',
      technologies: ['Python', 'TensorFlow', 'PyTorch', 'CUDA', 'Jupyter'],
      achievements: [
        'Co-authored 2 research papers',
        'Developed novel sentiment analysis algorithm',
        'Presented findings at 3 academic conferences'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation currentPage="/experience" />
      
      <div className="container mx-auto px-6 py-20 max-w-5xl">
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
            <span>New York, USA</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-8 animate-fade-in">
          {/* Title Section */}
          <div className="text-center space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground">
              EXPERIENCE
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Professional growth and real-world applications - my journey in the tech industry 
              building impactful solutions and leading innovative projects.
            </p>
          </div>

          {/* Experience Timeline */}
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <Card 
                key={index}
                className="bg-card/80 backdrop-blur-sm border-2 border-primary/20 shadow-card-travel"
              >
                <CardHeader className="pb-4">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <CardTitle className="flex items-center gap-3 text-xl">
                        <Briefcase className="h-6 w-6 text-primary" />
                        {exp.title}
                      </CardTitle>
                      <div className="flex items-center gap-2 text-muted-foreground mt-2">
                        <Building className="h-4 w-4" />
                        <span className="font-medium">{exp.company}</span>
                        <span>•</span>
                        <span>{exp.location}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground bg-accent/50 px-3 py-2 rounded-lg">
                      <Calendar className="h-4 w-4" />
                      {exp.duration}
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground leading-relaxed">
                    {exp.description}
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Technologies */}
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">Technologies Used</h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <span 
                            key={tech}
                            className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium border border-primary/20"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Key Achievements */}
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">Key Achievements</h4>
                      <ul className="space-y-2">
                        {exp.achievements.map((achievement, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Skills Summary */}
          <Card className="bg-card/80 backdrop-blur-sm border-2 border-primary/20 shadow-card-travel">
            <CardHeader>
              <CardTitle className="text-xl">Professional Skills & Expertise</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Frontend Development</h4>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div>React, Vue.js, Angular</div>
                    <div>TypeScript, JavaScript</div>
                    <div>HTML5, CSS3, Tailwind</div>
                    <div>Responsive Design</div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Backend Development</h4>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div>Node.js, Python, Java</div>
                    <div>Express, Django, Spring</div>
                    <div>RESTful APIs, GraphQL</div>
                    <div>Microservices Architecture</div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-foreground mb-3">DevOps & Tools</h4>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div>AWS, Docker, Kubernetes</div>
                    <div>CI/CD, Jenkins, GitHub Actions</div>
                    <div>MongoDB, PostgreSQL, Redis</div>
                    <div>Git, Agile, Scrum</div>
                  </div>
                </div>
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
              Continue Journey to Projects
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;