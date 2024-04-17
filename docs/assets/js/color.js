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

  const colorInputs = document.querySelectorAll('input[type="file"]');

  colorInputs.forEach((input) => {
    input.addEventListener("change", (e) => {
      colorInputs.forEach((i) => {
        if (i !== input) {
          i.value = "";
        }
      });
    });
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
    output.innerText = "Er is geen foto gekozen.";
    return;
  }

  output.innerText = "Kleur wordt opgehaald...";
  const color = await translateColor(await fetchColorByImage(colorInput));
  if (color) {
    output.innerHTML = `De gedetecteerde kleur is <span class="color" style="color: ${
      color.hex
    }" aria-hidden>•</span> ${
      color.name
    }. Deze kleur valt binnen de volgende categorieën: ${color.families.join(
      ", "
    )}.`;
  } else {
    output.innerText = "De kleur kon niet worden gedetecteerd.";
  }
}
