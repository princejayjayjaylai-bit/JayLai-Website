export type ProjectShowcaseId = "ipo" | "others";

export const projectShowcaseImages: Record<
  ProjectShowcaseId,
  readonly string[]
> = {
  ipo: [
    "/images/projects/ipo-clients/lead.png",
    "/images/projects/ipo-clients/crealights.png",
    "/images/projects/ipo-clients/baige-online.png",
    "/images/projects/ipo-clients/keytop.png",
  ],
  others: ["/images/projects/others/hongqiao-pet-lounge.png"],
};

/** IPO grid cells that should bleed to cell edges (e.g. full-bleed logo marks). */
export const projectShowcaseFullBleed = new Set([
  "/images/projects/ipo-clients/keytop.png",
]);
