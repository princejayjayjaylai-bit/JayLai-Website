import { serifClass } from "@/lib/site-nav";

type BilingualProps = {
  en: React.ReactNode;
  zh: React.ReactNode;
  enClassName?: string;
  zhClassName?: string;
  gapClassName?: string;
};

/** English block first, Chinese second (site-wide convention). */
export function Bilingual({
  en,
  zh,
  enClassName = "text-neutral-700",
  zhClassName = "text-neutral-600",
  gapClassName = "mt-3",
}: BilingualProps) {
  return (
    <div>
      <div className={enClassName}>{en}</div>
      <div className={`${serifClass} ${gapClassName} ${zhClassName}`}>{zh}</div>
    </div>
  );
}

type SectionHeadingProps = {
  en: string;
  zh: string;
  className?: string;
};

export function SectionHeading({ en, zh, className = "" }: SectionHeadingProps) {
  return (
    <div className={className}>
      <h2 className={`${serifClass} text-2xl font-semibold text-[#0c2340] sm:text-3xl`}>
        {en}
      </h2>
      <p className={`${serifClass} mt-2 text-lg text-neutral-600`}>{zh}</p>
    </div>
  );
}

export function BilingualButtonLabel({ en, zh }: { en: string; zh: string }) {
  return (
    <span className="flex flex-col items-center leading-tight">
      <span>{en}</span>
      <span className={`${serifClass} mt-0.5 text-[10px] font-normal normal-case tracking-normal opacity-90`}>
        {zh}
      </span>
    </span>
  );
}
