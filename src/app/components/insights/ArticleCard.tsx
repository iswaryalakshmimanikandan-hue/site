import React from "react";
import { Link } from "react-router";
import { ArrowRight, Clock } from "lucide-react";
import { InsightArticle } from "@/app/data/insightsData";

interface ArticleCardProps {
  article: InsightArticle;
  className?: string;
}

export function ArticleCard({ article, className = "" }: ArticleCardProps) {
  return (
    <Link
      to={`/insights/${article.topicSlug}/${article.slug}`}
      className={`group rounded-[18px] bg-white dark:bg-[#151518] border border-stone-200/80 dark:border-stone-800/80 p-4 sm:p-5 flex flex-col justify-between shadow-xs hover:border-[#f97316]/50 hover:shadow-lg hover:shadow-orange-500/5 hover:-translate-y-1 transition-all duration-300 ${className}`}
    >
      <div>
        {/* Visual Thumbnail */}
        <div className="relative aspect-[16/9.5] w-full rounded-[12px] overflow-hidden bg-stone-100 dark:bg-stone-800 mb-4 border border-stone-200/60 dark:border-stone-800/60">
          <img
            src={article.heroImage}
            alt={article.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-104"
          />
        </div>

        {/* Metadata: Category & Reading Time */}
        <div className="flex items-center gap-2 mb-2">
          <span className="font-['JetBrains_Mono',monospace] text-[9.5px] font-bold uppercase tracking-[0.16em] text-[#f97316]">
            {article.subcategory || article.category}
          </span>
          <span className="text-stone-300 dark:text-stone-700">•</span>
          <span className="flex items-center gap-1 font-['JetBrains_Mono',monospace] text-[9.5px] text-stone-400 dark:text-stone-500 uppercase">
            <Clock size={10} />
            {article.readingTime}
          </span>
        </div>

        {/* Article Title */}
        <h4 className="font-['Outfit',sans-serif] font-bold text-[16px] sm:text-[17px] text-stone-900 dark:text-stone-100 group-hover:text-[#f97316] transition-colors leading-snug mb-2 line-clamp-2">
          {article.title}
        </h4>

        {/* Short Description */}
        <p className="font-['Outfit',sans-serif] text-stone-500 dark:text-stone-400 text-xs sm:text-[13px] leading-relaxed line-clamp-3 mb-4">
          {article.description}
        </p>
      </div>

      {/* Read Article CTA */}
      <div className="pt-2 border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between">
        <span className="font-['Outfit',sans-serif] font-semibold text-xs text-[#f97316] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
          Read Article <ArrowRight size={12} />
        </span>
        <span className="font-['JetBrains_Mono',monospace] text-[10px] text-stone-400 dark:text-stone-500">
          {article.publishedDate}
        </span>
      </div>
    </Link>
  );
}
