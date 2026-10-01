// The site only rebuilds when content changes, so move events that have passed since the last build.
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("site-nav");
  toggle?.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  const now = new Date();
  const today = [now.getFullYear(), String(now.getMonth() + 1).padStart(2, "0"), String(now.getDate()).padStart(2, "0")].join("-");
  const pastList = document.querySelector("[data-past]");

  document.querySelectorAll("[data-upcoming]").forEach((list) => {
    list.querySelectorAll(".event[data-date]").forEach((item) => {
      if (item.dataset.date < today) {
        if (pastList) pastList.prepend(item);
        else item.remove();
      }
    });
    const empty = list.parentElement.querySelector("[data-upcoming-empty]");
    if (empty && !list.querySelector(".event")) empty.hidden = false;
  });
});
