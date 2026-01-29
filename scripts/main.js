"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".book-container");
  const hints = document.querySelectorAll(".hint-box");
  const closeButtons = document.querySelectorAll(".close-hint");

  const hideHints = () => {
    hints.forEach((hint) => {
      hint.classList.add("hint-hidden");
      setTimeout(() => {
        hint.style.display = "none";
      }, 500);
    });
  };

  // 1. Stäng manuellt
  closeButtons.forEach((btn) => {
    btn.addEventListener("click", hideHints);
  });

  // 2. Timer: Stäng automatiskt efter 5 sekunder
  setTimeout(hideHints, 5000);

  // 3. Navigation (Piltangenter)
  document.addEventListener("keydown", (e) => {
    const scrollAmount = window.innerWidth;
    if (e.key === "ArrowRight") {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      hideHints();
    } else if (e.key === "ArrowLeft") {
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      hideHints();
    }
  });

  // 4. Mushjuls-fix
  container.addEventListener(
    "wheel",
    (evt) => {
      if (evt.deltaY !== 0) {
        evt.preventDefault();
        container.scrollLeft += evt.deltaY;
        hideHints();
      }
    },
    { passive: false },
  );
});
