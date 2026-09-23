import React, { useState, useEffect, useRef, useCallback } from "react";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { PrivacyPolicyModal } from "@/app/components/PrivacyPolicyModal";
import OurPeopleSection from "@/app/components/OurPeopleSection";
import {
  InsightsPage,
  DomainPage,
  ArticlePage,
} from "@/app/components/insights";
import logoDark from "@/imports/Custom_Design_Featuring_It-1.png";
import logoLight from "@/imports/AskJuno_Logo__1_-removebg-preview.png";
import officeImg from "@/imports/office_better_together.jpg";
import approachImg from "@/imports/approach_engineer.jpg";
import {
  Sun, Moon, ArrowRight, Check, X, ChevronLeft, ChevronRight, ChevronDown,
  Mail, Phone, MapPin, Send, Calendar, Menu,
  Eye, Target, Users, Handshake, Cpu, Shield, TrendingUp, Sparkles,
  MessageSquare, Lightbulb, GitMerge, CheckCircle, Zap, RefreshCw,
  Code2, Cloud, ArrowUp, ArrowDown, FileText, Settings, BarChart3, User,
  Linkedin, Instagram, Youtube, Github, ThumbsUp, Repeat2, Building2
} from "lucide-react";
import linkedinPresentationImg from "@/imports/linkedin_presentation.jpg";

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
    <div className="mb-2.5 sm:mb-3">
      {/* Sub-section heading */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        <div className="h-px w-4 sm:w-5 bg-orange-500 animate-pulse shrink-0" />
        <span className="font-['Outfit',sans-serif] text-foreground font-black tracking-tight text-xl sm:text-2xl md:text-[28px] lg:text-[32px] leading-tight break-words">{children}</span>
      </div>
    </div>
  );
}

function SectionHeading({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={`font-['Outfit',sans-serif] font-medium leading-snug sm:leading-relaxed text-muted-foreground ${className} text-lg sm:text-2xl md:text-[28px] lg:text-[32px] break-words`}>{children}</h2>
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
      { name: "Products & Platforms", id: "products", desc: "" },
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
  "stories",
  "our-people",
  "thinking",
  "faq",
  "contact",
];

// ── Mega Menu Navbar ────────────────────────────────────────────────────────
const MEGA_ICONS: Record<string, React.ReactNode> = {
  "our-people": <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M11 14v-1a3 3 0 0 0-3-3H4a3 3 0 0 0-3 3v1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /><circle cx="6" cy="5" r="3" stroke="currentColor" strokeWidth="1.3" /></svg>,
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

  const navigate = useNavigate();
  const location = useLocation();

  const scrollTo = (id: string) => {
    if (id === "thinking" && location.pathname !== "/") {
      navigate("/insights");
      setOpenGroup(null);
      setMobileMenuOpen(false);
      return;
    }
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        if (id === "hero") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      if (id === "hero") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }
    }
    setOpenGroup(null);
    setMobileMenuOpen(false);
  };

  const handleLogoClick = () => {
    if (location.pathname !== "/") {
      navigate("/");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
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
      <nav className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-background/95 backdrop-blur-xl shadow-lg shadow-black/10 border-b border-border" : "bg-background/80 backdrop-blur-md border-b border-transparent"}`}>
        <div className="max-w-7xl mx-auto h-14 flex items-center justify-between px-3 sm:px-6 gap-x-2">

          {/* Logo */}
          <button onClick={handleLogoClick} className="shrink-0 flex items-center focus:outline-none cursor-pointer" aria-label="AskJuno Home">
            <ImageWithFallback src={dark ? logoDark : logoLight} alt="AskJuno" className="h-8 xs:h-9 sm:h-11 w-auto object-contain self-center" />
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
              className="lg:hidden flex items-center justify-center w-9 h-9 min-w-[36px] min-h-[36px] rounded-xl border border-border bg-card/80 text-foreground transition-all hover:border-orange-500/50 active:scale-95"
              aria-label="Toggle Navigation Menu">
              {mobileMenuOpen ? <X size={18} className="text-orange-500" /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile navigation drawer */}
      <div
        className={`fixed top-14 left-0 right-0 z-40 lg:hidden transition-all duration-300 origin-top overflow-hidden ${mobileMenuOpen ? "opacity-100 max-h-[calc(100dvh-56px)] pointer-events-auto" : "opacity-0 max-h-0 pointer-events-none"
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

// ── Side Dots ────────────────────────────────────────────────────────────────
function SideDots({ active, onDotClick }: { active: number; onDotClick: (i: number) => void }) {
  // Build flat dot list for all sections in page order
  const allDots = SECTION_IDS.map((id) => {
    const group = NAV_GROUPS.find(g => g.sub.some(s => s.id === id));
    const sub = group?.sub.find(s => s.id === id);
    const label = sub?.name ?? (id === "faq" ? "FAQ" : id === "contact" ? "Contact" : id === "our-people" ? "Our People" : id);
    return { label, id };
  });

  return (
    <nav
      aria-label="Section navigation"
      className="hidden md:flex fixed right-2.5 sm:right-4 md:right-5 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-2 sm:gap-2.5 select-none pointer-events-auto"
    >
      {allDots.map((dot, i) => {
        const isAct = active === i;
        return (
          <div key={dot.id || i} className="relative flex items-center justify-center">
            {/* Label — only visible for active section, horizontally aligned with marker */}
            {isAct && (
              <span
                className="absolute right-full mr-2.5 top-1/2 -translate-y-1/2 pointer-events-none font-['JetBrains_Mono',monospace] text-[9px] tracking-[0.12em] uppercase whitespace-nowrap font-bold text-orange-500 transition-all duration-300"
                style={{ color: "#f97316" }}
              >
                {dot.label}
              </span>
            )}

            {/* Dot button centered on vertical axis */}
            <button
              type="button"
              onClick={() => onDotClick(i)}
              className="group relative flex items-center justify-center w-4 h-4 rounded-full focus:outline-none focus-visible:ring-1 focus-visible:ring-orange-500"
              title={dot.label}
              aria-label={`Jump to ${dot.label}`}
              aria-current={isAct ? "true" : undefined}
            >
              <div
                className="rounded-full transition-all duration-300 shrink-0"
                style={{
                  width: isAct ? 10 : 5,
                  height: isAct ? 10 : 5,
                  background: isAct ? "#f97316" : "var(--border)",
                  boxShadow: isAct ? "0 0 10px rgba(249,115,22,0.55)" : "none",
                }}
              />
            </button>
          </div>
        );
      })}
    </nav>
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

// ── Theme Switcher (bottom left) ───────────────────────────────────────────
function ThemeToggle({ dark, setDark }: { dark: boolean; setDark: (v: boolean) => void }) {
  return (
    <button
      type="button"
      onClick={() => setDark(!dark)}
      className={`fixed bottom-4 left-3.5 sm:bottom-6 sm:left-6 md:bottom-7 md:left-7 z-50 group flex items-center gap-1.5 sm:gap-2 h-[29px] sm:h-[33px] px-2 sm:px-3 rounded-full border transition-all duration-350 ease-out select-none pointer-events-auto outline-none focus-visible:ring-2 focus-visible:ring-orange-500 shadow-sm hover:shadow-md active:scale-95 hover:-translate-y-0.5 cursor-pointer ${dark
        ? "bg-[#18130e]/95 border-stone-800 text-stone-100 hover:border-orange-500/50 shadow-black/50 hover:shadow-orange-500/10"
        : "bg-[#f5f2ea]/95 border-stone-300/80 text-stone-900 hover:border-orange-500/50 shadow-stone-900/5 hover:shadow-orange-500/10"
        } backdrop-blur-md`}
      title={dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      aria-label={dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {/* Icon with smooth rotation & fade: Moon in Light Mode, Sun in Dark Mode */}
      <div className="relative w-3.5 h-3.5 flex items-center justify-center flex-shrink-0">
        <Moon
          size={12.5}
          strokeWidth={2.4}
          className={`absolute text-[#f97316] transition-all duration-350 ease-out ${!dark
            ? "rotate-0 scale-100 opacity-100"
            : "-rotate-90 scale-0 opacity-0"
            }`}
        />
        <Sun
          size={13}
          strokeWidth={2.4}
          className={`absolute text-[#f97316] transition-all duration-350 ease-out ${dark
            ? "rotate-0 scale-100 opacity-100"
            : "rotate-90 scale-0 opacity-0"
            }`}
        />
      </div>

      {/* Target Mode Label: Shows ONLY the mode user can switch TO */}
      <span className="font-['JetBrains_Mono',monospace] text-[10px] sm:text-[10.5px] font-bold tracking-[0.12em] uppercase transition-colors duration-350">
        {dark ? "LIGHT" : "DARK"}
      </span>
    </button>
  );
}

// ── Quick section navigation arrows (bottom right) ──────────────────────────
function QuickNavArrows({ activeSection }: { activeSection: number }) {
  const [scrollState, setScrollState] = useState({ isHome: true, isCTA: false });

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const heroEl = document.getElementById("hero") || document.getElementById("Home");
      const contactEl = document.getElementById("contact");

      // Home boundary check: at top of page or within hero section
      const heroHeight = heroEl ? heroEl.offsetHeight : 600;
      const isHome = scrollY < 120 || (heroEl && scrollY < heroHeight * 0.65);

      // CTA boundary check: once user reaches the CTA/Contact section
      let isCTA = false;
      if (contactEl) {
        const contactRect = contactEl.getBoundingClientRect();
        isCTA = contactRect.top <= window.innerHeight * 0.45;
      } else {
        const docHeight = document.documentElement.scrollHeight;
        isCTA = scrollY + window.innerHeight >= docHeight - 250;
      }

      setScrollState({ isHome, isCTA });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // Home: activeSection === 0 or within hero scroll bounds
  const isHome = activeSection === 0 || scrollState.isHome;
  // CTA: activeSection === 13 or contact section reached
  const isCTA = activeSection >= 13 || scrollState.isCTA;

  // Up arrow: hidden on Home, visible everywhere else
  const showUp = !isHome;
  // Down arrow: visible from Home through FAQ, hidden once CTA is reached
  const showDown = !isCTA;

  const scrollToHome = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToCTA = () => {
    const ctaEl = document.getElementById("contact");
    if (ctaEl) {
      ctaEl.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" });
    }
  };

  if (!showUp && !showDown) return null;

  return (
    <div
      className="fixed bottom-4 right-3.5 sm:bottom-6 sm:right-6 md:bottom-7 md:right-7 z-50 flex flex-col gap-1.5 sm:gap-2 select-none pointer-events-auto"
      aria-label="Section quick navigation"
    >
      {/* Up Arrow -> Home / Hero section (hidden on Home) */}
      {showUp && (
        <button
          type="button"
          onClick={scrollToHome}
          className="group w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-border bg-card/90 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-orange-500 hover:border-orange-500 hover:bg-orange-500/10 active:scale-95 hover:-translate-y-0.5 transition-all shadow-lg hover:shadow-orange-500/20"
          title="Back to Top"
          aria-label="Scroll directly to Home"
        >
          <ArrowUp size={14} className="transition-transform duration-200 group-hover:-translate-y-0.5 sm:w-4 sm:h-4" strokeWidth={2.2} />
        </button>
      )}

      {/* Down Arrow -> CTA / Contact section (hidden on CTA) */}
      {showDown && (
        <button
          type="button"
          onClick={scrollToCTA}
          className="group w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-border bg-card/90 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-orange-500 hover:border-orange-500 hover:bg-orange-500/10 active:scale-95 hover:translate-y-0.5 transition-all shadow-lg hover:shadow-orange-500/20"
          title="Go to CTA / Contact"
          aria-label="Scroll directly to CTA / Contact section"
        >
          <ArrowDown size={14} className="transition-transform duration-200 group-hover:translate-y-0.5 sm:w-4 sm:h-4" strokeWidth={2.2} />
        </button>
      )}
    </div>
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
      <div id="Home" className="absolute top-0 left-0 pointer-events-none" aria-hidden="true" />
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full pt-20 sm:pt-24 lg:pt-28 pb-12 sm:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_440px] gap-8 sm:gap-12 xl:gap-24 items-center">

          {/* ── LEFT ── */}
          <div>
            {/* Headline */}
            <div className="hero-animate-2 mb-4 sm:mb-5">
              <h1 className="font-['Outfit',sans-serif] font-black leading-[1.12] sm:leading-[1.08] tracking-tight text-foreground text-3xl xs:text-4xl sm:text-5xl lg:text-[54px] xl:text-[60px]"
                style={{ fontSize: "clamp(1.85rem, 5vw, 3.8rem)" }}>
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
            <div className="hero-animate-4 flex flex-wrap gap-1.5 sm:gap-2 mb-6 sm:mb-7">
              {[
                { emoji: "⚙️", text: "Enterprise Engineering" },
                { emoji: "🤖", text: "AI-Powered Automation" },
                { emoji: "🔐", text: "Security-First" },
                { emoji: "📈", text: "Built to Scale" },
              ].map(({ emoji, text }, i) => (
                <span key={i} className="flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-[11px] sm:text-[12px] font-['Outfit',sans-serif] font-semibold border transition-all duration-300 cursor-default hover:scale-105"
                  style={{ borderColor: "rgba(249,115,22,0.2)", background: "rgba(249,115,22,0.04)", color: "var(--muted-foreground)" }}>
                  <span>{emoji}</span> {text}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="hero-animate-5 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                className="group relative flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full font-['Outfit',sans-serif] font-bold text-white text-[14.5px] sm:text-[15px] overflow-hidden transition-all hover:scale-105 active:scale-95 text-center shadow-lg cursor-pointer"
                style={{ background: ORANGE, boxShadow: "0 6px 32px rgba(249,115,22,0.45), 0 0 0 1px rgba(249,115,22,0.2)" }}
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "linear-gradient(160deg, #fb923c 0%, #ea6e00 100%)" }} />
                <span className="relative z-10">{"Let's Build Together"}</span>
                <ArrowRight size={15} className="relative z-10 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                className="flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full border font-['Outfit',sans-serif] font-semibold text-foreground text-[14.5px] sm:text-[15px] transition-all hover:scale-105 active:scale-95 text-center cursor-pointer"
                style={{ borderColor: "var(--border)" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(249,115,22,0.5)"; (e.currentTarget as HTMLElement).style.color = "#f97316"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.color = "var(--foreground)"; }}
                onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}>
                Explore Our Work
              </button>
            </div>

            {/* Metric strip */}

          </div>

          {/* ── RIGHT — Pipeline card (Responsive on all devices) ── */}
          <div className="relative w-full max-w-lg mx-auto lg:max-w-none mt-6 sm:mt-8 lg:mt-0">
            {/* Floating badges (contained gracefully) */}
            <FloatingBadge className="hidden sm:flex top-[-16px] left-0 sm:left-[-20px] lg:left-[-44px]" animClass="badge-1">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="font-['JetBrains_Mono',monospace] text-[9px] text-foreground font-bold">99.9% uptime SLA</span>
            </FloatingBadge>
            <FloatingBadge className="hidden sm:flex top-[50px] sm:top-[68px] right-0 sm:right-[-20px] lg:right-[-60px]" animClass="badge-2">
              <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse shrink-0" />
              <span className="font-['JetBrains_Mono',monospace] text-[9px] text-foreground font-bold whitespace-nowrap">5+ Projects · 99% On Time · 4+ Clients</span>
            </FloatingBadge>
            <FloatingBadge className="hidden sm:flex bottom-[60px] sm:bottom-[88px] right-0 sm:right-[-20px] lg:right-[-60px]" animClass="badge-3">
              <span>🔐</span>
              <span className="font-['JetBrains_Mono',monospace] text-[9px] text-foreground font-bold">Enterprise grade security</span>
            </FloatingBadge>
            <FloatingBadge className="hidden sm:flex bottom-[-16px] left-[16px]" animClass="badge-4">
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
                  <span className="font-['JetBrains_Mono',monospace] text-[10px] tracking-widest text-muted-foreground">askjuno.com</span>
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
  const BELIEF_PILLARS = [
    {
      num: "01",
      title: "Business First",
      desc: "Technology should create measurable business value.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      ),
    },
    {
      num: "02",
      title: "Engineering That Lasts",
      desc: "Build for today, engineer for tomorrow.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
    },
    {
      num: "03",
      title: "AI With Purpose",
      desc: "Use AI where it solves real problems.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="m12 3-1.9 6.1a2 2 0 0 1-1.2 1.2L3 12l6.1 1.9a2 2 0 0 1 1.2 1.2L12 21l1.9-6.1a2 2 0 0 1 1.2-1.2L21 12l-6.1-1.9a2 2 0 0 1-1.2-1.2Z" />
        </svg>
      ),
    },
    {
      num: "04",
      title: "Built Around You",
      desc: "Technology should fit the way your business works.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
  ];

  return (
    <section id="about" className="pt-16 pb-12 sm:pt-20 sm:pb-16 lg:pt-24 lg:pb-18 bg-background relative overflow-hidden flex flex-col justify-center transition-colors duration-200">
      {/* Background ambient accents */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{ backgroundImage: "radial-gradient(circle, #f97316 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      <div className="absolute top-0 right-0 w-[550px] h-[550px] opacity-[0.04] dark:opacity-[0.07] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, #f97316 0%, transparent 70%)" }} />

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Top Two-Column Block: Heading & Story Paragraphs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-14 items-start">
          {/* Left Column: Eyebrow + Main Heading */}
          <div className="lg:col-span-5 xl:col-span-5 flex flex-col">
            <FadeIn delay={0.05} className="mb-3 sm:mb-4">
              <div className="flex items-center gap-2">
                <span className="text-[#f97316] font-bold text-sm">—</span>
                <span className="font-['JetBrains_Mono',monospace] text-[11px] sm:text-[12px] uppercase font-bold text-[#f97316] tracking-[0.2em]">
                  ABOUT ASKJUNO
                </span>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h2 className="font-['Outfit',sans-serif] font-bold text-[26px] xs:text-[30px] sm:text-[38px] md:text-[42px] lg:text-[46px] xl:text-[48px] leading-[1.12] -tracking-[0.025em] text-stone-900 dark:text-white">
                We Build Software Around<br />
                How Your Business<br />
                <span className="text-[#f97316]">Actually Works.</span>
              </h2>
            </FadeIn>
          </div>

          {/* Right Column: Paragraphs with Orange Left Border */}
          <div className="lg:col-span-7 xl:col-span-7">
            <FadeIn delay={0.15}>
              <div className="border-l-2 border-[#f97316] pl-4 sm:pl-7 flex flex-col gap-3 text-stone-600 dark:text-stone-300 font-['Outfit',sans-serif] text-[13px] sm:text-[14px] leading-[1.65]">
                <p>
                  AskJuno is an enterprise software engineering and AI company that turns complex business processes into scalable, intelligent technology.
                </p>
                <p>
                  We help organizations go beyond the limitations of off-the-shelf software — modernizing legacy systems, building mission-critical platforms, integrating enterprise applications, and applying AI to eliminate manual, document-heavy operations.
                </p>
                <p>
                  Bringing together software engineering, AI, cloud, data, and domain expertise, we build technology designed for the real world, reliable, scalable, and built around how your business operates.
                </p>
                <p>
                  From intelligent document processing and automated workflows to custom SaaS platforms and enterprise integrations, we take ownership from strategy and architecture through engineering, deployment, and continuous improvement.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Middle Block: WHAT WE BELIEVE */}
        <div className="mt-12 sm:mt-16 lg:mt-20">
          <FadeIn delay={0.2} className="mb-6 sm:mb-8">
            <div className="flex items-center gap-2">
              <span className="text-[#f97316] font-bold text-sm">—</span>
              <span className="font-['JetBrains_Mono',monospace] text-[11px] sm:text-[12px] uppercase font-bold text-[#f97316] tracking-[0.2em]">
                WHAT WE BELIEVE
              </span>
            </div>
          </FadeIn>

          {/* 4 Pillars in a row with subtle vertical divider borders */}
          <FadeIn delay={0.25} className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-0 lg:divide-x lg:divide-border/60">
              {BELIEF_PILLARS.map((card, i) => (
                <div
                  key={i}
                  className={`flex flex-col text-left ${i === 0
                    ? "lg:pr-7"
                    : i === 3
                      ? "lg:pl-7"
                      : "lg:px-7"
                    }`}
                >
                  <div className="flex items-center gap-3 mb-2.5 sm:mb-3">
                    <div className="text-[#f97316] flex-shrink-0">
                      {card.icon}
                    </div>
                    <span className="font-['JetBrains_Mono',monospace] text-[12px] font-semibold text-stone-400 dark:text-stone-500">
                      {card.num}
                    </span>
                  </div>
                  <h4 className="font-['Outfit',sans-serif] text-[16px] sm:text-[18px] font-bold text-stone-900 dark:text-white mb-1 leading-snug">
                    {card.title}
                  </h4>
                  <p className="font-['Outfit',sans-serif] text-[12.5px] sm:text-[13.5px] text-stone-600 dark:text-stone-400 leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>

        {/* Bottom Strip: SPECIALISING IN ENTERPRISE SOFTWARE • AI • PLATFORM ENGINEERING */}
        <FadeIn delay={0.3} className="mt-10 sm:mt-14 w-full">
          <div className="w-full rounded-2xl sm:rounded-full border border-border/80 bg-card/40 dark:bg-card/20 px-4 py-3 sm:px-8 sm:py-4 flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-4 shadow-sm text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start">
              <span className="font-['JetBrains_Mono',monospace] text-[10px] xs:text-[11px] sm:text-[12px] uppercase font-bold text-stone-700 dark:text-stone-300 tracking-[0.06em] sm:tracking-[0.16em] leading-relaxed">
                SPECIALISING IN ENTERPRISE SOFTWARE &nbsp;•&nbsp; AI &nbsp;•&nbsp; PLATFORM ENGINEERING
              </span>
            </div>
            <div className="flex items-center justify-center sm:justify-end">
              <span className="font-['Outfit',sans-serif] text-[12px] sm:text-[13.5px] font-medium text-stone-700 dark:text-stone-300">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 items-end mb-5">
          <FadeIn>
            <SectionLabel group="What We Build">What We Do</SectionLabel>
            <SectionHeading>
              Solutions That<br />
              <GradientText>Power Modern Business.</GradientText>
            </SectionHeading>
          </FadeIn>
          <FadeIn delay={0.12}>
            <p className="font-['Outfit',sans-serif] text-muted-foreground text-xs sm:text-sm leading-[1.6]">
              {"Whether you're"} building a new digital product, modernizing legacy systems, or integrating AI into your operations, we deliver end-to-end engineering solutions designed for long-term business impact.
            </p>
          </FadeIn>
        </div>

        {/* Interactive split layout */}
        <FadeIn delay={0.1}>
          <div className="rounded-2xl sm:rounded-3xl border border-border overflow-hidden shadow-2xl shadow-black/10"
            style={{ background: "var(--card)" }}>
            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr]">

              {/* Left tab rail */}
              <div className="border-b lg:border-b-0 lg:border-r border-border relative">
                {/* Active indicator track */}
                <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-px bg-border" />

                <div className="p-3 sm:p-4 lg:p-6">
                  <p className="font-['JetBrains_Mono',monospace] text-[9px] tracking-[2px] uppercase text-muted-foreground mb-3 sm:mb-4 px-2">Service Areas</p>
                  <div className="flex lg:flex-col gap-1.5 sm:gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0" style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}>
                    {SERVICE_CARDS.map((sc, i) => {
                      const isTab = active === i;
                      return (
                        <button
                          key={i}
                          onClick={() => handleTabClick(i)}
                          className="shrink-0 lg:w-full text-left flex items-center gap-2.5 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl transition-all duration-300 group relative overflow-hidden"
                          style={{
                            background: isTab ? `${sc.accent}14` : "transparent",
                            border: isTab ? `1px solid ${sc.accent}35` : "1px solid transparent",
                          }}>
                          {/* Active left pip */}
                          <div className="hidden lg:block absolute left-0 top-3 bottom-3 w-0.5 rounded-full transition-all duration-300"
                            style={{ background: sc.accent, opacity: isTab ? 1 : 0 }} />
                          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300"
                            style={{
                              color: isTab ? sc.accent : "var(--muted-foreground)",
                              background: isTab ? `${sc.accent}15` : "transparent",
                            }}>
                            {sc.icon}
                          </div>
                          <span className="font-['Outfit',sans-serif] text-xs sm:text-sm font-semibold transition-colors duration-300 whitespace-nowrap lg:whitespace-normal"
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
              <div className="p-4 sm:p-6 lg:p-12 relative overflow-hidden">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 items-end mb-4">
          <FadeIn>
            <SectionLabel group="Where We Create Impact">Industries We Transform</SectionLabel>
            <SectionHeading>
              Built for the Way Your<br />
              <GradientText>Industry Operates.</GradientText>
            </SectionHeading>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="font-['Outfit',sans-serif] text-muted-foreground leading-[1.65] text-xs sm:text-[15px]">
              Every industry has its own workflows, regulations, and operational challenges. We combine engineering expertise with domain knowledge to build software that fits the way your business works — not the other way around.
            </p>
          </FadeIn>
        </div>

        <FadeIn delay={0.1}>
          {/* Tab strip */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-5">
            {INDUSTRIES.map((ind, i) => {
              const isAct = active === i;
              return (
                <button key={i} onClick={() => setActive(i)}
                  className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border font-['Outfit',sans-serif] text-xs sm:text-sm font-semibold transition-all duration-300"
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
            <div className="rounded-2xl sm:rounded-3xl border overflow-hidden"
              style={{ borderColor: "rgba(249,115,22,0.2)", background: "var(--card)", boxShadow: "0 16px 48px rgba(249,115,22,0.08)" }}>
              {/* Top accent */}
              <div className="h-[3px]" style={{ background: "linear-gradient(90deg,#f97316,#f59e0b)" }} />

              <div className="p-4 sm:p-6 lg:p-10">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 items-end mb-6">
          <FadeIn>
            <SectionLabel group="How We Build">How We Build</SectionLabel>
            <SectionHeading>From Vision<br /><GradientText>to Value.</GradientText></SectionHeading>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="font-['Outfit',sans-serif] text-muted-foreground text-xs sm:text-sm leading-[1.65]">
              Every successful product starts with understanding the business behind it. Our engineering approach combines strategic thinking, agile execution, and continuous collaboration to deliver software that creates measurable impact.
            </p>
          </FadeIn>
        </div>

        <FadeIn delay={0.1}>
          <div className="flex flex-col lg:flex-row items-center gap-6 sm:gap-10 lg:gap-8">

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
            <h2 className="font-['Outfit',sans-serif] font-black text-[26px] xs:text-[30px] sm:text-[38px] lg:text-[42px] leading-[1.12] sm:leading-[1.1] -tracking-[0.02em] text-foreground">
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

// ── 4b. Our Approach ─────────────────────────────────────────────────────────
const APPROACH_STEPS = [
  {
    num: "01",
    icon: <Lightbulb size={22} className="text-foreground" strokeWidth={1.2} />,
    title: "Understand & Strategize",
    tagline: "Before we build, we understand.",
    desc: "We dive into your business, users, workflows, existing technology and challenges — and define what success looks like.",
    items: [
      "Business & process discovery",
      "Requirements & opportunity analysis",
      "Technology feasibility",
      "Solution strategy & architecture",
      "Product roadmap",
    ],
  },
  {
    num: "02",
    icon: <Code2 size={22} className="text-foreground" strokeWidth={1.2} />,
    title: "Design & Engineer",
    tagline: "Turn the strategy into working technology.",
    desc: "Our engineering teams bring the solution to life through focused execution, continuous collaboration, and disciplined development.",
    items: [
      "Product & technical design",
      "Agile engineering",
      "AI & automation integration",
      "API & enterprise integrations",
      "Continuous testing & QA",
    ],
  },
  {
    num: "03",
    icon: <Cloud size={22} className="text-foreground" strokeWidth={1.2} />,
    title: "Launch & Operationalize",
    tagline: "Software creates value when people can rely on it.",
    desc: "We take solutions beyond development and into real-world operation — with the infrastructure, security, and support needed for production.",
    items: [
      "Deployment & cloud infrastructure",
      "Production readiness",
      "Security & performance",
      "Monitoring & observability",
      "User adoption & support",
    ],
  },
  {
    num: "04",
    icon: <TrendingUp size={22} className="text-foreground" strokeWidth={1.2} />,
    title: "Scale & Evolve",
    tagline: "The launch isn't the finish line.",
    desc: "As your business grows, we stay involved to improve performance, expand capabilities, integrate new systems, and identify what's next.",
    items: [
      "Continuous improvement",
      "Product & feature evolution",
      "Performance optimization",
      "New integrations & capabilities",
      "Long-term advisory",
    ],
  },
];

function HowWePartnerSection() {
  return (
    <section id="approach" className="py-20 md:py-28 bg-background relative overflow-hidden flex flex-col justify-center">
      {/* Background hero image with gradients */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <img
          src={approachImg}
          alt="Engineering Workstation"
          className="absolute right-0 top-0 w-full lg:w-[58%] h-[580px] object-cover object-center opacity-25 dark:opacity-40"
        />
        {/* Soft edge masking gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 lg:via-background/85 to-transparent w-full" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background" />
        <div className="absolute top-1/4 right-1/4 w-[450px] h-[450px] rounded-full bg-orange-500/10 blur-3xl pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">

        {/* Header Block */}
        <FadeIn className="mb-10 sm:mb-16 lg:mb-20">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 sm:gap-8">
            {/* Left Header */}
            <div className="max-w-2xl">
              {/* Eyebrow */}
              <div className="flex items-center gap-2.5 mb-3 sm:mb-4">
                <span className="w-5 h-[2px] bg-orange-500 rounded-full" />
                <span className="font-['Outfit',sans-serif] font-bold text-foreground text-xs sm:text-sm tracking-wide">
                  Our Approach
                </span>
              </div>

              {/* Heading */}
              <h2 className="font-['Outfit',sans-serif] font-black text-[28px] xs:text-[34px] sm:text-[44px] lg:text-[54px] leading-[1.08] -tracking-[0.02em] text-foreground mb-4 sm:mb-5">
                From Understanding<br />
                <GradientText>to Impact.</GradientText>
              </h2>

              {/* Description */}
              <div className="font-['Outfit',sans-serif] text-[14px] sm:text-[14.5px] text-muted-foreground leading-[1.65] space-y-3">
                <p>
                  Great software doesn&apos;t start with code. It starts with understanding
                  your business, your people, and the problems you&apos;re solving.
                </p>
                <p>
                  At AskJuno, we work alongside you through the entire journey —
                  from shaping the right solution to building, launching, and continuously
                  evolving it as your business grows.
                </p>
              </div>
            </div>

            {/* Right Callout Box */}
            <div className="hidden lg:flex items-center self-center shrink-0 pr-6">
              <div className="border-l-2 border-orange-500 pl-4 py-1">
                <p className="font-['Outfit',sans-serif] text-[14.5px] text-muted-foreground/90 font-medium leading-[1.6]">
                  Real problems.<br />
                  Thoughtful solutions.<br />
                  Lasting impact.
                </p>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* 4 Connected Process Steps */}
        <FadeIn delay={0.15}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-8">
            {APPROACH_STEPS.map((step, idx) => (
              <div key={step.num} className="relative flex flex-col justify-between">
                <div>
                  {/* Step Number & Connector Line */}
                  <div className="relative flex items-center mb-6">
                    {/* Numbered Circle */}
                    <div className="w-9 h-9 rounded-full border border-orange-500/80 bg-background text-orange-500 font-['JetBrains_Mono',monospace] text-xs font-bold flex items-center justify-center shrink-0 shadow-sm shadow-orange-500/10 z-10">
                      {step.num}
                    </div>

                    {/* Desktop Connector Line across column gap to next circle */}
                    {idx < APPROACH_STEPS.length - 1 && (
                      <div
                        className="hidden lg:flex absolute top-1/2 -translate-y-1/2 left-9 right-[-2rem] items-center pointer-events-none z-0"
                        aria-hidden="true"
                      >
                        <div className="flex-1 h-px bg-border/70" />
                        <ChevronRight size={13} className="text-muted-foreground/60 shrink-0 mx-1" />
                        <div className="flex-1 h-px bg-border/70" />
                      </div>
                    )}

                    {/* Tablet/Mobile separator within each item */}
                    <div className="lg:hidden flex-1 h-px bg-border/40 ml-3" />
                  </div>

                  {/* Icon Circle */}
                  <div className="w-12 h-12 rounded-full border border-border/80 bg-card/60 flex items-center justify-center mb-5 sm:mb-6 shrink-0">
                    {step.icon}
                  </div>

                  {/* Title */}
                  <h3 className="font-['Outfit',sans-serif] font-bold text-[18px] sm:text-[19px] text-foreground leading-snug mb-2.5 sm:mb-3 lg:min-h-[50px] flex items-start">
                    {step.title}
                  </h3>

                  {/* Tagline */}
                  <p className="font-['Outfit',sans-serif] text-[13px] text-muted-foreground font-medium mb-4 sm:mb-5 lg:min-h-[38px] flex items-start">
                    {step.tagline}
                  </p>

                  {/* Description */}
                  <p className="font-['Outfit',sans-serif] text-[12.5px] sm:text-[13px] text-muted-foreground leading-relaxed mb-6 lg:min-h-[82px]">
                    {step.desc}
                  </p>
                </div>

                {/* Checklist */}
                <div className="space-y-2.5 pt-5 mt-auto border-t border-border/40">
                  {step.items.map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <Check size={14} className="text-orange-500 shrink-0 mt-0.5" strokeWidth={2.5} />
                      <span className="font-['Outfit',sans-serif] text-xs sm:text-[13px] text-muted-foreground leading-snug">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
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
            <div className="h-1.5 rounded-full" style={{ background: "rgba(0,0,0,0.06)" }}>
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
            <div className="h-1.5 rounded-full" style={{ background: "rgba(0,0,0,0.06)" }}>
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
    name: "MediGuard",
    tag: "Healthcare · Medication Safety",
    tagline: "Safer OTC Decisions at the Point of Purchase.",
    desc: "An interactive pharmacy-based medication safety platform that helps customers make informed over-the-counter medication decisions while strengthening pharmacist engagement and clinical oversight — all without collecting sensitive personal data.",
    impact: "Reduce medication errors, increase consumer confidence, and give pharmacies a technology-enabled safety service that differentiates their practice.",
    caps: [
      { icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.2" /><path d="M8 5v6M5 8h6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /></svg>, label: "Medication Safety Screening" },
      { icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="5" stroke="currentColor" strokeWidth="1.2" /><path d="M8 5v3l2 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /></svg>, label: "Duplicate Therapy Detection" },
      { icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M8 3v10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.2" /></svg>, label: "Drug-to-Drug Interaction Review" },
      { icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 12l3-5 3 3 2-3 3 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>, label: "Beers Criteria — Senior Safety" },
      { icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 3h10v10H3z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" /><path d="M6 7h4M6 9h2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /></svg>, label: "Consumer Medication Reports" },
      { icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2a4 4 0 100 8 4 4 0 000-8zM4.5 11.5C3 12.5 2 14 2 14h12s-1-1.5-2.5-2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /></svg>, label: "Privacy-First · No PHI Required" },
    ],
    cta: "Learn About MediGuard",
    accent: "#f8872aff",
    visual: (
      <div className="w-full rounded-2xl p-5 font-['Outfit',sans-serif]"
        style={{ background: "var(--card)", border: "1px solid var(--border)", boxShadow: "0 20px 60px rgba(16,185,129,0.08)" }}>
        <div className="flex items-center justify-between mb-4">
          <span className="font-black text-sm text-foreground">Medication Review</span>
          <span className="text-[10px] font-['JetBrains_Mono',monospace] tracking-widest uppercase px-2 py-1 rounded-md" style={{ color: "#10b981", background: "rgba(16,185,129,0.1)" }}>Kiosk Active</span>
        </div>
        {[
          { label: "Duplicate Therapy", result: "⚠ Found", note: "2 products with Acetaminophen detected", col: "#f59e0b" },
          { label: "Drug Interactions", result: "✓ Clear", note: "No interactions identified", col: "#10b981" },
          { label: "Beers Criteria", result: "⚠ Review", note: "Senior safety flag raised", col: "#f97316" },
          { label: "Consumer Report", result: "✓ Ready", note: "Summary generated for customer", col: "#10b981" },
        ].map((row, i) => (
          <div key={i} className="mb-2.5 p-2.5 rounded-xl" style={{ background: "rgba(0,0,0,0.03)", border: "1px solid var(--border)" }}>
            <div className="flex items-center justify-between mb-0.5">
              <span className="text-xs font-semibold text-foreground">{row.label}</span>
              <span className="text-[10px] font-bold" style={{ color: row.col }}>{row.result}</span>
            </div>
            <span className="text-[10px] text-muted-foreground">{row.note}</span>
          </div>
        ))}
        <div className="grid grid-cols-3 gap-2 mt-3 pt-3" style={{ borderTop: "1px solid var(--border)" }}>
          {[["OTC", "Focused"], ["0 PHI", "Collected"], ["FDA", "Aligned"]].map(([val, lbl]) => (
            <div key={lbl} className="text-center">
              <div className="font-black text-sm" style={{ backgroundImage: "linear-gradient(135deg,#10b981,#059669)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{val}</div>
              <div className="text-[9px] font-['JetBrains_Mono',monospace] tracking-widest uppercase text-muted-foreground">{lbl}</div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    num: "04",
    name: "FinReview AI",
    tag: "Audit · Financial Intelligence",
    tagline: "Hours of Review. Minutes of Verification.",
    desc: "An automated financial statement verification platform that performs every mechanical audit check instantly — mathematical accuracy, prior year consistency, note-to-statement agreement, going concern signals, and audit report review against ISA standards.",
    impact: "Audit teams receive a structured, evidence-backed findings report in minutes — freeing expert time for professional judgment rather than arithmetic.",
    caps: [
      { icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 11l3-4 3 3 3-5 3 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>, label: "Mathematical Accuracy Verification" },
      { icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 4h12v2H2zM2 8h9v2H2zM2 12h6v2H2z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" /></svg>, label: "Prior Year Consistency Review" },
      { icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1" y="5" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.2" /><rect x="9" y="5" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.2" /><path d="M7 8h2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /></svg>, label: "Note-to-Statement Agreement" },
      { icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="5" stroke="currentColor" strokeWidth="1.2" /><path d="M8 5v3l2 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /></svg>, label: "Audit Report Review (ISA)" },
      { icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2v4l3 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.2" /></svg>, label: "Going Concern Indicators" },
      { icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 3h10v10H3z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" /><path d="M6 7h4M6 9h3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /></svg>, label: "Evidence Trail & Audit Documentation" },
    ],
    cta: "Explore FinReview AI",
    accent: "#f8872a",
    visual: (
      <div className="w-full rounded-2xl p-5 font-['Outfit',sans-serif]"
        style={{ background: "var(--card)", border: "1px solid var(--border)", boxShadow: "0 20px 60px rgba(99,102,241,0.08)" }}>
        <div className="flex items-center justify-between mb-4">
          <span className="font-black text-sm text-foreground">Statement Verification</span>
          <span className="text-[10px] font-['JetBrains_Mono',monospace] tracking-widest uppercase px-2 py-1 rounded-md" style={{ color: "#6366f1", background: "rgba(99,102,241,0.1)" }}>Auto Review</span>
        </div>
        {[
          { check: "Mathematical Accuracy", result: "✓ Pass", detail: "248 totals verified — all correct", col: "#10b981" },
          { check: "Prior Year Consistency", result: "⚠ 2 Flags", detail: "Discrepancies on pg. 12 & 18", col: "#f59e0b" },
          { check: "Note-to-Statement", result: "✓ Pass", detail: "All note values reconciled", col: "#10b981" },
          { check: "Going Concern", result: "⚠ Signals", detail: "Negative equity detected", col: "#f97316" },
        ].map((row, i) => (
          <div key={i} className="mb-2.5 p-2.5 rounded-xl" style={{ background: "rgba(0,0,0,0.03)", border: "1px solid var(--border)" }}>
            <div className="flex items-center justify-between mb-0.5">
              <span className="text-xs font-semibold text-foreground">{row.check}</span>
              <span className="text-[10px] font-bold" style={{ color: row.col }}>{row.result}</span>
            </div>
            <span className="text-[10px] text-muted-foreground">{row.detail}</span>
          </div>
        ))}
        <div className="grid grid-cols-3 gap-2 mt-3 pt-3" style={{ borderTop: "1px solid var(--border)" }}>
          {[["<3min", "Per Report"], ["100%", "Coverage"], ["ISA", "Aligned"]].map(([val, lbl]) => (
            <div key={lbl} className="text-center">
              <div className="font-black text-sm" style={{ backgroundImage: "linear-gradient(135deg,#6366f1,#818cf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{val}</div>
              <div className="text-[9px] font-['JetBrains_Mono',monospace] tracking-widest uppercase text-muted-foreground">{lbl}</div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    num: "05",
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
      <div id="platforms" className="absolute -top-20" />
      <div id="platform-and-product" className="absolute -top-20" />
      <div id="products-and-platforms" className="absolute -top-20" />
      <div className="absolute top-0 inset-x-0 h-px" style={{ background: "linear-gradient(90deg, transparent 0%, rgba(249,115,22,0.3) 50%, transparent 100%)" }} />

      <style>{`
        @keyframes slide-up-in   { from { opacity:0; transform:translateY(48px);  } to { opacity:1; transform:translateY(0); } }
        @keyframes slide-down-in { from { opacity:0; transform:translateY(-48px); } to { opacity:1; transform:translateY(0); } }
        .prod-enter-up   { animation: slide-up-in   0.5s cubic-bezier(0.22,1,0.36,1) both; }
        .prod-enter-down { animation: slide-down-in 0.5s cubic-bezier(0.22,1,0.36,1) both; }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Header */}
        <FadeIn className="mb-6 sm:mb-10">
          <SectionLabel group="Our Expertise">Products & Platforms</SectionLabel>
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
const SUCCESS_STORIES = [
  {
    id: "pharma",
    category: "PHARMACEUTICAL",
    title: "AI-Powered Document Intelligence for a Pharmaceutical Enterprise",
    desc: "Automated document extraction, validation, and workflow orchestration to reduce manual effort and accelerate time-to-market.",
    challenge: "Thousands of distributor and stockist reports were processed manually, leading to delays, inconsistencies, and limited visibility into sales performance.",
    solution: "Implemented an AI-powered document intelligence platform to extract, validate, normalize, and consolidate data from multiple document formats into a single operational view.",
    impact: ["Reduced manual processing effort", "Improved data accuracy", "Faster sales reporting", "Better operational visibility"],
    borderColor: "border-l-4 border-l-[#f97316]",
    tagColor: "text-[#f97316]",
    iconBg: "bg-orange-500/10 dark:bg-orange-500/15 text-[#f97316]",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" />
        <path d="m8.5 8.5 7 7" />
      </svg>
    ),
  },
  {
    id: "enterprise",
    category: "ENTERPRISE",
    title: "Modernizing Enterprise Operations",
    desc: "Migrated legacy systems to a scalable cloud platform, improving performance, security, and operational efficiency.",
    challenge: "Legacy systems slowed business processes and made it difficult to integrate with modern applications, limiting the organization's ability to scale.",
    solution: "Designed and developed a scalable cloud-native platform with seamless system integrations and an improved user experience built for long-term growth.",
    impact: ["Faster business processes", "Improved scalability", "Enhanced user adoption", "Reduced operational overhead"],
    borderColor: "border-l-4 border-l-blue-500",
    tagColor: "text-blue-500",
    iconBg: "bg-blue-500/10 dark:bg-blue-500/15 text-blue-500",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
        <path d="M9 22v-4h6v4" />
        <path d="M8 6h.01" />
        <path d="M16 6h.01" />
        <path d="M12 6h.01" />
        <path d="M12 10h.01" />
        <path d="M12 14h.01" />
        <path d="M16 10h.01" />
        <path d="M16 14h.01" />
        <path d="M8 10h.01" />
        <path d="M8 14h.01" />
      </svg>
    ),
  },
  {
    id: "operations",
    category: "OPERATIONS",
    title: "Intelligent Workflow Automation",
    desc: "Automated complex workflows with AI and integration, reducing cycle time and improving accuracy across teams.",
    challenge: "Teams spent significant time on repetitive manual tasks across multiple business functions, limiting productivity and creating error-prone handoffs.",
    solution: "Developed AI-powered workflow automation to eliminate repetitive processes, reduce friction between teams, and improve decision support across functions.",
    impact: ["Faster turnaround times", "Fewer manual errors", "Increased productivity", "Better decision support"],
    borderColor: "border-l-4 border-l-emerald-500",
    tagColor: "text-emerald-500",
    iconBg: "bg-emerald-500/10 dark:bg-emerald-500/15 text-emerald-500",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
];

const SUCCESS_METRICS = [
  {
    num: "5+",
    label: "PROJECTS DELIVERED",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
      </svg>
    ),
  },
  {
    num: "15+",
    label: "BUSINESSES SERVED",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
        <path d="M9 22v-4h6v4" />
        <path d="M8 6h.01" />
        <path d="M16 6h.01" />
        <path d="M12 6h.01" />
        <path d="M12 10h.01" />
        <path d="M12 14h.01" />
        <path d="M16 10h.01" />
        <path d="M16 14h.01" />
        <path d="M8 10h.01" />
        <path d="M8 14h.01" />
      </svg>
    ),
  },
  {
    num: "6",
    label: "INDUSTRIES",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
        <path d="M17 18h1" />
        <path d="M12 18h1" />
        <path d="M7 18h1" />
      </svg>
    ),
  },
  {
    num: "95%",
    label: "CLIENT RETENTION",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    num: "5+",
    label: "YEARS EXPERIENCE",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
        <line x1="16" x2="16" y1="2" y2="6" />
        <line x1="8" x2="8" y1="2" y2="6" />
        <line x1="3" x2="21" y1="10" y2="10" />
      </svg>
    ),
  },
];

function StoriesSection() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section
      id="stories"
      className="py-6 sm:py-8 lg:py-4 xl:py-6 lg:min-h-screen lg:max-h-screen relative overflow-hidden flex flex-col justify-center bg-[#faf8f5] dark:bg-[#0c0c0e] transition-colors duration-200"
    >
      {/* Background ambient warm glows matching design */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />
      <div className="absolute -bottom-24 -left-20 w-[420px] h-[420px] rounded-full bg-gradient-to-tr from-amber-500/15 via-orange-500/10 to-transparent blur-3xl pointer-events-none animate-pulse-soft" />
      <div className="absolute -bottom-24 -right-20 w-[420px] h-[420px] rounded-full bg-gradient-to-tl from-orange-500/15 via-amber-500/10 to-transparent blur-3xl pointer-events-none animate-pulse-soft" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col justify-center relative z-10 py-1 sm:py-2">

        {/* ── 1. HEADER ROW (Split into Left Copy & Right 3D Visual) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-center mb-3 sm:mb-4 lg:mb-3.5">
          {/* Left Column: Eyebrow + Heading + Subtitle */}
          <FadeIn className="lg:col-span-7 xl:col-span-8 flex flex-col justify-center">
            {/* Eyebrow: — SUCCESS STORIES */}
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-4 sm:w-5 h-[2px] bg-[#f97316] rounded-full" />
              <span className="font-['JetBrains_Mono',monospace] text-[11px] sm:text-xs font-bold uppercase tracking-[0.22em] text-[#f97316]">
                SUCCESS STORIES
              </span>
            </div>

            {/* Heading — Zoomed Out to Fit Viewport */}
            <h2 className="font-['Outfit',sans-serif] font-black text-2xl xs:text-3xl sm:text-[34px] lg:text-[32px] xl:text-[35px] leading-[1.15] text-stone-950 dark:text-white mb-1.5 sm:mb-2">
              Turning Complex Challenges into<br />
              <span className="text-[#f97316]">Measurable Results.</span>
            </h2>

            {/* Subtitle */}
            <p className="font-['Outfit',sans-serif] text-stone-600 dark:text-stone-300 text-xs sm:text-[13px] lg:text-[13.5px] leading-relaxed max-w-2xl">
              Every engagement is an opportunity to solve a meaningful business problem. Explore how we&apos;ve helped organizations streamline operations, modernize technology, and create lasting business value.
            </p>
          </FadeIn>

          {/* Right Column: 3D Stacked Layered Visual with Floating Animations */}
          <FadeIn delay={0.1} className="hidden lg:flex lg:col-span-5 xl:col-span-4 justify-end items-center">
            <div className="relative w-[280px] h-[125px] flex items-center justify-center">
              {/* Warm amber backdrop blur */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400/30 via-amber-400/20 to-transparent rounded-3xl blur-2xl pointer-events-none animate-pulse-soft" />

              {/* Layer 1 (backmost orange tile) */}
              <div className="absolute w-36 h-22 rounded-2xl bg-amber-400/25 dark:bg-amber-500/15 border border-amber-300/40 dark:border-amber-500/20 shadow-md animate-float-reverse" />

              {/* Layer 2 (middle orange glass tile) */}
              <div className="absolute w-44 h-22 rounded-2xl bg-gradient-to-br from-orange-400/40 to-amber-500/25 border border-orange-300/50 dark:border-orange-500/30 shadow-lg -translate-x-2.5 translate-y-1" />

              {/* Layer 3 (front card with float animation) */}
              <div className="relative w-52 h-26 rounded-2xl bg-white/95 dark:bg-[#18181c]/95 border border-stone-200/90 dark:border-stone-700/80 shadow-xl p-3 flex flex-col justify-center backdrop-blur-md animate-float-slow">
                {/* Floating Orange Badge with pulse glow */}
                <div className="absolute -top-3 -left-3 w-10 h-10 rounded-xl bg-gradient-to-br from-[#f97316] to-[#ea580c] flex items-center justify-center text-white shadow-lg shadow-orange-500/40 animate-badge-glow">
                  <TrendingUp size={18} strokeWidth={2.5} />
                </div>

                <div className="pl-6 pt-0.5">
                  <h4 className="font-['Outfit',sans-serif] font-bold text-stone-900 dark:text-white text-xs sm:text-[13px] leading-snug">
                    Real Solutions.<br />
                    Lasting Impact.
                  </h4>
                  <div className="w-8 h-[2px] bg-[#f97316] rounded-full mt-1.5" />
                </div>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* ── 2. METRICS BAR (Zoomed out with Hover Animations) ── */}
        <FadeIn delay={0.08}>
          <div className="rounded-2xl p-2 sm:p-2.5 lg:p-2.5 bg-white dark:bg-[#151518] border border-stone-200/80 dark:border-stone-800/80 shadow-sm hover:shadow-md transition-shadow duration-300 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3 items-center mb-2.5 sm:mb-3">
            {SUCCESS_METRICS.map((m, i) => (
              <div key={i} className="group/metric flex items-center gap-2.5 px-2 cursor-default hover:scale-[1.03] transition-all duration-300">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-orange-500/10 dark:bg-orange-500/15 text-[#f97316] flex items-center justify-center shrink-0 group-hover/metric:scale-110 group-hover/metric:bg-orange-500/20 group-hover/metric:shadow-md group-hover/metric:shadow-orange-500/20 transition-all duration-300">
                  {m.icon}
                </div>
                <div>
                  <div className="font-['Outfit',sans-serif] font-black text-lg sm:text-xl lg:text-[22px] text-[#f97316] leading-none mb-0.5">
                    {m.num}
                  </div>
                  <div className="font-['JetBrains_Mono',monospace] text-[7.5px] sm:text-[8.5px] font-bold tracking-[0.14em] text-stone-500 dark:text-stone-400 uppercase leading-none">
                    {m.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* ── 3. THREE CASE STUDY CARDS (Zoomed out with Smooth Hover & Expanding Animations) ── */}
        <div className="flex flex-col gap-1.5 sm:gap-2 mb-2.5 sm:mb-3">
          {SUCCESS_STORIES.map((cs, i) => {
            const isOpen = expanded === i;
            return (
              <FadeIn key={cs.id} delay={0.1 + i * 0.06}>
                <div
                  className={`group rounded-2xl bg-white dark:bg-[#151518] border border-stone-200/80 dark:border-stone-800/80 ${cs.borderColor} shadow-sm hover:shadow-lg hover:shadow-stone-900/5 dark:hover:shadow-orange-500/5 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden cursor-pointer`}
                  onClick={() => setExpanded(isOpen ? null : i)}
                >
                  {/* Card Header Row */}
                  <div className="px-4 sm:px-5 py-2 sm:py-2.5 flex items-center justify-between gap-3 sm:gap-4">
                    <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                      {/* Icon Container */}
                      <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl ${cs.iconBg} flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:rotate-1 transition-transform duration-300 shadow-sm`}>
                        {cs.icon}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <span className={`font-['JetBrains_Mono',monospace] text-[9px] sm:text-[9.5px] font-bold uppercase tracking-[0.2em] ${cs.tagColor} block leading-tight mb-0.5`}>
                          {cs.category}
                        </span>
                        <h3 className="font-['Outfit',sans-serif] font-bold text-stone-900 dark:text-stone-100 text-[13.5px] sm:text-[15px] lg:text-[15.5px] leading-snug truncate">
                          {cs.title}
                        </h3>
                        <p className="font-['Outfit',sans-serif] text-stone-500 dark:text-stone-400 text-[11px] sm:text-xs leading-tight line-clamp-1 mt-0.5">
                          {cs.desc}
                        </p>
                      </div>
                    </div>

                    {/* Circular Action Button with Arrow */}
                    <div
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-300 shrink-0 ${isOpen
                          ? "bg-[#f97316] text-white rotate-90 shadow-md shadow-orange-500/30"
                          : "bg-stone-100 dark:bg-stone-800/80 text-stone-600 dark:text-stone-300 group-hover:bg-[#f97316] group-hover:text-white group-hover:translate-x-0.5 group-hover:scale-105 group-hover:shadow-md group-hover:shadow-orange-500/25"
                        }`}
                      aria-label="View case study"
                    >
                      <ArrowRight size={13} strokeWidth={2.2} />
                    </div>
                  </div>

                  {/* Expandable Case Study Details (Challenge, Solution, Impact) */}
                  <div
                    style={{
                      maxHeight: isOpen ? "500px" : "0px",
                      opacity: isOpen ? 1 : 0,
                      overflow: "hidden",
                      transition: "max-height 0.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.3s ease",
                    }}
                  >
                    <div className="px-4 sm:px-6 pb-4 pt-1.5 border-t border-stone-100 dark:border-stone-800/80 bg-stone-50/50 dark:bg-stone-900/30">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 mt-2">
                        {/* Challenge */}
                        <div>
                          <div className="flex items-center gap-1.5 mb-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#f97316]" />
                            <span className="font-['JetBrains_Mono',monospace] text-[9px] tracking-wider uppercase font-bold text-stone-500">
                              Challenge
                            </span>
                          </div>
                          <p className="font-['Outfit',sans-serif] text-[11px] sm:text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                            {cs.challenge}
                          </p>
                        </div>

                        {/* Solution */}
                        <div>
                          <div className="flex items-center gap-1.5 mb-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#f97316]" />
                            <span className="font-['JetBrains_Mono',monospace] text-[9px] tracking-wider uppercase font-bold text-stone-500">
                              Solution
                            </span>
                          </div>
                          <p className="font-['Outfit',sans-serif] text-[11px] sm:text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                            {cs.solution}
                          </p>
                        </div>

                        {/* Impact */}
                        <div>
                          <div className="flex items-center gap-1.5 mb-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#f97316]" />
                            <span className="font-['JetBrains_Mono',monospace] text-[9px] tracking-wider uppercase font-bold text-stone-500">
                              Business Impact
                            </span>
                          </div>
                          <ul className="space-y-1">
                            {cs.impact.map((item, j) => (
                              <li key={j} className="flex items-center gap-1.5 font-['Outfit',sans-serif] text-[11px] sm:text-xs text-stone-700 dark:text-stone-200">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#f97316]" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>

        {/* ── 4. TRUSTED BY COMPANIES BAR (Clean Outline Icons & Hover Animations) ── */}
        <FadeIn delay={0.15}>
          <div className="rounded-2xl py-2 px-4 sm:px-6 bg-white/80 dark:bg-[#151518]/80 border border-stone-200/80 dark:border-stone-800/80 shadow-sm mb-2 sm:mb-2.5">
            <p className="font-['JetBrains_Mono',monospace] text-[8px] sm:text-[8.5px] tracking-[0.22em] uppercase text-stone-400 dark:text-stone-500 text-center font-bold mb-1.5">
              TRUSTED BY COMPANIES ACROSS INDUSTRIES
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-6 lg:gap-x-7 gap-y-1 text-stone-600 dark:text-stone-300 text-[11px] sm:text-xs font-medium font-['Outfit',sans-serif]">
              {/* 1. Meridian Financial */}
              <div className="group/logo flex items-center gap-1.5 hover:text-[#f97316] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-stone-400 group-hover/logo:text-[#f97316] group-hover/logo:scale-110 transition-all duration-200">
                  <line x1="3" x2="21" y1="22" y2="22" />
                  <line x1="6" x2="6" y1="18" y2="11" />
                  <line x1="10" x2="10" y1="18" y2="11" />
                  <line x1="14" x2="14" y1="18" y2="11" />
                  <line x1="18" x2="18" y1="18" y2="11" />
                  <polygon points="12 2 20 7 4 7" />
                </svg>
                <span>Meridian Financial</span>
              </div>

              <span className="hidden sm:inline text-stone-300 dark:text-stone-700">|</span>

              {/* 2. HealthCore Systems */}
              <div className="group/logo flex items-center gap-1.5 hover:text-[#f97316] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-stone-400 group-hover/logo:text-[#f97316] group-hover/logo:scale-110 transition-all duration-200">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
                <span>HealthCore Systems</span>
              </div>

              <span className="hidden sm:inline text-stone-300 dark:text-stone-700">|</span>

              {/* 3. Sterling & Associates */}
              <div className="group/logo flex items-center gap-1.5 hover:text-[#f97316] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-stone-400 group-hover/logo:text-[#f97316] group-hover/logo:scale-110 transition-all duration-200">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                <span>Sterling &amp; Associates</span>
              </div>

              <span className="hidden sm:inline text-stone-300 dark:text-stone-700">|</span>

              {/* 4. Apex Manufacturing */}
              <div className="group/logo flex items-center gap-1.5 hover:text-[#f97316] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-stone-400 group-hover/logo:text-[#f97316] group-hover/logo:scale-110 transition-all duration-200">
                  <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
                </svg>
                <span>Apex Manufacturing</span>
              </div>

              <span className="hidden sm:inline text-stone-300 dark:text-stone-700">|</span>

              {/* 5. GovTech Solutions */}
              <div className="group/logo flex items-center gap-1.5 hover:text-[#f97316] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-stone-400 group-hover/logo:text-[#f97316] group-hover/logo:scale-110 transition-all duration-200">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <span>GovTech Solutions</span>
              </div>

              <span className="hidden sm:inline text-stone-300 dark:text-stone-700">|</span>

              {/* 6. DataEdge Corp */}
              <div className="group/logo flex items-center gap-1.5 hover:text-[#f97316] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-stone-400 group-hover/logo:text-[#f97316] group-hover/logo:scale-110 transition-all duration-200">
                  <ellipse cx="12" cy="5" rx="9" ry="3" />
                  <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                  <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
                </svg>
                <span>DataEdge Corp</span>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* ── 5. CLOSING STATEMENT ── */}
        <FadeIn delay={0.2}>
          <div className="text-center pt-0.5">
            <p className="font-['Outfit',sans-serif] text-[11px] sm:text-xs text-stone-500 dark:text-stone-400">
              Technology creates value only when it delivers measurable business outcomes.{" "}
              <span className="text-[#f97316] font-semibold">
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
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
      </svg>
    ),
    title: "Cloud & Infrastructure",
    desc: "Build resilient, high-performance applications with cloud-native architectures that scale as your business grows.",
    techs: ["AWS", "Microsoft Azure", "Google Cloud", "Docker", "Kubernetes"],
    accent: "#f97316",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    title: "Application Development",
    desc: "Create intuitive, high-performance applications across web, mobile, and enterprise platforms.",
    techs: ["React", "Angular", "Flutter", ".NET", "Node.js", "Python", "Java"],
    accent: "#f97316",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-5.04Z" />
        <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-5.04Z" />
      </svg>
    ),
    title: "AI & Intelligent Automation",
    desc: "Transform business processes with AI solutions that automate work, extract insights, and support better decision-making.",
    techs: ["AI Agents", "Generative AI", "LLM Integrations", "Document Intelligence", "Workflow Automation", "Predictive Analytics"],
    accent: "#f97316",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
      </svg>
    ),
    title: "Data & Integration",
    desc: "Connect systems, unify data, and enable real-time visibility across your business.",
    techs: ["REST APIs", "GraphQL", "Data Engineering", "Business Intelligence", "ERP & CRM Integrations", "Data Pipelines"],
    accent: "#f97316",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
    title: "Security & Quality",
    desc: "Build with confidence using engineering practices that prioritize reliability, performance, and long-term maintainability.",
    techs: ["Secure SDLC", "Automated Testing", "CI/CD", "Performance Optimization", "Monitoring", "Compliance Best Practices"],
    accent: "#f97316",
  },
];

function TechnologySection() {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  return (
    <section id="technology" className="py-16 sm:py-20 lg:py-24 bg-background relative overflow-hidden flex flex-col justify-center">
      <div className="absolute right-0 top-1/4 w-[500px] h-[500px] opacity-[0.04] pointer-events-none rounded-full"
        style={{ background: "radial-gradient(circle, #f97316 0%, transparent 70%)" }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">

        {/* Header — 2-Column Split matching design */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center mb-10 sm:mb-14">
          {/* Left Column: Eyebrow + Heading */}
          <FadeIn className="lg:col-span-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-4 h-0.5 bg-[#f97316]" />
              <span className="font-['JetBrains_Mono',monospace] text-xs font-bold uppercase tracking-[0.2em] text-[#f97316]">
                ENGINEERING
              </span>
            </div>
            <h2 className="font-['Outfit',sans-serif] font-black text-2xl xs:text-3xl sm:text-4xl lg:text-[42px] leading-[1.15] text-stone-950 dark:text-white">
              Modern Engineering.<br />
              <span className="text-[#f97316]">Built for Scale.</span>
            </h2>
          </FadeIn>

          {/* Right Column: Orange Vertical Divider + Narrative Description */}
          <FadeIn delay={0.1} className="lg:col-span-6 flex items-stretch">
            <div className="hidden sm:block w-[2px] bg-[#f97316] my-1 mr-6 shrink-0 opacity-80" />
            <p className="font-['Outfit',sans-serif] text-stone-600 dark:text-stone-300 text-sm sm:text-[15px] leading-relaxed">
              We combine modern technologies, cloud-native architectures, and AI capabilities to build secure, scalable, and future-ready software. Every technology we choose is driven by your business goals — not by trends.
            </p>
          </FadeIn>
        </div>

        {/* 5 Capability Cards Grid: 3 in row 1, 2 in row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-5 sm:gap-6 mb-8">
          {ENG_CAPS.map((cap, i) => {
            const isActive = activeCard === i;
            const isWide = i >= 3;
            return (
              <FadeIn key={i} delay={i * 0.08} className={`${isWide ? "lg:col-span-3" : "lg:col-span-2"} flex`}>
                <div
                  className="group relative w-full rounded-[22px] p-6 sm:p-7 flex flex-col justify-between border bg-card transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/5 hover:-translate-y-1"
                  style={{
                    borderColor: isActive ? "rgba(249,115,22,0.35)" : "var(--border)",
                  }}
                  onMouseEnter={() => setActiveCard(i)}
                  onMouseLeave={() => setActiveCard(null)}>

                  <div>
                    {/* Icon container */}
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 bg-[#f97316]/10 border border-[#f97316]/25 text-[#f97316] transition-transform duration-300 group-hover:scale-105">
                      {cap.icon}
                    </div>

                    <h3 className="font-['Outfit',sans-serif] font-bold text-base sm:text-[17px] text-foreground mb-2">
                      {cap.title}
                    </h3>
                    <p className="font-['Outfit',sans-serif] text-muted-foreground text-xs sm:text-[13.5px] leading-[1.65] mb-6">
                      {cap.desc}
                    </p>
                  </div>

                  {/* Tools & Technologies Divider + Section */}
                  <div className="border-t border-stone-200/70 dark:border-stone-800/80 pt-4 mt-auto">
                    <p className="font-['JetBrains_Mono',monospace] text-[10.5px] font-bold tracking-[0.16em] uppercase text-stone-400 dark:text-stone-500 mb-3">
                      TOOLS &amp; TECHNOLOGIES
                    </p>

                    {/* Tech pills without arrow marks */}
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {cap.techs.map((t, j) => (
                        <span
                          key={j}
                          className="font-['Outfit',sans-serif] text-xs font-medium px-3 py-1 rounded-full bg-stone-100/90 dark:bg-stone-800/80 text-stone-700 dark:text-stone-300 border border-stone-200/60 dark:border-stone-700/60 transition-colors group-hover:border-orange-500/30">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>

        {/* Engineering principles banner matching screenshot */}
        <FadeIn delay={0.3}>
          <div className="rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5 border border-[#f97316]/25 bg-gradient-to-r from-orange-500/[0.08] via-amber-500/[0.04] to-transparent dark:from-orange-950/30 dark:via-background dark:to-orange-950/10">
            <div className="shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center bg-[#f97316]/15 border border-[#f97316]/25 text-[#f97316]">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
              </svg>
            </div>
            <div className="hidden sm:block w-[1.5px] h-10 bg-[#f97316]/40 shrink-0" />
            <div className="flex-1">
              <h4 className="font-['Outfit',sans-serif] font-bold text-foreground text-sm sm:text-base mb-1">
                Technology Choices That Stand the Test of Time
              </h4>
              <p className="font-['Outfit',sans-serif] text-muted-foreground text-xs sm:text-[13.5px] leading-relaxed">
                We believe great software is built on strong engineering fundamentals. That&apos;s why we prioritize{" "}
                <span className="text-foreground font-semibold">scalability, security, maintainability, and performance</span>{" "}
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
const CORE_PRINCIPLE_CARDS = [
  {
    icon: <Eye size={20} className="text-orange-400" strokeWidth={1.75} />,
    label: "VISION",
    title: "Make Technology a Competitive Advantage.",
    desc: "To help businesses operate with greater clarity, intelligence and agility — turning complex processes and operational challenges into opportunities for growth.",
    footer: "Where we're going",
  },
  {
    icon: <Target size={20} className="text-orange-400" strokeWidth={1.75} />,
    label: "MISSION",
    title: "Engineer Solutions That Move Businesses Forward.",
    desc: "We combine engineering, AI, product thinking and business understanding to design, build, and evolve technology that solves meaningful problems and creates measurable outcomes.",
    footer: "Why we exist",
  },
  {
    icon: <Users size={20} className="text-orange-400" strokeWidth={1.75} />,
    label: "VALUES",
    title: "Ownership. Curiosity. Integrity. Excellence.",
    desc: "The behaviours that shape how we make decisions, work with each other, and build lasting relationships.",
    footer: "How we show up",
  },
];

const HOW_WE_WORK_TABS = [
  { id: "clients", label: "With Clients" },
  { id: "together", label: "Together" },
] as const;

type HowWeWorkTabId = (typeof HOW_WE_WORK_TABS)[number]["id"];

const TAB_HEADERS: Record<HowWeWorkTabId, { title: string; subtitle: string }> = {
  clients: {
    title: "How We Work With Our Clients",
    subtitle: "We don't just build software. We build long-term partnerships.",
  },
  together: {
    title: "How We Work Together",
    subtitle: "Great collaboration and shared culture create extraordinary results.",
  },
};

const HOW_WE_WORK_ITEMS: Record<HowWeWorkTabId, Array<{ num: string; icon: React.ReactNode; title: string; desc: string }>> = {
  clients: [
    {
      num: "01",
      icon: <Target size={18} strokeWidth={1.75} />,
      title: "Business Outcomes First",
      desc: "We start with the business problem, not the technology. Success isn't measured by features delivered — it's measured by the value created.",
    },
    {
      num: "02",
      icon: <Handshake size={18} strokeWidth={1.75} />,
      title: "Partnership Over Projects",
      desc: "We work as an extension of your team, collaborating closely to build solutions that evolve with your business.",
    },
    {
      num: "03",
      icon: <Cpu size={18} strokeWidth={1.75} />,
      title: "Intelligence With Purpose",
      desc: "We apply AI where it can automate work, improve decisions, simplify operations, and create new capabilities.",
    },
    {
      num: "04",
      icon: <Shield size={18} strokeWidth={1.75} />,
      title: "Transparency by Default",
      desc: "You'll always have visibility into architecture, trade-offs, risks, and timelines — so you can make informed decisions with confidence.",
    },
    {
      num: "05",
      icon: <TrendingUp size={18} strokeWidth={1.75} />,
      title: "Build for What's Next",
      desc: "We design technology that can evolve with your users, data, systems, and business — without unnecessary complexity.",
    },
    {
      num: "06",
      icon: <Sparkles size={18} strokeWidth={1.75} />,
      title: "Leave It Better",
      desc: "Whether we're building something new or modernizing an existing system, our goal is always improvement — for your business, your people, and your customers.",
    },
  ],
  together: [
    {
      num: "01",
      icon: <Users size={18} strokeWidth={1.75} />,
      title: "Shared Ownership",
      desc: "We take collective responsibility from day one, winning and learning as one unified team.",
    },
    {
      num: "02",
      icon: <MessageSquare size={18} strokeWidth={1.75} />,
      title: "Open & Direct Dialogue",
      desc: "We communicate with absolute clarity, welcoming constructive challenge and diverse viewpoints.",
    },
    {
      num: "03",
      icon: <Lightbulb size={18} strokeWidth={1.75} />,
      title: "Curiosity & Knowledge Sharing",
      desc: "We actively share discoveries, mentor one another, and elevate the collective standard.",
    },
    {
      num: "04",
      icon: <GitMerge size={18} strokeWidth={1.75} />,
      title: "Cross-Functional Alignment",
      desc: "We connect business context, design intuition, and deep engineering without organizational silos.",
    },
    {
      num: "05",
      icon: <CheckCircle size={18} strokeWidth={1.75} />,
      title: "Trust Through Autonomy",
      desc: "We empower individuals to make bold decisions and stand proudly behind their execution.",
    },
    {
      num: "06",
      icon: <Zap size={18} strokeWidth={1.75} />,
      title: "Sustained Momentum",
      desc: "We keep moving with focus and discipline, maintaining high velocity without burning out.",
    },
  ],
};

const WORKPLACE_VALUES = [
  {
    num: "01",
    title: "Own the Outcome",
    desc: "Take responsibility beyond your assigned task.",
  },
  {
    num: "02",
    title: "Challenge Respectfully",
    desc: "Question ideas. Challenge assumptions. Keep it constructive.",
  },
  {
    num: "03",
    title: "Stay Curious",
    desc: "Keep learning, experimenting, and sharing.",
  },
  {
    num: "04",
    title: "Trust Through Accountability",
    desc: "Give people room to make decisions — and own them.",
  },
  {
    num: "05",
    title: "Help the Team Win",
    desc: "Share knowledge. Support each other. Give credit.",
  },
  {
    num: "06",
    title: "Keep Improving",
    desc: "Every project and process is an opportunity to get better.",
  },
];

function ValueSection() {
  const [activeTab, setActiveTab] = useState<HowWeWorkTabId>("clients");

  return (
    <section id="value" className="py-16 md:py-24 relative overflow-hidden flex flex-col justify-center" style={{ background: "var(--secondary)" }}>
      {/* Background ambient orange flare */}
      <div className="absolute top-0 right-0 w-[640px] h-[360px] pointer-events-none opacity-25"
        style={{ background: "radial-gradient(ellipse at 80% 20%, rgba(249,115,22,0.38) 0%, rgba(245,158,11,0.12) 45%, transparent 70%)" }} />
      <div className="absolute top-0 inset-x-0 h-px" style={{ background: "linear-gradient(90deg, transparent 0%, rgba(249,115,22,0.2) 50%, transparent 100%)" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">

        {/* 1. Header & Intro */}
        <FadeIn className="mb-12 sm:mb-14">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              {/* Eyebrow */}
              <div className="flex items-center gap-2.5 mb-4">
                <span className="w-5 h-[2px] bg-orange-500 rounded-full" />
                <span className="font-['Outfit',sans-serif] font-bold text-foreground text-sm tracking-wide">
                  Our Principles
                </span>
              </div>

              {/* Heading */}
              <h2 className="font-['Outfit',sans-serif] font-black text-[34px] sm:text-[44px] lg:text-[48px] leading-[1.1] -tracking-[0.02em] text-foreground mb-4">
                The Principles That Shape<br />
                <GradientText>How We Think, Build & Work.</GradientText>
              </h2>

              {/* Supporting text */}
              <p className="font-['Outfit',sans-serif] text-[13.5px] sm:text-[14.5px] text-muted-foreground leading-[1.65] max-w-xl">
                Technology changes quickly. Businesses evolve even faster.<br className="hidden sm:inline" />
                Our principles keep us grounded in how we solve problems,<br className="hidden sm:inline" />
                build technology, serve customers, and work together.
              </p>
            </div>

            {/* Right side tagline list */}
            <div className="hidden lg:flex flex-col justify-end items-start text-left pb-2 shrink-0">
              <span className="w-5 h-[2px] bg-orange-500 rounded-full mb-3" />
              <p className="font-['Outfit',sans-serif] text-[17px] text-muted-foreground/85 leading-relaxed font-medium">
                Better technology.<br />
                Stronger businesses.<br />
                A smarter tomorrow.
              </p>
            </div>
          </div>
        </FadeIn>

        {/* 3 Large Principle Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16 sm:mb-20">
          {CORE_PRINCIPLE_CARDS.map((card, i) => (
            <FadeIn key={card.label} delay={i * 0.08}>
              <div className="group relative p-7 sm:p-8 rounded-2xl border border-border/70 bg-card/85 hover:bg-card hover:border-orange-500/35 overflow-hidden h-full flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-500/5">
                <div>
                  {/* Icon */}
                  <div className="w-11 h-11 rounded-xl border border-border/80 bg-background/50 flex items-center justify-center mb-5 group-hover:border-orange-500/35 transition-colors">
                    {card.icon}
                  </div>

                  {/* Label */}
                  <span className="font-['JetBrains_Mono',monospace] text-[10.5px] uppercase tracking-[0.2em] font-bold text-muted-foreground block mb-2.5">
                    {card.label}
                  </span>

                  {/* Title */}
                  <h3 className="font-['Outfit',sans-serif] font-bold text-lg sm:text-[19px] text-foreground leading-snug mb-3 group-hover:text-orange-500 transition-colors duration-200">
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p className="font-['Outfit',sans-serif] text-[13px] sm:text-[13.5px] text-muted-foreground leading-relaxed">
                    {card.desc}
                  </p>
                </div>

                {/* Footer link line */}
                <div className="flex items-center gap-2 pt-6 mt-6 border-t border-border/40 text-[11.5px] font-medium text-muted-foreground/75">
                  <span className="w-3.5 h-[1.5px] bg-orange-500 rounded-full" />
                  <span>{card.footer}</span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* 2. How We Work */}
        <FadeIn delay={0.15}>
          <div className="mb-16 sm:mb-20">
            {/* Header row with title & pill tabs */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-7">
              <div>
                <div className="flex items-center gap-2.5 mb-1.5">
                  <span className="w-4 h-[2px] bg-orange-500 rounded-full" />
                  <h3 className="font-['Outfit',sans-serif] font-bold text-xl sm:text-2xl text-foreground">
                    {TAB_HEADERS[activeTab].title}
                  </h3>
                </div>
                <p className="font-['Outfit',sans-serif] text-[13px] sm:text-[14px] text-muted-foreground pl-6">
                  {TAB_HEADERS[activeTab].subtitle}
                </p>
              </div>

              {/* Segmented pill tabs */}
              <div className="inline-flex items-center p-1 rounded-full border border-border/80 bg-card/90 backdrop-blur-sm self-start sm:self-auto max-w-full overflow-x-auto">
                {HOW_WE_WORK_TABS.map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-5 py-2 rounded-full font-['Outfit',sans-serif] text-xs sm:text-[13px] font-semibold transition-all duration-200 whitespace-nowrap ${isActive
                        ? "bg-[#f97316] text-white shadow-md shadow-orange-500/25"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                        }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 6 Compact items for active tab */}
            <div
              key={activeTab}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
              style={{ animation: "hero-in 0.35s cubic-bezier(0.22,1,0.36,1) both" }}
            >
              {HOW_WE_WORK_ITEMS[activeTab].map((item) => (
                <div
                  key={`${activeTab}-${item.num}`}
                  className="group relative p-6 rounded-2xl border border-border/70 bg-card/85 hover:bg-card hover:border-orange-500/35 hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Number on left, icon on right */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-['JetBrains_Mono',monospace] text-base sm:text-[17px] font-bold text-foreground">
                        {item.num}
                      </span>
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center text-orange-400 group-hover:scale-110 transition-transform">
                        {item.icon}
                      </div>
                    </div>

                    {/* Title */}
                    <h4 className="font-['Outfit',sans-serif] font-bold text-[15px] sm:text-[16px] text-foreground group-hover:text-orange-500 transition-colors duration-200 mb-2">
                      {item.title}
                    </h4>

                    {/* Description */}
                    <p className="font-['Outfit',sans-serif] text-[12.5px] sm:text-[13px] text-muted-foreground leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* 3. Inside AskJuno (3-Column Layout) */}
        <FadeIn delay={0.2}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center pt-4">
            {/* Left: Office photo */}
            <div className="lg:col-span-4 rounded-2xl overflow-hidden border border-border/80 shadow-2xl relative group bg-card">
              <img
                src={officeImg}
                alt="AskJuno Office — Better Together"
                className="w-full h-full object-cover aspect-[4/3] group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Center: Headline & intro */}
            <div className="lg:col-span-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-4 h-[2px] bg-orange-500 rounded-full" />
                <span className="font-['Outfit',sans-serif] text-sm font-bold text-foreground">
                  Inside AskJuno
                </span>
              </div>
              <h3 className="font-['Outfit',sans-serif] font-bold text-2xl sm:text-[30px] leading-tight text-foreground mb-4">
                Great Work Starts With Great People.
              </h3>
              <p className="font-['Outfit',sans-serif] text-[13px] sm:text-[14px] text-muted-foreground leading-relaxed">
                The way we work with each other shapes the way we work with our customers. Our workplace values help us stay humble, grow together, and do our best work.
              </p>
            </div>

            {/* Right: 6 workplace values */}
            <div className="lg:col-span-4 space-y-3.5 sm:space-y-4">
              {WORKPLACE_VALUES.map((row) => (
                <div key={row.num} className="flex items-start gap-3.5 group">
                  <span className="font-['JetBrains_Mono',monospace] text-xs sm:text-[13px] font-bold text-orange-500 shrink-0 pt-0.5">
                    {row.num}
                  </span>
                  <div>
                    <h4 className="font-['Outfit',sans-serif] font-bold text-[13.5px] sm:text-[14px] text-foreground leading-snug group-hover:text-orange-500 transition-colors duration-200">
                      {row.title}
                    </h4>
                    <p className="font-['Outfit',sans-serif] text-xs text-muted-foreground leading-relaxed mt-0.5">
                      {row.desc}
                    </p>
                  </div>
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
interface InsightArticle {
  id: string;
  tag: string;
  readTime: string;
  category: string;
  title: string;
  desc: string;
  accent: string;
  content: {
    summary: string;
    keyPoints: string[];
    takeaway: string;
  };
}

const ARTICLES: InsightArticle[] = [
  {
    id: "art-1",
    tag: "AI & AUTOMATION",
    readTime: "8 MIN READ",
    category: "AI & Intelligent Automation",
    title: "Beyond the AI Hype: Building Intelligence That Creates Business Value",
    desc: "Explore how organizations can move from AI experimentation to measurable business outcomes through practical implementation strategies that prioritize real-world impact over novelty.",
    accent: "#f97316",
    content: {
      summary: "Most enterprise AI initiatives stall because they focus on novelty rather than business workflows. This article explores how to architect AI systems that directly compress operational cycle times and generate verifiable ROI.",
      keyPoints: [
        "Prioritize high-frequency, rule-constrained workflows before tackling open-ended generative AI tasks.",
        "Establish human-in-the-loop validation checkpoints to guarantee 99.9% data integrity.",
        "Design modular agent architectures that can swap underlying foundation models without code rewrites.",
        "Track cost-per-inference and revenue acceleration metrics from day one of deployment."
      ],
      takeaway: "True AI transformation happens when intelligent models quietly automate friction in core operations, turning manual hours into instant, reliable business throughput."
    }
  },
  {
    id: "art-2",
    tag: "DOCUMENT INTELLIGENCE",
    readTime: "5 MIN READ",
    category: "AI & Intelligent Automation",
    title: "Why Documents Are Still Slowing Down Modern Businesses",
    desc: "Discover how document intelligence transforms manual workflows into automated, data-driven operations.",
    accent: "#f97316",
    content: {
      summary: "Despite decades of digital transformation, unstructured documents—PDFs, invoices, regulatory submissions, clinical forms—remain the largest operational bottleneck for modern enterprises.",
      keyPoints: [
        "Traditional OCR extracts text, but lacks semantic and spatial context required for complex tables.",
        "Multi-modal LLMs combined with heuristic extractors deliver 99.4% precision on complex multi-page contracts.",
        "Automated validation pipelines eliminate the need for manual dual-key data entry.",
        "Integration with core ERP/CRM backends reduces processing cycles from 72 hours to under 30 seconds."
      ],
      takeaway: "Converting static documents into real-time, actionable structured data unlocks immediate liquidity and operational agility."
    }
  },
  {
    id: "art-3",
    tag: "PRODUCT ENGINEERING",
    readTime: "6 MIN READ",
    category: "Product Engineering",
    title: "Building Software That Scales Beyond Version 1",
    desc: "The engineering principles behind scalable architecture, maintainable code, and long-term product success.",
    accent: "#f59e0b",
    content: {
      summary: "Shipping fast often leads to technical debt that slows development to a crawl by year two. We outline the architectural discipline required to ship rapidly while protecting future scalability.",
      keyPoints: [
        "Decouple domain logic from delivery mechanisms and third-party vendor SDKs.",
        "Adopt event-driven architectures to handle spiky enterprise throughput without server degradation.",
        "Invest in automated regression suites and contract tests to enable continuous deployments without fear.",
        "Structure multi-tenant databases with data isolation and tenant-level encryption from sprint one."
      ],
      takeaway: "Great engineering is not about over-architecting for hypothetical futures; it is about building clean boundaries that adapt effortlessly as business requirements expand."
    }
  },
];

const LANDING_INSIGHT_TOPICS = [
  {
    id: "ai",
    sub: "AI &",
    title: "AI & Intelligent Automation",
    slug: "ai-intelligent-automation",
    icon: <Cpu size={19} strokeWidth={2.2} />,
  },
  {
    id: "product",
    sub: "PRODUCT",
    title: "Product Engineering",
    slug: "product-engineering",
    icon: <Code2 size={19} strokeWidth={2.2} />,
  },
  {
    id: "enterprise",
    sub: "ENTERPRISE",
    title: "Enterprise Software",
    slug: "enterprise-software",
    icon: <Building2 size={19} strokeWidth={2.2} />,
  },
  {
    id: "digital",
    sub: "DIGITAL",
    title: "Digital Transformation",
    slug: "digital-transformation",
    icon: <Cloud size={19} strokeWidth={2.2} />,
  },
  {
    id: "data",
    sub: "DATA",
    title: "Data & Analytics",
    slug: "data-analytics",
    icon: <BarChart3 size={19} strokeWidth={2.2} />,
  },
  {
    id: "leadership",
    sub: "LEADERSHIP",
    title: "Technology Leadership",
    slug: "technology-leadership",
    icon: <TrendingUp size={19} strokeWidth={2.2} />,
  },
];

function ThinkingSection() {
  const navigate = useNavigate();

  return (
    <section
      id="thinking"
      className="py-16 sm:py-24 relative overflow-hidden bg-[#faf8f5] dark:bg-[#0c0c0e] transition-colors duration-200 border-t border-stone-200/70 dark:border-stone-800/80"
    >
      {/* Anchor for #insights */}
      <div id="insights" className="absolute -top-16" />

      {/* Subtle warm ambient glows */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />
      <div className="absolute -bottom-28 -left-24 w-[480px] h-[480px] rounded-full bg-gradient-to-tr from-amber-500/12 via-orange-500/10 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute -top-28 -right-24 w-[480px] h-[480px] rounded-full bg-gradient-to-tl from-orange-500/12 via-amber-500/10 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* ── LEFT COLUMN: HEADER, 3D LIGHTBULB VISUAL & 6 TOPIC CARDS ── */}
          <div className="lg:col-span-7 xl:col-span-7 flex flex-col">
            
            {/* Top Row: Copy (Left) + 3D Lightbulb Illustration (Right) */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8 sm:mb-9">
              {/* Copy Block */}
              <div className="max-w-lg">
                {/* Eyebrow: — INSIGHTS */}
                <div className="flex items-center gap-2.5 mb-3">
                  <span className="w-6 h-0.5 bg-[#f97316] rounded-full" />
                  <span className="font-['JetBrains_Mono',monospace] text-[11.5px] sm:text-[12px] font-bold uppercase tracking-[0.24em] text-[#f97316]">
                    INSIGHTS
                  </span>
                </div>

                {/* Heading */}
                <h2 className="font-['Outfit',sans-serif] font-black text-3xl xs:text-4xl sm:text-[40px] lg:text-[42px] xl:text-[46px] leading-[1.13] text-stone-950 dark:text-white mb-3 tracking-tight">
                  Insights for the<br />
                  <span className="text-[#f97316]">Builders of Tomorrow.</span>
                </h2>

                {/* Subtitle */}
                <p className="font-['Outfit',sans-serif] text-stone-600 dark:text-stone-300 text-sm sm:text-[15px] lg:text-[15.5px] leading-relaxed mb-5">
                  We share perspectives on AI, software engineering, digital transformation, and product strategy to help businesses navigate technology with clarity and confidence.
                </p>

                {/* Read Articles CTA Button */}
                <button
                  type="button"
                  onClick={() => navigate("/insights")}
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-orange-500 to-amber-600 text-white font-['Outfit',sans-serif] text-[14px] font-bold hover:from-orange-600 hover:to-amber-700 shadow-lg shadow-orange-500/25 active:scale-95 transition-all cursor-pointer"
                >
                  <span>Read Articles</span>
                  <ArrowRight size={15} />
                </button>
              </div>

              {/* 3D Stacked Glowing Lightbulb Cards Visual (Zoomed In) */}
              <div className="relative shrink-0 w-44 h-44 sm:w-52 sm:h-52 lg:w-56 lg:h-56 flex items-center justify-center self-center sm:self-auto">
                {/* Ambient Radial Glow */}
                <div
                  className="absolute inset-0 rounded-full opacity-70 dark:opacity-50 blur-2xl pointer-events-none"
                  style={{
                    background: "radial-gradient(circle, rgba(249,115,22,0.4) 0%, rgba(245,158,11,0.2) 50%, transparent 70%)",
                  }}
                />

                {/* Orange spark rays around the cards */}
                <span className="absolute -top-1 right-8 w-4 h-0.5 bg-[#f97316] rotate-45 rounded-full" />
                <span className="absolute top-8 -right-2 w-4.5 h-0.5 bg-[#f97316] rotate-[-20deg] rounded-full" />
                <span className="absolute -left-2 top-14 w-4 h-0.5 bg-[#f97316] rounded-full" />
                <span className="absolute -top-2 left-8 w-4 h-0.5 bg-[#f97316] rotate-[-45deg] rounded-full" />

                {/* Back Angled Orange Card */}
                <div className="absolute w-34 h-24 sm:w-40 sm:h-28 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 opacity-80 rotate-[-12deg] shadow-xl shadow-orange-500/25 translate-x-1.5" />

                {/* Middle Orange/Peach Card */}
                <div className="absolute w-34 h-24 sm:w-40 sm:h-28 rounded-2xl bg-gradient-to-br from-orange-300 to-amber-400 opacity-90 rotate-[-6deg] shadow-lg shadow-orange-500/20 -translate-y-1.5" />

                {/* Front White/Glass Card with Glowing Lightbulb */}
                <div className="relative w-34 h-24 sm:w-40 sm:h-28 rounded-2xl bg-white/95 dark:bg-[#1c1c22]/95 border border-white/90 dark:border-stone-700/70 shadow-2xl shadow-stone-900/15 dark:shadow-black/50 flex flex-col items-center justify-center p-3 backdrop-blur-md">
                  {/* Subtle card horizontal lines */}
                  <div className="absolute top-2.5 left-3.5 right-3.5 flex justify-between">
                    <span className="w-5 h-1 bg-stone-200 dark:bg-stone-700 rounded-full" />
                    <span className="w-2.5 h-1 bg-orange-400/60 rounded-full" />
                  </div>

                  {/* Glowing Lightbulb */}
                  <div className="relative flex items-center justify-center">
                    <div className="absolute w-12 h-12 rounded-full bg-orange-500/25 blur-md animate-pulse-soft" />
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500/15 to-amber-500/15 border border-orange-500/35 flex items-center justify-center text-[#f97316] shadow-sm">
                      <Lightbulb size={26} strokeWidth={2.4} className="text-[#f97316]" />
                    </div>
                  </div>

                  <div className="absolute bottom-2.5 left-3.5 right-3.5 flex items-center justify-center gap-1.5">
                    <span className="w-10 h-0.5 bg-stone-200 dark:bg-stone-700 rounded-full" />
                    <span className="w-4 h-0.5 bg-[#f97316]/70 rounded-full" />
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom 6 Topic Cards in 3x2 Grid (Zoomed In) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
              {LANDING_INSIGHT_TOPICS.map((topic) => (
                <div
                  key={topic.id}
                  onClick={() => navigate(`/insights/${topic.slug}`)}
                  className="group rounded-[16px] bg-white dark:bg-[#151518] border border-stone-200/80 dark:border-stone-800/80 p-3.5 sm:p-4 flex items-center justify-between shadow-xs hover:border-[#f97316]/50 hover:shadow-lg hover:shadow-orange-500/5 hover:-translate-y-1 transition-all duration-200 cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-11 h-11 rounded-full bg-orange-50 dark:bg-orange-500/15 border border-orange-200 dark:border-orange-500/30 flex items-center justify-center text-[#f97316] shrink-0 group-hover:bg-[#f97316] group-hover:text-white transition-all duration-200 shadow-xs">
                      {topic.icon}
                    </div>
                    <div className="min-w-0">
                      <span className="font-['JetBrains_Mono',monospace] text-[9.5px] sm:text-[10px] font-bold uppercase tracking-[0.16em] text-stone-400 dark:text-stone-500 block leading-tight mb-0.5">
                        {topic.sub}
                      </span>
                      <h4 className="font-['Outfit',sans-serif] font-bold text-[13.5px] sm:text-[14px] text-stone-900 dark:text-stone-100 group-hover:text-[#f97316] transition-colors leading-snug truncate">
                        {topic.title}
                      </h4>
                    </div>
                  </div>

                  <ArrowRight
                    size={15}
                    className="text-[#f97316] transition-transform duration-200 group-hover:translate-x-1 shrink-0 ml-1.5"
                  />
                </div>
              ))}
            </div>

          </div>

          {/* ── RIGHT COLUMN: DEDICATED LINKEDIN POST CARD (Zoomed In) ── */}
          <div className="lg:col-span-5 xl:col-span-5 flex flex-col justify-center">
            <div className="rounded-[24px] bg-white dark:bg-[#151518] border border-stone-200/90 dark:border-stone-800/90 p-5 sm:p-6 shadow-xl shadow-stone-900/5 dark:shadow-black/50 flex flex-col justify-between group">
              
              {/* Header: Company Avatar + Name/Followers + Follow Button */}
              <div className="flex items-center justify-between gap-3 mb-3.5">
                <div className="flex items-center gap-3 min-w-0">
                  {/* AJ Orange Avatar */}
                  <a
                    href="https://www.linkedin.com/company/askjuno/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 rounded-full bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white font-black text-sm tracking-tight shadow-sm shrink-0 hover:opacity-95 transition-opacity"
                    aria-label="AskJuno LinkedIn Profile"
                  >
                    AJ
                  </a>

                  <div className="min-w-0">
                    <a
                      href="https://www.linkedin.com/company/askjuno/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-['Outfit',sans-serif] font-bold text-[15.5px] sm:text-[16px] text-stone-900 dark:text-stone-100 leading-tight hover:text-[#f97316] transition-colors block truncate"
                    >
                      AskJuno
                    </a>
                    <p className="font-['Outfit',sans-serif] text-[11.5px] sm:text-[12px] text-stone-400 dark:text-stone-500 mt-0.5 truncate">
                      2,466 followers • 2 weeks ago
                    </p>
                  </div>
                </div>

                {/* + Follow Button */}
                <a
                  href="https://www.linkedin.com/company/askjuno/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-[#0077b5] text-[#0077b5] hover:bg-[#0077b5] hover:text-white font-['Outfit',sans-serif] text-[12.5px] sm:text-[13px] font-semibold transition-all duration-200 active:scale-95 shadow-xs"
                >
                  <span className="text-sm font-bold leading-none">+</span>
                  <span>Follow</span>
                </a>
              </div>

              {/* Post Narrative Text */}
              <p className="font-['Outfit',sans-serif] text-[13.5px] sm:text-[14px] text-stone-700 dark:text-stone-300 leading-relaxed mb-4">
                Great products are built by passionate teams. Celebrating our engineering milestones and the people driving impactful technology forward every single day.
              </p>

              {/* Post Visual Photo */}
              <div className="relative aspect-[16/9.2] w-full rounded-[16px] overflow-hidden bg-stone-100 dark:bg-stone-800 mb-4 border border-stone-200/60 dark:border-stone-800/60">
                <img
                  src={linkedinPresentationImg}
                  alt="AskJuno team engineering presentation"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-104"
                />
              </div>

              {/* Footer Engagement Metrics */}
              <div className="flex items-center justify-between pt-2.5 border-t border-stone-100 dark:border-stone-800/80 text-stone-500 dark:text-stone-400 text-[12.5px] sm:text-[13px] font-['Outfit',sans-serif]">
                <div className="flex items-center gap-2 hover:text-[#f97316] transition-colors cursor-pointer">
                  <ThumbsUp size={15} className="text-[#f97316]" />
                  <span className="font-semibold text-stone-700 dark:text-stone-300">142</span>
                </div>

                <div className="flex items-center gap-2 hover:text-[#f97316] transition-colors cursor-pointer">
                  <MessageSquare size={15} />
                  <span>12</span>
                </div>

                <div className="flex items-center gap-2 hover:text-[#f97316] transition-colors cursor-pointer">
                  <Repeat2 size={15} />
                  <span>8</span>
                </div>

                <a
                  href="https://www.linkedin.com/company/askjuno/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-[#f97316] transition-colors cursor-pointer"
                  aria-label="Share post on LinkedIn"
                >
                  <Send size={15} />
                </a>
              </div>

            </div>
          </div>

        </div>
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
    <section id="faq" className="pt-16 sm:pt-20 pb-4 bg-background relative overflow-hidden transition-colors duration-200">
      {/* Background subtle ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 right-0 w-[500px] h-[500px] opacity-[0.04] dark:opacity-[0.06] rounded-full"
          style={{ background: "radial-gradient(circle, #f97316 0%, transparent 70%)" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-14 items-start">

          {/* Left Column: FAQ header + 3 horizontal feature items */}
          <div className="lg:col-span-6 flex flex-col justify-start">
            <FadeIn>
              {/* Tag: FAQ ──── */}
              <div className="flex items-center gap-3 mb-3">
                <span className="font-['JetBrains_Mono',monospace] text-[13px] uppercase tracking-[2.5px] font-bold text-[#f97316]">FAQ</span>
                <div className="h-[1.5px] w-12 bg-[#f97316]" />
              </div>

              {/* Subtitle */}
              <p className="font-['Outfit',sans-serif] text-muted-foreground text-sm sm:text-[15px] leading-relaxed max-w-lg mb-8 sm:mb-10">
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
                      className="w-full min-h-[48px] flex items-center justify-between gap-4 px-4 sm:px-5 py-3.5 sm:py-4 text-left group transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 cursor-pointer"
                    >
                      <span
                        className={`font-['Outfit',sans-serif] text-[14px] sm:text-[15px] leading-snug transition-colors ${isOpen
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
                      <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-1 border-t border-border">
                        <p className="font-['Outfit',sans-serif] text-stone-600 dark:text-stone-300 text-[13.5px] sm:text-[14px] leading-[1.65] mt-2.5">
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

// Blocked common free/public email domains
const BLOCKED_EMAIL_DOMAINS = new Set([
  "gmail.com", "googlemail.com", "yahoo.com", "yahoo.co.uk", "yahoo.co.in", "yahoo.ca",
  "yahoo.com.au", "outlook.com", "hotmail.com", "hotmail.co.uk", "live.com", "live.co.uk",
  "msn.com", "icloud.com", "me.com", "mac.com", "aol.com", "mail.com", "email.com", "usa.com",
  "gmx.com", "gmx.de", "web.de", "inbox.com", "fastmail.com", "zoho.com", "yandex.com",
  "yandex.ru", "mail.ru", "proton.me", "protonmail.com", "tuta.com", "tutanota.com",
  "mailfence.com", "posteo.de", "startmail.com", "rediffmail.com", "rediffmailpro.com",
  "sify.com", "indiatimes.com",
]);

function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "Book a Consultation",
    message: "",
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    phone: false,
    subject: false,
  });

  const [errors, setErrors] = useState<{
    name?: string | null;
    email?: string | null;
    phone?: string | null;
    subject?: string | null;
  }>({});

  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validateName = (name: string): string | null => {
    if (!name.trim()) return "Name is required";
    return null;
  };

  const validateEmail = (email: string): string | null => {
    const trimmed = email.trim().toLowerCase();
    if (!trimmed) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) return "Enter a valid email address";
    const domain = trimmed.split("@")[1]?.trim();
    if (domain && BLOCKED_EMAIL_DOMAINS.has(domain)) {
      return "Enter your company mailid";
    }
    return null;
  };

  const validatePhone = (phone: string): string | null => {
    const trimmed = phone.trim();
    if (!trimmed) return null;
    const digitsOnly = trimmed.replace(/\D/g, "");
    if (digitsOnly.length < 7 || digitsOnly.length > 15) {
      return "Enter a valid phone number (7-15 digits)";
    }
    const phoneRegex = /^\+?[0-9]{7,15}$/;
    if (!phoneRegex.test(trimmed)) {
      return "Enter a valid phone number format";
    }
    return null;
  };

  const validateSubject = (subject: string): string | null => {
    if (!subject.trim()) return "Subject is required";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, phone: true, subject: true });

    const nameErr = validateName(form.name);
    const emailErr = validateEmail(form.email);
    const phoneErr = validatePhone(form.phone);
    const subjectErr = validateSubject(form.subject);

    setErrors({
      name: nameErr,
      email: emailErr,
      phone: phoneErr,
      subject: subjectErr,
    });

    if (nameErr || emailErr || phoneErr || subjectErr) {
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    try {
      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        company: form.company.trim(),
        subject: form.subject.trim(),
        message: form.message.trim(),
      };

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok || data.success === false) {
        throw new Error(data.message || data.error || "Unable to send your request right now. Please try again.");
      }

      setSent(true);
    } catch (err: any) {
      console.error("Form submission error:", err);
      setSubmitError(err.message || "Unable to send your request right now. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="pt-8 pb-16 sm:pb-20 bg-background relative overflow-hidden transition-colors duration-200">
      {/* Subtle divider line between FAQ and Contact */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 sm:mb-14">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
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
              <h2 className="font-['Outfit',sans-serif] font-bold text-2xl xs:text-3xl sm:text-4xl lg:text-[42px] leading-[1.15] tracking-tight text-foreground mb-4">
                Let&apos;s Build<br />
                <span className="text-[#f97316]">Something Great Together.</span>
              </h2>

              {/* Supporting Text */}
              <p className="font-['Outfit',sans-serif] text-stone-600 dark:text-stone-300 text-sm sm:text-[14.5px] leading-relaxed mb-8">
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
                    <h3 className="font-['Outfit',sans-serif] font-bold text-2xl text-foreground">Thank you!</h3>
                    <p className="font-['Outfit',sans-serif] text-stone-600 dark:text-stone-300 text-sm max-w-sm">
                      Your consultation request has been sent successfully. We&apos;ll get back to you shortly.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSent(false);
                        setForm({
                          name: "",
                          email: "",
                          phone: "",
                          company: "",
                          subject: "Book a Consultation",
                          message: "",
                        });
                        setTouched({ name: false, email: false, phone: false, subject: false });
                        setErrors({});
                      }}
                      className="mt-2 text-[#f97316] text-sm font-['Outfit',sans-serif] font-bold hover:underline cursor-pointer"
                    >
                      Book another consultation
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
                    {/* Row 1: Name and Email 2-column row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="font-['JetBrains_Mono',monospace] text-[10.5px] tracking-widest uppercase font-bold text-stone-600 dark:text-stone-400 block mb-1.5">
                          NAME <span className="text-[#f97316]">*</span>
                        </label>
                        <input
                          type="text"
                          value={form.name}
                          onChange={(e) => {
                            setForm((f) => ({ ...f, name: e.target.value }));
                            if (touched.name) setErrors((prev) => ({ ...prev, name: validateName(e.target.value) }));
                          }}
                          onBlur={() => {
                            setTouched((t) => ({ ...t, name: true }));
                            setErrors((prev) => ({ ...prev, name: validateName(form.name) }));
                          }}
                          className={`w-full px-4 py-2.5 rounded-lg border ${touched.name && errors.name
                            ? "border-red-500/80 focus:ring-red-500/20"
                            : "border-border focus:border-[#f97316] focus:ring-orange-500/20"
                            } bg-muted/40 dark:bg-[#18130e] font-['Outfit',sans-serif] text-sm text-foreground placeholder:text-stone-400 dark:placeholder:text-stone-500 outline-none focus:ring-2 transition-all`}
                          placeholder="Your name"
                        />
                        {touched.name && errors.name && (
                          <p className="font-['Outfit',sans-serif] text-xs text-red-500 mt-1 font-medium">{errors.name}</p>
                        )}
                      </div>

                      <div>
                        <label className="font-['JetBrains_Mono',monospace] text-[10.5px] tracking-widest uppercase font-bold text-stone-600 dark:text-stone-400 block mb-1.5">
                          EMAIL <span className="text-[#f97316]">*</span>
                        </label>
                        <input
                          type="email"
                          value={form.email}
                          onChange={(e) => {
                            setForm((f) => ({ ...f, email: e.target.value }));
                            if (touched.email) setErrors((prev) => ({ ...prev, email: validateEmail(e.target.value) }));
                          }}
                          onBlur={() => {
                            setTouched((t) => ({ ...t, email: true }));
                            setErrors((prev) => ({ ...prev, email: validateEmail(form.email) }));
                          }}
                          className={`w-full px-4 py-2.5 rounded-lg border ${touched.email && errors.email
                            ? "border-red-500/80 focus:ring-red-500/20"
                            : "border-border focus:border-[#f97316] focus:ring-orange-500/20"
                            } bg-muted/40 dark:bg-[#18130e] font-['Outfit',sans-serif] text-sm text-foreground placeholder:text-stone-400 dark:placeholder:text-stone-500 outline-none focus:ring-2 transition-all`}
                          placeholder="you@company.com"
                        />
                        {touched.email && errors.email && (
                          <p className="font-['Outfit',sans-serif] text-xs text-red-500 mt-1 font-medium">{errors.email}</p>
                        )}
                      </div>
                    </div>

                    {/* Row 2: Phone Number on the left (directly below Name), right side aligned */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="font-['JetBrains_Mono',monospace] text-[10.5px] tracking-widest uppercase font-bold text-stone-600 dark:text-stone-400 block mb-1.5">
                          PHONE NUMBER
                        </label>
                        <input
                          type="tel"
                          maxLength={15}
                          value={form.phone}
                          onChange={(e) => {
                            let val = e.target.value;
                            let cleaned = "";
                            if (val.startsWith("+")) {
                              cleaned = "+" + val.slice(1).replace(/\D/g, "");
                            } else {
                              cleaned = val.replace(/\D/g, "");
                            }
                            if (cleaned.length > 15) {
                              cleaned = cleaned.slice(0, 15);
                            }
                            setForm((f) => ({ ...f, phone: cleaned }));
                            if (touched.phone) setErrors((prev) => ({ ...prev, phone: validatePhone(cleaned) }));
                          }}
                          onBlur={() => {
                            setTouched((t) => ({ ...t, phone: true }));
                            setErrors((prev) => ({ ...prev, phone: validatePhone(form.phone) }));
                          }}
                          className={`w-full px-4 py-2.5 rounded-lg border ${touched.phone && errors.phone
                            ? "border-red-500/80 focus:ring-red-500/20"
                            : "border-border focus:border-[#f97316] focus:ring-orange-500/20"
                            } bg-muted/40 dark:bg-[#18130e] font-['Outfit',sans-serif] text-sm text-foreground placeholder:text-stone-400 dark:placeholder:text-stone-500 outline-none focus:ring-2 transition-all`}
                          placeholder="+1 (555) 000-0000"
                        />
                        {touched.phone && errors.phone && (
                          <p className="font-['Outfit',sans-serif] text-xs text-red-500 mt-1 font-medium">{errors.phone}</p>
                        )}
                      </div>
                      <div className="hidden sm:block pointer-events-none" aria-hidden="true" />
                    </div>

                    {/* Row 3: Company — full width */}
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

                    {/* Row 4: Subject * — full width */}
                    <div>
                      <label className="font-['JetBrains_Mono',monospace] text-[10.5px] tracking-widest uppercase font-bold text-stone-600 dark:text-stone-400 block mb-1.5">
                        SUBJECT <span className="text-[#f97316]">*</span>
                      </label>
                      <div className="relative">
                        <select
                          value={form.subject}
                          onChange={(e) => {
                            setForm((f) => ({ ...f, subject: e.target.value }));
                            if (touched.subject) setErrors((prev) => ({ ...prev, subject: validateSubject(e.target.value) }));
                          }}
                          onBlur={() => {
                            setTouched((t) => ({ ...t, subject: true }));
                            setErrors((prev) => ({ ...prev, subject: validateSubject(form.subject) }));
                          }}
                          className={`w-full px-4 py-2.5 rounded-lg border ${touched.subject && errors.subject
                            ? "border-red-500/80 focus:ring-red-500/20"
                            : "border-border focus:border-[#f97316] focus:ring-orange-500/20"
                            } bg-muted/40 dark:bg-[#18130e] font-['Outfit',sans-serif] text-sm text-foreground outline-none focus:ring-2 transition-all appearance-none cursor-pointer`}
                        >
                          {["Book a Consultation", "Product Demo", "Enterprise Pricing", "Technical Question", "Partnership"].map((s) => (
                            <option key={s} value={s} className="bg-card text-foreground">
                              {s}
                            </option>
                          ))}
                        </select>
                        <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
                      </div>
                      {touched.subject && errors.subject && (
                        <p className="font-['Outfit',sans-serif] text-xs text-red-500 mt-1 font-medium">{errors.subject}</p>
                      )}
                    </div>

                    {/* Row 5: Message — full width (optional) */}
                    <div>
                      <label className="font-['JetBrains_Mono',monospace] text-[10.5px] tracking-widest uppercase font-bold text-stone-600 dark:text-stone-400 block mb-1.5">
                        MESSAGE
                      </label>
                      <textarea
                        rows={3}
                        value={form.message}
                        onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                        className="w-full px-4 py-2.5 rounded-lg border border-border bg-muted/40 dark:bg-[#18130e] font-['Outfit',sans-serif] text-sm text-foreground placeholder:text-stone-400 dark:placeholder:text-stone-500 outline-none focus:border-[#f97316] focus:ring-2 focus:ring-orange-500/20 transition-all resize-none"
                        placeholder="Tell us about your challenge (optional)..."
                      />
                    </div>

                    {submitError && (
                      <p className="font-['Outfit',sans-serif] text-xs text-red-500 font-medium text-center">{submitError}</p>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={submitting}
                      className={`w-full py-3.5 rounded-xl font-['Outfit',sans-serif] font-bold text-white text-[14.5px] flex items-center justify-center gap-2 transition-all hover:opacity-95 active:scale-[0.99] shadow-lg shadow-orange-500/25 mt-1 cursor-pointer ${submitting ? "opacity-75 cursor-not-allowed" : ""
                        }`}
                      style={{ background: "linear-gradient(90deg, #f97316 0%, #ea580c 100%)" }}
                    >
                      {submitting ? (
                        <>
                          <RefreshCw size={15} className="animate-spin" /> Submitting...
                        </>
                      ) : (
                        <>
                          <Calendar size={15} /> Book a Consultation <Send size={13} />
                        </>
                      )}
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
function XIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function Footer({ onOpenPrivacy, dark }: { onOpenPrivacy: () => void; dark: boolean }) {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollTo = (href: string) => {
    if (href === "/insights" || href.startsWith("/insights")) {
      navigate(href);
      return;
    }
    const id = href.replace("#", "");
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleLogoClick = () => {
    if (location.pathname !== "/") {
      navigate("/");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const companyLinks = [
    { label: "About Us", href: "#about" },
    { label: "Industries", href: "#industries" },
    { label: "What We Do", href: "#what-we-do" },
    { label: "How We Build", href: "#how-we-build" },
    { label: "Insights", href: "/insights" },
    { label: "Success Stories", href: "#stories" },
    { label: "Engineering", href: "#technology" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact Us", href: "#contact" },
  ];

  const solutionsLinks = [
    { label: "AI Solutions", href: "#what-we-do" },
    { label: "Software Engineering", href: "#how-we-build" },
    { label: "Intelligent Automation", href: "#what-we-do" },
    { label: "Data & Analytics", href: "#technology" },
    { label: "Digital Transformation", href: "#what-we-do" },
    { label: "Consulting", href: "#how-we-partner" },
  ];

  const legalLinks = [
    { label: "Privacy Policy", onClick: onOpenPrivacy },
    { label: "Terms of Use", onClick: onOpenPrivacy },
    { label: "Cookie Policy", onClick: onOpenPrivacy },
    { label: "Accessibility", href: "#about" },
    { label: "Security", href: "#technology" },
    { label: "Contact", href: "#contact" },
  ];

  const socialLinks = [
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/askjuno",
      icon: <Linkedin size={15} strokeWidth={1.8} />,
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/askjuno",
      icon: <Instagram size={15} strokeWidth={1.8} />,
    },
    {
      name: "YouTube",
      href: "https://www.youtube.com/@askjuno",
      icon: <Youtube size={15} strokeWidth={1.8} />,
    },
    {
      name: "X",
      href: "https://x.com/askjuno",
      icon: <XIcon className="w-3.5 h-3.5" />,
    },
    {
      name: "GitHub",
      href: "https://github.com/askjuno",
      icon: <Github size={15} strokeWidth={1.8} />,
    },
  ];

  return (
    <footer className="bg-[#f8fafc] dark:bg-[#0c0c0e] border-t border-border/70 pt-14 sm:pt-18 lg:pt-20 pb-10 sm:pb-12 relative overflow-hidden transition-colors duration-200">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 w-full">
        {/* Top Footer: 4-Column Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 pb-12 sm:pb-14">
          {/* COLUMN 1 — ASKJUNO BRAND */}
          <div className="flex flex-col">
            <div className="mb-4">
              <ImageWithFallback
                src={dark ? logoDark : logoLight}
                alt="AskJuno"
                className="h-8 xs:h-9 sm:h-10 w-auto object-contain cursor-pointer transition-opacity hover:opacity-90"
                onClick={handleLogoClick}
              />
            </div>
            <p className="font-['Outfit',sans-serif] text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed max-w-[280px]">
              Enterprise AI and intelligent automation, responsibly built for modern engineering.
            </p>
          </div>

          {/* COLUMN 2 — COMPANY */}
          <div className="flex flex-col">
            <h4 className="font-['JetBrains_Mono',monospace] text-[11px] font-bold uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400 mb-4 sm:mb-5 sm:mt-1">
              COMPANY
            </h4>

            <ul className="space-y-1.5 sm:space-y-2">
              {companyLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(item.href);
                    }}
                    className="inline-flex items-center min-h-[32px] py-1 text-[13.5px] sm:text-[14px] font-['Outfit',sans-serif] text-stone-700 dark:text-stone-300 hover:text-orange-500 font-medium transition-colors cursor-pointer"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 3 — SOLUTIONS */}
          <div className="flex flex-col">
            <h4 className="font-['JetBrains_Mono',monospace] text-[11px] font-bold uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400 mb-4 sm:mb-5 sm:mt-1">
              SOLUTIONS
            </h4>

            <ul className="space-y-1.5 sm:space-y-2">
              {solutionsLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(item.href);
                    }}
                    className="inline-flex items-center min-h-[32px] py-1 text-[13.5px] sm:text-[14px] font-['Outfit',sans-serif] text-stone-700 dark:text-stone-300 hover:text-orange-500 font-medium transition-colors cursor-pointer"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 4 — LEGAL & SUPPORT */}
          <div className="flex flex-col">
            <h4 className="font-['JetBrains_Mono',monospace] text-[11px] font-bold uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400 mb-4 sm:mb-5 sm:mt-1">
              LEGAL & SUPPORT
            </h4>

            <ul className="space-y-1.5 sm:space-y-2">
              {legalLinks.map((item) => (
                <li key={item.label}>
                  {item.onClick ? (
                    <button
                      type="button"
                      onClick={item.onClick}
                      className="inline-flex items-center min-h-[32px] py-1 text-left text-[13.5px] sm:text-[14px] font-['Outfit',sans-serif] text-stone-700 dark:text-stone-300 hover:text-orange-500 font-medium transition-colors cursor-pointer focus:outline-none focus-visible:text-orange-500"
                    >
                      {item.label}
                    </button>
                  ) : (
                    <a
                      href={item.href}
                      onClick={(e) => {
                        if (item.href?.startsWith("#")) {
                          e.preventDefault();
                          scrollTo(item.href);
                        }
                      }}
                      className="inline-flex items-center min-h-[32px] py-1 text-[13.5px] sm:text-[14px] font-['Outfit',sans-serif] text-stone-700 dark:text-stone-300 hover:text-orange-500 font-medium transition-colors cursor-pointer focus:outline-none focus-visible:text-orange-500"
                    >
                      {item.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 5. DIVIDER: Thin horizontal divider spanning the content width */}
        <div className="border-t border-stone-200 dark:border-stone-800" />

        {/* 6. BOTTOM ROW: Copyright on Left, Social Icons on Right */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-5">
          <p className="font-['Outfit',sans-serif] text-xs sm:text-[13px] text-stone-500 dark:text-stone-400 text-center sm:text-left">
            © 2026 AskJuno Private Limited. All rights reserved.
          </p>

          {/* Circular social-media buttons with thin orange border */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#f97316] flex items-center justify-center text-stone-800 dark:text-stone-200 hover:text-[#f97316] hover:bg-[#f97316]/10 hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ── Landing Page Sections ──────────────────────────────────────────────────
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

function HomeLandingPage({
  activeSection,
  scrollToSection,
}: {
  activeSection: number;
  scrollToSection: (i: number) => void;
}) {
  return (
    <>
      <SectionFlash activeSection={activeSection} />
      <SideDots active={activeSection} onDotClick={scrollToSection} />
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
      <StoriesSection />
      <OurPeopleSection />
      <ThinkingSection />
      <FAQSection />
      <ContactSection />
    </>
  );
}

// ── Root ────────────────────────────────────────────────────────────────────
export default function App() {
  const [dark, setDark] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("askjuno-theme");
      if (saved) return saved === "dark";
    }
    return false;
  });
  const [activeSection, setActiveSection] = useState(0);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    try {
      localStorage.setItem("askjuno-theme", dark ? "dark" : "light");
    } catch {
      // ignore
    }
  }, [dark]);

  useSectionReveal(SECTION_IDS);

  useEffect(() => {
    if (location.pathname !== "/") return;
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
  }, [location.pathname]);

  const scrollToSection = (i: number) => {
    document.getElementById(SECTION_IDS[i])?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground transition-colors duration-350">
      <ScrollToTop />
      <ScrollProgress />
      <Navbar dark={dark} setDark={setDark} activeSection={activeSection} />
      <ThemeToggle dark={dark} setDark={setDark} />
      <QuickNavArrows activeSection={activeSection} />

      <main>
        <Routes>
          <Route
            path="/"
            element={
              <HomeLandingPage
                activeSection={activeSection}
                scrollToSection={scrollToSection}
              />
            }
          />
          <Route path="/insights" element={<InsightsPage />} />
          <Route path="/insights/:topicSlug" element={<DomainPage />} />
          <Route path="/insights/:topicSlug/:articleSlug" element={<ArticlePage />} />

          {/* Backward compatibility redirects */}
          <Route
            path="/insights/ai-automation"
            element={<Navigate to="/insights/ai-intelligent-automation" replace />}
          />
          <Route
            path="/insights/ai-automation/:articleSlug"
            element={<Navigate to="/insights/ai-intelligent-automation" replace />}
          />
        </Routes>
      </main>

      <Footer onOpenPrivacy={() => setPrivacyOpen(true)} dark={dark} />
      <PrivacyPolicyModal isOpen={privacyOpen} onClose={() => setPrivacyOpen(false)} dark={dark} />
    </div>
  );
}
