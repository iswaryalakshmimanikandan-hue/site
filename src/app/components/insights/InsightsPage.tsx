import React from "react";
import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import { getAllArticles } from "@/app/data/insightsData";
import { CategoryNavigation } from "./CategoryNavigation";
import { FeaturedArticle } from "./FeaturedArticle";
import { ArticleCard } from "./ArticleCard";
import { InsightsLinkedInCard } from "./InsightsLinkedInCard";

export function InsightsPage() {
  const allArticles = getAllArticles();
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
        {/* ── BACK TO ASKJUNO HOME ── */}
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-['Outfit',sans-serif] font-semibold text-stone-500 hover:text-[#f97316] transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Back to AskJuno Home</span>
          </Link>
        </div>

        {/* ── HEADER / INTRO ── */}
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
            We share perspectives on AI, software engineering, digital transformation,
            and product strategy to help businesses navigate technology with clarity
            and confidence.
          </p>
        </div>

        {/* ── REUSABLE CATEGORY NAVIGATION ── */}
        <CategoryNavigation activeSlug="all" className="mb-10 sm:mb-12" />

        {/* ── FEATURED ARTICLE ── */}
        {featuredArticle && (
          <FeaturedArticle
            article={featuredArticle}
            sectionLabel="FEATURED ARTICLE"
            className="mb-12 sm:mb-16"
          />
        )}

        {/* ── ARTICLE GRID WITH SECONDARY LINKEDIN CARD ── */}
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
                {/* Secondary LinkedIn Card at slot 3 */}
                {idx === 3 && (
                  <div className="md:col-span-2 lg:col-span-1 flex flex-col">
                    <InsightsLinkedInCard compact={true} className="h-full" />
                  </div>
                )}

                <ArticleCard article={art} />
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
