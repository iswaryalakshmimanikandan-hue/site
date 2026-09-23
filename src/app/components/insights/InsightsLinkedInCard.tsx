import React from "react";
import { ThumbsUp, MessageSquare, Repeat2, Send } from "lucide-react";
import linkedinPresentationImg from "@/imports/linkedin_presentation.jpg";

interface InsightsLinkedInCardProps {
  compact?: boolean;
  className?: string;
}

export function InsightsLinkedInCard({
  compact = false,
  className = "",
}: InsightsLinkedInCardProps) {
  return (
    <div
      className={`rounded-[20px] bg-white dark:bg-[#151518] border border-stone-200/90 dark:border-stone-800/90 p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow group ${className}`}
    >
      {/* Header: Company Avatar + Meta + Follow Button */}
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <a
            href="https://www.linkedin.com/company/askjuno/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white font-black text-sm tracking-tight shadow-xs shrink-0 hover:opacity-95 transition-opacity"
            aria-label="AskJuno LinkedIn Profile"
          >
            AJ
          </a>

          <div className="min-w-0">
            <a
              href="https://www.linkedin.com/company/askjuno/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-['Outfit',sans-serif] font-bold text-[14px] sm:text-[15px] text-stone-900 dark:text-stone-100 leading-tight hover:text-[#f97316] transition-colors block truncate"
            >
              AskJuno
            </a>
            <p className="font-['Outfit',sans-serif] text-[11px] text-stone-400 dark:text-stone-500 mt-0.5 truncate">
              2,466 followers • 2 weeks ago
            </p>
          </div>
        </div>

        {/* + Follow Button */}
        <a
          href="https://www.linkedin.com/company/askjuno/"
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 inline-flex items-center gap-1 px-3 py-1 rounded-full border border-[#0077b5] text-[#0077b5] hover:bg-[#0077b5] hover:text-white font-['Outfit',sans-serif] text-[11.5px] font-semibold transition-all duration-200 active:scale-95 shadow-xs"
        >
          <span className="text-xs font-bold leading-none">+</span>
          <span>Follow</span>
        </a>
      </div>

      {/* Narrative text */}
      <p
        className={`font-['Outfit',sans-serif] text-stone-700 dark:text-stone-300 leading-relaxed mb-3 ${
          compact ? "text-xs line-clamp-2" : "text-xs sm:text-[13px]"
        }`}
      >
        Great products are built by passionate teams. Celebrating our engineering milestones and the people driving impactful technology forward every single day.
      </p>

      {/* Post Photo */}
      <div
        className={`relative w-full rounded-[12px] overflow-hidden bg-stone-100 dark:bg-stone-800 mb-3 border border-stone-200/60 dark:border-stone-800/60 ${
          compact ? "aspect-[16/8.5]" : "aspect-[16/9.2]"
        }`}
      >
        <img
          src={linkedinPresentationImg}
          alt="AskJuno team engineering presentation"
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
        />
      </div>

      {/* Footer Reaction Metrics */}
      <div className="flex items-center justify-between pt-2 border-t border-stone-100 dark:border-stone-800/80 text-stone-500 dark:text-stone-400 text-[11.5px] font-['Outfit',sans-serif]">
        <div className="flex items-center gap-1.5 hover:text-[#f97316] transition-colors cursor-pointer">
          <ThumbsUp size={13} className="text-[#f97316]" />
          <span className="font-semibold text-stone-700 dark:text-stone-300">142</span>
        </div>

        <div className="flex items-center gap-1.5 hover:text-[#f97316] transition-colors cursor-pointer">
          <MessageSquare size={13} />
          <span>12</span>
        </div>

        <div className="flex items-center gap-1.5 hover:text-[#f97316] transition-colors cursor-pointer">
          <Repeat2 size={13} />
          <span>8</span>
        </div>

        <a
          href="https://www.linkedin.com/company/askjuno/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 hover:text-[#f97316] transition-colors cursor-pointer"
          aria-label="Share on LinkedIn"
        >
          <Send size={13} />
        </a>
      </div>
    </div>
  );
}
