/* Фильтр по категориям ошибок */

(function () {
  const bar    = document.querySelector('[data-errors-filter]');
  const items  = document.querySelectorAll('.err[data-tags]');
  const count  = document.querySelector('[data-errors-count]');
  if (!bar || !items.length) return;

  const buttons = bar.querySelectorAll('button');

  const apply = (tag) => {
    let visible = 0;
    items.forEach((el) => {
      const tags = (el.dataset.tags || '').split(/\s+/);
      const show = tag === 'all' || tags.includes(tag);
      el.hidden = !show;
      if (show) visible++;
    });
    if (count) {
      const map = {
        all:     'Все ошибки',
        word:    'Word',
        excel:   'Excel',
        vba:     'VBA',
        report:  'Отчёт',
        common:  'Общие'
      };
      count.textContent = `Показано: ${visible} (${map[tag] || tag})`;
    }
    buttons.forEach((b) => b.classList.toggle('is-active', b.dataset.filter === tag));
  };

  bar.addEventListener('click', (e) => {
    const b = e.target.closest('button[data-filter]');
    if (!b) return;
    apply(b.dataset.filter);
  });

  // Начальное состояние
  apply('all');
})();