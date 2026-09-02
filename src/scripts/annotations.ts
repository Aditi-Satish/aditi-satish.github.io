/**
 * Scientific Field Annotations & Citation Helpers (TypeScript)
 */

export function initAnnotations(): void {
  // Citation Copy Button
  const copyBtn = document.getElementById('copy-citation-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      const citationText = `Satish, A. L. (2026). Gene functions determine stochastic or adaptive futile transcription in cancers through deregulated start site deployments. Frontiers in Bioinformatics. https://doi.org/10.3389/fbinf.2026.1883461`;
      try {
        await navigator.clipboard.writeText(citationText);
        const originalHtml = copyBtn.innerHTML;
        copyBtn.innerHTML = `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>Citation Copied</span>
        `;
        setTimeout(() => {
          copyBtn.innerHTML = originalHtml;
        }, 2200);
      } catch (err) {
        console.warn('Clipboard write failed:', err);
      }
    });
  }

  // Active section spy for navigation
  const navLinks = document.querySelectorAll<HTMLAnchorElement>('.site-nav a');
  const sections = document.querySelectorAll<HTMLElement>('section[id]');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute('id') || '';
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}
