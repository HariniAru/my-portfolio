// import React from 'react';
// import { ArrowLeft, MapPin, Briefcase, Calendar, Building } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import Navigation from '@/components/Navigation';

// const Experience = () => {
//   const handleBackToMap = () => {
//     window.location.href = '/';
//   };

//   const handleContinueJourney = () => {
//     window.location.href = '/projects';
//   };

//   const experiences = [
//     {
//       title: 'Software Engineer',
//       company: 'Tech Innovation Corp',
//       location: 'San Jose, CA',
//       duration: 'June 2024 - Present',
//       description: 'Leading development of scalable web applications serving 100K+ users. Architecting microservices and implementing CI/CD pipelines.',
//       technologies: ['React', 'Node.js', 'AWS', 'Docker', 'PostgreSQL'],
//       achievements: [
//         'Reduced application load time by 40% through optimization',
//         'Led a team of 4 developers on critical product features',
//         'Implemented automated testing increasing code coverage to 90%'
//       ]
//     },
//     {
//       title: 'Software Development Intern',
//       company: 'StartupXYZ',
//       location: 'San Francisco, CA',
//       duration: 'May 2023 - August 2023',
//       description: 'Developed full-stack features for a fintech platform, collaborating with cross-functional teams to deliver user-centric solutions.',
//       technologies: ['Python', 'Django', 'React', 'MongoDB', 'Redis'],
//       achievements: [
//         'Built real-time payment processing system',
//         'Improved API response time by 60%',
//         'Mentored 2 junior interns on best practices'
//       ]
//     },
//     {
//       title: 'Research Assistant',
//       company: 'University of Illinois AI Lab',
//       location: 'Urbana-Champaign, IL',
//       duration: 'September 2022 - May 2024',
//       description: 'Conducted research on natural language processing and machine learning algorithms, contributing to academic publications.',
//       technologies: ['Python', 'TensorFlow', 'PyTorch', 'CUDA', 'Jupyter'],
//       achievements: [
//         'Co-authored 2 research papers',
//         'Developed novel sentiment analysis algorithm',
//         'Presented findings at 3 academic conferences'
//       ]
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-hero">
//       <Navigation currentPage="/experience" />
      
//       <div className="container mx-auto px-6 py-20 max-w-5xl">
//         {/* Header */}
//         <div className="flex items-center gap-4 mb-8">
//           <Button 
//             variant="outline" 
//             size="icon"
//             onClick={handleBackToMap}
//             className="border-primary/30"
//           >
//             <ArrowLeft className="h-5 w-5" />
//           </Button>
//           <div className="flex items-center gap-2 text-muted-foreground">
//             <MapPin className="h-5 w-5" />
//             <span>New York City, New York</span>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="space-y-8 animate-fade-in">
//           {/* Title Section */}
//           <div className="text-center space-y-4">
//             <h1 className="text-5xl md:text-6xl font-bold text-foreground">
//               Experience
//             </h1>
//             <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
//               Professional growth and real-world applications - my journey in the tech industry 
//               building impactful solutions and leading innovative projects.
//             </p>
//           </div>

//           {/* Experience Timeline */}
//           <div className="space-y-8">
//             {experiences.map((exp, index) => (
//               <Card 
//                 key={index}
//                 className="bg-card/80 backdrop-blur-sm border-2 border-primary/20 shadow-card-travel"
//               >
//                 <CardHeader className="pb-4">
//                   <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//                     <div>
//                       <CardTitle className="flex items-center gap-3 text-xl">
//                         <Briefcase className="h-6 w-6 text-primary" />
//                         {exp.title}
//                       </CardTitle>
//                       <div className="flex items-center gap-2 text-muted-foreground mt-2">
//                         <Building className="h-4 w-4" />
//                         <span className="font-medium">{exp.company}</span>
//                         <span>•</span>
//                         <span>{exp.location}</span>
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-2 text-sm text-muted-foreground bg-accent/50 px-3 py-2 rounded-lg">
//                       <Calendar className="h-4 w-4" />
//                       {exp.duration}
//                     </div>
//                   </div>
//                 </CardHeader>
                
//                 <CardContent className="space-y-6">
//                   <p className="text-muted-foreground leading-relaxed">
//                     {exp.description}
//                   </p>
                  
//                   <div className="grid md:grid-cols-2 gap-6">
//                     {/* Technologies */}
//                     <div>
//                       <h4 className="font-semibold text-foreground mb-3">Technologies Used</h4>
//                       <div className="flex flex-wrap gap-2">
//                         {exp.technologies.map((tech) => (
//                           <span 
//                             key={tech}
//                             className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium border border-primary/20"
//                           >
//                             {tech}
//                           </span>
//                         ))}
//                       </div>
//                     </div>
                    
//                     {/* Key Achievements */}
//                     <div>
//                       <h4 className="font-semibold text-foreground mb-3">Key Achievements</h4>
//                       <ul className="space-y-2">
//                         {exp.achievements.map((achievement, i) => (
//                           <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
//                             <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
//                             {achievement}
//                           </li>
//                         ))}
//                       </ul>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>

//           {/* Skills Summary */}
//           <Card className="bg-card/80 backdrop-blur-sm border-2 border-primary/20 shadow-card-travel">
//             <CardHeader>
//               <CardTitle className="text-xl">Professional Skills & Expertise</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="grid md:grid-cols-3 gap-6">
//                 <div>
//                   <h4 className="font-semibold text-foreground mb-3">Frontend Development</h4>
//                   <div className="space-y-2 text-sm text-muted-foreground">
//                     <div>React, Vue.js, Angular</div>
//                     <div>TypeScript, JavaScript</div>
//                     <div>HTML5, CSS3, Tailwind</div>
//                     <div>Responsive Design</div>
//                   </div>
//                 </div>
                
//                 <div>
//                   <h4 className="font-semibold text-foreground mb-3">Backend Development</h4>
//                   <div className="space-y-2 text-sm text-muted-foreground">
//                     <div>Node.js, Python, Java</div>
//                     <div>Express, Django, Spring</div>
//                     <div>RESTful APIs, GraphQL</div>
//                     <div>Microservices Architecture</div>
//                   </div>
//                 </div>
                
//                 <div>
//                   <h4 className="font-semibold text-foreground mb-3">DevOps & Tools</h4>
//                   <div className="space-y-2 text-sm text-muted-foreground">
//                     <div>AWS, Docker, Kubernetes</div>
//                     <div>CI/CD, Jenkins, GitHub Actions</div>
//                     <div>MongoDB, PostgreSQL, Redis</div>
//                     <div>Git, Agile, Scrum</div>
//                   </div>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Navigation */}
//           <div className="flex justify-center">
//             <Button 
//               onClick={handleContinueJourney}
//               size="lg"
//               className="px-8 py-6 text-lg bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-105"
//             >
//               Continue Journey to Projects
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Experience;







// Experience.tsx
import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  MapPin,
  Briefcase,
  Calendar,
  Building,
  Images,
  Image as ImageIcon,
  X,
  Award,
  ShieldCheck,
  GaugeCircle,
  Workflow,
  Settings2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import Navigation from '@/components/Navigation';
import { addVisitedPage } from '@/lib/journey';
import { journeyStops } from '@/components/WorldMap';

type ExperienceItem = {
  title: string;
  company: string;
  location: string;
  duration: string;
  description: string;
  technologies: string[];
  achievements: string[];
  highlights?: { icon: React.ElementType; label: string }[];
};

const Experience: React.FC = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const handleBackToMap = () => {
    window.location.href = '/';
  };

  useEffect(() => {
    addVisitedPage('/experience');
  }, []);

  const handleContinueJourney = () => {
    // Find next stop in journey
    const currentStop = journeyStops.find(stop => stop.route === '/experience');
    const nextStop = journeyStops.find(stop => stop.id === (currentStop?.id || 0) + 1);
    
    if (nextStop) {
      // Ensure proper journey progression
      window.location.href = `/?next=${nextStop.id}&from=${currentStop?.id}`;
    } else {
      window.location.href = '/';
    }
  };

  // ——— WORK EXPERIENCE (from resume) ——————————————————————————————————————————
  const experiences: ExperienceItem[] = [
    {
      title: 'Software Engineer',
      company: 'FTI Consulting, Inc.',
      location: 'San Jose, CA',
      duration: 'Aug 2024 – Present',
      description:
        'Contributing to secure, multilingual claims portals used by thousands of users: focused on accessibility, privacy, and compliance across a multi-tenant platform.',
      technologies: [
        'TypeScript/JavaScript',
        'React/Angular',
        'GitLab CI/CD',
        'Sentry',
        'SQL',
        'AWS',
      ],
      achievements: [
        'Contributed to the development and maintenance of secure, multilingual claim portals used by thousands of users, ensuring accessibility, data privacy, and regulatory compliance.',
        'Designed and implemented dynamic form validation, conditional workflows, and secure document upload flows for sensitive user-submitted data.',
        'Developed end-to-end tests to validate critical user flows, including identity verification and form submission, improving platform reliability.',
        'Contributed to the development of a multi-tenant platform with scalable data hierarchies and role-based access control for internal and external users.',
        'Created custom UI themes and component libraries aligned with brand and design specs.',
        'Integrated error monitoring (Sentry), scheduled background tasks, and GitLab CI/CD for automated testing and deployment.',
      ],
      highlights: [
        { icon: ShieldCheck, label: 'Accessibility + Compliance' },
        { icon: Workflow, label: 'Conditional Workflows' },
        { icon: Settings2, label: 'RBAC / Multi-tenant' },
        { icon: GaugeCircle, label: 'Reliability (E2E)' },
      ],
    },
    {
      title: 'Software Engineering Intern',
      company: 'FTI Consulting, Inc.',
      location: 'New York City, New York',
      duration: 'Jun 2023 – Aug 2023',
      description:
        'Full-stack UI/UX and reliability improvements across admin and client-facing flows.',
      technologies: [
        'TypeScript/JavaScript',
        'React/Angular',
        'GitLab CI/CD',
        'Cypress (E2E)',
        'Playwright (E2E)',
        'SQL',
      ],
      achievements: [
        'Improved accessibility and UI clarity through ADA-compliant visual updates and activity feed optimizations.',
        'Resolved data consistency and encryption issues by normalizing audit logs and fixing backend type mismatches.',
        'Built inline editing and validation for admin interfaces to streamline user management workflows.',
        'Wrote Cypress and Playwright end-to-end tests for account creation, editing, and role flagging.',
      ],
      highlights: [
        { icon: Award, label: 'ADA Improvements' },
        { icon: ShieldCheck, label: 'Data Consistency' },
      ],
    },
  ];

  // ——— WORK PHOTOS (replace these with your assets) ————————————————————————
  const workPhotos = [
    { src: '/images/new york/brooklyn-bridge.jpg', caption: 'Stunning view of the Brooklyn Bridge at nighttime.' },
    { src: '/images/new york/aladdin-broadway.jpg', caption: 'Inside a beautiful Broadway theater, moments before Aladdin begins.' },
    { src: '/images/new york/central-park.jpg', caption: 'A peaceful walk down a path in Central Park' },
    { src: '/images/new york/chinatown.jpg', caption: 'Rows of lanterns guide the way through Chinatown.' },
    { src: '/images/new york/met.jpg', caption: 'Crowds climbing the steps of the Met, heading into history.' },
    { src: '/images/new york/met-interior.jpg', caption: 'The Met’s American Wing, glowing with afternoon light.' },
    { src: '/images/new york/new-york-street.jpg', caption: 'Walking past towers and time in lower Manhattan.' },
    { src: '/images/new york/south-street-seaport.jpg', caption: 'Cobblestone streets and city views down by the South Street Seaport in FiDi.' }
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
            aria-label="Back to map"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-5 w-5" />
            <span>New York City, New York</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-10 animate-fade-in">
          {/* Title Section */}
          <div className="text-center space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground tracking-tight">
              Experience
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              My work centers on building products people can trust — secure, accessible, and designed with real-world users in mind.
            </p>
          </div>

          {/* Experience Cards */}
          <div className="space-y-8">
            {/* Experience.tsx (only the map() card body changed below) */}
            {experiences.map((exp, index) => {
              const isLead = index === 0; // widen Achievements for the first (top) job
              return (
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
                        <div className="flex flex-wrap items-center gap-2 text-muted-foreground mt-2">
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
                    {/* One-liner description */}
                    <p className="text-muted-foreground leading-relaxed">{exp.description}</p>

                    {/* Optional highlight chips row */}
                    {exp.highlights && exp.highlights.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {exp.highlights.map(({ icon: Icon, label }) => (
                          <span
                            key={label}
                            className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs md:text-sm font-medium bg-primary/10 border border-primary/20 text-primary"
                          >
                            <Icon className="h-4 w-4" /> {label}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Tech + Achievements */}
                    <div className="grid gap-6 md:grid-cols-5">
                      {/* Technologies */}
                      <div className="md:col-span-2">
                        <h4 className="font-semibold text-foreground mb-3">Technologies</h4>
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
                      <div className="md:col-span-3">
                        <h4 className="font-semibold text-foreground mb-3">Key Achievements</h4>
                        <ul className="space-y-2">
                          {exp.achievements.map((a, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 text-sm text-muted-foreground"
                            >
                              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                              {a}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Skills Summary (work-focused) */}
          <Card className="bg-card/80 backdrop-blur-sm border-2 border-primary/20 shadow-card-travel">
            <CardHeader>
              <CardTitle className="text-xl">Professional Skills & Tooling</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Frontend</h4>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div>React, Angular</div>
                    <div>TypeScript / JavaScript</div>
                    <div>Accessible UI (WCAG/ARIA)</div>
                    <div>Design Systems / Theming</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Backend & Platform</h4>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div>REST APIs, SQL</div>
                    <div>RBAC, Multi-tenant Architectures</div>
                    <div>AWS</div>
                    <div>Background Jobs / Scheduling</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Quality & DevOps</h4>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div>Cypress & Playwright (E2E)</div>
                    <div>GitLab CI/CD, Automated Deploys</div>
                    <div>Sentry, Monitoring & Alerts</div>
                    <div>Secure Uploads, Data Privacy</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Photos — horizontal strip + lightbox */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm uppercase tracking-wide text-muted-foreground">
              <Images className="h-4 w-4" /> Snaps from New York
            </div>

            <div className="relative overflow-x-auto no-scrollbar">
              <div className="flex gap-3 py-2">
                {workPhotos.map((p, i) => (
                  <Dialog
                    key={p.src}
                    open={lightboxIndex === i}
                    onOpenChange={(o) => setLightboxIndex(o ? i : null)}
                  >
                    <DialogTrigger asChild>
                      <button className="group relative shrink-0 h-40 sm:h-44 md:h-48 rounded-xl overflow-hidden border border-primary/10 bg-muted/30 transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40">
                        <img
                          src={p.src}
                          alt={p.caption}
                          loading="lazy"
                          className="h-full w-auto object-cover opacity-90 group-hover:opacity-100 group-hover:contrast-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent pointer-events-none" />
                        {/* Captions hidden on thumbnails for a cleaner strip */}
                        {/* <div className="absolute bottom-2 left-2 right-2 text-[11px] md:text-xs text-white/90 flex items-center gap-1">
                          <ImageIcon className="h-3.5 w-3.5" />
                          <span className="line-clamp-1">{p.caption}</span>
                        </div> */}
                      </button>
                    </DialogTrigger>
                    <DialogContent className="p-0 bg-background/95 border border-primary/20 max-w-3xl">
                      <button
                        className="absolute right-3 top-3 z-10 rounded-full p-1 bg-background/80 border border-primary/20"
                        onClick={() => setLightboxIndex(null)}
                        aria-label="Close"
                      >
                        <X className="h-5 w-5" />
                      </button>
                      <img
                        src={p.src}
                        alt={p.caption}
                        className="w-full h-auto object-contain rounded-t-lg"
                      />
                      <div className="p-4 text-sm text-muted-foreground">{p.caption}</div>
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center">
            <Button
              onClick={handleContinueJourney}
              size="lg"
              className="px-8 py-6 text-lg bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-105"
            >
Continue Journey to Mexico
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;
