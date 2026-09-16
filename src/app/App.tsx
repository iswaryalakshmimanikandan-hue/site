import image_AskJuno_Logo__1__removebg_preview_1 from '@/imports/AskJuno_Logo__1_-removebg-preview-1.png'
import React, { useState, useEffect, useRef, useCallback } from "react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import logoDark from "@/imports/Custom_Design_Featuring_It-1.png";
import logoLight from "@/imports/AskJuno_Logo__1_-removebg-preview.png";
import { Sun, Moon, ArrowRight, Check, X, ChevronLeft, ChevronRight, ChevronDown, Mail, Phone, MapPin, Send, LogIn, Calendar, Menu } from "lucide-react";

const ORANGE = "linear-gradient(160deg, #f97316 0%, #f59e0b 100%)";
const ORANGE_SOLID = "#f97316";

// ── Shared helpers ─────────────────────────────────────────────────────────
function GradientText({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={className} style={{ backgroundImage: ORANGE, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{children}</span>
  );
}

function SectionLabel({ group, children }: { group: string; children: string }) {
  return (
    <div className="mb-3">
      {/* Parent group label */}

      {/* Sub-section heading */}
      <div className="flex items-center gap-3">
        <div className="h-px w-5 bg-orange-500 animate-pulse" />
        <span className="font-['Outfit',sans-serif] text-foreground font-black tracking-tight text-[32px]">{children}</span>
      </div>
    </div>
  );
}

function SectionHeading({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={`font-['Outfit',sans-serif] font-medium leading-relaxed text-muted-foreground ${className} text-[32px]`}>{children}</h2>
  );
}

// ── useSectionReveal hook ──────────────────────────────────────────────────
// Tracks scroll direction and fires a one-shot entrance animation class on
// each section element every time it becomes the active viewport section.
function useSectionReveal(ids: string[]) {
  const lastScrollY = useRef(0);
  const activeRef = useRef(-1);

  useEffect(() => {
    const reset = (el: HTMLElement) => {
      el.classList.remove("section-enter-up", "section-enter-down");
      // force reflow so re-adding the class restarts the animation
      void el.offsetWidth;
    };

    const observers = ids.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          const currentY = window.scrollY;
          const scrollingDown = currentY >= lastScrollY.current;
          lastScrollY.current = currentY;

          const idx = ids.indexOf(id);
          if (idx === activeRef.current) return;
          activeRef.current = idx;

          reset(el);
          el.classList.add(scrollingDown ? "section-enter-up" : "section-enter-down");
        },
        { threshold: 0.15 }
      );
      obs.observe(el);
      return obs;
    });

    return () => observers.forEach((o) => o?.disconnect());
  }, [ids]);
}

// ── useInView hook ─────────────────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function FadeIn({ children, delay = 0, className = "", from = "bottom" }: { children: React.ReactNode; delay?: number; className?: string; from?: "bottom" | "left" | "right" | "top" }) {
  const { ref, inView } = useInView();
  const translateMap = { bottom: "translateY(40px)", top: "translateY(-40px)", left: "translateX(-40px)", right: "translateX(40px)" };
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "none" : translateMap[from],
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
    }}>
      {children}
    </div>
  );
}

// ── Inline CSS animations ──────────────────────────────────────────────────
const globalStyles = `
@keyframes float { 0%,100%{transform:translateY(0px) rotate(0deg)} 33%{transform:translateY(-10px) rotate(1deg)} 66%{transform:translateY(-5px) rotate(-1deg)} }
@keyframes float-slow { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-18px)} }
@keyframes glow-pulse { 0%,100%{opacity:0.04} 50%{opacity:0.12} }
@keyframes glow-strong { 0%,100%{opacity:0.08} 50%{opacity:0.22} }
@keyframes workflow-glow { 0%,100%{box-shadow:0 0 0 0 rgba(249,115,22,0)} 50%{box-shadow:0 0 32px 6px rgba(249,115,22,0.28)} }
@keyframes bar-fill { from{width:0} to{width:var(--bar-w)} }
@keyframes badge-float-1 { 0%,100%{transform:translateY(0px) translateX(0px)} 50%{transform:translateY(-10px) translateX(4px)} }
@keyframes badge-float-2 { 0%,100%{transform:translateY(0px) translateX(0px)} 50%{transform:translateY(8px) translateX(-5px)} }
@keyframes badge-float-3 { 0%,100%{transform:translateY(0px)} 40%{transform:translateY(-14px)} }
@keyframes badge-float-4 { 0%,100%{transform:translateY(0px) translateX(0px)} 60%{transform:translateY(6px) translateX(6px)} }
@keyframes word-swap { 0%,18%{opacity:1;transform:translateY(0)} 22%,96%{opacity:0;transform:translateY(-12px)} 100%{opacity:0;transform:translateY(-12px)} }
@keyframes scan-line { 0%{transform:translateY(-100%);opacity:0} 10%{opacity:1} 90%{opacity:1} 100%{transform:translateY(800%);opacity:0} }
@keyframes border-spin { 0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }
@keyframes particle-drift { 0%{transform:translate(0,0);opacity:0} 10%{opacity:1} 90%{opacity:0.4} 100%{transform:translate(var(--dx),var(--dy));opacity:0} }
@keyframes ping-ring { 0%{transform:scale(1);opacity:0.7} 100%{transform:scale(2.4);opacity:0} }
@keyframes shimmer-x { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
@keyframes count-up { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
@keyframes reveal-line { from{width:0;opacity:0} to{opacity:1} }
@keyframes hero-in { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
.hero-animate-1{animation:hero-in 0.8s ease 0.05s both}
.hero-animate-2{animation:hero-in 0.8s ease 0.2s both}
.hero-animate-3{animation:hero-in 0.8s ease 0.35s both}
.hero-animate-4{animation:hero-in 0.8s ease 0.5s both}
.hero-animate-5{animation:hero-in 0.8s ease 0.65s both}
.hero-animate-6{animation:hero-in 0.8s ease 0.8s both}
.badge-1{animation:badge-float-1 5s ease-in-out infinite}
.badge-2{animation:badge-float-2 6.5s ease-in-out 1s infinite}
.badge-3{animation:badge-float-3 4.5s ease-in-out 0.5s infinite}
.badge-4{animation:badge-float-4 7s ease-in-out 2s infinite}

@keyframes section-rise {
  0%   { opacity:0; transform:translateY(56px) scale(0.98); }
  100% { opacity:1; transform:translateY(0)   scale(1);    }
}
@keyframes section-fall {
  0%   { opacity:0; transform:translateY(-40px) scale(0.98); }
  100% { opacity:1; transform:translateY(0)     scale(1);    }
}
@keyframes section-wipe-right {
  0%   { clip-path:inset(0 100% 0 0); opacity:0.5; }
  100% { clip-path:inset(0 0% 0 0);   opacity:1;   }
}
.section-enter-up   { animation: section-rise      0.72s cubic-bezier(0.22,1,0.36,1) both; }
.section-enter-down { animation: section-fall      0.72s cubic-bezier(0.22,1,0.36,1) both; }
.section-enter-wipe { animation: section-wipe-right 0.6s cubic-bezier(0.22,1,0.36,1) both; }

.section-content-stagger > * {
  animation: hero-in 0.55s cubic-bezier(0.22,1,0.36,1) both;
}
.section-content-stagger > *:nth-child(1) { animation-delay: 0.08s; }
.section-content-stagger > *:nth-child(2) { animation-delay: 0.18s; }
.section-content-stagger > *:nth-child(3) { animation-delay: 0.28s; }
.section-content-stagger > *:nth-child(4) { animation-delay: 0.38s; }
.section-content-stagger > *:nth-child(5) { animation-delay: 0.46s; }
.section-content-stagger > *:nth-child(6) { animation-delay: 0.54s; }

@keyframes shimmer-card { 0%{transform:translateX(-100%) skewX(-12deg)} 100%{transform:translateX(250%) skewX(-12deg)} }
@keyframes icon-pop { 0%{transform:scale(1)} 40%{transform:scale(1.18)} 70%{transform:scale(0.95)} 100%{transform:scale(1)} }
@keyframes orbit-ring { 0%{transform:scale(1);opacity:0.6} 100%{transform:scale(2.2);opacity:0} }
@keyframes draw-line { 0%{width:0;opacity:0} 20%{opacity:1} 100%{width:100%;opacity:1} }
@keyframes float-orb { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(18px,-22px) scale(1.04)} 66%{transform:translate(-12px,14px) scale(0.97)} }
@keyframes card-rise { from{opacity:0;transform:translateY(28px) scale(0.97)} to{opacity:1;transform:translateY(0) scale(1)} }
@keyframes cap-slide { from{opacity:0;transform:translateX(-16px)} to{opacity:1;transform:translateX(0)} }
@keyframes pulse-dot { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.5);opacity:0.5} }
@keyframes spin-slow { 0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }
@keyframes text-reveal { from{clip-path:inset(0 100% 0 0)} to{clip-path:inset(0 0% 0 0)} }
`;

// ── Navigation Structure ───────────────────────────────────────────────────
const NAV_GROUPS = [
  {
    label: "Home",
    anchor: "hero",
    sub: [
      { name: "Home", id: "hero", desc: "Welcome to AskJuno" },
    ],
  },
  {
    label: "Who We Are",
    anchor: "about",
    sub: [
      { name: "About Us", id: "about", desc: "Our story & mission" },
      { name: "Why AskJuno", id: "why-juno", desc: "Why businesses choose us" },
      { name: "Our Principles", id: "value", desc: "Vision, mission & values" },
    ],
  },
  {
    label: "What We Build",
    anchor: "what-we-do",
    sub: [
      { name: "What We Do", id: "what-we-do", desc: "Services & capabilities" },
      { name: "Products & Platforms", id: "products", desc: "BilliT, EETi & Custom AI" },
      { name: "Engineering", id: "technology", desc: "Technical capabilities" },
    ],
  },
  {
    label: "How We Build",
    anchor: "approach",
    sub: [
      { name: "Our Approach", id: "approach", desc: "Partnership & collaboration" },
      { name: "How We Build", id: "how-we-build", desc: "5-step engineering process" },
    ],
  },
  {
    label: "Where We Create Impact",
    anchor: "industries",
    sub: [
      { name: "Industries We Transform", id: "industries", desc: "Sectors we serve" },
    ],
  },
  {
    label: "Proven in Practice",
    anchor: "thinking",
    sub: [
      { name: "Insights", id: "thinking", desc: "Thinking & perspectives" },
      { name: "Success Stories", id: "stories", desc: "Measurable results" },
    ],
  },
];

// Flat list for section tracking — in page order
const SECTION_IDS = [
  "hero",
  "about",
  "why-juno",
  "value",
  "what-we-do",
  "products",
  "technology",
  "approach",
  "how-we-build",
  "industries",
  "thinking",
  "stories",
  "faq",
  "contact",
];

// ── Mega Menu Navbar ────────────────────────────────────────────────────────
const MEGA_ICONS: Record<string, React.ReactNode> = {
  "hero": <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="5" stroke="currentColor" strokeWidth="1.4" /><path d="M8 3v5l3 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>,
  "about": <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="5" r="3" stroke="currentColor" strokeWidth="1.3" /><path d="M2 14c0-2.8 2.7-5 6-5s6 2.2 6 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>,
  "why-juno": <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2l1.5 3.5L13 6l-2.5 2.5.5 3.5L8 10.5 5 12l.5-3.5L3 6l3.5-.5L8 2z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /></svg>,
  "value": <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M8 3v10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /><circle cx="8" cy="8" r="5" stroke="currentColor" strokeWidth="1.4" /></svg>,
  "what-we-do": <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="5" height="5" rx="1.2" stroke="currentColor" strokeWidth="1.3" /><rect x="9" y="2" width="5" height="5" rx="1.2" stroke="currentColor" strokeWidth="1.3" /><rect x="2" y="9" width="5" height="5" rx="1.2" stroke="currentColor" strokeWidth="1.3" /><rect x="9" y="9" width="5" height="5" rx="1.2" stroke="currentColor" strokeWidth="1.3" /></svg>,
  "products": <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 4.5L8 1.5l6 3v7l-6 3-6-3v-7z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /><path d="M2 4.5l6 3 6-3M8 7.5v7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>,
  "technology": <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M5 10l-3-2 3-2M11 10l3-2-3-2M9 4l-2 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  "approach": <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2a4 4 0 00-4 4c0 3 4 8 4 8s4-5 4-8a4 4 0 00-4-4z" stroke="currentColor" strokeWidth="1.3" /><circle cx="8" cy="6" r="1.5" stroke="currentColor" strokeWidth="1.3" /></svg>,
  "how-we-build": <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 13l4-8 3 4 2-2.5 2 2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /><path d="M2 13h12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>,
  "industries": <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 13V7l4-3 4 3v6M10 13V9h4v4" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /><path d="M2 13h12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>,
  "thinking": <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2a5 5 0 014.5 7.2c-.4.7-.5 1.4-.5 1.8H4c0-.4-.1-1.1-.5-1.8A5 5 0 018 2z" stroke="currentColor" strokeWidth="1.3" /><path d="M5.5 11v1a2.5 2.5 0 005 0v-1" stroke="currentColor" strokeWidth="1.3" /></svg>,
  "stories": <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 12l3-4 3 2.5 2.5-3.5L14 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  "faq": <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.3" /><path d="M6.5 6.5C6.5 5.7 7.1 5 8 5s1.5.6 1.5 1.5c0 1-1.5 1.5-1.5 2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /><circle cx="8" cy="11" r=".6" fill="currentColor" /></svg>,
  "contact": <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="4" width="12" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.3" /><path d="M2 5.5l6 4 6-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>,
};

function Navbar({ dark, setDark, activeSection }: { dark: boolean; setDark: (v: boolean) => void; activeSection: number }) {
  const [scrolled, setScrolled] = useState(false);
  const [openGroup, setOpenGroup] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpandedGroup, setMobileExpandedGroup] = useState<number | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpenGroup(null);
    setMobileMenuOpen(false);
  };

  const activeGroupIdx = NAV_GROUPS.findIndex(g =>
    g.sub.some(s => s.id === SECTION_IDS[activeSection])
  );

  const handleEnter = (i: number) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenGroup(i);
  };
  const handleLeave = () => {
    closeTimer.current = setTimeout(() => setOpenGroup(null), 200);
  };

  return (
    <>
      {/* Navbar bar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/95 backdrop-blur-xl shadow-lg shadow-black/10 border-b border-border" : "bg-background/80 backdrop-blur-md border-b border-transparent"} mx-[5px] my-[7px] px-[5px] py-[0px]`}>
        <div className="max-w-7xl mx-auto h-14 flex items-center justify-between px-4 sm:px-6 gap-x-2">

          {/* Logo */}
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="shrink-0">
            <ImageWithFallback src={dark ? logoDark : logoLight} alt="AskJuno" className="h-11 w-auto object-contain self-center" />
          </button>

          {/* Desktop Nav groups */}
          <div className="hidden lg:flex items-center gap-x-0.5 xl:gap-x-1">
            {NAV_GROUPS.map((group, gi) => {
              const isActive = activeGroupIdx === gi;
              const isOpen = openGroup === gi;
              const hasDropdown = group.sub.length > 1;
              return (
                <div key={gi} className="relative"
                  onMouseEnter={() => hasDropdown && handleEnter(gi)}
                  onMouseLeave={hasDropdown ? handleLeave : undefined}>
                  <button
                    onClick={() => scrollTo(group.anchor)}
                    className="relative flex items-center gap-1.5 px-2 xl:px-3.5 py-2 rounded-lg font-['Outfit',sans-serif] text-[13px] xl:text-[14px] 2xl:text-[15px] font-semibold transition-all duration-200 group whitespace-nowrap"
                    style={{ color: isActive ? "#f97316" : undefined }}>
                    <span className={`transition-colors duration-200 ${isActive ? "text-orange-500" : "text-muted-foreground group-hover:text-foreground"}`}>
                      {group.label}
                    </span>
                    {hasDropdown && (
                      <ChevronDown size={11}
                        className={`transition-all duration-200 ${isActive ? "text-orange-500" : "text-muted-foreground group-hover:text-foreground"} ${isOpen ? "rotate-180" : ""}`} />
                    )}
                    {/* Active underline */}
                    <span className="absolute bottom-0 left-2.5 right-2.5 h-[2px] rounded-full transition-all duration-200"
                      style={{ background: "#f97316", opacity: isActive ? 1 : 0, transform: isActive ? "scaleX(1)" : "scaleX(0)" }} />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Actions */}
          <div className="shrink-0 flex items-center gap-2">
            <button onClick={() => scrollTo("contact")}
              className="hidden sm:flex items-center gap-1.5 px-4 py-1.5 rounded-full font-['Outfit',sans-serif] font-semibold text-white text-[13px] transition-all hover:opacity-90 active:scale-95"
              style={{ background: ORANGE, boxShadow: "0 2px 12px rgba(249,115,22,0.35)" }}>
              Book a Call <Calendar size={12} />
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(prev => !prev)}
              className="lg:hidden flex items-center justify-center w-9 h-9 rounded-xl border border-border bg-card/80 text-foreground transition-all hover:border-orange-500/50 active:scale-95"
              aria-label="Toggle Navigation Menu">
              {mobileMenuOpen ? <X size={18} className="text-orange-500" /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile navigation drawer */}
      <div
        className={`fixed top-[62px] left-0 right-0 z-40 lg:hidden transition-all duration-300 origin-top overflow-hidden ${mobileMenuOpen ? "opacity-100 max-h-[calc(100vh-70px)] pointer-events-auto" : "opacity-0 max-h-0 pointer-events-none"
          }`}
        style={{
          background: "var(--card)",
          backdropFilter: "blur(20px)",
        }}>
        <div className="border-b border-border shadow-2xl p-4 sm:p-6 overflow-y-auto max-h-[calc(100vh-80px)] flex flex-col gap-2">
          <div className="h-0.5 -mt-4 sm:-mt-6 -mx-4 sm:-mx-6 mb-3" style={{ background: `linear-gradient(90deg, transparent 0%, #f97316 50%, transparent 100%)` }} />

          {NAV_GROUPS.map((group, gi) => {
            const isActive = activeGroupIdx === gi;
            const hasSub = group.sub.length > 1;
            const isExpanded = mobileExpandedGroup === gi;

            if (!hasSub) {
              return (
                <button
                  key={gi}
                  onClick={() => scrollTo(group.anchor)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border text-left font-['Outfit',sans-serif] font-bold text-sm transition-all duration-200 ${isActive
                    ? "border-orange-500/40 bg-orange-500/10 text-orange-500"
                    : "border-border/60 bg-muted/40 text-foreground hover:border-border"
                    }`}>
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                      style={{
                        background: isActive ? "rgba(249,115,22,0.15)" : "var(--card)",
                        color: isActive ? "#f97316" : "var(--muted-foreground)",
                        border: "1px solid var(--border)",
                      }}>
                      {MEGA_ICONS[group.anchor] ?? <ArrowRight size={13} />}
                    </div>
                    <span>{group.label}</span>
                  </div>
                  <ArrowRight size={14} className={isActive ? "text-orange-500" : "text-muted-foreground"} />
                </button>
              );
            }

            return (
              <div key={gi} className="rounded-xl border border-border/60 bg-muted/30 overflow-hidden">
                <button
                  onClick={() => setMobileExpandedGroup(isExpanded ? null : gi)}
                  className={`w-full flex items-center justify-between px-4 py-3 text-left font-['Outfit',sans-serif] font-bold text-sm transition-all ${isActive ? "text-orange-500" : "text-foreground"
                    }`}>
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                      style={{
                        background: isActive ? "rgba(249,115,22,0.15)" : "var(--card)",
                        color: isActive ? "#f97316" : "var(--muted-foreground)",
                        border: "1px solid var(--border)",
                      }}>
                      {MEGA_ICONS[group.sub[0].id] ?? <ArrowRight size={13} />}
                    </div>
                    <span>{group.label}</span>
                  </div>
                  <ChevronDown
                    size={15}
                    className={`transition-transform duration-200 ${isExpanded ? "rotate-180 text-orange-500" : "text-muted-foreground"}`}
                  />
                </button>

                {isExpanded && (
                  <div className="px-3 pb-3 pt-1 flex flex-col gap-1.5 border-t border-border/40 bg-background/50">
                    {group.sub.map((item, si) => {
                      const isSubActive = SECTION_IDS[activeSection] === item.id;
                      return (
                        <button
                          key={si}
                          onClick={() => scrollTo(item.id)}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all ${isSubActive
                            ? "bg-orange-500/10 text-orange-500 font-semibold"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                            }`}>
                          <div className="w-6 h-6 rounded-md flex items-center justify-center shrink-0"
                            style={{
                              background: isSubActive ? "rgba(249,115,22,0.2)" : "var(--muted)",
                              color: isSubActive ? "#f97316" : "var(--muted-foreground)",
                            }}>
                            {MEGA_ICONS[item.id] ?? <ArrowRight size={12} />}
                          </div>
                          <div className="min-w-0">
                            <div className="text-xs font-['Outfit',sans-serif] font-bold leading-tight">{item.name}</div>
                            <div className="text-[10px] text-muted-foreground truncate">{item.desc}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => scrollTo("contact")}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-['Outfit',sans-serif] font-bold text-white text-sm"
              style={{ background: ORANGE, boxShadow: "0 2px 12px rgba(249,115,22,0.35)" }}>
              <Calendar size={14} /> Book a Consultation
            </button>
          </div>
        </div>
      </div>

      {/* Mobile backdrop */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-black/40 backdrop-blur-xs lg:hidden" onClick={() => setMobileMenuOpen(false)} />
      )}

      {/* Mega menu panel — full-width, sits below navbar */}
      <div
        className="fixed top-14 left-0 right-0 z-40 transition-all duration-250 origin-top"
        style={{
          opacity: openGroup !== null ? 1 : 0,
          transform: openGroup !== null ? "scaleY(1)" : "scaleY(0.94)",
          pointerEvents: openGroup !== null ? "auto" : "none",
        }}
        onMouseEnter={() => { if (closeTimer.current) clearTimeout(closeTimer.current); }}
        onMouseLeave={handleLeave}>

        {/* Backdrop blur strip */}
        <div className="absolute inset-0 border-b border-border"
          style={{ background: "var(--card)", backdropFilter: "blur(20px)" }} />

        {/* Orange top accent */}
        <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg, transparent 0%, ${ORANGE} 30%, ${ORANGE} 70%, transparent 100%)` }} />

        <div className="relative max-w-7xl mx-auto px-6 py-6">
          {NAV_GROUPS.map((group, gi) => {
            const isGroupOpen = openGroup === gi;
            return (
              <div key={gi}
                className="transition-all duration-200"
                style={{ display: isGroupOpen ? "block" : "none" }}>

                {/* Group header row */}
                <div className="flex items-center gap-4 mb-5">
                  <div>
                    <p className="font-['JetBrains_Mono',monospace] text-[9px] tracking-[3px] uppercase font-bold mb-0.5"
                      style={{ color: "rgba(249,115,22,0.6)" }}>Section Group</p>
                    <h3 className="font-['Outfit',sans-serif] font-black text-xl text-foreground">{group.label}</h3>
                  </div>
                  <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
                  <button onClick={() => scrollTo(group.anchor)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border text-[12px] font-['Outfit',sans-serif] font-medium text-muted-foreground hover:text-foreground hover:border-orange-500/40 transition-all">
                    View all <ArrowRight size={11} />
                  </button>
                </div>

                {/* Sub-items grid */}
                <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${Math.min(group.sub.length, 4)}, 1fr)` }}>
                  {group.sub.map((item, si) => {
                    const isSubActive = SECTION_IDS[activeSection] === item.id;
                    return (
                      <button key={si} onClick={() => scrollTo(item.id)}
                        className="group text-left p-4 rounded-2xl border transition-all duration-200 relative overflow-hidden"
                        style={{
                          borderColor: isSubActive ? "rgba(249,115,22,0.4)" : "var(--border)",
                          background: isSubActive ? "linear-gradient(135deg, rgba(249,115,22,0.07) 0%, var(--muted) 100%)" : "var(--muted)",
                        }}
                        onMouseEnter={e => { if (!isSubActive) (e.currentTarget as HTMLElement).style.borderColor = "rgba(249,115,22,0.25)"; }}
                        onMouseLeave={e => { if (!isSubActive) (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; }}>

                        {/* Active glow */}
                        {isSubActive && (
                          <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl" style={{ background: ORANGE }} />
                        )}

                        {/* Icon */}
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3 transition-all duration-200"
                          style={{
                            background: isSubActive ? "rgba(249,115,22,0.15)" : "var(--card)",
                            color: isSubActive ? "#f97316" : "var(--muted-foreground)",
                            border: isSubActive ? "1px solid rgba(249,115,22,0.3)" : "1px solid var(--border)",
                          }}>
                          {MEGA_ICONS[item.id] ?? <ArrowRight size={14} />}
                        </div>

                        {/* Text */}
                        <p className="font-['Outfit',sans-serif] font-bold text-[14px] mb-1 transition-colors duration-200"
                          style={{ color: isSubActive ? "#f97316" : "var(--foreground)" }}>
                          {item.name}
                        </p>
                        <p className="font-['Outfit',sans-serif] text-[12px] text-muted-foreground leading-snug">{item.desc}</p>

                        {/* Hover arrow */}
                        <div className="absolute bottom-3 right-3 transition-all duration-200 opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0">
                          <ArrowRight size={12} style={{ color: "#f97316" }} />
                        </div>
                      </button>
                    );
                  })}
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* Click-away overlay */}
      {openGroup !== null && (
        <div className="fixed inset-0 z-30" onClick={() => setOpenGroup(null)} />
      )}
    </>
  );
}

// ── Side Dots (grouped) ──────────────────────────────────────────────────────
function SideDots({ active, onDotClick }: { active: number; onDotClick: (i: number) => void }) {
  // Build flat dot list for all sections in page order
  const allDots = SECTION_IDS.map((id) => {
    const group = NAV_GROUPS.find(g => g.sub.some(s => s.id === id));
    const sub = group?.sub.find(s => s.id === id);
    const label = sub?.name ?? (id === "faq" ? "FAQ" : id === "contact" ? "Contact" : id);
    const groupName = group?.label ?? (id === "faq" ? "FAQ" : id === "contact" ? "Contact" : "");
    return { label, group: groupName, id };
  });

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-1">
      {allDots.map((dot, i) => {
        const isAct = active === i;
        const prevDot = allDots[i - 1];
        const isGroupStart = i > 0 && dot.group !== prevDot?.group;
        return (
          <div key={i} className="flex flex-col items-end">
            {isGroupStart && <div className="w-full h-px my-1.5" style={{ background: "rgba(249,115,22,0.15)" }} />}
            <button onClick={() => onDotClick(i)}
              className="group flex items-center gap-2 pr-0 transition-all duration-200">
              {/* Label — only visible for active section */}
              <span className="font-['JetBrains_Mono',monospace] text-[9px] tracking-[0.12em] uppercase whitespace-nowrap transition-all duration-300"
                style={{
                  color: "#f97316",
                  fontWeight: 700,
                  opacity: isAct ? 1 : 0,
                  maxWidth: isAct ? "140px" : "0px",
                  overflow: "hidden",
                }}>
                {dot.label}
              </span>
              {/* Dot */}
              <div className="shrink-0 flex items-center justify-center w-[10px] h-[10px]">
                <div className="rounded-full transition-all duration-300"
                  style={{
                    width: isAct ? 10 : 5,
                    height: isAct ? 10 : 5,
                    background: isAct ? "#f97316" : "var(--border)",
                    boxShadow: isAct ? "0 0 10px rgba(249,115,22,0.55)" : "none",
                  }} />
              </div>
            </button>
          </div>
        );
      })}
    </div>
  );
}

// ── Theme toggle (bottom right) ────────────────────────────────────────────
// ── Scroll progress bar ────────────────────────────────────────────────────
function ScrollProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      setPct(scrollHeight <= clientHeight ? 0 : (scrollTop / (scrollHeight - clientHeight)) * 100);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-0.5 pointer-events-none">
      <div
        className="h-full transition-[width] duration-150 ease-out"
        style={{ width: `${pct}%`, background: "linear-gradient(90deg, #f97316, #f59e0b, #f97316)", backgroundSize: "200% 100%", animation: "shimmer-x 2s linear infinite" }}
      />
    </div>
  );
}

// ── Section flash overlay ──────────────────────────────────────────────────
function SectionFlash({ activeSection }: { activeSection: number }) {
  const [visible, setVisible] = useState(false);
  const prevRef = useRef(activeSection);
  useEffect(() => {
    if (activeSection !== prevRef.current) {
      prevRef.current = activeSection;
      setVisible(true);
      const t = setTimeout(() => setVisible(false), 380);
      return () => clearTimeout(t);
    }
  }, [activeSection]);
  return (
    <div
      className="fixed inset-0 z-[55] pointer-events-none"
      style={{
        background: "linear-gradient(160deg, rgba(249,115,22,0.06) 0%, rgba(245,158,11,0.03) 100%)",
        opacity: visible ? 1 : 0,
        transition: visible ? "opacity 0s" : "opacity 0.38s ease-out",
      }}
    />
  );
}

function ThemeToggle({ dark, setDark }: { dark: boolean; setDark: (v: boolean) => void }) {
  return (
    <button onClick={() => setDark(!dark)}
      className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full border border-border bg-card/90 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-orange-500 hover:border-orange-500 transition-all shadow-lg hover:shadow-orange-500/20"
      title={dark ? "Switch to light mode" : "Switch to dark mode"}>
      {dark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}

// ── Animated Workflow ──────────────────────────────────────────────────────
const WORKFLOW_STEPS = [
  { icon: "🎯", label: "Business Challenge", color: "border-border", textColor: "text-muted-foreground" },
  { icon: "⚙️", label: "Software Engineering", color: "border-orange-500", textColor: "text-orange-400" },
  { icon: "🤖", label: "AI Integration", color: "border-amber-400", textColor: "text-amber-400" },
  { icon: "🔄", label: "Automation", color: "border-orange-400", textColor: "text-orange-300" },
  { icon: "📈", label: "Business Outcomes", color: "border-orange-600", textColor: "text-orange-500" },
];

function AnimatedWorkflow() {
  const [activeStep, setActiveStep] = useState(0);
  const [pulseConnector, setPulseConnector] = useState(-1);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep(prev => {
        const next = (prev + 1) % WORKFLOW_STEPS.length;
        setPulseConnector(prev);
        setTimeout(() => setPulseConnector(-1), 600);
        return next;
      });
    }, 1600);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center gap-0 w-full max-w-sm mx-auto">
      {WORKFLOW_STEPS.map((step, i) => {
        const isActive = activeStep === i;
        const isPast = i < activeStep || (activeStep === 0 && i > 0);
        return (
          <div key={i} className="flex flex-col items-center w-full">
            <div className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl border-2 transition-all duration-500 ${isActive ? `${step.color} shadow-lg` : isPast ? "border-border opacity-40" : "border-border"}`}
              style={isActive ? {
                boxShadow: "0 0 24px 4px rgba(249,115,22,0.18)",
                background: "linear-gradient(135deg, rgba(249,115,22,0.10) 0%, rgba(245,158,11,0.04) 100%)",
                animation: "workflow-glow 1.6s ease-in-out infinite",
              } : { background: "var(--card)" }}>
              <div className={`text-xl w-8 text-center transition-all duration-300 ${isActive ? "scale-125" : "scale-100"}`}>{step.icon}</div>
              <span className={`font-['Outfit',sans-serif] text-sm font-semibold flex-1 transition-colors duration-300 ${isActive ? step.textColor : "text-foreground"}`}>{step.label}</span>
              {isActive && (
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              )}
              {isPast && <Check size={14} className="text-orange-500 shrink-0" />}
            </div>
            {i < WORKFLOW_STEPS.length - 1 && (
              <div className="flex flex-col items-center my-0.5 h-6 relative">
                <div className={`w-px flex-1 transition-all duration-500 ${pulseConnector === i ? "bg-orange-500 shadow-sm shadow-orange-500" : i < activeStep ? "bg-orange-500/40" : "bg-border"}`} />
                <ChevronDown size={10} className={`transition-colors duration-300 ${i < activeStep ? "text-orange-500" : "text-border"}`} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Cycling word ──────────────────────────────────────────────────────────
const CYCLE_WORDS = ["Enterprise Apps.", "AI Automation.", "Scalable Systems.", "Modern Software."];
function CyclingWord() {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const id = setInterval(() => {
      setVisible(false);
      setTimeout(() => { setIdx(i => (i + 1) % CYCLE_WORDS.length); setVisible(true); }, 350);
    }, 2400);
    return () => clearInterval(id);
  }, []);
  return (
    <span style={{
      display: "inline-block", backgroundImage: ORANGE,
      WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
      opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(10px)",
      transition: "opacity 0.35s ease, transform 0.35s ease", minWidth: "8ch",
    }}>{CYCLE_WORDS[idx]}</span>
  );
}

// ── Particle background ───────────────────────────────────────────────────
function ParticleField() {
  const particles = Array.from({ length: 28 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 1 + Math.random() * 2,
    dur: 6 + Math.random() * 10,
    delay: Math.random() * 8,
    dx: (Math.random() - 0.5) * 120,
    dy: (Math.random() - 0.5) * 120,
  }));
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map(p => (
        <div key={p.id} className="absolute rounded-full bg-orange-500"
          style={{
            left: `${p.x}%`, top: `${p.y}%`,
            width: p.size, height: p.size,
            opacity: 0,
            "--dx": `${p.dx}px`, "--dy": `${p.dy}px`,
            animation: `particle-drift ${p.dur}s ease-in-out ${p.delay}s infinite`,
          } as React.CSSProperties} />
      ))}
    </div>
  );
}

// ── Floating badge ────────────────────────────────────────────────────────
function FloatingBadge({ children, className, animClass }: { children: React.ReactNode; className: string; animClass: string }) {
  return (
    <div className={`absolute ${className} ${animClass} z-20`}>
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-card/90 backdrop-blur-md shadow-lg shadow-black/20">
        {children}
      </div>
    </div>
  );
}

// ── Scan line on workflow card ────────────────────────────────────────────
function ScanBeam() {
  return (
    <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
      <div className="absolute left-0 right-0 h-16"
        style={{
          background: "linear-gradient(180deg, transparent 0%, rgba(249,115,22,0.06) 40%, rgba(249,115,22,0.10) 50%, rgba(249,115,22,0.06) 60%, transparent 100%)",
          animation: "scan-line 3.5s ease-in-out infinite",
        }} />
    </div>
  );
}

// ── Stat chip ─────────────────────────────────────────────────────────────
function StatChip({ value, label, delay }: { value: string; label: string; delay: number }) {
  const { ref, inView } = useInView(0.3);
  return (
    <div ref={ref} className="group relative p-4 rounded-2xl border border-border bg-card hover:border-orange-500/40 transition-all duration-300 hover:-translate-y-0.5 cursor-default"
      style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(16px)", transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s, border-color 0.3s` }}>
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: "radial-gradient(circle at 50% 100%, rgba(249,115,22,0.06) 0%, transparent 70%)" }} />
      <div className="font-['Outfit',sans-serif] font-black text-lg leading-none mb-1"
        style={{ backgroundImage: ORANGE, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{value}</div>
      <div className="font-['JetBrains_Mono',monospace] text-[7px] tracking-[1.5px] uppercase text-muted-foreground leading-tight">{label}</div>
    </div>
  );
}

// ── 0. Hero ────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-background">
      <style>{globalStyles}</style>

      {/* ── Background layers ── */}
      {/* Deep radial glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-15%] left-[-10%] w-[70vw] h-[70vw] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(249,115,22,0.11) 0%, transparent 60%)", animation: "glow-pulse 6s ease-in-out infinite" }} />
        <div className="absolute bottom-[-20%] right-[-10%] w-[55vw] h-[55vw] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 60%)", animation: "glow-pulse 8s ease-in-out 2s infinite" }} />
        <div className="absolute top-[40%] left-[45%] w-[30vw] h-[30vw] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(251,146,60,0.05) 0%, transparent 60%)", animation: "glow-pulse 10s ease-in-out 1s infinite" }} />
      </div>

      {/* Dot grid */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle, rgba(249,115,22,0.18) 1px, transparent 1px)", backgroundSize: "40px 40px", opacity: 0.18 }} />

      {/* Diagonal accent lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{ backgroundImage: "repeating-linear-gradient(55deg, #f97316 0px, #f97316 1px, transparent 1px, transparent 90px)" }} />

      {/* Particles */}
      <ParticleField />

      {/* ── Orange horizontal rule near top ── */}
      <div className="absolute top-[72px] left-0 right-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent 0%, rgba(249,115,22,0.2) 20%, rgba(249,115,22,0.35) 50%, rgba(249,115,22,0.2) 80%, transparent 100%)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_440px] gap-12 xl:gap-24 items-center">

          {/* ── LEFT ── */}
          <div>
            {/* Headline */}
            <div className="hero-animate-2 mb-5">
              <h1 className="font-['Outfit',sans-serif] font-black leading-[1.08] tracking-tight text-foreground"
                style={{ fontSize: "clamp(2.4rem, 5vw, 3.8rem)" }}>
                Engineering Intelligent<br />
                Software for{" "}
                <span className="relative inline-block">
                  <GradientText>Modern Businesses.</GradientText>
                  {/* Underline accent */}
                  <span className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full"
                    style={{ background: "linear-gradient(90deg, #f97316, #f59e0b)", opacity: 0.5 }} />
                </span>
              </h1>
            </div>

            {/* Differentiator pills */}
            <div className="hero-animate-4 flex flex-wrap gap-2 mb-7">
              {[
                { emoji: "⚙️", text: "Enterprise Engineering" },
                { emoji: "🤖", text: "AI-Powered Automation" },
                { emoji: "🔐", text: "Security-First" },
                { emoji: "📈", text: "Built to Scale" },
              ].map(({ emoji, text }, i) => (
                <span key={i} className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[12px] font-['Outfit',sans-serif] font-semibold border transition-all duration-300 cursor-default hover:scale-105"
                  style={{ borderColor: "rgba(249,115,22,0.2)", background: "rgba(249,115,22,0.04)", color: "var(--muted-foreground)" }}>
                  <span>{emoji}</span> {text}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="hero-animate-5 flex flex-wrap items-center gap-3">
              <button
                className="group relative flex items-center gap-2 px-7 py-3.5 rounded-full font-['Outfit',sans-serif] font-bold text-white text-[15px] overflow-hidden transition-all hover:scale-105 active:scale-95"
                style={{ background: ORANGE, boxShadow: "0 6px 32px rgba(249,115,22,0.45), 0 0 0 1px rgba(249,115,22,0.2)" }}
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "linear-gradient(160deg, #fb923c 0%, #ea6e00 100%)" }} />
                <span className="relative z-10">{"Let's Build Together"}</span>
                <ArrowRight size={15} className="relative z-10 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                className="flex items-center gap-2 px-7 py-3.5 rounded-full border font-['Outfit',sans-serif] font-semibold text-foreground text-[15px] transition-all hover:scale-105 active:scale-95"
                style={{ borderColor: "var(--border)" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(249,115,22,0.5)"; (e.currentTarget as HTMLElement).style.color = "#f97316"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.color = "var(--foreground)"; }}
                onClick={() => document.getElementById("what-we-do")?.scrollIntoView({ behavior: "smooth" })}>
                Explore Our Work
              </button>
            </div>

            {/* Metric strip */}

          </div>

          {/* ── RIGHT — Pipeline card ── */}
          <div className="hidden lg:block relative">
            {/* Floating badges */}
            <FloatingBadge className="top-[-18px] left-[-44px]" animClass="badge-1">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="font-['JetBrains_Mono',monospace] text-[9px] text-foreground font-bold">99.9% uptime SLA</span>
            </FloatingBadge>
            <FloatingBadge className="top-[68px] right-[-60px]" animClass="badge-2">
              <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse shrink-0" />
              <span className="font-['JetBrains_Mono',monospace] text-[9px] text-foreground font-bold whitespace-nowrap">5+ Projects · 99% On Time · 4+ Clients</span>
            </FloatingBadge>
            <FloatingBadge className="bottom-[88px] right-[-60px]" animClass="badge-3">
              <span>🔐</span>
              <span className="font-['JetBrains_Mono',monospace] text-[9px] text-foreground font-bold">Enterprise-grade security</span>
            </FloatingBadge>
            <FloatingBadge className="bottom-[-16px] left-[16px]" animClass="badge-4">
              <span>📐</span>
              <span className="font-['JetBrains_Mono',monospace] text-[9px] text-foreground font-bold">Custom-built, not templated</span>
            </FloatingBadge>

            {/* Spinning conic halo */}
            <div className="absolute -inset-6 rounded-3xl pointer-events-none"
              style={{ background: "conic-gradient(from 0deg, transparent 60%, rgba(249,115,22,0.22) 78%, rgba(245,158,11,0.15) 86%, transparent 100%)", animation: "border-spin 10s linear infinite" }} />

            {/* Card */}
            <div className="relative rounded-2xl border overflow-hidden"
              style={{ borderColor: "rgba(249,115,22,0.15)", background: "linear-gradient(160deg, var(--card) 0%, rgba(249,115,22,0.03) 100%)", boxShadow: "0 40px 100px rgba(0,0,0,0.22), 0 0 0 1px rgba(249,115,22,0.08), inset 0 1px 0 rgba(255,255,255,0.05)" }}>
              <ScanBeam />

              {/* Window chrome */}
              <div className="flex items-center justify-between px-5 py-3.5 border-b" style={{ borderColor: "var(--border)" }}>
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(239,68,68,0.6)" }} />
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(234,179,8,0.6)" }} />
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(34,197,94,0.6)" }} />
                  </div>
                  <span className="font-['JetBrains_Mono',monospace] text-[10px] tracking-widest text-muted-foreground">askjuno.engineering.live</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="font-['JetBrains_Mono',monospace] text-[9px] text-green-400 tracking-wider font-bold">ACTIVE</span>
                </div>
              </div>

              {/* Animated workflow */}
              <div className="px-6 py-7">
                <AnimatedWorkflow />
              </div>

              {/* Footer */}
              <div className="px-5 py-3.5 border-t flex items-center justify-between" style={{ borderColor: "var(--border)", background: "rgba(249,115,22,0.02)" }}>
                <div className="flex items-center gap-5">
                  {[["Projects", "5+"], ["On-Time", "99%"], ["Clients", "4+"]].map(([k, v]) => (
                    <div key={k}>
                      <div className="font-['JetBrains_Mono',monospace] text-[8px] text-muted-foreground uppercase tracking-widest">{k}</div>
                      <div className="font-['Outfit',sans-serif] text-[13px] font-black text-foreground">{v}</div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-1 h-1 rounded-full bg-orange-500 animate-ping" />
                  <span className="font-['JetBrains_Mono',monospace] text-[9px] text-orange-500 tracking-wider font-bold">LIVE</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, var(--background))" }} />
    </section>
  );
}

// ── 0b. About Us ─────────────────────────────────────────────────────────────
function AboutUsSection() {
  const VALUE_CARDS = [
    {
      title: "Business-Led",
      desc: "Solve the problem first.",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      ),
    },
    {
      title: "Enterprise-Ready",
      desc: "Built to scale securely.",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
    },
    {
      title: "AI-Powered",
      desc: "Intelligence with purpose.",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      ),
    },
    {
      title: "End-to-End",
      desc: "From idea to deployment.",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      ),
    },
  ];

  return (
    <section id="about" className="pt-14 pb-11 sm:pt-[68px] sm:pb-12 lg:pt-[80px] lg:pb-[48px] bg-background relative overflow-hidden flex flex-col justify-center transition-colors duration-200">
      {/* Background ambient accents */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{ backgroundImage: "radial-gradient(circle, #f97316 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] opacity-[0.04] dark:opacity-[0.06] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, #f97316 0%, transparent 70%)" }} />

      <div className="max-w-[1320px] mx-auto px-6 relative z-10 w-full">
        {/* Top Eyebrow: ABOUT ASKJUNO */}
        <FadeIn delay={0.05} className="mb-3.5 sm:mb-4">
          <p className="font-['JetBrains_Mono',monospace] text-[11.5px] sm:text-[12.5px] uppercase font-semibold text-[#f97316] tracking-[0.2em]">
            ABOUT ASKJUNO
          </p>
        </FadeIn>

        {/* Main Heading: We Build What Your Business Needs. */}
        <FadeIn delay={0.1} className="mb-4.5 sm:mb-5">
          <h2 className="font-['Outfit',sans-serif] font-bold text-[34px] sm:text-[42px] lg:text-[50px] xl:text-[52px] leading-[1.08] -tracking-[0.025em] max-w-[680px] text-stone-900 dark:text-white">
            We Build What Your<br />
            <span className="text-[#f97316]">Business Needs.</span>
          </h2>
        </FadeIn>

        {/* Large Feature Card */}
        <FadeIn delay={0.2} className="w-full">
          <div className="w-full rounded-[18px] sm:rounded-[20px] border border-border bg-card p-5 sm:p-7 lg:p-8 shadow-sm relative overflow-hidden">
            {/* 3.5px subtle orange accent line on the left side */}
            <div className="absolute top-0 left-0 bottom-0 w-[3.5px] bg-[#f97316]" />

            <div className="flex flex-col items-start text-left pl-1 sm:pl-1.5">
              <h3 className="font-['Outfit',sans-serif] text-[22px] sm:text-[24px] lg:text-[26px] font-bold text-stone-900 dark:text-white leading-tight">
                Not just software.
              </h3>
              <p className="font-['Outfit',sans-serif] text-[19px] sm:text-[21px] lg:text-[22px] font-semibold text-[#f97316] leading-snug mt-1.5 mb-3 sm:mb-3.5">
                Technology designed around the way you work.
              </p>
              <p className="font-['Outfit',sans-serif] text-stone-600 dark:text-stone-300 text-[15px] sm:text-[16px] leading-relaxed max-w-[820px]">
                AskJuno combines software engineering, AI, cloud, and data to solve complex business problems — from modernizing legacy systems to automating everyday operations.
              </p>
              <div className="w-full border-t border-border/60 my-4 sm:my-5" />
              <p className="font-['Outfit',sans-serif] text-[14.5px] sm:text-[15.5px] font-semibold text-stone-900 dark:text-stone-100 flex items-center">
                <span className="w-2 h-2 rounded-full bg-[#f97316] inline-block mr-2.5 flex-shrink-0" />
                We build technology that is simple to use, ready to scale, and built to last.
              </p>
            </div>
          </div>
        </FadeIn>

        {/* WHY ASKJUNO? Eyebrow */}
        <FadeIn delay={0.25} className="mt-14 sm:mt-16 mb-4.5 sm:mb-5">
          <p className="font-['JetBrains_Mono',monospace] text-[11.5px] sm:text-[12.5px] uppercase font-semibold text-[#f97316] tracking-[0.2em]">
            Core Values
          </p>
        </FadeIn>

        {/* Four Value Cards (1 horizontal row on desktop, 2x2 on tablet, stacked on mobile) */}
        <FadeIn delay={0.3} className="w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-4.5 w-full">
            {VALUE_CARDS.map((card, i) => (
              <div
                key={i}
                className="rounded-[16px] sm:rounded-[18px] border border-border bg-card p-5 sm:p-5.5 lg:p-6 min-h-[140px] sm:min-h-[150px] shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#f97316]/50 flex flex-col justify-start text-left group"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center bg-orange-500/10 border border-orange-500/20 text-[#f97316] mb-3.5 sm:mb-4 group-hover:bg-orange-500/20 transition-colors flex-shrink-0">
                  {card.icon}
                </div>
                <h4 className="font-['Outfit',sans-serif] text-[17px] sm:text-[18px] font-bold text-stone-900 dark:text-white mb-1.5 group-hover:text-[#f97316] transition-colors">
                  {card.title}
                </h4>
                <p className="font-['Outfit',sans-serif] text-[13.5px] sm:text-[14px] text-stone-600 dark:text-stone-400 leading-relaxed">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Brand Strip (Final element of About Us) */}
        <FadeIn delay={0.35} className="mt-11 sm:mt-12 w-full">
          <div className="w-full rounded-[14px] sm:rounded-[16px] border border-border bg-card px-5 py-4 sm:px-7 sm:py-4.5 lg:px-8 lg:py-4.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="font-['JetBrains_Mono',monospace] text-[12px] sm:text-[13px] uppercase font-semibold text-stone-800 dark:text-stone-200 tracking-[0.08em] sm:tracking-[0.1em]">
                Specialize In : ENTERPRISE SOFTWARE · AI · PLATFORM ENGINEERING
              </span>
            </div>
            <div className="flex items-center">
              <span className="font-['Outfit',sans-serif] text-[13px] sm:text-[14px] font-medium text-stone-700 dark:text-stone-300">
                Built in India · <span className="text-[#f97316] font-semibold">Engineered for the World.</span>
              </span>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ── 1. What We Do ──────────────────────────────────────────────────────────
const SERVICE_CARDS = [
  {
    id: "ai",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="3" y="3" width="10" height="10" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
        <rect x="15" y="3" width="10" height="10" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
        <rect x="3" y="15" width="10" height="10" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="20" cy="20" r="4.5" stroke="currentColor" strokeWidth="1.6" />
        <path d="M20 17.5v5M17.5 20h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "AI Solutions",
    desc: "Build intelligent applications, AI agents, and automation workflows that streamline operations, accelerate decision-making, and unlock new efficiencies.",
    caps: ["AI Agents", "Workflow Automation", "Generative AI", "Document Intelligence", "Custom AI Integrations"],
    accent: "#f97316",
    tag: "Most Popular",
  },
  {
    id: "product",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="3" y="6" width="22" height="16" rx="3" stroke="currentColor" strokeWidth="1.6" />
        <path d="M9 22v2M19 22v2M6 24h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M9 13l3 3 7-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Product Engineering",
    desc: "Design and develop scalable digital products from concept to launch, with a focus on performance, security, and user experience.",
    caps: ["SaaS Development", "Product Design", "Web Applications", "Mobile Applications", "API Development"],
    accent: "#f59e0b",
    tag: null,
  },
  {
    id: "enterprise",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 3L25 8.5v11L14 25 3 19.5v-11L14 3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M14 3v22M3 8.5l11 5.5 11-5.5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    ),
    title: "Enterprise Software",
    desc: "Modernize and extend enterprise systems with secure, scalable software that integrates seamlessly with your business.",
    caps: ["ERP & CRM Solutions", "System Integration", "Legacy Modernization", "Business Applications", "Cloud Migration"],
    accent: "#fb923c",
    tag: null,
  },
  {
    id: "data",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M4 22l6-7 5 4 5-8 4 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="3" y="3" width="22" height="22" rx="3" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    ),
    title: "Data & Intelligence",
    desc: "Transform business data into actionable insights through analytics, dashboards, and intelligent reporting solutions.",
    caps: ["Business Intelligence", "Analytics Dashboards", "Data Engineering", "Reporting Automation", "Decision Support"],
    accent: "#f97316",
    tag: null,
  },
];

function WhatWeDoSection() {
  const [active, setActive] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % SERVICE_CARDS.length);
    }, 10000);
  }, []);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  const handleTabClick = (i: number) => {
    setActive(i);
    startTimer();
  };

  const card = SERVICE_CARDS[active];

  return (
    <section id="what-we-do" className="min-h-screen py-16 bg-background relative overflow-hidden flex flex-col justify-center">
      {/* Background layers */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-[0.05]"
          style={{ background: "radial-gradient(circle, #f97316 0%, transparent 60%)", animation: "glow-pulse 6s ease-in-out infinite" }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-[0.03]"
          style={{ background: "radial-gradient(circle, #f59e0b 0%, transparent 60%)", animation: "glow-pulse 8s ease-in-out 2s infinite" }} />
        <div className="absolute inset-0 opacity-[0.018]"
          style={{ backgroundImage: "radial-gradient(circle, #f97316 1px, transparent 1px)", backgroundSize: "44px 44px" }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-end mb-5">
          <FadeIn>
            <SectionLabel group="What We Build">What We Do</SectionLabel>
            <SectionHeading>
              Solutions That<br />
              <GradientText>Power Modern Business.</GradientText>
            </SectionHeading>
          </FadeIn>
          <FadeIn delay={0.12}>
            <p className="font-['Outfit',sans-serif] text-muted-foreground text-sm leading-[1.6]">
              {"Whether you're"} building a new digital product, modernizing legacy systems, or integrating AI into your operations, we deliver end-to-end engineering solutions designed for long-term business impact.
            </p>
          </FadeIn>
        </div>

        {/* Interactive split layout */}
        <FadeIn delay={0.1}>
          <div className="rounded-3xl border border-border overflow-hidden shadow-2xl shadow-black/10"
            style={{ background: "var(--card)" }}>
            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr]">

              {/* Left tab rail */}
              <div className="border-b lg:border-b-0 lg:border-r border-border relative">
                {/* Active indicator track */}
                <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-px bg-border" />

                <div className="p-4 lg:p-6">
                  <p className="font-['JetBrains_Mono',monospace] text-[9px] tracking-[2px] uppercase text-muted-foreground mb-4 px-2">Service Areas</p>
                  <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0" style={{ scrollbarWidth: "none" }}>
                    {SERVICE_CARDS.map((sc, i) => {
                      const isTab = active === i;
                      return (
                        <button
                          key={i}
                          onClick={() => handleTabClick(i)}
                          className="shrink-0 lg:w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden"
                          style={{
                            background: isTab ? `${sc.accent}14` : "transparent",
                            border: isTab ? `1px solid ${sc.accent}35` : "1px solid transparent",
                          }}>
                          {/* Active left pip */}
                          <div className="hidden lg:block absolute left-0 top-3 bottom-3 w-0.5 rounded-full transition-all duration-300"
                            style={{ background: sc.accent, opacity: isTab ? 1 : 0 }} />
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300"
                            style={{
                              color: isTab ? sc.accent : "var(--muted-foreground)",
                              background: isTab ? `${sc.accent}15` : "transparent",
                            }}>
                            {sc.icon}
                          </div>
                          <span className="font-['Outfit',sans-serif] text-sm font-semibold transition-colors duration-300 whitespace-nowrap lg:whitespace-normal"
                            style={{ color: isTab ? sc.accent : "var(--foreground)" }}>
                            {sc.title}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right content panel */}
              <div className="p-5 lg:p-12 relative overflow-hidden">
                {/* Panel glow */}
                <div className="absolute top-0 right-0 w-72 h-72 rounded-full pointer-events-none transition-all duration-700"
                  style={{ background: `radial-gradient(circle, ${card.accent}0e 0%, transparent 60%)` }} />

                {/* Top bar */}
                <div className="absolute top-0 inset-x-0 h-[2px] transition-colors duration-500"
                  style={{ background: `linear-gradient(90deg, ${card.accent}, ${card.accent}00)` }} />

                <div className="relative z-10">
                  {/* Icon + heading */}
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center border shrink-0 transition-all duration-500"
                      style={{ color: card.accent, background: `${card.accent}12`, borderColor: `${card.accent}30` }}>
                      <div style={{ transform: "scale(1.3)" }}>{card.icon}</div>
                    </div>
                    <div>
                      {card.tag && (
                        <span className="inline-block mb-2 font-['JetBrains_Mono',monospace] text-[9px] tracking-widest uppercase text-white px-2.5 py-1 rounded-full"
                          style={{ background: card.accent }}>
                          {card.tag}
                        </span>
                      )}
                      <h3 className="font-['Outfit',sans-serif] font-black text-2xl text-foreground transition-colors duration-500"
                        style={{ color: card.accent }}>
                        {card.title}
                      </h3>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="font-['Outfit',sans-serif] text-muted-foreground text-sm leading-[1.6] mb-5 max-w-lg">
                    {card.desc}
                  </p>

                  {/* Capabilities grid */}
                  <div className="mb-5">
                    <p className="font-['JetBrains_Mono',monospace] text-[9px] tracking-[2px] uppercase text-muted-foreground mb-4">Capabilities</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {card.caps.map((cap, j) => (
                        <div key={j} className="flex items-center gap-3 px-4 py-2.5 rounded-xl border transition-all duration-300"
                          style={{ borderColor: `${card.accent}25`, background: `${card.accent}08` }}>
                          <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: card.accent }} />
                          <span className="font-['Outfit',sans-serif] text-sm font-medium text-foreground">{cap}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Learn More */}
                  <button
                    onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                    className="group/learn flex items-center gap-2 font-['Outfit',sans-serif] font-bold text-sm transition-all"
                    style={{ color: card.accent }}>
                    <span className="border-b-2 pb-0.5 transition-all duration-300"
                      style={{ borderColor: `${card.accent}55` }}>
                      Learn More
                    </span>
                    <ArrowRight size={14} className="transition-transform duration-300 group-hover/learn:translate-x-1" />
                  </button>
                </div>

                {/* Dot counter */}
                <div className="absolute bottom-8 right-8 flex gap-2">
                  {SERVICE_CARDS.map((_, i) => (
                    <button key={i} onClick={() => handleTabClick(i)}
                      className="rounded-full transition-all duration-300"
                      style={{
                        width: active === i ? 20 : 6,
                        height: 6,
                        background: active === i ? card.accent : "var(--border)",
                      }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ── 2. Industries ──────────────────────────────────────────────────────────
const INDUSTRIES = [
  {
    id: "manufacturing",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="3" y="14" width="6" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.7" />
        <rect x="11" y="9" width="6" height="16" rx="1.5" stroke="currentColor" strokeWidth="1.7" />
        <rect x="19" y="4" width="6" height="21" rx="1.5" stroke="currentColor" strokeWidth="1.7" />
        <path d="M3 25h22" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    ),
    name: "Manufacturing",
    desc: "Modernize production, inventory, quality control, and operational workflows with intelligent software that improves visibility and efficiency across the factory floor.",
    challenges: ["Lack of real-time production visibility", "Manual quality control processes", "Disconnected ERP and shop floor systems"],
    solutions: ["Manufacturing Execution Systems", "Inventory Management", "Production Planning", "Quality Control", "Operational Dashboards"],
    outcomes: ["30% reduction in downtime", "Improved inventory accuracy", "Real-time floor visibility"],
  },
  {
    id: "healthcare",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="3" y="3" width="22" height="22" rx="4" stroke="currentColor" strokeWidth="1.7" />
        <path d="M14 9v10M9 14h10" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
      </svg>
    ),
    name: "Healthcare & Pharma",
    desc: "Build secure, compliant solutions that streamline operations, automate document-intensive workflows, and improve decision-making across healthcare organizations and pharmaceutical businesses.",
    challenges: ["Document-heavy manual workflows", "Compliance and regulatory requirements", "Siloed patient and operational data"],
    solutions: ["Healthcare Applications", "Pharma Operations", "Document Intelligence", "Compliance Workflows", "Data Automation"],
    outcomes: ["Faster regulatory submissions", "Reduced manual documentation by 60%", "HIPAA-compliant architecture"],
  },
  {
    id: "retail",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M4 4h3l2.5 12h11L23 8H8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="11" cy="23" r="1.5" stroke="currentColor" strokeWidth="1.7" />
        <circle cx="20" cy="23" r="1.5" stroke="currentColor" strokeWidth="1.7" />
      </svg>
    ),
    name: "Retail & Distribution",
    desc: "Connect inventory, sales, logistics, and customer operations through scalable platforms that support omnichannel growth and smarter business decisions.",
    challenges: ["Fragmented inventory across channels", "Poor supply chain visibility", "Disconnected customer data"],
    solutions: ["Retail Platforms", "Supply Chain Visibility", "Order Management", "Inventory Intelligence", "Business Analytics"],
    outcomes: ["Unified omnichannel inventory", "Faster order fulfilment", "Higher customer retention"],
  },
  {
    id: "finance",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="3" y="6" width="22" height="17" rx="3" stroke="currentColor" strokeWidth="1.7" />
        <path d="M3 11h22" stroke="currentColor" strokeWidth="1.7" />
        <path d="M8 16h4M18 16h2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    ),
    name: "Financial Services",
    desc: "Develop secure, scalable applications that simplify financial operations, automate workflows, and strengthen data governance while maintaining compliance.",
    challenges: ["Manual reporting and reconciliation", "Regulatory compliance complexity", "Legacy system integration gaps"],
    solutions: ["Financial Workflows", "Secure Portals", "Reporting Automation", "Document Processing", "Analytics"],
    outcomes: ["90% faster report generation", "Audit-ready data pipelines", "Reduced compliance risk"],
  },
  {
    id: "logistics",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M3 18h14V7a1 1 0 00-1-1H4a1 1 0 00-1 1v11z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
        <path d="M17 11h4l4 5v2h-8V11z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
        <circle cx="7.5" cy="21" r="2" stroke="currentColor" strokeWidth="1.7" />
        <circle cx="21.5" cy="21" r="2" stroke="currentColor" strokeWidth="1.7" />
      </svg>
    ),
    name: "Logistics & Supply Chain",
    desc: "Optimize transportation, warehouse operations, and supply chain visibility with software that improves coordination and operational efficiency.",
    challenges: ["Limited real-time shipment visibility", "Inefficient route and resource planning", "Manual warehouse coordination"],
    solutions: ["Fleet Management", "Warehouse Solutions", "Shipment Tracking", "Route Optimization", "Logistics Analytics"],
    outcomes: ["20% reduction in logistics costs", "Real-time delivery visibility", "Improved warehouse throughput"],
  },
  {
    id: "saas",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M9 20a6 6 0 110-12 6 6 0 010 12z" stroke="currentColor" strokeWidth="1.7" />
        <path d="M22 10a4 4 0 010 8H17" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M6 15l3 3 3-3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    name: "Enterprise SaaS",
    desc: "Partner with startups and enterprises to design, develop, and scale modern SaaS products — from MVP to enterprise-grade platforms built for growth.",
    challenges: ["Scaling beyond MVP without technical debt", "Multi-tenant architecture complexity", "Subscription and billing infrastructure"],
    solutions: ["SaaS Platforms", "Multi-Tenant Architecture", "Subscription Systems", "API Ecosystems", "Cloud Infrastructure"],
    outcomes: ["Faster time-to-market", "99.9% uptime SLAs", "Scalable from 10 to 10,000 users"],
  },
];

function IndustriesSection() {
  const [active, setActive] = useState(0);
  const ind = INDUSTRIES[active];

  return (
    <section id="industries" className="min-h-screen py-16 bg-background relative overflow-hidden flex flex-col justify-center">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.018]"
          style={{ backgroundImage: "radial-gradient(circle, #f97316 1px, transparent 1px)", backgroundSize: "44px 44px" }} />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] opacity-[0.05] rounded-full"
          style={{ background: "radial-gradient(circle, #f97316 0%, transparent 65%)", animation: "glow-pulse 7s ease-in-out infinite" }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end mb-3">
          <FadeIn>
            <SectionLabel group="Where We Create Impact">Industries We Transform</SectionLabel>
            <SectionHeading>
              Built for the Way Your<br />
              <GradientText>Industry Operates.</GradientText>
            </SectionHeading>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="font-['Outfit',sans-serif] text-muted-foreground leading-[1.65] text-[15px]">
              Every industry has its own workflows, regulations, and operational challenges. We combine engineering expertise with domain knowledge to build software that fits the way your business works — not the other way around.
            </p>
          </FadeIn>
        </div>

        <FadeIn delay={0.1}>
          {/* Tab strip */}
          <div className="flex flex-wrap gap-2 mb-5">
            {INDUSTRIES.map((ind, i) => {
              const isAct = active === i;
              return (
                <button key={i} onClick={() => setActive(i)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full border font-['Outfit',sans-serif] text-sm font-semibold transition-all duration-300"
                  style={{
                    background: isAct ? "linear-gradient(135deg,#f97316,#f59e0b)" : "var(--card)",
                    borderColor: isAct ? "transparent" : "var(--border)",
                    color: isAct ? "#fff" : "var(--muted-foreground)",
                    boxShadow: isAct ? "0 4px 16px rgba(249,115,22,0.3)" : "none",
                  }}>
                  <span style={{ filter: isAct ? "brightness(10)" : "none", transition: "filter 0.3s" }}>
                    {/* tiny inline icon */}
                    <svg width="14" height="14" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      {ind.icon.props.children}
                    </svg>
                  </span>
                  {ind.name}
                </button>
              );
            })}
          </div>

          {/* Content panel */}
          <div key={active} className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4"
            style={{ animation: "hero-in 0.35s ease both" }}>

            {/* Left: main info */}
            <div className="rounded-3xl border overflow-hidden"
              style={{ borderColor: "rgba(249,115,22,0.2)", background: "var(--card)", boxShadow: "0 16px 48px rgba(249,115,22,0.08)" }}>
              {/* Top accent */}
              <div className="h-[3px]" style={{ background: "linear-gradient(90deg,#f97316,#f59e0b)" }} />

              <div className="p-5 lg:p-10">
                {/* Industry header */}
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center border shrink-0"
                    style={{ color: "#f97316", background: "rgba(249,115,22,0.1)", borderColor: "rgba(249,115,22,0.25)" }}>
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                      {ind.icon.props.children}
                    </svg>
                  </div>
                  <div>
                    <p className="font-['JetBrains_Mono',monospace] text-[9px] tracking-[2px] uppercase text-muted-foreground mb-1">Industry Focus</p>
                    <h3 className="font-['Outfit',sans-serif] font-black text-2xl"
                      style={{ backgroundImage: "linear-gradient(135deg,#f97316,#f59e0b)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                      {ind.name}
                    </h3>
                  </div>
                </div>

                <p className="font-['Outfit',sans-serif] text-muted-foreground text-sm leading-[1.65] mb-5">
                  {ind.desc}
                </p>

                {/* Two-col: challenges + solutions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Key Challenges */}
                  <div>
                    <p className="font-['JetBrains_Mono',monospace] text-[9px] tracking-[2px] uppercase text-muted-foreground mb-3">Key Challenges</p>
                    <div className="flex flex-col gap-2">
                      {ind.challenges.map((c, j) => (
                        <div key={j} className="flex items-start gap-2.5 px-4 py-2.5 rounded-xl border"
                          style={{ borderColor: "var(--border)", background: "rgba(249,115,22,0.04)" }}>
                          <div className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5" style={{ background: "#f97316" }} />
                          <span className="font-['Outfit',sans-serif] text-sm text-foreground leading-snug">{c}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Solutions */}
                  <div>
                    <p className="font-['JetBrains_Mono',monospace] text-[9px] tracking-[2px] uppercase text-muted-foreground mb-3">Solutions We Build</p>
                    <div className="flex flex-col gap-2">
                      {ind.solutions.map((s, j) => (
                        <div key={j} className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border transition-all duration-200 hover:border-orange-500/40 group"
                          style={{ borderColor: "var(--border)", background: "var(--card)" }}>
                          <Check size={13} className="shrink-0 text-orange-500" />
                          <span className="font-['Outfit',sans-serif] text-sm text-foreground font-medium">{s}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: outcomes + nav */}
            <div className="flex flex-col gap-4">
              {/* Business Outcomes */}
              <div className="rounded-2xl border p-6 flex-1"
                style={{ borderColor: "rgba(249,115,22,0.18)", background: "linear-gradient(135deg, rgba(249,115,22,0.06) 0%, var(--card) 60%)" }}>
                <p className="font-['JetBrains_Mono',monospace] text-[9px] tracking-[2px] uppercase text-muted-foreground mb-4">Business Outcomes</p>
                <div className="flex flex-col gap-3">
                  {ind.outcomes.map((o, j) => (
                    <div key={j} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                        style={{ background: "rgba(249,115,22,0.12)", border: "1px solid rgba(249,115,22,0.25)" }}>
                        <span className="font-['JetBrains_Mono',monospace] text-[8px] font-bold" style={{ color: "#f97316" }}>0{j + 1}</span>
                      </div>
                      <span className="font-['Outfit',sans-serif] text-sm text-foreground leading-snug font-medium">{o}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Industry switcher arrows */}
              <div className="rounded-2xl border p-5 flex items-center justify-between gap-3"
                style={{ borderColor: "var(--border)", background: "var(--card)" }}>
                <button onClick={() => setActive((active - 1 + INDUSTRIES.length) % INDUSTRIES.length)}
                  className="flex items-center gap-1.5 font-['Outfit',sans-serif] text-sm font-semibold text-muted-foreground hover:text-orange-500 transition-colors">
                  <ChevronLeft size={15} /> Prev
                </button>
                <div className="flex gap-1.5">
                  {INDUSTRIES.map((_, i) => (
                    <button key={i} onClick={() => setActive(i)}
                      className="rounded-full transition-all duration-300"
                      style={{ width: i === active ? 18 : 6, height: 6, background: i === active ? "#f97316" : "var(--border)" }} />
                  ))}
                </div>
                <button onClick={() => setActive((active + 1) % INDUSTRIES.length)}
                  className="flex items-center gap-1.5 font-['Outfit',sans-serif] text-sm font-semibold text-muted-foreground hover:text-orange-500 transition-colors">
                  Next <ChevronRight size={15} />
                </button>
              </div>

              {/* CTA */}
              <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="w-full py-3 rounded-2xl font-['Outfit',sans-serif] font-bold text-sm text-white transition-all hover:scale-[1.02] active:scale-95"
                style={{ background: "linear-gradient(135deg,#f97316,#f59e0b)", boxShadow: "0 4px 20px rgba(249,115,22,0.3)" }}>
                Discuss Your {ind.name} Project
              </button>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ── 3. How We Build ────────────────────────────────────────────────────────
const BUILD_STEPS = [
  {
    label: "Discover",
    phase: "01 — Discover",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="13" cy="13" r="8" stroke="currentColor" strokeWidth="1.8" />
        <path d="M19 19l4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M10 13h6M13 10v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    desc: "We begin by understanding your business, users, goals, and technical landscape. Through collaborative workshops and technical assessments, we define the right problem before building the solution.",
    detail: ["Business Discovery", "Requirements Analysis", "Technical Assessment", "Solution Roadmap"],
  },
  {
    label: "Design",
    phase: "02 — Design",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M5 22l4-4m0 0l9-9a3 3 0 00-4-4L5 14l4 4z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 7l4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    desc: "We translate ideas into intuitive user experiences and scalable system architectures, ensuring every decision supports long-term growth and maintainability.",
    detail: ["UX/UI Design", "System Architecture", "Technical Planning", "Prototyping"],
  },
  {
    label: "Develop",
    phase: "03 — Develop",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M9 10l-4 4 4 4M19 10l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15 8l-2 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    desc: "Using agile methodologies and modern engineering practices, we build secure, high-performance applications with transparency and continuous feedback throughout.",
    detail: ["Agile Development", "API Integration", "Quality Assurance", "Continuous Testing"],
  },
  {
    label: "Deploy",
    phase: "04 — Deploy",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 4v14M14 4l-4 4M14 4l4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6 18v3a1 1 0 001 1h14a1 1 0 001-1v-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    desc: "We ensure a smooth, secure rollout with cloud-native deployment, performance optimization, and comprehensive testing before launch. On time, every time.",
    detail: ["Cloud Deployment", "Performance Optimization", "Security Validation", "Go-Live Support"],
  },
  {
    label: "Evolve",
    phase: "05 — Evolve",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M4 14a10 10 0 0117.3-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M24 14a10 10 0 01-17.3 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M21 4l.3 3.3L18 8M7 24l-.3-3.3L10 20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    desc: "Software is never finished. We continuously monitor, optimize, and enhance your solution to meet evolving business needs — staying your partner long after launch.",
    detail: ["Monitoring & Support", "Feature Enhancements", "Performance Tuning", "Continuous Innovation"],
  },
];

function HowWeBuildSection() {
  const [active, setActive] = useState(0);
  const [descKey, setDescKey] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((i: number) => {
    setActive(i);
    setDescKey(k => k + 1);
  }, []);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActive(prev => {
        const next = (prev + 1) % BUILD_STEPS.length;
        setDescKey(k => k + 1);
        return next;
      });
    }, 3000);
  }, []);

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [startTimer]);

  // Full-circle donut geometry — rotates counterclockwise each step
  const CX = 160, CY = 160, RO = 148, RI = 68;
  const COLS = ["#f97316", "#f8872a", "#f59e0b", "#eb970f", "#d97706"];
  const rotDeg = -active * 72; // counterclockwise

  const toRad = (d: number) => (d * Math.PI) / 180;

  // Annular sector path for segment i (each 72°, gap 3°)
  const segPath = (i: number) => {
    const gap = 3;
    const s = i * 72 - 36 + gap / 2 - 90;
    const e = i * 72 + 36 - gap / 2 - 90;
    const [ox1, oy1] = [CX + RO * Math.cos(toRad(s)), CY + RO * Math.sin(toRad(s))];
    const [ox2, oy2] = [CX + RO * Math.cos(toRad(e)), CY + RO * Math.sin(toRad(e))];
    const [ix1, iy1] = [CX + RI * Math.cos(toRad(s)), CY + RI * Math.sin(toRad(s))];
    const [ix2, iy2] = [CX + RI * Math.cos(toRad(e)), CY + RI * Math.sin(toRad(e))];
    return `M${ox1},${oy1} A${RO},${RO} 0 0,1 ${ox2},${oy2} L${ix2},${iy2} A${RI},${RI} 0 0,0 ${ix1},${iy1}Z`;
  };

  // Icon centre position (before rotation)
  const iconPos = (i: number): [number, number] => {
    const mid = i * 72 - 90;
    const r = (RO + RI) / 2;
    return [CX + r * Math.cos(toRad(mid)), CY + r * Math.sin(toRad(mid))];
  };

  const step = BUILD_STEPS[active];
  const activeCol = COLS[active];

  return (
    <section id="how-we-build" className="min-h-screen py-16 relative overflow-hidden flex flex-col justify-center" style={{ background: "var(--secondary)" }}>
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.018]"
          style={{ backgroundImage: "radial-gradient(circle, #f97316 1px, transparent 1px)", backgroundSize: "44px 44px" }} />
        <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-[0.05]"
          style={{ background: `radial-gradient(circle, ${activeCol} 0%, transparent 60%)`, transition: "background 0.6s", animation: "glow-pulse 6s ease-in-out infinite" }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end mb-5">
          <FadeIn>
            <SectionLabel group="How We Build">How We Build</SectionLabel>
            <SectionHeading>From Vision<br /><GradientText>to Value.</GradientText></SectionHeading>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="font-['Outfit',sans-serif] text-muted-foreground text-sm leading-[1.65]">
              Every successful product starts with understanding the business behind it. Our engineering approach combines strategic thinking, agile execution, and continuous collaboration to deliver software that creates measurable impact.
            </p>
          </FadeIn>
        </div>

        <FadeIn delay={0.1}>
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-4">

            {/* ── Rotating wheel ── */}
            <div className="shrink-0 relative w-[260px] h-[260px]">

              {/* Fixed top pointer */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-3 z-20 flex flex-col items-center gap-1">
                <div className="w-0 h-0" style={{ borderLeft: "6px solid transparent", borderRight: "6px solid transparent", borderTop: `10px solid ${activeCol}`, transition: "border-top-color 0.5s" }} />
                <div className="w-px h-3" style={{ background: activeCol, transition: "background 0.5s" }} />
              </div>

              {/* Outer decorative ring */}
              <svg className="absolute inset-0" width="260" height="260" viewBox="0 0 320 320">
                <circle cx="160" cy="160" r="155" fill="none" stroke="var(--border)" strokeWidth="1" strokeDasharray="4 6" />
                {/* Tick marks at each 72° */}
                {[0, 1, 2, 3, 4].map(i => {
                  const a = i * 72 - 90;
                  const x1 = 160 + 155 * Math.cos(toRad(a)), y1 = 160 + 155 * Math.sin(toRad(a));
                  const x2 = 160 + 148 * Math.cos(toRad(a)), y2 = 160 + 148 * Math.sin(toRad(a));
                  return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--border)" strokeWidth="2" />;
                })}
              </svg>

              {/* Rotating SVG donut */}
              <svg width="260" height="260" viewBox="0 0 320 320" style={{ position: "absolute", inset: 0 }}>
                <defs>
                  {COLS.map((c, i) => (
                    <radialGradient key={i} id={`hwg${i}`} cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor={c} stopOpacity="1" />
                      <stop offset="100%" stopColor={c} stopOpacity="0.72" />
                    </radialGradient>
                  ))}
                  <filter id="hwGlow" x="-40%" y="-40%" width="180%" height="180%">
                    <feDropShadow dx="0" dy="0" stdDeviation="10" floodColor={activeCol} floodOpacity="0.5" result="shadow" />
                    <feMerge><feMergeNode in="shadow" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                </defs>

                {/* All segments — rotating group */}
                <g style={{
                  transform: `rotate(${rotDeg}deg)`,
                  transformOrigin: `${CX}px ${CY}px`,
                  transition: "transform 0.65s cubic-bezier(0.4,0,0.2,1)",
                }}>
                  {BUILD_STEPS.map((s, i) => {
                    const isAct = i === active;
                    const [ix, iy] = iconPos(i);
                    return (
                      <g key={i} onClick={() => { goTo(i); startTimer(); }} style={{ cursor: "pointer" }}>
                        {/* Segment */}
                        <path
                          d={segPath(i)}
                          fill={`url(#hwg${i})`}
                          filter={isAct ? "url(#hwGlow)" : undefined}
                          opacity={isAct ? 1 : 0.22}
                          style={{ transition: "opacity 0.5s ease" }}
                        />
                        {/* White inner edge on active */}
                        {isAct && <path d={segPath(i)} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />}
                        {/* Counter-rotated icon — stays upright */}
                        <g style={{
                          transform: `rotate(${-rotDeg}deg)`,
                          transformOrigin: `${ix}px ${iy}px`,
                          transition: "transform 0.65s cubic-bezier(0.4,0,0.2,1)",
                        }}>
                          <svg x={ix - 13} y={iy - 13} width="26" height="26" viewBox="0 0 28 28" fill="none"
                            stroke="white" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"
                            opacity={isAct ? 1 : 0.55}
                            style={{ transition: "opacity 0.5s" }}>
                            {s.icon.props.children}
                          </svg>
                        </g>
                      </g>
                    );
                  })}
                </g>

                {/* Centre hub — static, not rotating */}
                <circle cx={CX} cy={CY} r={RI - 6} fill="var(--secondary)" />
                <circle cx={CX} cy={CY} r={RI - 6} fill="none" stroke="var(--border)" strokeWidth="1" />
                <circle cx={CX} cy={CY} r="30" fill={`${activeCol}15`} stroke={`${activeCol}40`} strokeWidth="1.5"
                  style={{ transition: "fill 0.5s, stroke 0.5s" }} />
                <text x={CX} y={CY - 5} textAnchor="middle" fontSize="10"
                  fontFamily="'JetBrains Mono',monospace" fontWeight="700"
                  fill={activeCol} style={{ transition: "fill 0.5s" }}>
                  0{active + 1}
                </text>
                <text x={CX} y={CY + 10} textAnchor="middle" fontSize="8"
                  fontFamily="'JetBrains Mono',monospace" fontWeight="500"
                  fill={activeCol} style={{ transition: "fill 0.5s" }}>
                  {step.label}
                </text>
              </svg>

              {/* 5-dot step indicator below wheel */}
              <div className="absolute -bottom-8 inset-x-0 flex justify-center gap-2">
                {BUILD_STEPS.map((_, i) => (
                  <button key={i} onClick={() => { goTo(i); startTimer(); }}
                    className="rounded-full transition-all duration-400"
                    style={{
                      width: i === active ? 20 : 6, height: 6,
                      background: i === active ? activeCol : "var(--border)",
                    }} />
                ))}
              </div>
            </div>

            {/* ── Single description panel ── */}
            <div className="flex-1 min-w-0">
              {/* Card */}
              <div className="relative rounded-3xl border overflow-hidden"
                style={{ borderColor: `${activeCol}35`, background: "var(--card)", transition: "border-color 0.5s", boxShadow: `0 24px 64px ${activeCol}18` }}>

                {/* Top accent bar */}
                <div className="absolute top-0 inset-x-0 h-[3px]"
                  style={{ background: `linear-gradient(90deg, ${activeCol}, ${activeCol}00)`, transition: "background 0.5s" }} />

                {/* Corner glow */}
                <div className="absolute top-0 right-0 w-48 h-48 pointer-events-none rounded-full"
                  style={{ background: `radial-gradient(circle, ${activeCol}0e 0%, transparent 70%)`, transition: "background 0.5s", transform: "translate(30%,-30%)" }} />

                <div className="relative p-10" key={descKey} style={{ animation: "hero-in 0.4s ease both" }}>

                  {/* Step eyebrow */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-['JetBrains_Mono',monospace] text-[9px] tracking-[3px] uppercase"
                      style={{ color: activeCol }}>Step 0{active + 1} of 05</span>
                    <div className="flex-1 h-px" style={{ background: `${activeCol}30` }} />
                    {/* Mini progress */}
                    <div className="flex gap-1.5">
                      {BUILD_STEPS.map((_, i) => (
                        <div key={i} className="rounded-full transition-all duration-400"
                          style={{ width: i === active ? 16 : 5, height: 5, background: i <= active ? activeCol : "var(--border)", opacity: i < active ? 0.45 : 1 }} />
                      ))}
                    </div>
                  </div>

                  {/* Icon + title */}
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center border shrink-0"
                      style={{ color: activeCol, background: `${activeCol}12`, borderColor: `${activeCol}35`, transition: "all 0.5s" }}>
                      <svg width="30" height="30" viewBox="0 0 28 28" fill="none"
                        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        {step.icon.props.children}
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-['Outfit',sans-serif] font-black leading-tight mb-1"
                        style={{ fontSize: "clamp(1.5rem,3vw,2rem)", backgroundImage: `linear-gradient(135deg, ${activeCol}, #f59e0b)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", transition: "background-image 0.5s" }}>
                        {step.label}
                      </h3>
                      <p className="font-['JetBrains_Mono',monospace] text-[9px] tracking-[2px] uppercase text-muted-foreground">
                        {step.phase}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="font-['Outfit',sans-serif] text-muted-foreground text-[15px] leading-[1.65] mb-5">
                    {step.desc}
                  </p>

                  {/* Detail chips */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {step.detail.map((d, j) => (
                      <span key={j}
                        className="flex items-center gap-2 px-3.5 py-2 rounded-full font-['Outfit',sans-serif] text-sm font-medium"
                        style={{ background: `${activeCol}10`, color: activeCol, border: `1px solid ${activeCol}28`, transition: "all 0.5s" }}>
                        <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: activeCol }} />
                        {d}
                      </span>
                    ))}
                  </div>

                  {/* Nav buttons */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => { goTo((active - 1 + BUILD_STEPS.length) % BUILD_STEPS.length); startTimer(); }}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-full border font-['Outfit',sans-serif] text-sm font-semibold text-foreground transition-all hover:border-orange-500 hover:text-orange-500"
                      style={{ borderColor: "var(--border)" }}>
                      <ChevronLeft size={14} /> Prev
                    </button>
                    <button
                      onClick={() => { goTo((active + 1) % BUILD_STEPS.length); startTimer(); }}
                      className="flex items-center gap-2 px-6 py-2.5 rounded-full font-['Outfit',sans-serif] text-sm font-bold text-white transition-all hover:scale-105 active:scale-95"
                      style={{ background: `linear-gradient(135deg, ${activeCol}, #f59e0b)`, boxShadow: `0 4px 16px ${activeCol}40`, transition: "background 0.5s, box-shadow 0.5s" }}>
                      Next Step <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </FadeIn>

        {/* Supporting banner */}
        <FadeIn delay={0.3}>
          <div className="mt-6 rounded-2xl px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center gap-3"
            style={{ background: "linear-gradient(135deg, rgba(249,115,22,0.07) 0%, rgba(245,158,11,0.04) 100%)", border: "1px solid rgba(249,115,22,0.15)" }}>
            <div className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(249,115,22,0.12)" }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 1L2 5v5c0 3.866 2.868 7.48 7 8.575C13.132 17.48 16 13.866 16 10V5L9 1z" stroke="#f97316" strokeWidth="1.5" strokeLinejoin="round" /><path d="M6 9.5l2 2 4-4" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <p className="font-['Outfit',sans-serif] text-[15px] leading-[1.7]" style={{ color: "var(--foreground)" }}>
              <span className="font-semibold" style={{ color: "#f97316" }}>We don&apos;t disappear after deployment.</span>{" "}
              <span className="text-muted-foreground">We stay engaged to optimize, enhance, and scale your software as your business evolves.</span>
            </p>
          </div>
        </FadeIn>

      </div>
    </section>
  );
}

// ── 4. Why ASKJUNO ─────────────────────────────────────────────────────────
const WHY_CARDS = [
  {
    num: "01",
    title: "Business-First Engineering",
    desc: "We understand your business goals, workflows, systems, and constraints before designing the solution — so what we build solves the right problem, not just the stated requirement.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="4" />
        <line x1="12" y1="2" x2="12" y2="4" />
        <line x1="12" y1="20" x2="12" y2="22" />
        <line x1="2" y1="12" x2="4" y2="12" />
        <line x1="20" y1="12" x2="22" y2="12" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "AI Where It Matters",
    desc: "From intelligent document processing to automation, validation, decision support, and AI-powered applications, we apply AI where it can eliminate manual effort and improve how work gets done.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Built to Scale",
    desc: "We architect software for today’s needs without creating tomorrow’s limitations — with scalable architecture, secure integrations, cloud-native foundations, and production-ready engineering.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 20V10M12 20V4M6 20v-6" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "End-to-End Ownership",
    desc: "From discovery and architecture through development, QA, deployment, integrations, and ongoing support, we stay accountable across the entire technology lifecycle.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </svg>
    ),
  },
  {
    num: "05",
    title: "Business + Technology Thinking",
    desc: "Our experience building our own products and solving real operational challenges helps us bridge the gap between business teams and engineering teams — turning requirements into solutions that people can actually use.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="13" height="13" rx="2" />
        <path d="M9 7V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-3" />
      </svg>
    ),
  },
  {
    num: "06",
    title: "Engineering That Lasts",
    desc: "Clean architecture, rigorous testing, security, maintainability, observability, and performance are considered from the beginning — because successful software needs to work long after launch.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
];

const WHAT_WE_BRING = [
  {
    title: "AI & Automation",
    desc: "Intelligent workflows & document intelligence",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    title: "Custom Platforms",
    desc: "SaaS & business applications",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    title: "Enterprise Integration",
    desc: "ERP, APIs & enterprise systems",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="8" height="8" rx="1.5" />
        <rect x="14" y="2" width="8" height="8" rx="1.5" />
        <rect x="8" y="14" width="8" height="8" rx="1.5" />
        <path d="M6 10v2a2 2 0 0 0 2 2h4" />
        <path d="M18 10v2a2 2 0 0 1-2 2h-4" />
        <path d="M12 14v-2" />
      </svg>
    ),
  },
  {
    title: "Cloud Engineering",
    desc: "Scalable cloud-native architecture",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
      </svg>
    ),
  },
];

function WhyJunoSection() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [iconPopped, setIconPopped] = useState<number | null>(null);
  const { ref: sectionRef, inView: sectionInView } = useInView(0.1);
  const { ref: capRef, inView: capInView } = useInView(0.2);

  const handleIconPop = (idx: number) => {
    setIconPopped(idx);
    setTimeout(() => setIconPopped(null), 600);
  };

  return (
    <section id="why-juno" className="py-14 sm:py-18 relative overflow-hidden" style={{ background: "var(--secondary)" }}>

      {/* ── ANIMATED BACKGROUND ─────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Floating orbs */}
        <div className="absolute top-[-80px] right-[-60px] w-[500px] h-[500px] rounded-full opacity-[0.06]"
          style={{ background: "radial-gradient(circle, #f97316 0%, transparent 65%)", animation: "float-orb 14s ease-in-out infinite" }} />
        <div className="absolute bottom-[-40px] left-[-80px] w-[380px] h-[380px] rounded-full opacity-[0.04]"
          style={{ background: "radial-gradient(circle, #f59e0b 0%, transparent 65%)", animation: "float-orb 18s ease-in-out 5s infinite reverse" }} />
        <div className="absolute top-[40%] left-[30%] w-[240px] h-[240px] rounded-full opacity-[0.025]"
          style={{ background: "radial-gradient(circle, #f97316 0%, transparent 65%)", animation: "float-orb 11s ease-in-out 2s infinite" }} />

        {/* Subtle dot grid */}
        <div className="absolute inset-0 opacity-[0.018]"
          style={{ backgroundImage: "radial-gradient(circle, #f97316 1px, transparent 1px)", backgroundSize: "44px 44px" }} />

        {/* Slow spinning accent ring — top right */}
        <div className="absolute top-12 right-12 w-[160px] h-[160px] opacity-[0.04]"
          style={{ border: "1px solid #f97316", borderRadius: "50%", animation: "spin-slow 30s linear infinite" }} />
        <div className="absolute top-20 right-20 w-[90px] h-[90px] opacity-[0.06]"
          style={{ border: "1px dashed #f97316", borderRadius: "50%", animation: "spin-slow 20s linear infinite reverse" }} />

        {/* Diagonal shimmer stripe */}
        <div className="absolute inset-0 opacity-[0.012]"
          style={{ backgroundImage: "repeating-linear-gradient(55deg, #f97316 0px, #f97316 1px, transparent 1px, transparent 80px)" }} />
      </div>

      <div ref={sectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── SECTION HEADER ────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-14 items-start mb-10">
          <FadeIn>
            {/* Animated label line */}
            <div className="flex items-center gap-2.5 mb-5">
              <div className="h-px overflow-hidden" style={{ width: sectionInView ? "24px" : "0px", transition: "width 0.8s cubic-bezier(0.22,1,0.36,1)" }}>
                <div className="h-full bg-orange-500 w-[24px]" />
              </div>
              {/* Pulsing live dot */}
              <div className="relative flex items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mr-2"
                  style={{ animation: "pulse-dot 2s ease-in-out infinite" }} />
                <div className="absolute left-0 w-1.5 h-1.5 rounded-full bg-orange-400"
                  style={{ animation: "orbit-ring 2s ease-out infinite" }} />
              </div>
              <span
                className="font-['JetBrains_Mono',monospace] text-[11px] tracking-[0.2em] uppercase font-semibold text-orange-500"
                style={{
                  opacity: sectionInView ? 1 : 0,
                  transform: sectionInView ? "translateX(0)" : "translateX(-12px)",
                  transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
                }}>
                Why AskJuno
              </span>
            </div>

            {/* Heading */}
            <h2 className="font-['Outfit',sans-serif] font-black text-[34px] sm:text-[40px] lg:text-[42px] leading-[1.1] -tracking-[0.02em] text-foreground">
              <span
                style={{
                  display: "block",
                  opacity: sectionInView ? 1 : 0,
                  transform: sectionInView ? "translateY(0)" : "translateY(20px)",
                  transition: "opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s",
                }}>
                Why Businesses
              </span>
              <span
                style={{
                  display: "block",
                  backgroundImage: "linear-gradient(90deg, #f97316 0%, #f59e0b 40%, #f97316 80%, #f59e0b 100%)",
                  backgroundSize: "200% 100%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  animation: sectionInView ? "shimmer-x 4s linear infinite" : "none",
                  opacity: sectionInView ? 1 : 0,
                  transform: sectionInView ? "translateY(0)" : "translateY(20px)",
                  transition: "opacity 0.7s ease 0.28s, transform 0.7s ease 0.28s",
                }}>
                Choose AskJuno.
              </span>
            </h2>

            {/* Animated underline that draws in */}
            <div className="mt-4 h-px overflow-hidden" style={{ maxWidth: "320px" }}>
              <div
                style={{
                  height: "100%",
                  background: "linear-gradient(90deg, #f97316, #f59e0b, transparent)",
                  width: sectionInView ? "100%" : "0%",
                  opacity: sectionInView ? 1 : 0,
                  transition: "width 1.2s cubic-bezier(0.22,1,0.36,1) 0.5s, opacity 0.4s ease 0.5s",
                }} />
            </div>
          </FadeIn>

          <FadeIn delay={0.15} className="lg:pt-10">
            <div className="relative pl-4 border-l-2"
              style={{ borderColor: "rgba(249,115,22,0.3)" }}>
              <p className="font-['Outfit',sans-serif] text-[14.5px] sm:text-[15.5px] leading-[1.65] text-muted-foreground">
                <span className="font-semibold text-foreground">Businesses don&apos;t need more software.</span>
                {" "}They need technology that solves the problems slowing them down. AskJuno brings engineering, AI, and business thinking together to build exactly that.
              </p>
            </div>
          </FadeIn>
        </div>

        {/* ── 6-CARD GRID ───────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-7">
          {WHY_CARDS.map((card, idx) => {
            const isHov = hovered === idx;
            const isPopped = iconPopped === idx;
            return (
              <div
                key={idx}
                onMouseEnter={() => { setHovered(idx); handleIconPop(idx); }}
                onMouseLeave={() => setHovered(null)}
                className="group relative rounded-[20px] border bg-card overflow-hidden cursor-default flex flex-col"
                style={{
                  borderColor: isHov ? "rgba(249,115,22,0.35)" : "var(--border)",
                  transform: isHov ? "translateY(-5px) scale(1.005)" : "translateY(0) scale(1)",
                  boxShadow: isHov
                    ? "0 20px 60px rgba(249,115,22,0.10), 0 4px 20px rgba(0,0,0,0.08), 0 0 0 1px rgba(249,115,22,0.15)"
                    : "0 1px 4px rgba(0,0,0,0.04)",
                  transition: "transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s ease, border-color 0.25s ease",
                  animation: sectionInView ? `card-rise 0.6s cubic-bezier(0.22,1,0.36,1) ${idx * 0.08}s both` : "none",
                }}>

                {/* Top accent line — draws in on hover */}
                <div className="absolute top-0 inset-x-0 h-[2px] overflow-hidden">
                  <div style={{
                    height: "100%",
                    background: "linear-gradient(90deg, #f97316, #f59e0b)",
                    width: isHov ? "100%" : "0%",
                    transition: "width 0.4s cubic-bezier(0.22,1,0.36,1)",
                  }} />
                </div>

                {/* Shimmer sweep on hover */}
                {isHov && (
                  <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: "linear-gradient(105deg, transparent 40%, rgba(249,115,22,0.06) 50%, transparent 60%)",
                      animation: "shimmer-card 0.7s ease forwards",
                    }} />
                  </div>
                )}

                {/* Hover radial glow */}
                <div className="absolute inset-0 pointer-events-none"
                  style={{
                    background: "radial-gradient(ellipse at 10% 10%, rgba(249,115,22,0.07) 0%, transparent 55%)",
                    opacity: isHov ? 1 : 0,
                    transition: "opacity 0.3s ease",
                  }} />

                <div className="relative p-6 sm:p-7 flex flex-col h-full z-10">
                  {/* Top row: icon + number */}
                  <div className="flex items-start justify-between mb-5">
                    {/* Icon container with orbit ring */}
                    <div className="relative flex-shrink-0">
                      {/* Orbit ring — appears on hover */}
                      {isHov && (
                        <div className="absolute inset-[-4px] rounded-xl border border-orange-400"
                          style={{ animation: "orbit-ring 0.8s ease-out forwards" }} />
                      )}
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-300"
                        style={{
                          color: isHov ? "#f97316" : "var(--foreground)",
                          background: isHov ? "rgba(249,115,22,0.12)" : "rgba(128,128,128,0.05)",
                          borderColor: isHov ? "rgba(249,115,22,0.35)" : "var(--border)",
                          animation: isPopped ? "icon-pop 0.5s ease forwards" : "none",
                        }}>
                        {card.icon}
                      </div>
                    </div>

                    {/* Number badge — slides down on hover */}
                    <div
                      className="font-['JetBrains_Mono',monospace] text-[11px] font-bold tracking-[0.12em] select-none px-2 py-0.5 rounded-full transition-all duration-300"
                      style={{
                        color: isHov ? "#f97316" : "var(--muted-foreground)",
                        background: isHov ? "rgba(249,115,22,0.10)" : "transparent",
                        border: isHov ? "1px solid rgba(249,115,22,0.25)" : "1px solid transparent",
                        opacity: isHov ? 1 : 0.45,
                      }}>
                      {card.num}
                    </div>
                  </div>

                  {/* Title */}
                  <h3
                    className="font-['Outfit',sans-serif] font-bold text-[15.5px] sm:text-[16.5px] leading-snug mb-1 transition-colors duration-250"
                    style={{ color: isHov ? "#f97316" : "var(--foreground)" }}>
                    {card.title}
                  </h3>


                  {/* Description */}
                  <p className="font-['Outfit',sans-serif] text-[13px] sm:text-[13.5px] leading-[1.6] text-muted-foreground flex-1">
                    {card.desc}
                  </p>

                  {/* Bottom row: orange line + spring arrow */}
                  <div className="flex items-center justify-between mt-5 pt-4 border-t transition-colors duration-300"
                    style={{ borderColor: isHov ? "rgba(249,115,22,0.18)" : "var(--border)" }}>
                    {/* Expanding accent line */}
                    <div className="h-[2px] rounded-full transition-all duration-500"
                      style={{
                        width: isHov ? "56px" : "20px",
                        background: "linear-gradient(90deg, #f97316, #f59e0b)",
                        opacity: isHov ? 1 : 0.35,
                        boxShadow: isHov ? "0 0 8px rgba(249,115,22,0.4)" : "none",
                      }} />

                    {/* Spring arrow */}
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300"
                      style={{
                        background: isHov ? "rgba(249,115,22,0.14)" : "rgba(128,128,128,0.06)",
                        color: isHov ? "#f97316" : "var(--muted-foreground)",
                        transform: isHov ? "translateX(3px) rotate(0deg)" : "translateX(0px) rotate(0deg)",
                        boxShadow: isHov ? "0 0 12px rgba(249,115,22,0.25)" : "none",
                      }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── CAPABILITY PANEL ──────────────────────────────── */}
        <div ref={capRef}>
          <div
            className="rounded-[22px] border overflow-hidden"
            style={{
              borderColor: "var(--border)",
              background: "var(--card)",
              boxShadow: "0 2px 20px rgba(0,0,0,0.06)",
              opacity: capInView ? 1 : 0,
              transform: capInView ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.7s ease 0.1s, transform 0.7s cubic-bezier(0.22,1,0.36,1) 0.1s",
            }}>
            {/* Animated top gradient accent */}
            <div className="h-[2px] overflow-hidden">
              <div style={{
                height: "100%",
                background: "linear-gradient(90deg, #f97316 0%, #f59e0b 50%, transparent 100%)",
                width: capInView ? "100%" : "0%",
                transition: "width 1.1s cubic-bezier(0.22,1,0.36,1) 0.4s",
              }} />
            </div>

            <div className="flex flex-col lg:flex-row">
              {/* Left label area */}
              <div className="px-7 py-7 lg:py-8 lg:w-56 xl:w-64 flex-shrink-0 flex flex-col justify-center border-b lg:border-b-0 lg:border-r"
                style={{ borderColor: "var(--border)" }}>
                <span
                  className="font-['JetBrains_Mono',monospace] text-[10px] tracking-[0.2em] uppercase font-semibold text-orange-500 mb-2"
                  style={{
                    opacity: capInView ? 1 : 0,
                    transform: capInView ? "translateX(0)" : "translateX(-10px)",
                    transition: "opacity 0.6s ease 0.5s, transform 0.6s ease 0.5s",
                  }}>
                  What We Bring
                </span>
                <h4
                  className="font-['Outfit',sans-serif] font-black text-[18px] sm:text-[19px] leading-snug text-foreground"
                  style={{
                    opacity: capInView ? 1 : 0,
                    transform: capInView ? "translateX(0)" : "translateX(-10px)",
                    transition: "opacity 0.6s ease 0.62s, transform 0.6s ease 0.62s",
                  }}>
                  Our Core<br />Capabilities
                </h4>
              </div>

              {/* Right capabilities — staggered slide in */}
              <div className="flex-1 grid grid-cols-2 lg:grid-cols-4">
                {WHAT_WE_BRING.map((item, i) => (
                  <div key={i}
                    className="group relative px-5 sm:px-6 py-6 flex flex-col gap-2.5 cursor-default overflow-hidden"
                    style={{
                      borderRight: i < 3 ? "1px solid var(--border)" : "none",
                      borderTop: "none",
                      opacity: capInView ? 1 : 0,
                      transform: capInView ? "translateY(0)" : "translateY(16px)",
                      transition: `opacity 0.5s ease ${0.55 + i * 0.1}s, transform 0.5s cubic-bezier(0.22,1,0.36,1) ${0.55 + i * 0.1}s`,
                    }}>
                    {/* Hover radial bg */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(249,115,22,0.07) 0%, transparent 70%)" }} />

                    {/* Bottom accent on hover — draws left to right */}
                    <div className="absolute bottom-0 inset-x-0 h-[2px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-350"
                      style={{ background: "linear-gradient(90deg, #f97316, #f59e0b)" }} />

                    {/* Icon with hover scale */}
                    <div className="relative z-10 w-8 h-8 rounded-lg flex items-center justify-center border transition-all duration-300 group-hover:scale-110 group-hover:border-orange-400/40"
                      style={{
                        background: "rgba(249,115,22,0.07)",
                        borderColor: "rgba(249,115,22,0.18)",
                      }}>
                      {item.icon}
                    </div>

                    <div className="relative z-10">
                      <p className="font-['Outfit',sans-serif] font-bold text-[13.5px] sm:text-[14px] text-foreground group-hover:text-[#f97316] transition-colors duration-300 leading-snug">
                        {item.title}
                      </p>
                      <p className="font-['Outfit',sans-serif] text-[12px] text-muted-foreground leading-snug mt-1">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

// ── 4b. How We Partner ────────────────────────────────────────────────────────
const PARTNERSHIP_STEPS = [
  {
    num: "01",
    title: "Idea → Strategy",
    desc: "We work with you from the very first idea — helping define the right problem to solve, the right technology approach, and the right path forward.",
    detail: ["Business problem discovery", "Technology feasibility", "Solution architecture", "Roadmap definition"],
    icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /><path d="M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>),
  },
  {
    num: "02",
    title: "Implementation",
    desc: "We build as a true extension of your team — transparent sprints, continuous feedback loops, and shared ownership at every step of development.",
    detail: ["Agile delivery cadence", "Weekly stakeholder reviews", "Shared project visibility", "Continuous testing & QA"],
    icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M9 10l-4 4 4 4M15 10l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /><path d="M13 8l-2 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>),
  },
  {
    num: "03",
    title: "Scale & Evolve",
    desc: "We stay engaged long after launch — monitoring performance, planning the next phase, and evolving the product alongside your growing business.",
    detail: ["Post-launch support", "Feature roadmap planning", "Performance optimization", "Long-term advisory"],
    icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M3 12a9 9 0 0115.6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /><path d="M21 12a9 9 0 01-15.6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /><path d="M18.6 3.4l.4 2.9-2.9.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /><path d="M5.4 20.6l-.4-2.9 2.9-.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>),
  },
];

const PARTNERSHIP_VALUES = [
  { icon: "🤝", title: "Collaborative by Design", desc: "We work as an extension of your team — open communication, shared ownership, no silos." },
  { icon: "🔍", title: "Transparent at Every Step", desc: "From planning to deployment, you always have full visibility into progress, priorities, and decisions." },
  { icon: "📈", title: "Built for Long-Term Growth", desc: "Every solution is designed to scale — easier to evolve, integrate, and innovate as your business grows." },
  { icon: "🎯", title: "Focused on Real Outcomes", desc: "Every recommendation and release is driven by one goal: helping your business operate more efficiently." },
];

function HowWePartnerSection() {
  const [activeStep, setActiveStep] = useState(0);
  return (
    <section id="approach" className="min-h-screen py-16 bg-background relative overflow-hidden flex flex-col justify-center">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] opacity-[0.05] rounded-full"
          style={{ background: "radial-gradient(circle, #f97316 0%, transparent 60%)", animation: "glow-pulse 6s ease-in-out infinite" }} />
        <div className="absolute inset-0 opacity-[0.018]"
          style={{ backgroundImage: "radial-gradient(circle, #f97316 1px, transparent 1px)", backgroundSize: "44px 44px" }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end mb-12">
          <FadeIn>
            <SectionLabel group="How We Build">Our Approach</SectionLabel>
            <SectionHeading>
              From Idea to<br />
              <GradientText>Implementation to Scale.</GradientText>
            </SectionHeading>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="font-['Outfit',sans-serif] text-muted-foreground leading-[1.65] text-[15px]">
              We {"don't"} disappear after deployment. We work as a true extension of your team — from the first conversation through every stage of growth. {"Here's"} how that partnership looks in practice.
            </p>
          </FadeIn>
        </div>

        {/* Journey steps */}
        <FadeIn delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            {PARTNERSHIP_STEPS.map((step, i) => {
              const isAct = activeStep === i;
              return (
                <div key={i}
                  className="group relative p-6 rounded-2xl border cursor-pointer transition-all duration-400"
                  style={{
                    background: isAct ? "linear-gradient(135deg, rgba(249,115,22,0.08) 0%, rgba(245,158,11,0.04) 100%)" : "var(--card)",
                    borderColor: isAct ? "rgba(249,115,22,0.35)" : "var(--border)",
                    transform: isAct ? "translateY(-4px)" : "translateY(0)",
                    boxShadow: isAct ? "0 20px 50px rgba(249,115,22,0.12)" : "none",
                  }}
                  onMouseEnter={() => setActiveStep(i)}>

                  {/* Active top bar */}
                  <div className="absolute top-0 inset-x-0 h-[3px] rounded-t-2xl transition-opacity duration-300"
                    style={{ background: ORANGE, opacity: isAct ? 1 : 0 }} />

                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-['JetBrains_Mono',monospace] text-[10px] tracking-[2.5px] uppercase font-bold"
                      style={{ color: isAct ? "#f97316" : "var(--muted-foreground)" }}>{step.num}</span>
                    <div className="h-px flex-1" style={{ background: isAct ? "rgba(249,115,22,0.3)" : "var(--border)" }} />
                  </div>

                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300"
                    style={{ color: isAct ? "#f97316" : "var(--muted-foreground)", background: isAct ? "rgba(249,115,22,0.12)" : "var(--muted)", border: isAct ? "1px solid rgba(249,115,22,0.25)" : "1px solid transparent" }}>
                    {step.icon}
                  </div>

                  <h3 className="font-['Outfit',sans-serif] font-black text-xl mb-3 transition-colors duration-300"
                    style={{ color: isAct ? "#f97316" : "var(--foreground)" }}>{step.title}</h3>

                  <p className="font-['Outfit',sans-serif] text-muted-foreground text-[14px] leading-[1.65] mb-4">{step.desc}</p>

                  <div className="flex flex-col gap-2">
                    {step.detail.map((d, j) => (
                      <div key={j} className="flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full shrink-0" style={{ background: isAct ? "#f97316" : "var(--muted-foreground)" }} />
                        <span className="font-['Outfit',sans-serif] text-[13px] text-muted-foreground">{d}</span>
                      </div>
                    ))}
                  </div>

                  {/* Arrow connector */}
                  {i < PARTNERSHIP_STEPS.length - 1 && (
                    <div className="hidden md:block absolute -right-5 top-1/2 -translate-y-1/2 z-10">
                      <ArrowRight size={16} style={{ color: isAct ? "#f97316" : "var(--border)" }} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </FadeIn>

        {/* Partnership values grid */}
        <FadeIn delay={0.2}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
            {PARTNERSHIP_VALUES.map((v, i) => (
              <div key={i} className="group p-5 rounded-2xl border border-border bg-card transition-all duration-400 hover:-translate-y-1 hover:border-orange-500/30 hover:shadow-xl hover:shadow-orange-500/5">
                <div className="text-2xl mb-3">{v.icon}</div>
                <h4 className="font-['Outfit',sans-serif] font-bold text-[15px] text-foreground mb-2 group-hover:text-orange-500 transition-colors duration-300">{v.title}</h4>
                <p className="font-['Outfit',sans-serif] text-muted-foreground text-[13px] leading-[1.6]">{v.desc}</p>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* CTA bridge */}
        <FadeIn delay={0.3}>
          <div className="relative rounded-2xl border border-border overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl" style={{ background: ORANGE }} />
            <div className="px-7 py-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <p className="font-['JetBrains_Mono',monospace] text-[9px] tracking-[2px] uppercase text-muted-foreground mb-1.5">Our success metric</p>
                <p className="font-['Outfit',sans-serif] text-foreground text-[15px] font-semibold leading-relaxed max-w-2xl">
                  Our success is measured by the success of the businesses we build for.{" "}
                  <span className="text-muted-foreground font-normal">Not by lines of code shipped.</span>
                </p>
              </div>
              <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="shrink-0 flex items-center gap-2 px-6 py-3 rounded-full font-['Outfit',sans-serif] font-bold text-sm text-white transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
                style={{ background: ORANGE, boxShadow: "0 4px 20px rgba(249,115,22,0.3)" }}>
                Start the Conversation <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </FadeIn>

      </div>
    </section>
  );
}

// ── 5. Products ─────────────────────────────────────────────────────────────
const BILLIT_CAPS = [
  { icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 3h12v2H2zM2 7h9v2H2zM2 11h6v2H2z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" /></svg>, label: "Intelligent Document Processing" },
  { icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="6" r="3" stroke="currentColor" strokeWidth="1.2" /><path d="M2 13c0-2.21 2.686-4 6-4s6 1.79 6 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /></svg>, label: "AI-Powered Data Extraction" },
  { icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2v4l3 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.2" /></svg>, label: "Business Rule Validation" },
  { icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1" y="5" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.2" /><rect x="9" y="5" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.2" /><path d="M7 8h2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /></svg>, label: "ERP & CRM Integration" },
  { icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M8 3v10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /><rect x="1" y="1" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.2" /></svg>, label: "Workflow Automation" },
  { icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 11l3-4 3 3 3-5 3 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>, label: "Operational Intelligence" },
];
const CUSTOM_ITEMS = ["AI Agents", "Workflow Automation", "SaaS Platforms", "Enterprise Portals", "Business Intelligence Dashboards", "Custom Integrations"];

const PRODUCTS = [
  {
    num: "01",
    name: "BilliT",
    tag: "AI-Powered · Document Intelligence",
    tagline: "Documents to Decisions.",
    desc: "Transform unstructured business documents into validated, structured, and actionable data using AI-powered document intelligence.",
    impact: "Reduce manual effort, improve data accuracy, accelerate decision-making, and gain real-time visibility across business operations.",
    caps: BILLIT_CAPS,
    cta: "Explore BilliT",
    accent: "#f97316",
    visual: (
      <div className="w-full rounded-2xl p-5 font-['Outfit',sans-serif]"
        style={{ background: "var(--card)", border: "1px solid var(--border)", boxShadow: "0 20px 60px rgba(249,115,22,0.08)" }}>
        <div className="flex items-center justify-between mb-4">
          <span className="font-black text-sm text-foreground">Document Pipeline</span>
          <span className="text-[10px] font-['JetBrains_Mono',monospace] text-orange-500 tracking-widest uppercase px-2 py-1 rounded-md" style={{ background: "rgba(249,115,22,0.1)" }}>Live</span>
        </div>
        {[
          { name: "Invoice_Q4_2024.pdf", status: "Extracted", pct: 100, col: "#22c55e" },
          { name: "PO_Batch_March.xlsx", status: "Validating", pct: 72, col: "#f97316" },
          { name: "Contract_Renewal.docx", status: "Processing", pct: 45, col: "#f59e0b" },
          { name: "GRN_Report_Feb.pdf", status: "Queued", pct: 12, col: "#94a3b8" },
        ].map((row, i) => (
          <div key={i} className="mb-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-foreground truncate max-w-[160px]">{row.name}</span>
              <span className="text-[10px] font-medium ml-2 shrink-0" style={{ color: row.col }}>{row.status}</span>
            </div>
            <div className="h-1.5 rounded-full" style={{ background: "var(--muted)" }}>
              <div className="h-1.5 rounded-full" style={{ width: `${row.pct}%`, background: `linear-gradient(90deg, ${row.col}, ${row.col}99)` }} />
            </div>
          </div>
        ))}
        <div className="grid grid-cols-3 gap-2 mt-4 pt-3" style={{ borderTop: "1px solid var(--border)" }}>
          {[["94.8%", "Accuracy"], ["2.3s", "Avg Time"], ["1,240", "Processed"]].map(([val, lbl]) => (
            <div key={lbl} className="text-center">
              <div className="font-black text-sm" style={{ backgroundImage: "linear-gradient(135deg,#f97316,#f59e0b)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{val}</div>
              <div className="text-[9px] font-['JetBrains_Mono',monospace] tracking-widest uppercase text-muted-foreground">{lbl}</div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    num: "02",
    name: "EETi",
    tag: "Enterprise · Engineering Platform",
    tagline: "Engineering Operations, Unified.",
    desc: "A modern engineering platform designed to streamline enterprise operations, improve collaboration, and support scalable digital transformation initiatives.",
    impact: "Faster delivery cycles, better cross-team visibility, reduced operational overhead, and a platform that grows with your business.",
    caps: [
      { icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.2" /><rect x="9" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.2" /><rect x="2" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.2" /><rect x="9" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.2" /></svg>, label: "Project Management" },
      { icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2v4l3 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.2" /></svg>, label: "Real-Time Collaboration" },
      { icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 8h12M8 2l6 6-6 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>, label: "CI/CD Integration" },
      { icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 11l3-4 3 3 3-5 3 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>, label: "Analytics & Reporting" },
    ],
    cta: "Learn More",
    accent: "#f8872a",
    visual: (
      <div className="w-full rounded-2xl p-5 font-['Outfit',sans-serif]"
        style={{ background: "var(--card)", border: "1px solid var(--border)", boxShadow: "0 20px 60px rgba(248,135,42,0.08)" }}>
        <div className="flex items-center justify-between mb-4">
          <span className="font-black text-sm text-foreground">Sprint Overview</span>
          <span className="text-[10px] font-['JetBrains_Mono',monospace] tracking-widest uppercase px-2 py-1 rounded-md" style={{ color: "#f8872a", background: "rgba(248,135,42,0.1)" }}>Q3 Sprint 4</span>
        </div>
        {[
          { task: "API Gateway Upgrade", owner: "Backend", progress: 88, col: "#22c55e" },
          { task: "UI Component Library", owner: "Frontend", progress: 65, col: "#f8872a" },
          { task: "Load Testing Suite", owner: "QA", progress: 42, col: "#f59e0b" },
          { task: "Security Audit", owner: "DevOps", progress: 20, col: "#94a3b8" },
        ].map((t, i) => (
          <div key={i} className="mb-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-foreground">{t.task}</span>
              <span className="text-[10px] text-muted-foreground">{t.owner}</span>
            </div>
            <div className="h-1.5 rounded-full" style={{ background: "var(--muted)" }}>
              <div className="h-1.5 rounded-full" style={{ width: `${t.progress}%`, background: `linear-gradient(90deg, ${t.col}, ${t.col}99)` }} />
            </div>
          </div>
        ))}
        <div className="grid grid-cols-3 gap-2 mt-4 pt-3" style={{ borderTop: "1px solid var(--border)" }}>
          {[["12", "Active Tasks"], ["3", "In Review"], ["94%", "On Track"]].map(([val, lbl]) => (
            <div key={lbl} className="text-center">
              <div className="font-black text-sm" style={{ backgroundImage: "linear-gradient(135deg,#f8872a,#f59e0b)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{val}</div>
              <div className="text-[9px] font-['JetBrains_Mono',monospace] tracking-widest uppercase text-muted-foreground">{lbl}</div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    num: "03",
    name: "Custom AI & Enterprise",
    tag: "Tailored · Solutions",
    tagline: "Built Around Your Business.",
    desc: "Every business is different. We design and build tailored AI solutions and enterprise platforms that solve unique operational challenges and integrate seamlessly with existing systems.",
    impact: "Purpose-built technology that fits your workflows, scales with your needs, and creates measurable value from day one.",
    caps: CUSTOM_ITEMS.map(label => ({ icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2l1.5 4H14l-3.5 2.5 1.3 4L8 10.2 4.2 12.5l1.3-4L2 6h4.5L8 2z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" /></svg>, label })),
    cta: "Discuss Your Project",
    accent: "#f59e0b",
    visual: (
      <div className="w-full rounded-2xl p-5 font-['Outfit',sans-serif]"
        style={{ background: "var(--card)", border: "1px solid var(--border)", boxShadow: "0 20px 60px rgba(245,158,11,0.08)" }}>
        <div className="flex items-center justify-between mb-4">
          <span className="font-black text-sm text-foreground">Solutions We Build</span>
          <span className="text-[10px] font-['JetBrains_Mono',monospace] tracking-widest uppercase px-2 py-1 rounded-md" style={{ color: "#f59e0b", background: "rgba(245,158,11,0.1)" }}>Custom</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {CUSTOM_ITEMS.map((item, i) => (
            <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
              style={{ background: "rgba(245,158,11,0.08)", color: "#f59e0b", border: "1px solid rgba(245,158,11,0.2)" }}>
              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "#f59e0b" }} />
              {item}
            </span>
          ))}
        </div>
        <div className="mt-4 pt-3 grid grid-cols-3 gap-2" style={{ borderTop: "1px solid var(--border)" }}>
          {[["100%", "Custom-Built"], ["6+", "Verticals"], ["∞", "Scale"]].map(([val, lbl]) => (
            <div key={lbl} className="text-center">
              <div className="font-black text-sm" style={{ backgroundImage: "linear-gradient(135deg,#f59e0b,#f97316)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{val}</div>
              <div className="text-[9px] font-['JetBrains_Mono',monospace] tracking-widest uppercase text-muted-foreground">{lbl}</div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
];

function ProductsSection() {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState<"up" | "down">("up");
  const [animKey, setAnimKey] = useState(0);

  const goTo = (idx: number) => {
    if (idx === active) return;
    setDir(idx > active ? "up" : "down");
    setActive(idx);
    setAnimKey(k => k + 1);
  };

  const product = PRODUCTS[active];

  return (
    <section id="products" className="min-h-screen py-16 bg-background relative overflow-hidden flex flex-col justify-center">
      <div className="absolute top-0 inset-x-0 h-px" style={{ background: "linear-gradient(90deg, transparent 0%, rgba(249,115,22,0.3) 50%, transparent 100%)" }} />

      <style>{`
        @keyframes slide-up-in   { from { opacity:0; transform:translateY(48px);  } to { opacity:1; transform:translateY(0); } }
        @keyframes slide-down-in { from { opacity:0; transform:translateY(-48px); } to { opacity:1; transform:translateY(0); } }
        .prod-enter-up   { animation: slide-up-in   0.5s cubic-bezier(0.22,1,0.36,1) both; }
        .prod-enter-down { animation: slide-down-in 0.5s cubic-bezier(0.22,1,0.36,1) both; }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 w-full">
        {/* Header */}
        <FadeIn className="mb-10">
          <SectionLabel group="What We Build">Products & Platforms</SectionLabel>
          <SectionHeading>Products Built to Solve Real Business Challenges.</SectionHeading>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 items-start">

          {/* ── Left: vertical product list ── */}
          <div className="flex flex-col gap-2">
            {PRODUCTS.map((p, i) => {
              const isActive = active === i;
              return (
                <button key={i} onClick={() => goTo(i)}
                  className="group w-full text-left rounded-2xl px-5 py-4 transition-all duration-300 relative overflow-hidden"
                  style={{
                    background: isActive ? `${p.accent}10` : "transparent",
                    border: `1px solid ${isActive ? p.accent + "35" : "var(--border)"}`,
                  }}>
                  {/* active left bar */}
                  <div className="absolute left-0 top-3 bottom-3 w-0.5 rounded-full transition-all duration-300"
                    style={{ background: p.accent, opacity: isActive ? 1 : 0 }} />

                  <div className="flex items-center justify-between mb-0.5">
                    <span className="font-['JetBrains_Mono',monospace] text-[9px] tracking-[2px] uppercase"
                      style={{ color: isActive ? p.accent : "var(--muted-foreground)" }}>{p.num}</span>
                    <ChevronRight size={13} className="transition-all duration-300"
                      style={{ color: isActive ? p.accent : "transparent", transform: isActive ? "translateX(0)" : "translateX(-4px)" }} />
                  </div>
                  <div className="font-['Outfit',sans-serif] font-bold text-sm transition-colors duration-300"
                    style={{ color: isActive ? "var(--foreground)" : "var(--muted-foreground)" }}>{p.name}</div>
                  {isActive && (
                    <div className="font-['Outfit',sans-serif] text-xs text-muted-foreground mt-0.5 leading-snug">{p.tag}</div>
                  )}
                </button>
              );
            })}

            {/* Nav arrows */}
            <div className="flex gap-2 mt-2">
              <button onClick={() => goTo((active - 1 + PRODUCTS.length) % PRODUCTS.length)}
                className="flex-1 h-9 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:border-orange-500 hover:text-orange-500 transition-all">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 11L7 3M3 7l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
              <button onClick={() => goTo((active + 1) % PRODUCTS.length)}
                className="flex-1 h-9 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:border-orange-500 hover:text-orange-500 transition-all">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 3L7 11M11 7l-4 4-4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
            </div>

            {/* Progress dots */}
            <div className="flex justify-center gap-1.5 mt-1">
              {PRODUCTS.map((p, i) => (
                <button key={i} onClick={() => goTo(i)}
                  className="rounded-full transition-all duration-300"
                  style={{ width: active === i ? 20 : 6, height: 6, background: active === i ? p.accent : "var(--border)" }} />
              ))}
            </div>
          </div>

          {/* ── Right: sliding content ── */}
          <div key={animKey} className={dir === "up" ? "prod-enter-up" : "prod-enter-down"}>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 items-start">

              {/* Left of content: copy */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-['JetBrains_Mono',monospace] text-[9px] tracking-[2.5px] uppercase font-bold px-3 py-1 rounded-full"
                    style={{ color: product.accent, background: `${product.accent}12`, border: `1px solid ${product.accent}28` }}>
                    {product.tag}
                  </span>
                </div>

                <h3 className="font-['Outfit',sans-serif] font-black text-foreground mb-1"
                  style={{ fontSize: "clamp(1.6rem,3vw,2.2rem)", backgroundImage: `linear-gradient(135deg, ${product.accent} 0%, #f59e0b 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  {product.name}
                </h3>
                <p className="font-['Outfit',sans-serif] font-bold text-base text-foreground mb-3">{product.tagline}</p>
                <p className="font-['Outfit',sans-serif] text-muted-foreground text-sm leading-[1.7] mb-4">{product.desc}</p>

                {/* Caps */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                  {product.caps.slice(0, 6).map((c, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-foreground font-['Outfit',sans-serif]">
                      <span className="shrink-0 w-6 h-6 rounded-md flex items-center justify-center"
                        style={{ background: `${product.accent}12`, color: product.accent }}>
                        {c.icon}
                      </span>
                      {c.label}
                    </div>
                  ))}
                </div>

                {/* Impact */}
                <p className="font-['Outfit',sans-serif] text-sm text-muted-foreground leading-relaxed mb-4 px-4 py-3 rounded-xl"
                  style={{ background: `${product.accent}07`, borderLeft: `3px solid ${product.accent}50` }}>
                  <span className="font-semibold text-foreground">Impact: </span>{product.impact}
                </p>

                <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                  className="group inline-flex items-center gap-2 px-6 py-3 rounded-full font-['Outfit',sans-serif] font-bold text-sm text-white transition-all hover:scale-105 active:scale-95"
                  style={{ background: `linear-gradient(135deg, ${product.accent}, #f59e0b)`, boxShadow: `0 6px 20px ${product.accent}35` }}>
                  {product.cta}
                  <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>

              {/* Right of content: visual */}
              <div>{product.visual}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── 6. Success Stories ─────────────────────────────────────────────────────
const CASE_STUDIES = [
  {
    industry: "Pharmaceutical",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="7" y="2" width="8" height="18" rx="4" stroke="currentColor" strokeWidth="1.5" />
        <path d="M7 11h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M4 8h2M16 8h2M4 14h2M16 14h2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
    title: "AI-Powered Document Intelligence for a Pharmaceutical Enterprise",
    challenge: "Thousands of distributor and stockist reports were processed manually, leading to delays, inconsistencies, and limited visibility into sales performance.",
    solution: "Implemented an AI-powered document intelligence platform to extract, validate, normalize, and consolidate data from multiple document formats into a single operational view.",
    impact: ["Reduced manual processing effort", "Improved data accuracy", "Faster sales reporting", "Better operational visibility"],
    accent: "#f97316",
  },
  {
    industry: "Enterprise",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="2" y="6" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M7 6V4a4 4 0 018 0v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M11 11v4M9 13h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "Modernizing Enterprise Operations",
    challenge: "Legacy systems slowed business processes and made it difficult to integrate with modern applications, limiting the organization's ability to scale.",
    solution: "Designed and developed a scalable cloud-native platform with seamless system integrations and an improved user experience built for long-term growth.",
    impact: ["Faster business processes", "Improved scalability", "Enhanced user adoption", "Reduced operational overhead"],
    accent: "#f8872a",
  },
  {
    industry: "Operations",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M4 11h14M11 4l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="4" cy="11" r="2" stroke="currentColor" strokeWidth="1.3" />
      </svg>
    ),
    title: "Intelligent Workflow Automation",
    challenge: "Teams spent significant time on repetitive manual tasks across multiple business functions, limiting productivity and creating error-prone handoffs.",
    solution: "Developed AI-powered workflow automation to eliminate repetitive processes, reduce friction between teams, and improve decision support across functions.",
    impact: ["Faster turnaround times", "Fewer manual errors", "Increased productivity", "Better decision support"],
    accent: "#f59e0b",
  },
];

const METRICS = [
  { value: "25+", label: "Projects Delivered" },
  { value: "15+", label: "Businesses Served" },
  { value: "6", label: "Industries" },
  { value: "95%", label: "Client Retention" },
  { value: "5+", label: "Years Experience" },
];

const LOGOS = ["Meridian Financial", "HealthCore Systems", "Sterling & Associates", "Apex Manufacturing", "GovTech Solutions", "DataEdge Corp"];

function StoriesSection() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section id="stories" className="min-h-screen py-16 relative overflow-hidden flex flex-col justify-center" style={{ background: "var(--secondary)" }}>
      <div className="absolute top-0 inset-x-0 h-px" style={{ background: "linear-gradient(90deg, transparent 0%, rgba(249,115,22,0.25) 50%, transparent 100%)" }} />

      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <FadeIn className="text-center mb-5 max-w-3xl mx-auto">
          <SectionLabel group="Proven in Practice">Success Stories</SectionLabel>
          <SectionHeading>Turning Complex Challenges into<br /><GradientText>Measurable Results.</GradientText></SectionHeading>
          <p className="font-['Outfit',sans-serif] text-muted-foreground text-sm leading-[1.65] mt-3">
            Every engagement is an opportunity to solve a meaningful business problem. Explore how we&apos;ve helped organizations streamline operations, modernize technology, and create lasting business value.
          </p>
        </FadeIn>

        {/* Metrics bar */}
        <FadeIn delay={0.08}>
          <div className="rounded-2xl px-6 py-5 mb-3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4"
            style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            {METRICS.map((m, i) => (
              <div key={i} className="text-center">
                <div className="font-['Outfit',sans-serif] font-black leading-none mb-1"
                  style={{ fontSize: "clamp(1.3rem,2.5vw,1.8rem)", backgroundImage: "linear-gradient(135deg, #f97316 0%, #f59e0b 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  {m.value}
                </div>
                <div className="font-['JetBrains_Mono',monospace] text-[9px] tracking-[2px] uppercase text-muted-foreground">{m.label}</div>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Case study cards */}
        <div className="flex flex-col gap-3 mb-3">
          {CASE_STUDIES.map((cs, i) => {
            const isOpen = expanded === i;
            return (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="rounded-2xl overflow-hidden transition-all duration-500"
                  style={{ background: "var(--card)", border: `1px solid ${isOpen ? cs.accent + "40" : "var(--border)"}`, boxShadow: isOpen ? `0 8px 40px ${cs.accent}12` : "none" }}>

                  {/* Card header — always visible */}
                  <button
                    className="w-full text-left px-6 py-4 flex items-center gap-3 group"
                    onClick={() => setExpanded(isOpen ? null : i)}>
                    {/* Industry icon */}
                    <div className="shrink-0 w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300"
                      style={{ background: isOpen ? `${cs.accent}15` : "var(--muted)", color: isOpen ? cs.accent : "var(--muted-foreground)" }}>
                      {cs.icon}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-0.5">
                        <span className="font-['JetBrains_Mono',monospace] text-[9px] tracking-[2.5px] uppercase font-bold"
                          style={{ color: cs.accent }}>{cs.industry}</span>
                      </div>
                      <h3 className="font-['Outfit',sans-serif] font-bold text-foreground text-sm leading-snug">{cs.title}</h3>
                    </div>

                    {/* Expand chevron */}
                    <div className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ml-2"
                      style={{ background: isOpen ? `${cs.accent}15` : "var(--muted)", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M3 5l4 4 4-4" stroke={isOpen ? cs.accent : "var(--muted-foreground)"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </button>

                  {/* Expandable body */}
                  <div style={{ maxHeight: isOpen ? "600px" : "0px", overflow: "hidden", transition: "max-height 0.5s cubic-bezier(0.4,0,0.2,1)" }}>
                    <div className="px-8 pb-8">
                      <div className="h-px mb-7" style={{ background: `linear-gradient(90deg, ${cs.accent}30, transparent)` }} />

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Challenge */}
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <div className="w-1.5 h-1.5 rounded-full" style={{ background: cs.accent }} />
                            <span className="font-['JetBrains_Mono',monospace] text-[9px] tracking-[2px] uppercase font-bold text-muted-foreground">Challenge</span>
                          </div>
                          <p className="font-['Outfit',sans-serif] text-sm text-muted-foreground leading-[1.6]">{cs.challenge}</p>
                        </div>

                        {/* Solution */}
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <div className="w-1.5 h-1.5 rounded-full" style={{ background: cs.accent }} />
                            <span className="font-['JetBrains_Mono',monospace] text-[9px] tracking-[2px] uppercase font-bold text-muted-foreground">Solution</span>
                          </div>
                          <p className="font-['Outfit',sans-serif] text-sm text-muted-foreground leading-[1.6]">{cs.solution}</p>
                        </div>

                        {/* Impact */}
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <div className="w-1.5 h-1.5 rounded-full" style={{ background: cs.accent }} />
                            <span className="font-['JetBrains_Mono',monospace] text-[9px] tracking-[2px] uppercase font-bold text-muted-foreground">Business Impact</span>
                          </div>
                          <ul className="flex flex-col gap-2">
                            {cs.impact.map((item, j) => (
                              <li key={j} className="flex items-start gap-2.5 font-['Outfit',sans-serif] text-sm text-foreground">
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 mt-0.5">
                                  <circle cx="7" cy="7" r="6" fill={`${cs.accent}18`} />
                                  <path d="M4.5 7l2 2 3-3" stroke={cs.accent} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                {item}
                              </li>
                            ))}
                          </ul>
                          <button
                            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                            className="group/r mt-3 inline-flex items-center gap-2 font-['Outfit',sans-serif] font-bold text-xs transition-all"
                            style={{ color: cs.accent }}>
                            <span className="border-b" style={{ borderColor: `${cs.accent}40` }}>Read Full Story</span>
                            <ArrowRight size={12} className="transition-transform duration-300 group-hover/r:translate-x-1" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>

        {/* Trusted logos */}
        <FadeIn delay={0.15}>
          <div className="rounded-2xl px-6 py-4 mb-3" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <p className="font-['JetBrains_Mono',monospace] text-[9px] tracking-[2.5px] uppercase text-muted-foreground text-center mb-5">
              Trusted by companies across industries
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
              {LOGOS.map((l, i) => (
                <span key={i} className="font-['Outfit',sans-serif] font-bold text-sm transition-colors duration-300 cursor-default"
                  style={{ color: "var(--muted-foreground)", opacity: 0.45 }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#f97316"; (e.currentTarget as HTMLElement).style.opacity = "1"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--muted-foreground)"; (e.currentTarget as HTMLElement).style.opacity = "0.45"; }}>
                  {l}
                </span>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Closing statement */}
        <FadeIn delay={0.2}>
          <div className="text-center pt-4">
            <p className="font-['Outfit',sans-serif] text-sm leading-relaxed max-w-2xl mx-auto"
              style={{ color: "var(--muted-foreground)" }}>
              Technology creates value only when it delivers measurable business outcomes.{" "}
              <span className="font-semibold" style={{ color: "var(--foreground)" }}>
                Every solution we build is designed with that goal in mind.
              </span>
            </p>
          </div>
        </FadeIn>

      </div>
    </section>
  );
}

// ── 7. Engineering Excellence ──────────────────────────────────────────────
const ENG_CAPS = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <polyline points="9 22 9 12 15 12 15 22" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
    title: "Cloud & Infrastructure",
    desc: "Build resilient, high-performance applications with cloud-native architectures that scale as your business grows.",
    techs: ["AWS", "Microsoft Azure", "Google Cloud", "Docker", "Kubernetes"],
    accent: "#f97316",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 21h8M12 17v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "Application Development",
    desc: "Create intuitive, high-performance applications across web, mobile, and enterprise platforms.",
    techs: ["React", "Angular", "Flutter", ".NET", "Node.js", "Python", "Java"],
    accent: "#f8872a",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "AI & Intelligent Automation",
    desc: "Transform business processes with AI solutions that automate work, extract insights, and support better decision-making.",
    techs: ["AI Agents", "Generative AI", "LLM Integrations", "Document Intelligence", "Workflow Automation", "Predictive Analytics"],
    accent: "#f59e0b",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M4 7h16M4 12h10M4 17h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="19" cy="17" r="3" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    title: "Data & Integration",
    desc: "Connect systems, unify data, and enable real-time visibility across your business.",
    techs: ["REST APIs", "GraphQL", "Data Engineering", "Business Intelligence", "ERP & CRM Integrations", "Data Pipelines"],
    accent: "#eb970f",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L4 6v6c0 5.25 3.5 10.15 8 11.5C16.5 22.15 20 17.25 20 12V6L12 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Security & Quality",
    desc: "Build with confidence using engineering practices that prioritize reliability, performance, and long-term maintainability.",
    techs: ["Secure SDLC", "Automated Testing", "CI/CD", "Performance Optimization", "Monitoring", "Compliance Best Practices"],
    accent: "#d97706",
  },
];

function TechnologySection() {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  return (
    <section id="technology" className="min-h-screen py-16 bg-background relative overflow-hidden flex flex-col justify-center">
      <div className="absolute right-0 top-1/4 w-[500px] h-[500px] opacity-[0.04] pointer-events-none rounded-full"
        style={{ background: "radial-gradient(circle, #f97316 0%, transparent 70%)" }} />
      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Header */}
        <FadeIn className="text-center mb-5 max-w-3xl mx-auto">
          <SectionLabel group="What We Build">Engineering</SectionLabel>
          <SectionHeading>Modern Engineering.<br /><GradientText>Built for Scale.</GradientText></SectionHeading>
        </FadeIn>
        <FadeIn delay={0.1} className="text-center mb-5 max-w-2xl mx-auto">
          <p className="font-['Outfit',sans-serif] text-muted-foreground text-sm leading-[1.65]">
            We combine modern technologies, cloud-native architectures, and AI capabilities to build secure, scalable, and future-ready software. Every technology we choose is driven by your business goals—not by trends.
          </p>
        </FadeIn>

        {/* Capability cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-5">
          {ENG_CAPS.map((cap, i) => {
            const isActive = activeCard === i;
            return (
              <FadeIn key={i} delay={i * 0.08}>
                <div
                  className="group relative rounded-2xl p-5 flex flex-col h-full cursor-pointer transition-all duration-400"
                  style={{
                    background: isActive ? `${cap.accent}0d` : "var(--card)",
                    border: `1px solid ${isActive ? cap.accent + "45" : "var(--border)"}`,
                    transform: isActive ? "translateY(-4px)" : "translateY(0)",
                    boxShadow: isActive ? `0 16px 40px ${cap.accent}14` : "none",
                  }}
                  onMouseEnter={() => setActiveCard(i)}
                  onMouseLeave={() => setActiveCard(null)}>

                  {/* accent top line on hover */}
                  <div className="absolute top-0 inset-x-0 h-0.5 rounded-t-2xl transition-opacity duration-300"
                    style={{ background: `linear-gradient(90deg, transparent, ${cap.accent}, transparent)`, opacity: isActive ? 1 : 0 }} />

                  {/* Icon */}
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-all duration-300"
                    style={{ background: isActive ? `${cap.accent}18` : "var(--muted)", color: isActive ? cap.accent : "var(--muted-foreground)" }}>
                    {cap.icon}
                  </div>

                  <h3 className="font-['Outfit',sans-serif] font-bold text-sm text-foreground mb-2">{cap.title}</h3>
                  <p className="font-['Outfit',sans-serif] text-muted-foreground text-sm leading-[1.75] mb-5 flex-1">{cap.desc}</p>

                  {/* Tech chips */}
                  <div className="flex flex-wrap gap-1.5">
                    {cap.techs.map((t, j) => (
                      <span key={j}
                        className="font-['JetBrains_Mono',monospace] text-[10px] tracking-wide px-2.5 py-1 rounded-full transition-all duration-300"
                        style={{
                          background: isActive ? `${cap.accent}12` : "var(--muted)",
                          color: isActive ? cap.accent : "var(--muted-foreground)",
                          border: `1px solid ${isActive ? cap.accent + "28" : "transparent"}`,
                        }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>

        {/* Engineering principles banner */}
        <FadeIn delay={0.3}>
          <div className="rounded-2xl px-6 py-4 flex flex-col md:flex-row items-start md:items-center gap-4"
            style={{ background: "linear-gradient(135deg, rgba(249,115,22,0.07) 0%, rgba(245,158,11,0.04) 100%)", border: "1px solid rgba(249,115,22,0.15)" }}>
            <div className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "rgba(249,115,22,0.12)" }}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M11 2l2.4 6.4H20l-5.2 3.8 2 6.4L11 14.8l-5.8 3.8 2-6.4L2 8.4h6.6L11 2z" stroke="#f97316" strokeWidth="1.5" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="font-['Outfit',sans-serif] font-bold text-foreground mb-1">Technology Choices That Stand the Test of Time</h4>
              <p className="font-['Outfit',sans-serif] text-muted-foreground text-sm leading-relaxed">
                We believe great software is built on strong engineering fundamentals. That&apos;s why we prioritize{" "}
                <span className="text-foreground font-medium">scalability, security, maintainability, and performance</span>{" "}
                in every solution we deliver.
              </p>
            </div>
          </div>
        </FadeIn>

      </div>
    </section>
  );
}

// ── 8. Our Principles ──────────────────────────────────────────────────────
const PRINCIPLES = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="8" r="5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M3 20c0-3.314 3.582-6 8-6s8 2.686 8 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "Build for Business Outcomes",
    desc: "Every project starts with one question: What business problem are we solving? We measure success by the value we create, not just the software we deliver.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M17 11c0 3.314-2.686 6-6 6s-6-2.686-6-6 2.686-6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M11 7V11l3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15 2l2 2-2 2M17 4h-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Partnerships Over Projects",
    desc: "We don't see ourselves as an external vendor. We work as an extension of your team, collaborating closely to build solutions that evolve with your business.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M11 2l2.4 5.6 5.6.8-4 4 .9 5.6L11 15.4l-4.9 2.6.9-5.6-4-4 5.6-.8L11 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
    title: "Intelligence with Purpose",
    desc: "AI isn't a feature to add—it's a capability to apply thoughtfully. We use intelligence where it simplifies work, accelerates decisions, and delivers measurable impact.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M12 2v4M12 16v4M4.93 4.93l2.83 2.83M14.24 14.24l2.83 2.83M2 12h4M16 12h4M4.93 19.07l2.83-2.83M14.24 7.76l2.83-2.83" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    title: "Engineering Without Compromise",
    desc: "Scalability, security, performance, and maintainability are built into every solution from day one. Quality isn't an afterthought—it's the foundation.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M5 12a7 7 0 1014 0 7 7 0 00-14 0z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 8v4l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M18.5 5.5L20 4M3.5 5.5L2 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "Always Evolving",
    desc: "Technology never stands still, and neither do we. We continuously learn, adapt, and improve to help our customers stay ahead of what's next.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "Human-Centered Innovation",
    desc: "The best technology empowers people. Every experience we design is built to make work simpler, faster, and more intuitive for the people who use it every day.",
  },
];

const BELIEFS = [
  "Great software should simplify work.",
  "AI should solve real problems, not create new ones.",
  "Technology should scale with your business.",
  "The best partnerships are built on trust and transparency.",
  "Every product should create measurable business value.",
  "Innovation only matters when it improves outcomes.",
];

function ValueSection() {
  return (
    <section id="value" className="min-h-screen py-16 relative overflow-hidden flex flex-col justify-center" style={{ background: "var(--secondary)" }}>
      <div className="absolute top-0 inset-x-0 h-px" style={{ background: "linear-gradient(90deg, transparent 0%, rgba(249,115,22,0.2) 50%, transparent 100%)" }} />
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <FadeIn className="text-center mb-5 max-w-3xl mx-auto">
          <SectionLabel group="Who We Are">Our Principles</SectionLabel>
          <SectionHeading>The Principles That Shape<br /><GradientText>Everything We Build.</GradientText></SectionHeading>
          <p className="font-['Outfit',sans-serif] text-muted-foreground text-sm leading-[1.65] mt-3">
            Technology evolves rapidly, but the principles behind great software remain constant. These are the beliefs that guide every product we build, every partnership we form, and every challenge we solve.
          </p>
        </FadeIn>

        {/* Vision, Mission, Values banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-5">
          {[
            {
              label: "Vision",
              title: "Intelligent Enterprise Clarity",
              desc: "To empower modern enterprises through resilient, intelligent software that transforms operational friction into sustainable business growth.",
              accent: "#f97316",
            },
            {
              label: "Mission",
              title: "Engineering with Purpose",
              desc: "To design and deploy mission-critical digital platforms and AI solutions with uncompromising craft, measurable ROI, and shared ownership.",
              accent: "#f8872a",
            },
            {
              label: "Values",
              title: "Principled Execution",
              desc: "Business outcomes first, absolute architectural transparency, lifelong engineering curiosity, and software built to stand the test of scale.",
              accent: "#f59e0b",
            },
          ].map((item, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div className="p-5 rounded-2xl border border-border bg-card relative overflow-hidden h-full flex flex-col justify-between">
                <div className="absolute top-0 inset-x-0 h-1" style={{ background: `linear-gradient(90deg, ${item.accent}, transparent)` }} />
                <div>
                  <span className="font-['JetBrains_Mono',monospace] text-[9px] uppercase tracking-[2.5px] font-bold" style={{ color: item.accent }}>
                    {item.label}
                  </span>
                  <h4 className="font-['Outfit',sans-serif] font-black text-foreground text-base mt-1 mb-2">{item.title}</h4>
                  <p className="font-['Outfit',sans-serif] text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Principles grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-5">
          {PRINCIPLES.map((p, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div className="group relative p-5 rounded-2xl flex flex-col gap-4 border border-border bg-card transition-all duration-500 hover:-translate-y-1 hover:border-orange-500/30 hover:shadow-xl hover:shadow-orange-500/5 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 rounded-bl-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: "radial-gradient(circle at top right, rgba(249,115,22,0.07), transparent 70%)" }} />
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-orange-500 transition-all duration-300 group-hover:scale-110"
                  style={{ background: "rgba(249,115,22,0.1)" }}>
                  {p.icon}
                </div>
                <h3 className="font-['Outfit',sans-serif] font-bold text-foreground">{p.title}</h3>
                <p className="font-['Outfit',sans-serif] text-muted-foreground text-sm leading-[1.6]">{p.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* What We Believe editorial list */}
        <FadeIn delay={0.2}>
          <div className="rounded-2xl p-5"
            style={{ background: "linear-gradient(135deg, rgba(249,115,22,0.07) 0%, rgba(245,158,11,0.04) 100%)", border: "1px solid rgba(249,115,22,0.15)" }}>
            <p className="font-['JetBrains_Mono',monospace] text-[10px] tracking-[3px] uppercase text-orange-500 font-bold mb-3">What We Believe</p>
            <div className="flex flex-col gap-4">
              {BELIEFS.map((b, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <span className="font-['JetBrains_Mono',monospace] text-[10px] text-muted-foreground/50 tabular-nums shrink-0">0{i + 1}</span>
                  <div className="h-px flex-1 max-w-8" style={{ background: "rgba(249,115,22,0.2)" }} />
                  <p className="font-['Outfit',sans-serif] font-medium text-foreground text-sm md:text-lg flex-1 group-hover:text-orange-500 transition-colors duration-300">{b}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

      </div>
    </section>
  );
}

// ── 9. Insights ────────────────────────────────────────────────────────────
const ARTICLES = [
  {
    featured: true,
    tag: "AI & Automation",
    icon: "🤖",
    title: "Beyond the AI Hype: Building Intelligence That Creates Business Value",
    desc: "Explore how organizations can move from AI experimentation to measurable business outcomes through practical implementation strategies that prioritize real-world impact over novelty.",
    readTime: "8 min read",
    accent: "#f97316",
  },
  {
    featured: false,
    tag: "Document Intelligence",
    icon: "📄",
    title: "Why Documents Are Still Slowing Down Modern Businesses",
    desc: "Discover how document intelligence transforms manual workflows into automated, data-driven operations.",
    readTime: "5 min read",
    accent: "#f8872a",
  },
  {
    featured: false,
    tag: "Product Engineering",
    icon: "🚀",
    title: "Building Software That Scales Beyond Version 1",
    desc: "The engineering principles behind scalable architecture, maintainable code, and long-term product success.",
    readTime: "6 min read",
    accent: "#f59e0b",
  },
];

const INSIGHT_CATS = ["AI & Intelligent Automation", "Product Engineering", "Enterprise Software", "Digital Transformation", "Data & Analytics", "Technology Leadership"];

function ThinkingSection() {
  return (
    <section id="thinking" className="min-h-screen py-16 bg-background relative overflow-hidden flex flex-col justify-center">
      <div className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{ backgroundImage: "radial-gradient(circle, #f97316 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Header */}
        <FadeIn className="text-center mb-5 max-w-3xl mx-auto">
          <SectionLabel group="Proven in Practice">Insights</SectionLabel>
          <SectionHeading>Insights for the<br /><GradientText>Builders of Tomorrow.</GradientText></SectionHeading>
          <p className="font-['Outfit',sans-serif] text-muted-foreground text-sm leading-[1.65] mt-3">
            We share perspectives on AI, software engineering, digital transformation, and product strategy to help businesses navigate technology with clarity and confidence.
          </p>
        </FadeIn>

        {/* Featured article */}
        <FadeIn delay={0.1}>
          <div className="group relative rounded-3xl overflow-hidden mb-3 cursor-pointer"
            style={{ background: "linear-gradient(135deg, rgba(249,115,22,0.08) 0%, rgba(245,158,11,0.04) 100%)", border: "1px solid rgba(249,115,22,0.18)" }}>
            <div className="absolute top-0 inset-x-0 h-0.5" style={{ background: "linear-gradient(90deg, transparent 10%, #f97316 40%, #f59e0b 60%, transparent 90%)" }} />
            <div className="p-5 grid grid-cols-1 lg:grid-cols-5 gap-10 items-center">
              <div className="lg:col-span-3">
                <div className="flex items-center gap-3 mb-5">
                  <span className="font-['JetBrains_Mono',monospace] text-[10px] tracking-[3px] uppercase text-orange-500 font-bold px-3 py-1.5 rounded-full"
                    style={{ background: "rgba(249,115,22,0.12)", border: "1px solid rgba(249,115,22,0.25)" }}>
                    Featured Article
                  </span>
                  <span className="font-['JetBrains_Mono',monospace] text-[9px] tracking-widest uppercase text-muted-foreground">{ARTICLES[0].tag}</span>
                </div>
                <h3 className="font-['Outfit',sans-serif] font-black text-foreground mb-4 leading-snug"
                  style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.85rem)" }}>
                  {ARTICLES[0].title}
                </h3>
                <p className="font-['Outfit',sans-serif] text-muted-foreground text-[15px] leading-[1.65] mb-7">{ARTICLES[0].desc}</p>
                <button className="group/r inline-flex items-center gap-2 font-['Outfit',sans-serif] font-bold text-sm transition-all"
                  style={{ color: "#f97316" }}>
                  <span className="border-b-2 pb-0.5" style={{ borderColor: "rgba(249,115,22,0.3)" }}>Read Article</span>
                  <ArrowRight size={14} className="transition-transform duration-300 group-hover/r:translate-x-1" />
                </button>
              </div>
              <div className="lg:col-span-2 flex items-center justify-center">
                <div className="relative w-32 h-32 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full opacity-20 animate-pulse"
                    style={{ background: "radial-gradient(circle, #f97316 0%, transparent 70%)" }} />
                  <span className="text-7xl">{ARTICLES[0].icon}</span>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Supporting articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
          {ARTICLES.slice(1).map((art, i) => (
            <FadeIn key={i} delay={0.15 + i * 0.1}>
              <div className="group relative p-5 rounded-2xl border border-border bg-card cursor-pointer transition-all duration-400 hover:-translate-y-1 hover:border-orange-500/30 hover:shadow-xl hover:shadow-orange-500/5 overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-px rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                  style={{ background: `linear-gradient(90deg, transparent, ${art.accent}, transparent)` }} />
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-['JetBrains_Mono',monospace] text-[9px] tracking-[2.5px] uppercase font-bold"
                    style={{ color: art.accent }}>{art.tag}</span>
                  <span className="font-['JetBrains_Mono',monospace] text-[9px] tracking-widest uppercase text-muted-foreground">{art.readTime}</span>
                </div>
                <h3 className="font-['Outfit',sans-serif] font-bold text-foreground text-sm leading-snug mb-3">{art.title}</h3>
                <p className="font-['Outfit',sans-serif] text-muted-foreground text-sm leading-[1.75] mb-5">{art.desc}</p>
                <button className="group/r inline-flex items-center gap-2 font-['Outfit',sans-serif] font-bold text-xs transition-all"
                  style={{ color: art.accent }}>
                  <span className="border-b pb-0.5" style={{ borderColor: `${art.accent}40` }}>Read Article</span>
                  <ArrowRight size={12} className="transition-transform duration-300 group-hover/r:translate-x-1" />
                </button>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Categories + CTA */}
        <FadeIn delay={0.25}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-8" style={{ borderTop: "1px solid var(--border)" }}>
            <div className="flex flex-wrap gap-2">
              {INSIGHT_CATS.map((cat, i) => (
                <span key={i}
                  className="font-['Outfit',sans-serif] text-xs font-medium px-3.5 py-1.5 rounded-full cursor-pointer transition-all duration-300 hover:border-orange-500 hover:text-orange-500"
                  style={{ background: "var(--muted)", color: "var(--muted-foreground)", border: "1px solid var(--border)" }}>
                  {cat}
                </span>
              ))}
            </div>
            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="group shrink-0 inline-flex items-center gap-2.5 px-6 py-3 rounded-full font-['Outfit',sans-serif] font-bold text-sm text-white transition-all hover:scale-105 active:scale-95"
              style={{ background: "linear-gradient(135deg, #f97316, #f59e0b)", boxShadow: "0 4px 18px rgba(249,115,22,0.3)" }}>
              View All Insights
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </FadeIn>

        {/* Callout */}
        <FadeIn delay={0.3}>
          <p className="font-['Outfit',sans-serif] text-center text-sm text-muted-foreground mt-5 italic max-w-lg mx-auto">
            Ideas are only valuable when they&apos;re applied. Explore our latest thinking on building software that drives business outcomes.
          </p>
        </FadeIn>

      </div>
    </section>
  );
}

// ── 9b. FAQ ─────────────────────────────────────────────────────────────────
const FAQ_FEATURES = [
  {
    num: "01",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    title: "Quick Answers",
    desc: "Get the information you need, fast.",
  },
  {
    num: "02",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    title: "Clear Process",
    desc: "Understand how we work.",
  },
  {
    num: "03",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "No Surprises",
    desc: "Transparent, honest, and reliable.",
  },
];

const FAQ_ITEMS = [
  {
    q: "What types of businesses do you work with?",
    a: "We work with growth-stage startups, mid-market companies, and established enterprise organizations across finance, healthcare, logistics, e-commerce, and SaaS. Whether you need a full-scale digital platform built from scratch or AI integrated into legacy systems, we tailor our engineering approach to your scale and technical maturity.",
  },
  {
    q: "How long does a typical project take?",
    a: "Timelines depend on scope and architecture. Rapid MVPs and proof-of-concepts typically launch in 4 to 8 weeks, while full enterprise software platforms and AI engineering systems generally take 3 to 6 months. We work in 2-week agile sprints so you have continuous visibility and regular working releases.",
  },
  {
    q: "Do you offer ongoing support and maintenance?",
    a: "Yes. We offer comprehensive post-launch support, SLA-backed maintenance, cloud infrastructure monitoring, and continuous optimization. Clients can also leverage our dedicated engineering retainers to continually ship new features, evolve their architecture, and keep systems secure.",
  },
  {
    q: "What is your engagement model?",
    a: "We offer flexible models based on your business objectives: dedicated product engineering teams who embed as a seamless extension of your company, fixed-scope project delivery with transparent milestones, or strategic technology consulting and architecture design.",
  },
  {
    q: "How do I get started?",
    a: "Getting started is simple. Submit the contact form below or email us at enquiry@askjuno.com. We will schedule a 30-minute discovery call to learn about your goals, evaluate technical requirements, and outline a tailored proposal with clear next steps.",
  },
];

function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="pt-20 pb-4 bg-background relative overflow-hidden transition-colors duration-200">
      {/* Background subtle ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 right-0 w-[500px] h-[500px] opacity-[0.04] dark:opacity-[0.06] rounded-full"
          style={{ background: "radial-gradient(circle, #f97316 0%, transparent 70%)" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">

          {/* Left Column: FAQ header + 3 horizontal feature items */}
          <div className="lg:col-span-6 flex flex-col justify-start">
            <FadeIn>
              {/* Tag: FAQ ──── */}
              <div className="flex items-center gap-3 mb-3">
                <span className="font-['JetBrains_Mono',monospace] text-[13px] uppercase tracking-[2.5px] font-bold text-[#f97316]">FAQ</span>
                <div className="h-[1.5px] w-12 bg-[#f97316]" />
              </div>



              {/* Subtitle */}
              <p className="font-['Outfit',sans-serif] text-muted-foreground text-[15px] leading-relaxed max-w-lg mb-10">
                Can&apos;t find what you&apos;re looking for? Write to us directly, we&apos;re happy to answer any questions about how we work.
              </p>

              {/* Three supporting feature items with numbers and icons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 pt-1">
                {FAQ_FEATURES.map((feat) => (
                  <div
                    key={feat.num}
                    className="p-4 rounded-xl border border-border bg-card/70 hover:border-orange-500/35 transition-all duration-200 flex flex-col items-start group shadow-sm"
                  >
                    <div className="flex items-center justify-between w-full mb-3">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-orange-500/10 dark:bg-orange-500/15 border border-orange-500/25 text-[#f97316] group-hover:bg-orange-500/20 group-hover:scale-105 transition-all shadow-sm">
                        {feat.icon}
                      </div>
                      <span className="font-['JetBrains_Mono',monospace] text-[11px] font-bold text-[#f97316] tracking-wider">
                        {feat.num}
                      </span>
                    </div>
                    <h4 className="font-['Outfit',sans-serif] font-bold text-foreground text-[14.5px] mb-1">
                      {feat.title}
                    </h4>
                    <p className="font-['Outfit',sans-serif] text-[12px] text-stone-600 dark:text-stone-400 leading-snug">
                      {feat.desc}
                    </p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* Right Column: Accordion list */}
          <div className="lg:col-span-6 flex flex-col gap-2.5">
            {FAQ_ITEMS.map((item, i) => {
              const isOpen = open === i;
              return (
                <FadeIn key={i} delay={i * 0.04}>
                  <div
                    className={`rounded-xl border transition-all duration-200 overflow-hidden bg-card ${isOpen
                      ? "border-orange-500/50 shadow-md shadow-orange-500/5 ring-1 ring-orange-500/25"
                      : "border-border hover:border-orange-500/40 hover:shadow-sm"
                      }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left group transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 cursor-pointer"
                    >
                      <span
                        className={`font-['Outfit',sans-serif] text-[14.5px] sm:text-[15px] leading-snug transition-colors ${isOpen
                          ? "text-[#f97316] font-semibold"
                          : "text-foreground group-hover:text-[#f97316] font-medium"
                          }`}
                      >
                        {item.q}
                      </span>
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 ${isOpen
                          ? "bg-orange-500/15 text-[#f97316] rotate-180"
                          : "bg-muted text-stone-500 dark:text-stone-400 group-hover:text-[#f97316] group-hover:bg-orange-500/10"
                          }`}
                      >
                        <ChevronDown size={15} />
                      </div>
                    </button>

                    {/* Smooth answer reveal */}
                    <div
                      style={{
                        maxHeight: isOpen ? "300px" : "0px",
                        opacity: isOpen ? 1 : 0,
                        overflow: "hidden",
                        transition: "max-height 0.3s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.2s ease",
                      }}
                    >
                      <div className="px-5 pb-5 pt-1 border-t border-border">
                        <p className="font-['Outfit',sans-serif] text-stone-600 dark:text-stone-300 text-[14px] leading-[1.65] mt-2.5">
                          {item.a}
                        </p>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}

// ── 10. Contact ─────────────────────────────────────────────────────────────
const COMMITMENTS = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2L3 6v5c0 3.866 2.868 7.48 7 8.575C14.132 18.48 17 14.866 17 11V6L10 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M7 10.5l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Collaborative by Design",
    desc: "We work as an extension of your team, maintaining open communication and shared ownership throughout every stage of the project.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="2" y="10" width="3" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <rect x="8.5" y="7" width="3" height="10" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <rect x="15" y="3" width="3" height="14" rx="1" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    title: "Built for Long-Term Growth",
    desc: "Our solutions are designed to scale with your business, making it easier to evolve, integrate, and innovate as your needs change.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 7v3l2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M7 3.5l-1.5-2M13 3.5l1.5-2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
    title: "Transparent at Every Step",
    desc: "From planning and development to deployment and support, you'll always have visibility into progress, priorities, and next steps.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2l1.5 4.5H16l-3.75 2.7 1.43 4.3L10 11.1l-3.68 2.4 1.43-4.3L4 6.5h4.5L10 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
    title: "Focused on Real Outcomes",
    desc: "Every recommendation, feature, and release is driven by one goal: helping your business operate more efficiently and grow with confidence.",
  },
];

function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "", subject: "Book a Consultation" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="contact" className="pt-8 pb-20 bg-background relative overflow-hidden transition-colors duration-200">
      {/* Subtle divider line between FAQ and Contact */}
      <div className="max-w-7xl mx-auto px-6 mb-14 sm:mb-16">
        <div
          className="h-px w-full"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, var(--border) 20%, rgba(249,115,22,0.35) 50%, var(--border) 80%, transparent 100%)",
          }}
        />
      </div>

      {/* Decorative background subtle glow & geometric element in bottom right */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -right-16 -bottom-16 w-80 h-80 rounded-[48px] border-2 border-orange-500/15 dark:border-orange-500/25 bg-gradient-to-br from-orange-500/5 to-transparent rotate-[28deg] blur-[0.5px] shadow-[0_0_90px_rgba(249,115,22,0.1)]" />
        <div className="absolute right-4 bottom-4 w-60 h-60 rounded-[36px] border border-orange-500/20 dark:border-orange-500/25 bg-gradient-to-tr from-orange-500/10 to-transparent rotate-[28deg]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">

          {/* Left Column: Heading + Supporting Text + Contact Details */}
          <div className="lg:col-span-5 flex flex-col justify-start">
            <FadeIn>
              {/* Tag: CONTACT ──── */}
              <div className="flex items-center gap-3 mb-3">
                <span className="font-['JetBrains_Mono',monospace] text-[13px] uppercase tracking-[2.5px] font-bold text-[#f97316]">CONTACT</span>
                <div className="h-[1.5px] w-12 bg-[#f97316]" />
              </div>

              {/* Heading */}
              <h2 className="font-['Outfit',sans-serif] font-bold text-3xl sm:text-4xl lg:text-[42px] leading-[1.15] tracking-tight text-foreground mb-4">
                Let&apos;s Build<br />
                <span className="text-[#f97316]">Something Great Together.</span>
              </h2>

              {/* Supporting Text */}
              <p className="font-['Outfit',sans-serif] text-stone-600 dark:text-stone-300 text-[14.5px] leading-relaxed mb-8">
                Have a project in mind, a question, or just want to say hello?<br />
                We&apos;d love to hear from you.
              </p>

              {/* Contact details with responsive cards and badges */}
              <div className="flex flex-col gap-3.5">
                {/* Email */}
                <a
                  href="mailto:enquiry@askjuno.com"
                  className="group flex items-center gap-4 p-3 rounded-xl border border-border/40 bg-card/40 hover:border-orange-500/35 hover:bg-card transition-all duration-200 shadow-sm"
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-orange-500/10 dark:bg-orange-500/15 border border-orange-500/25 text-[#f97316] shrink-0 group-hover:bg-orange-500/20 group-hover:scale-105 transition-all shadow-sm">
                    <Mail size={17} />
                  </div>
                  <div>
                    <div className="font-['JetBrains_Mono',monospace] text-[10px] tracking-widest uppercase font-bold text-stone-500 dark:text-stone-400">
                      EMAIL
                    </div>
                    <div className="font-['Outfit',sans-serif] text-[14px] font-medium text-foreground group-hover:text-[#f97316] transition-colors">
                      enquiry@askjuno.com
                    </div>
                  </div>
                </a>

                {/* Phone */}
                <a
                  href="tel:+917550267584"
                  className="group flex items-center gap-4 p-3 rounded-xl border border-border/40 bg-card/40 hover:border-orange-500/35 hover:bg-card transition-all duration-200 shadow-sm"
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-orange-500/10 dark:bg-orange-500/15 border border-orange-500/25 text-[#f97316] shrink-0 group-hover:bg-orange-500/20 group-hover:scale-105 transition-all shadow-sm">
                    <Phone size={17} />
                  </div>
                  <div>
                    <div className="font-['JetBrains_Mono',monospace] text-[10px] tracking-widest uppercase font-bold text-stone-500 dark:text-stone-400">
                      PHONE
                    </div>
                    <div className="font-['Outfit',sans-serif] text-[14px] font-medium text-foreground group-hover:text-[#f97316] transition-colors">
                      India – +91 7550267584
                    </div>
                  </div>
                </a>

                {/* Office */}
                <div className="flex items-start gap-4 p-3 rounded-xl border border-border/40 bg-card/40 shadow-sm">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-orange-500/10 dark:bg-orange-500/15 border border-orange-500/25 text-[#f97316] shrink-0 mt-0.5 shadow-sm">
                    <MapPin size={17} />
                  </div>
                  <div>
                    <div className="font-['JetBrains_Mono',monospace] text-[10px] tracking-widest uppercase font-bold text-stone-500 dark:text-stone-400">
                      OFFICE
                    </div>
                    <div className="font-['Outfit',sans-serif] text-[13.5px] font-medium text-foreground leading-relaxed mt-0.5">
                      ASV Chandilya Towers, 397, Rajiv Gandhi Salai,<br />
                      Nehru Nagar, Thoraipakkam, Tamil Nadu 600097
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <FadeIn delay={0.1}>
              <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 relative z-10 shadow-xl shadow-stone-900/5 dark:shadow-black/50">
                {sent ? (
                  <div className="flex flex-col items-center justify-center text-center gap-4 py-12">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center bg-orange-500/10 dark:bg-orange-500/20 border border-orange-500/35 text-[#f97316] shadow-sm">
                      <Check size={26} />
                    </div>
                    <h3 className="font-['Outfit',sans-serif] font-bold text-2xl text-foreground">Message received!</h3>
                    <p className="font-['Outfit',sans-serif] text-stone-600 dark:text-stone-300 text-sm max-w-sm">
                      Thank you for reaching out. We will review your inquiry and get in touch within one business day.
                    </p>
                    <button
                      onClick={() => setSent(false)}
                      className="mt-2 text-[#f97316] text-sm font-['Outfit',sans-serif] font-bold hover:underline cursor-pointer">
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {/* Name and Email 2-column row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="font-['JetBrains_Mono',monospace] text-[10.5px] tracking-widest uppercase font-bold text-stone-600 dark:text-stone-400 block mb-1.5">
                          NAME
                        </label>
                        <input
                          required
                          type="text"
                          value={form.name}
                          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                          className="w-full px-4 py-2.5 rounded-lg border border-border bg-muted/40 dark:bg-[#18130e] font-['Outfit',sans-serif] text-sm text-foreground placeholder:text-stone-400 dark:placeholder:text-stone-500 outline-none focus:border-[#f97316] focus:ring-2 focus:ring-orange-500/20 transition-all"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label className="font-['JetBrains_Mono',monospace] text-[10.5px] tracking-widest uppercase font-bold text-stone-600 dark:text-stone-400 block mb-1.5">
                          EMAIL
                        </label>
                        <input
                          required
                          type="email"
                          value={form.email}
                          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                          className="w-full px-4 py-2.5 rounded-lg border border-border bg-muted/40 dark:bg-[#18130e] font-['Outfit',sans-serif] text-sm text-foreground placeholder:text-stone-400 dark:placeholder:text-stone-500 outline-none focus:border-[#f97316] focus:ring-2 focus:ring-orange-500/20 transition-all"
                          placeholder="you@company.com"
                        />
                      </div>
                    </div>

                    {/* Company */}
                    <div>
                      <label className="font-['JetBrains_Mono',monospace] text-[10.5px] tracking-widest uppercase font-bold text-stone-600 dark:text-stone-400 block mb-1.5">
                        COMPANY
                      </label>
                      <input
                        type="text"
                        value={form.company}
                        onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                        className="w-full px-4 py-2.5 rounded-lg border border-border bg-muted/40 dark:bg-[#18130e] font-['Outfit',sans-serif] text-sm text-foreground placeholder:text-stone-400 dark:placeholder:text-stone-500 outline-none focus:border-[#f97316] focus:ring-2 focus:ring-orange-500/20 transition-all"
                        placeholder="Your organization"
                      />
                    </div>

                    {/* Subject */}
                    <div>
                      <label className="font-['JetBrains_Mono',monospace] text-[10.5px] tracking-widest uppercase font-bold text-stone-600 dark:text-stone-400 block mb-1.5">
                        SUBJECT
                      </label>
                      <div className="relative">
                        <select
                          value={form.subject}
                          onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                          className="w-full px-4 py-2.5 rounded-lg border border-border bg-muted/40 dark:bg-[#18130e] font-['Outfit',sans-serif] text-sm text-foreground outline-none focus:border-[#f97316] focus:ring-2 focus:ring-orange-500/20 transition-all appearance-none cursor-pointer"
                        >
                          {["Book a Consultation", "Product Demo", "Enterprise Pricing", "Technical Question", "Partnership"].map((s) => (
                            <option key={s} value={s} className="bg-card text-foreground">
                              {s}
                            </option>
                          ))}
                        </select>
                        <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="font-['JetBrains_Mono',monospace] text-[10.5px] tracking-widest uppercase font-bold text-stone-600 dark:text-stone-400 block mb-1.5">
                        MESSAGE
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={form.message}
                        onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                        className="w-full px-4 py-2.5 rounded-lg border border-border bg-muted/40 dark:bg-[#18130e] font-['Outfit',sans-serif] text-sm text-foreground placeholder:text-stone-400 dark:placeholder:text-stone-500 outline-none focus:border-[#f97316] focus:ring-2 focus:ring-orange-500/20 transition-all resize-none"
                        placeholder="Tell us about your challenge..."
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl font-['Outfit',sans-serif] font-bold text-white text-[14.5px] flex items-center justify-center gap-2 transition-all hover:opacity-95 active:scale-[0.99] shadow-lg shadow-orange-500/25 mt-1 cursor-pointer"
                      style={{ background: "linear-gradient(90deg, #f97316 0%, #ea580c 100%)" }}
                    >
                      <Calendar size={15} /> Book a Consultation <Send size={13} />
                    </button>
                  </form>
                )}
              </div>
            </FadeIn>
          </div>

        </div>
      </div>
    </section>
  );
}


// ── Footer ──────────────────────────────────────────────────────────────────
function Footer({ dark }: { dark: boolean }) {
  return (
    <footer className="bg-background border-t border-border py-6 relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(90deg, transparent 0%, rgba(249,115,22,0.2) 50%, transparent 100%)" }} />
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <ImageWithFallback src={dark ? logoDark : logoLight} alt="AskJuno" className="h-12 w-auto object-contain" />
        <p className="font-['Outfit',sans-serif] text-xs text-muted-foreground">© 2025 ASKJUNO. Enterprise AI, responsibly built.</p>
        <div className="flex gap-4">
          {["Privacy", "Terms", "Security"].map(l => (
            <a key={l} href="#" className="font-['Outfit',sans-serif] text-xs text-muted-foreground hover:text-orange-500 transition-colors">{l}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}

// ── Root ────────────────────────────────────────────────────────────────────
export default function App() {
  const [dark, setDark] = useState(true);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  useSectionReveal(SECTION_IDS);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    SECTION_IDS.forEach((id, i) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) setActiveSection(i);
      }, { threshold: 0.35 });
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  const scrollToSection = (i: number) => {
    document.getElementById(SECTION_IDS[i])?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <ScrollProgress />
      <SectionFlash activeSection={activeSection} />
      <Navbar dark={dark} setDark={setDark} activeSection={activeSection} />
      <SideDots active={activeSection} onDotClick={scrollToSection} />
      <ThemeToggle dark={dark} setDark={setDark} />

      <HeroSection />
      <AboutUsSection />
      <WhyJunoSection />
      <ValueSection />
      <WhatWeDoSection />
      <ProductsSection />
      <TechnologySection />
      <HowWePartnerSection />
      <HowWeBuildSection />
      <IndustriesSection />
      <ThinkingSection />
      <StoriesSection />
      <FAQSection />
      <ContactSection />
      <Footer dark={dark} />
    </div>
  );
}
