import type {
  BrandIdentity,
  BrandStyle,
  BrandAnalyticsOutput,
  AnalyticsDashboard,
} from '../../types.js';

const STYLE_ANALYTICS_APPROACH: Record<BrandStyle, string> = {
  minimal:
    'Lean metrics-first — track only the KPIs that directly tie to business outcomes. Avoid vanity metrics.',
  bold: 'Growth-oriented dashboards with bold targets. Celebrate wins publicly and iterate fast on underperformers.',
  elegant:
    'Curated intelligence reports — quality over quantity. Focus on brand sentiment, NPS, and LTV trends.',
  playful:
    'Visual, story-driven analytics. Use charts and infographics to make data fun and accessible to the whole team.',
  corporate:
    'Structured reporting cycles with board-ready decks. Align all KPIs to strategic OKRs and quarterly reviews.',
  tech: 'Real-time instrumented dashboards. Implement event-level tracking, A/B testing, and funnel analysis.',
  organic:
    'Impact-led measurement — balance commercial KPIs with ESG, community health, and mission alignment metrics.',
  retro:
    'Narrative-rich retrospectives. Combine quantitative trends with qualitative stories and customer case studies.',
};

const STYLE_PRIMARY_KPIS: Record<BrandStyle, string[]> = {
  minimal: [
    'Revenue growth rate',
    'Customer acquisition cost (CAC)',
    'Net Promoter Score (NPS)',
    'Churn rate',
    'Monthly recurring revenue (MRR)',
  ],
  bold: [
    'Brand awareness lift',
    'Share of voice',
    'Social reach & impressions',
    'Viral coefficient',
    'Revenue per campaign',
  ],
  elegant: [
    'Brand equity index',
    'Customer lifetime value (LTV)',
    'Net Promoter Score (NPS)',
    'Repeat purchase rate',
    'Average order value (AOV)',
  ],
  playful: [
    'Engagement rate',
    'User-generated content volume',
    'Community growth rate',
    'Social shares',
    'App/platform DAU',
  ],
  corporate: [
    'EBITDA margin',
    'Market share %',
    'Employee Net Promoter Score (eNPS)',
    'Brand compliance score',
    'Qualified lead pipeline value',
  ],
  tech: [
    'Daily/Monthly active users (DAU/MAU)',
    'Feature adoption rate',
    'Time to value (TTV)',
    'API call volume',
    'System uptime SLA',
  ],
  organic: [
    'Community engagement rate',
    'ESG score improvement',
    'Brand advocacy ratio',
    'Sustainable revenue %',
    'Carbon footprint per unit',
  ],
  retro: [
    'Customer retention rate',
    'Word-of-mouth referral rate',
    'Brand sentiment score',
    'Lifetime repeat purchases',
    'Community size growth',
  ],
};

const STYLE_REPORTING_CADENCE: Record<BrandStyle, string> = {
  minimal: 'Weekly automated summary + monthly deep-dive',
  bold: 'Daily real-time dashboard + weekly growth review',
  elegant: 'Monthly curated report + quarterly brand equity review',
  playful: 'Weekly community pulse + monthly engagement digest',
  corporate: 'Weekly exec dashboard + monthly board pack + quarterly strategic review',
  tech: 'Real-time monitoring + daily anomaly alerts + weekly sprint review',
  organic: 'Monthly impact report + quarterly ESG scorecard',
  retro: 'Monthly narrative digest + annual brand retrospective',
};

const STYLE_TOOLS: Record<BrandStyle, string[]> = {
  minimal: ['Google Analytics 4', 'Hotjar', 'Metabase'],
  bold: ['Amplitude', 'Sprout Social', 'SEMrush'],
  elegant: ['Looker', 'Brandwatch', 'SurveyMonkey'],
  playful: ['Mixpanel', 'Hootsuite Insights', 'Typeform'],
  corporate: ['Tableau', 'Salesforce Reports', 'Power BI'],
  tech: ['DataDog', 'Amplitude', 'Segment', 'PostHog'],
  organic: ['Google Analytics 4', 'Sprout Social', 'Custom ESG dashboard'],
  retro: ['Google Analytics 4', 'Airtable', 'Simple Metrics'],
};

const STYLE_ATTRIBUTION_MODEL: Record<BrandStyle, string> = {
  minimal: 'Last-touch attribution with a lightweight multi-touch overlay',
  bold: 'Data-driven multi-touch attribution across all paid channels',
  elegant: 'Customer-journey attribution weighted towards brand touchpoints',
  playful: 'Social-first attribution with community contribution weighting',
  corporate: 'Marketing Mix Modelling (MMM) aligned to quarterly OKRs',
  tech: 'Algorithmic multi-touch attribution with A/B test holdout groups',
  organic: 'Word-of-mouth and community attribution with UTM tracking',
  retro: 'First-touch + referral attribution with loyalty weighting',
};

function buildDashboards(brand: BrandIdentity): AnalyticsDashboard[] {
  const style = brand.style ?? 'minimal';
  const dashboards: AnalyticsDashboard[] = [
    {
      name: 'Executive Overview',
      audience: 'C-suite & Board',
      updateFrequency: 'Weekly',
      metrics: ['Revenue', 'MRR/ARR', 'NPS', 'CAC', 'LTV', 'Churn'],
      visualisationType: 'KPI cards + trend lines',
    },
    {
      name: 'Brand Health Monitor',
      audience: 'Marketing & Brand Team',
      updateFrequency: 'Daily',
      metrics: ['Share of voice', 'Sentiment score', 'Brand mentions', 'Reach', 'Engagement rate'],
      visualisationType: 'Time-series charts + sentiment gauge',
    },
    {
      name: 'Campaign Performance',
      audience: 'Growth & Performance Team',
      updateFrequency: 'Real-time',
      metrics: ['Impressions', 'CTR', 'Conversion rate', 'CPC', 'ROAS', 'Pipeline attributed'],
      visualisationType: 'Funnel charts + channel comparison',
    },
    {
      name: 'Customer Intelligence',
      audience: 'Product & CX Team',
      updateFrequency: 'Weekly',
      metrics: [
        'Retention cohorts',
        'Repeat purchase rate',
        'Support ticket volume',
        'CSAT',
        'Feature adoption',
      ],
      visualisationType: 'Cohort tables + heatmaps',
    },
  ];

  if (style === 'tech') {
    dashboards.push({
      name: 'Product & Engineering Metrics',
      audience: 'Engineering & Product',
      updateFrequency: 'Real-time',
      metrics: [
        'DAU/MAU',
        'API latency P95',
        'Error rate',
        'Deploy frequency',
        'Feature flag adoption',
      ],
      visualisationType: 'Live gauges + anomaly detection',
    });
  }

  if (style === 'organic') {
    dashboards.push({
      name: 'Impact & ESG Scorecard',
      audience: 'Leadership & Stakeholders',
      updateFrequency: 'Monthly',
      metrics: [
        'Carbon emissions',
        'Community health score',
        'Sustainable revenue %',
        'SDG alignment score',
      ],
      visualisationType: 'Progress bars + trend comparisons',
    });
  }

  return dashboards;
}

function buildMeasurementFramework(brand: BrandIdentity): string[] {
  const style = brand.style ?? 'minimal';
  const base = [
    'Define a single source of truth data warehouse (BigQuery, Snowflake, or Redshift)',
    'Implement consistent UTM tagging across all owned and paid channels',
    'Set up event-level tracking in GA4 with enhanced measurement',
    'Establish baseline benchmarks before any campaign launch',
    'Create a data dictionary so all teams share metric definitions',
    'Schedule regular data quality audits to catch tracking gaps',
  ];

  if (style === 'tech') {
    base.push(
      'Instrument product events with Segment or PostHog for full user-journey visibility',
      'Implement feature flags tied to analytics for controlled rollouts'
    );
  }
  if (style === 'corporate') {
    base.push(
      'Align KPI definitions with finance and strategy teams quarterly',
      'Maintain a marketing attribution charter reviewed by the board annually'
    );
  }
  if (style === 'organic') {
    base.push('Track ESG metrics alongside commercial KPIs in an integrated impact report');
  }

  return base;
}

function buildAnalyticsBriefSummary(brand: BrandIdentity): string {
  const style = brand.style ?? 'minimal';
  const taglinePart = brand.tagline ? ` — "${brand.tagline}"` : '';
  const approach = STYLE_ANALYTICS_APPROACH[style] ?? STYLE_ANALYTICS_APPROACH.minimal;
  return `Analytics strategy for ${brand.name}${taglinePart}. Approach: ${approach.split('.')[0]}. Primary KPI focus: ${(STYLE_PRIMARY_KPIS[style] ?? STYLE_PRIMARY_KPIS.minimal).slice(0, 3).join(', ')}. Reporting cadence: ${STYLE_REPORTING_CADENCE[style] ?? STYLE_REPORTING_CADENCE.minimal}.`;
}

export function generateBrandAnalytics(brand: BrandIdentity): BrandAnalyticsOutput {
  const style = brand.style ?? 'minimal';

  return {
    analyticsApproach: STYLE_ANALYTICS_APPROACH[style] ?? STYLE_ANALYTICS_APPROACH.minimal,
    primaryKpis: STYLE_PRIMARY_KPIS[style] ?? STYLE_PRIMARY_KPIS.minimal,
    reportingCadence: STYLE_REPORTING_CADENCE[style] ?? STYLE_REPORTING_CADENCE.minimal,
    recommendedTools: STYLE_TOOLS[style] ?? STYLE_TOOLS.minimal,
    attributionModel: STYLE_ATTRIBUTION_MODEL[style] ?? STYLE_ATTRIBUTION_MODEL.minimal,
    dashboards: buildDashboards(brand),
    measurementFramework: buildMeasurementFramework(brand),
    analyticsBriefSummary: buildAnalyticsBriefSummary(brand),
  };
}
