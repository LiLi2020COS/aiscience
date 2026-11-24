(() => {
  document.querySelector('#jump').addEventListener('change', event => {
    if (event.target.value) location.hash = event.target.value;
  });
  let closed = [];
  window.addEventListener('beforeprint', () => {
    closed = [...document.querySelectorAll('details:not([open])')];
    closed.forEach(el => el.open = true);
  });
  window.addEventListener('afterprint', () => closed.forEach(el => el.open = false));
  const anchors = [...document.querySelectorAll('.spy-link')];
  const observer = new IntersectionObserver(entries => {
    const current = entries.find(entry => entry.isIntersecting);
    if (!current) return;
    for (const link of anchors) {
      if (link.hash === '#' + current.target.id) link.setAttribute('aria-current','location');
      else link.removeAttribute('aria-current');
    }
  }, { rootMargin: '-4% 0px -65% 0px' });
  anchors.forEach(link => {const target=document.getElementById(link.hash.slice(1));if(target)observer.observe(target);});
})();
