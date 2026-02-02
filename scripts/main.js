"use strict";

if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".book-container");
  const hints = document.querySelectorAll(".hint-box");
  const progressIndicator = document.getElementById("progress-indicator");
  const pages = document.querySelectorAll(".page");
  const totalPages = pages.length;

  // Initial nollställning
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

  // Timer för anvisningar (Knapp-koden är nu borttagen härifrån)
  setTimeout(hideHints, 5000);

  // Navigation via piltangenter
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

  // Förbättrad mushjuls-fix för horisontell scroll
  container.addEventListener(
    "wheel",
    (evt) => {
      // Om man rullar hjulet (Y) eller drar i sidled på trackpad (X)
      if (evt.deltaY !== 0 || evt.deltaX !== 0) {
        evt.preventDefault();
        
        // Vi adderar både X och Y för att stödja alla typer av möss/trackpads
        // Vi använder scrollBy istället för scrollLeft direkt för bättre samspel med CSS
        container.scrollLeft += (evt.deltaY + evt.deltaX);
        
        hideHints();
      }
    },
    { passive: false }
  );

  // Uppdatera sidindikatorn
  container.addEventListener(
    "scroll",
    () => {
      const currentPage = Math.floor((container.scrollLeft + window.innerWidth / 2) / window.innerWidth) + 1;
      if (progressIndicator) {
        progressIndicator.innerText = `${currentPage} / ${totalPages}`;
      }
    },
    { passive: true }
  );

  // Säkerhetsåtgärd för rendering
  window.addEventListener("load", () => {
    window.scrollTo(0, 0);
    setTimeout(() => {
      container.scrollLeft = 0;
      pages.forEach((p) => (p.scrollTop = 0));
    }, 150);
  });
});