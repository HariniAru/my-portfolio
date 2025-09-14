// import React from 'react';
// import { ArrowLeft, MapPin, FolderOpen, ExternalLink, Github, Globe } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import Navigation from '@/components/Navigation';

// const Projects = () => {
//   const handleBackToMap = () => {
//     window.location.href = '/';
//   };

//   const projects = [
//     {
//       title: 'EcoTrack - Sustainability Platform',
//       description: 'A comprehensive web application that helps individuals and organizations track their carbon footprint and implement sustainable practices.',
//       location: 'Florida, USA',
//       technologies: ['React', 'Node.js', 'MongoDB', 'Chart.js', 'AWS'],
//       features: [
//         'Real-time carbon footprint calculation',
//         'Personalized sustainability recommendations',
//         'Community challenges and leaderboards',
//         'Integration with IoT devices'
//       ],
//       impact: 'Used by 5,000+ users, reduced average carbon footprint by 25%',
//       links: {
//         live: '#',
//         github: '#'
//       }
//     },
//     {
//       title: 'TravelBuddy - Trip Planning Assistant',
//       description: 'An AI-powered travel planning application that creates personalized itineraries based on user preferences and real-time data.',
//       location: 'Cancun, Mexico',
//       technologies: ['Vue.js', 'Python', 'FastAPI', 'TensorFlow', 'Google Maps API'],
//       features: [
//         'AI-powered itinerary generation',
//         'Real-time weather and event integration',
//         'Budget optimization algorithms',
//         'Social sharing and collaboration'
//       ],
//       impact: 'Helped plan 10,000+ trips, 95% user satisfaction rate',
//       links: {
//         live: '#',
//         github: '#'
//       }
//     },
//     {
//       title: 'CodeMentor - Learning Platform',
//       description: 'An interactive coding education platform with personalized learning paths and real-time code collaboration features.',
//       location: 'Singapore',
//       technologies: ['Angular', 'Django', 'PostgreSQL', 'Socket.io', 'Docker'],
//       features: [
//         'Interactive coding challenges',
//         'Real-time collaborative IDE',
//         'Personalized learning analytics',
//         'Peer-to-peer mentoring system'
//       ],
//       impact: 'Taught 2,000+ students, 90% course completion rate',
//       links: {
//         live: '#',
//         github: '#'
//       }
//     },
//     {
//       title: 'HealthTracker - Wellness Dashboard',
//       description: 'A comprehensive health monitoring application that integrates wearable devices and provides actionable health insights.',
//       location: 'Hawaii, USA',
//       technologies: ['React Native', 'Express.js', 'Redis', 'D3.js', 'Firebase'],
//       features: [
//         'Wearable device integration',
//         'Health trend visualization',
//         'Medication reminders',
//         'Doctor-patient communication portal'
//       ],
//       impact: 'Improved medication adherence by 40% for 1,000+ patients',
//       links: {
//         live: '#',
//         github: '#'
//       }
//     },
//     {
//       title: 'FoodieFind - Restaurant Discovery',
//       description: 'A location-based restaurant discovery app with advanced filtering, reviews, and social features for food enthusiasts.',
//       location: 'Indonesia',
//       technologies: ['React', 'GraphQL', 'MySQL', 'Elasticsearch', 'Stripe API'],
//       features: [
//         'AI-powered restaurant recommendations',
//         'Advanced search and filtering',
//         'Social reviews and ratings',
//         'Table reservation system'
//       ],
//       impact: 'Connected 50,000+ users with local restaurants',
//       links: {
//         live: '#',
//         github: '#'
//       }
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-hero">
//       <Navigation currentPage="/projects" />
      
//       <div className="container mx-auto px-6 py-20 max-w-6xl">
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
//             <span>Cancún, Mexico</span>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="space-y-8 animate-fade-in">
//           {/* Title Section */}
//           <div className="text-center space-y-4">
//             <h1 className="text-5xl md:text-6xl font-bold text-foreground">
//               Projects & Research
//             </h1>
//             <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
//               Showcasing my technical skills and creativity through projects inspired by 
//               my travels and experiences around the world.
//             </p>
//           </div>

//           {/* Projects Grid */}
//           <div className="grid lg:grid-cols-2 gap-8">
//             {projects.map((project, index) => (
//               <Card 
//                 key={index}
//                 className="bg-card/80 backdrop-blur-sm border-2 border-primary/20 shadow-card-travel hover:shadow-lg transition-all duration-300"
//               >
//                 <CardHeader className="pb-4">
//                   <div className="flex items-start justify-between gap-4">
//                     <div>
//                       <CardTitle className="flex items-center gap-3 text-xl mb-2">
//                         <FolderOpen className="h-6 w-6 text-primary" />
//                         {project.title}
//                       </CardTitle>
//                       <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                         <MapPin className="h-4 w-4" />
//                         <span>Inspired by {project.location}</span>
//                       </div>
//                     </div>
                    
//                     <div className="flex gap-2">
//                       <Button 
//                         variant="outline" 
//                         size="icon"
//                         className="h-9 w-9 border-primary/30 hover:bg-primary/10"
//                         onClick={() => window.open(project.links.live, '_blank')}
//                       >
//                         <Globe className="h-4 w-4" />
//                       </Button>
//                       <Button 
//                         variant="outline" 
//                         size="icon"
//                         className="h-9 w-9 border-primary/30 hover:bg-primary/10"
//                         onClick={() => window.open(project.links.github, '_blank')}
//                       >
//                         <Github className="h-4 w-4" />
//                       </Button>
//                     </div>
//                   </div>
//                 </CardHeader>
                
//                 <CardContent className="space-y-6">
//                   <p className="text-muted-foreground leading-relaxed">
//                     {project.description}
//                   </p>
                  
//                   {/* Technologies */}
//                   <div>
//                     <h4 className="font-semibold text-foreground mb-3">Technologies</h4>
//                     <div className="flex flex-wrap gap-2">
//                       {project.technologies.map((tech) => (
//                         <span 
//                           key={tech}
//                           className="bg-accent/50 text-foreground px-3 py-1 rounded-full text-sm border border-primary/10"
//                         >
//                           {tech}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
                  
//                   {/* Key Features */}
//                   <div>
//                     <h4 className="font-semibold text-foreground mb-3">Key Features</h4>
//                     <ul className="space-y-2">
//                       {project.features.map((feature, i) => (
//                         <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
//                           <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
//                           {feature}
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
                  
//                   {/* Impact */}
//                   <div className="pt-4 border-t border-primary/10">
//                     <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
//                       <h4 className="font-semibold text-foreground mb-2">Impact & Results</h4>
//                       <p className="text-sm text-muted-foreground">
//                         {project.impact}
//                       </p>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>

//           {/* Skills & Technologies Summary */}
//           <Card className="bg-card/80 backdrop-blur-sm border-2 border-primary/20 shadow-card-travel">
//             <CardHeader>
//               <CardTitle className="text-xl">Technical Expertise Across Projects</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="grid md:grid-cols-4 gap-6">
//                 <div>
//                   <h4 className="font-semibold text-foreground mb-3">Frontend</h4>
//                   <div className="space-y-2 text-sm text-muted-foreground">
//                     <div>React, Vue.js, Angular</div>
//                     <div>React Native</div>
//                     <div>TypeScript</div>
//                     <div>Responsive Design</div>
//                   </div>
//                 </div>
                
//                 <div>
//                   <h4 className="font-semibold text-foreground mb-3">Backend</h4>
//                   <div className="space-y-2 text-sm text-muted-foreground">
//                     <div>Node.js, Python</div>
//                     <div>Express, Django, FastAPI</div>
//                     <div>GraphQL, REST APIs</div>
//                     <div>Microservices</div>
//                   </div>
//                 </div>
                
//                 <div>
//                   <h4 className="font-semibold text-foreground mb-3">Database & Cloud</h4>
//                   <div className="space-y-2 text-sm text-muted-foreground">
//                     <div>MongoDB, PostgreSQL</div>
//                     <div>Redis, Elasticsearch</div>
//                     <div>AWS, Firebase</div>
//                     <div>Docker, Kubernetes</div>
//                   </div>
//                 </div>
                
//                 <div>
//                   <h4 className="font-semibold text-foreground mb-3">Specialized</h4>
//                   <div className="space-y-2 text-sm text-muted-foreground">
//                     <div>Machine Learning</div>
//                     <div>Data Visualization</div>
//                     <div>Real-time Systems</div>
//                     <div>API Integrations</div>
//                   </div>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Back to Journey */}
//           <div className="flex justify-center">
//             <Button 
//               onClick={handleBackToMap}
//               size="lg"
//               className="px-8 py-6 text-lg bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-105"
//             >
//               Return to Journey Map
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Projects;



import React, { useState, useEffect } from 'react';
// import { ArrowLeft, MapPin, FolderOpen, Github, Globe, Newspaper, Images } from 'lucide-react';
import { ArrowLeft, MapPin, FolderOpen, Github, Globe, File, Newspaper, Images, Image as ImageIcon, X, Video, Link, Folder, Hand, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import Navigation from '@/components/Navigation';
import { addVisitedPage } from '@/lib/journey';
import { journeyStops } from '@/components/WorldMap';

// --- Replace these with your actual image assets ---
const CANCUN_PHOTOS = [
  { src: '/src/assets/cancun/cancun-sunrise.jpg', caption: 'Sunrise over the coastline of the Fiesta Americana Resort in Cancun.' },
  { src: '/src/assets/cancun/hut-ceiling.jpg', caption: 'Palm-thatched ceiling view from our stay at the Fiesta Americana Resort in Cancun.' },
  { src: '/src/assets/cancun/valladolid-centro-church.jpg', caption: 'Quick snap of a beautiful church in Valladolid Centro while crossing the street.' },
  { src: '/src/assets/cancun/cancun-paragliding.jpg', caption: 'Morning paragliding over Benito Juárez — blue skies above, cool waters below.' },
  { src: '/src/assets/cancun/chichen-itza-pyramid.jpg', caption: 'Chichén Itzá pyramid – a testament to Mayan architecture.' },
  { src: '/src/assets/cancun/chichen-itza-wall-mural.jpg', caption: 'A powerful, intense mural at Chichén Itzá, depicting an ancient ritual beheading for the gods.' },
  { src: '/src/assets/cancun/isla-mujeres-sharks.jpg', caption: 'Sharks swimming in the reserves of Isla Mujeres.' },
  { src: '/src/assets/cancun/isla-mujeres-beach.jpg', caption: 'Relaxing beach vibes on Isla Mujeres.' },
];

const Projects: React.FC = () => {
  useEffect(() => {
    addVisitedPage('/projects&research');
  }, []);

  const handleBackToMap = () => {
    window.location.href = '/';
  };

  const handleContinueJourney = () => {
    const currentStop = journeyStops.find(stop => stop.route === '/projects&research');
    const nextStop = journeyStops.find(stop => stop.id === (currentStop?.id || 0) + 1);
    
    if (nextStop) {
      addVisitedPage('/projects&research');
      window.location.href = `/?next=${nextStop.id}&from=${currentStop?.id}`;
    } else {
      window.location.href = '/';
    }
  };


  // --- Real projects pulled from Harini's portfolio + resume ---
  const projects = [
    {
      title: 'Bharatanatyam Mudras Hand Gesture Recognizer',
      description:
        'Real‑time hand‑gesture classification using MediaPipe landmarks + scikit‑learn from webcam input for Bharatanatyam mudras.',
      technologies: ['Python', 'OpenCV', 'MediaPipe', 'scikit‑learn'],
      features: [
        'Live pose/landmark extraction',
        'Classical mudra classification pipeline',
        'Lightweight model for real‑time inference',
      ],
      impact: 'Achieved 89% accuracy (F1: 0.88) in real-time mudra recognition, offering learners a practical tool to practice and preserve Bharatanatyam.',
      links: {
        video: 'https://drive.google.com/file/d/1x13j0s3KFnbkX-vKbxNR3zUE-gk6vo-2/view?usp=share_link',
        file: 'https://docs.google.com/document/d/1sTDlDQG-pkDBUVVw8cXcZmhpct04P3zRY4-Glf5PNG4/edit?usp=sharing',
        github: 'https://github.com/HariniAru/Bharatanatyam-Mudras-Hand-Gesture-Recognizer',
      },
    },
    {
      title: 'Immersion – AI Language Learning (iOS)',
      description:
        'Swift‑based language companion that blends conversational AI and translation to help practice Spanish with real‑time error feedback.',
      location: 'Cupertino, CA',
      technologies: ['Swift', 'GPT‑4 API', 'Google Translate API'],
      features: [
        'Conversational practice across proficiency levels',
        'Instant feedback on grammar and nuance',
        'Phrase translation + review deck',
      ],
      impact: 'Built a functional prototype with real-time conversational AI, pronunciation feedback, and adaptive learning to transform language practice.',
      links: {
        video: 'https://drive.google.com/file/d/1xub-ELqm_4npmoW4i6NDcefPNNqj0S61/view?usp=sharing',
      },
    },
    {
      title: 'Alleviate – Autism Support App (Technovation National Winners)',
      description:
        'Mobile app designed to help autistic individuals with social interaction and sensory regulation via interactive games, music, and a customizable breathing bubble.',
      location: 'San Jose, CA',
      technologies: ['Mobile', 'MIT App Inventor', 'UX Research'],
      features: [
        'Interactive games for social skills practice',
        'Customizable breathing/relaxation module',
        'Sensory overload coping tools',
      ],
      impact:
        'Recognized as a Technovation U.S. Winner and Global Finalist, the app demonstrated its value in user testing by helping students with autism feel calmer, more engaged, and better supported in their learning.',
      links: {
        video: 'https://youtu.be/ZYEP7C-qAAU',
        website: 'https://teamfemstem.weebly.com/',
      },
    },
    {
      title: 'OnBoard – Unified Local Transit Booking Site',
      description:
        'Web application that centralizes ticket booking for local transit and supports small operators.',
      location: 'Urbana‑Champaign, IL',
      technologies: ['Flask', 'Python', 'JS/Bootstrap', 'Graph Algorithms'],
      features: [
        'Route finding with BFS/DFS/A*',
        'Simple, responsive booking flow',
        'Data parsing + graph construction',
      ],
      impact: 'Developed a Bootstrap + Flask transit booking platform with ticket browsing, checkout, and business publishing, designed for easy integration with future local transit partners.',
      links: {
        video: 'https://www.youtube.com/watch?v=ApUFWFir0BE',
        file: 'https://docs.google.com/document/d/1UwcUJmGIb2S-3CaZwxbo41IuxZAju7TXgmyVQRwnNPQ/edit?usp=sharing',
        github: 'https://github.com/HariniAru/OnBoard',
      },
    },
    {
      title: 'Course Determiner – UIUC Degree Planner',
      description:
        'Django tool to identify classes that satisfy majors/minors/Gen‑Eds while accounting for prerequisites and overlap.',
      location: 'Urbana‑Champaign, IL',
      technologies: ['Django', 'SQLite', 'Python SQL', 'Bootstrap'],
      features: [
        'Overlap detection across requirements',
        'Queryable catalog with prerequisite checks',
        'Clean, student‑friendly UI',
      ],
      impact: 'Built a Django-based planner that identifies major/minor overlaps, helping UIUC students streamline requirements, avoid redundant courses, and plan efficient paths to graduation.',
      links: {
        file: 'https://docs.google.com/document/d/1ZaliE8S3r1OIRlkYyoD-KGhYcjuLGoZR8eggDAFSOiA/edit?usp=sharing',
      },
    },
    {
      title: 'Maze Game',
      description:
        'Dual‑view maze game (hidden + navigable) with procedural generation via Prim’s algorithm.',
      location: 'Urbana‑Champaign, IL',
      technologies: ['C++', 'Game Dev', 'Prim’s Algorithm', 'ncurses'],
      features: ['Procedural maze generation', 'Hidden/navigable views', 'Clean separation of game logic'],
      impact: 'Developed a C++ console-based maze game with both hidden-graph and randomized maze modes, using Prim’s algorithm and ncurses to deliver replayable gameplay and test-driven reliability.',
      links: {
        video: 'https://www.youtube.com/watch?v=zvn8YhXtoow',
        github: 'https://github.com/HariniAru/cs128finalproject',
      },
    },
    {
      title: 'Infinite Matrix – Gameplay Systems',
      description:
        'Unreal Engine project focused on implementing core gameplay mechanics within the Infinite Matrix layout.',
      location: 'Urbana-Champaign, IL',
      technologies: ['Unreal Engine', 'C++/Blueprints'],
      features: [
        'Enemy packs',
        'Health packs and health bar system',
        'Score system integrated with gameplay',
        'Projectile shooting mechanics'
      ],
      impact: 'Gateway into game design: implemented combat, health, and scoring systems in Unreal Engine.',
      links: {
        video: 'https://www.youtube.com/watch?v=4YzV7JG5rIQ',
        code: 'https://drive.google.com/file/d/1JoBQFka4LS9VEUcaNblwmnFBzrYGAq60/view?usp=sharing',
      },
    },
    {
      title: 'Level Design – Gameplay & Collectibles',
      description:
        'Unreal Engine project applying level design principles to create engaging environments with gameplay systems integrated.',
      location: 'Urbana-Champaign, IL',
      technologies: ['Unreal Engine', 'C++/Blueprints'],
      features: [
        'Custom level layouts with health packs and collectibles',
        'Health bar and score system carried across levels',
        'Projectile shooting integrated into level flow',
        'Playtested environments for pacing and balance'
      ],
      impact: 'Applied level design principles to create balanced environments with integrated gameplay systems.',
      links: {
        video: 'https://youtu.be/iAN9sMtnQfE?si=IOp9S3cYOb5IXnEf',
        file: 'https://docs.google.com/document/d/1z2QV7iw7KoVEbCi4e8bDYoW_UXNy4Ck0vqC8t4QjVpA/edit?usp=sharing',
      },
    },
    {
      title: 'Code Future – Subjects Navigation Page',
      description:
        'Contributed frontend components and lesson materials for nonprofit coding education.',
      location: 'Remote',
      technologies: ['Vue.js', 'HTML/CSS'],
      features: ['Subjects navigation UI', 'Java workshop materials'],
      impact: 'Expanded access to beginner‑friendly coding content.',
      links: {
        live: 'https://github.com/HariniAru/JavaWorkshops',
        github: 'https://github.com/HariniAru/JavaWorkshops',
      },
    },
  ];

    const research = [
    {
      title: 'Adversarial Bargaining – Online Price Discrimination',
      description:
        'Researched potential price discrimination in online services (e.g., flight and hotel agencies) under Prof. Hari Sundaram at UIUC. Used Google Ad Settings to track browsing categories and Quantcast for demographic insights, applying Bayesian analysis to examine differences in how users were targeted. Produced both quantitative and qualitative findings on the impact of personalization in online pricing.',
      location: 'University of Illinois Urbana-Champaign',
      technologies: ['Bayesian Analysis', 'Data Collection', 'Python'],
      outputs: [
        {
          label: 'Research Paper',
          href: 'https://drive.google.com/file/d/1gUxGwXIr338k3Q23RvLXdVAGHvc5k-zI/view?usp=sharing',
        },
        {
          label: 'Qualitative Notes',
          href: 'https://docs.google.com/document/d/1UZm2THkvlmeMvQL7EtndLECoSaoEVNk1L_Op5a0QpMk/edit?usp=sharing',
        },
      ],
    },
    {
      title: 'Charitable Giving – Visual Design & Engagement',
      description:
        'Worked with Profs. Hari Sundaram and Ewa Maslowska on a study of how visual design choices in charity websites influence engagement and donations. Conducted an observational study during the COVID-19 crisis in the U.S. and India, comparing user responses to experimental comics versus real-time photos. Created custom comic stimuli using a comics generator to test the persuasive power of animation in charitable appeals.',
      location: 'University of Illinois Urbana-Champaign',
      technologies: ['Experimental Design', 'UX Research', 'Data Analysis'],
      outputs: [
        {
          label: 'Linguistic Bias in AI Notes',
          href: 'https://docs.google.com/document/d/1LTURP4b3FFmMDvxZBzDstsKbPBmIV38m8KKTaC-Fe24/edit?usp=sharing',
        },
      ],
    },
  ];


  // const research = [
  //   {
  //     title: 'Adversarial Bargaining',
  //     description:
  //       'Studied potential price discrimination across online services (e.g., travel). Collected browsing/ad data (Google Ad Settings) and site audience stats (Quantcast); used Bayesian analysis to evaluate effects.',
  //     location: 'UIUC',
  //     technologies: ['Bayesian Analysis', 'Data Collection', 'Python/R'],
  //     outputs: [
  //       { label: 'Paper (Google Drive)', href: 'https://drive.google.com/file/d/1gUxGwXIr338k3Q23RvLXdVAGHvc5k-zI/view?usp=sharing' },
  //       { label: 'Qualitative Notes', href: 'https://docs.google.com/document/d/1UZm2THkvlmeMvQL7EtndLECoSaoEVNk1L_Op5a0QpMk/edit?usp=sharing' },
  //     ],
  //   },
  //   {
  //     title: 'Charitable Giving',
  //     description:
  //       'Observed how visual design and animation (comics) on charity sites influence user engagement and donation behavior compared to real‑time photos; focused on COVID‑19 charities in the U.S. and India.',
  //     location: 'UIUC',
  //     technologies: ['Experimental Design', 'UX Research', 'Data Analysis'],
  //     outputs: [],
  //   },
  // ];

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation currentPage="/projects&research" />

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
            <span>Cancún, Mexico</span>
          </div>
        </div>

        {/* Title */}
        <div className="text-center space-y-4 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground">Projects & Research</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A curated look at the things I’ve designed, built, and studied — with a sunny Cancún vibe for this stop on the journey.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="flex items-center gap-3">
          <FolderOpen className="h-6 w-6 text-primary" />
          <h2 className="text-3xl font-bold">Projects</h2>
        </div>
        <div className="mt-10 grid lg:grid-cols-2 gap-8">
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
                    {/* <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>Built in {project.location}</span>
                    </div> */}
                  </div>

                  <div className="flex gap-2">
                    {project.links?.video && (
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-9 w-9 border-primary/30 hover:bg-primary/10"
                        onClick={() => window.open(project.links!.video!, '_blank')}
                      >
                        <Video className="h-4 w-4" />
                      </Button>
                    )}
                    {project.links?.file && (
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-9 w-9 border-primary/30 hover:bg-primary/10"
                        onClick={() => window.open(project.links!.file!, '_blank')}
                      >
                        <File className="h-4 w-4" />
                      </Button>
                    )}
                    {project.links?.github && (
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-9 w-9 border-primary/30 hover:bg-primary/10"
                        onClick={() => window.open(project.links!.github!, '_blank')}
                      >
                        <Github className="h-4 w-4" />
                      </Button>
                    )}
                    {project.links?.website && (
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-9 w-9 border-primary/30 hover:bg-primary/10"
                        onClick={() => window.open(project.links!.website!, '_blank')}
                      >
                        <Link className="h-4 w-4" />
                      </Button>
                    )}
                    {project.links?.code && (
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-9 w-9 border-primary/30 hover:bg-primary/10"
                        onClick={() => window.open(project.links!.code!, '_blank')}
                      >
                        <Code className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">{project.description}</p>

                {/* Video Demo */}
                {/* {project.links.video && (
                  <div className="mt-4">
                    <h4 className="font-semibold text-foreground mb-3">Project Demo</h4>
                    <div className="rounded-lg overflow-hidden border border-primary/20 shadow">
                      <iframe
                        src={project.links.video.replace('/view?usp=share_link', '/preview')}
                        title={`${project.title} Demo`}
                        allow="autoplay; fullscreen"
                        className="w-full h-[300px]"
                      ></iframe>
                    </div>
                  </div>
                )} */}

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
                {project.features?.length ? (
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Key Features</h4>
                    <ul className="space-y-2">
                      {project.features.map((feature: string, i: number) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {/* Impact */}
                {project.impact ? (
                  <div className="pt-4 border-t border-primary/10">
                    <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                      <h4 className="font-semibold text-foreground mb-2">Impact & Results</h4>
                      <p className="text-sm text-muted-foreground">{project.impact}</p>
                    </div>
                  </div>
                ) : null}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Research Section */}
        <div className="mt-14 space-y-6">
          <div className="flex items-center gap-3">
            <Newspaper className="h-6 w-6 text-primary" />
            <h2 className="text-3xl font-bold">Research</h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            {research.map((r, idx) => (
              <Card
                key={idx}
                className="bg-card/80 backdrop-blur-sm border-2 border-primary/20 shadow-card-travel"
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl">{r.title}</CardTitle>
                  {/* <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{r.location}</span>
                  </div> */}
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">{r.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {r.technologies.map((t) => (
                      <span
                        key={t}
                        className="bg-accent/50 text-foreground px-3 py-1 rounded-full text-sm border border-primary/10"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  {r.outputs?.length ? (
                    <div className="pt-2 border-t border-primary/10">
                      <div className="flex flex-wrap gap-2">
                        {r.outputs.map((o) => (
                          <Button
                            key={o.href}
                            variant="outline"
                            size="sm"
                            className="border-primary/30"
                            onClick={() => window.open(o.href, '_blank')}
                          >
                            {o.label}
                          </Button>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Skills Summary (kept concise) */}
        {/* <Card className="mt-12 bg-card/80 backdrop-blur-sm border-2 border-primary/20 shadow-card-travel">
          <CardHeader>
            <CardTitle className="text-xl">Technical Highlights Used Across Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6 text-sm text-muted-foreground">
              <div>
                <h4 className="font-semibold text-foreground mb-2">Frontend</h4>
                <div>React, Vue, Angular, SwiftUI</div>
                <div>TypeScript, Responsive UI</div>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Backend</h4>
                <div>Flask, Django, Node</div>
                <div>REST APIs, GraphQL</div>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Data/ML</h4>
                <div>OpenCV, MediaPipe, scikit‑learn</div>
                <div>SQL/SQLite, Data parsing</div>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Infra</h4>
                <div>Docker (course labs), CI/CD (Cypress/Playwright)</div>
                <div>AWS (intro), Firebase (proto)</div>
              </div>
            </div>
          </CardContent>
        </Card> */}

        {/* Cancún Photo Strip + Lightbox
        <div className="mt-14">
          <h3 className="text-2xl font-semibold mb-3">Cancún Photo Reel</h3>
          <p className="text-muted-foreground mb-4">
            A few snapshots that inspired this page. Click any photo to view full‑size.
          </p>
          <div className="relative overflow-x-auto no-scrollbar">
            <div className="flex gap-3 py-2">
              {CANCUN_PHOTOS.map((p, i) => (
                <Dialog key={p.src} open={lightboxIndex === i} onOpenChange={(o) => setLightboxIndex(o ? i : null)}>
                  <DialogTrigger asChild>
                    <button
                      className="group relative shrink-0 h-40 sm:h-44 md:h-48 rounded-xl overflow-hidden border border-primary/10 bg-muted/30 transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                      aria-label={p.caption}
                    >
                      <img
                        src={p.src}
                        alt={p.caption}
                        loading="lazy"
                        className="h-full w-auto object-cover opacity-90 group-hover:opacity-100 group-hover:contrast-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent pointer-events-none" />
                    </button>
                  </DialogTrigger>
                  <DialogContent className="p-0 bg-transparent border-none max-w-4xl">
                    <img src={p.src} alt={p.caption} className="w-full h-auto rounded-xl" />
                    <div className="mt-2 text-center text-sm text-muted-foreground">{p.caption}</div>
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          </div>
        </div> */}


        {/* --- Cancún Photo Strip + Lightbox (styled like Experience page) --- */}
        <div className="mt-14 space-y-4">
          <div className="flex items-center gap-2 text-sm uppercase tracking-wide text-muted-foreground">
            <Images className="h-4 w-4" /> Snaps from Cancún
          </div>

          <div className="relative overflow-x-auto no-scrollbar">
            <div className="flex gap-3 py-2">
              {CANCUN_PHOTOS.map((p, i) => (
                <Dialog
                  key={p.src}
                  open={lightboxIndex === i}
                  onOpenChange={(o) => setLightboxIndex(o ? i : null)}
                >
                  <DialogTrigger asChild>
                    <button
                      className="group relative shrink-0 h-40 sm:h-44 md:h-48 rounded-xl overflow-hidden border border-primary/10 bg-muted/30 transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                    >
                      <img
                        src={p.src}
                        alt={p.caption}
                        loading="lazy"
                        className="h-full w-auto object-cover opacity-90 group-hover:opacity-100 group-hover:contrast-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent pointer-events-none" />
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

        {/* Nav CTA */}
        <div className="mt-14 flex justify-center">
          <Button onClick={handleContinueJourney} size="lg" className="px-8 py-6 text-lg bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-105">
Continue Journey to Florida
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Projects;
