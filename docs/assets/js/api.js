import { RGBToHSL, capitalize, getToday } from "general";

/**
 * Fetches data from a URL
 * @param {string} url The URL to fetch data from
 * @returns {Promise<Record<string, any> | Record<string, any>[] | null>} The data
 */
async function fetchData(url) {
  if (window.localStorage) {
    const data = window.localStorage.getItem(getToday() + url);
    if (data) return JSON.parse(data);
  }

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (window.localStorage) {
      window.localStorage.setItem(getToday() + url, JSON.stringify(data));
    }
    return data;
  } catch (e) {
    console.error(e);
    return null;
  }
}

/**
 * Maps a color object
 * @param {{name: string; hex: string; rgb: string; hsl?: string; families: string[]}} color The color to map
 * @returns {{name: string; hex: string; rgb: string; hsl: string; families: string[]}} The mapped color
 */
async function mapColor(color) {
  if (!color) return null;
  const mapped = color;
  if (!mapped.hsl && mapped.rgb) mapped.hsl = RGBToHSL(mapped.rgb);
  return mapped;
}

/**
 * Fetches a color by an image
 * @param {File} image The image file
 * @returns {Promise<{name: string; hex: string; rgb: string; hsl: string; families: string[]} | null>} The color
 */
export async function fetchColorByImage(image) {
  // if (!image) return null;
  const url = "./assets/data/colors.json";
  const colors = await fetchData(url);
  if (!colors) return null;
  const index = Math.floor(Math.random() * colors.length);
  return mapColor(colors[index]);
}

/**
 * Fetches colors that complement a given hex color
 * @param {string} hex The hex color
 * @returns {Promise<{name: string; hex: string; hsl: string; rgb: string}[]>} The colors
 */
export async function fetchColorPalette(hex) {
  const url = `https://www.thecolorapi.com/scheme?mode=analogic-complement&hex=${hex.replace(
    "#",
    ""
  )}`;

  const data = await fetchData(url);
  if (!data) return [];
  const mapped = data.colors.map((color) => {
    return {
      name: color.name.value,
      hex: color.hex.value,
      rgb: color.rgb.value,
      hsl: color.hsl.value,
      families: [],
    };
  });

  for (let i = 0; i < mapped.length; i++) {
    const nameMatch = await fetchColorByName(mapped[i].name);
    if (nameMatch) {
      mapped[i].families = nameMatch.families;
    } else {
      const hexMatch = await fetchColorByHex(mapped[i].hex);
      if (hexMatch) mapped[i].families = hexMatch.families;
    }
  }

  return mapped;
}

/**
 * Fetches a color by a hex code
 * @param {string} hex The hex color
 * @returns {Promise<{name: string; hsl: string; hex: string; rgb: string}>} The color
 */
export async function fetchColorByHex(hex) {
  if (!hex) return null;

  const colors = await fetchData("./assets/data/colors.json");
  const match = colors.find((color) => color.hex === hex.toUpperCase());
  if (match) return mapColor(match);

  const url = `https://www.thecolorapi.com/id?format=json&hex=${hex.replace(
    "#",
    ""
  )}`;

  const color = await fetchData(url);
  return {
    name: color.name.value,
    hex: color.hex.value,
    rgb: color.rgb.value,
    hsl: color.hsl.value,
  };
}

/**
 * Fetches the Dutch translation of a color name
 * @param {string} name The color name
 * @returns {Promise<string>} The Dutch translation
 */
export async function fetchColorName(name) {
  const url = "./assets/data/translations.json";
  const names = await fetchData(url);
  if (!names) return capitalize(name);
  return capitalize(names[name.toLowerCase()] || name);
}

/**
 * Fetches the Dutch translations of color names
 * @returns {Promise<Record<string, string>>} The Dutch translations
 */
export async function fetchColorNames() {
  const url = "./assets/data/translations.json";
  const names = await fetchData(url);
  return names || {};
}

/**
 * Fetches the color by name
 * @param {string} name The color name
 * @returns {Promise<{name: string; hex: string; rgb: string; hsl: string; families: string[]} | null>} The color
 */
export async function fetchColorByName(name) {
  if (!name) return null;
  const url = "./assets/data/colors.json";
  const colors = await fetchData(url);
  const match = colors.find((color) => color.name === name.toUpperCase());
  if (match) return mapColor(match);

  const names = await fetchColorNames();
  const translation = Object.keys(names).find(
    (key) => names[key] === name.toLowerCase()
  );
  if (!translation) return null;
  const color = colors.find(
    (color) => color.name === translation.toUpperCase()
  );
  if (color) return mapColor(color);
  return null;
}
