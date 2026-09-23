import React from "react";
import { Link, useNavigate } from "react-router";
import { getAllTopics } from "@/app/data/insightsData";

interface CategoryNavigationProps {
  activeSlug?: string; // "all" or specific topic slug
  className?: string;
}

export function CategoryNavigation({
  activeSlug = "all",
  className = "",
}: CategoryNavigationProps) {
  const navigate = useNavigate();
  const topics = getAllTopics();

  return (
    <div
      className={`border-b border-stone-200/80 dark:border-stone-800/80 pb-3 ${className}`}
    >
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        {/* All Insights Pill */}
        {activeSlug === "all" ? (
          <span className="shrink-0 px-4 py-1.5 rounded-full text-xs sm:text-[13px] font-['Outfit',sans-serif] font-bold bg-[#f97316] text-white shadow-sm shadow-orange-500/20 cursor-default select-none">
            All Insights
          </span>
        ) : (
          <button
            type="button"
            onClick={() => navigate("/insights")}
            className="shrink-0 px-4 py-1.5 rounded-full text-xs sm:text-[13px] font-['Outfit',sans-serif] font-semibold text-stone-600 dark:text-stone-300 hover:text-[#f97316] hover:bg-orange-500/10 transition-all border border-stone-200/80 dark:border-stone-800/80 cursor-pointer"
          >
            All Insights
          </button>
        )}

        {/* 6 Category Domain Pills */}
        {topics.map((topic) => {
          const isActive = activeSlug === topic.slug;

          if (isActive) {
            return (
              <span
                key={topic.id}
                className="shrink-0 px-4 py-1.5 rounded-full text-xs sm:text-[13px] font-['Outfit',sans-serif] font-bold bg-[#f97316] text-white shadow-sm shadow-orange-500/20 cursor-default select-none"
              >
                {topic.name}
              </span>
            );
          }

          return (
            <button
              key={topic.id}
              type="button"
              onClick={() => navigate(`/insights/${topic.slug}`)}
              className="shrink-0 px-4 py-1.5 rounded-full text-xs sm:text-[13px] font-['Outfit',sans-serif] font-semibold text-stone-600 dark:text-stone-300 hover:text-[#f97316] hover:bg-orange-500/10 transition-all border border-stone-200/80 dark:border-stone-800/80 cursor-pointer"
            >
              {topic.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
