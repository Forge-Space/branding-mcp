import type { BrandHealthcareOutput, BrandIdentity, BrandStyle } from '../../types.js';

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

const STYLE_POSITIONING: Record<BrandStyle, string> = {
  minimal: 'Clear, calm healthcare experiences focused on patient confidence and low friction.',
  bold: 'High-impact healthcare brand accelerating access, outcomes, and modern care delivery.',
  elegant: 'Premium care experience combining medical rigor with concierge-level patient service.',
  playful: 'Warm, approachable care brand that reduces anxiety through supportive guidance.',
  corporate: 'Enterprise-grade healthcare platform trusted by hospitals, insurers, and regulators.',
  tech: 'Data-informed healthcare infrastructure built for clinicians, operators, and digital teams.',
  organic: 'Human-centered healthcare rooted in prevention, wellbeing, and long-term trust.',
  retro: 'Community-first care model inspired by timeless bedside values and continuity of care.',
};

const STYLE_CARE_SEGMENTS: Record<BrandStyle, string[]> = {
  minimal: ['Primary care', 'Preventive screenings', 'Chronic care follow-up'],
  bold: ['Urgent virtual consults', 'Rapid specialty referrals', 'Outcome-based programs'],
  elegant: ['Executive health', 'Specialist concierge', 'Personalized prevention plans'],
  playful: ['Family care', 'Adolescent health coaching', 'Lifestyle medicine support'],
  corporate: ['Health systems', 'Employer health programs', 'Payer-provider partnerships'],
  tech: ['Digital triage', 'Remote patient monitoring', 'Care operations analytics'],
  organic: ['Whole-person wellness', 'Behavioral health support', 'Community prevention clinics'],
  retro: ['Neighborhood clinics', 'Longitudinal family medicine', 'In-person continuity plans'],
};

const STYLE_TRUST_SIGNALS: Record<BrandStyle, string[]> = {
  minimal: ['HIPAA-aligned workflows', 'Transparent consent language', 'Published care standards'],
  bold: [
    '24/7 clinical escalation pathways',
    'Documented outcome improvements',
    'Rapid callback SLAs',
  ],
  elegant: [
    'Board-certified specialist network',
    'Private care coordination',
    'Dedicated care navigator',
  ],
  playful: ['Friendly patient education', 'Simple care plans', 'High patient satisfaction scores'],
  corporate: ['SOC 2 Type II controls', 'Enterprise BAA readiness', 'Formal quality governance'],
  tech: ['Audit-ready event logging', 'Role-based access controls', 'Clinical safety guardrails'],
  organic: [
    'Evidence-based care pathways',
    'Community advisory board',
    'Inclusive care principles',
  ],
  retro: [
    'Long-term clinician relationships',
    'Continuity handoff protocols',
    'Local trust reputation',
  ],
};

const STYLE_REGULATORY_FRAMEWORK: Record<BrandStyle, string[]> = {
  minimal: ['HIPAA', 'GDPR (where applicable)', 'Informed consent', 'Data retention policy'],
  bold: [
    'HIPAA',
    'Telehealth state licensure checks',
    'Clinical documentation policy',
    'Incident response',
  ],
  elegant: ['HIPAA', 'ISO 27001 controls', 'Clinical governance board', 'Third-party risk reviews'],
  playful: [
    'HIPAA',
    'Age-appropriate consent processes',
    'Accessibility policy',
    'Safety incident playbook',
  ],
  corporate: ['HIPAA', 'HITRUST-aligned controls', 'SOC 2 Type II', 'Vendor BAA program'],
  tech: ['HIPAA', 'Secure SDLC controls', 'PHI data minimization', 'Audit trail retention'],
  organic: [
    'HIPAA',
    'Privacy-by-design reviews',
    'Community health reporting standards',
    'Ethical data use',
  ],
  retro: [
    'HIPAA',
    'Legacy records governance',
    'Care continuity documentation',
    'Escalation protocols',
  ],
};

const STYLE_SERVICE_MODEL: Record<BrandStyle, string[]> = {
  minimal: ['Self-scheduling', 'Asynchronous follow-up', 'Clear referral handoff'],
  bold: ['Omnichannel triage', 'Rapid specialist routing', 'Outcome review cadences'],
  elegant: ['Dedicated care coordinator', 'White-glove scheduling', 'Proactive follow-up outreach'],
  playful: ['Guided check-ins', 'Family-oriented care touchpoints', 'Simple plan reminders'],
  corporate: [
    'Integrated care operations',
    'Multi-site governance workflows',
    'Standardized care pathways',
  ],
  tech: [
    'API-connected care orchestration',
    'Device and data integrations',
    'Automated risk flagging',
  ],
  organic: [
    'Prevention-first programs',
    'Community partner referrals',
    'Longitudinal wellbeing plans',
  ],
  retro: ['Clinic-first care plans', 'Local specialist networks', 'Phone-first follow-up options'],
};

function buildPatientSafetyProtocols(safeStyle: BrandStyle): string[] {
  const base = [
    'Clinical escalation matrix for red-flag symptoms',
    'Medication and allergy verification checkpoints',
    'Closed-loop follow-up for unresolved cases',
    'Patient identity verification before care actions',
  ];
  if (safeStyle === 'tech' || safeStyle === 'corporate') {
    base.push('Automated high-risk alert routing to on-call clinicians');
  }
  if (safeStyle === 'elegant' || safeStyle === 'organic') {
    base.push('Proactive care coordination review for complex patients');
  }
  return base;
}

function buildCommunicationPillars(safeStyle: BrandStyle): string[] {
  return [...buildPatientSafetyProtocols(safeStyle), ...STYLE_SERVICE_MODEL[safeStyle]];
}

function buildAccessibilityCommitments(safeStyle: BrandStyle): string[] {
  const base = [
    'Plain-language care communication',
    'WCAG-aligned digital experiences',
    'Language support for key patient populations',
  ];
  if (safeStyle === 'playful' || safeStyle === 'organic') {
    base.push('Care education materials tailored to health literacy levels');
  }
  if (safeStyle === 'corporate' || safeStyle === 'tech') {
    base.push('Accessible-by-default product review in release process');
  }
  return base;
}

function buildPatientJourney(safeStyle: BrandStyle): string[] {
  const base = [
    'Awareness and trusted referral',
    'Eligibility and intake capture',
    'Clinical assessment and care planning',
    'Treatment or intervention delivery',
    'Follow-up and adherence support',
    'Outcome review and continuity planning',
  ];
  if (safeStyle === 'tech') {
    base.splice(2, 0, 'Digital triage with risk stratification');
  }
  if (safeStyle === 'elegant') {
    base.splice(4, 0, 'Concierge coordinator check-in');
  }
  return base;
}

function buildHealthcareBriefSummary(brand: BrandIdentity, safeStyle: BrandStyle): string {
  const taglinePart = brand.tagline ? ` - "${brand.tagline}"` : '';
  const segment = STYLE_CARE_SEGMENTS[safeStyle][0];
  const trust = STYLE_TRUST_SIGNALS[safeStyle][0];
  return (
    `${brand.name}${taglinePart} is a ${safeStyle}-style healthcare brand in ${brand.industry}. ` +
    `Positioning: ${STYLE_POSITIONING[safeStyle]} Primary care segment: ${segment}. ` +
    `Core trust signal: ${trust}.`
  );
}

export function generateBrandHealthcare(brand: BrandIdentity): BrandHealthcareOutput {
  const safeStyle: BrandStyle = VALID_STYLES.has(brand.style) ? brand.style : 'minimal';

  return {
    positioning: STYLE_POSITIONING[safeStyle],
    careSpecialties: STYLE_CARE_SEGMENTS[safeStyle],
    trustSignals: STYLE_TRUST_SIGNALS[safeStyle],
    regulatoryFramework: STYLE_REGULATORY_FRAMEWORK[safeStyle],
    communicationPillars: buildCommunicationPillars(safeStyle),
    accessibilityRequirements: buildAccessibilityCommitments(safeStyle),
    patientJourney: buildPatientJourney(safeStyle),
    healthcareBriefSummary: buildHealthcareBriefSummary(brand, safeStyle),
  };
}
