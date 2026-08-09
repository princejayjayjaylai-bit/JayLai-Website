export const experienceLandmarkPaths = [
  "/images/experience/oriental-pearl.png",
  "/images/experience/nanning-convention.png",
] as const;

export const experienceLandmarkSizes = [
  { width: 385, height: 869 },
  { width: 791, height: 513 },
] as const;

/** Locked silhouette layout. */
export const experienceLandmarkLayout = {
  pearl: {
    columnClassName: "w-[10.5rem] overflow-visible sm:w-[13.5rem]",
    innerClassName: "flex h-full w-full items-end justify-center overflow-visible",
    imageClassName:
      "h-auto w-auto max-w-full origin-bottom scale-[1.5] object-contain object-center max-h-[7.75rem] sm:max-h-[9.25rem]",
  },
  nanning: {
    columnClassName: "w-[10.5rem] sm:w-[13.5rem]",
    innerClassName: "flex h-full w-full items-stretch justify-end",
    imageClassName: "h-full w-auto max-w-full object-contain object-right",
    imageStyle: { height: "100%", width: "auto" } as const,
  },
} as const;

export const experienceLandmarkColumnClassName =
  "flex min-h-0 shrink-0 items-stretch justify-end self-stretch";
