"use client";

import { useRouter } from "next/navigation";

type HistoryNavProps = {
  backLabel: string;
  forwardLabel: string;
  className?: string;
};

export function HistoryNav({
  backLabel,
  forwardLabel,
  className = "",
}: HistoryNavProps) {
  const router = useRouter();

  return (
    <div
      className={`flex items-center gap-0.5 sm:gap-1 ${className}`}
      aria-label="History"
    >
      <button
        type="button"
        onClick={() => router.back()}
        className="flex h-10 w-10 items-center justify-center rounded-sm text-xl font-light text-[#0c2340] transition-colors hover:bg-[#0c2340]/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0c2340]/40 sm:h-11 sm:w-11 sm:text-2xl"
        aria-label={backLabel}
      >
        ‹
      </button>
      <button
        type="button"
        onClick={() => router.forward()}
        className="flex h-10 w-10 items-center justify-center rounded-sm text-xl font-light text-[#0c2340] transition-colors hover:bg-[#0c2340]/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0c2340]/40 sm:h-11 sm:w-11 sm:text-2xl"
        aria-label={forwardLabel}
      >
        ›
      </button>
    </div>
  );
}
