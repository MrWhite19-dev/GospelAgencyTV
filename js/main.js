document.addEventListener('DOMContentLoaded', () => {
  const loader = document.querySelector('.loader');
  const revealElements = document.querySelectorAll('.reveal');

  if (loader) {
    window.addEventListener('load', () => {
      loader.classList.add('loaded');
      setTimeout(() => loader.remove(), 600);
    });
  }

  if (revealElements.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.18,
      }
    );

    revealElements.forEach((el) => observer.observe(el));
  }
});
