function checkCaptureSupport() {
  const input = document.querySelector("input[capture]");
  if (!input) return;
  document.body.classList.toggle("no-capture", input.capture === undefined);
}

checkCaptureSupport();
