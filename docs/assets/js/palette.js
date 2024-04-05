import {
  fetchColorByHex,
  fetchColorByImage,
  fetchColorPalette,
  fetchColorByName,
} from "api";
import { translateColor } from "general";

initPaletteForm();

function initPaletteForm() {
  const form = document.querySelector("form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    getColorPalette();
  });
}

async function getColorPalette() {
  const output = document.querySelector("output");
  output.innerText = "Kleuren palette wordt opgehaald...";
  const colorInput = document
    .querySelector('input[type="color"]')
    .value?.replace("#000000", "");
  const image = document.querySelector('input[type="file"]').files[0];
  const colorName = document.querySelector('input[type="text"]').value;
  const color = await translateColor(
    await (colorInput
      ? fetchColorByHex(colorInput)
      : image
      ? fetchColorByImage(image)
      : fetchColorByName(colorName))
  );
  if (!color) {
    output.innerText = "De kleur kon niet worden gedetecteerd.";
    return;
  }
  const colors = await Promise.all(
    (await fetchColorPalette(color.hex)).map(translateColor)
  );
  if (colors) {
    output.innerHTML = `<span>De volgende kleuren passen goed bij ${
      color.name
    }:</span> ${colors
      .map(
        (c) =>
          `<span><span class="color" style="color: ${c.hex}" aria-hidden>•</span> ${c.name}</span>`
      )
      .join("<span class='visually-hidden'>, </span>")}`;
  } else {
    output.innerText = "Het kleuren palette kon niet worden opgehaald.";
  }
}
