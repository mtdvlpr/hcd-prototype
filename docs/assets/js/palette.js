import { fetchColorByHex, fetchColorByImage, fetchColorPalette } from "api";
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
  const colorInput = document.querySelector('input[type="color"]').value;
  const color = await translateColor(
    await (colorInput ? fetchColorByHex(colorInput) : fetchColorByImage())
  );
  console.log("color", color);
  if (!color) {
    output.innerText = "De kleur kon niet worden gedetecteerd.";
    return;
  }
  const colors = await Promise.all(
    (await fetchColorPalette(color.hex)).map(translateColor)
  );
  console.log("colors", colors);
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
