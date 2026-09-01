export default function initAnySurferWave(RevealAPI) {
  "use strict";

  var revealElement = document.querySelector(".reveal");

  if (!RevealAPI || !revealElement) {
    console.warn("AnySurfer : Reveal.js est introuvable.");
    return;
  }

  /* Évite une double insertion du module. */
  if (revealElement.querySelector(".as-navigation-dock")) {
    return;
  }

  function removeBadAria() {
    var StatusElement = revealElement.querySelector(".aria-status")
    if (StatusElement) {
      StatusElement.remove()
    }
    revealElement.removeAttribute('role')
  }

  removeBadAria()

  function createDock() {
    var dock = document.createElement("nav");

    dock.className = "as-navigation-dock";
    dock.setAttribute("aria-label", "Navigation de la présentation");

    dock.innerHTML =
      '<div class="as-navigation-dock__group"' +
      ' role="group"' +
      ' aria-label="Navigation entre les chapitres">' +

        '<button type="button"' +
        ' class="as-navigation-dock__button"' +
        ' data-as-action="previous-chapter"' +
        ' aria-label="Chapitre précédent">' +
          '<span aria-hidden="true">←</span>' +
          '<span>Chapitre</span>' +
        '</button>' +

        '<output class="as-navigation-dock__position">' +
          '<span class="as-sr-only">Chapitre </span>' +
          '<span data-as-chapter-current>1</span>' +
          '<span aria-hidden="true">/</span>' +
          '<span class="as-sr-only"> sur </span>' +
          '<span data-as-chapter-total>1</span>' +
        '</output>' +

        '<button type="button"' +
        ' class="as-navigation-dock__button"' +
        ' data-as-action="next-chapter"' +
        ' aria-label="Chapitre suivant">' +
          '<span>Chapitre</span>' +
          '<span aria-hidden="true">→</span>' +
        '</button>' +

      '</div>' +

      '<span class="as-navigation-dock__separator"' +
      ' aria-hidden="true"></span>' +

      '<div class="as-navigation-dock__group"' +
      ' role="group"' +
      ' aria-label="Navigation dans le chapitre">' +

        '<button type="button"' +
        ' class="as-navigation-dock__button"' +
        ' data-as-action="previous-slide"' +
        ' aria-label="Diapositive précédente">' +
          '<span aria-hidden="true">↑</span>' +
          '<span>Diapo</span>' +
        '</button>' +

        '<output class="as-navigation-dock__position">' +
          '<span class="as-sr-only">Diapositive </span>' +
          '<span data-as-slide-current>1</span>' +
          '<span aria-hidden="true">/</span>' +
          '<span class="as-sr-only"> sur </span>' +
          '<span data-as-slide-total>1</span>' +
        '</output>' +

        '<button type="button"' +
        ' class="as-navigation-dock__button"' +
        ' data-as-action="next-slide"' +
        ' aria-label="Diapositive suivante">' +
          '<span>Diapo</span>' +
          '<span aria-hidden="true">↓</span>' +
        '</button>' +

      '</div>'

    revealElement.appendChild(dock);

    return dock;
  }

  var dock = createDock();

  var chapterCurrent = dock.querySelector(
    "[data-as-chapter-current]"
  );

  var chapterTotal = dock.querySelector(
    "[data-as-chapter-total]"
  );

  var slideCurrent = dock.querySelector(
    "[data-as-slide-current]"
  );

  var slideTotal = dock.querySelector(
    "[data-as-slide-total]"
  );

  var announcement = dock.querySelector(
    "[data-as-announcement]"
  );

  var previousChapterButton = dock.querySelector(
    '[data-as-action="previous-chapter"]'
  );

  var nextChapterButton = dock.querySelector(
    '[data-as-action="next-chapter"]'
  );

  var previousSlideButton = dock.querySelector(
    '[data-as-action="previous-slide"]'
  );

  var nextSlideButton = dock.querySelector(
    '[data-as-action="next-slide"]'
  );

  function getHorizontalSlides() {
    if (typeof RevealAPI.getHorizontalSlides === "function") {
      return RevealAPI.getHorizontalSlides();
    }

    return Array.prototype.slice.call(
      document.querySelectorAll(".reveal .slides > section")
    );
  }

  function getVerticalSlides(horizontalSlide) {
    if (!horizontalSlide) {
      return [];
    }

    return Array.prototype.filter.call(
      horizontalSlide.children,
      function (child) {
        return child.tagName === "SECTION";
      }
    );
  }

  function getCurrentTitle() {
    var currentSlide =
      typeof RevealAPI.getCurrentSlide === "function"
        ? RevealAPI.getCurrentSlide()
        : document.querySelector(".reveal .slides section.present");

    if (!currentSlide) {
      return "";
    }

    var heading = currentSlide.querySelector("h1, h2, h3");

    return heading ? heading.textContent.trim() : "";
  }

  function updateDock(announceChange) {
    var indices = RevealAPI.getIndices();
    var horizontalSlides = getHorizontalSlides();
    var horizontalSlide = horizontalSlides[indices.h];
    var verticalSlides = getVerticalSlides(horizontalSlide);

    var totalChapters = Math.max(horizontalSlides.length, 1);
    var totalSlides = Math.max(verticalSlides.length, 1);

    var currentChapter = Math.min(indices.h + 1, totalChapters);
    var currentSlide = Math.min((indices.v || 0) + 1, totalSlides);

    chapterCurrent.textContent = currentChapter;
    chapterTotal.textContent = totalChapters;

    slideCurrent.textContent = currentSlide;
    slideTotal.textContent = totalSlides;

    previousChapterButton.disabled = indices.h <= 0;
    nextChapterButton.disabled =
      indices.h >= totalChapters - 1;

    previousSlideButton.disabled =
      totalSlides <= 1 || indices.v <= 0;

    nextSlideButton.disabled =
      totalSlides <= 1 || indices.v >= totalSlides - 1;

    if (announceChange) {
      var title = getCurrentTitle();

      announcement.textContent =
        "Chapitre " +
        currentChapter +
        " sur " +
        totalChapters +
        ", diapositive " +
        currentSlide +
        " sur " +
        totalSlides +
        (title ? ". " + title : ".");
    }
  }

  function navigate(action) {
    var indices = RevealAPI.getIndices();
    var horizontalSlides = getHorizontalSlides();
    var horizontalSlide = horizontalSlides[indices.h];
    var verticalSlides = getVerticalSlides(horizontalSlide);

    var totalChapters = horizontalSlides.length;
    var totalSlides = Math.max(verticalSlides.length, 1);

    if (action === "previous-chapter" && indices.h > 0) {
      RevealAPI.slide(indices.h - 1, 0);
    }

    if (
      action === "next-chapter" &&
      indices.h < totalChapters - 1
    ) {
      RevealAPI.slide(indices.h + 1, 0);
    }

    if (action === "previous-slide" && indices.v > 0) {
      RevealAPI.slide(indices.h, indices.v - 1);
    }

    if (
      action === "next-slide" &&
      indices.v < totalSlides - 1
    ) {
      RevealAPI.slide(indices.h, indices.v + 1);
    }
  }

  dock.addEventListener("click", function (event) {
    var button = event.target.closest(
      "button[data-as-action]"
    );

    if (!button || button.disabled) {
      return;
    }

    navigate(button.getAttribute("data-as-action"));
  });

  function addRevealListener(eventName, callback) {
    /*
     * Reveal.on() est utilisé dans les versions récentes.
     * addEventListener() assure la compatibilité avec les
     * anciennes versions encore utilisées par AnySurfer.
     */
    if (typeof RevealAPI.on === "function") {
      RevealAPI.on(eventName, callback);
    } else if (
      typeof RevealAPI.addEventListener === "function"
    ) {
      RevealAPI.addEventListener(eventName, callback);
    }
  }

  addRevealListener("slidechanged", function () {
    updateDock(true);
  });

  /*
   * Le script peut être chargé après l’événement ready.
   */
  if (
    !(typeof RevealAPI.isReady === "function" &&
      RevealAPI.isReady()) ||
    revealElement.classList.contains("ready")
  ) {
    /*
     * Permet déjà d’afficher correctement le dock pendant
     * que Reveal termine son initialisation.
     */
    updateDock(false);
  }
}
