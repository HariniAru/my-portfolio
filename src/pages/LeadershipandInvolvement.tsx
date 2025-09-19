import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  MapPin,
  Users,
  Megaphone,
  BookOpen,
  ServerCog,
  Award,
  Building2,
  CalendarCheck,
  Handshake,
  Image as ImageIcon,
  Images,
  X,
  Building,
  CameraIcon,
  Camera,
//   Timeline as TimelineIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import Navigation from '@/components/Navigation';
import { addVisitedPage } from '@/lib/journey';
import { journeyStops } from '@/components/WorldMap';

// shared chips / stats
const chip =
  'inline-flex items-center justify-center rounded-full px-3 py-1 text-xs md:text-sm font-medium bg-primary/10 border border-primary/20 text-primary';
const stat = 'rounded-lg border border-primary/15 bg-accent/40 px-3 py-2 text-sm text-foreground';

const Leadership: React.FC = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    addVisitedPage('/leadership&involvement');
  }, []);

  const handleBackToMap = () => (window.location.href = '/');
  
  const handleContinueJourney = () => {
    // Find current stop and loop back to start (stop 1)
    const currentStop = journeyStops.find(stop => stop.route === '/leadership&involvement');
    const startStop = journeyStops.find(stop => stop.id === 1); // Always go to Start
    
    if (currentStop && startStop) {
      // Loop back to Start with proper plane animation
      addVisitedPage('/leadership&involvement');
      window.location.href = `/?from=${currentStop.id}&next=${startStop.id}`;
    } else {
      // Fallback: return to map
      addVisitedPage('/leadership&involvement');
      window.location.href = '/';
    }
  };

  // ===================== DATA =====================
  // SWE timeline (chronological)
  const sweTimeline = [
    {
      role: 'Empowering Students in Engineering Chair, Outreach',
      org: 'Society of Women Engineers (UIUC)',
      time: '2023 – 2024',
      icon: Megaphone,
      points: [
        'Designed and ran the Empowering Students in Engineering event for high-school students.',
        'Led interactive major-panel rotations to showcase engineering disciplines.',
        'Coordinated guided tours of UIUC facilities for firsthand exposure to campus life.',
        'Organized a scavenger hunt led by engineering RSOs to make learning hands-on and fun.',
      ],
      tags: ['STEM', 'Event Ops', 'Community'],
      accent: 'from-amber-500/10 to-transparent',
    },
    {
      role: 'SWENext Chair, Outreach',
      org: 'Society of Women Engineers (UIUC)',
      time: '2022 – 2023',
      icon: Megaphone,
      points: [
        'Partnered with local high schools to help establish SWENext/SWE branches.',
        'Hosted college panels to introduce UIUC’s engineering departments and pathways.',
        'Guided students through the college application process with practical Q&A and planning tips.',
      ],
      tags: ['STEM', 'Event Ops', 'Community'],
      accent: 'from-amber-500/10 to-transparent',
    },
    {
      role: 'Historian Chair, Information & Marketing',
      org: 'Society of Women Engineers (UIUC)',
      time: '2021 – 2022',
      icon: Camera,
      points: [
        'Photographed and filmed SWE events, building a reusable media library.',
        'Led an officer interview series: questions, scheduling, and shoots.',
        'Produced a year-in-review video combining interviews and event highlights.',
        'Set an editorial cadence with co-chairs for planning, editing, and publishing.',
        'Organized a searchable archive with metadata for future chairs and campaigns.',
      ],
      tags: ['Archiving', 'Design', 'Storytelling'],
      accent: 'from-violet-500/10 to-transparent',
    },
  ] as const;

  // WiCS (separate org)
  const wics = {
    role: 'Infrastructure Chair',
    org: 'Women in Computer Science (UIUC)',
    time: '2021 – 2023',
    icon: ServerCog,
    bullets: [
    'Maintained and streamlined the WiCS site so members could quickly access events, point codes, and resources.',
    'Integrated PurgoMalum into the point-code generator to keep submissions clean and reduce moderator overhead.',
    'Designed a sponsor call-to-action page (value props, tiers, contact) to engage company partners.',
    'Built a committees hub with clear descriptions and join paths, improving discovery and participation.',
    ],
    tags: ['Web Infrastructure', 'Content Ops', 'Accessibility', 'Templates & Components'],
  } as const;

  // Current industry leadership — surfaced to top
  const ambassador = {
    role: 'Intern Ambassador ',
    title: 'D&A Software Solutions, FTI Consulting, Inc.',
    time: 'Current',
    icon: Handshake,
    bullets: [
      'Connect with interns from day one: cohort kickoffs, 1:1 check-ins, and an open channel for questions.',
      'Introduce my team\'s ways of working at FTI Consulting and how they align with FTI\’s culture and policies.',
      'Provide ongoing guidance so interns ramp fast and contribute confidently.',
    ],
    tags: ['Onboarding', 'Mentorship', 'Engagement'],
  } as const;

  // Photo strip gallery (replace with real assets)
  const photos = [
    { src: '/images/singapore/jewel-rain-vortex.jpg', caption: 'The Jewel Rain Vortex at Changi Airport.' },
    { src: '/images/singapore/garden-rhapsody.jpg', caption: 'The mesmerizing Garden Rhapsody light show in Gardens by the Bay.' },
    { src: '/images/singapore/greenhouse-indoor.jpg', caption: 'A mini safari beneath Singapore’s giant greenhouse canopy.' },
    { src: '/images/singapore/greenhouse-sunset.jpg', caption: 'Golden hour from within the glass conservatory.' },
    { src: '/images/singapore/bugis-junction.jpg', caption: 'Entrance of Bugis Junction mall in Singapore.' },
    { src: '/images/singapore/singapore-apartment-sunset-view.jpg', caption: 'A sunset illuminates Singapore\'s city skyline.' },
    { src: '/images/singapore/helix-bridge.jpg', caption: 'The Helix Bridge at night, a stunning architectural marvel.' },
    { src: '/images/singapore/singapore-city-skyline.jpg', caption: 'The Singapore city skyline at night, a breathtaking view.' },
    { src: '/images/singapore/nature-view.jpg', caption: 'Tropical trail, water on the horizon.' },
    { src: '/images/singapore/singapore-apartment-night-view.jpg', caption: 'The tall buildings of Singapore glow at night.' },
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation currentPage="/leadership&involvement" />

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
            <span>Singapore</span>
          </div>
        </div>

        {/* Title */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground tracking-tight">Leadership & Involvement</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Where curiosity meets action and community fuels innovation.
          </p>
        </div>

        <div className="space-y-10 mt-10 animate-fade-in">
          {/* Intern Ambassador — moved to TOP */}
          {/* <Card className="bg-card/80 backdrop-blur-sm border-2 border-primary/20 shadow-card-travel">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                <Building2 className="h-6 w-6 text-primary" /> {ambassador.title}
              </CardTitle>
              <p className="text-sm text-muted-foreground">{ambassador.orgLine}</p>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground flex items-center gap-2"><CalendarCheck className="h-5 w-5 text-primary" /> Highlights</h4>
                  <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-5">
                    {ambassador.points.map((p) => <li key={p}>{p}</li>)}
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground flex items-center gap-2"><Award className="h-5 w-5 text-primary" /> Impact</h4>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {['Community', 'Mentorship', 'Ops'].map((t) => <span key={t} className={chip}>{t}</span>)}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card> */}


          {/* Intern Ambassador — moved to TOP */}
          <Card className="bg-card/80 backdrop-blur-sm border-2 border-primary/20 shadow-card-travel">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                <Building2 className="h-6 w-6 text-primary" /> {ambassador.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative rounded-2xl border border-primary/20 bg-accent/40 p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="rounded-full p-2 border border-primary/20 bg-background/70"><ambassador.icon className="h-5 w-5 text-primary" /></div>
                  <div>
                    <div className="font-semibold text-foreground">{ambassador.role}</div>
                    <p className="text-sm text-muted-foreground">{ambassador.time}</p>
                  </div>
                </div>
                <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-5">
                  {ambassador.bullets.map((b) => <li key={b}>{b}</li>)}
                </ul>
                <div className="flex flex-wrap gap-2 pt-3">
                  {ambassador.tags.map((t) => <span key={t} className={chip}>{t}</span>)}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* SWE Timeline */}
          <Card className="bg-card/80 backdrop-blur-sm border-2 border-primary/20 shadow-card-travel">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                <Users className="h-6 w-6 text-primary" /> Society of Women Engineers Illinois, UIUC
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative pl-8">
                {/* vertical rail */}
                <div className="absolute left-3 top-0 bottom-0 w-px bg-primary/20" />

                {sweTimeline.map(({ role, org, time, icon: Icon, points, tags, accent }, idx) => (
                  <div key={role} className="relative mb-8 last:mb-0">
                    {/* node */}
                    <div className="absolute -left-0.5 top-1.5 h-3 w-3 rounded-full bg-background border border-primary/40" />

                    {/* content card */}
                    <div className="relative rounded-2xl border border-primary/20 bg-accent/40 overflow-hidden">
                      {/* diagonal ribbon */}
                      <div className="absolute -right-8 -top-6 rotate-45">
                        <div className={`h-16 w-40 bg-gradient-to-r ${accent}`} />
                      </div>

                      <div className="p-5 space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="rounded-full p-2 border border-primary/20 bg-background/70"><Icon className="h-5 w-5 text-primary" /></div>
                          <div>
                            <div className="font-semibold text-foreground">{role}</div>
                            <div className="text-xs text-muted-foreground">{time}</div>
                          </div>
                        </div>
                        <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-5">
                          {points.map((p) => <li key={p}>{p}</li>)}
                        </ul>
                        <div className="flex flex-wrap gap-2 pt-1">
                          {tags.map((t) => <span key={t} className={chip}>{t}</span>)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* WiCS — separate org card */}
          <Card className="bg-card/80 backdrop-blur-sm border-2 border-primary/20 shadow-card-travel">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                <Users className="h-6 w-6 text-primary" /> {wics.org}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative rounded-2xl border border-primary/20 bg-accent/40 p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="rounded-full p-2 border border-primary/20 bg-background/70"><wics.icon className="h-5 w-5 text-primary" /></div>
                  <div>
                    <div className="font-semibold text-foreground">{wics.role}</div>
                    <p className="text-sm text-muted-foreground">{wics.time}</p>
                  </div>
                </div>
                <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-5">
                  {wics.bullets.map((b) => <li key={b}>{b}</li>)}
                </ul>
                <div className="flex flex-wrap gap-2 pt-3">
                  {wics.tags.map((t) => <span key={t} className={chip}>{t}</span>)}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* How I Lead
          <Card className="bg-card/80 backdrop-blur-sm border-2 border-primary/20 shadow-card-travel">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                <Handshake className="h-6 w-6 text-primary" /> How I Lead
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                <div className="space-y-2"><div className="font-medium text-foreground">People → Process → Product</div><p>Start with people and purpose, then design lightweight processes that unlock execution.</p></div>
                <div className="space-y-2"><div className="font-medium text-foreground">Playbooks, Not Bottlenecks</div><p>Document, template, and delegate so programs survive chair handoffs and scale.</p></div>
                <div className="space-y-2"><div className="font-medium text-foreground">Measure & Iterate</div><p>Define success upfront (attendance, NPS, retention) and run small experiments.</p></div>
              </div>
            </CardContent>
          </Card> */}

        {/* How I Lead */}
        <Card className="bg-card/80 backdrop-blur-sm border-2 border-primary/20 shadow-card-travel">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                    <Handshake className="h-6 w-6 text-primary" /> How I Lead
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                    <div className="space-y-2">
                    <div className="font-medium text-foreground">Document → Delegate</div>
                        <p>Document the work into step-by-step playbooks so anyone can run it.</p>
                    </div>
                    <div className="space-y-2">
                        <div className="font-medium text-foreground">Communicate with Clarity</div>
                        <p>Clear, shared expectations leads to smoother collaboration.</p>
                    </div>
                    <div className="space-y-2">
                        <div className="font-medium text-foreground">Measure → Iterate</div>
                        <p>Track feedback, progress, and engagement; make small improvements that last.</p>
                    </div>
                </div>
            </CardContent>
        </Card>

          {/* Photo gallery */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm uppercase tracking-wide text-muted-foreground">
              <Images className="h-4 w-4" /> Snaps from Singapore
            </div>
            <div className="relative overflow-x-auto no-scrollbar">
              <div className="flex gap-3 py-2">
                {photos.map((p, i) => (
                  <Dialog key={p.src} open={lightboxIndex === i} onOpenChange={(o) => setLightboxIndex(o ? i : null)}>
                    <DialogTrigger asChild>
                      <button className="group relative shrink-0 h-40 sm:h-44 md:h-48 rounded-xl overflow-hidden border border-primary/10 bg-muted/30 transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40">
                        <img src={p.src} alt={p.caption} loading="lazy" className="h-full w-auto object-cover opacity-90 group-hover:opacity-100 group-hover:contrast-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent pointer-events-none" />
                      </button>
                    </DialogTrigger>
                    <DialogContent className="p-0 bg-background/95 border border-primary/20 max-w-3xl">
                      <button className="absolute right-3 top-3 z-10 rounded-full p-1 bg-background/80 border border-primary/20" onClick={() => setLightboxIndex(null)} aria-label="Close">
                        <X className="h-5 w-5" />
                      </button>
                      <img src={p.src} alt={p.caption} className="w-full h-auto object-contain rounded-t-lg" />
                      <div className="p-4 text-sm text-muted-foreground flex items-center gap-2"><span>{p.caption}</span></div>
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
            </div>
          </div>

          {/* Back to Map */}
          <div className="mt-14 flex justify-center">
            <Button onClick={handleContinueJourney} size="lg" className="px-8 py-6 text-lg bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-105">Continue Journey to Start</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leadership;
