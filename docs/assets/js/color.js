import { fetchColorByImage } from "api";
import { translateColor } from "general";

initColorForm();

function initColorForm() {
  const form = document.querySelector("form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    getColor();
  });
}

async function getColor() {
  const colorInput = document.querySelector('input[type="file"]').files[0];
  const output = document.querySelector("output");
  output.innerText = "Kleur wordt opgehaald...";
  const color = await translateColor(await fetchColorByImage(colorInput));
  if (color) {
    output.innerText = `De gedetecteerde kleur is ${
      color.name
    }. Deze kleur valt binnen de volgende categorieën: ${color.families.join(
      ", "
    )}.`;
  } else {
    output.innerText = "De kleur kon niet worden gedetecteerd.";
  }
}
