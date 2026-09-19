import React, { useEffect, useRef } from "react";
import { X, Mail, Phone, Shield, Lock, FileText, CheckCircle2, UserCheck } from "lucide-react";

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  dark?: boolean;
}

export function PrivacyPolicyModal({ isOpen, onClose }: PrivacyPolicyModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const scrollPositionRef = useRef<number>(0);

  useEffect(() => {
    if (!isOpen) return;

    // Save exact homepage scroll position before locking
    scrollPositionRef.current = window.scrollY;

    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    // Focus close button for accessibility
    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
      // Guarantee returning to the exact previous scroll position
      window.scrollTo(0, scrollPositionRef.current);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-0 sm:p-4 md:p-6 bg-black/60 backdrop-blur-md transition-opacity duration-300"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-policy-title"
    >
      {/* Overlay container */}
      <div
        className="relative w-full h-full sm:w-[94vw] sm:max-w-4xl sm:h-[92vh] sm:max-h-[900px] bg-card text-card-foreground rounded-none sm:rounded-2xl md:rounded-3xl border-0 sm:border sm:border-border/80 shadow-2xl flex flex-col overflow-hidden transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle orange accent gradient bar at the top */}
        <div
          className="absolute inset-x-0 top-0 h-1 z-30 pointer-events-none"
          style={{
            background: "linear-gradient(90deg, transparent 0%, rgba(249,115,22,0.9) 50%, transparent 100%)",
          }}
        />

        {/* Visually distinct Header (fixed at top of overlay) */}
        <div className="sticky top-0 z-20 relative flex items-center justify-center px-12 py-4 md:px-16 md:py-5 border-b border-border/70 bg-card/95 backdrop-blur-md shadow-sm text-center">
          <div className="flex flex-col items-center gap-0.5">
            <div className="flex items-center justify-center gap-2.5">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-orange-500/10 text-orange-500">
                <Shield className="w-3.5 h-3.5" />
              </span>
              <h2
                id="privacy-policy-title"
                className="font-['Outfit',sans-serif] text-xl md:text-2xl font-bold tracking-tight text-foreground"
              >
                Privacy Policy
              </h2>
            </div>
            <p className="font-['Outfit',sans-serif] text-xs md:text-sm text-muted-foreground">
              Effective Date: <span className="font-medium text-foreground">11th September 2025</span>
            </p>
          </div>

          {/* Close button: elegant, compact, visible while scrolling */}
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close Privacy Policy"
            className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/80 border border-border/70 hover:border-orange-500/40 transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
          >
            <X className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-200 hover:rotate-90" />
          </button>
        </div>

        {/* Scrollable Body Content */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-6 py-6 md:px-12 md:py-8 font-['Outfit',sans-serif] text-foreground scroll-smooth">
          <div className="max-w-3xl mx-auto space-y-8">
            {/* Introductory statement */}
            <div className="p-5 md:p-6 rounded-xl md:rounded-2xl bg-muted/30 border border-border/50 text-sm md:text-base leading-relaxed text-muted-foreground">
              <p>
                At <span className="font-semibold text-foreground">Askjuno Private Limited</span>, we are committed to
                protecting and respecting your privacy. This Privacy Policy outlines how we collect, use, disclose, and
                safeguard your information when you visit our website and use our data extraction services.
              </p>
            </div>

            {/* Section 1 */}
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-orange-500/10 text-orange-500 flex items-center justify-center text-xs font-bold">
                  1
                </span>
                <h3 className="text-lg md:text-xl font-bold tracking-tight text-foreground">
                  Information We Collect
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-0 md:pl-10">
                <div className="p-4 md:p-5 rounded-xl bg-background border border-border/60 hover:border-orange-500/20 transition-colors">
                  <div className="flex items-center gap-2 mb-2 font-semibold text-foreground text-sm md:text-base">
                    <UserCheck className="w-4 h-4 text-orange-500" />
                    <h4>Personal Information</h4>
                  </div>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                    We collect personal information that you provide to us when you interact with our website and
                    services, including your name, email address, phone number, company name, and job title.
                  </p>
                </div>

                <div className="p-4 md:p-5 rounded-xl bg-background border border-border/60 hover:border-orange-500/20 transition-colors">
                  <div className="flex items-center gap-2 mb-2 font-semibold text-foreground text-sm md:text-base">
                    <FileText className="w-4 h-4 text-orange-500" />
                    <h4>Non-Personal Information</h4>
                  </div>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                    We also collect non-personal information, including log data such as IP address, browser type,
                    device type, operating system, and browsing behavior.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 2 */}
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-orange-500/10 text-orange-500 flex items-center justify-center text-xs font-bold">
                  2
                </span>
                <h3 className="text-lg md:text-xl font-bold tracking-tight text-foreground">
                  How We Use Your Information
                </h3>
              </div>

              <div className="pl-0 md:pl-10">
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    "To provide our data extraction, processing, and integration services",
                    "To communicate with you and provide customer support",
                    "To analyze usage patterns and improve our services",
                    "To comply with applicable laws and regulations",
                  ].map((item, idx) => (
                    <li
                      key={idx}
                      className="p-3.5 rounded-xl bg-background border border-border/60 flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                      <span className="text-xs md:text-sm text-muted-foreground leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Section 3 */}
            <section className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-orange-500/10 text-orange-500 flex items-center justify-center text-xs font-bold">
                  3
                </span>
                <h3 className="text-lg md:text-xl font-bold tracking-tight text-foreground">Data Security</h3>
              </div>
              <div className="pl-0 md:pl-10">
                <div className="p-4 md:p-5 rounded-xl bg-background border border-border/60 flex items-start gap-3.5">
                  <Lock className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                    We take reasonable steps to protect your personal information from unauthorized access, alteration,
                    or destruction using encryption, secure servers, and access controls.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-orange-500/10 text-orange-500 flex items-center justify-center text-xs font-bold">
                  4
                </span>
                <h3 className="text-lg md:text-xl font-bold tracking-tight text-foreground">Your Rights</h3>
              </div>
              <div className="pl-0 md:pl-10">
                <div className="p-4 md:p-5 rounded-xl bg-background border border-border/60">
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                    You have the right to access, correct, or delete your personal information. You can also opt out of
                    marketing emails and request data portability where applicable.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 5 */}
            <section className="space-y-3 pb-4">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-orange-500/10 text-orange-500 flex items-center justify-center text-xs font-bold">
                  5
                </span>
                <h3 className="text-lg md:text-xl font-bold tracking-tight text-foreground">Contact Us</h3>
              </div>
              <div className="pl-0 md:pl-10">
                <div className="p-5 md:p-6 rounded-xl md:rounded-2xl bg-gradient-to-br from-background to-muted/30 border border-border/70 space-y-4">
                  <p className="text-xs md:text-sm text-muted-foreground">
                    If you have any questions about this Privacy Policy, please contact us at:
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 pt-1">
                    <a
                      href="mailto:enquiry@askjuno.com"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-background border border-border/80 hover:border-orange-500/50 text-foreground hover:text-orange-500 text-xs md:text-sm font-medium transition-all group"
                    >
                      <Mail className="w-4 h-4 text-orange-500 group-hover:scale-110 transition-transform" />
                      <span>enquiry@askjuno.com</span>
                    </a>
                    <a
                      href="tel:+917550267584"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-background border border-border/80 hover:border-orange-500/50 text-foreground hover:text-orange-500 text-xs md:text-sm font-medium transition-all group"
                    >
                      <Phone className="w-4 h-4 text-orange-500 group-hover:scale-110 transition-transform" />
                      <span>+91 7550267584</span>
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
