import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router";
import { ArrowRight, Clock, ChevronRight, ArrowLeft } from "lucide-react";
import {
  getTopicBySlug,
  getArticlesByTopic,
  getFeaturedArticleForTopic,
  getAllTopics,
} from "@/app/data/insightsData";
import { InsightsLinkedInCard } from "./InsightsLinkedInCard";

export function TopicInsightsPage() {
  const { topicSlug } = useParams<{ topicSlug: string }>();
  const navigate = useNavigate();

  const topic = getTopicBySlug(topicSlug || "ai-automation");
  const allTopics = getAllTopics();

  // State for subtopic filter
  const [selectedSubtopic, setSelectedSubtopic] = useState<string>("all");

  // Fallback if invalid topic
  if (!topic) {
    return (
      <main className="min-h-screen bg-[#faf8f5] dark:bg-[#0c0c0e] flex items-center justify-center p-6 text-center">
        <div className="max-w-md">
          <h2 className="font-['Outfit',sans-serif] font-black text-2xl mb-3">Topic Not Found</h2>
          <p className="text-stone-500 mb-6 text-sm">
            The topic you are looking for does not exist or has been relocated.
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

  // Articles belonging strictly to this topic
  const topicArticles = getArticlesByTopic(topic.slug);
  const featuredArticle = getFeaturedArticleForTopic(topic);

  // Filtered by subtopic if selected
  const displayedArticles =
    selectedSubtopic === "all"
      ? topicArticles
      : topicArticles.filter((a) => a.subcategory === selectedSubtopic);

  // Remaining articles excluding featured if featured is in the list
  const latestArticles = displayedArticles.filter(
    (a) => a.id !== featuredArticle?.id
  );

  return (
    <main className="min-h-screen bg-[#faf8f5] dark:bg-[#0c0c0e] text-stone-900 dark:text-stone-100 transition-colors duration-200 pt-24 pb-20 sm:pb-28 relative overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-32 left-1/3 w-[520px] h-[520px] rounded-full opacity-[0.04] dark:opacity-[0.06]"
          style={{ background: "radial-gradient(circle, #f97316 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-1/4 -right-28 w-[450px] h-[450px] rounded-full opacity-[0.03] dark:opacity-[0.05]"
          style={{ background: "radial-gradient(circle, #f59e0b 0%, transparent 70%)" }}
        />
      </div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* ── BREADCRUMBS ── */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-['Outfit',sans-serif]">
          <Link
            to="/insights"
            className="font-medium text-stone-500 dark:text-stone-400 hover:text-[#f97316] transition-colors"
          >
            Insights
          </Link>
          <ChevronRight size={12} className="text-stone-400" />
          <span className="font-bold text-[#f97316]">{topic.name}</span>
        </nav>

        {/* ── TOPIC HERO ── */}
        <div className="max-w-3xl mb-8 sm:mb-10">
          <div className="flex items-center gap-2 mb-2.5">
            <span className="w-5 h-0.5 bg-[#f97316] rounded-full" />
            <span className="font-['JetBrains_Mono',monospace] text-[11px] sm:text-xs font-bold uppercase tracking-[0.24em] text-[#f97316]">
              {topic.name}
            </span>
          </div>

          <h1 className="font-['Outfit',sans-serif] font-black text-3xl sm:text-4xl lg:text-[44px] leading-[1.14] text-stone-950 dark:text-white mb-3.5 tracking-tight">
            {topic.heroTitle}
          </h1>

          <p className="font-['Outfit',sans-serif] text-stone-600 dark:text-stone-400 text-sm sm:text-base leading-relaxed">
            {topic.heroDescription}
          </p>
        </div>

        {/* ── SIBLING TOPICS QUICK-SWITCH ── */}
        <div className="mb-6 overflow-x-auto no-scrollbar pb-1">
          <div className="flex items-center gap-1.5 text-xs font-['Outfit',sans-serif]">
            <span className="text-stone-400 font-semibold pr-2 shrink-0">Topics:</span>
            {allTopics.map((t) => {
              const isCurrent = t.slug === topic.slug;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => {
                    setSelectedSubtopic("all");
                    navigate(`/insights/${t.slug}`);
                  }}
                  className={`shrink-0 px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    isCurrent
                      ? "bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900"
                      : "text-stone-600 dark:text-stone-400 hover:text-[#f97316] hover:bg-orange-500/10"
                  }`}
                >
                  {t.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── SUB-TOPICS SECTION NAVIGATION ── */}
        <div className="rounded-2xl bg-white/70 dark:bg-[#151518]/70 border border-stone-200/80 dark:border-stone-800/80 p-4 sm:p-5 mb-10 sm:mb-12 shadow-xs backdrop-blur-xs">
          <div className="flex items-center justify-between gap-3 mb-3">
            <span className="font-['JetBrains_Mono',monospace] text-[10px] font-bold uppercase tracking-[0.2em] text-[#f97316]">
              SUB-TOPICS
            </span>
            <span className="font-['Outfit',sans-serif] text-xs text-stone-400">
              Filter articles by domain focus
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* All Subtopics Chip */}
            <button
              type="button"
              onClick={() => setSelectedSubtopic("all")}
              className={`px-3.5 py-1.5 rounded-full text-xs sm:text-[12.5px] font-['Outfit',sans-serif] font-bold transition-all cursor-pointer ${
                selectedSubtopic === "all"
                  ? "bg-[#f97316] text-white shadow-sm shadow-orange-500/25"
                  : "bg-white dark:bg-[#18181c] border border-stone-200/80 dark:border-stone-800/80 text-stone-700 dark:text-stone-300 hover:border-orange-500/50 hover:text-[#f97316]"
              }`}
            >
              All {topic.name}
            </button>

            {/* Individual Subtopic Chips */}
            {topic.subtopics.map((sub) => {
              const isAct = selectedSubtopic === sub;
              return (
                <button
                  key={sub}
                  type="button"
                  onClick={() => setSelectedSubtopic(sub)}
                  className={`px-3.5 py-1.5 rounded-full text-xs sm:text-[12.5px] font-['Outfit',sans-serif] font-semibold transition-all cursor-pointer ${
                    isAct
                      ? "bg-[#f97316] text-white shadow-sm shadow-orange-500/25"
                      : "bg-white dark:bg-[#18181c] border border-stone-200/80 dark:border-stone-800/80 text-stone-700 dark:text-stone-300 hover:border-orange-500/50 hover:text-[#f97316]"
                  }`}
                >
                  {sub}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── FEATURED ARTICLE FOR THIS TOPIC (Only when "all" or matches subcategory) ── */}
        {featuredArticle && (selectedSubtopic === "all" || featuredArticle.subcategory === selectedSubtopic) && (
          <div className="mb-12 sm:mb-14">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-4 h-0.5 bg-[#f97316] rounded-full" />
              <h3 className="font-['JetBrains_Mono',monospace] text-[11px] font-bold uppercase tracking-[0.2em] text-[#f97316]">
                FEATURED ARTICLES
              </h3>
            </div>

            <Link
              to={`/insights/${featuredArticle.topicSlug}/${featuredArticle.slug}`}
              className="group block rounded-[24px] bg-white dark:bg-[#151518] border border-stone-200/80 dark:border-stone-800/80 p-5 sm:p-7 shadow-sm hover:shadow-xl hover:shadow-orange-500/5 hover:border-[#f97316]/50 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
                <div className="lg:col-span-7 flex flex-col justify-center">
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <span className="font-['JetBrains_Mono',monospace] text-[10px] font-bold uppercase tracking-[0.18em] px-2.5 py-0.5 rounded-full bg-orange-500/10 text-[#f97316] border border-orange-500/20">
                      {featuredArticle.subcategory}
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

        {/* ── LATEST ARTICLES FOR THIS TOPIC WITH COMPACT LINKEDIN CARD ── */}
        <div>
          <div className="flex items-center gap-2 mb-2.5">
            <span className="w-4 h-0.5 bg-[#f97316] rounded-full" />
            <h3 className="font-['JetBrains_Mono',monospace] text-[11px] font-bold uppercase tracking-[0.2em] text-[#f97316]">
              LATEST ARTICLES
            </h3>
          </div>

          <div className="flex items-center justify-between mb-6">
            <h4 className="font-['Outfit',sans-serif] font-bold text-xl sm:text-2xl text-stone-900 dark:text-stone-100">
              Latest Articles in {topic.name}
            </h4>
            <span className="font-['JetBrains_Mono',monospace] text-xs text-stone-400 dark:text-stone-500">
              {displayedArticles.length} Available
            </span>
          </div>

          {displayedArticles.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-stone-300 dark:border-stone-800 p-8 text-center my-6">
              <p className="text-stone-500 text-sm mb-3">No articles found in this sub-topic yet.</p>
              <button
                type="button"
                onClick={() => setSelectedSubtopic("all")}
                className="px-4 py-1.5 rounded-full bg-[#f97316] text-white text-xs font-bold"
              >
                Show All {topic.name} Articles
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {/* If single article, show it plus LinkedIn card */}
              {latestArticles.map((art) => (
                <Link
                  key={art.id}
                  to={`/insights/${art.topicSlug}/${art.slug}`}
                  className="group rounded-[18px] bg-white dark:bg-[#151518] border border-stone-200/80 dark:border-stone-800/80 p-4 sm:p-5 flex flex-col justify-between shadow-xs hover:border-[#f97316]/50 hover:shadow-lg hover:shadow-orange-500/5 hover:-translate-y-1 transition-all duration-300"
                >
                  <div>
                    <div className="relative aspect-[16/9.5] w-full rounded-[12px] overflow-hidden bg-stone-100 dark:bg-stone-800 mb-4 border border-stone-200/60 dark:border-stone-800/60">
                      <img
                        src={art.heroImage}
                        alt={art.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-104"
                      />
                    </div>

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

                    <h4 className="font-['Outfit',sans-serif] font-bold text-[16px] text-stone-900 dark:text-stone-100 group-hover:text-[#f97316] transition-colors leading-snug mb-2 line-clamp-2">
                      {art.title}
                    </h4>

                    <p className="font-['Outfit',sans-serif] text-stone-500 dark:text-stone-400 text-xs leading-relaxed line-clamp-3 mb-4">
                      {art.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between">
                    <span className="font-['Outfit',sans-serif] font-semibold text-xs text-[#f97316] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      Read Article <ArrowRight size={12} />
                    </span>
                    <span className="font-['JetBrains_Mono',monospace] text-[10px] text-stone-400 dark:text-stone-500">
                      {art.publishedDate}
                    </span>
                  </div>
                </Link>
              ))}

              {/* Company Update Card in the grid */}
              <div className="md:col-span-2 lg:col-span-1 flex flex-col">
                <InsightsLinkedInCard compact={true} className="h-full" />
              </div>
            </div>
          )}
        </div>

        {/* ── FOOTER NAVIGATION ── */}
        <div className="mt-16 pt-8 border-t border-stone-200/60 dark:border-stone-800/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            to="/insights"
            className="inline-flex items-center gap-2 font-['Outfit',sans-serif] font-bold text-xs sm:text-[13px] text-stone-600 dark:text-stone-300 hover:text-[#f97316] transition-colors"
          >
            <ArrowLeft size={14} /> Back to All Insights
          </Link>

          <Link
            to="/insights"
            className="inline-flex items-center gap-2 font-['Outfit',sans-serif] font-bold text-xs sm:text-[13px] text-[#f97316] hover:translate-x-1 transition-transform"
          >
            Explore Other Topics <ArrowRight size={14} />
          </Link>
        </div>

      </div>
    </main>
  );
}
