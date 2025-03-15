document
  .getElementById("contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    alert("Kiitos viestistäsi! Otamme sinuun yhteyttä pian.");
    this.reset();
  });
