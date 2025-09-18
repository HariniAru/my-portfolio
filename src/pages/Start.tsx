// import React from 'react';
// import { ArrowLeft, MapPin, Target } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import Navigation from '@/components/Navigation';

// const Start = () => {
//   const handleBackToMap = () => {
//     window.location.href = '/';
//   };

//   const handleContinueJourney = () => {
//     window.location.href = '/home';
//   };

//   return (
//     <div className="min-h-screen bg-gradient-hero">
//       <Navigation currentPage="/start" />
      
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
//             <span>Pudukkottai, Tamil Nadu, India</span>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="space-y-8 animate-fade-in">
//           {/* Title Section */}
//           <div className="text-center space-y-4">
//             <h1 className="text-5xl md:text-6xl font-bold text-foreground">
//               START
//             </h1>
//             <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
//               This country is my starting point. I was born in Pudukkottai, Tamil Nadu, India - 
//               where my journey into the world of technology and Computer Science began.
//             </p>
//           </div>

//           {/* Objective Statement Card */}
//           <Card className="bg-card/80 backdrop-blur-sm border-2 border-primary/20 shadow-card-travel">
//             <CardHeader>
//               <CardTitle className="flex items-center gap-3 text-2xl">
//                 <Target className="h-8 w-8 text-primary" />
//                 Objective Statement
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               <div className="grid md:grid-cols-2 gap-8 items-center">
//                 <div className="space-y-4">
//                   <h3 className="text-xl font-semibold text-foreground">
//                     My Mission
//                   </h3>
//                   <p className="text-muted-foreground leading-relaxed">
//                     As a passionate software engineer, my objective is to leverage cutting-edge technology 
//                     to solve real-world problems and create meaningful digital experiences. I believe in 
//                     the power of code to transform ideas into reality and make a positive impact on people's lives.
//                   </p>
//                 </div>
                
//                 <div className="bg-accent/50 p-6 rounded-lg border border-primary/10">
//                   <h4 className="font-semibold text-foreground mb-3">Core Values</h4>
//                   <ul className="space-y-2 text-sm text-muted-foreground">
//                     <li className="flex items-center gap-2">
//                       <div className="w-2 h-2 bg-primary rounded-full"></div>
//                       Innovation through continuous learning
//                     </li>
//                     <li className="flex items-center gap-2">
//                       <div className="w-2 h-2 bg-primary rounded-full"></div>
//                       Collaborative problem-solving
//                     </li>
//                     <li className="flex items-center gap-2">
//                       <div className="w-2 h-2 bg-primary rounded-full"></div>
//                       Building accessible technology
//                     </li>
//                     <li className="flex items-center gap-2">
//                       <div className="w-2 h-2 bg-primary rounded-full"></div>
//                       Ethical and sustainable development
//                     </li>
//                   </ul>
//                 </div>
//               </div>

//               <div className="pt-4 border-t border-primary/10">
//                 <h3 className="text-lg font-semibold text-foreground mb-3">
//                   When we start something, we often think about what our goals are for that task.
//                 </h3>
//                 <p className="text-muted-foreground leading-relaxed">
//                   As an engineer, my objective is to bridge the gap between complex technical challenges 
//                   and elegant, user-friendly solutions. I strive to write clean, maintainable code while 
//                   staying at the forefront of emerging technologies and best practices.
//                 </p>
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
//               Continue Journey to California
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Start;


import React, { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, Target, Image as ImageIcon, X, Brain, Speech } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import Navigation from '@/components/Navigation';
import { addVisitedPage } from '@/lib/journey';
import { journeyStops } from '@/components/WorldMap';
// import selfPortrait from '@/assets/self-portrait.jpg';

// 1) Provide your images here
const portraitSrc = '/public/images/self-portrait.jpg'; // '/images/harini-portrait.jpg';
const indiaPhotos = [
  { src: '/public/images/india/city-scene.jpg', caption: 'A vibrant, bustling street scene just outside the city of Karaikudi in Tamil Nadu.' },
  { src: '/public/images/india/karaikudi-home.jpg', caption: 'My grandmother on a walk by our home in Karaikudi.' },
  { src: '/public/images/india/theppakulam.jpg', caption: 'A theppakulam (pond of holy water) in front of the Karpaka Vinayakar temple.' },
  { src: '/public/images/india/filter-coffee.jpg', caption: 'Savoring freshly made filter coffee with my family.' },
  { src: '/public/images/india/deer.jpg', caption: 'A deer quietly greets us, peeking out from the trees and bushes on our morning forest walk.' },
  { src: '/public/images/india/cows-grazing.jpg', caption: 'A herd of cows grazing peacefully in the fields outside a temple.', },
  { src: '/public/images/india/jackfruit.jpg', caption: 'A ripe jackfruit hanging from a tree in the backyard of our ancestral home in Athangudi.' },
  { src: '/public/images/india/calf.jpg', caption: 'A calf waiting for its mother in my grandmother\'s farm in Arasampatti.' },
  { src: '/public/images/india/tamarind-tree.jpg', caption: 'A tamarind tree by our home in Ararasampatti, bearing fruit.' },
  { src: '/public/images/india/outdoor-restaurant.jpg', caption: 'Outdoor hut-like seating at the Karaikudi Garden Biriyani restaurant in Karaikudi.' },
  { src: '/public/images/india/vimana.jpg', caption: 'The vimana of the Karpaka Vinayakar temple, rising gracefully into the monsoon sky.' },
];

const Start = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    addVisitedPage('/start');
  }, []);

  const handleBackToMap = () => (window.location.href = '/');
  
  const handleContinueJourney = () => {
    const currentStop = journeyStops.find(stop => stop.route === '/start');
    const nextStop = journeyStops.find(stop => stop.id === (currentStop?.id || 0) + 1);
    
    if (nextStop) {
      addVisitedPage('/start');
      window.location.href = `/?next=${nextStop.id}&from=${currentStop?.id}`;
    } else {
      window.location.href = '/';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation currentPage="/start" />

      <div className="container mx-auto px-6 py-20 max-w-5xl">
        {/* Header row */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="icon" onClick={handleBackToMap} className="border-primary/30">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-5 w-5" />
            <span>Tamil Nadu, India</span>
          </div>
        </div>

        {/* Hero: Title + Portrait */}
        <div className="grid md:grid-cols-2 gap-10 items-center mb-10 animate-fade-in">
          {/* Text block */}
          <div className="space-y-4 text-center md:text-left">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground tracking-tight">Hi, I'm Harini Arumugam!</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              My journey began in Tamil Nadu, India, where I was born. India shaped my identity,
              curiosity, and the way I build: grounded in community, resourcefulness, and respect for complexity.
            </p>
          </div>

          {/* Portrait */}
          <div className="flex justify-center md:justify-end">
            <div
              className="relative w-56 h-56 md:w-64 md:h-64 rounded-full ring-4 ring-primary/20 shadow-card-travel
                         overflow-hidden motion-safe:animate-plane-float"
              aria-label="Portrait of Harini"
            >
              <img
                src={portraitSrc}
                alt="Harini Arumugam portrait"
                className="w-full h-full object-cover object-[center_30%]"
                loading="eager"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent" />
            </div>
          </div>
        </div>

        {/* Objective Card (tight, resume-aligned) */}
        <Card className="bg-card/80 backdrop-blur-sm border-2 border-primary/20 shadow-card-travel mb-10">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <Speech className="h-7 w-7 text-primary" />
              My Engineering Philosophy
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-foreground text-lg leading-relaxed">
              I believe that the best solutions come from understanding both the human element and the technical possibilities, creating bridges between complex technology and real-world applications.
              My goal is to create solutions that not only work efficiently but also make a meaningful difference in people's lives.
            </p>
            <div className="grid md:grid-cols-3 gap-4 pt-2 border-t border-primary/10">
              <div className="bg-accent/50 p-4 rounded-lg border border-primary/10">
                <h4 className="font-semibold text-foreground mb-2">Roots → Mindset</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2"><span className="w-4 h-2 bg-primary rounded-full" /> Multilingual → Communicating across diverse technical and cultural teams </li>
                  <li className="flex items-center gap-2"><span className="w-4 h-2 bg-primary rounded-full" /> Community-first outlook → Collaborative with empathy and shared purpose </li>
                  <li className="flex items-center gap-2"><span className="w-3 h-2 bg-primary rounded-full" /> Colorful, vibrant environment → Creative perspective </li>
                </ul>
              </div>
              <div className="md:col-span-2 text-muted-foreground leading-relaxed">
                India is where my curiosity and resilience began. Those values guide how I design, test, and ship:
                clear interfaces, thoughtful edge‑cases, and solutions that scale for real users.
              </div>
            </div>
          </CardContent>
        </Card>


        {/* India Filmstrip Gallery */}
        <div className="space-y-4 mb-12">
          <div className="flex items-center gap-2 text-sm uppercase tracking-wide text-muted-foreground">
            <ImageIcon className="h-4 w-4" />
            Snaps from India
          </div>

          <div className="relative overflow-x-auto no-scrollbar">
            <div className="flex gap-3 py-2">
              {indiaPhotos.map((p, i) => (
                <Dialog key={p.src} open={lightboxIndex === i} onOpenChange={(open) => setLightboxIndex(open ? i : null)}>
                  <DialogTrigger asChild>
                    <button
                      className="group relative shrink-0 h-40 sm:h-44 md:h-48 rounded-xl overflow-hidden border border-primary/10 
                                 bg-muted/30 transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 
                                 focus-visible:ring-primary/40"
                      aria-label={`Open photo ${i + 1}: ${p.caption}`}
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
                    <img src={p.src} alt={p.caption} className="w-full h-auto object-contain rounded-t-lg" />
                    <div className="p-4 text-sm text-muted-foreground">{p.caption}</div>
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
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
  );
};

export default Start;
