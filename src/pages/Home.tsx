// import React from 'react';
// import { ArrowLeft, MapPin, User, Heart, Code } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import Navigation from '@/components/Navigation';

// const Home = () => {
//   const handleBackToMap = () => {
//     window.location.href = '/';
//   };

//   const handleContinueJourney = () => {
//     window.location.href = '/education';
//   };

//   return (
//     <div className="min-h-screen bg-gradient-hero">
//       <Navigation currentPage="/home" />
      
//       <div className="container mx-auto px-6 py-20 max-w-4xl">
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
//             <span>California, USA</span>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="space-y-8 animate-fade-in">
//           {/* Title Section */}
//           <div className="text-center space-y-4">
//             <h1 className="text-5xl md:text-6xl font-bold text-foreground">
//               Home
//             </h1>
//             <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
//               My foundation and where I call home: California, where dreams meet innovation 
//               and technology shapes the future.
//             </p>
//           </div>

//           {/* About Me Cards */}
//           <div className="grid md:grid-cols-2 gap-6">
//             {/* Personal Story */}
//             <Card className="bg-card/80 backdrop-blur-sm border-2 border-primary/20 shadow-card-travel">
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-3">
//                   <User className="h-6 w-6 text-primary" />
//                   About Me
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <p className="text-muted-foreground leading-relaxed">
//                   Born in India and now calling California home, I bring a unique perspective 
//                   that blends diverse cultural experiences with cutting-edge technical skills. 
//                   My journey from the vibrant landscapes of Tamil Nadu to the innovative 
//                   ecosystem of Silicon Valley has shaped my approach to technology and problem-solving.
//                 </p>
//                 <p className="text-muted-foreground leading-relaxed">
//                   I believe that the best solutions come from understanding both the human element 
//                   and the technical possibilities, creating bridges between complex technology 
//                   and real-world applications.
//                 </p>
//               </CardContent>
//             </Card>

//             {/* Passions & Interests */}
//             <Card className="bg-card/80 backdrop-blur-sm border-2 border-primary/20 shadow-card-travel">
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-3">
//                   <Heart className="h-6 w-6 text-primary" />
//                   Passions & Interests
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <ul className="space-y-3">
//                   <li className="flex items-start gap-3">
//                     <Code className="h-5 w-5 text-primary mt-0.5" />
//                     <div>
//                       <div className="font-medium text-foreground">Full-Stack Development</div>
//                       <div className="text-sm text-muted-foreground">Building end-to-end solutions</div>
//                     </div>
//                   </li>
//                   <li className="flex items-start gap-3">
//                     <div className="w-5 h-5 bg-primary rounded-full mt-1"></div>
//                     <div>
//                       <div className="font-medium text-foreground">Travel & Exploration</div>
//                       <div className="text-sm text-muted-foreground">Discovering new cultures and perspectives</div>
//                     </div>
//                   </li>
//                   <li className="flex items-start gap-3">
//                     <div className="w-5 h-5 bg-primary rounded-full mt-1"></div>
//                     <div>
//                       <div className="font-medium text-foreground">Continuous Learning</div>
//                       <div className="text-sm text-muted-foreground">Staying curious about emerging technologies</div>
//                     </div>
//                   </li>
//                   <li className="flex items-start gap-3">
//                     <div className="w-5 h-5 bg-primary rounded-full mt-1"></div>
//                     <div>
//                       <div className="font-medium text-foreground">Community Building</div>
//                       <div className="text-sm text-muted-foreground">Connecting with fellow developers</div>
//                     </div>
//                   </li>
//                 </ul>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Philosophy */}
//           <Card className="bg-card/80 backdrop-blur-sm border-2 border-primary/20 shadow-card-travel">
//             <CardContent className="pt-6">
//               <blockquote className="text-center">
//                 <p className="text-lg md:text-xl text-foreground italic leading-relaxed mb-4">
//                   "Technology is best when it brings people together and solves real problems. 
//                   My goal is to create solutions that not only work efficiently but also 
//                   make a meaningful difference in people's lives."
//                 </p>
//                 <footer className="text-muted-foreground">
//                   — My development philosophy
//                 </footer>
//               </blockquote>
//             </CardContent>
//           </Card>

//           {/* Navigation */}
//           <div className="flex justify-center">
//             <Button 
//               onClick={handleContinueJourney}
//               size="lg"
//               className="px-8 py-6 text-lg bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-105"
//             >
//               Continue Journey to Illinois
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;





import React, { useState } from 'react';
import { ArrowLeft, MapPin, User, Heart, Code, Image as ImageIcon, X, FileDown, Globe, Wrench, Users, Target, Lightbulb, LightbulbIcon, Globe2, LucideGlobe, Brain, Group, Building, HelpingHandIcon, HelpingHand } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import Navigation from '@/components/Navigation';

// === CONTENT ================================================================
const RESUME_PDF = '/assets/Harini_Arumugam_Resume.pdf';
const COVER_LETTER_QUOTE =
  'I build bridges between complex technology and real-world impact — creating tools that are useful, humane, and a little bit delightful.';

// Skills grouped like resume (Languages, Technical, Soft Skills) with icons
const SKILLS = [
  {
    category: 'Languages',
    icon: Globe,
    items: ['English', 'Tamil', 'Spanish'],
  },
  {
    category: 'Technical',
    icon: Wrench,
    items: [
      'Python', 'JavaScript', 'TypeScript', 'C++', 'Swift',
      'Django', 'Flask', 'React', 'Laravel', 'Angular',
      'SQL', 'AWS', 'AI/ML', 'Computer Vision',
      'Web Development', 'API Integration', 'Automated Testing', 'CI/CD', 'Version Control'
    ],
  },
  {
    category: 'Soft Skills',
    icon: Users,
    items: [
      'Effective communicator',
      'Collaborative team player',
      'Adaptable problem solver',
      'Growth mindset',
      'Strong attention to detail',
      'Motivated for continuous learning'
    ],
  },
];

const HOME_PHOTOS = [
  { src: '/src/assets/california/civic-center.jpg', caption: 'The Civic Center in San Francisco.' },
  { src: '/src/assets/california/mural.jpg', caption: 'A mural of a man running on a high school building in San Francisco.' },
  { src: '/src/assets/california/fine-arts-museum.jpg', caption: 'View at the top of the Fine Arts Museum building in San Francisco.' },
  { src: '/src/assets/california/golden-gate-bridge.jpg', caption: 'The Golden Gate Bridge, a symbol of San Francisco.' },
  { src: '/src/assets/california/half-moon-bay.jpg', caption: 'Cliffside serenity in the coastal fog at Half Moon Bay.' },
  { src: '/src/assets/california/lake-tahoe.jpg', caption: 'A serene view of Lake Tahoe, surrounded by mountains.' },
];

const Home = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const handleBackToMap = () => (window.location.href = '/');
  const handleContinueJourney = () => (window.location.href = '/education');

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation currentPage="/home" />

      <div className="container mx-auto px-6 py-20 max-w-5xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="icon" onClick={handleBackToMap} className="border-primary/30">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-5 w-5" />
            <span>Bay Area, California</span>
          </div>
          <div className="ml-auto">
            <Button asChild variant="secondary" className="gap-2">
              <a href={RESUME_PDF} target="_blank" rel="noreferrer">
                <FileDown className="h-5 w-5" /> Download Resume
              </a>
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-8 animate-fade-in">
          {/* Title */}
          <div className="text-center space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground tracking-tight">Home</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              My base — California — where dreams meet innovation and technology shapes the future.
            </p>
          </div>

          {/* About + Passions */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-card/80 backdrop-blur-sm border-2 border-primary/20 shadow-card-travel">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Target className="h-6 w-6 text-primary" /> Objective
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  As a software engineer with strong full-stack and testing experience, I am passionate about integrating AI and machine learning to build secure, scalable web applications. I am motivated to deliver efficient solutions while contributing to collaborative engineering teams.
                </p>
                {/* <blockquote className="border-l-4 border-primary/40 pl-4 italic text-foreground/90">
                  {COVER_LETTER_QUOTE}
                </blockquote> */}
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur-sm border-2 border-primary/20 shadow-card-travel">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Heart className="h-6 w-6 text-primary" /> Passions & Interests
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Code className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <div className="font-medium text-foreground">Full-Stack Development</div>
                      <div className="text-sm text-muted-foreground">End-to-end systems with accessible UX</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Brain className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <div className="font-medium text-foreground">AI & Machine Learning</div>
                      <div className="text-sm text-muted-foreground">Building adaptive, intelligent systems</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Lightbulb className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <div className="font-medium text-foreground">Continuous Learning</div>
                      <div className="text-sm text-muted-foreground">Explore → build → reflect → improve</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <HelpingHand className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <div className="font-medium text-foreground">Community Building</div>
                      <div className="text-sm text-muted-foreground">Sharing, mentoring, learning together</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Globe className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <div className="font-medium text-foreground">Travel & Exploration</div>
                      <div className="text-sm text-muted-foreground">New places, new patterns, new ideas</div>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Skills */}
          <Card className="bg-card/80 backdrop-blur-sm border-2 border-primary/20 shadow-card-travel">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <Lightbulb className="h-6 w-6 text-primary rotate-90" /> Skills
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {SKILLS.map(({ category, icon: Icon, items }) => (
                <div key={category}>
                  <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-3">
                    <Icon className="h-4 w-4 text-primary" /> {category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {items.map((s) => (
                      <span
                        key={s}
                        className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm hover:bg-primary/15 transition"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Photos */}
          <div className="space-y-4 mb-2">
            <div className="flex items-center gap-2 text-sm uppercase tracking-wide text-muted-foreground">
              <ImageIcon className="h-4 w-4" /> Snaps from California
            </div>

            <div className="relative overflow-x-auto no-scrollbar">
              <div className="flex gap-3 py-2">
                {HOME_PHOTOS.map((p, i) => (
                  <Dialog key={p.src} open={lightboxIndex === i} onOpenChange={(o) => setLightboxIndex(o ? i : null)}>
                    <DialogTrigger asChild>
                      <button className="group relative shrink-0 h-40 sm:h-44 md:h-48 rounded-xl overflow-hidden border border-primary/10 bg-muted/30 transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40">
                        <img src={p.src} alt={p.caption} loading="lazy" className="h-full w-auto object-cover opacity-90 group-hover:opacity-100 group-hover:contrast-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent pointer-events-none" />
                      </button>
                    </DialogTrigger>
                    <DialogContent className="p-0 bg-background/95 border border-primary/20 max-w-3xl">
                      <button className="absolute right-3 top-3 z-10 rounded-full p-1 bg-background/80 border border-primary/20" onClick={() => setLightboxIndex(null)}>
                        <X className="h-5 w-5" />
                      </button>
                      <img src={p.src} alt={p.caption} className="w-full h-auto object-contain rounded-t-lg" />
                      <div className="p-4 text-sm text-muted-foreground">{p.caption}</div>
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center">
            <Button onClick={handleContinueJourney} size="lg" className="px-8 py-6 text-lg bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-105">
              Continue Journey to Illinois
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;






// import React, { useState } from 'react';
// import { ArrowLeft, MapPin, User, Heart, Code, Image as ImageIcon, X, FileDown } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
// import Navigation from '@/components/Navigation';

// // === CONTENT ================================================================
// const RESUME_PDF = '/assets/Harini_Arumugam_Resume.pdf';
// const COVER_LETTER_QUOTE =
//   'I build bridges between complex technology and real-world impact — creating tools that are useful, humane, and a little bit delightful.';

// // Skills grouped like resume (Languages, Technical, Soft Skills)
// const SKILLS = [
//   {
//     category: 'Languages',
//     items: ['English', 'Tamil', 'Spanish'],
//   },
//   {
//     category: 'Technical',
//     items: [
//       'Python', 'JavaScript', 'TypeScript', 'C++', 'Swift',
//       'Django', 'Flask', 'React', 'Laravel', 'Angular',
//       'SQL', 'AWS', 'AI/ML', 'Computer Vision',
//       'Web Development', 'API Integration', 'Automated Testing', 'CI/CD', 'Version Control'
//     ],
//   },
//   {
//     category: 'Soft Skills',
//     items: [
//       'Effective communicator',
//       'Collaborative team player',
//       'Adaptable problem solver',
//       'Growth mindset',
//       'Strong attention to detail',
//       'Motivated for continuous learning'
//     ],
//   },
// ];

// const HOME_PHOTOS = [
//   { src: '/images/home/california-sunset.jpg', caption: 'Evenings on the PCH — where ideas simmer and unwind.' },
//   { src: '/images/home/silicon-valley.jpg', caption: 'Home base for tinkering, shipping, and learning.' },
//   { src: '/images/home/redwoods.jpg', caption: 'Long walks, longer thoughts.' },
//   { src: '/images/home/sf-bay.jpg', caption: 'Fog, coffee, and a laptop — the California trifecta.' },
//   { src: '/images/home/pacific-trail.jpg', caption: 'Trailheads that double as brainstorming sessions.' },
// ];

// const Home = () => {
//   const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

//   const handleBackToMap = () => (window.location.href = '/');
//   const handleContinueJourney = () => (window.location.href = '/education');

//   return (
//     <div className="min-h-screen bg-gradient-hero">
//       <Navigation currentPage="/home" />

//       <div className="container mx-auto px-6 py-20 max-w-5xl">
//         {/* Header */}
//         <div className="flex items-center gap-4 mb-8">
//           <Button variant="outline" size="icon" onClick={handleBackToMap} className="border-primary/30">
//             <ArrowLeft className="h-5 w-5" />
//           </Button>
//           <div className="flex items-center gap-2 text-muted-foreground">
//             <MapPin className="h-5 w-5" />
//             <span>California, USA</span>
//           </div>
//           <div className="ml-auto">
//             <Button asChild variant="secondary" className="gap-2">
//               <a href={RESUME_PDF} target="_blank" rel="noreferrer">
//                 <FileDown className="h-5 w-5" /> Download Resume
//               </a>
//             </Button>
//           </div>
//         </div>

//         {/* Content */}
//         <div className="space-y-8 animate-fade-in">
//           {/* Title */}
//           <div className="text-center space-y-4">
//             <h1 className="text-5xl md:text-6xl font-bold text-foreground tracking-tight">HOME</h1>
//             <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
//               This is my base — California — where ideas meet execution and side projects ship on late coastal nights.
//             </p>
//           </div>

//           {/* About + Passions */}
//           <div className="grid md:grid-cols-2 gap-6">
//             <Card className="bg-card/80 backdrop-blur-sm border-2 border-primary/20 shadow-card-travel">
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-3 text-2xl">
//                   <User className="h-6 w-6 text-primary" /> About Me
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <p className="text-muted-foreground leading-relaxed">
//                   Born in India and now calling California home, I blend multicultural perspective with practical, full-stack engineering.
//                 </p>
//                 <blockquote className="border-l-4 border-primary/40 pl-4 italic text-foreground/90">
//                   {COVER_LETTER_QUOTE}
//                 </blockquote>
//               </CardContent>
//             </Card>

//             <Card className="bg-card/80 backdrop-blur-sm border-2 border-primary/20 shadow-card-travel">
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-3 text-2xl">
//                   <Heart className="h-6 w-6 text-primary" /> Passions & Interests
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <ul className="space-y-3">
//                   <li className="flex items-start gap-3">
//                     <Code className="h-5 w-5 text-primary mt-0.5" />
//                     <div>
//                       <div className="font-medium text-foreground">Full-Stack Development</div>
//                       <div className="text-sm text-muted-foreground">End-to-end systems with crisp UX</div>
//                     </div>
//                   </li>
//                   <li className="flex items-start gap-3">
//                     <div className="w-5 h-5 bg-primary rounded-full mt-1" />
//                     <div>
//                       <div className="font-medium text-foreground">Travel & Exploration</div>
//                       <div className="text-sm text-muted-foreground">New places, new patterns, new ideas</div>
//                     </div>
//                   </li>
//                   <li className="flex items-start gap-3">
//                     <div className="w-5 h-5 bg-primary rounded-full mt-1" />
//                     <div>
//                       <div className="font-medium text-foreground">Continuous Learning</div>
//                       <div className="text-sm text-muted-foreground">Curiosity → prototypes → shipped</div>
//                     </div>
//                   </li>
//                   <li className="flex items-start gap-3">
//                     <div className="w-5 h-5 bg-primary rounded-full mt-1" />
//                     <div>
//                       <div className="font-medium text-foreground">Community Building</div>
//                       <div className="text-sm text-muted-foreground">Sharing, teaching, and learning together</div>
//                     </div>
//                   </li>
//                 </ul>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Skills */}
//           <Card className="bg-card/80 backdrop-blur-sm border-2 border-primary/20 shadow-card-travel">
//             <CardHeader>
//               <CardTitle className="flex items-center gap-3 text-2xl">
//                 <ImageIcon className="h-6 w-6 text-primary rotate-90" /> Skills
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-8">
//               {SKILLS.map(({ category, items }) => (
//                 <div key={category}>
//                   <h3 className="text-sm font-semibold text-foreground mb-3">{category}</h3>
//                   <div className="flex flex-wrap gap-2">
//                     {items.map((s) => (
//                       <span
//                         key={s}
//                         className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm hover:bg-primary/15 transition"
//                       >
//                         {s}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               ))}
//             </CardContent>
//           </Card>

//           {/* Photos */}
//           <div className="space-y-4 mb-2">
//             <div className="flex items-center gap-2 text-sm uppercase tracking-wide text-muted-foreground">
//               <ImageIcon className="h-4 w-4" /> California Moments
//             </div>

//             <div className="relative overflow-x-auto no-scrollbar">
//               <div className="flex gap-3 py-2">
//                 {HOME_PHOTOS.map((p, i) => (
//                   <Dialog key={p.src} open={lightboxIndex === i} onOpenChange={(o) => setLightboxIndex(o ? i : null)}>
//                     <DialogTrigger asChild>
//                       <button className="group relative shrink-0 h-40 sm:h-44 md:h-48 rounded-xl overflow-hidden border border-primary/10 bg-muted/30 transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40">
//                         <img src={p.src} alt={p.caption} loading="lazy" className="h-full w-auto object-cover opacity-90 group-hover:opacity-100 group-hover:contrast-110" />
//                         <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent pointer-events-none" />
//                       </button>
//                     </DialogTrigger>
//                     <DialogContent className="p-0 bg-background/95 border border-primary/20 max-w-3xl">
//                       <button className="absolute right-3 top-3 z-10 rounded-full p-1 bg-background/80 border border-primary/20" onClick={() => setLightboxIndex(null)}>
//                         <X className="h-5 w-5" />
//                       </button>
//                       <img src={p.src} alt={p.caption} className="w-full h-auto object-contain rounded-t-lg" />
//                       <div className="p-4 text-sm text-muted-foreground">{p.caption}</div>
//                     </DialogContent>
//                   </Dialog>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Navigation */}
//           <div className="flex justify-center">
//             <Button onClick={handleContinueJourney} size="lg" className="px-8 py-6 text-lg bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-105">
//               Continue Journey to Illinois
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;
