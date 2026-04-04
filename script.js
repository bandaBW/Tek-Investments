const menuToggle = document.querySelector(".menu-toggle");
const headerActions = document.querySelector(".header-actions");
const navLinks = document.querySelectorAll(".site-nav a");
const searchForm = document.querySelector("#site-search-form");
const searchInput = document.querySelector("#site-search-input");
const searchStatus = document.querySelector("#search-status");
const searchableSections = Array.from(document.querySelectorAll("main section[id]"));
const yearTarget = document.querySelector("#year");

const normalizeSearchText = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const clearSearchResults = () => {
  searchableSections.forEach((section) => {
    section.classList.remove("search-match", "search-focus");
  });

  if (searchForm) {
    searchForm.classList.remove("is-error", "is-success");
  }

  if (searchInput) {
    searchInput.removeAttribute("aria-invalid");
  }

  if (searchStatus) {
    searchStatus.textContent = "";
  }
};

const searchIndex = searchableSections.map((section) => {
  const heading =
    section.querySelector(".section-heading h2, .cta-card h2, h2, h3")?.textContent.trim() ||
    section.id;

  return {
    section,
    heading,
    haystack: normalizeSearchText(section.textContent),
  };
});

if (menuToggle && headerActions) {
  menuToggle.addEventListener("click", () => {
    const isOpen = headerActions.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      headerActions.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

if (searchForm && searchInput) {
  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    clearSearchResults();

    const query = normalizeSearchText(searchInput.value);

    if (!query) {
      return;
    }

    const terms = [...new Set(query.split(" ").filter(Boolean))];

    const matches = searchIndex
      .map((entry) => {
        const headingText = normalizeSearchText(entry.heading);
        const matchedTerms = terms.filter(
          (term) => entry.haystack.includes(term) || headingText.includes(term)
        );
        const phraseMatch = entry.haystack.includes(query) || headingText.includes(query);
        const allTermsMatch = matchedTerms.length === terms.length;

        return {
          ...entry,
          matchedTerms: matchedTerms.length,
          score:
            matchedTerms.length +
            (phraseMatch ? 3 : 0) +
            (allTermsMatch ? 2 : 0) +
            (headingText.includes(query) ? 1 : 0),
        };
      })
      .filter((entry) => entry.matchedTerms > 0)
      .sort((left, right) => right.score - left.score);

    if (!matches.length) {
      searchForm.classList.add("is-error");
      searchInput.setAttribute("aria-invalid", "true");

      if (searchStatus) {
        searchStatus.textContent = `No matches found for "${searchInput.value.trim()}".`;
      }

      return;
    }

    matches.forEach((match) => {
      match.section.classList.add("search-match");
    });

    const bestMatch = matches[0];
    const resultHeading = bestMatch.section.querySelector(".section-heading h2, .cta-card h2, h2, h3");

    bestMatch.section.classList.add("search-focus");
    searchForm.classList.add("is-success");

    if (searchStatus) {
      const label = bestMatch.heading.replace(/\.$/, "");
      searchStatus.textContent =
        matches.length === 1
          ? `Jumped to ${label}.`
          : `Found ${matches.length} matching sections. Jumped to ${label}.`;
    }

    bestMatch.section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    if (resultHeading) {
      resultHeading.setAttribute("tabindex", "-1");
      resultHeading.focus({ preventScroll: true });
    }

    if (headerActions && menuToggle && window.innerWidth <= 760) {
      headerActions.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });

  searchInput.addEventListener("input", () => {
    if (!searchInput.value.trim()) {
      clearSearchResults();
    }
  });
}

if (yearTarget) {
  yearTarget.textContent = new Date().getFullYear();
}
