// js/portfolio.js
document.addEventListener("DOMContentLoaded", () => {
  const filters = document.querySelectorAll(".filters button");
  const cards = document.querySelectorAll(".portfolio-grid .card");

  filters.forEach(btn => {
    btn.addEventListener("click", () => {
      filters.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.dataset.filter;
      cards.forEach(card => {
        if (filter === "all" || card.dataset.category === filter) {
          card.style.display = "";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // Modal video
  const modal = document.getElementById("videoModal");
  const videoFrame = document.getElementById("videoFrame");
  const closeModal = document.getElementById("closeModal") || document.getElementById("closeModal");

  document.querySelectorAll(".videoThumb").forEach(a => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      const src = a.dataset.video;
      if (!src) return;
      videoFrame.src = src + (src.includes("?") ? "&autoplay=1" : "?autoplay=1");
      modal.style.display = "flex";
      modal.setAttribute("aria-hidden","false");
    });
  });

  const close = () => {
    videoFrame.src = "";
    modal.style.display = "none";
    modal.setAttribute("aria-hidden","true");
  };

  // close button (uses event delegation if id exists)
  const closeBtn = document.getElementById("closeModal");
  if (closeBtn) closeBtn.addEventListener("click", close);

  // click outside to close
  modal.addEventListener("click", (e) => {
    if (e.target === modal) close();
  });

  // esc key to close
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
});
