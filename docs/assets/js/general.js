import { fetchColorName, fetchColorNames } from "api";

/**
 * Capitalizes a string
 * @param {string} str The string
 * @returns The capitalized string
 */
export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Translates a color to Dutch
 * @param {{name: string; hex: string; rgb: string; families: string[]}} color The color
 */
export async function translateColor(color) {
  if (!color) return null;
  const translations = await fetchColorNames();
  let name = await fetchColorName(color.name);
  Object.keys(translations).forEach((key) => {
    name = name.replace(key, translations[key]);
    name = name.replace(capitalize(key), translations[key]);
  });
  const families =
    (await Promise.all(
      color.families?.map(async (family) => {
        let translation = await fetchColorName(family);
        Object.keys(translations).forEach((key) => {
          translation = translation.replace(key, translations[key]);
          translation = translation.replace(capitalize(key), translations[key]);
        });
        return capitalize(translation);
      }) || []
    )) || [];
  return {
    ...color,
    name: capitalize(name),
    families,
    original: color.name,
    originalFamilies: color.families,
  };
}
