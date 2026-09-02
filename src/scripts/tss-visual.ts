/**
 * Transcription Start Site (TSS) & Genomic Trajectory Interactive Visualizer
 * HoMeCell Lab - IIT Gandhinagar
 * Visual Metaphor: One genomic locus -> Multiple alternative start sites -> Divergent transcriptional paths -> Resource costs
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
      title: "Genomic Locus & Alternative TSS Deployments",
      desc: "A single genomic region contains multiple alternative transcription start sites. Depending on cellular state (physiological vs. oncogenic), alternative initiation redirects RNA polymerase II down distinct metabolic pathways.",
      energy: "Variable",
      fate: "Equilibrium"
    },
    noncancer: {
      title: "Physiological / Non-Cancer Selection (Adaptive)",
      desc: "Regulated deployment from canonical start sites (TSS 1 / TSS 2) minimizes futile energy expenditure. Transcription matches cell metabolic budget and produces stable, adaptive gene products.",
      energy: "Optimised (Low)",
      fate: "Adaptive & Productive"
    },
    cancer: {
      title: "Oncogenic / Cancer Selection (Deregulated)",
      desc: "Start site deployment is deregulated, triggering unconstrained initiation from downstream/upstream alternative cryptic sites. Substantial cellular resources are consumed in futile, non-productive transcript synthesis.",
      energy: "Excessive (High)",
      fate: "Stochastic & Futile"
    },
    energy: {
      title: "Metabolic Cost & Energy Budget Exploitation",
      desc: "Comparative thermodynamic footprint: Cancer cells divert nucleotides and ATP towards futile transcription via deregulated start sites, exploiting cellular resource machinery.",
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

    const nonCancerPaths = container!.querySelectorAll<SVGPathElement>('.path-noncancer');
    const cancerPaths = container!.querySelectorAll<SVGPathElement>('.path-cancer');
    const higherNodes = container!.querySelectorAll<SVGGElement>('.node-higher');
    const lowerNodes = container!.querySelectorAll<SVGGElement>('.node-lower');

    if (mode === 'noncancer') {
      nonCancerPaths.forEach(p => { p.style.opacity = '1'; p.style.strokeWidth = '6'; });
      cancerPaths.forEach(p => { p.style.opacity = '0.12'; p.style.strokeWidth = '2'; });
      higherNodes.forEach(n => { n.style.opacity = '1'; });
      lowerNodes.forEach(n => { n.style.opacity = '0.3'; });
    } else if (mode === 'cancer') {
      nonCancerPaths.forEach(p => { p.style.opacity = '0.12'; p.style.strokeWidth = '2'; });
      cancerPaths.forEach(p => { p.style.opacity = '1'; p.style.strokeWidth = '7'; });
      higherNodes.forEach(n => { n.style.opacity = '0.4'; });
      lowerNodes.forEach(n => { n.style.opacity = '1'; });
    } else if (mode === 'energy') {
      nonCancerPaths.forEach(p => { p.style.opacity = '0.7'; p.style.strokeWidth = '4'; });
      cancerPaths.forEach(p => { p.style.opacity = '0.9'; p.style.strokeWidth = '8'; });
      higherNodes.forEach(n => { n.style.opacity = '1'; });
      lowerNodes.forEach(n => { n.style.opacity = '1'; });
    } else {
      // 'all' default state
      nonCancerPaths.forEach(p => { p.style.opacity = '0.75'; p.style.strokeWidth = '4.5'; });
      cancerPaths.forEach(p => { p.style.opacity = '0.75'; p.style.strokeWidth = '4.5'; });
      higherNodes.forEach(n => { n.style.opacity = '0.9'; });
      lowerNodes.forEach(n => { n.style.opacity = '0.9'; });
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
      node.style.transform = 'scale(1.15)';
    });
    node.addEventListener('mouseleave', () => {
      node.style.transform = 'scale(1)';
    });
    node.addEventListener('click', () => {
      const site = node.getAttribute('data-tss');
      const targetMode: TSSMode = site === 'tss-1' ? 'noncancer' : 'cancer';
      const targetBtn = document.querySelector<HTMLButtonElement>(`.viz-tab-btn[data-mode="${targetMode}"]`);
      if (targetBtn) targetBtn.click();
    });
  });
}
