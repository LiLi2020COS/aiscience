const search = document.querySelector('#search');
if (search) {
  const country = document.querySelector('#country');
  const cards = [...document.querySelectorAll('.person')];
  const simplify = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  function filterPeople() {
    const terms = simplify(search.value.trim()).split(/\s+/);
    let count = 0;
    for (const card of cards) {
      const profile = simplify(card.innerText || card.textContent);
      card.hidden = (country.value && card.dataset.country !== country.value) || !terms.every(term => profile.includes(term));
      if (!card.hidden) count++;
    }
    document.querySelector('#count').textContent = count + (count === 1 ? ' researcher' : ' researchers');
    document.querySelector('#empty').hidden = count !== 0;
  }
  search.addEventListener('input', filterPeople);
  country.addEventListener('change', filterPeople);
  document.querySelector('#reset').addEventListener('click', () => {
    search.value = '';
    country.value = '';
    filterPeople();
    search.focus();
  });
}
for (const radio of document.querySelectorAll('[name="threshold"]')) {
  radio.addEventListener('change', () => {
    for (const view of document.querySelectorAll('.safeview')) view.hidden = view.id !== radio.value;
  });
}
