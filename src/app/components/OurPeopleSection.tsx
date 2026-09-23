import React, { useState } from "react";
import { ChevronLeft, ChevronRight, ArrowRight, Users } from "lucide-react";

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
  objectPosition?: string;
  transformOrigin?: string;
}

// ── 12 Data-Driven Employee Records ─────────────────────────────────────────
// Featuring tightly zoomed-in executive portraits matching the AskJuno design.
export const EMPLOYEES: Employee[] = [
  {
    id: "emp-01",
    name: "Arun Kumar",
    role: "Engineering Lead",
    image: person1,
    imageScale: "scale-[1.34]",
    objectPosition: "50% 26%",
    transformOrigin: "50% 26%",
    description: "Enterprise Architecture · AI Systems · Cloud Strategy",
  },
  {
    id: "emp-02",
    name: "Vikram S",
    role: "Principal AI Engineer",
    image: person2,
    imageScale: "scale-[1.38]",
    objectPosition: "50% 28%",
    transformOrigin: "50% 28%",
    description: "LLM Orchestration · NLP · Intelligent Automation",
  },
  {
    id: "emp-03",
    name: "Priya Nair",
    role: "Product Manager",
    image: person3,
    imageScale: "scale-[1.34]",
    objectPosition: "50% 24%",
    transformOrigin: "50% 24%",
    description: "Product Strategy · User Experience · Cross-functional Leadership",
  },
  {
    id: "emp-04",
    name: "Karthik R",
    role: "Full Stack Developer",
    image: person4,
    imageScale: "scale-[1.34]",
    objectPosition: "50% 26%",
    transformOrigin: "50% 26%",
    description: "React · Node.js · Cloud Native",
  },
  {
    id: "emp-05",
    name: "Sneha Patel",
    role: "Data Engineering Lead",
    image: person5,
    imageScale: "scale-[1.30]",
    objectPosition: "50% 25%",
    transformOrigin: "50% 25%",
    description: "Data Pipelines · Real-Time Analytics · Data Governance",
  },
  {
    id: "emp-06",
    name: "Rohan Sharma",
    role: "Cloud & DevOps Specialist",
    image: person6,
    imageScale: "scale-[1.30]",
    objectPosition: "50% 25%",
    transformOrigin: "50% 25%",
    description: "Kubernetes · CI/CD · Cloud Security · AWS / Azure",
  },
  {
    id: "emp-07",
    name: "Ananya Roy",
    role: "Senior Product Engineer",
    image: person7,
    imageScale: "scale-[1.32]",
    objectPosition: "50% 26%",
    transformOrigin: "50% 26%",
    description: "SaaS Platforms · Workflow Automation · UX Systems",
  },
  {
    id: "emp-08",
    name: "Rajesh Gupta",
    role: "Machine Learning Engineer",
    image: person8,
    imageScale: "scale-[1.34]",
    objectPosition: "50% 28%",
    transformOrigin: "50% 28%",
    description: "Predictive Models · Computer Vision · Inference Optimization",
  },
  {
    id: "emp-09",
    name: "David Miller",
    role: "Solutions Architect",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80",
    imageScale: "scale-[1.28]",
    objectPosition: "50% 25%",
    transformOrigin: "50% 25%",
    description: "Enterprise Integrations · ERP/CRM Systems · API Gateways",
  },
  {
    id: "emp-10",
    name: "Sarah Chen",
    role: "Security & QA Engineer",
    image: "https://images.unsplash.com/photo-1573497019236-17f8177b81e8?auto=format&fit=crop&w=800&q=80",
    imageScale: "scale-[1.28]",
    objectPosition: "50% 25%",
    transformOrigin: "50% 25%",
    description: "Secure SDLC · Automated Testing · Compliance & Audits",
  },
  {
    id: "emp-11",
    name: "Marcus Vance",
    role: "Platform Engineer",
    image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&w=800&q=80",
    imageScale: "scale-[1.28]",
    objectPosition: "50% 25%",
    transformOrigin: "50% 25%",
    description: "Infrastructure as Code · Observability · Reliability",
  },
  {
    id: "emp-12",
    name: "Elena Rostova",
    role: "Technical Lead",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80",
    imageScale: "scale-[1.28]",
    objectPosition: "50% 25%",
    transformOrigin: "50% 25%",
    description: "System Modernization · Agile Delivery · Technical Strategy",
  },
];

export const ASKJUNO_LINKEDIN_URL = "https://www.linkedin.com/company/askjuno/";

export default function OurPeopleSection() {
  // Desktop pagination: 4 cards per page -> 3 pages for 12 employees
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  // Mobile pagination: 1 card per page
  const [mobileIndex, setMobileIndex] = useState<number>(0);

  const CARDS_PER_PAGE = 4;
  const totalPages = Math.ceil(EMPLOYEES.length / CARDS_PER_PAGE);

  const changePage = (newPage: number) => {
    if (newPage < 0 || newPage >= totalPages || newPage === currentPage) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage(newPage);
      setIsTransitioning(false);
    }, 180);
  };

  const changeMobileIndex = (newIndex: number) => {
    if (newIndex < 0 || newIndex >= EMPLOYEES.length) return;
    setMobileIndex(newIndex);
  };

  const currentEmployees = EMPLOYEES.slice(
    currentPage * CARDS_PER_PAGE,
    (currentPage + 1) * CARDS_PER_PAGE
  );

  return (
    <section
      id="our-people"
      className="py-14 sm:py-20 bg-[#fbfaf8] dark:bg-[#0d0d10] border-t border-stone-200/70 dark:border-stone-800/80 relative overflow-hidden transition-colors duration-200"
    >
      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-28 right-1/4 w-[480px] h-[480px] rounded-full opacity-[0.045] dark:opacity-[0.06]"
          style={{ background: "radial-gradient(circle, #f97316 0%, transparent 70%)" }}
        />
        <div
          className="absolute -bottom-28 left-12 w-[400px] h-[400px] rounded-full opacity-[0.03] dark:opacity-[0.05]"
          style={{ background: "radial-gradient(circle, #f59e0b 0%, transparent 70%)" }}
        />
      </div>

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* ── SECTION HEADER ────────────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <span className="w-5 h-0.5 bg-[#f97316] rounded-full" />
              <span className="font-['JetBrains_Mono',monospace] text-[11px] font-bold uppercase tracking-[0.22em] text-[#f97316]">
                OUR PEOPLE
              </span>
            </div>

            <div className="max-w-xl">
              <h2 className="font-['Outfit',sans-serif] font-black text-2xl sm:text-3xl lg:text-[34px] leading-[1.18] text-stone-900 dark:text-white mb-2 tracking-tight">
                The People Behind <span className="text-[#f97316]">AskJuno.</span>
              </h2>
              <p className="font-['Outfit',sans-serif] text-stone-600 dark:text-stone-400 text-sm sm:text-[15px] leading-relaxed">
                Meet the people building technology that solves real business problems.
              </p>
            </div>
          </div>

          {/* Decorative Team Badge in Top-Right */}
          <div className="hidden md:flex items-center justify-end">
            <div className="relative">
              <div
                className="absolute -top-4 -right-4 w-28 h-28 rounded-full pointer-events-none opacity-50 dark:opacity-30"
                style={{
                  background: "radial-gradient(circle, rgba(249,115,22,0.25) 0%, transparent 70%)",
                }}
              />
              <div className="relative w-14 h-14 rounded-full border border-orange-500/25 flex items-center justify-center bg-gradient-to-br from-orange-500/10 to-transparent backdrop-blur-xs shadow-xs">
                <div className="w-9 h-9 rounded-full bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-[#f97316]">
                  <Users size={18} />
                </div>
                <span className="absolute -top-0.5 right-1 w-2 h-2 rounded-full bg-[#f97316] shadow-sm shadow-orange-500/50" />
                <span className="absolute bottom-0 -left-0.5 w-1.5 h-1.5 rounded-full bg-amber-500/80" />
              </div>
            </div>
          </div>
        </div>

        {/* ── EMPLOYEE CARDS GRID: 4 COLUMNS ON DESKTOP ─────────────────────── */}
        <div className="hidden sm:block">
          <div
            className={`grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 transition-all duration-300 ease-out ${
              isTransitioning ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
            }`}
          >
            {currentEmployees.map((emp) => (
              <div
                key={emp.id}
                className="group rounded-[18px] bg-white dark:bg-[#151518] border border-stone-200/80 dark:border-stone-800/80 p-3.5 sm:p-4 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:border-[#f97316]/50 hover:shadow-xl hover:shadow-orange-500/10 cursor-default"
              >
                {/* Portrait Photo Container with Zoomed-In Headshot */}
                <div className="relative aspect-[4/3.8] w-full rounded-[14px] overflow-hidden bg-stone-100 dark:bg-stone-800 mb-3.5">
                  <img
                    src={emp.image}
                    alt={emp.name}
                    loading="lazy"
                    className={`w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.44] ${
                      emp.imageScale || "scale-[1.34]"
                    }`}
                    style={{
                      objectPosition: emp.objectPosition || "50% 26%",
                      transformOrigin: emp.transformOrigin || "50% 26%",
                    }}
                  />
                </div>

                {/* Employee Details */}
                <div className="flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="font-['Outfit',sans-serif] font-bold text-[16px] sm:text-[17px] text-stone-900 dark:text-stone-100 leading-snug group-hover:text-[#f97316] transition-colors">
                      {emp.name}
                    </h3>
                    <p className="font-['Outfit',sans-serif] text-[12.5px] sm:text-[13px] font-semibold text-[#f97316] mt-0.5">
                      {emp.role}
                    </p>
                    {/* Orange accent line */}
                    <div className="w-5 h-0.5 bg-[#f97316] my-2.5 rounded-full group-hover:w-8 transition-all duration-300" />
                  </div>
                  <p className="font-['Outfit',sans-serif] text-[11.5px] sm:text-[12px] text-stone-500 dark:text-stone-400 leading-relaxed line-clamp-2">
                    {emp.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Carousel Pagination Controls: < ● ○ ○ > */}
          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => changePage(currentPage - 1)}
              disabled={currentPage === 0}
              className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
                currentPage === 0
                  ? "border-stone-200 dark:border-stone-800 text-stone-300 dark:text-stone-700 cursor-not-allowed bg-stone-50/50 dark:bg-stone-900/30"
                  : "border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-200 bg-white dark:bg-[#18181c] hover:border-[#f97316] hover:text-[#f97316] hover:scale-105 shadow-xs cursor-pointer"
              }`}
              aria-label="Previous page"
            >
              <ChevronLeft size={15} />
            </button>

            {/* Dot indicators */}
            <div className="flex items-center gap-1.5 px-2">
              {Array.from({ length: totalPages }).map((_, p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => changePage(p)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    currentPage === p
                      ? "w-6 bg-[#f97316]"
                      : "w-2 bg-stone-300 dark:bg-stone-700 hover:bg-stone-400 dark:hover:bg-stone-600"
                  }`}
                  aria-label={`Page ${p + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => changePage(currentPage + 1)}
              disabled={currentPage === totalPages - 1}
              className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
                currentPage === totalPages - 1
                  ? "border-stone-200 dark:border-stone-800 text-stone-300 dark:text-stone-700 cursor-not-allowed bg-stone-50/50 dark:bg-stone-900/30"
                  : "border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-200 bg-white dark:bg-[#18181c] hover:border-[#f97316] hover:text-[#f97316] hover:scale-105 shadow-xs cursor-pointer"
              }`}
              aria-label="Next page"
            >
              <ChevronRight size={15} />
            </button>
          </div>
        </div>

        {/* ── MOBILE VIEW: 1 CARD AT A TIME ─────────────────────────────────── */}
        <div className="block sm:hidden">
          {(() => {
            const emp = EMPLOYEES[mobileIndex];
            return (
              <div className="w-full max-w-[300px] mx-auto rounded-[18px] bg-white dark:bg-[#151518] border border-stone-200/80 dark:border-stone-800/80 p-4 flex flex-col shadow-sm">
                <div className="relative aspect-[4/4] w-full rounded-[14px] overflow-hidden bg-stone-100 dark:bg-stone-800 mb-3.5">
                  <img
                    src={emp.image}
                    alt={emp.name}
                    className={`w-full h-full object-cover ${emp.imageScale || "scale-[1.34]"}`}
                    style={{
                      objectPosition: emp.objectPosition || "50% 26%",
                      transformOrigin: emp.transformOrigin || "50% 26%",
                    }}
                  />
                </div>
                <div>
                  <h3 className="font-['Outfit',sans-serif] font-bold text-[16px] text-stone-900 dark:text-stone-100">
                    {emp.name}
                  </h3>
                  <p className="font-['Outfit',sans-serif] text-[12.5px] font-semibold text-[#f97316] mt-0.5">
                    {emp.role}
                  </p>
                  <div className="w-5 h-0.5 bg-[#f97316] my-2.5 rounded-full" />
                  <p className="font-['Outfit',sans-serif] text-[12px] text-stone-500 dark:text-stone-400 leading-relaxed">
                    {emp.description}
                  </p>
                </div>
              </div>
            );
          })()}

          {/* Mobile Navigation Controls */}
          <div className="flex items-center justify-between mt-4 px-2 w-full max-w-[300px] mx-auto">
            <button
              type="button"
              onClick={() => changeMobileIndex(mobileIndex - 1)}
              disabled={mobileIndex === 0}
              className={`w-9 h-9 rounded-full flex items-center justify-center border transition-colors ${
                mobileIndex === 0
                  ? "border-stone-200 dark:border-stone-800 text-stone-300 dark:text-stone-700 cursor-not-allowed"
                  : "border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-200 bg-white dark:bg-[#18181c] active:bg-[#f97316] active:text-white"
              }`}
              aria-label="Previous employee"
            >
              <ChevronLeft size={16} />
            </button>

            <span className="font-['JetBrains_Mono',monospace] text-[12px] font-semibold text-stone-600 dark:text-stone-400">
              {mobileIndex + 1} / {EMPLOYEES.length}
            </span>

            <button
              type="button"
              onClick={() => changeMobileIndex(mobileIndex + 1)}
              disabled={mobileIndex === EMPLOYEES.length - 1}
              className={`w-9 h-9 rounded-full flex items-center justify-center border transition-colors ${
                mobileIndex === EMPLOYEES.length - 1
                  ? "border-stone-200 dark:border-stone-800 text-stone-300 dark:text-stone-700 cursor-not-allowed"
                  : "border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-200 bg-white dark:bg-[#18181c] active:bg-[#f97316] active:text-white"
              }`}
              aria-label="Next employee"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* ── BOTTOM CALL TO ACTION BANNER ─────────────────────────────────── */}
        <div className="mt-10 sm:mt-14 rounded-[22px] border border-orange-500/20 bg-gradient-to-r from-orange-500/10 via-orange-500/5 to-white/40 dark:from-orange-500/15 dark:via-[#171412] dark:to-[#151518] p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm backdrop-blur-sm relative overflow-hidden">
          {/* Subtle decorative glow */}
          <div
            className="absolute -left-10 -top-10 w-44 h-44 rounded-full pointer-events-none opacity-40 dark:opacity-30"
            style={{ background: "radial-gradient(circle, #f97316 0%, transparent 70%)" }}
          />

          <div className="flex items-center gap-3.5 sm:gap-4 relative z-10 text-center sm:text-left flex-col sm:flex-row">
            <div className="w-12 h-12 rounded-full bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-[#f97316] shrink-0 shadow-xs">
              <Users size={22} />
            </div>
            <div>
              <h4 className="font-['Outfit',sans-serif] font-bold text-[15px] sm:text-[16.5px] text-stone-900 dark:text-stone-100">
                Want to know more about the people behind AskJuno?
              </h4>
              <p className="font-['Outfit',sans-serif] text-[12.5px] sm:text-[13px] text-stone-500 dark:text-stone-400 mt-0.5">
                Get to know our team, culture and what drives us.
              </p>
            </div>
          </div>

          <a
            href={ASKJUNO_LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 relative z-10 inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-600 text-white font-['Outfit',sans-serif] text-[13px] font-semibold hover:from-orange-600 hover:to-amber-700 active:scale-95 transition-all shadow-md shadow-orange-500/25"
          >
            <span>Follow AskJuno on LinkedIn</span>
            <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
