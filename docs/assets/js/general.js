import { fetchColorName, fetchColorNames } from "api";

/**
 * Capitalizes a string
 * @param {string} str The string
 * @returns {string} The capitalized string
 */
export function capitalize(str) {
  if (!str) return "";
  if (str === str.toUpperCase()) str = str.toLowerCase();
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Translates a color to Dutch
 * @param {{name: string; hex: string; rgb: string; hsl: string; families: string[]} | null} color The color
 * @returns {Promise<{name: string; hex: string; rgb: string; hsl: string; families: string[]} | null>} The translated color
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

/**
 * Gets today's date in the format "YYYY-MM-DD"
 * @returns The formatted date
 */
export function getToday() {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(date.getDate()).padStart(2, "0")}`;
}

/**
 * Converts RGB to HSL
 * @param {string} rgb The RGB color
 * @returns The HSL color
 */
export function RGBToHSL(rgb) {
  const sep = rgb.indexOf(",") > -1 ? "," : " ";
  rgb = rgb.substring(4).split(")")[0].split(sep);

  for (let R in rgb) {
    let r = rgb[R];
    if (r.indexOf("%") > -1)
      rgb[R] = Math.round((r.substring(0, r.length - 1) / 100) * 255);
  }

  // Make r, g, and b fractions of 1
  let r = rgb[0] / 255;
  let g = rgb[1] / 255;
  let b = rgb[2] / 255;

  // Find greatest and smallest channel values
  const cMin = Math.min(r, g, b);
  const cMax = Math.max(r, g, b);
  const delta = cMax - cMin;

  let h = 0;
  let s = 0;
  let l = 0;

  // Calculate hue

  // No difference
  if (delta == 0) h = 0;
  // Red is max
  else if (cMax == r) h = ((g - b) / delta) % 6;
  // Green is max
  else if (cMax == g) h = (b - r) / delta + 2;
  // Blue is max
  else h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  // Make negative hues positive behind 360°
  if (h < 0) h += 360;

  // Calculate lightness
  l = (cMax + cMin) / 2;

  // Calculate saturation
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

  // Multiply l and s by 100
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return "hsl(" + h + "," + s + "%," + l + "%)";
}

/**
 * Describes a color based on hsl
 * @param {string} hsl The color
 * @returns {string} The description
 */
export function describeColor(hsl) {
  if (!hsl) return "";
  let [h, s, l] = hsl.replace(/hsl\((.*)\)/, "$1").split(",");
  h = parseInt(h.replace("%", ""));
  s = parseInt(s.replace("%", ""));
  l = parseInt(l.replace("%", ""));
  const desc = `De kleur is een ${describeSaturation(s)}${describeLightness(
    l
  )}${describeHue(h)}.`;

  return desc;
}

function describeHue(h) {
  if (h < 15 || h > 344) return "rood";
  if (h === 15) return "rood-oranje";
  if (h > 327) return "roze";
  if (h > 291) return "magenta";
  if (h > 270) return "paars";
  if (h > 260) return "violet";
  if (h > 240) return "indigo";
  if (h > 193) return "blauw";
  if (h > 163) return "cyaan";
  if (h > 79) return "groen";
  if (h > 70) return "limoen-groen";
  if (h > 45) return "geel";
  if (h > 15) return "oranje";
}

function describeSaturation(s) {
  if (s > 80) return "enorm fel";
  if (s > 60) return "heel fel";
  if (s > 30) return "grauw";
  if (s > 9) return "erg grauw";
  return "bijna grijs";
}

function describeLightness(l) {
  if (l > 94) return ", bijna wit ";
  if (l > 80) return ", zeer licht ";
  if (l > 60) return ", licht ";
  if (l > 30) return " ";
  if (l > 22) return ", donker ";
  if (l > 9) return ", zeer donker ";
  return ", bijna zwart ";
}
