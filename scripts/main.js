"use strict";

// Förhindra att webbläsaren kommer ihåg skrollposition vid omladdning
if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".book-container");
  const hints = document.querySelectorAll(".hint-box");
  const closeButtons = document.querySelectorAll(".close-hint");
  const progressIndicator = document.getElementById("progress-indicator");
  const pages = document.querySelectorAll(".page");
  const totalPages = pages.length;

  // Nollställ positioner direkt
  container.scrollLeft = 0;
  pages.forEach((page) => (page.scrollTop = 0));

  const hideHints = () => {
    hints.forEach((hint) => {
      hint.classList.add("hint-hidden");
      setTimeout(() => {
        hint.style.display = "none";
      }, 500);
    });
  };

  closeButtons.forEach((btn) => {
    btn.addEventListener("click", hideHints);
  });

  // Stäng automatiskt efter 5 sekunder
  setTimeout(hideHints, 5000);

  // Piltangentsnavigation
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

  // Mushjul horisontellt
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

  // Sidindikator (beräknas vid skroll)
  container.addEventListener(
    "scroll",
    () => {
      // Byter nummer när hälften av nästa sida visas
      const currentPage =
        Math.floor(
          (container.scrollLeft + window.innerWidth / 2) / window.innerWidth,
        ) + 1;

      if (progressIndicator) {
        progressIndicator.innerText = `${currentPage} / ${totalPages}`;
      }
    },
    { passive: true },
  );

  // Extra säkerhetsåtgärd för mobila webbläsare vid fullständig laddning
  window.addEventListener("load", () => {
    window.scrollTo(0, 0);
    setTimeout(() => {
      container.scrollLeft = 0;
      pages.forEach((page) => (page.scrollTop = 0));
    }, 150);
  });
});
