/* Shared, event-driven mobile button glow. Does not cancel or replace click handlers. */
(() => {
  const selector = 'button, a, [role="button"], input[type="button"], input[type="submit"], input[type="reset"], summary, label, select, .navbtn, .chip, .food-item, .pill, .textbtn, .settings-link, .donebtn, .deletebtn, .waterbtn, .shortcut-card, .clickable';
  let releaseTimer;
  const clearPressed = (el) => { if (el && el.classList) el.classList.remove('fitbros-pressed'); };
  document.addEventListener('pointerdown', (event) => {
    const el = event.target && event.target.closest ? event.target.closest(selector) : null;
    if (!el || el.matches(':disabled') || el.getAttribute('aria-disabled') === 'true') return;
    clearTimeout(releaseTimer);
    document.querySelectorAll('.fitbros-pressed').forEach(clearPressed);
    el.classList.add('fitbros-pressed');
    if (el.setPointerCapture && event.pointerId !== undefined) { try { el.setPointerCapture(event.pointerId); } catch (_) {} }
  }, { passive: true });
  const releaseAll = () => {
    clearTimeout(releaseTimer);
    releaseTimer = setTimeout(() => document.querySelectorAll('.fitbros-pressed').forEach(clearPressed), 180);
  };
  document.addEventListener('pointerup', releaseAll, { passive: true });
  document.addEventListener('pointercancel', releaseAll, { passive: true });
  document.addEventListener('click', (event) => {
    const el = event.target && event.target.closest ? event.target.closest(selector) : null;
    if (!el || el.matches(':disabled') || el.getAttribute('aria-disabled') === 'true') return;
    el.classList.add('fitbros-pressed');
    clearTimeout(releaseTimer);
    releaseTimer = setTimeout(() => clearPressed(el), 260);
  }, true);
  window.addEventListener('blur', () => document.querySelectorAll('.fitbros-pressed').forEach(clearPressed));
})();
