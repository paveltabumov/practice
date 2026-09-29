/* =========================================================
   Общий скрипт сайта (app.js)
   
   1. Тёмная / светлая тема
   2. Мобильное меню
   3. Состояние чек-листов
   4. Подсветка правого оглавления (TOC)
   ========================================================= */

   (function () {

    /* =========================================================
       1. Тема
       ========================================================= */
    const root = document.documentElement;
    const savedTheme = localStorage.getItem('theme');
  
    if (savedTheme) {
      root.setAttribute('data-theme', savedTheme);
      // Опционально: можно добавить иконку на кнопку, если нужно
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      root.setAttribute('data-theme', 'dark');
    }
  
    document.addEventListener('click', (e) => {
      const t = e.target.closest('[data-theme-toggle]');
      if (!t) return;
      const cur = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', cur);
      localStorage.setItem('theme', cur);
    });
  
    /* =========================================================
       2. Мобильное меню
       ========================================================= */
    document.addEventListener('click', (e) => {
      const t = e.target.closest('[data-menu-toggle]');
      if (!t) return;
      document.querySelector('.sidebar')?.classList.toggle('is-open');
    });
  
    /* =========================================================
       3. Чек-листы
       ========================================================= */
    document.querySelectorAll('.checklist input[type="checkbox"]').forEach((cb) => {
      const key = 'check:' + (cb.dataset.key || cb.id || '');
      if (!key) return;
  
      if (localStorage.getItem(key) === '1') {
        cb.checked = true;
        cb.closest('li')?.classList.add('is-done');
      }
  
      cb.addEventListener('change', () => {
        localStorage.setItem(key, cb.checked ? '1' : '0');
        cb.closest('li')?.classList.toggle('is-done', cb.checked);
      });
    });
  
    /* =========================================================
       4. Подсветка активного раздела в правом TOC
       ========================================================= */
    const tocLinks = document.querySelectorAll('.toc a[href^="#"]');
    if (tocLinks.length) {
      const map = new Map();
      tocLinks.forEach((a) => {
        const id = a.getAttribute('href').slice(1);
        const el = document.getElementById(id);
        if (el) map.set(el, a);
      });
  
      if (map.size) {
        const io = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              // Убираем активность со всех ссылок
              tocLinks.forEach((a) => a.classList.remove('is-active'));
              // Добавляем текущей
              map.get(entry.target)?.classList.add('is-active');
            });
          },
          { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
        );
        map.forEach((_, el) => io.observe(el));
      }
    }
  
  })();