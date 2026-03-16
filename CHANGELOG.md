# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

## [0.15.0] - 2026-03-16

### Added

- **`generate_brand_campaign` tool** — New MCP tool that generates a full marketing campaign
  strategy including campaign themes, objectives, target audience, channel mix, funnel phases
  (awareness/consideration/conversion/retention), messaging pillars, creative concept, success
  metrics (with style-specific KPIs), and budget allocation. Adapts to all 8 brand styles.
  New types exported: `BrandCampaignOutput`, `CampaignChannel`, `CampaignPhase`

## [0.14.0] - 2026-03-16

### Added

- **`generate_brand_photography` tool** — New MCP tool that generates a brand photography style
  guide including aesthetic direction, lighting recommendations, composition rules, color treatment,
  mood board keywords, use-case guidelines (website hero, social, email, print, presentations,
  product catalog), and technical requirements. Adapts to all 8 brand styles. New types exported:
  `BrandPhotographyOutput`, `PhotoStyleGuide`, `PhotoCompositionRule`, `PhotoColorTreatment`

## [0.13.0] - 2026-03-16

### Added

- **`generate_brand_email` tool** — New MCP tool that generates email marketing templates, campaigns,
  and guidelines. Returns 4 email templates (Welcome, Announcement, Newsletter, Re-engagement), at
  least 2 campaigns with cadence and key messages, subject line examples, preheader examples, color
  usage guidelines, typography guidelines, copy tone description, best practices, footer elements,
  and accessibility notes. Adapts to all 8 brand styles with style-specific subject formulas, copy
  tone, and CTA text. Industry-aware campaign strategies. New types exported: `BrandEmailOutput`,
  `EmailTemplate`, `EmailCampaign`

## [0.12.0] - 2026-03-16

### Added

- **`generate_brand_pitch` tool** — New MCP tool that generates a complete brand pitch package.
  Returns 3 elevator pitches (15s/30s/60s scripts with word counts), a 7-slide pitch deck outline
  (with speaker notes), one-line pitch, problem statement, solution statement, unique value
  proposition, target audience profile, 4 competitive advantages, call-to-action, and 4 investor
  highlights. Adapts tone and CTA per brand style; industry-aware problem statements for tech,
  finance, health, education, food, retail, creative, travel, and real estate. New types exported:
  `BrandPitchOutput`, `ElevatorPitch`, `PitchDeckSlide`, `InvestorHighlight`

## [0.11.0] - 2026-03-16

### Added

- **`generate_brand_social` tool** — New MCP tool that generates a complete social media strategy
  for a brand. Returns platform-specific configs (LinkedIn, Instagram, Twitter/X, TikTok, Pinterest,
  GitHub — adapted per brand style), content pillars (3-4 per style), branded hashtag, 10 hashtags
  (industry-aware), 5 bio variations, posting strategy, weekly content calendar, and voice guidelines
  (tone, do/don't, sample copy). New types exported: `BrandSocialOutput`, `SocialPlatformConfig`,
  `ContentPillar`

## [0.10.0] - 2026-03-16

### Added

- **`generate_brand_motion` tool** — New MCP tool that generates a complete motion design system
  for a brand. Returns timing tokens, easing curves (cubic-bezier), transition presets, animation
  scale classification (none/minimal/moderate/expressive/dramatic), brand-specific design principles,
  per-style usage guidelines (micro-interactions, page transitions, loading states, feedback), and
  ready-to-use CSS custom properties
- **`BrandMotionOutput`, `BrandMotionPrinciple` types** exported from package

## [0.9.0] - 2026-03-16

### Added

- **`generate_brand_naming` tool** — New MCP tool that generates brand name ideas (descriptive,
  evocative, abstract, acronym, portmanteau), tagline variations, domain name suggestions
  (.com/.io/get[name].com/.co/try[name].com), hashtags, and a naming rationale based on
  brand identity, style, and industry
- **Integration tests expanded** — Full coverage of all 10 MCP tools, all 7 export formats
  (including style-dictionary), brand voice, favicons, OG images, and validators
- **`NameIdea`, `DomainSuggestion`, `BrandNamingOutput` types** exported from package

## [0.8.0] - 2026-03-16

### Added

- **Style Dictionary exporter** — New `style-dictionary` export format in `export_design_tokens`
  producing a token tree compatible with the Style Dictionary build toolchain (colors, typography,
  spacing, shadows, borders, motion, gradients)
- **`generate_brand_voice` tool** — New MCP tool that derives tone-of-voice guidelines from a
  brand identity: vocabulary rules, sentence style, personality traits, tagline suggestions, sample
  copy, and do/don't guidelines
- **HTTP/SSE transport** — Set `MCP_TRANSPORT=http` (and optionally `PORT`) to expose the server
  over Streamable HTTP instead of stdio, enabling non-CLI integrations and remote MCP clients

### Changed

- **Anthropic SDK migration** — `claude-interpreter.ts` now uses `@anthropic-ai/sdk` client
  instead of raw `fetch`, gaining type-safe request/response handling
- **Security** — Resolved `flatted` DoS vulnerability via dependency upgrades

## [0.7.1] - 2026-03-14

### Added

- **MCP Registry metadata** — Added `mcpName`, `server.json`, and npm publish
  metadata so `@forgespace/branding-mcp` is ready for MCP Registry submission
  and scoped npm distribution
- **Tag-driven publish automation** — Added a release workflow that validates,
  publishes npm with provenance, and publishes the same version to the MCP
  Registry via GitHub OIDC
- **Weekly MCP Registry status issue** — Added a scheduled workflow that
  refreshes one distribution issue with discovery and version-drift status

### Changed

- **README distribution paths** — Documented npm-first install/config flows,
  docs/community entry points, and aligned ecosystem naming with `ui-mcp`
- **Runtime version metadata** — Updated MCP server self-reported version to
  match package release `0.7.1`
- **Registry schema contract** — `server.json` now uses the current MCP
  Registry field names for package and environment metadata

## [0.7.0] - 2026-03-07

### Added

- **Import cycle detection** — `madge --circular` via `npm run check:cycles`
- **Dead code detection** — knip config with library export exclusions
- **Security scanning** — Semgrep CE and Trivy integration in CI
- **Issue templates** — Bug report and feature request templates
- **Service catalog** — catalog-info.yaml for IDP service discovery
- **Ecosystem health** — Dependabot config, .nvmrc, CODEOWNERS

### Changed

- **CI workflows** — Migrated to org-wide reusable workflows for security scans and Node.js setup
- **Dependency updates** — Bumped lint-staged (15.5.2→16.3.2), actions/setup-node (4→6), actions/checkout (4→6), trufflesecurity/trufflehog (3.93.3→3.93.7), and minor/patch group updates

### Removed

- Unused dependencies: `culori`, `pdfkit`, `satori`, `sharp`, `@types/pdfkit`

## [0.6.2] - 2026-03-07

### Fixed

- **WCAG contrast compliance** — Secondary (#3B82F6→#2563EB) and accent (#F59E0B→#B45309) colors now pass AA 4.5:1 on white backgrounds. Brand consistency score 75→100

## [0.6.1] - 2026-03-06

### Changed

- **Modern Horn brand templates** — Default Forge Space logo SVGs updated to Modern Horn icon geometry and Sora wordmark (#A78BFA/#8B5CF6/#6D28D9)

## [0.6.0] - 2026-03-01

### Added

- Public type exports from package entry point: `BrandIdentity`, `ColorPalette`, `TypographySystem`, `SpacingScale`, `ShadowSystem`, `BorderSystem`, `MotionSystem`, `GradientSystem`, `LogoOutput`, `BrandStyle`, `ColorHarmony`, `ExportFormat`
- Enables downstream packages (`@forgespace/brand-guide`) to re-export types without reaching into internal paths

## [0.5.0] - 2026-02-28

### Added

- New MCP tool: `generate_design_system` — complete design system in one call (identity + token export combined)
- 10 new tests for design system tool (198 total across 16 suites)

## [0.4.0] - 2026-02-28

### Added

- Gradient system generator with 5 style-aware presets (hero, button, card, text, background) across 8 brand styles
- Multi-variant logo generator: wordmark, monogram, abstract, icon (4 SVG variants per brand)
- Favicon generator producing 4 sizes (16, 32, 180, 512) with stroke optimization for small sizes
- OG image templates: default (1200x630), article (1200x630), social (1200x1200) with brand gradient backgrounds
- New MCP tool: `generate_brand_assets` for favicon and OG image generation from existing brand identity
- All 6 exporters support gradient tokens (CSS, Tailwind, W3C JSON, Figma, React, Sass)
- 55 new tests (188 total), 15 test suites

### Changed

- Logo generator uses brand typography font instead of hardcoded Inter
- `LogoOutput` now includes `variants` record alongside backward-compatible `svg` field
- `LogoConfig` accepts optional `style` for style-aware monogram/abstract shapes

## [0.3.0] - 2026-02-28

### Added

- Shadow/elevation system generator with 6 levels (none, sm, md, lg, xl, 2xl), brand-tinted colors, light/dark theme support
- Border/shape system generator with style-aware radius scales and border widths for all 8 brand styles
- Motion/animation system generator with duration scales, cubic-bezier easings, and transition presets per brand style
- New token types in `BrandIdentity`: `shadows`, `borders`, `motion` (backward-compatible, optional)
- All 6 exporters updated: CSS variables, Tailwind preset, W3C JSON, Figma tokens, React theme, Sass variables now include shadow, border, and motion tokens
- `generate_brand_identity` tool now includes shadows, borders, and motion in output
- 36 new tests (133 total), 98.36% statement coverage, 100% function coverage

## [0.2.0] - 2026-02-24

### Added

- AI interpretation layer for natural language brand refinement (`src/lib/branding-core/ai/`)
- Strategy pattern: keyword (zero-cost), Claude API (Anthropic Messages), and auto (fallback) interpreters
- `BrandIntent` abstraction decoupling NL understanding from generator execution
- 20+ color keywords (warm, vibrant, premium, muted, dark, elegant, etc.) with HSL shift values
- 15+ typography keywords (serif, editorial, dramatic, modern, compact, etc.) with font/scale mapping
- `intent-applier` module applying HSL hue/saturation/lightness shifts before palette generation
- Structured Claude prompts with brand context, JSON schema, and design principles
- Optional `strategy` parameter on `refine_brand_element` tool (keyword/ai/auto)
- `_interpretation` metadata in refinement responses showing strategy used and reasoning
- 24 new tests for AI interpreter, intent applier, and strategy selection (97 total)

## [0.1.0] - 2026-02-24

### Added

- Initial project structure with MCP server architecture
- Color palette generator with 6 harmony modes (complementary, analogous, triadic, split-complementary, tetradic, monochromatic)
- Typography system generator with modular type scales and curated font pairings
- Spacing scale generator with geometric progression
- SVG logo generator with brand colors and initials
- 6 design token exporters: W3C JSON, CSS custom properties, Tailwind preset, Figma tokens, React theme, Sass variables
- WCAG contrast checker (AA/AAA compliance)
- Brand consistency validator with scoring
- HTML brand guidelines generator
- 7 MCP tools: generate_brand_identity, generate_color_palette, generate_typography_system, export_design_tokens, create_brand_guidelines, validate_brand_consistency, refine_brand_element
- 2 MCP resources: brand templates catalog, brand knowledge base
- Unit and integration test suite
- CI/CD workflows (lint, test, build, security scan)
