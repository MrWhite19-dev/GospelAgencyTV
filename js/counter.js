document.addEventListener('DOMContentLoaded', () => {
  const counters = document.querySelectorAll('[data-count]');

  if (!counters.length) return;

  const animateCount = (element) => {
    const target = Number(element.dataset.count);
    const duration = 1800;
    let start = 0;
    const stepTime = Math.max(Math.floor(duration / target), 20);

    const timer = setInterval(() => {
      start += Math.ceil(target / (duration / stepTime));
      if (start >= target) {
        element.textContent = target;
        clearInterval(timer);
      } else {
        element.textContent = start;
      }
    }, stepTime);
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach((counter) => observer.observe(counter));
});