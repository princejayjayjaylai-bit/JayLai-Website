export const interestThemeIds = [
  "travel",
  "music",
  "cooking",
  "film",
  "mystery",
] as const;

export type InterestThemeId = (typeof interestThemeIds)[number];

const mysteryPhotoFiles = [
  "1.jpg",
  "2.jpg",
  "3.jpg",
  "4.jpg",
  "5-kitchen.jpg",
] as const;

export function interestPhotoPaths(theme: InterestThemeId): string[] {
  if (theme === "mystery") {
    return mysteryPhotoFiles.map(
      (file) => `/images/interests/mystery/${file}`,
    );
  }
  return [1, 2, 3, 4, 5].map(
    (n) => `/images/interests/${theme}/${n}.jpg`,
  );
}

export function interestWheelIconPath(theme: InterestThemeId): string {
  return `/images/interests/wheel-icons/${theme}.png`;
}