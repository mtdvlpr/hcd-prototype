import { fetchColorByImage, fetchColorPalette, fetchColorByName } from "api";
import { translateColor, describeColor } from "general";

initPaletteForm();

/**
 * Initializes the palette form
 */
function initPaletteForm() {
  const form = document.querySelector("form");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    await getColorPalette();
    form.reset();
  });

  const textInput = document.querySelector('input[type="text"]');
  const fileInputs = document.querySelectorAll('input[type="file"]');

  textInput.addEventListener("blur", (e) => {
    if (e.target.value) {
      fileInputs.forEach((i) => {
        i.value = "";
      });
    }
  });

  fileInputs.forEach((input) => {
    input.addEventListener("change", () => {
      textInput.value = "";
      fileInputs.forEach((i) => {
        if (i !== input) {
          i.value = "";
        }
      });
    });
  });
}

/**
 * Gets the color palette
 */
async function getColorPalette() {
  const output = document.querySelector("output");
  output.innerText = "Kleuren palette wordt opgehaald...";

  const image = document.querySelector('input[type="file"]').files[0];
  const colorName = document.querySelector('input[type="text"]').value;

  if (!image && !colorName) {
    output.innerText = "Er is geen kleur of kledingstuk ingevuld.";
    return;
  }

  const color = await translateColor(
    await (image ? fetchColorByImage(image) : fetchColorByName(colorName))
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
    }:</span> <ul>${colors
      .map(
        (c) =>
          `<li><span><span class="color" style="color: ${
            c.hex
          }" aria-hidden>•</span> ${c.name}${
            c.families?.length ? ` (${c.families.join(", ")})` : ""
          }${c.hsl ? `. ${describeColor(c.hsl)}` : ""}</span></li>`
      )
      .join("<span class='visually-hidden'>, </span>")}</ul>`;
  } else {
    output.innerText = "Het kleuren palette kon niet worden opgehaald.";
  }
}
