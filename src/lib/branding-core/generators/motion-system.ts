import type { BrandStyle, DurationName, EasingName, MotionSystem } from '../../types.js';

const STYLE_DURATIONS: Record<BrandStyle, Record<DurationName, number>> = {
  minimal: { instant: 0, fast: 100, normal: 200, slow: 300, slower: 400 },
  bold: { instant: 0, fast: 100, normal: 200, slow: 300, slower: 450 },
  elegant: { instant: 0, fast: 200, normal: 350, slow: 500, slower: 700 },
  playful: { instant: 0, fast: 150, normal: 250, slow: 400, slower: 600 },
  corporate: { instant: 0, fast: 120, normal: 200, slow: 300, slower: 400 },
  tech: { instant: 0, fast: 80, normal: 150, slow: 250, slower: 350 },
  organic: { instant: 0, fast: 180, normal: 300, slow: 450, slower: 650 },
  retro: { instant: 0, fast: 150, normal: 250, slow: 350, slower: 500 },
};

const STYLE_EASINGS: Record<BrandStyle, Record<EasingName, string>> = {
  minimal: {
    'ease-in': 'cubic-bezier(0.4, 0, 1, 1)',
    'ease-out': 'cubic-bezier(0, 0, 0.2, 1)',
    'ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
    spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    bounce: 'cubic-bezier(0.34, 1.2, 0.64, 1)',
  },
  bold: {
    'ease-in': 'cubic-bezier(0.5, 0, 1, 1)',
    'ease-out': 'cubic-bezier(0, 0, 0.15, 1)',
    'ease-in-out': 'cubic-bezier(0.5, 0, 0.15, 1)',
    spring: 'cubic-bezier(0.22, 1.8, 0.36, 1)',
    bounce: 'cubic-bezier(0.22, 1.5, 0.36, 1)',
  },
  elegant: {
    'ease-in': 'cubic-bezier(0.42, 0, 1, 1)',
    'ease-out': 'cubic-bezier(0, 0, 0.58, 1)',
    'ease-in-out': 'cubic-bezier(0.42, 0, 0.58, 1)',
    spring: 'cubic-bezier(0.25, 1.2, 0.5, 1)',
    bounce: 'cubic-bezier(0.25, 1.1, 0.5, 1)',
  },
  playful: {
    'ease-in': 'cubic-bezier(0.4, 0, 1, 1)',
    'ease-out': 'cubic-bezier(0, 0, 0.2, 1)',
    'ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
    spring: 'cubic-bezier(0.18, 2.0, 0.4, 1)',
    bounce: 'cubic-bezier(0.18, 1.8, 0.4, 1)',
  },
  corporate: {
    'ease-in': 'cubic-bezier(0.4, 0, 1, 1)',
    'ease-out': 'cubic-bezier(0, 0, 0.2, 1)',
    'ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
    spring: 'cubic-bezier(0.3, 1.3, 0.6, 1)',
    bounce: 'cubic-bezier(0.3, 1.15, 0.6, 1)',
  },
  tech: {
    'ease-in': 'cubic-bezier(0.55, 0, 1, 1)',
    'ease-out': 'cubic-bezier(0, 0, 0.1, 1)',
    'ease-in-out': 'cubic-bezier(0.55, 0, 0.1, 1)',
    spring: 'cubic-bezier(0.2, 1.6, 0.4, 1)',
    bounce: 'cubic-bezier(0.2, 1.4, 0.4, 1)',
  },
  organic: {
    'ease-in': 'cubic-bezier(0.35, 0, 0.9, 1)',
    'ease-out': 'cubic-bezier(0.1, 0, 0.3, 1)',
    'ease-in-out': 'cubic-bezier(0.35, 0, 0.3, 1)',
    spring: 'cubic-bezier(0.28, 1.4, 0.5, 1)',
    bounce: 'cubic-bezier(0.28, 1.25, 0.5, 1)',
  },
  retro: {
    'ease-in': 'cubic-bezier(0.5, 0, 1, 1)',
    'ease-out': 'cubic-bezier(0, 0, 0.3, 1)',
    'ease-in-out': 'cubic-bezier(0.5, 0, 0.3, 1)',
    spring: 'cubic-bezier(0.3, 1.5, 0.5, 1)',
    bounce: 'cubic-bezier(0.3, 1.3, 0.5, 1)',
  },
};

function buildTransitions(
  durations: Record<DurationName, number>,
  defaultEasing: string
): Record<string, string> {
  return {
    fade: `opacity ${durations.normal}ms ${defaultEasing}`,
    slide: `transform ${durations.normal}ms ${defaultEasing}`,
    scale: `transform ${durations.fast}ms ${defaultEasing}`,
    color: `color ${durations.slow}ms ${defaultEasing}, background-color ${durations.slow}ms ${defaultEasing}`,
    all: `all ${durations.normal}ms ${defaultEasing}`,
  };
}

export function generateMotionSystem(style: BrandStyle = 'minimal'): MotionSystem {
  const durationValues = STYLE_DURATIONS[style];
  const easingValues = STYLE_EASINGS[style];
  const durations = {} as Record<DurationName, string>;
  for (const [name, ms] of Object.entries(durationValues)) {
    durations[name as DurationName] = `${ms}ms`;
  }
  return {
    durations,
    easings: easingValues,
    transitions: buildTransitions(durationValues, easingValues['ease-out']),
  };
}
