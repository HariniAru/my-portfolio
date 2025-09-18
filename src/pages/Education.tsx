import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  MapPin,
  GraduationCap,
  Book,
  Award,
  Images,
  Image as ImageIcon,
  X,
  Users,
  Medal,
  Trophy,
  Star,
  Dot,
  // NEW ICONS for involvement cards
  FlaskConical,
  Megaphone,
  ServerCog,
  BookOpen,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import Navigation from '@/components/Navigation';
import { addVisitedPage } from '@/lib/journey';
import { journeyStops } from '@/components/WorldMap';

const chipBase =
  'inline-flex items-center justify-center rounded-full px-3 py-1 text-xs md:text-sm font-medium bg-primary/10 border border-primary/20 text-primary';

const statItem =
  'rounded-lg border border-primary/15 bg-accent/40 px-3 py-2 text-sm text-foreground';

const Education: React.FC = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    addVisitedPage('/education');
  }, []);

  const handleBackToMap = () => (window.location.href = '/');
  
  const handleContinueJourney = () => {
    // Find next stop in journey
    const currentStop = journeyStops.find(stop => stop.route === '/education');
    const nextStop = journeyStops.find(stop => stop.id === (currentStop?.id || 0) + 1);
    
    if (nextStop) {
      // Add visited page tracking and ensure journey progression
      addVisitedPage('/education');
      window.location.href = `/?next=${nextStop.id}&from=${currentStop?.id}`;
    } else {
      window.location.href = '/';
    }
  };

  // ==== DATA =================================================================
  const involvement = [
    'Research Assistant — Crowd Dynamics Lab',
    'Infrastructure Chair — Women in Computer Science',
    'Outreach Chair — Society of Women Engineers Illinois',
    'Historian Chair — Society of Women Engineers Illinois'
  ];

  // Fancy involvement cards (role + org + icon + subtle ribbon)
  const involvementCards = [
    {
      role: 'Research Assistant',
      org: 'Crowd Dynamics Lab',
      icon: FlaskConical,
      accent: 'from-primary/10 to-transparent',
    },
    {
      role: 'Infrastructure Chair',
      org: 'Women in Computer Science',
      icon: ServerCog,
      accent: 'from-amber-500/10 to-transparent',
    },
    {
      role: 'Outreach Chair',
      org: 'Society of Women Engineers Illinois',
      icon: Megaphone,
      accent: 'from-fuchsia-500/10 to-transparent',
    },
    {
      role: 'Historian Chair',
      org: 'Society of Women Engineers Illinois',
      icon: BookOpen,
      accent: 'from-blue-500/10 to-transparent',
    },
  ];

  const gradCourses = [
    'Text Information Systems',
    'Software Engineering',
    'Cloud Networking',
    'Computational Photography',
    'Theory & Practice of Data Cleaning',
    'Foundations of Data Curation',
  ];

  const undergradCourses = [
    'Artificial Intelligence',
    'Applied Machine Learning',
    'Reinforcement Learning',
    'Deep Learning for Computer Vision',
    'Programming Languages & Compilers',
    'System Programming',
    'Algorithms & Models of Computation',
    'Natural Language Processing',
    'Databases',
    'Game Development',
    'Data Structures',
    'Computer Architecture',
    'Software Design Lab',
    'Discrete Structures',
    'Numerical Methods',
    'Probability & Statistics',
    'Ethical & Professional Conduct',
  ];

  // Creative award cards content
  const awards = [
    {
      title: 'DaRin Butz Foundation Scholarship',
      subtitle: 'Grainger College of Engineering',
      icon: Medal,
      blurb:
        'Recognized for academic excellence and impact in engineering.',
      accent: 'from-primary/10 to-primary/0',
      tags: ['Impact', 'Merit', 'Engineering'],
    },
    {
      title: 'Illinois Engineering Achievement Scholarship',
      subtitle: 'Grainger College of Engineering',
      icon: Trophy,
      blurb:
        'Merit scholarship celebrating sustained achievement and leadership.',
      accent: 'from-amber-500/10 to-amber-500/0',
      tags: ['Merit', 'Engineering', 'Leadership'],
    },
    {
      title: 'SWE Santa Clara Valley Cargill Scholarship',
      subtitle: 'Society of Women Engineers',
      icon: Star,
      blurb:
        'Awards commitment to engineering excellence and upholding SWE values.',
      accent: 'from-fuchsia-500/10 to-fuchsia-500/0',
      tags: ['Community', 'Merit', 'Engineering'],
    },
  ];

  // Replace with your actual assets
  const photos = [
    { src: '/public/images/illinois/busey-hall.jpg', caption: 'My freshman year dorm.' },
    { src: '/public/images/illinois/bardeen-quad.jpg', caption: 'A view of the Bardeen Quad from the top floor of the CIF building.' },
    { src: '/public/images/illinois/swe-photo-wall.jpg', caption: 'Photo wall composed of SWE shirt designs at a SWE Diversity event.' },
    { src: '/public/images/illinois/dads-4-daughters.jpg', caption: 'Dads 4 Daughters event organized by SWE at UIUC.' },
    { src: '/public/images/illinois/snow-on-campus.jpg', caption: 'Snow on campus by the bridge area near the engineering quad.' },
    { src: '/public/images/illinois/snow-heart.jpg', caption: 'A heart made with my friend’s and my boots during a particularly snowy walk to class.' },
    { src: '/public/images/illinois/graduation-pose.jpg', caption: 'Sporting my graduation gown by the steps of the Foellinger Auditorium.' },
    { src: '/public/images/illinois/commencement-ceremony.jpg', caption: 'An exhilerating, memorable Commencement ceremony at the Memorial Stadium.' },
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation currentPage="/education" />

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
            <span>Urbana-Champaign, Illinois</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-10 animate-fade-in">
          {/* Title Section */}
          <div className="text-center space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground tracking-tight">
              Education
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Learning and thriving at UIUC — developing expertise while forging meaningful connections with fellow engineers and mentors.
            </p>
          </div>

          {/* Academic Journey (stacked & connected) */}
          <Card className="bg-card/80 backdrop-blur-sm border-2 border-primary/20 shadow-card-travel">
            <CardHeader className="pb-0">
              <CardTitle className="flex items-center gap-3 text-xl md:text-2xl">
                <GraduationCap className="h-7 w-7 text-primary" />
                University of Illinois at Urbana-Champaign
              </CardTitle>
              {/* <p className="text-sm text-muted-foreground">
                From fundamentals to advanced systems and data—one step powering the next.
              </p> */}
            </CardHeader>

            <CardContent className="mt-6">
              <div className="relative">
                {/* Connector line */}
                <div className="absolute left-3 top-0 bottom-0 w-px bg-primary/20 md:left-4" />

                {/* MCS (top node) */}
                <section className="relative pl-10 md:pl-12 pb-10">
                  <div className="absolute left-0 top-1.5 flex h-6 w-6 items-center justify-center rounded-full border border-primary/30 bg-background">
                    <Dot className="h-5 w-5 text-primary" />
                  </div>

                  <h2 className="text-lg md:text-xl font-semibold text-foreground">
                    Master of Computer Science
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    May 2024 – Present (Expected May 2026)
                  </p>

                  {/* Stats row */}
                  <div className="mt-4 flex flex-wrap gap-3">
                    <div className={statItem}>
                      <span className="font-medium">GPA</span> · 4.0 / 4.0
                    </div>
                    {/* <div className={statItem}>
                      <span className="font-medium">Campus</span> · Urbana-Champaign
                    </div> */}
                  </div>

                  {/* Graduate Coursework */}
                  <div className="mt-6">
                    <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <Book className="h-5 w-5 text-primary" />
                      Graduate Coursework
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {gradCourses.map((c) => (
                        <span key={c} className={chipBase}>
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </section>

                {/* BS (bottom node) */}
                <section className="relative pl-10 md:pl-12">
                  <div className="absolute left-0 top-1.5 flex h-6 w-6 items-center justify-center rounded-full border border-primary/30 bg-background">
                    <Dot className="h-5 w-5 text-primary" />
                  </div>

                  <h2 className="text-lg md:text-xl font-semibold text-foreground">
                    Bachelor of Science in Computer Science
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    August 2021 – May 2024
                  </p>

                  {/* Stats row */}
                  <div className="mt-4 flex flex-wrap gap-3">
                    <div className={statItem}>
                      <span className="font-medium">GPA</span> · 3.7 / 4.0
                    </div>
                    {/* <div className={statItem}>
                      <span className="font-medium">Campus</span> · Urbana-Champaign
                    </div> */}
                  </div>

                  {/* Undergraduate Coursework */}
                  <div className="mt-6">
                    <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <Book className="h-5 w-5 text-primary" />
                      Undergraduate Coursework
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {undergradCourses.map((c) => (
                        <span key={c} className={chipBase}>
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Involvement (UPGRADED) */}
                  <div className="mt-6">
                    <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <Users className="h-5 w-5 text-primary" />
                      Involvement
                    </h4>

                    {/* Old list preserved in code for reference; UI now uses the card grid */}
                    {/* <ul className="space-y-2 text-sm text-muted-foreground">
                      {involvement.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span className="mt-1 inline-block h-2 w-2 rounded-full bg-primary/70" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul> */}

                    <div className="grid sm:grid-cols-2 gap-4">
                      {involvementCards.map(({ role, org, icon: Icon, accent }) => (
                        <div
                          key={`${role}-${org}`}
                          className="relative rounded-2xl border border-primary/20 bg-accent/40 overflow-hidden p-4"
                        >
                          {/* diagonal ribbon */}
                          <div className="absolute -right-8 -top-6 rotate-45">
                            <div className={`h-16 w-40 bg-gradient-to-r ${accent}`} />
                          </div>

                          <div className="flex items-center gap-3">
                            <div className="rounded-full p-2 border border-primary/20 bg-background/70">
                              <Icon className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <div className="font-medium text-foreground">{role}</div>
                              <div className="text-xs text-muted-foreground">{org}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              </div>
            </CardContent>
          </Card>

          {/* Awards — creative cards */}
          <Card className="bg-card/80 backdrop-blur-sm border-2 border-primary/20 shadow-card-travel">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                <Award className="h-6 w-6 text-primary" />
                Academic Awards & Scholarships
              </CardTitle>
              {/* <p className="text-sm text-muted-foreground">
                Recognition that fueled the work—and the work that earned the recognition.
              </p> */}
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                {awards.map(({ title, subtitle, icon: Icon, blurb, accent, tags }) => (
                  <div
                    key={title}
                    className="relative rounded-2xl border border-primary/20 bg-accent/40 overflow-hidden"
                  >
                    {/* diagonal ribbon */}
                    <div className="absolute -right-8 -top-6 rotate-45">
                      <div className={`h-16 w-40 bg-gradient-to-r ${accent}`} />
                    </div>

                    <div className="p-5 space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="rounded-full p-2 border border-primary/20 bg-background/70">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-semibold text-foreground">{title}</div>
                          <div className="text-xs text-muted-foreground">{subtitle}</div>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{blurb}</p>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {tags.map((t) => (
                          <span
                            key={t}
                            className="text-[11px] px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Photos — same pattern as Home (horizontal strip + lightbox) */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm uppercase tracking-wide text-muted-foreground">
              <Images className="h-4 w-4" /> Snaps from UIUC
            </div>

            <div className="relative overflow-x-auto no-scrollbar">
              <div className="flex gap-3 py-2">
                {photos.map((p, i) => (
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
Continue Journey to New York
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Education;
