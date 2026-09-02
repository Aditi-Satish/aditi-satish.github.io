/**
 * Transcription Start Site (TSS) & Genomic Trajectory Interactive Visualizer
 * HoMeCell Lab - IIT Gandhinagar
 * Visual Metaphor: Genomic Locus -> Multiple TSSs (Distal, Canonical, Proximal) -> Divergent Transcripts -> Resource Costs
 */

export type TSSMode = 'all' | 'noncancer' | 'cancer' | 'energy';

export interface TSSScenario {
  title: string;
  desc: string;
  energy: string;
  fate: string;
}

export function initTSSVisualizer(): void {
  const container = document.getElementById('tss-svg-container');
  const calloutTitle = document.getElementById('callout-title');
  const calloutDesc = document.getElementById('callout-desc');
  const calloutEnergy = document.getElementById('callout-energy');
  const calloutFate = document.getElementById('callout-fate');
  const tabButtons = document.querySelectorAll<HTMLButtonElement>('.viz-tab-btn');

  if (!container) return;

  // Scientific scenario data model
  const states: Record<TSSMode, TSSScenario> = {
    all: {
      title: "Alternative TSS Deployments & Transcriptional Fates",
      desc: "Alternative start site deployment dictates cellular metabolic expenditure. Non-cancers select canonical (TSS 2) and cell-type specific start sites, whereas cancers suffer from distal dysregulation and heavy futile cycles.",
      energy: "Variable",
      fate: "Equilibrium"
    },
    noncancer: {
      title: "Physiological / Non-Cancer Selection (Adaptive)",
      desc: "Regulated deployment from the canonical site (TSS 2) and cell-type specific site (TSS 3) conserves metabolic currency, producing functional adaptive gene products.",
      energy: "Optimised (Low)",
      fate: "Canonical & Adaptive"
    },
    cancer: {
      title: "Oncogenic / Cancer Selection (Dysregulated & Futile)",
      desc: "Start site deployment is altered: initiation from distal TSS 1 generates dysregulated transcripts and drives heavy, energy-draining futile transcription.",
      energy: "Excessive (High)",
      fate: "Dysregulated & Futile"
    },
    energy: {
      title: "Metabolic Cost & Futile Energy Drain",
      desc: "Thermodynamic penalty: The heavy water-wash futile trajectory from distal TSS 1 consumes nucleotide pools and ATP without functional biological payoff.",
      energy: "ΔCost +340%",
      fate: "Resource Drain"
    }
  };

  function setVisualMode(mode: TSSMode): void {
    const data = states[mode] || states.all;
    if (calloutTitle) calloutTitle.textContent = data.title;
    if (calloutDesc) calloutDesc.textContent = data.desc;
    if (calloutEnergy) calloutEnergy.textContent = data.energy;
    if (calloutFate) calloutFate.textContent = data.fate;

    const nonCancerPaths = container!.querySelectorAll<SVGElement>('.path-noncancer');
    const cancerPaths = container!.querySelectorAll<SVGElement>('.path-cancer');
    const futilePaths = container!.querySelectorAll<SVGElement>('.path-futile-heavy');
    const higherNodes = container!.querySelectorAll<SVGGElement>('.node-higher');
    const lowerNodes = container!.querySelectorAll<SVGGElement>('.node-lower');

    if (mode === 'noncancer') {
      nonCancerPaths.forEach(p => { p.style.opacity = '1'; });
      cancerPaths.forEach(p => { p.style.opacity = '0.12'; });
      futilePaths.forEach(p => { p.style.opacity = '0.08'; });
      higherNodes.forEach(n => { n.style.opacity = '1'; });
      lowerNodes.forEach(n => { n.style.opacity = '0.25'; });
    } else if (mode === 'cancer') {
      nonCancerPaths.forEach(p => { p.style.opacity = '0.12'; });
      cancerPaths.forEach(p => { p.style.opacity = '1'; });
      futilePaths.forEach(p => { p.style.opacity = '1'; });
      higherNodes.forEach(n => { n.style.opacity = '0.35'; });
      lowerNodes.forEach(n => { n.style.opacity = '1'; });
    } else if (mode === 'energy') {
      nonCancerPaths.forEach(p => { p.style.opacity = '0.55'; });
      cancerPaths.forEach(p => { p.style.opacity = '0.85'; });
      futilePaths.forEach(p => { p.style.opacity = '1'; });
      higherNodes.forEach(n => { n.style.opacity = '0.8'; });
      lowerNodes.forEach(n => { n.style.opacity = '1'; });
    } else {
      // 'all' default state
      nonCancerPaths.forEach(p => { p.style.opacity = '0.85'; });
      cancerPaths.forEach(p => { p.style.opacity = '0.85'; });
      futilePaths.forEach(p => { p.style.opacity = '0.9'; });
      higherNodes.forEach(n => { n.style.opacity = '1'; });
      lowerNodes.forEach(n => { n.style.opacity = '1'; });
    }
  }

  // Setup tab button listeners
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const mode = (btn.getAttribute('data-mode') || 'all') as TSSMode;
      tabButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      setVisualMode(mode);
    });
  });

  // Interactive hover & tap over TSS nodes in SVG
  const tssNodes = container.querySelectorAll<SVGGElement>('.tss-interactive-node');
  tssNodes.forEach(node => {
    node.addEventListener('mouseenter', () => {
      node.style.cursor = 'pointer';
      node.style.transform = 'scale(1.12)';
    });
    node.addEventListener('mouseleave', () => {
      node.style.transform = 'scale(1)';
    });
    node.addEventListener('click', () => {
      const site = node.getAttribute('data-tss');
      const targetMode: TSSMode = site === 'tss-1' ? 'cancer' : 'noncancer';
      const targetBtn = document.querySelector<HTMLButtonElement>(`.viz-tab-btn[data-mode="${targetMode}"]`);
      if (targetBtn) targetBtn.click();
    });
  });
}
