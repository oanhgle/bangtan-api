(function ($) {
  "use strict";

  // COLOR MODE
  if (window.matchMedia("(prefers-color-scheme)").media === "not all") {
    console.warn(
      "Your browser does not support the `prefers-color-scheme` media query."
    );
  }

  const currentTheme = localStorage.getItem("theme");

  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

  const light = document.querySelector(
    `link[rel=stylesheet][media*=prefers-color-scheme][media*="light"]`
  );
  const dark = document.querySelector(
    `link[rel=stylesheet][media*=prefers-color-scheme][media*="dark"]`
  );

  if (currentTheme) {
    document.body.classList.toggle(currentTheme);
    toggleTheme(currentTheme);
  } else {
    const currentTheme = prefersDarkScheme.matches ? "dark" : "light";
    document.body.classList.toggle(currentTheme);
    localStorage.setItem("theme", currentTheme);
  }

  $(".color-mode").click(function () {
    $(".color-mode-icon").toggleClass("active");
    const currentTheme = localStorage.getItem("theme");
    const themes = {
      dark: "light",
      light: "dark",
    };
    document.body.classList.remove(currentTheme);
    document.body.classList.add(themes[currentTheme]);

    toggleTheme(themes[currentTheme]);

    localStorage.setItem("theme", themes[currentTheme]);
  });

  function toggleTheme(theme) {
    switch (theme) {
      case "light":
        light.media = "all";
        light.disabled = false;
        dark.media = "not all";
        dark.disabled = true;
        break;
      case "dark":
        dark.media = "all";
        dark.disabled = false;
        light.media = "not all";
        light.disabled = true;
        break;
    }
  }

  // HEADER
  $(".navbar").headroom();

  // SMOOTHSCROLL
  $(function () {
    $(".nav-link, .custom-btn-link").on("click", function (event) {
      const $anchor = $(this);
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
