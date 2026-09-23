import React from "react";
import { Link } from "react-router";
import { ChevronRight } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  isCurrent?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex flex-wrap items-center gap-2 text-xs sm:text-[12.5px] font-['Outfit',sans-serif] ${className}`}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <React.Fragment key={index}>
            {index > 0 && (
              <ChevronRight size={12} className="text-stone-400 dark:text-stone-500 shrink-0" />
            )}

            {item.href && !item.isCurrent ? (
              <Link
                to={item.href}
                className="font-medium text-stone-500 dark:text-stone-400 hover:text-[#f97316] transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span
                className="font-bold text-[#f97316] truncate max-w-[280px] sm:max-w-md"
                title={item.label}
              >
                {item.label}
              </span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
