"use strict";

const container = document.querySelector(".book-container");

// Funktion för att bläddra till nästa/föregående sida
function navigate(direction) {
  const pageWidth = window.innerWidth;
  container.scrollBy({
    left: direction === "next" ? pageWidth : -pageWidth,
    behavior: "smooth",
  });
}

// Lyssna på piltangenter på tangentbordet (Bra för tillgänglighet)
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") navigate("next");
  if (e.key === "ArrowLeft") navigate("prev");
});

("use strict");

const container = document.querySelector(".book-container");

container.addEventListener(
  "wheel",
  (evt) => {
    // Om användaren scrollar vertikalt, tvinga den att gå horisontellt istället
    if (evt.deltaY !== 0) {
      evt.preventDefault();
      container.scrollLeft += evt.deltaY;
    }
  },
  { passive: false },
);
