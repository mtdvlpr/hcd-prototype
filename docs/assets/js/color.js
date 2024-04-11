import { fetchColorByImage } from "api";
import { translateColor } from "general";

initColorForm();

function initColorForm() {
  const form = document.querySelector("form");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    await getColor();
    form.reset();
  });
}

async function getColor() {
  const colorInputs = document.querySelectorAll('input[type="file"]');
  let colorInput;
  colorInputs.forEach((input) => {
    if (input.files[0]) {
      colorInput = input.files[0];
    }
  });

  const output = document.getElementById("form-output");
  if (!colorInput) {
    output.innerText = "Er is geen afbeelding geselecteerd.";
    return;
  }

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
