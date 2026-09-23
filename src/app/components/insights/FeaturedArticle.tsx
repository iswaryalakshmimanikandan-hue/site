import React from "react";
import { Link } from "react-router";
import { ArrowRight, Clock } from "lucide-react";
import { InsightArticle } from "@/app/data/insightsData";

interface FeaturedArticleProps {
  article: InsightArticle;
  sectionLabel?: string;
  className?: string;
}

export function FeaturedArticle({
  article,
  sectionLabel = "FEATURED ARTICLE",
  className = "",
}: FeaturedArticleProps) {
  return (
    <div className={className}>
      {sectionLabel && (
        <div className="flex items-center gap-2 mb-3">
          <span className="w-4 h-0.5 bg-[#f97316] rounded-full" />
          <h3 className="font-['JetBrains_Mono',monospace] text-[11px] font-bold uppercase tracking-[0.2em] text-[#f97316]">
            {sectionLabel}
          </h3>
        </div>
      )}

      <Link
        to={`/insights/${article.topicSlug}/${article.slug}`}
        className="group block rounded-[24px] bg-white dark:bg-[#151518] border border-stone-200/80 dark:border-stone-800/80 p-5 sm:p-7 shadow-sm hover:shadow-xl hover:shadow-orange-500/5 hover:border-[#f97316]/50 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* Content Column */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="flex items-center gap-2.5 mb-2.5">
              <span className="font-['JetBrains_Mono',monospace] text-[10px] font-bold uppercase tracking-[0.18em] px-2.5 py-0.5 rounded-full bg-orange-500/10 text-[#f97316] border border-orange-500/20">
                {article.subcategory || article.category}
              </span>
              <span className="text-stone-300 dark:text-stone-700">•</span>
              <span className="flex items-center gap-1 font-['JetBrains_Mono',monospace] text-[10px] text-stone-400 dark:text-stone-500 uppercase">
                <Clock size={11} />
                {article.readingTime}
              </span>
            </div>

            <h2 className="font-['Outfit',sans-serif] font-black text-xl sm:text-2xl lg:text-[28px] leading-[1.2] text-stone-900 dark:text-white mb-2.5 group-hover:text-[#f97316] transition-colors">
              {article.title}
            </h2>

            <p className="font-['Outfit',sans-serif] text-stone-600 dark:text-stone-300 text-xs sm:text-[14px] leading-relaxed mb-4 line-clamp-3">
              {article.description}
            </p>

            <div className="inline-flex items-center gap-1.5 font-['Outfit',sans-serif] font-bold text-xs sm:text-[13px] text-[#f97316] group-hover:translate-x-1 transition-transform">
              <span>Read Article</span>
              <ArrowRight size={14} />
            </div>
          </div>

          {/* Image Column */}
          <div className="lg:col-span-5 relative aspect-[16/10] w-full rounded-[16px] overflow-hidden bg-stone-100 dark:bg-stone-800 border border-stone-200/60 dark:border-stone-800/60">
            <img
              src={article.heroImage}
              alt={article.title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-104"
            />
          </div>
        </div>
      </Link>
    </div>
  );
}
