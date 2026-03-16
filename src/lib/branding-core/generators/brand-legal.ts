import type { BrandIdentity, BrandStyle, BrandLegalOutput } from '../../types.js';

const STYLE_TRADEMARK_TONE: Record<BrandStyle, string> = {
  minimal:
    'Clean and unobtrusive — trademark notices are present but minimal, preserving white space.',
  bold: 'Confident assertion of rights — prominent trademark symbols reinforce brand authority.',
  elegant:
    'Refined and tasteful — trademark notices are positioned with care, never disrupting aesthetics.',
  playful:
    'Light-touch legal — trademark symbols integrated naturally without dampening the fun personality.',
  corporate:
    'Strict compliance — full trademark notices on all materials, protecting IP assets rigorously.',
  tech: 'Developer-friendly — clear API/SDK licensing terms alongside standard trademark notices.',
  organic: 'Authentic and transparent — trademark usage supports trust without feeling corporate.',
  retro:
    'Heritage protection — trademarks emphasise the long-standing legacy and authenticity of the brand.',
};

const STYLE_COPYRIGHT_NOTICE: Record<BrandStyle, string> = {
  minimal: '© {year} {name}. All rights reserved.',
  bold: '© {year} {name}® All Rights Reserved.',
  elegant: '© {year} {name}. All rights reserved. Unauthorised reproduction is prohibited.',
  playful: '© {year} {name} — made with ♥. All rights reserved.',
  corporate: 'Copyright © {year} {name}, Inc. All rights reserved. Confidential and proprietary.',
  tech: '© {year} {name}. Licensed under MIT unless otherwise noted.',
  organic: '© {year} {name}. All rights reserved. Crafted with care.',
  retro: '© {year} {name}. Est. {year}. All rights reserved.',
};

const STYLE_BRAND_USAGE_RULES: Record<BrandStyle, string[]> = {
  minimal: [
    'Do not alter colours, proportions, or spacing of the logo.',
    'Maintain clear space equal to the height of the logo mark on all sides.',
    'Do not use the logo on backgrounds that reduce contrast.',
    'Do not combine the logo with other logos without written permission.',
    'Only approved logo files may be used in external communications.',
  ],
  bold: [
    'The brand mark must always appear at full vibrancy — never muted or greyscale unless on print.',
    'Minimum logo size: 32px digital / 10mm print.',
    'Do not recolour, rotate, or stretch the logo.',
    'The logo must dominate co-branded materials.',
    'Unauthorised merchandise is strictly prohibited.',
  ],
  elegant: [
    'Use only approved colourways: primary black, white, and the signature accent.',
    'Maintain generous clear space — never crowd the logo.',
    'The wordmark must never be typeset in an alternative typeface.',
    'Embossed or debossed applications require written approval.',
    'No digital filters, drop shadows, or glow effects on the logo.',
  ],
  playful: [
    'You may use approved colour variants of the logo to match context.',
    'Do not distort or animate the logo outside approved motion guidelines.',
    'Maintain minimum clear space of one logo-height on all sides.',
    'Fan art and community use are welcome under our community guidelines.',
    'Commercial use by third parties requires a licence agreement.',
  ],
  corporate: [
    'All logo use must comply with the Brand Identity Standards manual.',
    'External use requires prior written approval from the Legal department.',
    'Do not use the logo in a way that implies endorsement without authorisation.',
    'Maintain ISO-compliant clear space and minimum size specifications.',
    'Logos must not be placed on photographs without approved overlay guidelines.',
  ],
  tech: [
    'Open-source projects may use the logo under the Brand Licence v1.0.',
    'Do not use the logo in projects that compete directly with our products.',
    'API/SDK integrations must display "Powered by {name}" per the integration guide.',
    'Modified versions of the logo are not permitted.',
    'Attribution is required in all derivative works using brand assets.',
  ],
  organic: [
    'The logo must always appear on natural or neutral backgrounds.',
    'Do not place the logo on synthetic-looking or overly digital backgrounds.',
    'Maintain clear space equal to the leaf/icon height on all sides.',
    'The logo must never appear alongside misleading sustainability claims.',
    'Third-party use must align with our ethical sourcing and values policies.',
  ],
  retro: [
    'Approved vintage colourways must be used — no modern colour substitutions.',
    'The retro logo lockup must not be separated into individual elements.',
    'Minimum reproduction size: 40px digital / 15mm print to preserve detail.',
    'Digital files must use approved halftone or textured treatments only.',
    'No flat/clean digital renders of the retro logo without explicit approval.',
  ],
};

const STYLE_TONE_OF_VOICE_LEGAL: Record<BrandStyle, string> = {
  minimal:
    'Clear, plain-English legal copy that respects the reader. Avoid legalese where possible.',
  bold: 'Confident and direct legal copy. State rights and obligations without ambiguity.',
  elegant:
    'Polished, formal, and precise. Legal copy should reflect the premium positioning of the brand.',
  playful:
    'Friendly legal copy where permissible. Use plain language and a warm tone in disclaimers.',
  corporate:
    'Formal, comprehensive, and unambiguous. Full legal citations and jurisdiction clauses.',
  tech: 'Developer-friendly legal language. Licences use SPDX identifiers; terms are concise and scannable.',
  organic:
    'Transparent and values-led. Legal copy emphasises authenticity, fairness, and environmental commitments.',
  retro: 'Classic, dignified, and heritage-aware. Legal copy references the brand legacy.',
};

function buildTrademarkGuidelines(brand: BrandIdentity): string[] {
  const style = (brand.style ?? 'minimal') as BrandStyle;
  const base = [
    `The name "${brand.name}" is a registered trademark. Always use the ® symbol after the first prominent mention.`,
    'Use ™ on new or unregistered marks until registration is confirmed.',
    'Do not use the brand name as a generic term or verb.',
    'Trademark symbols are required in all advertising, packaging, and digital properties.',
    'International trademark registrations may vary — consult the legal register for each territory.',
  ];
  if (style === 'tech') {
    base.push('Software and API names should include ™ notation in documentation headers.');
    base.push('Open-source forks must remove all brand trademarks from the distribution.');
  }
  if (style === 'corporate') {
    base.push('Maintain a trademark watch service and document all infringement instances.');
    base.push('Annual trademark audits are mandatory across all brand touch-points.');
  }
  return base;
}

function buildCopyrightNotices(brand: BrandIdentity): string[] {
  const year = new Date().getFullYear();
  const style = (brand.style ?? 'minimal') as BrandStyle;
  const template = (STYLE_COPYRIGHT_NOTICE[style] ?? STYLE_COPYRIGHT_NOTICE.minimal)
    .replace(/{name}/g, brand.name)
    .replace(/{year}/g, String(year));
  return [
    template,
    `All original content, designs, and materials are copyright © ${year} ${brand.name}.`,
    'Reproduction, distribution, or modification without prior written consent is prohibited.',
    'Photographs, illustrations, and videos may carry separate third-party copyright.',
    'Copyright notices must appear in the footer of all digital and print materials.',
  ];
}

function buildPrivacyCompliance(brand: BrandIdentity): string[] {
  const style = (brand.style ?? 'minimal') as BrandStyle;
  const base = [
    'A Privacy Policy must be accessible from every page of the website.',
    'Cookie consent must be obtained before non-essential cookies are set.',
    'GDPR and CCPA compliance is mandatory for all user data collection.',
    'Data retention policies must be documented and communicated to users.',
    'Third-party data sharing must be disclosed in the Privacy Policy.',
  ];
  if (style === 'tech') {
    base.push('API usage logs must comply with the data minimisation principle under GDPR Art. 5.');
    base.push('Security vulnerability disclosures must follow responsible disclosure policy.');
  }
  if (style === 'corporate') {
    base.push(
      'A Data Protection Officer (DPO) must be appointed and listed in the Privacy Policy.'
    );
    base.push('Privacy Impact Assessments (PIAs) are required for new data processing activities.');
  }
  if (style === 'organic') {
    base.push(
      'Environmental claims must comply with the FTC Green Guides and equivalent local regulations.'
    );
    base.push('Organic/sustainable certifications must be current and verifiable.');
  }
  return base;
}

function buildDisclaimers(brand: BrandIdentity): string[] {
  const style = (brand.style ?? 'minimal') as BrandStyle;
  const disclaimers = [
    `${brand.name} makes no warranties, express or implied, regarding the accuracy of information provided.`,
    'Product images are for illustrative purposes and may differ from the actual product.',
    'Prices are subject to change without notice.',
    'Past performance does not guarantee future results.',
    `${brand.name} is not responsible for third-party content linked from our platforms.`,
  ];
  if (style === 'tech') {
    disclaimers.push(
      'Software is provided "as is" without warranty of any kind under the applicable licence.'
    );
    disclaimers.push(
      'API availability is subject to service terms; uptime SLAs apply only to paid plans.'
    );
  }
  if (style === 'corporate') {
    disclaimers.push(
      'Forward-looking statements involve risk and uncertainty. Actual results may differ materially.'
    );
    disclaimers.push(
      'This communication does not constitute legal, financial, or regulatory advice.'
    );
  }
  if (style === 'organic') {
    disclaimers.push(
      'Environmental impact claims are based on third-party audits and are subject to annual review.'
    );
  }
  return disclaimers;
}

function buildLicensingTerms(brand: BrandIdentity): Record<string, string> {
  const style = (brand.style ?? 'minimal') as BrandStyle;
  const base: Record<string, string> = {
    brand_assets:
      'Brand assets (logo, colours, typography) are proprietary and may not be reproduced without written approval.',
    photography:
      'All photography is licenced for use by {name} only unless otherwise credited.'.replace(
        '{name}',
        brand.name
      ),
    music_audio:
      'Audio and music assets require separate licencing per platform (web, broadcast, events).',
    third_party_software:
      'Third-party software used by {name} is subject to its own licence terms.'.replace(
        '{name}',
        brand.name
      ),
    user_generated_content:
      'By submitting content, users grant {name} a non-exclusive, royalty-free licence to use, reproduce, and distribute that content.'.replace(
        '{name}',
        brand.name
      ),
  };
  if (style === 'tech') {
    base.open_source =
      'Core libraries are released under MIT. Commercial add-ons require a commercial licence.';
    base.sdk =
      'The {name} SDK is licensed under Apache 2.0. See LICENSE file in the repository.'.replace(
        '{name}',
        brand.name
      );
  }
  return base;
}

function buildAccessibilityCompliance(): string[] {
  return [
    'All digital platforms must meet WCAG 2.1 Level AA as a minimum standard.',
    'Accessibility statements must be published and updated annually.',
    'New digital products must undergo accessibility audits prior to launch.',
    'Remediation timelines for identified accessibility barriers must be documented.',
    'User feedback channels for accessibility issues must be clearly signposted.',
    'Third-party integrations must not introduce accessibility regressions.',
  ];
}

function buildLegalBriefSummary(brand: BrandIdentity): string {
  const style = (brand.style ?? 'minimal') as BrandStyle;
  const tone = STYLE_TRADEMARK_TONE[style] ?? STYLE_TRADEMARK_TONE.minimal;
  const taglinePart = brand.tagline ? ` — "${brand.tagline}"` : '';
  return (
    `Legal framework for ${brand.name}${taglinePart} (${brand.industry}, ${style} style). ` +
    tone +
    ` Brand assets are protected by trademark and copyright. ` +
    `All materials must carry appropriate copyright notices and comply with GDPR, CCPA, and WCAG 2.1 AA standards.`
  );
}

export function generateBrandLegal(brand: BrandIdentity): BrandLegalOutput {
  const style = (brand.style ?? 'minimal') as BrandStyle;

  return {
    trademarkTone: STYLE_TRADEMARK_TONE[style] ?? STYLE_TRADEMARK_TONE.minimal,
    trademarkGuidelines: buildTrademarkGuidelines(brand),
    brandUsageRules: STYLE_BRAND_USAGE_RULES[style] ?? STYLE_BRAND_USAGE_RULES.minimal,
    copyrightNotices: buildCopyrightNotices(brand),
    toneOfVoiceLegal: STYLE_TONE_OF_VOICE_LEGAL[style] ?? STYLE_TONE_OF_VOICE_LEGAL.minimal,
    privacyCompliance: buildPrivacyCompliance(brand),
    disclaimers: buildDisclaimers(brand),
    licensingTerms: buildLicensingTerms(brand),
    accessibilityCompliance: buildAccessibilityCompliance(),
    legalBriefSummary: buildLegalBriefSummary(brand),
  };
}
