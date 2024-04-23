import { fetchColorByName, fetchColorNames } from "api";
import { RGBToHSL } from "general";

/**
 * Checks support for the input file capture attribute
 */
function checkCaptureSupport() {
  const input = document.querySelector("input[capture]");
  if (!input) return;
  document.body.classList.toggle("no-capture", input.capture === undefined);
}

checkCaptureSupport();

// Fetch in background for caching purposes
fetchColorNames();
fetchColorByName("red");
