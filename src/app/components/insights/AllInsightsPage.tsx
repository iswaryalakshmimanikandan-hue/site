import React from "react";
import { Link, useNavigate } from "react-router";
import { ArrowRight, Clock, ArrowLeft } from "lucide-react";
import {
  getAllArticles,
  getAllTopics,
  InsightArticle,
} from "@/app/data/insightsData";
import { InsightsLinkedInCard } from "./InsightsLinkedInCard";

export function AllInsightsPage() {
  const navigate = useNavigate();
  const allArticles = getAllArticles();
  const allTopics = getAllTopics();

  // Primary featured article
  const featuredArticle = allArticles[0];
  const gridArticles = allArticles.slice(1);

  return (
    <main className="min-h-screen bg-[#faf8f5] dark:bg-[#0c0c0e] text-stone-900 dark:text-stone-100 transition-colors duration-200 pt-24 pb-20 sm:pb-28 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-32 right-1/4 w-[550px] h-[550px] rounded-full opacity-[0.04] dark:opacity-[0.06]"
          style={{ background: "radial-gradient(circle, #f97316 0%, transparent 70%)" }}
        />
        <div
          className="absolute top-1/2 -left-32 w-[480px] h-[480px] rounded-full opacity-[0.03] dark:opacity-[0.05]"
          style={{ background: "radial-gradient(circle, #f59e0b 0%, transparent 70%)" }}
        />
      </div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* ── BACK TO HOME / BREADCRUMB ── */}
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-['Outfit',sans-serif] font-semibold text-stone-500 hover:text-[#f97316] transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Back to AskJuno Home</span>
          </Link>
        </div>

        {/* ── HERO HEADER ── */}
        <div className="max-w-3xl mb-10 sm:mb-12">
          {/* Eyebrow: INSIGHTS */}
          <div className="flex items-center gap-2 mb-3">
            <span className="w-5 h-0.5 bg-[#f97316] rounded-full" />
            <span className="font-['JetBrains_Mono',monospace] text-[11px] sm:text-xs font-bold uppercase tracking-[0.24em] text-[#f97316]">
              INSIGHTS
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-['Outfit',sans-serif] font-black text-3xl sm:text-4xl lg:text-[46px] leading-[1.12] text-stone-950 dark:text-white mb-3.5 tracking-tight">
            Insights for the<br />
            <span className="text-[#f97316]">Builders of Tomorrow.</span>
          </h1>

          {/* Supporting Text */}
          <p className="font-['Outfit',sans-serif] text-stone-600 dark:text-stone-400 text-sm sm:text-base leading-relaxed">
            We share perspectives on AI, software engineering, digital transformation, and product strategy to help businesses navigate technology with clarity and confidence.
          </p>
        </div>

        {/* ── HORIZONTAL CATEGORY NAVIGATION BAR ── */}
        <div className="mb-10 sm:mb-12 border-b border-stone-200/80 dark:border-stone-800/80 pb-3">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {/* Active: All Insights */}
            <span
              className="shrink-0 px-4 py-1.5 rounded-full text-xs sm:text-[13px] font-['Outfit',sans-serif] font-bold bg-[#f97316] text-white shadow-sm shadow-orange-500/20 cursor-default select-none"
            >
              All Insights
            </span>

            {/* Inactive Category Links */}
            {allTopics.map((topic) => (
              <button
                key={topic.id}
                type="button"
                onClick={() => navigate(`/insights/${topic.slug}`)}
                className="shrink-0 px-4 py-1.5 rounded-full text-xs sm:text-[13px] font-['Outfit',sans-serif] font-semibold text-stone-600 dark:text-stone-300 hover:text-[#f97316] hover:bg-orange-500/10 transition-all border border-stone-200/80 dark:border-stone-800/80 cursor-pointer"
              >
                {topic.name}
              </button>
            ))}
          </div>
        </div>

        {/* ── FEATURED ARTICLE (Full Width Prominent Card) ── */}
        {featuredArticle && (
          <div className="mb-12 sm:mb-16">
            <Link
              to={`/insights/${featuredArticle.topicSlug}/${featuredArticle.slug}`}
              className="group block rounded-[24px] bg-white dark:bg-[#151518] border border-stone-200/80 dark:border-stone-800/80 p-5 sm:p-7 shadow-sm hover:shadow-xl hover:shadow-orange-500/5 hover:border-[#f97316]/50 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
                {/* Left: Metadata & Copy */}
                <div className="lg:col-span-7 flex flex-col justify-center">
                  <div className="flex items-center gap-2.5 mb-3">
                    <span className="font-['JetBrains_Mono',monospace] text-[10px] font-bold uppercase tracking-[0.2em] px-2.5 py-0.5 rounded-full bg-orange-500/10 text-[#f97316] border border-orange-500/20">
                      FEATURED
                    </span>
                    <span className="font-['JetBrains_Mono',monospace] text-[10px] font-semibold uppercase tracking-[0.16em] text-stone-400 dark:text-stone-500">
                      {featuredArticle.category}
                    </span>
                    <span className="text-stone-300 dark:text-stone-700">•</span>
                    <span className="flex items-center gap-1 font-['JetBrains_Mono',monospace] text-[10px] text-stone-400 dark:text-stone-500 uppercase">
                      <Clock size={11} />
                      {featuredArticle.readingTime}
                    </span>
                  </div>

                  <h2 className="font-['Outfit',sans-serif] font-black text-xl sm:text-2xl lg:text-[28px] leading-[1.2] text-stone-900 dark:text-white mb-2.5 group-hover:text-[#f97316] transition-colors">
                    {featuredArticle.title}
                  </h2>

                  <p className="font-['Outfit',sans-serif] text-stone-600 dark:text-stone-300 text-xs sm:text-[14px] leading-relaxed mb-4 line-clamp-3">
                    {featuredArticle.description}
                  </p>

                  <div className="inline-flex items-center gap-1.5 font-['Outfit',sans-serif] font-bold text-xs sm:text-[13px] text-[#f97316] group-hover:translate-x-1 transition-transform">
                    <span>Read Article</span>
                    <ArrowRight size={14} />
                  </div>
                </div>

                {/* Right: Featured Hero Visual */}
                <div className="lg:col-span-5 relative aspect-[16/10] w-full rounded-[16px] overflow-hidden bg-stone-100 dark:bg-stone-800 border border-stone-200/60 dark:border-stone-800/60">
                  <img
                    src={featuredArticle.heroImage}
                    alt={featuredArticle.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-104"
                  />
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* ── ARTICLE GRID WITH LINKEDIN SECONDARY CARD ── */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-['Outfit',sans-serif] font-bold text-xl sm:text-2xl text-stone-900 dark:text-stone-100">
              Latest Perspectives
            </h3>
            <span className="font-['JetBrains_Mono',monospace] text-xs text-stone-400 dark:text-stone-500">
              {allArticles.length} Articles Published
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {gridArticles.map((art, idx) => (
              <React.Fragment key={art.id}>
                {/* Insert LinkedIn card at slot 3 so it complements the grid naturally */}
                {idx === 3 && (
                  <div className="md:col-span-2 lg:col-span-1 flex flex-col">
                    <InsightsLinkedInCard compact={true} className="h-full" />
                  </div>
                )}

                <Link
                  to={`/insights/${art.topicSlug}/${art.slug}`}
                  className="group rounded-[18px] bg-white dark:bg-[#151518] border border-stone-200/80 dark:border-stone-800/80 p-4 sm:p-5 flex flex-col justify-between shadow-xs hover:border-[#f97316]/50 hover:shadow-lg hover:shadow-orange-500/5 hover:-translate-y-1 transition-all duration-300"
                >
                  <div>
                    {/* Thumbnail */}
                    <div className="relative aspect-[16/9.5] w-full rounded-[12px] overflow-hidden bg-stone-100 dark:bg-stone-800 mb-4 border border-stone-200/60 dark:border-stone-800/60">
                      <img
                        src={art.heroImage}
                        alt={art.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-104"
                      />
                    </div>

                    {/* Metadata */}
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-['JetBrains_Mono',monospace] text-[9.5px] font-bold uppercase tracking-[0.16em] text-[#f97316]">
                        {art.subcategory}
                      </span>
                      <span className="text-stone-300 dark:text-stone-700">•</span>
                      <span className="flex items-center gap-1 font-['JetBrains_Mono',monospace] text-[9.5px] text-stone-400 dark:text-stone-500 uppercase">
                        <Clock size={10} />
                        {art.readingTime}
                      </span>
                    </div>

                    {/* Title */}
                    <h4 className="font-['Outfit',sans-serif] font-bold text-[16px] sm:text-[17px] text-stone-900 dark:text-stone-100 group-hover:text-[#f97316] transition-colors leading-snug mb-2 line-clamp-2">
                      {art.title}
                    </h4>

                    {/* Description */}
                    <p className="font-['Outfit',sans-serif] text-stone-500 dark:text-stone-400 text-xs sm:text-[13px] leading-relaxed line-clamp-3 mb-4">
                      {art.description}
                    </p>
                  </div>

                  {/* Read Article CTA */}
                  <div className="pt-2 border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between">
                    <span className="font-['Outfit',sans-serif] font-semibold text-xs text-[#f97316] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      Read Article <ArrowRight size={12} />
                    </span>
                    <span className="font-['JetBrains_Mono',monospace] text-[10px] text-stone-400 dark:text-stone-500">
                      {art.publishedDate}
                    </span>
                  </div>
                </Link>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* ── CLOSING TAGLINE ── */}
        <div className="mt-16 text-center pt-8 border-t border-stone-200/60 dark:border-stone-800/60">
          <p className="font-['Outfit',sans-serif] italic text-xs sm:text-[13px] text-stone-400 dark:text-stone-500">
            Better questions. Smarter solutions. A more intelligent tomorrow.
          </p>
        </div>
      </div>
    </main>
  );
}
