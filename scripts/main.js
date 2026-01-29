"use strict";
history.scrollRestoration = "manual";

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".book-container");
  const hints = document.querySelectorAll(".hint-box");
  const closeButtons = document.querySelectorAll(".close-hint");
  const progressIndicator = document.getElementById("progress-indicator");
  const totalPages = document.querySelectorAll(".page").length;
  const pages = document.querySelectorAll(".page");
  pages.forEach((page) => (page.scrollTop = 0));

  container.scrollLeft = 0;

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

  setTimeout(hideHints, 5000);

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

  container.addEventListener(
    "scroll",
    () => {
      const currentPage =
        Math.round(container.scrollLeft / window.innerWidth) + 1;

      if (progressIndicator) {
        progressIndicator.innerText = `${currentPage} / ${totalPages}`;
      }
    },
    { passive: true },
  );
});
