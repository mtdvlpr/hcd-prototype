import { fetchColorByImage } from "api";

initColorForm();

function initColorForm() {
  const form = document.querySelector("form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    getColor();
  });
}

async function getColor() {
  const output = document.querySelector("output");
  output.innerText = "Kleur wordt opgehaald...";
  const color = await translateColor(await fetchColorByImage());
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
