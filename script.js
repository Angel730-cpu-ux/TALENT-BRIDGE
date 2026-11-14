
document.addEventListener("DOMContentLoaded", function () {
  // Mobile navigation
  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".nav-links");

  if (menuButton && navigation) {
    menuButton.addEventListener("click", function () {
      navigation.classList.toggle("active");

      const isOpen = navigation.classList.contains("active");
      menuButton.setAttribute("aria-expanded", isOpen);
    });
  }

  // Close mobile navigation after clicking a link
  document.querySelectorAll(".nav-links a").forEach(function (link) {
    link.addEventListener("click", function () {
      if (navigation) {
        navigation.classList.remove("active");
      }

      if (menuButton) {
        menuButton.setAttribute("aria-expanded", "false");
      }
    });
  });

  // Smooth scrolling for links to sections on the same page
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (event) {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (target) {
        event.preventDefault();
        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });

  // Search functionality for searchable cards
  const searchInputs = document.querySelectorAll("[data-tb-search]");

  searchInputs.forEach(function (input) {
    input.addEventListener("input", function () {
      const searchTerm = input.value.toLowerCase().trim();
      const targetSelector = input.dataset.tbSearch;
      const cards = document.querySelectorAll(targetSelector);

      cards.forEach(function (card) {
        const cardText = card.textContent.toLowerCase();
        card.hidden = !cardText.includes(searchTerm);
      });
    });
  });

  // Filter cards using buttons
  document.querySelectorAll("[data-tb-filter]").forEach(function (button) {
    button.addEventListener("click", function () {
      const category = button.dataset.tbFilter;
      const group = button.dataset.tbGroup;
      const cards = document.querySelectorAll(
        '[data-tb-card="' + group + '"]'
      );

      document.querySelectorAll("[data-tb-group='" + group + "']")
        .forEach(function (item) {
          item.classList.remove("selected");
        });

      button.classList.add("selected");

      cards.forEach(function (card) {
        const cardCategory = card.dataset.category;
        card.hidden = category !== "all" && cardCategory !== category;
      });
    });
  });

  // Buttons that display a simple message
  document.querySelectorAll("[data-tb-message]").forEach(function (button) {
    button.addEventListener("click", function () {
      const message = button.dataset.tbMessage;
      alert(message);
    });
  });

  // Update the copyright year automatically
  document.querySelectorAll("[data-tb-year]").forEach(function (element) {
    element.textContent = new Date().getFullYear();
  });

  console.log("Talent Bridge is ready!");
});
