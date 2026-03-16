import type { BrandIdentity, BrandStyle, MotionSystem } from '../../types.js';
import { generateMotionSystem } from './motion-system.js';

export interface MotionPrinciple {
  name: string;
  description: string;
  cssExample: string;
}

export interface BrandMotionOutput {
  motionSystem: MotionSystem;
  principles: MotionPrinciple[];
  animationScale: 'none' | 'minimal' | 'moderate' | 'expressive' | 'dramatic';
  preferredEasing: string;
  guidelines: {
    microInteractions: string;
    pageTransitions: string;
    loadingStates: string;
    feedback: string;
  };
  cssCustomProperties: string;
}

const STYLE_ANIMATION_SCALE: Record<BrandStyle, BrandMotionOutput['animationScale']> = {
  minimal: 'minimal',
  bold: 'expressive',
  elegant: 'moderate',
  playful: 'dramatic',
  corporate: 'minimal',
  tech: 'moderate',
  organic: 'moderate',
  retro: 'expressive',
};

const STYLE_PRINCIPLES: Record<BrandStyle, MotionPrinciple[]> = {
  minimal: [
    {
      name: 'Invisible Motion',
      description: 'Animations should never distract — only guide attention.',
      cssExample: 'transition: opacity 200ms ease-out;',
    },
    {
      name: 'Purposeful Timing',
      description: 'Every animation has a clear reason; none are decorative.',
      cssExample: 'transition: transform 200ms cubic-bezier(0,0,0.2,1);',
    },
  ],
  bold: [
    {
      name: 'Confident Entry',
      description: 'Elements arrive with authority — fast in, slow finish.',
      cssExample: 'animation: slideIn 200ms cubic-bezier(0,0,0.15,1) both;',
    },
    {
      name: 'Dramatic Emphasis',
      description: 'Key moments get over-scaled spring motion to land impact.',
      cssExample: 'animation: popIn 300ms cubic-bezier(0.22,1.8,0.36,1) both;',
    },
  ],
  elegant: [
    {
      name: 'Graceful Pace',
      description: 'Motion breathes — longer durations create a sense of luxury.',
      cssExample: 'transition: all 350ms cubic-bezier(0.42,0,0.58,1);',
    },
    {
      name: 'Soft Landing',
      description: 'Elements decelerate gently; never abrupt or mechanical.',
      cssExample: 'animation: fadeSlide 500ms cubic-bezier(0,0,0.58,1) both;',
    },
  ],
  playful: [
    {
      name: 'Bouncy Energy',
      description: 'Spring and bounce easings give the UI a lively, joyful feel.',
      cssExample: 'animation: bounce 400ms cubic-bezier(0.18,2.0,0.4,1) both;',
    },
    {
      name: 'Surprise Delight',
      description: 'Occasional unexpected motion rewards interaction.',
      cssExample: 'animation: wiggle 600ms cubic-bezier(0.18,1.8,0.4,1);',
    },
  ],
  corporate: [
    {
      name: 'Professional Precision',
      description: 'Motion is measured and predictable — builds trust.',
      cssExample: 'transition: all 200ms cubic-bezier(0.4,0,0.2,1);',
    },
    {
      name: 'Consistent Rhythm',
      description: 'All durations align to a fixed scale; no surprises.',
      cssExample: 'transition: opacity 120ms ease-out;',
    },
  ],
  tech: [
    {
      name: 'Instant Response',
      description: 'UI reacts within 80ms — performance is the feature.',
      cssExample: 'transition: transform 80ms cubic-bezier(0,0,0.1,1);',
    },
    {
      name: 'Precise Curves',
      description: 'Tight cubic-bezier values convey technical accuracy.',
      cssExample: 'animation: slideUp 150ms cubic-bezier(0.55,0,0.1,1) both;',
    },
  ],
  organic: [
    {
      name: 'Natural Flow',
      description: 'Animations mimic nature — no sharp edges or abrupt stops.',
      cssExample: 'transition: all 300ms cubic-bezier(0.35,0,0.3,1);',
    },
    {
      name: 'Breathing Rhythm',
      description: 'Subtle scale pulses and opacity shifts echo living systems.',
      cssExample: 'animation: breathe 2s cubic-bezier(0.28,1.4,0.5,1) infinite;',
    },
  ],
  retro: [
    {
      name: 'Deliberate Steps',
      description: 'Step-function or quick snaps reference classic interfaces.',
      cssExample: 'animation: typeIn 250ms steps(8) both;',
    },
    {
      name: 'Nostalgic Spring',
      description: 'Slightly exaggerated spring echoes analog mechanical feel.',
      cssExample: 'animation: springIn 350ms cubic-bezier(0.3,1.5,0.5,1) both;',
    },
  ],
};

const STYLE_GUIDELINES: Record<BrandStyle, BrandMotionOutput['guidelines']> = {
  minimal: {
    microInteractions: 'Subtle opacity or transform shifts only; 150–200ms.',
    pageTransitions: 'Crossfade at 200ms; avoid sliding panels.',
    loadingStates: 'Simple fade-in; no spinners unless critical.',
    feedback: 'Color shift on state change, 100ms.',
  },
  bold: {
    microInteractions: 'Scale up 1.05–1.1 on hover; spring easing.',
    pageTransitions: 'Bold slide-in from bottom, 200ms.',
    loadingStates: 'Animated progress bar with high-contrast color.',
    feedback: 'Ripple or scale pulse on click, 300ms.',
  },
  elegant: {
    microInteractions: 'Soft opacity + translateY(-4px), 350ms.',
    pageTransitions: 'Fade-through at 400ms; never slide.',
    loadingStates: 'Slow shimmer skeleton, linear 1.2s loop.',
    feedback: 'Gentle border glow, 500ms ease-in-out.',
  },
  playful: {
    microInteractions: 'Bounce scale 1.1→0.95→1.0; spring easing, 400ms.',
    pageTransitions: 'Slide + scale combo, 300ms spring.',
    loadingStates: 'Animated character or progress dots, bouncy timing.',
    feedback: 'Confetti or shake on success/error.',
  },
  corporate: {
    microInteractions: 'Opacity + translate 2px; 200ms linear.',
    pageTransitions: 'Instant swap or crossfade 150ms.',
    loadingStates: 'Indeterminate progress bar, standard timing.',
    feedback: 'Icon swap + color change, 120ms.',
  },
  tech: {
    microInteractions: 'Transform only; 80–150ms; cubic precision.',
    pageTransitions: 'Instant route swap; skeleton on data load.',
    loadingStates: 'Monochrome spinner, 600ms linear infinite.',
    feedback: 'Blink cursor or code-style highlight, 80ms.',
  },
  organic: {
    microInteractions: 'Gentle scale + opacity, 300ms, curved easing.',
    pageTransitions: 'Soft fade-through, 350ms, linear-like.',
    loadingStates: 'Wave or ripple animation, 1.5s loop.',
    feedback: 'Color bloom outward, 400ms.',
  },
  retro: {
    microInteractions: 'Step or snap animation, 150–250ms.',
    pageTransitions: 'Wipe or flicker effect, 200ms.',
    loadingStates: 'Blinking cursor or pixel-art spinner.',
    feedback: 'Flash inversion or border blink, 100ms.',
  },
};

function buildCssCustomProperties(motion: MotionSystem): string {
  const lines: string[] = [':root {'];
  for (const [name, value] of Object.entries(motion.durations)) {
    lines.push(`  --motion-duration-${name}: ${value};`);
  }
  for (const [name, value] of Object.entries(motion.easings)) {
    lines.push(`  --motion-easing-${name}: ${value};`);
  }
  for (const [name, value] of Object.entries(motion.transitions)) {
    lines.push(`  --motion-transition-${name}: ${value};`);
  }
  lines.push('}');
  return lines.join('\n');
}

const VALID_STYLES = new Set<BrandStyle>([
  'minimal',
  'bold',
  'elegant',
  'playful',
  'corporate',
  'tech',
  'organic',
  'retro',
]);

export function generateBrandMotion(brand: BrandIdentity): BrandMotionOutput {
  const rawStyle = brand.style ?? 'minimal';
  const style: BrandStyle = VALID_STYLES.has(rawStyle) ? rawStyle : 'minimal';
  const motionSystem = generateMotionSystem(style);
  const principles = STYLE_PRINCIPLES[style] ?? STYLE_PRINCIPLES.minimal;
  const animationScale = STYLE_ANIMATION_SCALE[style] ?? 'minimal';
  const guidelines = STYLE_GUIDELINES[style] ?? STYLE_GUIDELINES.minimal;
  const preferredEasing = motionSystem.easings['ease-out'];
  const cssCustomProperties = buildCssCustomProperties(motionSystem);

  return {
    motionSystem,
    principles,
    animationScale,
    preferredEasing,
    guidelines,
    cssCustomProperties,
  };
}
