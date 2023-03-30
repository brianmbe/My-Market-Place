(function () {
  //
  const slides = document.querySelectorAll(".slide");
  const slider = document.querySelector(".slider");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  const dotContainer = document.querySelector(".dots");

  let currentSlide = 0;
  const maxSLide = slides.length;

  slides.forEach(
    (slide, i) => (slide.style.transform = `translateX(${100 * i}%)`)
  );

  // Dots
  const createDots = function () {
    slides.forEach((_s, i) => {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateActiveDot = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  function gotoSlide(slide) {
    slides.forEach(
      (sl, i) => (sl.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  }

  // Slider initialization function!
  (function () {
    createDots();
    activateActiveDot(currentSlide);
    gotoSlide(currentSlide);
  })();

  // Next slide
  const nextSlide = function () {
    if (currentSlide === maxSLide - 1) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }
    // 0%, 100%, 200%, 300%
    gotoSlide(currentSlide);
    activateActiveDot(currentSlide);
  };

  // Previous slide
  const previousSlide = function () {
    if (currentSlide === 0) {
      currentSlide = maxSLide - 1;
    } else {
      currentSlide--;
    }

    gotoSlide(currentSlide);
  };

  // btn handlers
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", previousSlide);

  // Slider dots
  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const { slide } = e.target.dataset;
      gotoSlide(slide);
      activateActiveDot(slide);
    }
  });

  setInterval(nextSlide, 5000);
})();
