export function setupMenu(toggleEl, navEl) {
    if (!toggleEl || !navEl) return;
  
    toggleEl.addEventListener('click', () => {
      navEl.classList.toggle('show-menu');
      toggleEl.classList.toggle('show-icon');
    });
  }
  