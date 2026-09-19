import React, { useState } from "react";
import { ChevronLeft, ChevronRight, ArrowRight, Linkedin } from "lucide-react";

import person1 from "@/imports/team/person_1.png";
import person2 from "@/imports/team/person_2.png";
import person3 from "@/imports/team/person_3.png";
import person4 from "@/imports/team/person_4.png";
import person5 from "@/imports/team/person_5.png";
import person6 from "@/imports/team/person_6.png";
import person7 from "@/imports/team/person_7.png";
import person8 from "@/imports/team/person_8.png";

export interface Employee {
  id: string;
  name: string;
  role: string;
  image: string;
  description: string;
  imageScale?: string;
}

// ── 12 Data-Driven Employee Records ─────────────────────────────────────────
// Featuring real team member photography for the AskJuno engineering and product team.
export const EMPLOYEES: Employee[] = [
  {
    id: "emp-01",
    name: "Employee Name 01",
    role: "Engineering Leadership",
    image: person1,
    description: "Enterprise Architecture · AI Systems · Cloud Strategy",
  },
  {
    id: "emp-02",
    name: "Employee Name 02",
    role: "Principal AI Engineer",
    image: person2,
    imageScale: "scale-[1.08]",
    description: "LLM Orchestration · NLP · Intelligent Automation",
  },
  {
    id: "emp-03",
    name: "Employee Name 03",
    role: "Lead Software Architect",
    image: person3,
    description: "Distributed Systems · Microservices · Cloud Platforms",
  },
  {
    id: "emp-04",
    name: "Employee Name 04",
    role: "Senior Full-Stack Engineer",
    image: person4,
    imageScale: "scale-[1.08]",
    description: "React · TypeScript · High-Throughput APIs",
  },
  {
    id: "emp-05",
    name: "Employee Name 05",
    role: "Data Engineering Lead",
    image: person5,
    description: "Data Pipelines · Real-Time Analytics · Data Governance",
  },
  {
    id: "emp-06",
    name: "Employee Name 06",
    role: "Cloud & DevOps Specialist",
    image: person6,
    description: "Kubernetes · CI/CD · Cloud Security · AWS / Azure",
  },
  {
    id: "emp-07",
    name: "Employee Name 07",
    role: "Senior Product Engineer",
    image: person7,
    description: "SaaS Platforms · Workflow Automation · UX Systems",
  },
  {
    id: "emp-08",
    name: "Employee Name 08",
    role: "Machine Learning Engineer",
    image: person8,
    imageScale: "scale-[1.08]",
    description: "Predictive Models · Computer Vision · Inference Optimization",
  },
  {
    id: "emp-09",
    name: "Employee Name 09",
    role: "Solutions Architect",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80",
    description: "Enterprise Integrations · ERP/CRM Systems · API Gateways",
  },
  {
    id: "emp-10",
    name: "Employee Name 10",
    role: "Security & QA Engineer",
    image: "https://images.unsplash.com/photo-1573497019236-17f8177b81e8?auto=format&fit=crop&w=800&q=80",
    description: "Secure SDLC · Automated Testing · Compliance & Audits",
  },
  {
    id: "emp-11",
    name: "Employee Name 11",
    role: "Platform Engineer",
    image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&w=800&q=80",
    description: "Infrastructure as Code · Observability · Reliability",
  },
  {
    id: "emp-12",
    name: "Employee Name 12",
    role: "Technical Lead",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80",
    description: "System Modernization · Agile Delivery · Technical Strategy",
  },
];

// ── LinkedIn Company Posts Data Structure ────────────────────────────────────
// Clean data-driven placeholder structure for AskJuno company posts.
export interface LinkedInPost {
  id: string;
  postUrl: string;
  date: string;
  text: string;
  image?: string;
  companyName: string;
  companyHandle: string;
}

export const ASKJUNO_LINKEDIN_URL = "https://www.linkedin.com/company/askjuno/";

export const LINKEDIN_POSTS: LinkedInPost[] = [
  {
    id: "post-1",
    postUrl: ASKJUNO_LINKEDIN_URL,
    date: "Recent",
    text: "Building scalable enterprise software requires moving beyond quick prototypes. At AskJuno, we combine deep engineering rigor with AI capabilities to solve real operational bottlenecks.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    companyName: "AskJuno",
    companyHandle: "@askjuno",
  },
  {
    id: "post-2",
    postUrl: ASKJUNO_LINKEDIN_URL,
    date: "1 week ago",
    text: "How do you ensure AI works reliably in production? Our latest engineering perspective explores resilient architecture, human-in-the-loop validation, and enterprise governance.",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
    companyName: "AskJuno",
    companyHandle: "@askjuno",
  },
  {
    id: "post-3",
    postUrl: ASKJUNO_LINKEDIN_URL,
    date: "2 weeks ago",
    text: "Great products are built by passionate teams. Celebrating our engineering milestones and the people driving impactful technology forward every single day.",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80",
    companyName: "AskJuno",
    companyHandle: "@askjuno",
  },
];

export default function OurPeopleSection() {
  // Desktop pagination: 2 pages (6 employees each)
  const [desktopPage, setDesktopPage] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  // Mobile pagination: 12 cards (1 employee each)
  const [mobileIndex, setMobileIndex] = useState<number>(0);

  // LinkedIn post pagination: 3 posts
  const [activePostIdx, setActivePostIdx] = useState<number>(0);
  const [isPostTransitioning, setIsPostTransitioning] = useState<boolean>(false);

  const totalDesktopPages = Math.ceil(EMPLOYEES.length / 2);

  const changeDesktopPage = (newPage: number) => {
    if (newPage < 0 || newPage >= totalDesktopPages || newPage === desktopPage) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setDesktopPage(newPage);
      setIsTransitioning(false);
    }, 180);
  };

  const changeMobileIndex = (newIndex: number) => {
    if (newIndex < 0 || newIndex >= EMPLOYEES.length) return;
    setMobileIndex(newIndex);
  };

  const changePost = (newIdx: number) => {
    if (newIdx < 0 || newIdx >= LINKEDIN_POSTS.length || newIdx === activePostIdx) return;
    setIsPostTransitioning(true);
    setTimeout(() => {
      setActivePostIdx(newIdx);
      setIsPostTransitioning(false);
    }, 150);
  };

  const currentDesktopEmployees = EMPLOYEES.slice(desktopPage * 2, (desktopPage + 1) * 2);
  const currentPost = LINKEDIN_POSTS[activePostIdx];

  return (
    <section
      id="our-people"
      className="py-10 sm:py-12 bg-[#fbfaf8] dark:bg-[#0d0d10] border-t border-stone-200/70 dark:border-stone-800/80 relative overflow-hidden transition-colors duration-200"
    >
      {/* Background ambient gradient */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-24 right-1/4 w-[400px] h-[400px] rounded-full opacity-[0.035] dark:opacity-[0.05]"
          style={{ background: "radial-gradient(circle, #f97316 0%, transparent 70%)" }}
        />
        <div
          className="absolute -bottom-24 left-10 w-[320px] h-[320px] rounded-full opacity-[0.025] dark:opacity-[0.04]"
          style={{ background: "radial-gradient(circle, #f59e0b 0%, transparent 70%)" }}
        />
      </div>

      <div className="max-w-[1120px] mx-auto px-4 sm:px-6 relative z-10 w-full">
        {/* ── SECTION HEADER ────────────────────────────────────────────────── */}
        <div className="mb-6 sm:mb-7">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-3.5 h-0.5 bg-[#f97316]" />
            <span className="font-['JetBrains_Mono',monospace] text-[10.5px] font-bold uppercase tracking-[0.2em] text-[#f97316]">
              OUR PEOPLE
            </span>
          </div>

          <div className="max-w-xl">
            <h2 className="font-['Outfit',sans-serif] font-black text-xl sm:text-2xl lg:text-[30px] leading-[1.15] text-stone-900 dark:text-white mb-1.5">
              The People Behind <span className="text-[#f97316]">AskJuno.</span>
            </h2>
            <p className="font-['Outfit',sans-serif] text-stone-600 dark:text-stone-400 text-xs sm:text-[13.5px] leading-relaxed">
              Meet the people building technology that solves real business problems.
            </p>
          </div>
        </div>

        {/* ── MAIN LAYOUT: LEFT ~70% (EMPLOYEES) & RIGHT ~30% (LINKEDIN) ────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-start">
          
          {/* ── LEFT SIDE: EMPLOYEE SHOWCASE (~70% = 8 cols) ──────────────── */}
          <div className="lg:col-span-8 flex flex-col justify-between">
            {/* Desktop & Tablet Grid (2 columns x 1 row) */}
            <div className="hidden sm:block">
              <div
                className={`grid grid-cols-2 gap-3 sm:gap-3.5 transition-all duration-300 ease-out ${
                  isTransitioning ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
                }`}
              >
                {currentDesktopEmployees.map((emp) => (
                  <div
                    key={emp.id}
                    className="group rounded-[14px] bg-white dark:bg-[#151518] border border-stone-200/80 dark:border-stone-800/80 p-3 sm:p-3.5 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:border-[#f97316]/40 hover:shadow-lg hover:shadow-orange-500/5 cursor-default"
                  >
                    {/* Portrait Photo (2x1 proportioned aspect ratio) */}
                    <div className="relative aspect-[4/3.5] w-full rounded-[10px] overflow-hidden bg-stone-100 dark:bg-stone-800 mb-2.5">
                      <img
                        src={emp.image}
                        alt={emp.name}
                        loading="lazy"
                        className={`w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 ${
                          emp.imageScale || ""
                        }`}
                      />
                    </div>

                    {/* Employee Details — No individual social links */}
                    <div className="flex flex-col flex-1 justify-between pt-0.5">
                      <div>
                        <h3 className="font-['Outfit',sans-serif] font-bold text-[13.5px] sm:text-[14px] text-stone-900 dark:text-stone-100 leading-snug">
                          {emp.name}
                        </h3>
                        <p className="font-['Outfit',sans-serif] text-[11px] sm:text-[11.5px] font-medium text-[#f97316] mt-0.5 mb-1">
                          {emp.role}
                        </p>
                      </div>
                      <p className="font-['Outfit',sans-serif] text-[10.5px] sm:text-[11px] text-stone-500 dark:text-stone-400 leading-relaxed border-t border-stone-100 dark:border-stone-800/80 pt-1.5 line-clamp-2">
                        {emp.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop Pagination Controls (6 Pages for 12 Employees) */}
              <div className="mt-4 pt-2.5 flex items-center justify-between border-t border-stone-200/60 dark:border-stone-800/60">
                <div className="flex items-center gap-2">
                  <span className="font-['JetBrains_Mono',monospace] text-[10.5px] font-semibold text-stone-500 dark:text-stone-400">
                    Showing {desktopPage * 2 + 1}–{Math.min((desktopPage + 1) * 2, EMPLOYEES.length)} of {EMPLOYEES.length}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => changeDesktopPage(desktopPage - 1)}
                    disabled={desktopPage === 0}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-['Outfit',sans-serif] font-semibold flex items-center gap-1 transition-all duration-200 ${
                      desktopPage === 0
                        ? "text-stone-400 dark:text-stone-600 bg-stone-100/70 dark:bg-stone-800/40 cursor-not-allowed"
                        : "text-stone-700 dark:text-stone-200 bg-stone-100 dark:bg-stone-800 hover:bg-[#f97316]/10 hover:text-[#f97316] cursor-pointer"
                    }`}
                  >
                    <ChevronLeft size={12} />
                    <span>Previous</span>
                  </button>

                  <div className="flex items-center gap-1.5 px-1">
                    {Array.from({ length: totalDesktopPages }).map((_, p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => changeDesktopPage(p)}
                        className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                          desktopPage === p
                            ? "w-4 bg-[#f97316]"
                            : "w-1.5 bg-stone-300 dark:bg-stone-700 hover:bg-stone-400 dark:hover:bg-stone-600"
                        }`}
                        aria-label={`Page ${p + 1}`}
                      />
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => changeDesktopPage(desktopPage + 1)}
                    disabled={desktopPage === totalDesktopPages - 1}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-['Outfit',sans-serif] font-semibold flex items-center gap-1 transition-all duration-200 ${
                      desktopPage === totalDesktopPages - 1
                        ? "text-stone-400 dark:text-stone-600 bg-stone-100/70 dark:bg-stone-800/40 cursor-not-allowed"
                        : "text-stone-700 dark:text-stone-200 bg-stone-100 dark:bg-stone-800 hover:bg-[#f97316]/10 hover:text-[#f97316] cursor-pointer"
                    }`}
                  >
                    <span>Next</span>
                    <ChevronRight size={12} />
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile View: 1 Card at a Time with ← 1 / 12 → Controls */}
            <div className="block sm:hidden">
              {(() => {
                const emp = EMPLOYEES[mobileIndex];
                return (
                  <div className="w-full max-w-[272px] xs:max-w-[290px] mx-auto rounded-[14px] bg-white dark:bg-[#151518] border border-stone-200/80 dark:border-stone-800/80 p-3 flex flex-col shadow-sm">
                    <div className="relative aspect-[4/4.2] w-full rounded-[10px] overflow-hidden bg-stone-100 dark:bg-stone-800 mb-2.5">
                      <img
                        src={emp.image}
                        alt={emp.name}
                        className={`w-full h-full object-cover ${emp.imageScale || ""}`}
                      />
                    </div>
                    <div>
                      <h3 className="font-['Outfit',sans-serif] font-bold text-[14px] text-stone-900 dark:text-stone-100">
                        {emp.name}
                      </h3>
                      <p className="font-['Outfit',sans-serif] text-[11.5px] font-medium text-[#f97316] mt-0.5 mb-1">
                        {emp.role}
                      </p>
                      <p className="font-['Outfit',sans-serif] text-[11px] text-stone-500 dark:text-stone-400 leading-relaxed border-t border-stone-100 dark:border-stone-800/80 pt-1.5">
                        {emp.description}
                      </p>
                    </div>
                  </div>
                );
              })()}

              {/* Mobile Carousel Bar */}
              <div className="flex items-center justify-between mt-3 px-2 w-full max-w-[272px] xs:max-w-[290px] mx-auto">
                <button
                  type="button"
                  onClick={() => changeMobileIndex(mobileIndex - 1)}
                  disabled={mobileIndex === 0}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                    mobileIndex === 0
                      ? "text-stone-300 dark:text-stone-700 bg-stone-100/50 dark:bg-stone-800/30 cursor-not-allowed"
                      : "text-stone-700 dark:text-stone-200 bg-stone-100 dark:bg-stone-800 active:bg-orange-500 active:text-white"
                  }`}
                  aria-label="Previous employee"
                >
                  <ChevronLeft size={16} />
                </button>

                <span className="font-['JetBrains_Mono',monospace] text-[11px] font-semibold text-stone-600 dark:text-stone-400">
                  {mobileIndex + 1} / {EMPLOYEES.length}
                </span>

                <button
                  type="button"
                  onClick={() => changeMobileIndex(mobileIndex + 1)}
                  disabled={mobileIndex === EMPLOYEES.length - 1}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                    mobileIndex === EMPLOYEES.length - 1
                      ? "text-stone-300 dark:text-stone-700 bg-stone-100/50 dark:bg-stone-800/30 cursor-not-allowed"
                      : "text-stone-700 dark:text-stone-200 bg-stone-100 dark:bg-stone-800 active:bg-orange-500 active:text-white"
                  }`}
                  aria-label="Next employee"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* ── RIGHT SIDE: DEDICATED LINKEDIN AREA (~30% = 4 cols) ───────── */}
          <div className="lg:col-span-4 flex flex-col">
            {/* Header for LinkedIn block */}
            <div className="flex items-center justify-between mb-2.5">
              <div>
                <span className="font-['JetBrains_Mono',monospace] text-[9.5px] font-bold uppercase tracking-[0.18em] text-[#f97316] block">
                  FROM LINKEDIN
                </span>
                <h3 className="font-['Outfit',sans-serif] font-bold text-base text-stone-900 dark:text-stone-100">
                  Recent Post
                </h3>
              </div>

              {/* LinkedIn Post Navigation (1 / 3) */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => changePost(activePostIdx - 1)}
                  disabled={activePostIdx === 0}
                  className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${
                    activePostIdx === 0
                      ? "text-stone-300 dark:text-stone-700 cursor-not-allowed"
                      : "text-stone-700 dark:text-stone-300 hover:text-[#f97316] hover:bg-[#f97316]/10 cursor-pointer"
                  }`}
                  aria-label="Previous LinkedIn post"
                >
                  <ChevronLeft size={13} />
                </button>

                <span className="font-['JetBrains_Mono',monospace] text-[10px] font-semibold text-stone-500 dark:text-stone-400 px-0.5">
                  {activePostIdx + 1} / {LINKEDIN_POSTS.length}
                </span>

                <button
                  type="button"
                  onClick={() => changePost(activePostIdx + 1)}
                  disabled={activePostIdx === LINKEDIN_POSTS.length - 1}
                  className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${
                    activePostIdx === LINKEDIN_POSTS.length - 1
                      ? "text-stone-300 dark:text-stone-700 cursor-not-allowed"
                      : "text-stone-700 dark:text-stone-300 hover:text-[#f97316] hover:bg-[#f97316]/10 cursor-pointer"
                  }`}
                  aria-label="Next LinkedIn post"
                >
                  <ChevronRight size={13} />
                </button>
              </div>
            </div>

            {/* Exactly ONE Square (1:1 Aspect Ratio) LinkedIn Card */}
            <div className="w-full max-w-[280px] lg:max-w-none aspect-square mx-auto lg:mx-0 rounded-[16px] bg-white dark:bg-[#151518] border border-stone-200/80 dark:border-stone-800/80 p-3.5 sm:p-4 flex flex-col justify-between shadow-sm relative overflow-hidden group">
              {/* Animated transition wrapper */}
              <div
                className={`flex flex-col h-full justify-between transition-opacity duration-200 ${
                  isPostTransitioning ? "opacity-0" : "opacity-100"
                }`}
              >
                {/* Header: Company Avatar + LinkedIn Branding */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {/* AskJuno Mark */}
                      <a
                        href={ASKJUNO_LINKEDIN_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-7 h-7 rounded-md bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white font-black text-[11px] tracking-tight shadow-sm hover:opacity-95 transition-opacity"
                        aria-label="AskJuno LinkedIn"
                      >
                        AJ
                      </a>
                      <div>
                        <a
                          href={ASKJUNO_LINKEDIN_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-['Outfit',sans-serif] font-bold text-[12.5px] text-stone-900 dark:text-stone-100 hover:text-[#f97316] transition-colors block leading-tight"
                        >
                          {currentPost.companyName}
                        </a>
                        <span className="font-['JetBrains_Mono',monospace] text-[9.5px] text-stone-400 dark:text-stone-500">
                          {currentPost.companyHandle} · {currentPost.date}
                        </span>
                      </div>
                    </div>

                    {/* Official LinkedIn Icon connecting to AskJuno company page */}
                    <a
                      href={ASKJUNO_LINKEDIN_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-6 h-6 rounded-md bg-[#0077b5]/10 flex items-center justify-center text-[#0077b5] hover:bg-[#0077b5] hover:text-white transition-all duration-200"
                      aria-label="Official AskJuno LinkedIn"
                    >
                      <Linkedin size={12} strokeWidth={2} />
                    </a>
                  </div>

                  {/* Post narrative text — uncluttered, no fake vanity metrics */}
                  <p className="font-['Outfit',sans-serif] text-[11px] sm:text-[11.5px] text-stone-700 dark:text-stone-300 leading-relaxed line-clamp-3 mb-1.5">
                    {currentPost.text}
                  </p>
                </div>

                {/* Post visual thumbnail */}
                {currentPost.image && (
                  <div className="relative flex-1 min-h-[60px] max-h-[90px] rounded-md overflow-hidden bg-stone-100 dark:bg-stone-800 my-1">
                    <img
                      src={currentPost.image}
                      alt="AskJuno LinkedIn update"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}

                {/* Footer action: View on LinkedIn */}
                <div className="pt-2 border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between">
                  <span className="font-['Outfit',sans-serif] text-[10px] text-stone-400 dark:text-stone-500">
                    Official Company Update
                  </span>
                  <a
                    href={currentPost.postUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-['Outfit',sans-serif] font-bold text-[#f97316] hover:text-orange-600 transition-colors focus:outline-none focus-visible:underline"
                  >
                    <span>View on LinkedIn</span>
                    <ArrowRight size={11} className="transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── BOTTOM HORIZONTAL CTA ─────────────────────────────────────────── */}
        <div className="mt-7 sm:mt-8 rounded-xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-[#151518] px-4 py-2.5 sm:px-5 sm:py-3 flex flex-col sm:flex-row items-center justify-between gap-2.5 shadow-sm">
          <p className="font-['Outfit',sans-serif] text-xs sm:text-[12.5px] font-medium text-stone-800 dark:text-stone-200 text-center sm:text-left">
            Want to know more about the people behind AskJuno?
          </p>

          <a
            href={ASKJUNO_LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#f97316] text-white font-['Outfit',sans-serif] text-[11.5px] font-semibold hover:bg-orange-600 active:scale-95 transition-all shadow-md shadow-orange-500/20"
          >
            <span>Follow AskJuno on LinkedIn</span>
            <ArrowRight size={12} />
          </a>
        </div>
      </div>
    </section>
  );
}
