import React from "react";
import { Link, useParams } from "react-router";
import { Clock, Calendar, Sparkles, ArrowLeft } from "lucide-react";
import {
  getArticleBySlug,
  getTopicBySlug,
  getRelatedArticles,
} from "@/app/data/insightsData";
import { Breadcrumb } from "./Breadcrumb";
import { ArticleCard } from "./ArticleCard";
import { InsightsLinkedInCard } from "./InsightsLinkedInCard";

export function ArticlePage() {
  const { topicSlug, articleSlug } = useParams<{
    topicSlug: string;
    articleSlug: string;
  }>();

  const article = getArticleBySlug(topicSlug || "", articleSlug || "");
  const topic = getTopicBySlug(topicSlug || "");

  if (!article || !topic) {
    return (
      <main className="min-h-screen bg-[#faf8f5] dark:bg-[#0c0c0e] flex items-center justify-center p-6 text-center">
        <div className="max-w-md">
          <h2 className="font-['Outfit',sans-serif] font-black text-2xl mb-3">
            Article Not Found
          </h2>
          <p className="text-stone-500 mb-6 text-sm">
            The article you requested could not be located.
          </p>
          <Link
            to="/insights"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#f97316] text-white font-bold text-xs"
          >
            <ArrowLeft size={14} /> Back to All Insights
          </Link>
        </div>
      </main>
    );
  }

  const relatedArticles = getRelatedArticles(article);

  return (
    <main className="min-h-screen bg-[#faf8f5] dark:bg-[#0c0c0e] text-stone-900 dark:text-stone-100 transition-colors duration-200 pt-24 pb-20 sm:pb-28 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-32 right-1/4 w-[500px] h-[500px] rounded-full opacity-[0.035] dark:opacity-[0.05]"
          style={{ background: "radial-gradient(circle, #f97316 0%, transparent 70%)" }}
        />
      </div>

      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* ── BREADCRUMB ── */}
        <Breadcrumb
          items={[
            { label: "Insights", href: "/insights" },
            { label: topic.name, href: `/insights/${topic.slug}` },
            { label: article.subcategory || article.title, isCurrent: true },
          ]}
          className="mb-6"
        />

        {/* ── ARTICLE HEADER ── */}
        <header className="max-w-3xl mb-8 sm:mb-10">
          {/* Category Badges & Reading Time */}
          <div className="flex flex-wrap items-center gap-2.5 mb-3.5">
            <span className="font-['JetBrains_Mono',monospace] text-[10px] font-bold uppercase tracking-[0.2em] px-2.5 py-0.5 rounded-full bg-orange-500/10 text-[#f97316] border border-orange-500/20">
              {article.category}
            </span>
            <span className="text-stone-300 dark:text-stone-700">•</span>
            <span className="font-['JetBrains_Mono',monospace] text-[10px] font-bold uppercase tracking-[0.16em] text-stone-500 dark:text-stone-400">
              {article.subcategory}
            </span>
            <span className="text-stone-300 dark:text-stone-700">•</span>
            <span className="flex items-center gap-1 font-['JetBrains_Mono',monospace] text-[10px] text-stone-400 dark:text-stone-500 uppercase">
              <Clock size={11} />
              {article.readingTime}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-['Outfit',sans-serif] font-black text-2xl sm:text-3xl lg:text-[42px] leading-[1.18] text-stone-950 dark:text-white mb-4 tracking-tight">
            {article.title}
          </h1>

          {/* Short Article Introduction */}
          <p className="font-['Outfit',sans-serif] text-stone-600 dark:text-stone-300 text-base sm:text-lg leading-relaxed font-medium">
            {article.intro}
          </p>

          <div className="flex items-center gap-4 mt-4 pt-4 border-t border-stone-200/70 dark:border-stone-800/70 text-xs text-stone-400 dark:text-stone-500 font-['Outfit',sans-serif]">
            <span className="flex items-center gap-1.5">
              <Calendar size={13} /> Published on {article.publishedDate}
            </span>
            <span>•</span>
            <span className="font-semibold text-stone-600 dark:text-stone-300">
              AskJuno Engineering Strategy
            </span>
          </div>
        </header>

        {/* ── HERO IMAGE WITH CAPTION ── */}
        <div className="mb-10 sm:mb-12">
          <div className="relative aspect-[16/9] w-full rounded-[20px] overflow-hidden bg-stone-100 dark:bg-stone-800 border border-stone-200/80 dark:border-stone-800/80 shadow-md">
            <img
              src={article.heroImage}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
          {article.imageCaption && (
            <p className="font-['Outfit',sans-serif] text-xs text-stone-400 dark:text-stone-500 mt-2.5 px-2 text-center sm:text-left italic">
              {article.imageCaption}
            </p>
          )}
        </div>

        {/* ── MAIN ARTICLE CONTENT & SIDEBAR ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16">
          {/* Main Editorial Column */}
          <article className="lg:col-span-8 flex flex-col gap-8">
            {/* Executive Summary Card */}
            <div className="rounded-2xl bg-orange-500/5 dark:bg-orange-500/10 border border-orange-500/20 p-5 sm:p-6">
              <div className="flex items-center gap-2 mb-2.5">
                <Sparkles size={16} className="text-[#f97316]" />
                <span className="font-['JetBrains_Mono',monospace] text-[11px] font-bold uppercase tracking-[0.2em] text-[#f97316]">
                  EXECUTIVE PERSPECTIVE
                </span>
              </div>
              <p className="font-['Outfit',sans-serif] text-sm sm:text-[14.5px] leading-relaxed text-stone-800 dark:text-stone-200 font-medium">
                {article.content.summary}
              </p>
            </div>

            {/* Subsections */}
            {article.content.sections.map((section, sIdx) => (
              <section key={sIdx} className="flex flex-col gap-3.5">
                <h2 className="font-['Outfit',sans-serif] font-bold text-xl sm:text-2xl text-stone-900 dark:text-stone-100 tracking-tight">
                  {section.heading}
                </h2>

                {section.body.map((para, pIdx) => (
                  <p
                    key={pIdx}
                    className="font-['Outfit',sans-serif] text-sm sm:text-base leading-relaxed text-stone-700 dark:text-stone-300"
                  >
                    {para}
                  </p>
                ))}

                {section.callout && (
                  <blockquote className="my-2 border-l-3 border-[#f97316] pl-4 sm:pl-5 py-2 italic font-['Outfit',sans-serif] text-sm sm:text-base text-stone-900 dark:text-stone-100 bg-stone-100/60 dark:bg-stone-800/40 rounded-r-xl">
                    "{section.callout}"
                  </blockquote>
                )}
              </section>
            ))}

            {/* Key Strategic Principles */}
            {article.content.keyPoints && article.content.keyPoints.length > 0 && (
              <div className="rounded-2xl bg-white dark:bg-[#151518] border border-stone-200/80 dark:border-stone-800/80 p-5 sm:p-6 shadow-xs mt-2">
                <h3 className="font-['JetBrains_Mono',monospace] text-xs font-bold uppercase tracking-[0.2em] text-[#f97316] mb-3.5">
                  KEY STRATEGIC PRINCIPLES
                </h3>
                <ul className="space-y-3">
                  {article.content.keyPoints.map((point, ptIdx) => (
                    <li
                      key={ptIdx}
                      className="flex items-start gap-3 text-xs sm:text-[14px] text-stone-700 dark:text-stone-200 font-['Outfit',sans-serif] leading-relaxed"
                    >
                      <span className="w-2 h-2 rounded-full bg-[#f97316] mt-1.5 shrink-0 shadow-xs" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Core Takeaway */}
            <div className="pt-6 border-t border-stone-200/70 dark:border-stone-800/70">
              <p className="font-['Outfit',sans-serif] text-sm sm:text-[15px] font-semibold text-stone-900 dark:text-stone-100 leading-relaxed">
                <span className="text-[#f97316]">Takeaway: </span>
                {article.content.takeaway}
              </p>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-4 flex flex-col gap-6 lg:sticky lg:top-24">
            {/* Topic Overview Card */}
            <div className="rounded-2xl bg-white dark:bg-[#151518] border border-stone-200/80 dark:border-stone-800/80 p-4 sm:p-5 shadow-xs">
              <span className="font-['JetBrains_Mono',monospace] text-[9.5px] font-bold uppercase tracking-[0.2em] text-[#f97316] block mb-1">
                TOPIC OVERVIEW
              </span>
              <h4 className="font-['Outfit',sans-serif] font-bold text-[15px] text-stone-900 dark:text-stone-100 mb-2">
                {topic.name}
              </h4>
              <p className="font-['Outfit',sans-serif] text-xs text-stone-500 dark:text-stone-400 leading-relaxed mb-4">
                {topic.heroDescription}
              </p>

              <Link
                to={`/insights/${topic.slug}`}
                className="inline-flex items-center gap-1.5 text-xs font-['Outfit',sans-serif] font-bold text-[#f97316] hover:translate-x-0.5 transition-transform"
              >
                <span>View all {topic.name} articles</span>
              </Link>
            </div>

            {/* Compact LinkedIn Card */}
            <InsightsLinkedInCard compact={true} />
          </aside>
        </div>

        {/* ── RELATED INSIGHTS ── */}
        <div className="pt-12 border-t border-stone-200/70 dark:border-stone-800/70 mb-14">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-5 h-0.5 bg-[#f97316] rounded-full" />
            <h3 className="font-['Outfit',sans-serif] font-bold text-xl sm:text-2xl text-stone-900 dark:text-stone-100">
              Related Insights
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {relatedArticles.map((rel) => (
              <ArticleCard key={rel.id} article={rel} />
            ))}
          </div>
        </div>

        {/* ── BOTTOM NAVIGATION ── */}
        <div className="pt-8 border-t border-stone-200/70 dark:border-stone-800/70 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            to={`/insights/${topic.slug}`}
            className="inline-flex items-center gap-2 font-['Outfit',sans-serif] font-bold text-xs sm:text-sm text-stone-700 dark:text-stone-200 hover:text-[#f97316] transition-colors"
          >
            <span>← Back to {topic.name}</span>
          </Link>

          <Link
            to="/insights"
            className="inline-flex items-center gap-2 font-['Outfit',sans-serif] font-bold text-xs sm:text-sm text-[#f97316] hover:translate-x-1 transition-transform"
          >
            <span>Explore All Insights →</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
