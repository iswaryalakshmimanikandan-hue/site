import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  getTopicBySlug,
  getArticlesByTopic,
  getFeaturedArticleForTopic,
} from "@/app/data/insightsData";
import { Breadcrumb } from "./Breadcrumb";
import { CategoryNavigation } from "./CategoryNavigation";
import { SubsectionNavigation } from "./SubsectionNavigation";
import { FeaturedArticle } from "./FeaturedArticle";
import { ArticleCard } from "./ArticleCard";
import { InsightsLinkedInCard } from "./InsightsLinkedInCard";

export function DomainPage() {
  const { topicSlug } = useParams<{ topicSlug: string }>();
  const navigate = useNavigate();

  // Reset filter when domain changes
  const [selectedSubtopic, setSelectedSubtopic] = useState<string>("all");

  useEffect(() => {
    setSelectedSubtopic("all");
  }, [topicSlug]);

  const topic = getTopicBySlug(topicSlug || "ai-intelligent-automation");

  if (!topic) {
    return (
      <main className="min-h-screen bg-[#faf8f5] dark:bg-[#0c0c0e] flex items-center justify-center p-6 text-center">
        <div className="max-w-md">
          <h2 className="font-['Outfit',sans-serif] font-black text-2xl mb-3">
            Domain Not Found
          </h2>
          <p className="text-stone-500 mb-6 text-sm">
            The domain you requested does not exist or has moved.
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

  // Articles belonging ONLY to this selected domain
  const topicArticles = getArticlesByTopic(topic.slug);
  const featuredArticle = getFeaturedArticleForTopic(topic);

  // Subtopic filtering
  const filteredArticles =
    selectedSubtopic === "all"
      ? topicArticles
      : topicArticles.filter((a) => a.subcategory === selectedSubtopic);

  // Latest articles (excluding featured when "all" is active and featured matches)
  const latestArticles = filteredArticles.filter(
    (a) => a.id !== featuredArticle?.id
  );

  return (
    <main className="min-h-screen bg-[#faf8f5] dark:bg-[#0c0c0e] text-stone-900 dark:text-stone-100 transition-colors duration-200 pt-24 pb-20 sm:pb-28 relative overflow-hidden">
      {/* Subtle warm ambient glows */}
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
        {/* ── BREADCRUMB ── */}
        <Breadcrumb
          items={[
            { label: "Insights", href: "/insights" },
            { label: topic.name, isCurrent: true },
          ]}
          className="mb-6"
        />

        {/* ── DOMAIN HEADER ── */}
        <div className="max-w-3xl mb-8 sm:mb-10">
          <div className="flex items-center gap-2 mb-2.5">
            <span className="w-5 h-0.5 bg-[#f97316] rounded-full" />
            <span className="font-['JetBrains_Mono',monospace] text-[11px] sm:text-xs font-bold uppercase tracking-[0.24em] text-[#f97316]">
              INSIGHTS
            </span>
          </div>

          <h1 className="font-['Outfit',sans-serif] font-black text-3xl sm:text-4xl lg:text-[44px] leading-[1.14] text-stone-950 dark:text-white mb-3.5 tracking-tight">
            {topic.name}
          </h1>

          <p className="font-['Outfit',sans-serif] text-stone-600 dark:text-stone-400 text-sm sm:text-base leading-relaxed">
            {topic.heroDescription}
          </p>
        </div>

        {/* ── CATEGORY FILTER NAVIGATION (Active on Current Domain) ── */}
        <CategoryNavigation activeSlug={topic.slug} className="mb-8" />

        {/* ── SUBSECTIONS (Interactive Domain Chips) ── */}
        <SubsectionNavigation
          topicName={topic.name}
          subtopics={topic.subtopics}
          selectedSubtopic={selectedSubtopic}
          onSelectSubtopic={setSelectedSubtopic}
          className="mb-10 sm:mb-12"
        />

        {/* ── FEATURED ARTICLE ── */}
        {featuredArticle &&
          (selectedSubtopic === "all" ||
            featuredArticle.subcategory === selectedSubtopic) && (
            <FeaturedArticle
              article={featuredArticle}
              sectionLabel="FEATURED ARTICLE"
              className="mb-12 sm:mb-14"
            />
          )}

        {/* ── LATEST ARTICLES ── */}
        <div>
          <div className="flex items-center gap-2 mb-2.5">
            <span className="w-4 h-0.5 bg-[#f97316] rounded-full" />
            <h3 className="font-['JetBrains_Mono',monospace] text-[11px] font-bold uppercase tracking-[0.2em] text-[#f97316]">
              LATEST ARTICLES
            </h3>
          </div>

          <div className="flex items-center justify-between mb-6">
            <h4 className="font-['Outfit',sans-serif] font-bold text-xl sm:text-2xl text-stone-900 dark:text-stone-100">
              Latest in {topic.name}
            </h4>
            <span className="font-['JetBrains_Mono',monospace] text-xs text-stone-400 dark:text-stone-500">
              {filteredArticles.length} Available
            </span>
          </div>

          {filteredArticles.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-stone-300 dark:border-stone-800 p-8 text-center my-6">
              <p className="text-stone-500 text-sm mb-3">
                No articles found in this sub-topic yet.
              </p>
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
              {latestArticles.map((art) => (
                <ArticleCard key={art.id} article={art} />
              ))}

              {/* Compact LinkedIn Update Card */}
              <div className="md:col-span-2 lg:col-span-1 flex flex-col">
                <InsightsLinkedInCard compact={true} className="h-full" />
              </div>
            </div>
          )}
        </div>

        {/* ── BACK NAVIGATION ── */}
        <div className="mt-16 pt-8 border-t border-stone-200/60 dark:border-stone-800/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            to="/insights"
            className="inline-flex items-center gap-2 font-['Outfit',sans-serif] font-bold text-xs sm:text-[13px] text-stone-600 dark:text-stone-300 hover:text-[#f97316] transition-colors"
          >
            <span>← All Insights</span>
          </Link>

          <Link
            to="/insights"
            className="inline-flex items-center gap-2 font-['Outfit',sans-serif] font-bold text-xs sm:text-[13px] text-[#f97316] hover:translate-x-1 transition-transform"
          >
            <span>Explore All Insights →</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
