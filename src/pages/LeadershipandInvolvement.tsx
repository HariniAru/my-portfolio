import React, { useState } from 'react';
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
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import Navigation from '@/components/Navigation';

// chip + stat styles reused for visual consistency
const chip =
  'inline-flex items-center justify-center rounded-full px-3 py-1 text-xs md:text-sm font-medium bg-primary/10 border border-primary/20 text-primary';
const stat = 'rounded-lg border border-primary/15 bg-accent/40 px-3 py-2 text-sm text-foreground';

const Leadership: React.FC = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const handleBackToMap = () => (window.location.href = '/');
  const handleContinueJourney = () => (window.location.href = '/projects');

  // ===================== DATA =====================
  // RSO roles (3 positions across 2 clubs)
  const roles = [
    {
      org: 'Society of Women Engineers (UIUC)',
      role: 'Information & Marketing Chair',
      time: '2022 – 2023',
      icon: BookOpen,
      bullets: [
        'Built a consistent visual system for events; templated weekly promos and recap posts',
        'Grew social reach and improved event RSVP conversion with A/B copy tests',
        'Coordinated photo/video coverage and archived content for future chairs',
      ],
      tags: ['Branding', 'Content Ops', 'Analytics'],
      ribbon: 'from-fuchsia-500/10 to-transparent',
    },
    {
      org: 'Society of Women Engineers (UIUC)',
      role: 'Outreach Chair',
      time: '2023 – 2024',
      icon: Megaphone,
      bullets: [
        'Led K‑12 STEM outreach (e.g., Dads & Daughters, Girl Scout workshops)',
        'Secured volunteers, venues, and supplies; built run-of-show playbooks',
        'Established feedback loops to iterate activities and improve NPS',
      ],
      tags: ['STEM Outreach', 'Event Ops', 'Community'],
      ribbon: 'from-amber-500/10 to-transparent',
    },
    {
      org: 'Women in Computer Science (UIUC)',
      role: 'Infrastructure Chair',
      time: '2023 – 2024',
      icon: ServerCog,
      bullets: [
        'Maintained web properties and automated email workflows',
        'Built reusable components for event pages and sign‑up flows',
        'Set up analytics dashboards to track engagement and retention',
      ],
      tags: ['Web Systems', 'Automation', 'Analytics'],
      ribbon: 'from-blue-500/10 to-transparent',
    },
  ];

  // Current industry leadership
  const ambassador = {
    company: 'Intern Ambassador',
    orgLine: 'Current Role • Cupertino / Bay Area',
    points: [
      'Facilitate onboarding cohorts and host Q&A office hours',
      'Pair interns with mentors; coordinate peer-learning circles',
      'Spin up events that connect interns with product and research teams',
    ],
    metrics: [
      { label: 'Cohort events hosted', value: '10+' },
      { label: 'Peer circles launched', value: '4' },
      { label: 'Avg. event NPS', value: '9/10' },
    ],
  } as const;

  // Photo strip gallery (replace paths with your assets)
  const photos = [
    { src: '/src/assets/leadership/swe-d4d.jpg', caption: 'SWE Dads & Daughters STEM Night.' },
    { src: '/src/assets/leadership/wics-hacknight.jpg', caption: 'WiCS hack night — infra + web clinic.' },
    { src: '/src/assets/leadership/outreach-workshop.jpg', caption: 'K‑12 outreach workshop — circuits + code.' },
    { src: '/src/assets/leadership/ambassador-event.jpg', caption: 'Intern Ambassador kickoff — welcome social.' },
    { src: '/src/assets/leadership/panel.jpg', caption: 'Student panel on internships and career paths.' },
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation currentPage="/leadership" />

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
          <h1 className="text-5xl md:text-6xl font-bold text-foreground tracking-tight">
            Leadership & Involvement
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Building community, shipping student programs, and creating spaces where peers and young students can thrive.
          </p>
        </div>

        <div className="space-y-10 mt-10 animate-fade-in">
          {/* RSO Roles */}
          <Card className="bg-card/80 backdrop-blur-sm border-2 border-primary/20 shadow-card-travel">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                <Users className="h-6 w-6 text-primary" />
                Registered Student Organizations (UIUC)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-4">
                {roles.map(({ org, role, time, icon: Icon, bullets, tags, ribbon }) => (
                  <div key={`${org}-${role}`} className="relative rounded-2xl border border-primary/20 bg-accent/40 overflow-hidden">
                    {/* Diagonal ribbon */}
                    <div className="absolute -right-8 -top-6 rotate-45">
                      <div className={`h-16 w-40 bg-gradient-to-r ${ribbon}`} />
                    </div>

                    <div className="p-5 space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="rounded-full p-2 border border-primary/20 bg-background/70">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-semibold text-foreground">{role}</div>
                          <div className="text-xs text-muted-foreground">{org} • {time}</div>
                        </div>
                      </div>

                      <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-5">
                        {bullets.map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-2 pt-1">
                        {tags.map((t) => (
                          <span key={t} className={chip}>{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Intern Ambassador */}
          <Card className="bg-card/80 backdrop-blur-sm border-2 border-primary/20 shadow-card-travel">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                <Building2 className="h-6 w-6 text-primary" />
                Intern Ambassador — Industry Leadership
              </CardTitle>
              <p className="text-sm text-muted-foreground">{ambassador.orgLine}</p>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground flex items-center gap-2"><CalendarCheck className="h-5 w-5 text-primary" /> Highlights</h4>
                  <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-5">
                    {ambassador.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground flex items-center gap-2"><Award className="h-5 w-5 text-primary" /> Impact</h4>
                  <div className="flex flex-wrap gap-3">
                    {ambassador.metrics.map(({ label, value }) => (
                      <div key={label} className={stat}>
                        <span className="font-medium">{label}</span> · {value}
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {['Community', 'Mentorship', 'Ops'].map((t) => (
                      <span key={t} className={chip}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Collaboration Principles */}
          <Card className="bg-card/80 backdrop-blur-sm border-2 border-primary/20 shadow-card-travel">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                <Handshake className="h-6 w-6 text-primary" />
                How I Lead
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                <div className="space-y-2">
                  <div className="font-medium text-foreground">People → Process → Product</div>
                  <p>Start with people and purpose, then design lightweight processes that unlock execution.</p>
                </div>
                <div className="space-y-2">
                  <div className="font-medium text-foreground">Playbooks, Not Bottlenecks</div>
                  <p>Document, template, and delegate so programs survive chair handoffs and scale.</p>
                </div>
                <div className="space-y-2">
                  <div className="font-medium text-foreground">Measure & Iterate</div>
                  <p>Define success upfront (attendance, NPS, retention) and run small experiments.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Photo gallery (horizontal strip + lightbox) */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm uppercase tracking-wide text-muted-foreground">
              <Images className="h-4 w-4" /> Moments from Singapore
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
                      <button
                        className="absolute right-3 top-3 z-10 rounded-full p-1 bg-background/80 border border-primary/20"
                        onClick={() => setLightboxIndex(null)}
                        aria-label="Close"
                      >
                        <X className="h-5 w-5" />
                      </button>
                      <img src={p.src} alt={p.caption} className="w-full h-auto object-contain rounded-t-lg" />
                      <div className="p-4 text-sm text-muted-foreground flex items-center gap-2">
                        <ImageIcon className="h-4 w-4" />
                        <span>{p.caption}</span>
                      </div>
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
            </div>
          </div>

          {/* Back to Map */}
            <div className="mt-14 flex justify-center">
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

export default Leadership;
