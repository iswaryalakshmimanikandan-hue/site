import React from "react";

interface SubsectionNavigationProps {
  topicName: string;
  subtopics: string[];
  selectedSubtopic: string;
  onSelectSubtopic: (subtopic: string) => void;
  className?: string;
}

export function SubsectionNavigation({
  topicName,
  subtopics,
  selectedSubtopic,
  onSelectSubtopic,
  className = "",
}: SubsectionNavigationProps) {
  return (
    <div
      className={`rounded-2xl bg-white/80 dark:bg-[#151518]/80 border border-stone-200/80 dark:border-stone-800/80 p-4 sm:p-5 shadow-xs backdrop-blur-xs ${className}`}
    >
      <div className="flex items-center justify-between gap-3 mb-3">
        <span className="font-['JetBrains_Mono',monospace] text-[10.5px] font-bold uppercase tracking-[0.2em] text-[#f97316]">
          SUB-TOPICS & FOCUS AREAS
        </span>
        <span className="font-['Outfit',sans-serif] text-xs text-stone-400 dark:text-stone-500 hidden sm:inline">
          Filter {topicName} perspectives
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {/* All Domain Articles Chip */}
        <button
          type="button"
          onClick={() => onSelectSubtopic("all")}
          className={`px-3.5 py-1.5 rounded-full text-xs sm:text-[12.5px] font-['Outfit',sans-serif] font-bold transition-all cursor-pointer ${
            selectedSubtopic === "all"
              ? "bg-[#f97316] text-white shadow-sm shadow-orange-500/25"
              : "bg-white dark:bg-[#18181c] border border-stone-200/80 dark:border-stone-800/80 text-stone-700 dark:text-stone-300 hover:border-orange-500/50 hover:text-[#f97316]"
          }`}
        >
          All {topicName}
        </button>

        {/* Individual Subsection Chips */}
        {subtopics.map((sub) => {
          const isActive = selectedSubtopic === sub;

          return (
            <button
              key={sub}
              type="button"
              onClick={() => onSelectSubtopic(sub)}
              className={`px-3.5 py-1.5 rounded-full text-xs sm:text-[12.5px] font-['Outfit',sans-serif] font-semibold transition-all cursor-pointer ${
                isActive
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
  );
}
