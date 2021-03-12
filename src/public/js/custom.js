(function ($) {
  "use strict";

  // COLOR MODE
  if (window.matchMedia("(prefers-color-scheme)").media === "not all") {
    console.warn(
      "Your browser does not support the `prefers-color-scheme` media query."
    );
  }

  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

  const currentTheme = localStorage.getItem("theme");

  if (currentTheme) {
    document.body.classList.toggle(currentTheme);
  } else {
    document.body.classList.toggle(
      prefersDarkScheme.matches ? "dark" : "light"
    );
  }

  $(".color-mode").click(function () {
    $(".color-mode-icon").toggleClass("active");
    if (prefersDarkScheme.matches) {
      document.body.classList.toggle("light");
      const theme = document.body.classList.contains("light")
        ? "light"
        : "dark";
      localStorage.setItem("theme", theme);
    } else {
      document.body.classList.toggle("dark");
      const theme = document.body.classList.contains("dark") ? "dark" : "light";
      localStorage.setItem("theme", theme);
    }
  });

  // HEADER
  $(".navbar").headroom();

  // SMOOTHSCROLL
  $(function () {
    $(".nav-link, .custom-btn-link").on("click", function (event) {
      var $anchor = $(this);
      $("html, body")
        .stop()
        .animate(
          {
            scrollTop: $($anchor.attr("href")).offset().top - 49,
          },
          1000
        );
      event.preventDefault();
    });
  });

  // TOOLTIP
  $(".social-links a").tooltip();
})(jQuery);
